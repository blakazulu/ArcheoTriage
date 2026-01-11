import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import RiskIndicator from './RiskIndicator'
import type { Artifact } from '../data/artifacts'

interface ArtifactCardProps {
  artifact: Artifact
  index?: number
}

export default function ArtifactCard({ artifact, index = 0 }: ArtifactCardProps) {
  const { t } = useTranslation()

  return (
    <Link
      to={`/guide/${artifact.id}`}
      className="bg-canvas border-2 border-stone-light rounded-lg p-6 text-center cursor-pointer transition-all relative overflow-hidden shadow-card hover:border-slate hover:-translate-y-0.5 hover:shadow-lifted active:translate-y-0 no-underline group animate-card-enter"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Top stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-stone transition-colors group-hover:bg-signal-orange" />

      {/* Icon */}
      <div className="w-12 h-12 mx-auto mb-2 bg-canvas-dark rounded-full flex items-center justify-center text-2xl border-2 border-stone-light">
        {artifact.icon}
      </div>

      {/* Name */}
      <div className="font-semibold text-[0.95rem] text-gray-900 mb-1">
        {t(`artifacts.${artifact.id}.name`)}
      </div>

      {/* Risk level */}
      <RiskIndicator level={artifact.riskLevel} />
    </Link>
  )
}
