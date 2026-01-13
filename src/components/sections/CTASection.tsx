import { NavLink } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

function CTASection() {
  const { t } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section
      ref={elementRef}
      className="glass-panel relative overflow-hidden rounded-3xl p-10 md:p-16"
    >
      {/* Gradient animé en arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-white to-brand-100/30 animate-gradient-shift" />
      
      <div
        className={`relative mx-auto max-w-3xl text-center transition-all duration-1000 ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        <h2 className="mb-4 font-display text-3xl text-ink md:text-4xl">
          {t('home.cta.title')}
        </h2>
        <p className="mb-8 text-lg text-slate-600">
          {t('home.cta.text')}
        </p>
        <NavLink
          to="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg"
        >
          {t('home.cta.button')}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </NavLink>
      </div>
    </section>
  )
}

export default CTASection
