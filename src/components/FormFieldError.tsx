import { AlertCircle } from 'lucide-react'

interface FormFieldErrorProps {
  error?: string
  show?: boolean
  id?: string
}

export default function FormFieldError({ error, show = true, id }: FormFieldErrorProps) {
  if (!error || !show) return null

  return (
    <div
      id={id}
      role="alert"
      className="flex items-center gap-2 mt-2 text-sm text-critical animate-slide-up"
    >
      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span>{error}</span>
    </div>
  )
}
