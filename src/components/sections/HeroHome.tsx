import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { chiffres } from '../../data/siteContent'

function HeroHome() {
  return (
    <section className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-600 shadow-soft">
          <SparklesIcon className="h-4 w-4" />
          Site vitrine · KOBE Corporation
        </div>
        <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">
          Nous propulsons vos ambitions avec des solutions modernes et fiables.
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          KOBE Corporation accompagne les organisations dans leurs projets stratégiques en combinant
          expertise métier, excellence opérationnelle et innovation durable.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Discuter de votre projet
            <ArrowRightIcon className="h-4 w-4" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
          >
            Découvrir nos services
          </a>
        </div>
        <div className="flex flex-wrap gap-6 pt-4">
          {chiffres.map((item) => (
            <div key={item.label} className="flex flex-col">
              <span className="font-display text-3xl text-ink">{item.value}</span>
              <span className="text-sm text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-panel relative overflow-hidden rounded-3xl p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-white to-brand-100/40" />
        <div className="relative space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Notre mission</p>
          <p className="text-lg text-slate-700">
            Nous créons des expériences et des opérations qui mettent vos équipes et vos clients au centre.
            Notre approche holistique combine stratégie, design et technologies pour livrer des résultats
            mesurables.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroHome

