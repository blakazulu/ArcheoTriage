import { useParams, Link, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ArrowLeft, Clock, CheckCircle, PlayCircle } from 'lucide-react'
import { getLessonById, getQuizByLessonId } from '../data/lessons'
import { useEducationProgress } from '../hooks/useEducationProgress'

export default function LessonDetail() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { markLessonComplete, isLessonComplete, getQuizScore } = useEducationProgress()

  const lesson = lessonId ? getLessonById(lessonId) : undefined
  const quiz = lessonId ? getQuizByLessonId(lessonId) : undefined
  const isComplete = lessonId ? isLessonComplete(lessonId) : false
  const quizScore = lessonId ? getQuizScore(lessonId) : null

  const BackArrow = i18n.language === 'he' ? ArrowRight : ArrowLeft

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">{t('education.lessonNotFound')}</p>
        <Link to="/education" className="text-signal-orange font-semibold">
          {t('common.back')}
        </Link>
      </div>
    )
  }

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id)
  }

  const handleStartQuiz = () => {
    navigate(`/education/${lesson.id}/quiz`)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <Link
        to="/education"
        className="inline-flex items-center gap-2 text-slate hover:text-signal-orange transition-colors mb-6 no-underline font-medium"
      >
        <BackArrow className="w-4 h-4" />
        {t('common.back')}
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-card border border-canvas-darker overflow-hidden mb-6">
        <div className="bg-gradient-to-br from-slate to-slate-dark p-6">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{lesson.icon}</span>
            <div>
              <h1 className="font-display text-xl text-white tracking-wide uppercase">
                {t(`artifacts.${lesson.artifactType}.name`)}
              </h1>
              <p className="text-slate-light text-sm">
                {t(`education.lessonSubtitle.${lesson.artifactType}`)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 flex items-center justify-between border-b border-canvas-darker">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{lesson.durationMinutes} {t('education.minutes')}</span>
            </div>
            {isComplete && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>{t('education.completed')}</span>
              </div>
            )}
          </div>
          {quizScore !== null && (
            <div className="text-sm font-medium text-signal-orange ltr:ml-auto rtl:mr-auto">
              {t('education.quizScore')}: {quizScore}%
            </div>
          )}
        </div>
      </div>

      {/* Lesson Content */}
      <div className="space-y-6 mb-8">
        {lesson.sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-card border border-canvas-darker"
          >
            <h2 className="font-semibold text-slate mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-signal-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              {t(section.titleKey)}
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {t(section.contentKey)}
            </p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {!isComplete && (
          <button
            onClick={handleMarkComplete}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate text-white rounded-lg font-semibold hover:bg-slate-light transition-colors"
          >
            <CheckCircle className="w-5 h-5" />
            {t('education.markComplete')}
          </button>
        )}

        {quiz && (
          <button
            onClick={handleStartQuiz}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-signal-orange text-white rounded-lg font-semibold hover:bg-signal-orange-light transition-colors"
          >
            <PlayCircle className="w-5 h-5" />
            {quizScore !== null ? t('education.retakeQuiz') : t('education.takeQuiz')}
          </button>
        )}

        {/* Link to preservation guide */}
        <Link
          to={`/guide/${lesson.artifactType}`}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-stone-light text-gray-700 rounded-lg font-semibold hover:bg-canvas-dark transition-colors no-underline"
        >
          {t('education.viewPreservationGuide')}
        </Link>
      </div>
    </div>
  )
}
