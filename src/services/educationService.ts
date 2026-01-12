import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { getDeviceId } from './deviceId'

export interface LessonProgress {
  lessonId: string
  completed: boolean
  completedAt: string | null
  quizScore: number | null
  quizCompletedAt: string | null
}

export interface EducationProgress {
  lessons: Record<string, LessonProgress>
}

function getProgressDocRef() {
  const deviceId = getDeviceId()
  return doc(db, 'devices', deviceId, 'progress', 'education')
}

export async function loadProgressFromFirestore(): Promise<EducationProgress> {
  try {
    const docRef = getProgressDocRef()
    const snapshot = await getDoc(docRef)

    if (snapshot.exists()) {
      return snapshot.data() as EducationProgress
    }
    return { lessons: {} }
  } catch (error) {
    console.warn('Failed to load progress from Firestore:', error)
    return { lessons: {} }
  }
}

export async function saveProgressToFirestore(progress: EducationProgress): Promise<void> {
  try {
    const docRef = getProgressDocRef()
    await setDoc(docRef, progress, { merge: true })
  } catch (error) {
    console.warn('Failed to save progress to Firestore:', error)
  }
}
