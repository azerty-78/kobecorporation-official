import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { pricingPlans } from '../data/pricing'
import { CheckIcon, XMarkIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

function Pricing() {
  const { language } = useLanguage()
  const [isMonthly, setIsMonthly] = useState(true)

  return (
    <div className="organic-bg min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-display text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
            {language === 'fr'
              ? 'Ensemble de services créatifs adaptés à vos besoins'
              : 'Set of creative services adapted to your needs'}
          </h1>
          <p className="text-lg italic text-slate-700 dark:text-slate-300">
            {language === 'fr'
              ? 'Forfaits SaaS – Simplicité & Abonnement mensuel'
              : 'SaaS Packages – Simplicity & Monthly subscription'}
          </p>
        </div>

        {/* Toggle Mensuel/Annuel */}
        <div className="mb-12 flex items-center justify-center gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {language === 'fr' ? 'Mensuel' : 'Monthly'}
          </span>
          <button
            onClick={() => setIsMonthly(!isMonthly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isMonthly ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-600'
            }`}
            aria-label="Toggle billing period"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isMonthly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {language === 'fr' ? 'Annuel' : 'Annual'}
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl bg-white p-6 shadow-card transition-all hover:shadow-lg dark:bg-slate-800 ${
                plan.isRecommended ? 'ring-2 ring-brand-500' : ''
              }`}
            >
              {plan.isRecommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white">
                    <HandThumbUpIcon className="h-5 w-5" />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {language === 'fr' ? plan.description : plan.descriptionEn}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <p className="mb-1 text-sm text-slate-500 line-through dark:text-slate-400">
                  {plan.originalPrice} {language === 'fr' ? plan.priceUnit : plan.priceUnitEn}
                </p>
                <button
                  className={`w-full rounded-lg px-4 py-3 text-lg font-bold text-white transition-all hover:shadow-md ${
                    plan.buttonColor === 'accent'
                      ? 'bg-brand-500 hover:bg-brand-600'
                      : 'bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600'
                  }`}
                >
                  {plan.currentPrice} {language === 'fr' ? plan.priceUnit : plan.priceUnitEn}
                </button>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {language === 'fr' ? 'Ce qui est inclus' : 'What is included'}
                </p>
                {(language === 'fr' ? plan.features.included : plan.features.includedEn).map(
                  (feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  )
                )}
                {plan.features.excluded &&
                  (language === 'fr' ? plan.features.excluded : plan.features.excludedEn).map(
                    (feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <XMarkIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" />
                        <span className="text-sm text-slate-400 line-through">{feature}</span>
                      </div>
                    )
                  )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-card dark:bg-slate-800 sm:flex-row">
            <ArrowRightIcon className="h-6 w-6 rotate-[225deg] text-slate-700 dark:text-slate-300" />
            <div className="flex-1">
              <p className="mb-2 font-semibold text-slate-900 dark:text-white">
                {language === 'fr' ? 'Contactez Nous' : 'Contact Us'}
              </p>
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
                <a
                  href="tel:+237-655-938-501"
                  className="flex items-center gap-2 text-sm text-slate-700 transition-colors hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
                >
                  <span>📞</span>
                  +237-655-938-501
                </a>
                <a
                  href="https://www.ben-djibril.kobecorporation.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-700 transition-colors hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
                >
                  <span>🌐</span>
                  www.ben-djibril.kobecorporation.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-600 hover:shadow-xl"
          >
            {language === 'fr' ? 'Démarrer maintenant' : 'Get started now'}
            <ArrowRightIcon className="h-4 w-4" />
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Pricing
