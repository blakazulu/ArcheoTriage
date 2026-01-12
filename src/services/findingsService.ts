import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { getDeviceId } from './deviceId'
import type { Finding } from '../types/finding'

function getFindingsCollection() {
  const deviceId = getDeviceId()
  return collection(db, 'devices', deviceId, 'findings')
}

export async function loadFindingsFromFirestore(): Promise<Finding[]> {
  try {
    const findingsRef = getFindingsCollection()
    const q = query(findingsRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    })) as Finding[]
  } catch (error) {
    console.warn('Failed to load findings from Firestore:', error)
    return []
  }
}

export async function saveFindingToFirestore(finding: Finding): Promise<void> {
  try {
    const findingsRef = getFindingsCollection()
    await setDoc(doc(findingsRef, finding.id), finding)
  } catch (error) {
    console.warn('Failed to save finding to Firestore:', error)
  }
}

export async function updateFindingInFirestore(id: string, data: Partial<Finding>): Promise<void> {
  try {
    const findingsRef = getFindingsCollection()
    await updateDoc(doc(findingsRef, id), data)
  } catch (error) {
    console.warn('Failed to update finding in Firestore:', error)
  }
}

export async function deleteFindingFromFirestore(id: string): Promise<void> {
  try {
    const findingsRef = getFindingsCollection()
    await deleteDoc(doc(findingsRef, id))
  } catch (error) {
    console.warn('Failed to delete finding from Firestore:', error)
  }
}
