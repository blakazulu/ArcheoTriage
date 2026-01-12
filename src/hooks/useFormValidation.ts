import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: unknown) => string | null
}

export interface ValidationRules {
  [field: string]: ValidationRule
}

export function useFormValidation(rules: ValidationRules) {
  const { t } = useTranslation()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = useCallback((field: string, value: unknown): string | null => {
    const rule = rules[field]
    if (!rule) return null

    const stringValue = typeof value === 'string' ? value : ''

    // Required check
    if (rule.required && (!value || !stringValue.trim())) {
      return t('validation.required')
    }

    // Skip other checks if empty and not required
    if (!value || !stringValue.trim()) {
      return null
    }

    // Min length check
    if (rule.minLength && stringValue.length < rule.minLength) {
      return t('validation.minLength', { count: rule.minLength })
    }

    // Max length check
    if (rule.maxLength && stringValue.length > rule.maxLength) {
      return t('validation.maxLength', { count: rule.maxLength })
    }

    // Pattern check
    if (rule.pattern && !rule.pattern.test(stringValue)) {
      return t('validation.invalid')
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value)
    }

    return null
  }, [rules, t])

  const validate = useCallback((field: string, value: unknown) => {
    const error = validateField(field, value)
    setErrors(prev => ({
      ...prev,
      [field]: error || ''
    }))
    return !error
  }, [validateField])

  const validateAll = useCallback((values: Record<string, unknown>) => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    Object.keys(rules).forEach(field => {
      const error = validateField(field, values[field])
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    // Mark all fields as touched on form submit
    const allTouched: Record<string, boolean> = {}
    Object.keys(rules).forEach(field => {
      allTouched[field] = true
    })
    setTouched(allTouched)

    return isValid
  }, [rules, validateField])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const touchField = useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }, [])

  const resetValidation = useCallback(() => {
    setErrors({})
    setTouched({})
  }, [])

  return {
    errors,
    touched,
    validate,
    validateAll,
    clearErrors,
    clearError,
    touchField,
    resetValidation,
  }
}
