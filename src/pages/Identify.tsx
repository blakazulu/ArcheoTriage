import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router'
import { Camera, Upload, Sparkles, AlertTriangle, CheckCircle, RefreshCw, Save, BookOpen } from 'lucide-react'
import { useArtifactIdentification } from '../hooks/useArtifactIdentification'
import { artifacts } from '../data/artifacts'

export default function Identify() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { identify, isLoading, error, result, reset } = useArtifactIdentification()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (5MB limit for API)
    if (file.size > 5 * 1024 * 1024) {
      alert(t('identify.photoTooLarge'))
      return
    }

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result as string
      setSelectedImage(base64)

      // Get mime type
      const mimeType = file.type || 'image/jpeg'

      try {
        await identify(base64, mimeType)
      } catch {
        // Error is handled by the hook
      }
    }
    reader.readAsDataURL(file)
  }

  const handleReset = () => {
    setSelectedImage(null)
    reset()
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (cameraInputRef.current) cameraInputRef.current.value = ''
  }

  const handleSaveToFindings = () => {
    if (!result) return

    // Store photo in sessionStorage (URL params can't handle large base64 data)
    if (selectedImage) {
      sessionStorage.setItem('ai-prefill-photo', selectedImage)
    }

    // Navigate to AddFinding with pre-filled data
    const params = new URLSearchParams({
      artifactType: result.artifactType,
      description: result.description,
      risks: result.risks.join(','),
      fromAI: 'true',
    })
    navigate(`/findings/add?${params.toString()}`)
  }

  const artifact = result ? artifacts.find(a => a.id === result.artifactType) : null

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-critical text-white'
      case 'high': return 'bg-warning text-slate'
      case 'medium': return 'bg-stable text-white'
      case 'low': return 'bg-info text-white'
      default: return 'bg-stone text-white'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600'
    if (confidence >= 50) return 'text-amber-600'
    return 'text-red-600'
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-signal-orange/10 rounded-full flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-signal-orange" />
        </div>
        <h1 className="font-display text-xl text-slate tracking-wide uppercase mb-2">
          {t('identify.title')}
        </h1>
        <p className="text-gray-600 text-sm">
          {t('identify.subtitle')}
        </p>
      </div>

      {/* No image selected - show upload buttons */}
      {!selectedImage && (
        <div className="space-y-4">
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate text-white rounded-lg font-semibold hover:bg-slate-light transition-colors"
          >
            <Camera className="w-6 h-6" />
            {t('identify.takePhoto')}
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-canvas-dark text-slate rounded-lg font-semibold border-2 border-stone-light hover:border-slate transition-colors"
          >
            <Upload className="w-6 h-6" />
            {t('identify.uploadPhoto')}
          </button>

          {/* Hidden file inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {/* Image selected - show preview and results */}
      {selectedImage && (
        <div className="space-y-4">
          {/* Image preview */}
          <div className="relative rounded-xl overflow-hidden shadow-card">
            <img
              src={selectedImage}
              alt="Artifact"
              className="w-full h-48 object-cover"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-slate/80 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-sm">{t('identify.analyzing')}</p>
                </div>
              </div>
            )}
          </div>

          {/* Error state */}
          {error && (
            <div className="bg-critical/10 border border-critical rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-critical flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-critical font-medium">{t('identify.error')}</p>
                  <p className="text-sm text-gray-600 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="bg-white rounded-xl shadow-card border border-canvas-darker overflow-hidden">
              {/* Result header */}
              <div className="p-4 border-b border-canvas-darker">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{artifact?.icon || '📦'}</span>
                    <div>
                      <h2 className="font-semibold text-slate">
                        {t(`artifacts.${result.artifactType}.name`)}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {t(`artifacts.${result.artifactType}.subtitle`)}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getUrgencyColor(result.preservationUrgency)}`}>
                    {t(`identify.urgency.${result.preservationUrgency}`)}
                  </span>
                </div>

                {/* Confidence */}
                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle className={`w-4 h-4 ${getConfidenceColor(result.confidence)}`} />
                  <span className={`text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                    {result.confidence}% {t('identify.confidence')}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 border-b border-canvas-darker">
                <p className="text-sm text-gray-600">{result.description}</p>
              </div>

              {/* Risks */}
              {result.risks.length > 0 && (
                <div className="p-4 border-b border-canvas-darker">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    {t('identify.riskFactors')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.risks.map(risk => (
                      <span
                        key={risk}
                        className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium"
                      >
                        {t(`riskFactors.${risk}.name`)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="p-4 space-y-3">
                {/* View preservation guide */}
                <Link
                  to={`/guide/${result.artifactType}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-signal-orange text-white rounded-lg font-semibold hover:bg-signal-orange-light transition-colors no-underline"
                >
                  <BookOpen className="w-5 h-5" />
                  {t('identify.viewGuide')}
                </Link>

                {/* Save to findings */}
                <button
                  onClick={handleSaveToFindings}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate text-white rounded-lg font-semibold hover:bg-slate-light transition-colors"
                >
                  <Save className="w-5 h-5" />
                  {t('identify.saveToFindings')}
                </button>
              </div>
            </div>
          )}

          {/* Try again button */}
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-stone-light text-gray-700 rounded-lg font-semibold hover:bg-canvas-dark transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            {t('identify.tryAgain')}
          </button>
        </div>
      )}
    </div>
  )
}
