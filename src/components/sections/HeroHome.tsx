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
          className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent-50 px-4 py-1.5 text-xs font-semibold text-accent-600 shadow-subtle transition-all duration-300 delay-100 hover:bg-accent-100 hover:shadow-md hover:-translate-y-0.5 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <SparklesIcon className="relative z-10 h-4 w-4 animate-pulse transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
          <span className="relative z-10 transition-colors duration-300 group-hover:text-accent-700">{companyInfo.slogan}</span>
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
          className={`max-w-2xl text-lg text-neutral-600 transition-all duration-1000 delay-300 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {t('home.hero.subtitle')}
        </p>
        <p
          className={`max-w-2xl text-neutral-600 transition-all duration-1000 delay-400 ${
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
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-brand-600 hover:shadow-lg"
          >
            <span className="relative z-10">{t('home.hero.cta1')}</span>
            <ArrowRightIcon className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
          </NavLink>
          <NavLink
            to="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-neutral-200 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-md"
          >
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
        className={`group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 shadow-card transition-all duration-300 delay-700 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        <div className="relative space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-300 group-hover:w-16" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500 transition-colors duration-300 group-hover:text-brand-600">
              {language === 'fr' ? 'Notre mission' : 'Our Mission'}
            </p>
          </div>
          <p className="text-lg leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-neutral-700">
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
