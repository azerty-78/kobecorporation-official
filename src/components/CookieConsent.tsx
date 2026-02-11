import { useState } from 'react'
import { XMarkIcon, Cog6ToothIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useCookies } from '../contexts/CookieContext'
import type { CookiePreferences } from '../contexts/CookieContext'
import { useLanguage } from '../contexts/LanguageContext'
import { Button } from './ui/Button'

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
    <div className="fixed inset-x-0 bottom-0 z-[100] max-h-[90vh] overflow-y-auto bg-gradient-to-t from-black/40 via-black/10 to-transparent backdrop-blur-sm animate-slide-up">
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-5 lg:px-8">
        <div className="glass-panel relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.45)] ring-1 ring-black/5 sm:p-6 md:p-8">
          {/* Bouton fermer */}
          <button
            onClick={closeSettings}
            className="absolute right-2 top-2 z-10 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 sm:right-4 sm:top-4"
            aria-label={language === 'fr' ? 'Fermer' : 'Close'}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          {!showDetails ? (
            // Vue principale
            <div className="space-y-4 pr-8 sm:pr-12">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-500/15 via-brand-500/5 to-brand-300/30 shadow-[0_10px_30px_rgba(15,23,42,0.25)] ring-1 ring-white/60 backdrop-blur-sm">
                  <div className="absolute inset-0 rounded-2xl bg-radial from-white/70 via-transparent to-transparent opacity-80 pointer-events-none" />
                  <Cog6ToothIcon className="relative h-5 w-5 sm:h-6 sm:w-6 text-brand-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1.5 font-display text-sm sm:text-base font-semibold tracking-wide text-ink/90 uppercase">
                    {language === 'fr' ? 'Gestion des Cookies' : 'Cookie Management'}
                  </h3>
                  <p className="text-xs sm:text-[0.9rem] leading-relaxed text-slate-600/90">
                    {language === 'fr'
                      ? 'Nous utilisons des cookies pour améliorer votre expérience, sauvegarder vos préférences et analyser le trafic. Vous pouvez accepter tous les cookies, les refuser ou personnaliser vos préférences.'
                      : 'We use cookies to improve your experience, save your preferences and analyze traffic. You can accept all cookies, reject them or customize your preferences.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                <Button
                  onClick={acceptAll}
                  variant="primary"
                  size="sm"
                  className="sm:flex-1 sm:max-w-none"
                  icon={<CheckIcon className="h-4 w-4" />}
                  iconPosition="left"
                >
                  {language === 'fr' ? 'Tout accepter' : 'Accept All'}
                </Button>

                <button
                  onClick={() => setShowDetails(true)}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-neutral-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 hover:shadow-md sm:flex-1 sm:max-w-none"
                >
                  <Cog6ToothIcon className="h-4 w-4" />
                  <span>
                    {language === 'fr' ? 'Personnaliser' : 'Customize'}
                  </span>
                </button>

                <button
                  onClick={rejectAll}
                  className="rounded-full border-2 border-neutral-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md sm:flex-1 sm:max-w-none"
                >
                  {language === 'fr' ? 'Tout refuser' : 'Reject All'}
                </button>
              </div>
            </div>
          ) : (
            // Vue détaillée avec options
            <div className="space-y-4 sm:space-y-6 pr-8 sm:pr-12">
              <div>
                <h3 className="mb-2 font-display text-base sm:text-lg font-semibold text-ink">
                  {language === 'fr' ? 'Préférences des Cookies' : 'Cookie Preferences'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {language === 'fr'
                    ? 'Choisissez les types de cookies que vous souhaitez accepter :'
                    : 'Choose the types of cookies you want to accept:'}
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Cookies nécessaires */}
                <div className="rounded-xl border border-neutral-200 bg-slate-50 p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <h4 className="text-sm sm:text-base font-semibold text-ink">
                          {language === 'fr' ? 'Cookies Nécessaires' : 'Necessary Cookies'}
                        </h4>
                        <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700 whitespace-nowrap">
                          {language === 'fr' ? 'Toujours actif' : 'Always active'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {language === 'fr'
                          ? 'Ces cookies sont essentiels au fonctionnement du site. Ils ne peuvent pas être désactivés.'
                          : 'These cookies are essential for the website to function. They cannot be disabled.'}
                      </p>
                    </div>
                    <div className="ml-2 sm:ml-4 flex-shrink-0 flex h-6 w-11 items-center rounded-full bg-brand-600 p-1">
                      <div className="h-4 w-4 translate-x-5 rounded-full bg-white transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Cookies de préférences */}
                <div className="rounded-xl border border-neutral-200 bg-white p-3 sm:p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/30">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1.5 text-sm sm:text-base font-semibold text-ink">
                        {language === 'fr' ? 'Cookies de Préférences' : 'Preference Cookies'}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {language === 'fr'
                          ? 'Ces cookies sauvegardent vos préférences (langue, thème, etc.) pour améliorer votre expérience.'
                          : 'These cookies save your preferences (language, theme, etc.) to improve your experience.'}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('preferences')}
                      className={`ml-2 sm:ml-4 flex-shrink-0 flex h-6 w-11 items-center rounded-full p-1 transition-colors ${
                        tempPreferences.preferences ? 'bg-brand-600' : 'bg-slate-300'
                      }`}
                      aria-label={language === 'fr' ? 'Activer/désactiver les cookies de préférences' : 'Toggle preference cookies'}
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
                <div className="rounded-xl border border-neutral-200 bg-white p-3 sm:p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/30">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1.5 text-sm sm:text-base font-semibold text-ink">
                        {language === 'fr' ? 'Cookies Analytiques' : 'Analytics Cookies'}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {language === 'fr'
                          ? 'Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site pour l\'améliorer.'
                          : 'These cookies help us understand how visitors use our site to improve it.'}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`ml-2 sm:ml-4 flex-shrink-0 flex h-6 w-11 items-center rounded-full p-1 transition-colors ${
                        tempPreferences.analytics ? 'bg-brand-600' : 'bg-slate-300'
                      }`}
                      aria-label={language === 'fr' ? 'Activer/désactiver les cookies analytiques' : 'Toggle analytics cookies'}
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
                <div className="rounded-xl border border-neutral-200 bg-white p-3 sm:p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/30">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1.5 text-sm sm:text-base font-semibold text-ink">
                        {language === 'fr' ? 'Cookies Marketing' : 'Marketing Cookies'}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {language === 'fr'
                          ? 'Ces cookies sont utilisés pour vous montrer des publicités pertinentes et mesurer l\'efficacité des campagnes.'
                          : 'These cookies are used to show you relevant ads and measure campaign effectiveness.'}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`ml-2 sm:ml-4 flex-shrink-0 flex h-6 w-11 items-center rounded-full p-1 transition-colors ${
                        tempPreferences.marketing ? 'bg-brand-600' : 'bg-slate-300'
                      }`}
                      aria-label={language === 'fr' ? 'Activer/désactiver les cookies marketing' : 'Toggle marketing cookies'}
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

              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 border-t border-neutral-200 pt-3 sm:pt-4">
                <Button
                  onClick={handleSave}
                  variant="primary"
                  size="sm"
                  className="sm:flex-1"
                  icon={<CheckIcon className="h-4 w-4" />}
                  iconPosition="left"
                >
                  {language === 'fr' ? 'Enregistrer' : 'Save'}
                </Button>

                <button
                  onClick={() => setShowDetails(false)}
                  className="rounded-full border-2 border-neutral-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md sm:flex-1"
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
