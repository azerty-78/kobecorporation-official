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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Détecter la langue du navigateur ou utiliser celle sauvegardée
    const saved = localStorage.getItem('kobe-language') as Language
    if (saved && (saved === 'fr' || saved === 'en')) {
      return saved
    }
    const browserLang = navigator.language.split('-')[0]
    return browserLang === 'fr' ? 'fr' : 'en'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('kobe-language', lang)
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
