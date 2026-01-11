import { useTranslation } from 'react-i18next'
import { Camera, Upload, Sparkles } from 'lucide-react'

export default function Identify() {
  const { t } = useTranslation()

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-6 bg-signal-orange/10 rounded-full flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-signal-orange" />
        </div>

        <h1 className="font-display text-xl text-slate tracking-wide uppercase mb-2">
          {t('identify.title')}
        </h1>

        <p className="text-gray-600">
          {t('identify.comingSoon')}
        </p>
      </div>

      {/* Action buttons - disabled for now */}
      <div className="space-y-4">
        <button
          disabled
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate/50 text-white rounded-lg font-semibold cursor-not-allowed"
        >
          <Camera className="w-6 h-6" />
          {t('identify.takePhoto')}
        </button>

        <button
          disabled
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-canvas-dark text-gray-500 rounded-lg font-semibold border-2 border-stone-light cursor-not-allowed"
        >
          <Upload className="w-6 h-6" />
          {t('identify.uploadPhoto')}
        </button>
      </div>
    </div>
  )
}
