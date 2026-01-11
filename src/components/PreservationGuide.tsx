import { useTranslation } from 'react-i18next'
import { RiskTag } from './RiskIndicator'
import type { Artifact } from '../data/artifacts'

interface PreservationGuideProps {
  artifact: Artifact
}

export default function PreservationGuide({ artifact }: PreservationGuideProps) {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-xl border-2 border-slate overflow-hidden shadow-lifted animate-slide-up">
      {/* Header */}
      <div className="bg-slate text-white p-6 flex items-center gap-4">
        <div className="w-14 h-14 bg-white/15 rounded-lg flex items-center justify-center text-3xl">
          {artifact.icon}
        </div>
        <div>
          <h1 className="font-display text-xl tracking-wide mb-1">
            {t(`artifacts.${artifact.id}.name`)}
          </h1>
          <p className="text-sm opacity-80">
            {t(`artifacts.${artifact.id}.subtitle`)}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Risk factors */}
        <div className="flex gap-2 flex-wrap mb-6">
          {artifact.risks.map(risk => (
            <RiskTag key={risk} type={risk} />
          ))}
        </div>

        {/* Preservation steps */}
        <h2 className="font-display text-sm text-slate tracking-wider uppercase mb-4">
          {t('preservation.steps')}
        </h2>

        <div className="step-counter">
          {artifact.preservationSteps.map((step, index) => (
            <div
              key={index}
              className="flex gap-4 py-4 border-b border-canvas-dark last:border-b-0"
            >
              <div className="step-number w-7 h-7 bg-slate text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold mb-1">
                  {t(step.titleKey)}
                </div>
                <div className="text-sm text-gray-600">
                  {t(step.descriptionKey)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success indicators */}
        <h2 className="font-display text-sm text-slate tracking-wider uppercase mt-6 mb-4">
          {t('preservation.successIndicators')}
        </h2>

        <ul className="space-y-2">
          {artifact.successIndicators.map((indicator, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-stable">✓</span>
              {t(indicator)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
