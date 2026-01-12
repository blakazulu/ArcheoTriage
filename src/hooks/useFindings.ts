import { useState, useEffect, useCallback } from 'react'
import type { Finding, FindingInput } from '../types/finding'
import {
  loadFindingsFromFirestore,
  saveFindingToFirestore,
  updateFindingInFirestore,
  deleteFindingFromFirestore,
} from '../services/findingsService'

const STORAGE_KEY = 'archeotriage_findings'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
}

function loadFindingsLocal(): Finding[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveFindingsLocal(findings: Finding[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(findings))
  } catch (error) {
    console.error('Failed to save findings locally:', error)
  }
}

export function useFindings() {
  const [findings, setFindings] = useState<Finding[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      // Try Firestore first, fallback to localStorage
      const firestoreData = await loadFindingsFromFirestore()
      if (firestoreData.length > 0) {
        setFindings(firestoreData)
        saveFindingsLocal(firestoreData) // Sync to localStorage
      } else {
        // Load from localStorage and sync to Firestore
        const localData = loadFindingsLocal()
        setFindings(localData)
        // Upload local data to Firestore (migration)
        for (const finding of localData) {
          saveFindingToFirestore(finding)
        }
      }
      setIsLoading(false)
    }
    loadData()
  }, [])

  const addFinding = useCallback((input: FindingInput): Finding => {
    const now = new Date().toISOString()
    const newFinding: Finding = {
      ...input,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }

    setFindings(prev => {
      const updated = [newFinding, ...prev]
      saveFindingsLocal(updated)
      return updated
    })

    // Sync to Firestore
    saveFindingToFirestore(newFinding)

    return newFinding
  }, [])

  const updateFinding = useCallback((id: string, input: Partial<FindingInput>): Finding | null => {
    let updatedFinding: Finding | null = null
    const updateData = { ...input, updatedAt: new Date().toISOString() }

    setFindings(prev => {
      const updated = prev.map(f => {
        if (f.id === id) {
          updatedFinding = { ...f, ...updateData }
          return updatedFinding
        }
        return f
      })
      saveFindingsLocal(updated)
      return updated
    })

    // Sync to Firestore
    updateFindingInFirestore(id, updateData)

    return updatedFinding
  }, [])

  const deleteFinding = useCallback((id: string): boolean => {
    let deleted = false

    setFindings(prev => {
      const updated = prev.filter(f => {
        if (f.id === id) {
          deleted = true
          return false
        }
        return true
      })
      saveFindingsLocal(updated)
      return updated
    })

    // Sync to Firestore
    if (deleted) {
      deleteFindingFromFirestore(id)
    }

    return deleted
  }, [])

  const getFinding = useCallback((id: string): Finding | undefined => {
    return findings.find(f => f.id === id)
  }, [findings])

  return {
    findings,
    isLoading,
    addFinding,
    updateFinding,
    deleteFinding,
    getFinding,
  }
}
