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
      className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-10 shadow-card transition-all duration-300 hover:shadow-card-hover md:p-16"
    >
      <div
        className={`relative mx-auto max-w-3xl text-center transition-all duration-1000 ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Badge décoratif avec orange accent */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-1.5 text-xs font-semibold text-accent-600 shadow-subtle">
          <div className="h-2 w-2 animate-pulse rounded-full bg-accent-500" />
          <span>{t('home.cta.title')}</span>
        </div>
        
        <h2 className="mb-6 font-display text-3xl text-ink transition-colors duration-300 group-hover:text-brand-500 md:text-4xl">
          {t('home.cta.title')}
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-neutral-700">
          {t('home.cta.text')}
        </p>
        
          <NavLink
            to="/contact"
            className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-brand-500 px-8 py-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-brand-600 hover:shadow-lg"
          >
          <span className="relative z-10">{t('home.cta.button')}</span>
          
          {/* Flèche avec animation améliorée */}
          <div className="relative z-10 flex items-center">
            <div className="h-0.5 w-0 bg-white transition-all duration-300 group-hover/cta:w-6" />
            <ArrowRightIcon className="h-5 w-5 transition-all duration-300 group-hover/cta:translate-x-2 group-hover/cta:scale-110" />
          </div>
        </NavLink>
      </div>
    </section>
  )
}

export default CTASection
