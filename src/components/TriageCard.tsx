import { useTranslation } from 'react-i18next'
import { AlertTriangle } from 'lucide-react'
import { riskFactors } from '../data/artifacts'

export default function TriageCard() {
  const { t } = useTranslation()

  const severityClasses = {
    critical: 'bg-critical shadow-[0_0_0_3px_var(--tw-shadow-color)] shadow-critical-bg',
    warning: 'bg-warning shadow-[0_0_0_3px_var(--tw-shadow-color)] shadow-warning-bg',
    stable: 'bg-stable shadow-[0_0_0_3px_var(--tw-shadow-color)] shadow-stable-bg',
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-card border border-canvas-darker">
      {/* Header */}
      <div className="bg-slate-dark text-white px-6 py-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        <span className="font-display text-sm tracking-wider uppercase">
          {t('home.mainRiskFactors')}
        </span>
      </div>

      {/* Risk items */}
      <div className="p-4">
        {riskFactors.map(({ id, severity }) => (
          <div
            key={id}
            className="flex items-start gap-4 p-4 rounded-lg mb-2 last:mb-0 transition-colors hover:bg-canvas"
          >
            {/* Indicator dot */}
            <div
              className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${severityClasses[severity]}`}
            />

            {/* Content */}
            <div className="flex-1">
              <div className="font-semibold text-[0.95rem] mb-0.5">
                {t(`riskFactors.${id}.name`)}
              </div>
              <div className="text-sm text-gray-600">
                {t(`riskFactors.${id}.description`)}
              </div>
              <div className="text-xs text-signal-orange font-semibold mt-1 flex items-center gap-1">
                {t(`riskFactors.${id}.action`)}
                <span className="rtl:rotate-180">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
