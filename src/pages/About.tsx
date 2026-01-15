import { useLanguage } from '../contexts/LanguageContext'
import { companyInfo, valeurs, chiffres } from '../data/siteContent'
import {
  CheckBadgeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  GlobeAltIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  ClockIcon,
  RocketLaunchIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import benDjibrilPhoto from '../assets/people/ben-djibril-official-with-glass-nbg.png'

// Icônes SVG pour les réseaux sociaux
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function About() {
  const { language } = useLanguage()
  const { elementRef: introRef, isVisible: introVisible } = useScrollAnimation({ threshold: 0.2 })

  // Liens sociaux de Ben Djibril
  const benDjibrilSocial = {
    website: 'https://www.ben-djibril.kobecorporation.com',
    linkedin: 'https://www.linkedin.com/in/Ben-Djibril',
    x: 'https://x.com/le_bendji',
    github: 'https://github.com/azerty-78',
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      {/* Introduction avec animations */}
      <div
        ref={introRef}
        className={`mb-20 space-y-6 text-center transition-all duration-1000 ${
          introVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-600 shadow-sm">
          <RocketLaunchIcon className="h-4 w-4 animate-pulse" />
          <span>{language === 'fr' ? 'À Propos' : 'About'}</span>
        </div>
        <h1 className="font-display text-4xl text-ink transition-all duration-1000 delay-200 md:text-5xl lg:text-6xl">
          {language === 'fr' ? 'Notre Histoire' : 'Our Story'}
        </h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 transition-all duration-1000 delay-300">
          {language === 'fr'
            ? 'Découvrez l\'histoire, les valeurs et la vision qui guident KOBE Corporation dans sa mission de transformation technologique.'
            : 'Discover the story, values and vision that guide KOBE Corporation in its mission of technological transformation.'}
        </p>
      </div>

      {/* Histoire avec animations */}
      <section className="mb-24">
        <div className="group glass-panel relative overflow-hidden rounded-3xl p-8 shadow-xl transition-all duration-700 hover:shadow-2xl md:p-12">
          {/* Gradient animé */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-white to-brand-100/30 animate-gradient-shift" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-200/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative mx-auto max-w-3xl space-y-6">
            <p className="text-lg leading-relaxed text-slate-700">
              {language === 'fr' ? (
                <>
                  Fondée en {companyInfo.year} par {companyInfo.founder}, KOBE
                  Corporation est née d'une vision claire : démocratiser l'accès
                  aux technologies et permettre à chacun de construire son propre
                  héritage numérique. Basée à Yaoundé, au Cameroun, nous sommes
                  une startup dynamique qui allie expertise technique et
                  compréhension des besoins locaux et internationaux.
                </>
              ) : (
                <>
                  Founded in {companyInfo.year} by {companyInfo.founder}, KOBE
                  Corporation was born from a clear vision: democratize access to
                  technology and enable everyone to build their own digital legacy.
                  Based in Yaoundé, Cameroon, we are a dynamic startup that
                  combines technical expertise with understanding of local and
                  international needs.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision avec animations */}
      <section className="mb-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              {language === 'fr' ? 'Notre Mission' : 'Our Mission'}
            </h2>
            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="mb-2 text-lg font-semibold text-brand-600">
                  {companyInfo.slogan}
                </h3>
                <p className="text-slate-600">
                  {language === 'fr' ? (
                    <>
                      Nous croyons que chaque individu, chaque entreprise mérite
                      les meilleurs outils technologiques pour réaliser ses
                      ambitions.
                    </>
                  ) : (
                    <>
                      We believe that every individual, every business deserves
                      the best technological tools to achieve its ambitions.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="group glass-panel relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
            {/* Ligne décorative */}
            <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500 group-hover:w-full" />
            
            <h3 className="mb-6 font-display text-2xl text-ink">
              {language === 'fr' ? 'Nos Valeurs' : 'Our Values'}
            </h3>
            <div className="space-y-4">
              {valeurs.map((valeur, index) => {
                const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
                return (
                  <div
                    key={index}
                    ref={elementRef}
                    className={`flex items-start gap-3 transition-all duration-700 ${
                      isVisible
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="mt-0.5 transition-transform duration-300 hover:scale-110">
                      {valeur.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink">
                        {language === 'fr' ? valeur.title : valeur.titleEn}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {language === 'fr' ? valeur.text : valeur.textEn}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership avec animations et photo */}
      <section className="mb-24">
        <div className="text-center">
          <h2 className="mb-4 font-display text-3xl text-ink md:text-4xl">
            {language === 'fr' ? 'Notre Équipe' : 'Our Team'}
          </h2>
          <p className="mb-12 text-slate-600">
            {language === 'fr'
              ? 'Rencontrez les personnes qui font de KOBE Corporation ce qu\'elle est'
              : 'Meet the people who make KOBE Corporation what it is'}
          </p>
        </div>
        <div className="group glass-panel relative mx-auto max-w-3xl overflow-hidden rounded-3xl p-8 shadow-xl transition-all duration-700 hover:shadow-2xl md:p-12">
          {/* Gradient animé */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-white to-brand-100/30 animate-gradient-shift" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-200/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative text-center">
            {/* Photo de Ben Djibril */}
            <div className="relative mx-auto mb-6 inline-block">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-400/30 to-brand-600/30 blur-2xl opacity-50 animate-pulse" />
              <div className="relative overflow-hidden rounded-full border-4 border-white shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
                <img
                  src={benDjibrilPhoto}
                  alt={companyInfo.founder}
                  className="h-32 w-32 object-cover md:h-40 md:w-40"
                />
              </div>
            </div>

            <h3 className="mb-2 font-display text-2xl text-ink md:text-3xl">
              {companyInfo.founder}
            </h3>
            <p className="mb-6 text-lg font-semibold text-brand-600">
              {language === 'fr' ? 'PDG & Fondateur' : 'CEO & Founder'}
            </p>
            <p className="mb-8 text-slate-600">
              {language === 'fr' ? (
                <>
                  Passionné de technologie et entrepreneur visionnaire,{' '}
                  {companyInfo.founder} a créé KOBE Corporation avec l'ambition de
                  transformer l'écosystème technologique africain. Fort d'une
                  expertise en développement logiciel et en gestion de projet, il
                  dirige l'entreprise avec une vision claire : créer des
                  opportunités pour les talents locaux tout en délivrant des
                  solutions de classe mondiale.
                </>
              ) : (
                <>
                  Technology enthusiast and visionary entrepreneur,{' '}
                  {companyInfo.founder} created KOBE Corporation with the ambition
                  to transform the African technology ecosystem. With expertise in
                  software development and project management, he leads the company
                  with a clear vision: create opportunities for local talent while
                  delivering world-class solutions.
                </>
              )}
            </p>

            {/* Lien vers le site de Ben Djibril */}
            <div className="mb-6">
              <a
                href={benDjibrilSocial.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-600 transition-all duration-300 hover:bg-brand-100 hover:shadow-md"
              >
                <LinkIcon className="h-4 w-4 transition-transform duration-300 group-hover/link:scale-110" />
                <span>www.ben-djibril.kobecorporation.com</span>
                <svg
                  className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex items-center justify-center gap-4">
              <a
                href={benDjibrilSocial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-full bg-[#0A66C2]/10 text-[#0A66C2] transition-all duration-300 hover:scale-110 hover:bg-[#0A66C2] hover:text-white hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
              <a
                href={benDjibrilSocial.x}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10 text-slate-900 transition-all duration-300 hover:scale-110 hover:bg-slate-900 hover:text-white hover:shadow-lg"
                aria-label="X (Twitter)"
              >
                <XIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
              <a
                href={benDjibrilSocial.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/10 text-slate-800 transition-all duration-300 hover:scale-110 hover:bg-slate-800 hover:text-white hover:shadow-lg"
                aria-label="GitHub"
              >
                <GitHubIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Différenciateurs avec animations */}
      <section className="mb-24">
        <div className="text-center">
          <h2 className="mb-4 font-display text-3xl text-ink md:text-4xl">
            {language === 'fr'
              ? 'Pourquoi Choisir KOBE ?'
              : 'Why Choose KOBE?'}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <GlobeAltIcon className="h-6 w-6 text-brand-500" />,
              title: language === 'fr' ? 'Expertise Locale, Standards Internationaux' : 'Local Expertise, International Standards',
              text:
                language === 'fr'
                  ? 'Compréhension du marché africain avec qualité mondiale'
                  : 'Understanding of African market with world-class quality',
            },
            {
              icon: <ShieldCheckIcon className="h-6 w-6 text-brand-500" />,
              title: language === 'fr' ? 'Disponibilité Totale' : 'Total Availability',
              text:
                language === 'fr'
                  ? 'Support 24/7 avec réactivité garantie'
                  : '24/7 support with guaranteed responsiveness',
            },
            {
              icon: <SparklesIcon className="h-6 w-6 text-brand-500" />,
              title: language === 'fr' ? 'Approche Personnalisée' : 'Personalized Approach',
              text:
                language === 'fr'
                  ? 'Solutions sur mesure avec accompagnement dédié'
                  : 'Tailor-made solutions with dedicated support',
            },
            {
              icon: <BuildingOffice2Icon className="h-6 w-6 text-brand-500" />,
              title: language === 'fr' ? 'Écosystème Complet' : 'Complete Ecosystem',
              text:
                language === 'fr'
                  ? 'Développement + Hébergement + Formation en guichet unique'
                  : 'Development + Hosting + Training in one-stop shop',
            },
            {
              icon: <CheckBadgeIcon className="h-6 w-6 text-brand-500" />,
              title: language === 'fr' ? 'Engagement Communautaire' : 'Community Engagement',
              text:
                language === 'fr'
                  ? 'Formation de talents et contribution open source'
                  : 'Talent development and open source contribution',
            },
          ].map((item, index) => {
            const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
            return (
              <div
                key={index}
                ref={elementRef}
                className={`group glass-panel relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Ligne décorative */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500 group-hover:w-full" />
                
                {/* Gradient au hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-100/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 font-semibold text-ink transition-colors duration-300 group-hover:text-brand-600">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {item.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Chiffres & Impact avec animations */}
      <section className="mb-24">
        <div className="group glass-panel relative overflow-hidden rounded-3xl p-8 shadow-xl transition-all duration-700 hover:shadow-2xl md:p-12">
          {/* Gradient animé */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-white to-brand-100/30 animate-gradient-shift" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-200/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative text-center">
            <h2 className="mb-8 font-display text-3xl text-ink md:text-4xl">
              {language === 'fr' ? 'Notre Impact' : 'Our Impact'}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {chiffres.map((chiffre, index) => {
                const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
                return (
                  <div
                    key={index}
                    ref={elementRef}
                    className={`group/stat text-center transition-all duration-700 hover:-translate-y-1 ${
                      isVisible
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <p className="mb-2 font-display text-4xl text-brand-600 transition-all duration-300 group-hover/stat:scale-110 group-hover/stat:text-brand-700">
                      {chiffre.value}
                    </p>
                    <p className="text-sm text-slate-600">
                      {language === 'fr' ? chiffre.label : chiffre.labelEn}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Localisation avec animations */}
      <section>
        <div className="group glass-panel relative overflow-hidden rounded-3xl p-8 shadow-xl transition-all duration-700 hover:shadow-2xl md:p-12">
          {/* Gradient animé */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-white to-brand-100/30 animate-gradient-shift" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-200/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-display text-3xl text-ink md:text-4xl">
              {language === 'fr' ? 'Où Nous Trouver' : 'Find Us'}
            </h2>
            <div className="mb-6 flex items-center justify-center gap-3">
              <MapPinIcon className="h-6 w-6 text-brand-500" />
              <p className="text-lg text-slate-700">
                {companyInfo.address.full}
              </p>
            </div>
            <div className="space-y-2 text-slate-600">
              <p>
                <strong>
                  {language === 'fr' ? 'Zone de service :' : 'Service area:'}
                </strong>
              </p>
              <p>
                {language === 'fr'
                  ? 'Cameroun (principal) • Afrique Centrale et de l\'Ouest • International (projets à distance)'
                  : 'Cameroon (main) • Central and West Africa • International (remote projects)'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
