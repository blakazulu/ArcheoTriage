import { useTranslation } from 'react-i18next'
import { BookOpen } from 'lucide-react'

export default function Education() {
  const { t } = useTranslation()

  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 mx-auto mb-6 bg-canvas-dark rounded-full flex items-center justify-center">
        <BookOpen className="w-10 h-10 text-stone" />
      </div>

      <h1 className="font-display text-xl text-slate tracking-wide uppercase mb-2">
        {t('education.title')}
      </h1>

      <p className="text-gray-600">
        {t('education.comingSoon')}
      </p>
    </div>
  )
}
