import { useTranslation } from 'react-i18next'
import { FolderOpen, Plus } from 'lucide-react'
import { Link } from 'react-router'

export default function Findings() {
  const { t } = useTranslation()

  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 mx-auto mb-6 bg-canvas-dark rounded-full flex items-center justify-center">
        <FolderOpen className="w-10 h-10 text-stone" />
      </div>

      <h1 className="font-display text-xl text-slate tracking-wide uppercase mb-2">
        {t('findings.title')}
      </h1>

      <p className="text-gray-600 mb-6">
        {t('findings.empty')}
      </p>

      <Link
        to="/identify"
        className="inline-flex items-center gap-2 px-6 py-3 bg-signal-orange text-white rounded-lg font-semibold hover:bg-signal-orange-light transition-colors no-underline"
      >
        <Plus className="w-5 h-5" />
        {t('findings.addFirst')}
      </Link>
    </div>
  )
}
