import { useState, useEffect, useCallback } from 'react'
import type { Finding, FindingInput } from '../types/finding'

const STORAGE_KEY = 'archeotriage_findings'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
}

function loadFindings(): Finding[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveFindings(findings: Finding[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(findings))
    return true
  } catch (error) {
    console.error('Failed to save findings:', error)
    return false
  }
}

export function useFindings() {
  const [findings, setFindings] = useState<Finding[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setFindings(loadFindings())
    setIsLoading(false)
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
      saveFindings(updated)
      return updated
    })

    return newFinding
  }, [])

  const updateFinding = useCallback((id: string, input: Partial<FindingInput>): Finding | null => {
    let updatedFinding: Finding | null = null

    setFindings(prev => {
      const updated = prev.map(f => {
        if (f.id === id) {
          updatedFinding = {
            ...f,
            ...input,
            updatedAt: new Date().toISOString(),
          }
          return updatedFinding
        }
        return f
      })
      saveFindings(updated)
      return updated
    })

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
      saveFindings(updated)
      return updated
    })

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
