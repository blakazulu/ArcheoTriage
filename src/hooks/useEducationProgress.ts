import { useState, useEffect, useCallback } from 'react'
import {
  loadProgressFromFirestore,
  saveProgressToFirestore,
  type EducationProgress,
  type LessonProgress,
} from '../services/educationService'

export type { LessonProgress }

const STORAGE_KEY = 'archeotriage_education_progress'

function loadProgressLocal(): EducationProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { lessons: {} }
  } catch {
    return { lessons: {} }
  }
}

function saveProgressLocal(progress: EducationProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Failed to save education progress locally:', error)
  }
}

export function useEducationProgress() {
  const [progress, setProgress] = useState<EducationProgress>({ lessons: {} })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      // Try Firestore first, fallback to localStorage
      const firestoreData = await loadProgressFromFirestore()
      if (Object.keys(firestoreData.lessons).length > 0) {
        setProgress(firestoreData)
        saveProgressLocal(firestoreData) // Sync to localStorage
      } else {
        // Load from localStorage and sync to Firestore
        const localData = loadProgressLocal()
        setProgress(localData)
        if (Object.keys(localData.lessons).length > 0) {
          saveProgressToFirestore(localData)
        }
      }
      setIsLoading(false)
    }
    loadData()
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
      saveProgressLocal(updated)
      saveProgressToFirestore(updated)
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
      saveProgressLocal(updated)
      saveProgressToFirestore(updated)
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
    saveProgressLocal(empty)
    saveProgressToFirestore(empty)
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
