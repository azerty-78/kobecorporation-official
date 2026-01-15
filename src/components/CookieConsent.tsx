import { useState } from 'react'
import { XMarkIcon, Cog6ToothIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useCookies } from '../contexts/CookieContext'
import type { CookiePreferences } from '../contexts/CookieContext'
import { useLanguage } from '../contexts/LanguageContext'

function CookieConsent() {
  const { language } = useLanguage()
  const { showBanner, preferences, acceptAll, rejectAll, savePreferences, closeSettings } = useCookies()
  const [showDetails, setShowDetails] = useState(false)
  const [tempPreferences, setTempPreferences] = useState<CookiePreferences>(preferences)

  if (!showBanner) return null

  const handleSave = () => {
    savePreferences(tempPreferences)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Ne peut pas être désactivé
    setTempPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] animate-slide-up">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="glass-panel relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-2xl md:p-8">
          {/* Bouton fermer */}
          <button
            onClick={closeSettings}
            className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label={language === 'fr' ? 'Fermer' : 'Close'}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          {!showDetails ? (
            // Vue principale
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50">
                  <Cog6ToothIcon className="h-6 w-6 text-brand-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 font-display text-lg font-semibold text-ink">
                    {language === 'fr' ? 'Gestion des Cookies' : 'Cookie Management'}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {language === 'fr'
                      ? 'Nous utilisons des cookies pour améliorer votre expérience, sauvegarder vos préférences et analyser le trafic. Vous pouvez accepter tous les cookies, les refuser ou personnaliser vos préférences.'
                      : 'We use cookies to improve your experience, save your preferences and analyze traffic. You can accept all cookies, reject them or customize your preferences.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={acceptAll}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[rgb(31,41,55)] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgb(15,23,42)] hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <CheckIcon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">
                    {language === 'fr' ? 'Tout accepter' : 'Accept All'}
                  </span>
                </button>

                <button
                  onClick={() => setShowDetails(true)}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 hover:shadow-md"
                >
                  <Cog6ToothIcon className="h-4 w-4" />
                  <span>
                    {language === 'fr' ? 'Personnaliser' : 'Customize'}
                  </span>
                </button>

                <button
                  onClick={rejectAll}
                  className="rounded-full border-2 border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                >
                  {language === 'fr' ? 'Tout refuser' : 'Reject All'}
                </button>
              </div>
            </div>
          ) : (
            // Vue détaillée avec options
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-display text-lg font-semibold text-ink">
                  {language === 'fr' ? 'Préférences des Cookies' : 'Cookie Preferences'}
                </h3>
                <p className="text-sm text-slate-600">
                  {language === 'fr'
                    ? 'Choisissez les types de cookies que vous souhaitez accepter :'
                    : 'Choose the types of cookies you want to accept:'}
                </p>
              </div>

              <div className="space-y-4">
                {/* Cookies nécessaires */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h4 className="font-semibold text-ink">
                          {language === 'fr' ? 'Cookies Nécessaires' : 'Necessary Cookies'}
                        </h4>
                        <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700">
                          {language === 'fr' ? 'Toujours actif' : 'Always active'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        {language === 'fr'
                          ? 'Ces cookies sont essentiels au fonctionnement du site. Ils ne peuvent pas être désactivés.'
                          : 'These cookies are essential for the website to function. They cannot be disabled.'}
                      </p>
                    </div>
                    <div className="ml-4 flex h-6 w-11 items-center rounded-full bg-brand-600 p-1">
                      <div className="h-4 w-4 translate-x-5 rounded-full bg-white transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Cookies de préférences */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/30">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="mb-1 font-semibold text-ink">
                        {language === 'fr' ? 'Cookies de Préférences' : 'Preference Cookies'}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {language === 'fr'
                          ? 'Ces cookies sauvegardent vos préférences (langue, thème, etc.) pour améliorer votre expérience.'
                          : 'These cookies save your preferences (language, theme, etc.) to improve your experience.'}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('preferences')}
                      className={`ml-4 flex h-6 w-11 items-center rounded-full p-1 transition-colors ${
                        tempPreferences.preferences ? 'bg-brand-600' : 'bg-slate-300'
                      }`}
                    >
                      <div
                        className={`h-4 w-4 rounded-full bg-white transition-transform ${
                          tempPreferences.preferences ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Cookies analytiques */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/30">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="mb-1 font-semibold text-ink">
                        {language === 'fr' ? 'Cookies Analytiques' : 'Analytics Cookies'}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {language === 'fr'
                          ? 'Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site pour l\'améliorer.'
                          : 'These cookies help us understand how visitors use our site to improve it.'}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`ml-4 flex h-6 w-11 items-center rounded-full p-1 transition-colors ${
                        tempPreferences.analytics ? 'bg-brand-600' : 'bg-slate-300'
                      }`}
                    >
                      <div
                        className={`h-4 w-4 rounded-full bg-white transition-transform ${
                          tempPreferences.analytics ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Cookies marketing */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/30">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="mb-1 font-semibold text-ink">
                        {language === 'fr' ? 'Cookies Marketing' : 'Marketing Cookies'}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {language === 'fr'
                          ? 'Ces cookies sont utilisés pour vous montrer des publicités pertinentes et mesurer l\'efficacité des campagnes.'
                          : 'These cookies are used to show you relevant ads and measure campaign effectiveness.'}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`ml-4 flex h-6 w-11 items-center rounded-full p-1 transition-colors ${
                        tempPreferences.marketing ? 'bg-brand-600' : 'bg-slate-300'
                      }`}
                    >
                      <div
                        className={`h-4 w-4 rounded-full bg-white transition-transform ${
                          tempPreferences.marketing ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-4">
                <button
                  onClick={handleSave}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[rgb(31,41,55)] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgb(15,23,42)] hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <CheckIcon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">
                    {language === 'fr' ? 'Enregistrer les préférences' : 'Save Preferences'}
                  </span>
                </button>

                <button
                  onClick={() => setShowDetails(false)}
                  className="rounded-full border-2 border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                >
                  {language === 'fr' ? 'Retour' : 'Back'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
