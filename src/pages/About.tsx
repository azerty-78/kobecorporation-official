import { useLanguage } from '../contexts/LanguageContext'
import { companyInfo, valeurs, chiffres } from '../data/siteContent'
import {
  CheckBadgeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  GlobeAltIcon,
  BuildingOffice2Icon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

function About() {
  const { language } = useLanguage()

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      {/* Introduction */}
      <div className="mb-16 space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
          {language === 'fr' ? 'À Propos' : 'About'}
        </p>
        <h1 className="font-display text-4xl text-ink md:text-5xl">
          {language === 'fr' ? 'Notre Histoire' : 'Our Story'}
        </h1>
      </div>

      {/* Histoire */}
      <section className="mb-24">
        <div className="glass-panel rounded-3xl p-8 md:p-12">
          <div className="mx-auto max-w-3xl space-y-6">
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

      {/* Mission & Vision */}
      <section className="mb-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-display text-3xl text-ink">
              {language === 'fr' ? 'Notre Mission' : 'Our Mission'}
            </h2>
            <div className="space-y-4">
              <div>
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

          <div className="glass-panel rounded-3xl p-8">
            <h3 className="mb-6 font-display text-2xl text-ink">
              {language === 'fr' ? 'Nos Valeurs' : 'Our Values'}
            </h3>
            <div className="space-y-4">
              {valeurs.map((valeur, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5">{valeur.icon}</div>
                  <div>
                    <h4 className="font-semibold text-ink">
                      {language === 'fr' ? valeur.title : valeur.titleEn}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {language === 'fr' ? valeur.text : valeur.textEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="mb-24">
        <div className="text-center">
          <h2 className="mb-4 font-display text-3xl text-ink">
            {language === 'fr' ? 'Notre Équipe' : 'Our Team'}
          </h2>
          <p className="mb-12 text-slate-600">
            {language === 'fr'
              ? 'Rencontrez les personnes qui font de KOBE Corporation ce qu\'elle est'
              : 'Meet the people who make KOBE Corporation what it is'}
          </p>
        </div>
        <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-brand-500 text-white">
              <span className="font-display text-3xl">
                {companyInfo.founder.charAt(0)}
              </span>
            </div>
            <h3 className="mb-2 font-display text-2xl text-ink">
              {companyInfo.founder}
            </h3>
            <p className="mb-6 text-brand-600">
              {language === 'fr' ? 'PDG & Fondateur' : 'CEO & Founder'}
            </p>
            <p className="text-slate-600">
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
          </div>
        </div>
      </section>

      {/* Différenciateurs */}
      <section className="mb-24">
        <div className="text-center">
          <h2 className="mb-4 font-display text-3xl text-ink">
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
          ].map((item, index) => (
            <div
              key={index}
              className="glass-panel rounded-2xl p-6 transition hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
                {item.icon}
              </div>
              <h3 className="mb-2 font-semibold text-ink">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Chiffres & Impact */}
      <section className="mb-24">
        <div className="glass-panel rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="mb-8 font-display text-3xl text-ink">
              {language === 'fr' ? 'Notre Impact' : 'Our Impact'}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {chiffres.map((chiffre, index) => (
                <div key={index} className="text-center">
                  <p className="mb-2 font-display text-4xl text-brand-600">
                    {chiffre.value}
                  </p>
                  <p className="text-sm text-slate-600">
                    {language === 'fr' ? chiffre.label : chiffre.labelEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Localisation */}
      <section>
        <div className="glass-panel rounded-3xl p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-display text-3xl text-ink">
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
