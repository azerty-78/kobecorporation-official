import {
  LightBulbIcon,
  DocumentCheckIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Card } from '../ui/Card'

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
        <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
          {language === 'fr'
            ? 'De la conception à la mise en production, nous vous accompagnons à chaque étape avec une méthodologie éprouvée et une communication transparente.'
            : 'From design to production, we accompany you at every step with proven methodology and transparent communication.'}
        </p>
      </div>

      {/* Process Steps */}
      <div className="relative">
        {/* Ligne de connexion animée (lg et plus seulement) */}
        <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 lg:block">
          {/* Ligne de base */}
          <div className="absolute inset-0 bg-slate-200 opacity-30" />
          
          {/* Ligne animée qui se remplit */}
          <div 
            className="absolute top-0 left-0 w-full transition-all duration-1000"
            style={{
              height: isVisible ? '100%' : '0%',
              backgroundColor: 'rgb(31, 41, 55)',
              transitionDelay: '500ms',
            }}
          />
          
          {/* Particules animées le long de la ligne */}
          {isVisible && (
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[rgb(31,41,55)] shadow-lg animate-pulse"
                  style={{
                    top: `${25 + i * 25}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '2s',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-8 lg:space-y-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0
            const { elementRef: stepRef, isVisible: stepVisible } = useScrollAnimation({ threshold: 0.2 })

            return (
              <div
                key={index}
                ref={stepRef}
                className={`relative flex items-center ${
                  // Sur mobile, toutes les cartes sont centrées et pleine largeur
                  // Sur lg et plus, alternance gauche/droite
                  'justify-center lg:justify-start'
                } ${!isEven ? 'lg:justify-end' : ''}`}
              >
                {/* Point de connexion - masqué sur mobile */}
                <div
                  className={`absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[rgb(31,41,55)] text-white shadow-lg transition-all duration-500 group-hover/step:scale-125 group-hover/step:rotate-180 lg:flex ${
                    stepVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 500}ms` }}
                >
                  <span className="font-display text-lg font-bold">{index + 1}</span>
                </div>

                {/* Contenu */}
                <Card
                  elevation="md"
                  className={`group relative w-full lg:w-[calc(50%-40px)] ${
                    stepVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="relative">
                    <div className="mb-5 flex items-start gap-4">
                      <div className="relative">
                        {/* Cercle de fond animé */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-50 group-hover:scale-150" />
                        
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl">
                          <Icon className="h-7 w-7 text-brand-600 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]" />
                        </div>
                        
                        {/* Badge numéro d'étape */}
                        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white shadow-md transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                          {index + 1}
                        </div>
                      </div>
                      
                      <div className="flex-1 pt-1">
                        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-600 transition-colors duration-300 group-hover:text-brand-700">
                          {language === 'fr' ? 'Étape' : 'Step'} {index + 1}
                        </div>
                        <h3 className="text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-brand-600">
                          {language === 'fr' ? step.title : step.titleEn}
                        </h3>
                      </div>
                    </div>
                    <p className="leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-neutral-700">
                      {language === 'fr'
                        ? step.description
                        : step.descriptionEn}
                    </p>
                  </div>
                </Card>
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
        <p className="mb-6 text-lg text-neutral-600 transition-colors duration-300">
          {language === 'fr'
            ? 'Prêt à démarrer votre projet ?'
            : 'Ready to start your project?'}
        </p>
        <a
          href="/contact"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[rgb(31,41,55)] px-8 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[rgb(15,23,42)] hover:shadow-2xl hover:scale-105"
        >
          {/* Effet de brillance animé */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <span className="relative z-10">{language === 'fr' ? 'Discutons de votre projet' : 'Let\'s discuss your project'}</span>
          
          {/* Flèche animée */}
          <div className="relative z-10 flex items-center">
            <div className="h-0.5 w-6 bg-white transition-all duration-300 group-hover:w-8" />
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </a>
      </div>
    </section>
  )
}

export default ProcessSection
