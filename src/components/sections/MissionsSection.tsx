import { CheckBadgeIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Card } from '../ui/Card'

function MissionsSection() {
  const { language } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section
      id="missions"
      ref={elementRef}
      className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-card md:p-10"
    >
      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:gap-12">
        <div
          className={`space-y-3 transition-all duration-1000 ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-8 opacity-0'
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            {language === 'fr' ? 'Engagement' : 'Commitment'}
          </p>
          <h2 className="font-display text-3xl text-ink">
            {language === 'fr' ? 'Nos missions prioritaires' : 'Our priority missions'}
          </h2>
          <p className="text-neutral-600">
            {language === 'fr'
              ? 'Donner du sens à vos projets en construisant des solutions robustes, inclusives et pérennes.'
              : 'Give meaning to your projects by building robust, inclusive and sustainable solutions.'}
          </p>
          <ul className="space-y-3 text-neutral-700">
            {[
              {
                icon: ShieldCheckIcon,
                text: language === 'fr'
                  ? 'Sécuriser vos opérations critiques et réduire les risques.'
                  : 'Secure your critical operations and reduce risks.',
              },
              {
                icon: SparklesIcon,
                text: language === 'fr'
                  ? 'Moderniser vos outils pour offrir une expérience fluide à vos équipes.'
                  : 'Modernize your tools to offer a smooth experience to your teams.',
              },
              {
                icon: CheckBadgeIcon,
                text: language === 'fr'
                  ? 'Mesurer l\'impact et ancrer une culture de l\'amélioration continue.'
                  : 'Measure impact and anchor a culture of continuous improvement.',
              },
            ].map((mission, index) => {
              const Icon = mission.icon
              return (
                <li
                  key={index}
                  className={`flex items-start gap-3 transition-all duration-700 ${
                    isVisible
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${(index + 1) * 200}ms`,
                  }}
                >
                  <Icon className="mt-1 h-5 w-5 flex-shrink-0 text-brand-500 transition-all duration-300 group-hover:scale-110" />
                  <span>{mission.text}</span>
                </li>
              )
            })}
          </ul>
        </div>
        <Card
          elevation="lg"
          className={`group relative overflow-hidden px-8 py-10 text-white transition-all duration-1000 ${
            isVisible
              ? 'translate-x-0 opacity-100 scale-100'
              : 'translate-x-8 opacity-0 scale-95'
          }`}
        >
          {/* Modern dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900" />
          
          {/* Decorative overlay with subtle brand accent */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/5 via-transparent to-accent-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.08)_1px,_transparent_0)] bg-[size:24px_24px] opacity-40" />
          
          {/* Content */}
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative h-1.5 w-12 overflow-hidden rounded-full bg-white/30 transition-all duration-500 group-hover:w-16">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </div>
              <p className="font-bold uppercase tracking-[0.1em] text-white transition-colors duration-300 group-hover:text-white">
                {language === 'fr' ? 'Pourquoi KOBE Corporation' : 'Why KOBE Corporation'}
              </p>
            </div>
            <p className="text-lg leading-relaxed text-white/95 transition-colors duration-300 group-hover:text-white">
              {language === 'fr'
                ? 'Un partenaire de confiance, capable d\'aligner vision stratégique et exécution terrain, avec un accompagnement humain et réactif.'
                : 'A trusted partner, capable of aligning strategic vision and field execution, with human and responsive support.'}
            </p>
            {/* Statistiques masquées temporairement - entreprise en création */}
            {/* <div className="grid gap-4 sm:grid-cols-2">
              {chiffres.map((item, index) => (
                <MissionStat
                  key={index}
                  item={item}
                  isActive={isVisible}
                  language={language}
                  index={index}
                />
              ))}
            </div> */}
          </div>
        </Card>
      </div>
    </section>
  )
}

export default MissionsSection
