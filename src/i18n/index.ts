import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import he from './he.json'
import en from './en.json'

const LANG_KEY = 'archeotriage_language'

function getInitialLanguage(): string {
  // Check localStorage first
  try {
    const stored = localStorage.getItem(LANG_KEY)
    if (stored === 'he' || stored === 'en') {
      return stored
    }
  } catch {
    // localStorage not available
  }

  // Detect from browser
  const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || ''
  return browserLang.startsWith('he') ? 'he' : 'en'
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      he: { translation: he },
      en: { translation: en },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(LANG_KEY, lng)
  } catch {
    // localStorage not available
  }
})

export default i18n
