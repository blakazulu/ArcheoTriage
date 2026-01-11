import { useTranslation } from 'react-i18next'
import { Cross } from 'lucide-react'
import LanguageToggle from './LanguageToggle'

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="bg-gradient-to-b from-slate to-slate-dark px-6 py-4 sticky top-0 z-50 shadow-lg lg:fixed lg:top-0 lg:left-0 lg:right-0">
      <div className="flex justify-between items-center max-w-[600px] mx-auto lg:max-w-[1200px]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-signal-orange rounded flex items-center justify-center shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)]">
            <Cross className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-lg text-white tracking-wider uppercase">
            {t('app.name')}
          </span>
        </div>
        <LanguageToggle />
      </div>
      {/* Hazard stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] hazard-stripe" />
    </header>
  )
}
