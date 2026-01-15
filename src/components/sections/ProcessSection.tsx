import {
  LightBulbIcon,
  DocumentCheckIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

interface ProcessStep {
  icon: React.ComponentType<{ className?: string }>
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  color: string
}

const processSteps: ProcessStep[] = [
  {
    icon: LightBulbIcon,
    title: 'Découverte & Stratégie',
    titleEn: 'Discovery & Strategy',
    description:
      'Analyse approfondie de vos besoins, définition des objectifs et élaboration d\'une feuille de route stratégique.',
    descriptionEn:
      'In-depth analysis of your needs, goal definition and development of a strategic roadmap.',
    color: 'from-blue-500/10 to-blue-600/10',
  },
  {
    icon: DocumentCheckIcon,
    title: 'Conception & Planification',
    titleEn: 'Design & Planning',
    description:
      'Architecture technique, design UX/UI et planification détaillée pour garantir la réussite du projet.',
    descriptionEn:
      'Technical architecture, UX/UI design and detailed planning to ensure project success.',
    color: 'from-green-500/10 to-green-600/10',
  },
  {
    icon: RocketLaunchIcon,
    title: 'Développement & Implémentation',
    titleEn: 'Development & Implementation',
    description:
      'Développement agile avec des livraisons régulières, tests continus et intégration progressive.',
    descriptionEn:
      'Agile development with regular deliveries, continuous testing and progressive integration.',
    color: 'from-purple-500/10 to-purple-600/10',
  },
  {
    icon: ChartBarIcon,
    title: 'Déploiement & Optimisation',
    titleEn: 'Deployment & Optimization',
    description:
      'Mise en production sécurisée, monitoring des performances et optimisation continue.',
    descriptionEn:
      'Secure production deployment, performance monitoring and continuous optimization.',
    color: 'from-orange-500/10 to-orange-600/10',
  },
  {
    icon: ArrowPathIcon,
    title: 'Support & Évolution',
    titleEn: 'Support & Evolution',
    description:
      'Accompagnement post-lancement, maintenance proactive et évolution selon vos besoins.',
    descriptionEn:
      'Post-launch support, proactive maintenance and evolution according to your needs.',
    color: 'from-indigo-500/10 to-indigo-600/10',
  },
]

function ProcessSection() {
  const { language } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section
      ref={elementRef}
      id="process"
      className="space-y-10 md:space-y-12"
    >
      <div
        className={`text-center transition-all duration-1000 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
          {language === 'fr' ? 'Notre Approche' : 'Our Approach'}
        </p>
        <h2 className="font-display text-3xl text-ink md:text-4xl">
          {language === 'fr'
            ? 'Un Processus Structuré pour Votre Réussite'
            : 'A Structured Process for Your Success'}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          {language === 'fr'
            ? 'De la conception à la mise en production, nous vous accompagnons à chaque étape avec une méthodologie éprouvée et une communication transparente.'
            : 'From design to production, we accompany you at every step with proven methodology and transparent communication.'}
        </p>
      </div>

      {/* Process Steps */}
      <div className="relative">
        {/* Ligne de connexion (desktop seulement) */}
        <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-200 via-brand-300 to-brand-200 md:block" />

        <div className="space-y-8 md:space-y-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0

            return (
              <div
                key={index}
                className={`grid gap-6 md:grid-cols-2 md:items-center lg:gap-12 ${
                  isEven ? '' : 'md:grid-flow-dense'
                }`}
              >
                {/* Contenu */}
                <div
                  className={`glass-panel group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-8 ${
                    isEven ? 'md:col-start-1' : 'md:col-start-2'
                  } ${
                    isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Gradient de fond */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  <div className="relative">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-100 group-hover:shadow-md">
                        <Icon className="h-6 w-6 text-brand-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                          {language === 'fr' ? 'Étape' : 'Step'} {index + 1}
                        </div>
                        <h3 className="text-xl font-semibold text-ink">
                          {language === 'fr' ? step.title : step.titleEn}
                        </h3>
                      </div>
                    </div>
                    <p className="text-slate-600">
                      {language === 'fr'
                        ? step.description
                        : step.descriptionEn}
                    </p>
                  </div>
                </div>

                {/* Point de connexion (desktop seulement) */}
                <div
                  className={`hidden items-center justify-center md:flex ${
                    isEven ? 'md:col-start-2 md:justify-start' : 'md:col-start-1 md:justify-end'
                  }`}
                >
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 shadow-lg transition-all duration-300 hover:scale-110">
                    <div className="h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>

                {/* Espace vide pour l'alignement */}
                <div
                  className={`hidden md:block ${
                    isEven ? 'md:col-start-1' : 'md:col-start-2'
                  }`}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div
        className={`text-center transition-all duration-1000 delay-700 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
      >
        <p className="mb-4 text-slate-600">
          {language === 'fr'
            ? 'Prêt à démarrer votre projet ?'
            : 'Ready to start your project?'}
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg"
        >
          {language === 'fr' ? 'Discutons de votre projet' : 'Let\'s discuss your project'}
        </a>
      </div>
    </section>
  )
}

export default ProcessSection
