import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'archeotriage_education_progress'

export interface LessonProgress {
  lessonId: string
  completed: boolean
  completedAt: string | null
  quizScore: number | null
  quizCompletedAt: string | null
}

interface EducationProgress {
  lessons: Record<string, LessonProgress>
}

function loadProgress(): EducationProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { lessons: {} }
  } catch {
    return { lessons: {} }
  }
}

function saveProgress(progress: EducationProgress): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    return true
  } catch (error) {
    console.error('Failed to save education progress:', error)
    return false
  }
}

export function useEducationProgress() {
  const [progress, setProgress] = useState<EducationProgress>({ lessons: {} })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setProgress(loadProgress())
    setIsLoading(false)
  }, [])

  const markLessonComplete = useCallback((lessonId: string) => {
    setProgress(prev => {
      const updated: EducationProgress = {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...prev.lessons[lessonId],
            lessonId,
            completed: true,
            completedAt: new Date().toISOString(),
            quizScore: prev.lessons[lessonId]?.quizScore ?? null,
            quizCompletedAt: prev.lessons[lessonId]?.quizCompletedAt ?? null,
          },
        },
      }
      saveProgress(updated)
      return updated
    })
  }, [])

  const saveQuizScore = useCallback((lessonId: string, score: number) => {
    setProgress(prev => {
      const existing = prev.lessons[lessonId]
      const updated: EducationProgress = {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            lessonId,
            completed: existing?.completed ?? false,
            completedAt: existing?.completedAt ?? null,
            quizScore: score,
            quizCompletedAt: new Date().toISOString(),
          },
        },
      }
      saveProgress(updated)
      return updated
    })
  }, [])

  const getLessonProgress = useCallback((lessonId: string): LessonProgress | undefined => {
    return progress.lessons[lessonId]
  }, [progress])

  const isLessonComplete = useCallback((lessonId: string): boolean => {
    return progress.lessons[lessonId]?.completed ?? false
  }, [progress])

  const getQuizScore = useCallback((lessonId: string): number | null => {
    return progress.lessons[lessonId]?.quizScore ?? null
  }, [progress])

  const getCompletedCount = useCallback((): number => {
    return Object.values(progress.lessons).filter(l => l.completed).length
  }, [progress])

  const getQuizCompletedCount = useCallback((): number => {
    return Object.values(progress.lessons).filter(l => l.quizScore !== null).length
  }, [progress])

  const resetProgress = useCallback(() => {
    const empty: EducationProgress = { lessons: {} }
    saveProgress(empty)
    setProgress(empty)
  }, [])

  return {
    progress,
    isLoading,
    markLessonComplete,
    saveQuizScore,
    getLessonProgress,
    isLessonComplete,
    getQuizScore,
    getCompletedCount,
    getQuizCompletedCount,
    resetProgress,
  }
}
