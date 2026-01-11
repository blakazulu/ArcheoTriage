import { useTranslation } from 'react-i18next'
import ArtifactCard from '../components/ArtifactCard'
import TriageCard from '../components/TriageCard'
import { artifacts } from '../data/artifacts'

export default function Guide() {
  const { t } = useTranslation()

  return (
    <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-6">
      {/* Artifact Types Section */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <span className="font-display text-sm text-slate tracking-wider uppercase">
            {t('home.artifactTypes')}
          </span>
          <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent to-stone rtl:bg-gradient-to-r" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {artifacts.map((artifact, index) => (
            <ArtifactCard key={artifact.id} artifact={artifact} index={index} />
          ))}
        </div>
      </div>

      {/* Triage Quick Reference */}
      <div className="lg:row-span-2">
        <div className="flex items-center gap-4 mb-6 lg:hidden">
          <span className="font-display text-sm text-slate tracking-wider uppercase">
            {t('home.quickReference')}
          </span>
          <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent to-stone rtl:bg-gradient-to-r" />
        </div>

        <div className="lg:sticky lg:top-24">
          <TriageCard />
        </div>
      </div>
    </div>
  )
}
