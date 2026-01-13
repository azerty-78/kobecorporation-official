import { CheckBadgeIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { chiffres } from '../../data/siteContent'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { useCounter } from '../../hooks/useCounter'

interface MissionStatProps {
  item: { label: string; labelEn: string; value: string }
  isActive: boolean
  language: 'fr' | 'en'
  index: number
}

function MissionStat({ item, isActive, language, index }: MissionStatProps) {
  const numericValue = parseFloat(item.value.replace(/[^0-9.]/g, ''))
  const counter = useCounter(numericValue, isActive, {
    duration: 2000,
    start: 0,
    decimals: item.value.includes('.') ? 1 : 0,
  })

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:shadow-lg ${
        isActive
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <p className="font-display text-2xl">
        {item.value.includes('+')
          ? `${counter.toLocaleString()}+`
          : item.value.includes('%')
          ? `${counter}%`
          : item.value.includes('K')
          ? `${counter}K`
          : item.value.includes('/')
          ? item.value
          : counter.toLocaleString()}
      </p>
      <p className="text-sm text-slate-200">
        {language === 'fr' ? item.label : item.labelEn}
      </p>
    </div>
  )
}

function MissionsSection() {
  const { language } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section
      id="missions"
      ref={elementRef}
      className="glass-panel rounded-3xl p-8 shadow-soft md:p-10"
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
          <p className="text-slate-600">
            {language === 'fr'
              ? 'Donner du sens à vos projets en construisant des solutions robustes, inclusives et pérennes.'
              : 'Give meaning to your projects by building robust, inclusive and sustainable solutions.'}
          </p>
          <ul className="space-y-3 text-slate-700">
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
          className={`relative overflow-hidden rounded-3xl bg-ink px-6 py-8 text-white transition-all duration-1000 ${
            isVisible
              ? 'translate-x-0 opacity-100 scale-100'
              : 'translate-x-8 opacity-0 scale-95'
          }`}
        >
          <div className="absolute inset-0 opacity-40" />
          <div className="relative space-y-4">
            <p className="font-semibold text-brand-100">
              {language === 'fr' ? 'Pourquoi KOBE Corporation' : 'Why KOBE Corporation'}
            </p>
            <p className="text-lg text-slate-100">
              {language === 'fr'
                ? 'Un partenaire de confiance, capable d\'aligner vision stratégique et exécution terrain, avec un accompagnement humain et réactif.'
                : 'A trusted partner, capable of aligning strategic vision and field execution, with human and responsive support.'}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {chiffres.map((item, index) => (
                <MissionStat
                  key={index}
                  item={item}
                  isActive={isVisible}
                  language={language}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionsSection
