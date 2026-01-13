import { NavLink } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { programmes } from '../../data/siteContent'

function ProgramsPreview() {
  const { language, t } = useLanguage()

  return (
    <section id="programmes" className="space-y-8">
      <div className="flex items-center justify-between gap-4">
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
          className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-brand-200 hover:text-brand-700 md:inline-flex"
        >
          {language === 'fr' ? 'Voir tous les programmes' : 'View all programs'}
          <ArrowRightIcon className="h-4 w-4" />
        </NavLink>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {programmes.map((programme) => (
          <NavLink
            key={programme.id}
            to={`/programmes#${programme.id}`}
            className="glass-panel group flex h-full flex-col gap-3 rounded-2xl p-6 transition hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
              {programme.icon}
            </div>
            <h3 className="text-lg font-semibold text-ink">
              {language === 'fr' ? programme.title : programme.titleEn}
            </h3>
            <p className="text-sm font-medium text-brand-600">
              {language === 'fr' ? programme.slogan : programme.sloganEn}
            </p>
            <p className="text-sm text-slate-600">
              {language === 'fr'
                ? programme.description.substring(0, 100) + '...'
                : programme.descriptionEn.substring(0, 100) + '...'}
            </p>
            <div className="mt-auto pt-4">
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition group-hover:gap-2">
                {language === 'fr' ? 'Découvrir' : 'Discover'}
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  )
}

export default ProgramsPreview
