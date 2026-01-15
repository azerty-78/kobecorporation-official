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
      className="group glass-panel relative overflow-hidden rounded-3xl p-10 shadow-xl transition-all duration-700 hover:shadow-2xl md:p-16"
    >
      {/* Fond blanc pur */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Particules décoratives */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 h-2 w-2 rounded-full bg-brand-400 animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute top-20 right-20 h-1.5 w-1.5 rounded-full bg-brand-300 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 h-2.5 w-2.5 rounded-full bg-brand-500 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 h-1 w-1 rounded-full bg-brand-400 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
      
      <div
        className={`relative mx-auto max-w-3xl text-center transition-all duration-1000 ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Badge décoratif */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-600 shadow-sm">
          <div className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
          <span>{t('home.cta.title')}</span>
        </div>
        
        <h2 className="mb-6 font-display text-3xl text-ink transition-colors duration-300 group-hover:text-brand-600 md:text-4xl">
          {t('home.cta.title')}
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
          {t('home.cta.text')}
        </p>
        
          <NavLink
            to="/contact"
            className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[rgb(31,41,55)] px-8 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:bg-[rgb(15,23,42)] hover:shadow-2xl"
          >
          {/* Effet de brillance animé */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-1000" />
          
          {/* Effet de pulsation */}
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 animate-ping group-hover/cta:opacity-100" />
          
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
