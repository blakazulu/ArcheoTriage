import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import LanguageToggle from './LanguageToggle'

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="bg-gradient-to-b from-slate to-slate-dark px-6 py-4 sticky top-0 z-50 shadow-lg lg:fixed lg:top-0 lg:left-0 lg:right-0">
      <div className="flex justify-between items-center max-w-[600px] mx-auto lg:max-w-[1200px]">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img
            src="/logo-64.png"
            alt="ArcheoTriage"
            className="w-11 h-11 rounded-lg bg-white p-0.5 shadow-md"
          />
          <span className="font-display text-lg text-white tracking-wider uppercase hidden sm:inline">
            {t('app.name')}
          </span>
        </Link>
        <LanguageToggle />
      </div>
      {/* Hazard stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] hazard-stripe" />
    </header>
  )
}
