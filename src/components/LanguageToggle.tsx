import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'he' ? 'en' : 'he'
    i18n.changeLanguage(newLang)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="bg-white/10 border border-white/20 rounded min-h-[44px] min-w-[44px] px-3 py-2 text-white text-sm font-semibold cursor-pointer transition-all hover:bg-white/20"
      style={{ fontFamily: 'var(--font-body-en)' }}
    >
      {i18n.language === 'he' ? 'EN' : 'עב'}
    </button>
  )
}
