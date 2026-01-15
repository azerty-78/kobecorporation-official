import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Language } from '../utils/i18n'
import { getTranslation } from '../utils/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (path: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Fonction helper pour vérifier si on peut utiliser localStorage
const canUseStorage = (): boolean => {
  try {
    const consent = localStorage.getItem('kobe-cookie-consent')
    const prefs = localStorage.getItem('kobe-cookie-preferences')
    
    if (consent === 'true' && prefs) {
      try {
        const parsed = JSON.parse(prefs)
        return parsed.preferences === true
      } catch {
        return true // Par défaut, on autorise si erreur de parsing
      }
    }
    // Si pas de consentement encore, on autorise (première visite)
    return true
  } catch {
    return false
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Détecter la langue du navigateur ou utiliser celle sauvegardée
    if (canUseStorage()) {
      try {
        const saved = localStorage.getItem('kobe-language') as Language
        if (saved && (saved === 'fr' || saved === 'en')) {
          return saved
        }
      } catch {
        // Ignorer les erreurs
      }
    }
    const browserLang = navigator.language.split('-')[0]
    return browserLang === 'fr' ? 'fr' : 'en'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (canUseStorage()) {
      try {
        localStorage.setItem('kobe-language', lang)
      } catch {
        // Ignorer les erreurs de localStorage
      }
    }
  }

  const t = (path: string) => getTranslation(language, path)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
