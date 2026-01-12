import { useNavigate, useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import FindingForm from '../components/FindingForm'
import { useFindings } from '../hooks/useFindings'
import type { FindingInput } from '../types/finding'
import type { Finding } from '../types/finding'
import type { RiskType } from '../data/artifacts'

export default function AddFinding() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { addFinding } = useFindings()

  const BackArrow = i18n.language === 'he' ? ArrowRight : ArrowLeft

  // Check for pre-fill data from AI identification
  const prefillArtifactType = searchParams.get('artifactType')
  const prefillDescription = searchParams.get('description')
  const prefillRisks = searchParams.get('risks')
  const isFromAI = searchParams.get('fromAI') === 'true'

  // Get photo from sessionStorage (too large for URL params)
  const prefillPhotoUrl = isFromAI ? sessionStorage.getItem('ai-prefill-photo') : null
  // Clear after reading to avoid stale data
  if (prefillPhotoUrl) {
    sessionStorage.removeItem('ai-prefill-photo')
  }

  // Build initial data from URL params
  const initialData: Partial<Finding> | undefined = isFromAI ? {
    artifactType: prefillArtifactType || '',
    description: prefillDescription || '',
    risks: prefillRisks ? prefillRisks.split(',') as RiskType[] : [],
    photoUrl: prefillPhotoUrl || null,
    title: '',
    location: '',
    riskNotes: '',
  } : undefined

  const handleSubmit = (data: FindingInput) => {
    const finding = addFinding(data)
    navigate(`/findings/${finding.id}`)
  }

  const handleCancel = () => {
    navigate('/findings')
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <button
        onClick={handleCancel}
        className="inline-flex items-center gap-2 text-slate hover:text-signal-orange transition-colors mb-6 font-medium"
      >
        <BackArrow className="w-4 h-4" />
        {t('common.back')}
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-xl text-slate tracking-wide uppercase">
          {t('findings.addNew')}
        </h1>
        {isFromAI && (
          <div className="flex items-center gap-2 mt-2 text-sm text-signal-orange">
            <Sparkles className="w-4 h-4" />
            <span>{t('findings.prefilledFromAI')}</span>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl p-6 shadow-card border border-canvas-darker">
        <FindingForm
          initialData={initialData as Finding | undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}
