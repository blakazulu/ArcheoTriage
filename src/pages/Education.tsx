import { useTranslation } from 'react-i18next'
import { BookOpen, Trophy } from 'lucide-react'
import { lessons } from '../data/lessons'
import { useEducationProgress } from '../hooks/useEducationProgress'
import LessonCard from '../components/LessonCard'

export default function Education() {
  const { t } = useTranslation()
  const { isLoading, isLessonComplete, getQuizScore, getCompletedCount, getQuizCompletedCount } = useEducationProgress()

  const completedLessons = getCompletedCount()
  const completedQuizzes = getQuizCompletedCount()
  const totalLessons = lessons.length

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
      <div className="mb-6">
        <h1 className="font-display text-lg text-slate tracking-wide uppercase">
          {t('education.title')}
        </h1>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl p-4 shadow-card border border-canvas-darker mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-signal-orange/10 rounded-full flex items-center justify-center">
            <Trophy className="w-7 h-7 text-signal-orange" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">{t('education.yourProgress')}</p>
            <p className="text-lg font-semibold text-slate">
              {completedLessons}/{totalLessons} {t('education.lessonsCompleted')}
            </p>
            {completedQuizzes > 0 && (
              <p className="text-xs text-gray-500">
                {completedQuizzes} {t('education.quizzesPassed')}
              </p>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 bg-canvas-dark rounded-full overflow-hidden">
            <div
              className="h-full bg-signal-orange rounded-full transition-all duration-500"
              style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-slate" />
        <h2 className="font-semibold text-slate">{t('education.lessons')}</h2>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {lessons.map(lesson => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isComplete={isLessonComplete(lesson.id)}
            quizScore={getQuizScore(lesson.id)}
          />
        ))}
      </div>
    </div>
  )
}
