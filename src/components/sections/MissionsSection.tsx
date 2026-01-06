import { CheckBadgeIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { chiffres } from '../../data/siteContent'

function MissionsSection() {
  return (
    <section id="missions" className="glass-panel rounded-3xl p-8 shadow-soft">
      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Engagement</p>
          <h2 className="font-display text-3xl text-ink">Nos missions prioritaires</h2>
          <p className="text-slate-600">
            Donner du sens à vos projets en construisant des solutions robustes, inclusives et pérennes.
          </p>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <ShieldCheckIcon className="mt-1 h-5 w-5 text-brand-500" />
              Sécuriser vos opérations critiques et réduire les risques.
            </li>
            <li className="flex items-start gap-3">
              <SparklesIcon className="mt-1 h-5 w-5 text-brand-500" />
              Moderniser vos outils pour offrir une expérience fluide à vos équipes.
            </li>
            <li className="flex items-start gap-3">
              <CheckBadgeIcon className="mt-1 h-5 w-5 text-brand-500" />
              Mesurer l’impact et ancrer une culture de l’amélioration continue.
            </li>
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-8 text-white">
          <div className="absolute inset-0 opacity-40" />
          <div className="relative space-y-4">
            <p className="font-semibold text-brand-100">Pourquoi KOBE Corporation</p>
            <p className="text-lg text-slate-100">
              Un partenaire de confiance, capable d’aligner vision stratégique et exécution terrain, avec un
              accompagnement humain et réactif.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {chiffres.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-display text-2xl">{item.value}</p>
                  <p className="text-sm text-slate-200">{item.label}</p>
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

