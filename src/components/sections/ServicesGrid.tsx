import { NavLink } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { services } from '../../data/siteContent'

interface ServicesGridProps {
  showIntro?: boolean
}

function ServicesGrid({ showIntro = true }: ServicesGridProps) {
  const { language, t } = useLanguage()

  return (
    <section id="services" className="space-y-8">
      {showIntro && (
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
              {t('home.services.title')}
            </p>
            <h2 className="font-display text-3xl text-ink dark:text-white">
              {t('home.services.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {language === 'fr'
                ? 'Des solutions technologiques complètes pour transformer vos idées en réalité.'
                : 'Complete technology solutions to transform your ideas into reality.'}
            </p>
          </div>
          <NavLink
            to="/contact"
            className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-brand-200 hover:text-brand-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-600 dark:hover:text-brand-400 md:inline-flex"
          >
            {language === 'fr' ? 'Planifier un rendez-vous' : 'Schedule a meeting'}
            <ArrowRightIcon className="h-4 w-4" />
          </NavLink>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.slug}
            className="glass-panel flex h-full flex-col gap-3 rounded-2xl p-6 transition hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20">
              {service.icon}
            </div>
            <h3 className="text-lg font-semibold text-ink dark:text-white">
              {language === 'fr' ? service.title : service.titleEn}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {language === 'fr' ? service.desc : service.descEn}
            </p>
            <div className="mt-auto pt-4">
              <NavLink
                to="/services"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                {language === 'fr' ? 'En savoir plus' : 'Learn more'}
                <ArrowRightIcon className="h-4 w-4" />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesGrid
