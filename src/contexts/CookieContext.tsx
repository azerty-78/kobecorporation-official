import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type CookiePreferences = {
  necessary: boolean // Toujours true, nécessaire au fonctionnement
  preferences: boolean // Pour sauvegarder les préférences (langue, etc.)
  analytics: boolean // Pour les statistiques (futur)
  marketing: boolean // Pour le marketing (futur)
}

interface CookieContextType {
  preferences: CookiePreferences
  hasConsented: boolean
  showBanner: boolean
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (prefs: CookiePreferences) => void
  openSettings: () => void
  closeSettings: () => void
}

const CookieContext = createContext<CookieContextType | undefined>(undefined)

const COOKIE_CONSENT_KEY = 'kobe-cookie-consent'
const COOKIE_PREFERENCES_KEY = 'kobe-cookie-preferences'

const defaultPreferences: CookiePreferences = {
  necessary: true, // Toujours activé
  preferences: false,
  analytics: false,
  marketing: false,
}

export function CookieProvider({ children }: { children: ReactNode }) {
  const [hasConsented, setHasConsented] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY)

    if (consent === 'true' && savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs) as CookiePreferences
        setPreferences({ ...defaultPreferences, ...prefs, necessary: true })
        setHasConsented(true)
        setShowBanner(false)
      } catch {
        // Si erreur de parsing, réinitialiser
        setShowBanner(true)
      }
    } else {
      // Pas de consentement encore donné
      setShowBanner(true)
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    // Toujours activer les cookies nécessaires
    const finalPrefs = { ...prefs, necessary: true }
    setPreferences(finalPrefs)
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(finalPrefs))
    setHasConsented(true)
    setShowBanner(false)

    // Si les préférences sont désactivées, nettoyer les données correspondantes
    if (!finalPrefs.preferences) {
      // Garder la langue mais on pourrait nettoyer d'autres préférences
      // localStorage.removeItem('kobe-language') // On garde la langue car c'est essentiel
    }
  }

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    }
    savePreferences(allAccepted)
  }

  const rejectAll = () => {
    // Seulement les cookies nécessaires
    savePreferences(defaultPreferences)
  }

  const openSettings = () => {
    setShowBanner(true)
  }

  const closeSettings = () => {
    setShowBanner(false)
  }

  return (
    <CookieContext.Provider
      value={{
        preferences,
        hasConsented,
        showBanner,
        acceptAll,
        rejectAll,
        savePreferences,
        openSettings,
        closeSettings,
      }}
    >
      {children}
    </CookieContext.Provider>
  )
}

export function useCookies() {
  const context = useContext(CookieContext)
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider')
  }
  return context
}
