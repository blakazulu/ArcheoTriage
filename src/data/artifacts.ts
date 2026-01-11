export type RiskLevel = 'critical' | 'high' | 'medium' | 'low'
export type RiskType = 'humidity' | 'temperature' | 'shock' | 'light' | 'oxygen'

export interface PreservationStep {
  titleKey: string
  descriptionKey: string
}

export interface Artifact {
  id: string
  icon: string
  riskLevel: RiskLevel
  scientificDomain: string
  risks: RiskType[]
  preservationSteps: PreservationStep[]
  successIndicators: string[]
  materials: string[]
  warnings: string[]
}

export const artifacts: Artifact[] = [
  {
    id: 'ceramics',
    icon: '🏺',
    riskLevel: 'high',
    scientificDomain: 'physics',
    risks: ['shock', 'temperature', 'humidity'],
    preservationSteps: [
      { titleKey: 'ceramics.step1.title', descriptionKey: 'ceramics.step1.description' },
      { titleKey: 'ceramics.step2.title', descriptionKey: 'ceramics.step2.description' },
      { titleKey: 'ceramics.step3.title', descriptionKey: 'ceramics.step3.description' },
      { titleKey: 'ceramics.step4.title', descriptionKey: 'ceramics.step4.description' },
    ],
    successIndicators: ['ceramics.success1', 'ceramics.success2'],
    materials: [
      'rigid_plastic_box',
      'medium_density_foam',
      'acid_free_paper',
    ],
    warnings: [
      'no_pressure_on_edges',
      'avoid_rapid_temperature_changes',
    ],
  },
  {
    id: 'metals',
    icon: '🪙',
    riskLevel: 'high',
    scientificDomain: 'chemistry',
    risks: ['humidity', 'oxygen'],
    preservationSteps: [
      { titleKey: 'metals.step1.title', descriptionKey: 'metals.step1.description' },
      { titleKey: 'metals.step2.title', descriptionKey: 'metals.step2.description' },
      { titleKey: 'metals.step3.title', descriptionKey: 'metals.step3.description' },
      { titleKey: 'metals.step4.title', descriptionKey: 'metals.step4.description' },
    ],
    successIndicators: ['metals.success1', 'metals.success2'],
    materials: [
      'sealed_container',
      'silica_gel',
      'inert_foam',
      'acid_free_paper',
    ],
    warnings: [
      'no_direct_touch',
      'avoid_moisture',
    ],
  },
  {
    id: 'organic',
    icon: '🦴',
    riskLevel: 'medium',
    scientificDomain: 'biology',
    risks: ['humidity', 'shock', 'temperature'],
    preservationSteps: [
      { titleKey: 'organic.step1.title', descriptionKey: 'organic.step1.description' },
      { titleKey: 'organic.step2.title', descriptionKey: 'organic.step2.description' },
      { titleKey: 'organic.step3.title', descriptionKey: 'organic.step3.description' },
      { titleKey: 'organic.step4.title', descriptionKey: 'organic.step4.description' },
    ],
    successIndicators: ['organic.success1', 'organic.success2'],
    materials: [
      'low_density_foam',
      'cotton_paper',
      'gloves',
    ],
    warnings: [
      'minimal_touch',
      'use_gloves',
      'avoid_rapid_drying',
    ],
  },
  {
    id: 'textiles',
    icon: '🧵',
    riskLevel: 'high',
    scientificDomain: 'chemistry',
    risks: ['light', 'humidity', 'temperature'],
    preservationSteps: [
      { titleKey: 'textiles.step1.title', descriptionKey: 'textiles.step1.description' },
      { titleKey: 'textiles.step2.title', descriptionKey: 'textiles.step2.description' },
      { titleKey: 'textiles.step3.title', descriptionKey: 'textiles.step3.description' },
      { titleKey: 'textiles.step4.title', descriptionKey: 'textiles.step4.description' },
    ],
    successIndicators: ['textiles.success1', 'textiles.success2'],
    materials: [
      'acid_free_tube',
      'tissue_paper',
      'dark_container',
    ],
    warnings: [
      'never_fold',
      'avoid_light',
    ],
  },
  {
    id: 'scrolls',
    icon: '📜',
    riskLevel: 'critical',
    scientificDomain: 'chemistry',
    risks: ['humidity', 'light', 'temperature', 'shock'],
    preservationSteps: [
      { titleKey: 'scrolls.step1.title', descriptionKey: 'scrolls.step1.description' },
      { titleKey: 'scrolls.step2.title', descriptionKey: 'scrolls.step2.description' },
      { titleKey: 'scrolls.step3.title', descriptionKey: 'scrolls.step3.description' },
      { titleKey: 'scrolls.step4.title', descriptionKey: 'scrolls.step4.description' },
    ],
    successIndicators: ['scrolls.success1', 'scrolls.success2'],
    materials: [
      'rigid_support',
      'tissue_paper',
      'sealed_container',
    ],
    warnings: [
      'never_open',
      'never_unroll',
      'handle_with_extreme_care',
    ],
  },
]

export const riskFactors: { id: RiskType; severity: 'critical' | 'warning' | 'stable' }[] = [
  { id: 'humidity', severity: 'critical' },
  { id: 'temperature', severity: 'warning' },
  { id: 'shock', severity: 'stable' },
  { id: 'light', severity: 'warning' },
  { id: 'oxygen', severity: 'critical' },
]

export function getArtifactById(id: string): Artifact | undefined {
  return artifacts.find(a => a.id === id)
}

export function getRiskLevelColor(level: RiskLevel): string {
  switch (level) {
    case 'critical':
      return 'critical'
    case 'high':
      return 'critical'
    case 'medium':
      return 'warning'
    case 'low':
      return 'stable'
  }
}
