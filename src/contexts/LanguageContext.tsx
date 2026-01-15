import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Language } from '../utils/i18n'
import { getTranslation } from '../utils/i18n'
import { useCookies } from './CookieContext'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (path: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Utiliser le contexte des cookies pour vérifier si on peut utiliser localStorage
  let cookieContext
  try {
    cookieContext = useCookies()
  } catch {
    // Si le contexte n'est pas disponible, on peut quand même fonctionner
    cookieContext = null
  }

  const canUseStorage = cookieContext ? cookieContext.preferences.preferences : true

  const [language, setLanguageState] = useState<Language>(() => {
    // Détecter la langue du navigateur ou utiliser celle sauvegardée
    if (canUseStorage) {
      const saved = localStorage.getItem('kobe-language') as Language
      if (saved && (saved === 'fr' || saved === 'en')) {
        return saved
      }
    }
    const browserLang = navigator.language.split('-')[0]
    return browserLang === 'fr' ? 'fr' : 'en'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (canUseStorage) {
      localStorage.setItem('kobe-language', lang)
    }
  }

  // Mettre à jour si les préférences de cookies changent
  useEffect(() => {
    if (cookieContext && !cookieContext.preferences.preferences) {
      // Si les préférences sont désactivées, on garde la langue en mémoire mais on ne la sauvegarde pas
      // La langue reste en mémoire pour la session
    }
  }, [cookieContext?.preferences.preferences])

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
