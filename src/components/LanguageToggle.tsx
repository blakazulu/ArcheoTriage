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
      className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white font-body-en text-xs font-semibold cursor-pointer transition-all hover:bg-white/20"
    >
      {i18n.language === 'he' ? 'EN' : 'עב'}
    </button>
  )
}
