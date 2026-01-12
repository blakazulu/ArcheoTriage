import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { AlertTriangle, Home, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react'

interface ErrorFallbackProps {
  error: Error | null
  level: 'app' | 'page' | 'component'
  onReset?: () => void
}

export default function ErrorFallback({ error, level, onReset }: ErrorFallbackProps) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const BackArrow = i18n.language === 'he' ? ArrowRight : ArrowLeft

  const handleGoHome = () => {
    onReset?.()
    navigate('/')
  }
  const handleReload = () => window.location.reload()
  const handleBack = () => {
    onReset?.()
    navigate(-1)
  }

  const isAppLevel = level === 'app'
  const isPageLevel = level === 'page'

  return (
    <div
      className={`flex items-center justify-center ${isAppLevel ? 'min-h-screen' : 'min-h-[400px]'} px-6 py-12`}
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-md w-full">
        {/* Error icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-critical/10 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-critical" aria-hidden="true" />
        </div>

        {/* Title */}
        <h1 className="font-display text-xl text-slate tracking-wide uppercase text-center mb-4">
          {t('errors.title')}
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">
          {isAppLevel ? t('errors.appLevelMessage') : t('errors.pageLevelMessage')}
        </p>

        {/* Technical details (dev only) */}
        {error && import.meta.env.DEV && (
          <details className="bg-canvas-dark rounded-lg p-4 mb-6 text-sm">
            <summary className="cursor-pointer text-slate font-semibold mb-2">
              {t('errors.technicalDetails')}
            </summary>
            <pre className="text-xs text-gray-600 overflow-auto whitespace-pre-wrap">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {onReset && (
            <button
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-signal-orange text-white rounded-lg font-semibold hover:bg-signal-orange-light transition-colors"
            >
              <RefreshCw className="w-5 h-5" aria-hidden="true" />
              {t('errors.tryAgain')}
            </button>
          )}

          {isPageLevel && (
            <button
              onClick={handleBack}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate text-white rounded-lg font-semibold hover:bg-slate-light transition-colors"
            >
              <BackArrow className="w-5 h-5" aria-hidden="true" />
              {t('errors.goBack')}
            </button>
          )}

          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-stone-light text-gray-700 rounded-lg font-semibold hover:bg-canvas-dark transition-colors"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            {t('errors.goHome')}
          </button>

          {isAppLevel && (
            <button
              onClick={handleReload}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-stone-light text-gray-700 rounded-lg font-semibold hover:bg-canvas-dark transition-colors"
            >
              <RefreshCw className="w-5 h-5" aria-hidden="true" />
              {t('errors.reloadPage')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
