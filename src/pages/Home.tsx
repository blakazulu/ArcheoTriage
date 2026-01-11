import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Plus, Camera, BookOpen } from 'lucide-react'
import ArtifactCard from '../components/ArtifactCard'
import TriageCard from '../components/TriageCard'
import { artifacts } from '../data/artifacts'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-6">
      {/* Quick Actions */}
      <div className="flex gap-2 mb-8 lg:col-span-2 lg:max-w-[600px]">
        <Link
          to="/identify"
          className="flex-1 flex flex-col items-center gap-1 p-4 bg-signal-orange border-none rounded-lg text-white cursor-pointer transition-all relative overflow-hidden hover:bg-signal-orange-light hover:-translate-y-0.5 active:translate-y-0 no-underline btn-gradient"
        >
          <Plus className="w-6 h-6" />
          <span className="text-sm font-semibold">{t('home.newFinding')}</span>
        </Link>

        <Link
          to="/findings"
          className="flex-1 flex flex-col items-center gap-1 p-4 bg-slate border-none rounded-lg text-white cursor-pointer transition-all relative overflow-hidden hover:bg-slate-light hover:-translate-y-0.5 active:translate-y-0 no-underline btn-gradient"
        >
          <Camera className="w-6 h-6" />
          <span className="text-sm font-semibold">{t('home.documentation')}</span>
        </Link>

        <Link
          to="/education"
          className="flex-1 flex flex-col items-center gap-1 p-4 bg-slate border-none rounded-lg text-white cursor-pointer transition-all relative overflow-hidden hover:bg-slate-light hover:-translate-y-0.5 active:translate-y-0 no-underline btn-gradient"
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-sm font-semibold">{t('home.learning')}</span>
        </Link>
      </div>

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
