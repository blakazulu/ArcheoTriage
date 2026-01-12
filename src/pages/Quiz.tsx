import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ArrowLeft, CheckCircle, XCircle, Trophy } from 'lucide-react'
import { getLessonById, getQuizByLessonId } from '../data/lessons'
import { useEducationProgress } from '../hooks/useEducationProgress'

export default function Quiz() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { saveQuizScore, markLessonComplete } = useEducationProgress()

  const lesson = lessonId ? getLessonById(lessonId) : undefined
  const quiz = lessonId ? getQuizByLessonId(lessonId) : undefined

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [showResult, setShowResult] = useState(false)
  const [answeredCurrent, setAnsweredCurrent] = useState(false)

  const BackArrow = i18n.language === 'he' ? ArrowRight : ArrowLeft

  if (!lesson || !quiz) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">{t('education.quizNotFound')}</p>
        <Link to="/education" className="text-signal-orange font-semibold">
          {t('common.back')}
        </Link>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const totalQuestions = quiz.questions.length
  const isLastQuestion = currentQuestion === totalQuestions - 1

  const handleSelectAnswer = (optionIndex: number) => {
    if (answeredCurrent) return

    setSelectedAnswers(prev => ({
      ...prev,
      [question.id]: optionIndex,
    }))
    setAnsweredCurrent(true)
  }

  // Count correct answers
  const getCorrectCount = () => {
    return quiz.questions.filter(q => {
      const idx = selectedAnswers[q.id]
      return idx !== undefined && q.options[idx]?.correct
    }).length
  }

  // Calculate score percentage (with division by zero protection)
  const calculateScore = () => {
    if (totalQuestions === 0) return 0
    return Math.round((getCorrectCount() / totalQuestions) * 100)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      const score = calculateScore()
      saveQuizScore(lesson.id, score)
      markLessonComplete(lesson.id)
      setShowResult(true)
    } else {
      setCurrentQuestion(prev => prev + 1)
      setAnsweredCurrent(false)
    }
  }

  const getSelectedIndex = () => selectedAnswers[question.id]
  const isCorrectAnswer = (index: number) => question.options[index]?.correct

  // Results screen
  if (showResult) {
    const score = calculateScore()
    const isPassing = score >= 70
    const correctCount = getCorrectCount()
    const incorrectCount = totalQuestions - correctCount

    return (
      <div className="max-w-md mx-auto text-center py-8">
        <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
          isPassing ? 'bg-green-100' : 'bg-amber-100'
        }`}>
          <Trophy className={`w-12 h-12 ${isPassing ? 'text-green-600' : 'text-amber-600'}`} />
        </div>

        <h1 className="font-display text-2xl text-slate mb-2">
          {isPassing ? t('education.quizPassed') : t('education.quizTryAgain')}
        </h1>

        <p className="text-gray-600 mb-6">
          {t('education.yourScore')}: <span className="font-bold text-2xl">{score}%</span>
        </p>

        <div className="bg-white rounded-xl p-4 shadow-card border border-canvas-darker mb-6">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">{correctCount}</p>
              <p className="text-xs text-gray-500">{t('education.correct')}</p>
            </div>
            <div className="border-l border-canvas-darker" />
            <div>
              <p className="text-2xl font-bold text-red-500">{incorrectCount}</p>
              <p className="text-xs text-gray-500">{t('education.incorrect')}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate(`/education/${lesson.id}`)}
            className="w-full px-6 py-3 bg-signal-orange text-white rounded-lg font-semibold hover:bg-signal-orange-light transition-colors"
          >
            {t('education.backToLesson')}
          </button>
          <Link
            to="/education"
            className="block w-full px-6 py-3 border-2 border-stone-light text-gray-700 rounded-lg font-semibold hover:bg-canvas-dark transition-colors no-underline"
          >
            {t('education.allLessons')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Back button */}
      <Link
        to={`/education/${lesson.id}`}
        className="inline-flex items-center gap-2 text-slate hover:text-signal-orange transition-colors mb-6 no-underline font-medium"
      >
        <BackArrow className="w-4 h-4" />
        {t('common.back')}
      </Link>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{t('education.question')} {currentQuestion + 1}/{totalQuestions}</span>
          <span>{lesson.icon} {t(`artifacts.${lesson.artifactType}.name`)}</span>
        </div>
        <div className="h-2 bg-canvas-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-signal-orange rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl p-6 shadow-card border border-canvas-darker mb-6">
        <h2 className="text-lg font-semibold text-slate mb-6">
          {t(question.questionKey)}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = getSelectedIndex() === index
            const showCorrectness = answeredCurrent
            const isCorrect = isCorrectAnswer(index)

            let buttonClass = 'w-full p-4 rounded-lg border-2 text-left transition-all '

            if (showCorrectness) {
              if (isCorrect) {
                buttonClass += 'border-green-500 bg-green-50'
              } else if (isSelected) {
                buttonClass += 'border-red-500 bg-red-50'
              } else {
                buttonClass += 'border-stone-light opacity-50'
              }
            } else if (isSelected) {
              buttonClass += 'border-signal-orange bg-signal-orange/10'
            } else {
              buttonClass += 'border-stone-light hover:border-slate'
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={answeredCurrent}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span className={showCorrectness && isCorrect ? 'text-green-700' : showCorrectness && isSelected && !isCorrect ? 'text-red-700' : ''}>
                    {t(option.key)}
                  </span>
                  {showCorrectness && isCorrect && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {showCorrectness && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Next button */}
      {answeredCurrent && (
        <button
          onClick={handleNext}
          className="w-full px-6 py-4 bg-signal-orange text-white rounded-lg font-semibold hover:bg-signal-orange-light transition-colors"
        >
          {isLastQuestion ? t('education.seeResults') : t('education.nextQuestion')}
        </button>
      )}
    </div>
  )
}
