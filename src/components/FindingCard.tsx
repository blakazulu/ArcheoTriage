import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { MapPin, Calendar } from 'lucide-react'
import { artifacts } from '../data/artifacts'
import type { Finding } from '../types/finding'

interface FindingCardProps {
  finding: Finding
}

export default function FindingCard({ finding }: FindingCardProps) {
  const { t, i18n } = useTranslation()

  const artifact = artifacts.find(a => a.id === finding.artifactType)
  const formattedDate = new Date(finding.createdAt).toLocaleDateString(
    i18n.language === 'he' ? 'he-IL' : 'en-US',
    { day: 'numeric', month: 'short', year: 'numeric' }
  )

  return (
    <Link
      to={`/findings/${finding.id}`}
      className="block bg-white rounded-xl overflow-hidden shadow-card border border-canvas-darker hover:shadow-lifted hover:-translate-y-0.5 transition-all no-underline group"
    >
      {/* Photo */}
      <div className="relative h-40 bg-canvas-dark">
        {finding.photoUrl ? (
          <img
            src={finding.photoUrl}
            alt={finding.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-50">{artifact?.icon || '📦'}</span>
          </div>
        )}

        {/* Artifact type badge */}
        <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-slate/90 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
          <span>{artifact?.icon}</span>
          <span>{t(`artifacts.${finding.artifactType}.name`)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-signal-orange transition-colors">
          {finding.title}
        </h3>

        {finding.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {finding.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-gray-500">
          {finding.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{finding.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
