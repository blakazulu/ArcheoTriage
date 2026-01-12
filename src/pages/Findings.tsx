import { useTranslation } from 'react-i18next'
import { FolderOpen, Plus, Search } from 'lucide-react'
import { Link } from 'react-router'
import { useState } from 'react'
import { useFindings } from '../hooks/useFindings'
import FindingCard from '../components/FindingCard'

export default function Findings() {
  const { t } = useTranslation()
  const { findings, isLoading } = useFindings()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFindings = findings.filter(finding =>
    finding.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (finding.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (finding.location || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-10 h-10 border-4 border-signal-orange border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-lg text-slate tracking-wide uppercase">
          {t('findings.title')}
        </h1>
        <Link
          to="/identify"
          className="flex items-center gap-2 px-4 py-2 bg-signal-orange text-white rounded-lg font-semibold hover:bg-signal-orange-light transition-colors no-underline text-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">{t('findings.add')}</span>
        </Link>
      </div>

      {findings.length > 0 ? (
        <>
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('findings.search')}
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-stone-light focus:border-slate focus:outline-none transition-colors bg-white"
            />
          </div>

          {/* Findings Grid */}
          {filteredFindings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFindings.map(finding => (
                <FindingCard key={finding.id} finding={finding} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {t('findings.noResults')}
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-canvas-dark rounded-full flex items-center justify-center">
            <FolderOpen className="w-10 h-10 text-stone" />
          </div>

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
      )}
    </div>
  )
}
