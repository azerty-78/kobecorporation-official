import { NavLink } from 'react-router-dom'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { companyInfo } from '../../data/siteContent'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

function HeroHome() {
  const { language, t } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section
      ref={elementRef}
      className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center lg:gap-16"
    >
      <div
        className={`space-y-6 transition-all duration-1000 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
      >
        <div
          className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-brand-600 shadow-soft transition-all duration-700 delay-100 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          {/* Effet de brillance animé */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <SparklesIcon className="relative z-10 h-4 w-4 animate-pulse transition-transform duration-300 group-hover:rotate-12" />
          <span className="relative z-10">{companyInfo.slogan}</span>
        </div>
        <h1
          className={`font-display text-4xl leading-tight text-ink transition-all duration-1000 delay-200 md:text-5xl ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {t('home.hero.title')}
        </h1>
        <p
          className={`max-w-2xl text-lg text-slate-600 transition-all duration-1000 delay-300 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {t('home.hero.subtitle')}
        </p>
        <p
          className={`max-w-2xl text-slate-600 transition-all duration-1000 delay-400 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {t('home.hero.description')}
        </p>
        <div
          className={`flex flex-wrap gap-3 transition-all duration-1000 delay-500 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          <NavLink
            to="/services"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[rgb(31,41,55)] px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:bg-[rgb(15,23,42)] hover:shadow-xl"
          >
            {/* Effet de brillance au hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            
            <span className="relative z-10">{t('home.hero.cta1')}</span>
            <ArrowRightIcon className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
          </NavLink>
          <NavLink
            to="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 hover:shadow-lg"
          >
            {/* Effet de brillance au hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-50/50 via-brand-100/50 to-brand-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <span className="relative z-10">{t('home.hero.cta2')}</span>
          </NavLink>
        </div>
        {/* Statistiques masquées temporairement - entreprise en création */}
        {/* <div
          className={`flex flex-wrap gap-6 pt-4 transition-all duration-1000 delay-600 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {chiffres.map((item, index) => (
            <StatCounter
              key={index}
              item={item}
              isActive={isVisible}
              language={language}
            />
          ))}
        </div> */}
      </div>
      <div
        className={`group glass-panel relative overflow-hidden rounded-3xl p-8 transition-all duration-1000 delay-700 hover:shadow-2xl ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Gradient animé avec effet de brillance */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-white to-brand-100/40 animate-gradient-shift" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-200/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        
        {/* Particules animées en arrière-plan */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 h-2 w-2 rounded-full bg-brand-400 animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute top-20 right-20 h-1.5 w-1.5 rounded-full bg-brand-300 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-20 h-2.5 w-2.5 rounded-full bg-brand-500 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-300 group-hover:w-16" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 transition-colors duration-300 group-hover:text-brand-700">
              {language === 'fr' ? 'Notre mission' : 'Our Mission'}
            </p>
          </div>
          <p className="text-lg leading-relaxed text-slate-700 transition-colors duration-300 group-hover:text-slate-800">
            {language === 'fr'
              ? 'Nous créons des expériences et des opérations qui mettent vos équipes et vos clients au centre. Notre approche holistique combine stratégie, design et technologies pour livrer des résultats mesurables.'
              : 'We create experiences and operations that put your teams and clients at the center. Our holistic approach combines strategy, design and technology to deliver measurable results.'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroHome
