import { NavLink } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'

function CTASection() {
  const { language, t } = useLanguage()

  return (
    <section className="glass-panel rounded-3xl p-8 md:p-12">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 font-display text-3xl text-ink dark:text-white md:text-4xl">
          {t('home.cta.title')}
        </h2>
        <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
          {t('home.cta.text')}
        </p>
        <NavLink
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
        >
          {t('home.cta.button')}
          <ArrowRightIcon className="h-4 w-4" />
        </NavLink>
      </div>
    </section>
  )
}

export default CTASection
