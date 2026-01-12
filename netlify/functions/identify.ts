import { GoogleGenerativeAI } from '@google/generative-ai'
import type { Handler } from '@netlify/functions'

const ARTIFACT_TYPES = ['ceramics', 'metals', 'organic', 'textiles', 'scrolls'] as const
type ArtifactType = typeof ARTIFACT_TYPES[number]

const VALID_RISKS = ['humidity', 'temperature', 'shock', 'light', 'oxygen'] as const
type RiskType = typeof VALID_RISKS[number]

const VALID_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

interface IdentificationResult {
  artifactType: ArtifactType
  confidence: number
  risks: RiskType[]
  description: string
  descriptionHe: string
  preservationUrgency: 'critical' | 'high' | 'medium' | 'low'
}

function getIdentificationPrompt(): string {
  return `You are an expert archaeologist analyzing an artifact photo. Identify the artifact type and provide preservation guidance.

IMPORTANT: You must respond with ONLY valid JSON, no additional text or markdown.

Analyze the image and return JSON in this exact format:
{
  "artifactType": "ceramics" | "metals" | "organic" | "textiles" | "scrolls",
  "confidence": <number 0-100>,
  "risks": ["humidity" | "temperature" | "shock" | "light" | "oxygen"],
  "description": "<brief description in ENGLISH, max 200 characters>",
  "descriptionHe": "<brief description in HEBREW, max 200 characters>",
  "preservationUrgency": "critical" | "high" | "medium" | "low"
}

Artifact type definitions:
- ceramics: Pottery, clay vessels, terracotta, ceramic tiles, bricks
- metals: Coins, bronze objects, iron tools, gold/silver jewelry, copper vessels
- organic: Bone, wood, ivory, shell, seeds, food remains, leather
- textiles: Woven fabrics, ropes, baskets, nets, cloth fragments
- scrolls: Papyrus, parchment, paper documents, inscribed materials

Risk factors to consider:
- humidity: Materials sensitive to moisture (metals rust, organics mold)
- temperature: Materials that crack or warp with temperature changes
- shock: Fragile items that break easily (ceramics, glass)
- light: UV-sensitive materials (textiles fade, organics degrade)
- oxygen: Materials that oxidize (metals corrode)

Preservation urgency:
- critical: Immediate action needed, artifact at severe risk
- high: Prompt attention required within hours
- medium: Should be addressed within a day
- low: Stable but needs proper storage

If you cannot identify the artifact clearly, default to:
- artifactType: "organic" (most common archaeological finds)
- confidence: 30
- preservationUrgency: "high"

IMPORTANT: You MUST provide BOTH "description" (in English) AND "descriptionHe" (in Hebrew/עברית) fields.

Respond with JSON only.`
}

export const handler: Handler = async (event) => {
  // CORS headers - restrict to site URL in production
  const allowedOrigin = process.env.URL || 'http://localhost:5173'
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  }

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API configuration error' }),
      }
    }

    const body = JSON.parse(event.body || '{}')
    const { image, mimeType = 'image/jpeg', language = 'en' } = body

    if (!image) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No image provided' }),
      }
    }

    // Validate mimeType
    if (!VALID_MIME_TYPES.includes(mimeType)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid image format. Supported: JPEG, PNG, WebP, GIF' }),
      }
    }

    // Remove data URL prefix if present
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '')

    // Server-side size validation (base64 is ~33% larger than binary)
    const estimatedSize = (base64Data.length * 3) / 4
    const MAX_SIZE = 5 * 1024 * 1024 // 5MB
    if (estimatedSize > MAX_SIZE) {
      return {
        statusCode: 413,
        headers,
        body: JSON.stringify({ error: 'Image too large. Maximum size is 5MB' }),
      }
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    // Call Gemini Vision
    const result = await model.generateContent([
      getIdentificationPrompt(),
      {
        inlineData: {
          mimeType,
          data: base64Data,
        },
      },
    ])

    const response = result.response
    const text = response.text()

    // Parse the JSON response
    let identification: IdentificationResult
    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      identification = JSON.parse(jsonMatch[0])

      // Validate artifact type
      if (!ARTIFACT_TYPES.includes(identification.artifactType)) {
        identification.artifactType = 'organic'
      }

      // Clamp confidence
      identification.confidence = Math.max(0, Math.min(100, Math.round(identification.confidence)))

      // Validate risks - filter to only valid values
      if (Array.isArray(identification.risks)) {
        identification.risks = identification.risks.filter(
          risk => VALID_RISKS.includes(risk as RiskType)
        ) as RiskType[]
      }
      if (!identification.risks || identification.risks.length === 0) {
        identification.risks = ['humidity', 'temperature']
      }

      // Validate preservation urgency
      const validUrgencies = ['critical', 'high', 'medium', 'low']
      if (!validUrgencies.includes(identification.preservationUrgency)) {
        identification.preservationUrgency = 'high'
      }

      // Limit description length
      if (identification.description && identification.description.length > 500) {
        identification.description = identification.description.substring(0, 500) + '...'
      }

    } catch {
      // Fallback response if parsing fails
      identification = {
        artifactType: 'organic',
        confidence: 30,
        risks: ['humidity', 'temperature'],
        description: 'Unable to clearly identify artifact. Treating as organic material for safety.',
        descriptionHe: 'לא ניתן לזהות את הממצא בבירור. מטופל כחומר אורגני לצורכי בטיחות.',
        preservationUrgency: 'high',
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(identification),
    }

  } catch (error) {
    console.error('Identification error:', error)

    // Sanitize error message - don't expose internal details
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to identify artifact. Please try again.',
      }),
    }
  }
}
