import { CheckBadgeIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { chiffres } from '../../data/siteContent'

function MissionsSection() {
  const { language } = useLanguage()

  return (
    <section id="missions" className="glass-panel rounded-3xl p-8 shadow-soft">
      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
            {language === 'fr' ? 'Engagement' : 'Commitment'}
          </p>
          <h2 className="font-display text-3xl text-ink dark:text-white">
            {language === 'fr' ? 'Nos missions prioritaires' : 'Our priority missions'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {language === 'fr'
              ? 'Donner du sens à vos projets en construisant des solutions robustes, inclusives et pérennes.'
              : 'Give meaning to your projects by building robust, inclusive and sustainable solutions.'}
          </p>
          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <ShieldCheckIcon className="mt-1 h-5 w-5 text-brand-500" />
              {language === 'fr'
                ? 'Sécuriser vos opérations critiques et réduire les risques.'
                : 'Secure your critical operations and reduce risks.'}
            </li>
            <li className="flex items-start gap-3">
              <SparklesIcon className="mt-1 h-5 w-5 text-brand-500" />
              {language === 'fr'
                ? 'Moderniser vos outils pour offrir une expérience fluide à vos équipes.'
                : 'Modernize your tools to offer a smooth experience to your teams.'}
            </li>
            <li className="flex items-start gap-3">
              <CheckBadgeIcon className="mt-1 h-5 w-5 text-brand-500" />
              {language === 'fr'
                ? 'Mesurer l\'impact et ancrer une culture de l\'amélioration continue.'
                : 'Measure impact and anchor a culture of continuous improvement.'}
            </li>
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-8 text-white dark:bg-slate-800">
          <div className="absolute inset-0 opacity-40 dark:opacity-20" />
          <div className="relative space-y-4">
            <p className="font-semibold text-brand-100 dark:text-brand-400">
              {language === 'fr' ? 'Pourquoi KOBE Corporation' : 'Why KOBE Corporation'}
            </p>
            <p className="text-lg text-slate-100 dark:text-slate-300">
              {language === 'fr'
                ? 'Un partenaire de confiance, capable d\'aligner vision stratégique et exécution terrain, avec un accompagnement humain et réactif.'
                : 'A trusted partner, capable of aligning strategic vision and field execution, with human and responsive support.'}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {chiffres.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 dark:border-slate-700/50 dark:bg-slate-700/20"
                >
                  <p className="font-display text-2xl">{item.value}</p>
                  <p className="text-sm text-slate-200 dark:text-slate-300">
                    {language === 'fr' ? item.label : item.labelEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionsSection
