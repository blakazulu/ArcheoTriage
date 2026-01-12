import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Clock, CheckCircle, Award } from 'lucide-react'
import type { Lesson } from '../data/lessons'

interface LessonCardProps {
  lesson: Lesson
  isComplete: boolean
  quizScore: number | null
}

export default function LessonCard({ lesson, isComplete, quizScore }: LessonCardProps) {
  const { t } = useTranslation()

  return (
    <Link
      to={`/education/${lesson.id}`}
      className="block bg-white rounded-xl overflow-hidden shadow-card border border-canvas-darker hover:shadow-lifted hover:-translate-y-0.5 transition-all no-underline group"
    >
      {/* Header with icon */}
      <div className="relative bg-gradient-to-br from-slate to-slate-dark p-4">
        <div className="flex items-center justify-between">
          <span className="text-4xl">{lesson.icon}</span>
          {isComplete && (
            <div className="bg-green-500 text-white p-1.5 rounded-full">
              <CheckCircle className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-signal-orange transition-colors">
          {t(`artifacts.${lesson.artifactType}.name`)}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {t(`education.lessonSubtitle.${lesson.artifactType}`)}
        </p>

        {/* Meta info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{lesson.durationMinutes} {t('education.minutes')}</span>
          </div>

          {quizScore !== null && (
            <div className="flex items-center gap-1 text-signal-orange">
              <Award className="w-3 h-3" />
              <span>{quizScore}%</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
