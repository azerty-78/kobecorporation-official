import { NavLink } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { services } from '../../data/siteContent'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

interface ServicesGridProps {
  showIntro?: boolean
}

function ServicesGrid({ showIntro = true }: ServicesGridProps) {
  const { language, t } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="services" ref={elementRef} className="space-y-10 md:space-y-12">
      {showIntro && (
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-1000 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              {t('home.services.title')}
            </p>
            <h2 className="font-display text-3xl text-ink">
              {t('home.services.title')}
            </h2>
            <p className="text-slate-600">
              {language === 'fr'
                ? 'Des solutions technologiques complètes pour transformer vos idées en réalité.'
                : 'Complete technology solutions to transform your ideas into reality.'}
            </p>
          </div>
          <NavLink
            to="/contact"
            className="group hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 hover:shadow-md md:inline-flex"
          >
            {language === 'fr' ? 'Planifier un rendez-vous' : 'Schedule a meeting'}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </NavLink>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={service.slug}
            className={`glass-panel group flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-100 group-hover:shadow-md">
              <div className="transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-brand-600">
              {language === 'fr' ? service.title : service.titleEn}
            </h3>
            <p className="text-sm text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
              {language === 'fr' ? service.desc : service.descEn}
            </p>
            <div className="mt-auto pt-4">
              <NavLink
                to="/services"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all duration-300 hover:gap-2 hover:text-brand-700"
              >
                {language === 'fr' ? 'En savoir plus' : 'Learn more'}
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesGrid
