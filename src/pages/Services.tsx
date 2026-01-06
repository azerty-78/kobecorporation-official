import ServicesGrid from '../components/sections/ServicesGrid'
import ContactSection from '../components/sections/ContactSection'

function Services() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-14 md:py-20">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Services</p>
        <h1 className="font-display text-4xl text-ink md:text-5xl">Nos domaines d’intervention</h1>
        <p className="max-w-2xl text-slate-600">
          KOBE Corporation vous accompagne de bout en bout, de la définition de votre stratégie à la mise en
          œuvre opérationnelle, avec une attention particulière portée à la qualité et à l’impact.
        </p>
      </div>
      <ServicesGrid showIntro={false} />
      <ContactSection id="contact-services" />
    </div>
  )
}

export default Services

