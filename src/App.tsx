import {
  ArrowRightIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  CheckBadgeIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

const services = [
  {
    icon: <BriefcaseIcon className="h-6 w-6 text-brand-500" />,
    title: 'Conseil & Stratégie',
    desc: 'Accompagnement sur-mesure pour accélérer vos projets et sécuriser vos décisions.',
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6 text-brand-500" />,
    title: 'Qualité & Conformité',
    desc: 'Processus rigoureux, documentation claire et conformité aux standards internationaux.',
  },
  {
    icon: <SparklesIcon className="h-6 w-6 text-brand-500" />,
    title: 'Innovation Durable',
    desc: 'Solutions modernes qui conjuguent performance, impact et respect de l’environnement.',
  },
]

const valeurs = [
  {
    icon: <CheckBadgeIcon className="h-5 w-5 text-brand-500" />,
    title: 'Excellence opérationnelle',
    text: 'Des méthodes éprouvées, des équipes engagées et un pilotage transparent.',
  },
  {
    icon: <BuildingOffice2Icon className="h-5 w-5 text-brand-500" />,
    title: 'Proximité client',
    text: 'Un interlocuteur dédié et des points de contact réguliers pour avancer ensemble.',
  },
  {
    icon: <GlobeAltIcon className="h-5 w-5 text-brand-500" />,
    title: 'Ouverture internationale',
    text: 'Nous intervenons sur plusieurs marchés et cultivons une culture multiculturelle.',
  },
]

const chiffres = [
  { label: 'Clients accompagnés', value: '120+' },
  { label: 'Années d’expérience', value: '10' },
  { label: 'Taux de satisfaction', value: '96%' },
]

function App() {
  return (
    <div className="min-h-screen bg-gradient-radial">
      <div className="absolute inset-0 -z-10 opacity-40 blur-3xl" />
      <header className="sticky top-0 z-20 border-b border-white/50 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft">
              <span className="font-display text-lg">K</span>
            </div>
            <div>
              <p className="font-display text-xl text-ink">KOBE Corporation</p>
              <p className="text-sm text-slate-500">Stratégie · Qualité · Innovation</p>
            </div>
          </div>
          <div className="hidden gap-3 md:flex">
            <a className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:text-brand-600" href="#missions">
              Missions
            </a>
            <a className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:text-brand-600" href="#services">
              Services
            </a>
            <a className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:text-brand-600" href="#contact">
              Contact
            </a>
          </div>
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 md:inline-flex"
          >
            Parler à un expert
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-14 md:py-20">
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
              KOBE Corporation accompagne les organisations dans leurs projets stratégiques en
              combinant expertise métier, excellence opérationnelle et innovation durable.
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                Notre mission
              </p>
              <p className="text-lg text-slate-700">
                Nous créons des expériences et des opérations qui mettent vos équipes et vos clients au
                centre. Notre approche holistique combine stratégie, design et technologies pour livrer
                des résultats mesurables.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {valeurs.map((valeur) => (
                  <div key={valeur.title} className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-soft">
                    <div className="mb-2 flex items-center gap-2">
                      {valeur.icon}
                      <p className="font-semibold text-ink">{valeur.title}</p>
                    </div>
                    <p className="text-sm text-slate-600">{valeur.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="space-y-8">
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

        <section id="missions" className="glass-panel rounded-3xl p-8 shadow-soft">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Engagement</p>
              <h2 className="font-display text-3xl text-ink">Nos missions prioritaires</h2>
              <p className="text-slate-600">
                Donner du sens à vos projets en construisant des solutions robustes, inclusives et
                pérennes.
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
                  Un partenaire de confiance, capable d’aligner vision stratégique et exécution terrain,
                  avec un accompagnement humain et réactif.
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

        <section id="contact" className="space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
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
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              contact@kobecorporation.com
              <EnvelopeIcon className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <PhoneIcon className="h-5 w-5 text-brand-500" />
              <div>
                <p className="text-sm text-slate-500">Téléphone</p>
                <p className="font-semibold text-ink">+225 XX XX XX XX</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <EnvelopeIcon className="h-5 w-5 text-brand-500" />
              <div>
                <p className="text-sm text-slate-500">E-mail</p>
                <p className="font-semibold text-ink">contact@kobecorporation.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <BuildingOffice2Icon className="h-5 w-5 text-brand-500" />
              <div>
                <p className="text-sm text-slate-500">Adresse</p>
                <p className="font-semibold text-ink">Abidjan · Côte d’Ivoire</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 bg-white/80 py-6 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} KOBE Corporation. Tous droits réservés.</p>
          <div className="flex gap-4 text-sm text-slate-500">
            <span>Confidentialité</span>
            <span>Mentions légales</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
