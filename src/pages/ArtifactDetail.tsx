import { useParams, Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import PreservationGuide from '../components/PreservationGuide'
import { getArtifactById } from '../data/artifacts'

export default function ArtifactDetail() {
  const { artifactId } = useParams<{ artifactId: string }>()
  const { t, i18n } = useTranslation()

  const artifact = artifactId ? getArtifactById(artifactId) : undefined

  if (!artifact) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Artifact not found</p>
        <Link to="/guide" className="text-signal-orange font-semibold">
          {t('common.back')}
        </Link>
      </div>
    )
  }

  const BackArrow = i18n.language === 'he' ? ArrowRight : ArrowLeft

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <Link
        to="/guide"
        className="inline-flex items-center gap-2 text-slate hover:text-signal-orange transition-colors mb-6 no-underline font-medium"
      >
        <BackArrow className="w-4 h-4" />
        {t('common.back')}
      </Link>

      {/* Preservation guide */}
      <PreservationGuide artifact={artifact} />
    </div>
  )
}
