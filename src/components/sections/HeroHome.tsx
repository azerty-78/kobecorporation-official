import { NavLink } from 'react-router-dom'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { companyInfo, chiffres } from '../../data/siteContent'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { useCounter } from '../../hooks/useCounter'

interface StatCounterProps {
  item: { label: string; labelEn: string; value: string }
  isActive: boolean
  language: 'fr' | 'en'
}

function StatCounter({ item, isActive, language }: StatCounterProps) {
  const numericValue = parseFloat(item.value.replace(/[^0-9.]/g, ''))
  const counter = useCounter(numericValue, isActive, {
    duration: 2000,
    start: 0,
    decimals: item.value.includes('.') ? 1 : 0,
  })

  return (
    <div className="flex flex-col transition-all duration-300 hover:scale-105">
      <span className="font-display text-3xl text-ink">
        {item.value.includes('+')
          ? `${counter.toLocaleString()}+`
          : item.value.includes('%')
          ? `${counter}%`
          : item.value.includes('K')
          ? `${counter}K`
          : item.value.includes('/')
          ? item.value
          : counter.toLocaleString()}
      </span>
      <span className="text-sm text-slate-500">
        {language === 'fr' ? item.label : item.labelEn}
      </span>
    </div>
  )
}

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
          className={`inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-600 shadow-soft transition-all duration-700 delay-100 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <SparklesIcon className="h-4 w-4 animate-pulse" />
          {companyInfo.slogan}
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
            className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg"
          >
            {t('home.hero.cta1')}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </NavLink>
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
          >
            {t('home.hero.cta2')}
          </NavLink>
        </div>
        <div
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
        </div>
      </div>
      <div
        className={`glass-panel relative overflow-hidden rounded-3xl p-6 transition-all duration-1000 delay-700 ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-white to-brand-100/40 animate-gradient-shift" />
        <div className="relative space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            {language === 'fr' ? 'Notre mission' : 'Our Mission'}
          </p>
          <p className="text-lg text-slate-700">
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
