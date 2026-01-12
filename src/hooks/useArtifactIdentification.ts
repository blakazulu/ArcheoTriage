import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { RiskType } from '../data/artifacts'

export interface IdentificationResult {
  artifactType: string
  confidence: number
  risks: RiskType[]
  description: string
  descriptionHe: string
  preservationUrgency: 'critical' | 'high' | 'medium' | 'low'
}

interface UseArtifactIdentificationReturn {
  identify: (imageBase64: string, mimeType?: string) => Promise<IdentificationResult>
  isLoading: boolean
  error: string | null
  result: IdentificationResult | null
  reset: () => void
}

export function useArtifactIdentification(): UseArtifactIdentificationReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<IdentificationResult | null>(null)
  const { i18n } = useTranslation()

  const identify = useCallback(async (imageBase64: string, mimeType = 'image/jpeg'): Promise<IdentificationResult> => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/.netlify/functions/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageBase64,
          mimeType,
          language: i18n.language,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Identification failed: ${response.status}`)
      }

      const data: IdentificationResult = await response.json()
      setResult(data)
      return data

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to identify artifact'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [i18n.language])

  const reset = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setResult(null)
  }, [])

  return {
    identify,
    isLoading,
    error,
    result,
    reset,
  }
}
