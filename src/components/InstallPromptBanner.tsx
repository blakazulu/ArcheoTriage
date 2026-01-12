import { useTranslation } from 'react-i18next'
import { Download, X } from 'lucide-react'
import { usePWAInstall } from '../hooks/usePWAInstall'

export default function InstallPromptBanner() {
  const { t } = useTranslation()
  const { isInstallable, promptInstall, dismissPrompt } = usePWAInstall()

  if (!isInstallable) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-slate shadow-lg animate-slide-down">
      {/* Hazard stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 hazard-stripe" />

      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="w-10 h-10 bg-signal-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Download className="w-5 h-5 text-signal-orange" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">
              {t('pwa.install.title')}
            </p>
            <p className="text-slate-light text-xs truncate">
              {t('pwa.install.description')}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={promptInstall}
              className="px-4 py-2 bg-signal-orange text-white text-sm font-semibold rounded-lg hover:bg-signal-orange-light active:scale-95 transition-all"
              aria-label={t('pwa.install.button')}
            >
              {t('pwa.install.button')}
            </button>
            <button
              onClick={dismissPrompt}
              className="p-2 text-slate-light hover:text-white transition-colors"
              aria-label={t('common.cancel')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
