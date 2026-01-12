import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ArrowLeft, Edit2, Trash2, MapPin, Calendar, AlertTriangle } from 'lucide-react'
import { useFindings } from '../hooks/useFindings'
import { artifacts } from '../data/artifacts'
import FindingForm from '../components/FindingForm'
import type { FindingInput } from '../types/finding'

export default function FindingDetail() {
  const { findingId } = useParams<{ findingId: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { getFinding, updateFinding, deleteFinding } = useFindings()

  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const finding = findingId ? getFinding(findingId) : undefined
  const artifact = finding ? artifacts.find(a => a.id === finding.artifactType) : undefined

  const BackArrow = i18n.language === 'he' ? ArrowRight : ArrowLeft

  if (!finding) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">{t('findingDetail.notFound')}</p>
        <Link to="/findings" className="text-signal-orange font-semibold">
          {t('common.back')}
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(finding.createdAt).toLocaleDateString(
    i18n.language === 'he' ? 'he-IL' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  const handleUpdate = (data: FindingInput) => {
    updateFinding(finding.id, data)
    setIsEditing(false)
  }

  const handleDelete = () => {
    deleteFinding(finding.id)
    navigate('/findings')
  }

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setIsEditing(false)}
          className="inline-flex items-center gap-2 text-slate hover:text-signal-orange transition-colors mb-6 font-medium"
        >
          <BackArrow className="w-4 h-4" />
          {t('common.cancel')}
        </button>

        <div className="mb-6">
          <h1 className="font-display text-xl text-slate tracking-wide uppercase">
            {t('findingDetail.edit')}
          </h1>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-card border border-canvas-darker">
          <FindingForm
            initialData={finding}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <Link
        to="/findings"
        className="inline-flex items-center gap-2 text-slate hover:text-signal-orange transition-colors mb-6 no-underline font-medium"
      >
        <BackArrow className="w-4 h-4" />
        {t('common.back')}
      </Link>

      {/* Main content card */}
      <div className="bg-white rounded-xl overflow-hidden shadow-card border border-canvas-darker">
        {/* Photo */}
        {finding.photoUrl ? (
          <div className="relative h-64 bg-canvas-dark">
            <img
              src={finding.photoUrl}
              alt={finding.title}
              className="w-full h-full object-cover"
            />
            {/* Artifact type badge */}
            <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-slate/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
              <span>{artifact?.icon}</span>
              <span>{t(`artifacts.${finding.artifactType}.name`)}</span>
            </div>
          </div>
        ) : (
          <div className="relative h-48 bg-canvas-dark flex items-center justify-center">
            <span className="text-7xl opacity-50">{artifact?.icon || '📦'}</span>
            {/* Artifact type badge */}
            <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-slate/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
              <span>{artifact?.icon}</span>
              <span>{t(`artifacts.${finding.artifactType}.name`)}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h1 className="font-display text-2xl text-slate mb-4">
            {finding.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            {finding.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{finding.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Description */}
          {finding.description && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                {t('findingDetail.description')}
              </h2>
              <p className="text-gray-600 whitespace-pre-wrap">
                {finding.description}
              </p>
            </div>
          )}

          {/* Risks */}
          {finding.risks && finding.risks.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                {t('findingDetail.risks')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {finding.risks.map(risk => (
                  <span
                    key={risk}
                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                  >
                    {t(`riskFactors.${risk}.name`)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Risk notes */}
          {finding.riskNotes && (
            <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-amber-800 mb-1">
                    {t('findingDetail.riskNotes')}
                  </h2>
                  <p className="text-amber-700 text-sm whitespace-pre-wrap">
                    {finding.riskNotes}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Preservation guide link */}
          {artifact && (
            <Link
              to={`/guide/${artifact.id}`}
              className="block p-4 bg-canvas-dark rounded-lg hover:bg-canvas-darker transition-colors no-underline mb-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{artifact.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate">
                      {t('findingDetail.viewPreservation')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t(`artifacts.${artifact.id}.subtitle`)}
                    </p>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-stone rtl:rotate-180" />
              </div>
            </Link>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t border-canvas-darker">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate text-white rounded-lg font-semibold hover:bg-slate/90 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              {t('common.edit')}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-critical text-critical rounded-lg font-semibold hover:bg-critical hover:text-white transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {t('common.delete')}
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowDeleteConfirm(false)}
          onKeyDown={(e) => e.key === 'Escape' && setShowDeleteConfirm(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lifted"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="delete-dialog-title"
              className="font-display text-lg text-slate mb-2"
            >
              {t('findingDetail.deleteConfirmTitle')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('findingDetail.deleteConfirmMessage')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 border-2 border-stone-light text-gray-700 rounded-lg font-semibold hover:bg-canvas-dark transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-critical text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
