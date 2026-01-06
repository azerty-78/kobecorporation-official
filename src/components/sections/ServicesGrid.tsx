import { services } from '../../data/siteContent'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface ServicesGridProps {
  showIntro?: boolean
}

function ServicesGrid({ showIntro = true }: ServicesGridProps) {
  return (
    <section id="services" className="space-y-8">
      {showIntro && (
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Services</p>
            <h2 className="font-display text-3xl text-ink">Ce que nous faisons le mieux</h2>
            <p className="text-slate-600">
              Des interventions ciblées pour sécuriser vos opérations et accélérer vos initiatives.
            </p>
          </div>
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-brand-200 hover:text-brand-700 md:inline-flex"
          >
            Planifier un rendez-vous
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className="glass-panel flex h-full flex-col gap-3 rounded-2xl p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
              {service.icon}
            </div>
            <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
            <p className="text-sm text-slate-600">{service.desc}</p>
            <div className="mt-auto pt-4">
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                En savoir plus
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesGrid

