import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import FindingForm from '../components/FindingForm'
import { useFindings } from '../hooks/useFindings'
import type { FindingInput } from '../types/finding'

export default function AddFinding() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { addFinding } = useFindings()

  const BackArrow = i18n.language === 'he' ? ArrowRight : ArrowLeft

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
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl p-6 shadow-card border border-canvas-darker">
        <FindingForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  )
}
