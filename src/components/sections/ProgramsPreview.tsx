import { NavLink } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { programmes } from '../../data/siteContent'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

function ProgramsPreview() {
  const { language, t } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="programmes" ref={elementRef} className="space-y-8">
      <div
        className={`flex items-center justify-between gap-4 transition-all duration-1000 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            {t('home.programs.title')}
          </p>
          <h2 className="font-display text-3xl text-ink">
            {t('home.programs.title')}
          </h2>
          <p className="text-slate-600">
            {language === 'fr'
              ? 'Opportunités pour freelances, étudiants et développeurs passionnés'
              : 'Opportunities for freelancers, students and passionate developers'}
          </p>
        </div>
        <NavLink
          to="/programmes"
          className="group hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 hover:shadow-md md:inline-flex"
        >
          {language === 'fr' ? 'Voir tous les programmes' : 'View all programs'}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </NavLink>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {programmes.map((programme, index) => (
          <NavLink
            key={programme.id}
            to={`/programmes#${programme.id}`}
            className={`glass-panel group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            {/* Effet de brillance au hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-500/0 to-brand-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
            
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-100 group-hover:shadow-md">
              <div className="transition-transform duration-300 group-hover:scale-110">
                {programme.icon}
              </div>
            </div>
            <h3 className="relative text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-brand-600">
              {language === 'fr' ? programme.title : programme.titleEn}
            </h3>
            <p className="relative text-sm font-medium text-brand-600 transition-colors duration-300 group-hover:text-brand-700">
              {language === 'fr' ? programme.slogan : programme.sloganEn}
            </p>
            <p className="relative text-sm text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
              {language === 'fr'
                ? programme.description.substring(0, 100) + '...'
                : programme.descriptionEn.substring(0, 100) + '...'}
            </p>
            <div className="relative mt-auto pt-4">
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all duration-300 group-hover:gap-2 group-hover:text-brand-700">
                {language === 'fr' ? 'Découvrir' : 'Discover'}
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  )
}

export default ProgramsPreview
