import { CheckBadgeIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

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
        <div
          className={`group relative overflow-hidden rounded-3xl px-8 py-10 text-white shadow-2xl transition-all duration-1000 hover:shadow-[0_0_40px_rgba(31,41,55,0.5)] ${
            isVisible
              ? 'translate-x-0 opacity-100 scale-100'
              : 'translate-x-8 opacity-0 scale-95'
          }`}
          style={{ backgroundColor: 'rgb(31, 41, 55)' }}
        >
          {/* Gradient animé en arrière-plan */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 via-transparent to-brand-400/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          
          {/* Particules animées */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 h-1 w-1 rounded-full bg-brand-300 animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="absolute bottom-20 left-10 h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 right-20 h-1 w-1 rounded-full bg-brand-200 animate-pulse" style={{ animationDelay: '3s' }} />
          </div>
          
          <div className="relative space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-brand-400 to-brand-300 transition-all duration-500 group-hover:w-16" />
              <p className="font-semibold text-brand-100 transition-colors duration-300 group-hover:text-brand-50">
                {language === 'fr' ? 'Pourquoi KOBE Corporation' : 'Why KOBE Corporation'}
              </p>
            </div>
            <p className="text-lg leading-relaxed text-slate-100 transition-colors duration-300 group-hover:text-white">
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
        </div>
      </div>
    </section>
  )
}

export default MissionsSection
