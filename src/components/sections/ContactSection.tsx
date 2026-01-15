import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

interface ContactSectionProps {
  id?: string
}

function ContactSection({ id = 'contact' }: ContactSectionProps) {
  return (
    <section id={id} className="space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Contact</p>
          <h2 className="font-display text-3xl text-ink">Parlons de vos objectifs</h2>
          <p className="text-slate-600">
            Nous répondons sous 24h pour planifier un échange et comprendre vos besoins.
          </p>
        </div>
        <a
          href="mailto:contact@kobecorporation.com"
          className="inline-flex items-center gap-2 rounded-full bg-[rgb(31,41,55)] px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[rgb(15,23,42)]"
        >
          contact@kobecorporation.com
          <EnvelopeIcon className="h-4 w-4" />
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <PhoneIcon className="h-5 w-5 text-brand-500" />
          <div>
            <p className="text-sm text-slate-500">Téléphone</p>
            <p className="font-semibold text-ink">+225 XX XX XX XX</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <EnvelopeIcon className="h-5 w-5 text-brand-500" />
          <div>
            <p className="text-sm text-slate-500">E-mail</p>
            <p className="font-semibold text-ink">contact@kobecorporation.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <BuildingOffice2Icon className="h-5 w-5 text-brand-500" />
          <div>
            <p className="text-sm text-slate-500">Adresse</p>
            <p className="font-semibold text-ink">Abidjan · Côte d’Ivoire</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

