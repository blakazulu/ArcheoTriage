import { useTranslation } from 'react-i18next'
import type { RiskLevel } from '../data/artifacts'

interface RiskIndicatorProps {
  level: RiskLevel
  size?: 'sm' | 'md'
}

export default function RiskIndicator({ level, size = 'sm' }: RiskIndicatorProps) {
  const { t } = useTranslation()

  const colorClasses = {
    critical: 'bg-critical-bg text-critical border-critical',
    high: 'bg-critical-bg text-critical border-critical',
    medium: 'bg-warning-bg text-[#9A6B00] border-warning',
    low: 'bg-stable-bg text-stable border-stable',
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  }

  return (
    <span
      className={`inline-block rounded-full border font-medium ${colorClasses[level]} ${sizeClasses[size]}`}
    >
      {t(`risk.${level}`)}
    </span>
  )
}

interface RiskTagProps {
  type: 'humidity' | 'temperature' | 'shock' | 'light' | 'oxygen'
}

export function RiskTag({ type }: RiskTagProps) {
  const { t } = useTranslation()

  const icons = {
    humidity: '💧',
    temperature: '🌡️',
    shock: '⚡',
    light: '☀️',
    oxygen: '💨',
  }

  const colorClasses = {
    humidity: 'bg-info-bg text-info border-info',
    temperature: 'bg-warning-bg text-[#9A6B00] border-warning',
    shock: 'bg-critical-bg text-critical border-critical',
    light: 'bg-warning-bg text-[#9A6B00] border-warning',
    oxygen: 'bg-critical-bg text-critical border-critical',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-sm font-medium border ${colorClasses[type]}`}
    >
      <span>{icons[type]}</span>
      {t(`riskFactors.${type}.name`)}
    </span>
  )
}
