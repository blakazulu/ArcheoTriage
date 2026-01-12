import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Upload, X, MapPin } from 'lucide-react'
import { artifacts } from '../data/artifacts'
import type { Finding, FindingInput } from '../types/finding'
import type { RiskType } from '../data/artifacts'

interface FindingFormProps {
  initialData?: Finding
  onSubmit: (data: FindingInput) => void
  onCancel: () => void
}

export default function FindingForm({ initialData, onSubmit, onCancel }: FindingFormProps) {
  const { t, i18n } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    artifactType: initialData?.artifactType || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    photoUrl: initialData?.photoUrl || null as string | null,
    riskNotes: initialData?.riskNotes || '',
    risks: initialData?.risks || [] as RiskType[],
  })
  const [photoError, setPhotoError] = useState<string | null>(null)

  const MAX_PHOTO_SIZE = 2 * 1024 * 1024 // 2MB

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoError(null)

      if (file.size > MAX_PHOTO_SIZE) {
        setPhotoError(t('findingForm.photoTooLarge'))
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        return
      }

      const reader = new FileReader()
      reader.onerror = () => {
        setPhotoError(t('findingForm.photoError'))
      }
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photoUrl: null }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleArtifactTypeChange = (artifactId: string) => {
    const artifact = artifacts.find(a => a.id === artifactId)
    setFormData(prev => ({
      ...prev,
      artifactType: artifactId,
      risks: artifact?.risks || [],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      language: i18n.language as 'he' | 'en',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('findingForm.photo')}
        </label>

        {formData.photoUrl ? (
          <div className="relative inline-block">
            <img
              src={formData.photoUrl}
              alt="Finding"
              className="w-full max-w-xs h-48 object-cover rounded-lg border-2 border-stone-light"
            />
            <button
              type="button"
              onClick={removePhoto}
              aria-label={t('findingForm.removePhoto')}
              className="absolute -top-2 -right-2 rtl:-right-auto rtl:-left-2 min-w-[44px] min-h-[44px] w-11 h-11 bg-critical text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex flex-col items-center gap-2 p-6 border-2 border-dashed border-stone-light rounded-lg hover:border-slate hover:bg-canvas-dark transition-colors"
            >
              <Upload className="w-8 h-8 text-stone" />
              <span className="text-sm text-gray-600">{t('findingForm.uploadPhoto')}</span>
            </button>
          </div>
        )}

        {photoError && (
          <p className="mt-2 text-sm text-critical">{photoError}</p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoSelect}
          className="hidden"
        />
      </div>

      {/* Artifact Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('findingForm.artifactType')} *
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {artifacts.map(artifact => (
            <button
              key={artifact.id}
              type="button"
              onClick={() => handleArtifactTypeChange(artifact.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                formData.artifactType === artifact.id
                  ? 'border-signal-orange bg-signal-orange/10'
                  : 'border-stone-light hover:border-slate'
              }`}
            >
              <div className="text-2xl mb-1">{artifact.icon}</div>
              <div className="text-xs font-medium truncate">
                {t(`artifacts.${artifact.id}.name`)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('findingForm.title')} *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border-2 border-stone-light focus:border-slate focus:outline-none transition-colors"
          placeholder={t('findingForm.titlePlaceholder')}
          required
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('findingForm.location')}
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
          <input
            type="text"
            value={formData.location}
            onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-stone-light focus:border-slate focus:outline-none transition-colors"
            placeholder={t('findingForm.locationPlaceholder')}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('findingForm.description')}
        </label>
        <textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border-2 border-stone-light focus:border-slate focus:outline-none transition-colors resize-none"
          placeholder={t('findingForm.descriptionPlaceholder')}
        />
      </div>

      {/* Risk Notes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('findingForm.riskNotes')}
        </label>
        <textarea
          value={formData.riskNotes}
          onChange={e => setFormData(prev => ({ ...prev, riskNotes: e.target.value }))}
          rows={2}
          className="w-full px-4 py-3 rounded-lg border-2 border-stone-light focus:border-slate focus:outline-none transition-colors resize-none"
          placeholder={t('findingForm.riskNotesPlaceholder')}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 rounded-lg border-2 border-stone-light text-gray-700 font-semibold hover:bg-canvas-dark transition-colors"
        >
          {t('common.cancel')}
        </button>
        <button
          type="submit"
          disabled={!formData.artifactType || !formData.title}
          className="flex-1 px-6 py-3 rounded-lg bg-signal-orange text-white font-semibold hover:bg-signal-orange-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('common.save')}
        </button>
      </div>
    </form>
  )
}
