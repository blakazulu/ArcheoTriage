import { useState, useEffect, useCallback } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'archeotriage_install_dismissed'
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      const dismissed = localStorage.getItem(DISMISS_KEY)
      if (dismissed) {
        return Date.now() - parseInt(dismissed) < DISMISS_DURATION
      }
    } catch {
      // localStorage not available
    }
    return false
  })

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        setIsInstalled(true)
      }

      setDeferredPrompt(null)
      return outcome === 'accepted'
    } catch (error) {
      console.error('Install prompt error:', error)
      return false
    }
  }, [deferredPrompt])

  const dismissPrompt = useCallback(() => {
    setIsDismissed(true)
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString())
    } catch {
      // localStorage not available
    }
  }, [])

  return {
    isInstallable: !!deferredPrompt && !isInstalled && !isDismissed,
    isInstalled,
    promptInstall,
    dismissPrompt,
  }
}
