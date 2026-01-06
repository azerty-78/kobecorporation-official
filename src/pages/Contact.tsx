import ContactSection from '../components/sections/ContactSection'

function Contact() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-14 md:py-20">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Contact</p>
        <h1 className="font-display text-4xl text-ink md:text-5xl">Entrer en relation avec KOBE Corporation</h1>
        <p className="max-w-2xl text-slate-600">
          Partagez vos enjeux, votre contexte et vos objectifs. Nous reviendrons rapidement vers vous pour
          construire une proposition adaptée.
        </p>
      </div>
      <ContactSection />
    </div>
  )
}

export default Contact

