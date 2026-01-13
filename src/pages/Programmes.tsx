import { useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { programmes } from '../data/siteContent'
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

function Programmes() {
  const { language } = useLanguage()

  useEffect(() => {
    // Scroll vers l'ancre si présente dans l'URL
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      {/* Introduction */}
      <div className="mb-16 space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
          {language === 'fr' ? 'Nos Programmes' : 'Our Programs'}
        </p>
        <h1 className="font-display text-4xl text-ink dark:text-white md:text-5xl">
          {language === 'fr'
            ? 'Nos Programmes de Développement'
            : 'Our Development Programs'}
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
          {language === 'fr'
            ? 'Opportunités pour freelances, étudiants et développeurs passionnés'
            : 'Opportunities for freelancers, students and passionate developers'}
        </p>
      </div>

      {/* Programmes */}
      <div className="space-y-24">
        {programmes.map((programme, index) => (
          <section
            key={programme.id}
            id={programme.id}
            className="scroll-mt-20"
          >
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
                  {programme.icon}
                  <span>
                    {language === 'fr' ? programme.title : programme.titleEn}
                  </span>
                </div>
                <h2 className="font-display text-3xl text-ink dark:text-white md:text-4xl">
                  {language === 'fr' ? programme.title : programme.titleEn}
                </h2>
                <p className="text-lg font-semibold text-brand-600 dark:text-brand-400">
                  {language === 'fr' ? programme.slogan : programme.sloganEn}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {language === 'fr'
                    ? programme.description
                    : programme.descriptionEn}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {(language === 'fr' ? programme.features : programme.featuresEn).map(
                    (feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                        <span className="text-slate-700 dark:text-slate-300">
                          {feature}
                        </span>
                      </div>
                    )
                  )}
                </div>

                {/* CTA spécifique selon le programme */}
                <div className="pt-4">
                  {programme.id === 'freelances' && (
                    <NavLink
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
                    >
                      {language === 'fr'
                        ? 'Rejoindre le programme Freelance'
                        : 'Join the Freelance Program'}
                      <ArrowRightIcon className="h-4 w-4" />
                    </NavLink>
                  )}
                  {programme.id === 'etudiants' && (
                    <NavLink
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
                    >
                      {language === 'fr'
                        ? 'Postuler pour un stage'
                        : 'Apply for an internship'}
                      <ArrowRightIcon className="h-4 w-4" />
                    </NavLink>
                  )}
                  {programme.id === 'open-source' && (
                    <a
                      href="https://github.com/kobecorporation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
                    >
                      {language === 'fr'
                        ? 'Voir nos projets GitHub'
                        : 'View our GitHub projects'}
                      <ArrowRightIcon className="h-4 w-4" />
                    </a>
                  )}
                  {programme.id === 'networking' && (
                    <NavLink
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
                    >
                      {language === 'fr'
                        ? 'Rejoindre la communauté'
                        : 'Join the community'}
                      <ArrowRightIcon className="h-4 w-4" />
                    </NavLink>
                  )}
                </div>
              </div>

              {/* Illustration/Image placeholder */}
              <div
                className={`glass-panel relative overflow-hidden rounded-3xl p-8 ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-white to-brand-100/40 dark:from-brand-500/20 dark:via-slate-800 dark:to-brand-900/20" />
                <div className="relative flex h-64 items-center justify-center md:h-80">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-500 text-white">
                      {programme.icon}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {language === 'fr'
                        ? 'Image à venir'
                        : 'Image coming soon'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA Final */}
      <div className="mt-24 text-center">
        <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-8 md:p-12">
          <h2 className="mb-4 font-display text-3xl text-ink dark:text-white">
            {language === 'fr'
              ? 'Prêt à Rejoindre Notre Communauté ?'
              : 'Ready to Join Our Community?'}
          </h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            {language === 'fr'
              ? 'Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous accompagner.'
              : 'Contact us to discuss your project and discover how we can support you.'}
          </p>
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
          >
            {language === 'fr' ? 'Nous contacter' : 'Contact us'}
            <ArrowRightIcon className="h-4 w-4" />
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Programmes
