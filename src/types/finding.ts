import type { RiskType } from '../data/artifacts'

export interface Finding {
  id: string
  artifactType: string
  title: string
  description: string
  location: string
  photoUrl: string | null
  riskNotes: string
  risks: RiskType[]
  createdAt: string
  updatedAt: string
  language: 'he' | 'en'
}

export type FindingInput = Omit<Finding, 'id' | 'createdAt' | 'updatedAt'>
