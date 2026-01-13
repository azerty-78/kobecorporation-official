import { NavLink } from 'react-router-dom'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { companyInfo, chiffres } from '../../data/siteContent'

function HeroHome() {
  const { language, t } = useLanguage()

  return (
    <section className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-600 shadow-soft dark:bg-slate-800 dark:text-brand-400">
          <SparklesIcon className="h-4 w-4" />
          {companyInfo.slogan}
        </div>
        <h1 className="font-display text-4xl leading-tight text-ink dark:text-white md:text-5xl">
          {t('home.hero.title')}
        </h1>
        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          {t('home.hero.subtitle')}
        </p>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          {t('home.hero.description')}
        </p>
        <div className="flex flex-wrap gap-3">
          <NavLink
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
          >
            {t('home.hero.cta1')}
            <ArrowRightIcon className="h-4 w-4" />
          </NavLink>
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-600 dark:hover:text-brand-400"
          >
            {t('home.hero.cta2')}
          </NavLink>
        </div>
        <div className="flex flex-wrap gap-6 pt-4">
          {chiffres.map((item, index) => (
            <div key={index} className="flex flex-col">
              <span className="font-display text-3xl text-ink dark:text-white">
                {item.value}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {language === 'fr' ? item.label : item.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-panel relative overflow-hidden rounded-3xl p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-white to-brand-100/40 dark:from-brand-500/20 dark:via-slate-800 dark:to-brand-900/20" />
        <div className="relative space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
            {language === 'fr' ? 'Notre mission' : 'Our Mission'}
          </p>
          <p className="text-lg text-slate-700 dark:text-slate-300">
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
