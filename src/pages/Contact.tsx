import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { companyInfo, contactInfo } from '../data/siteContent'
import {
  PaperClipIcon,
} from '@heroicons/react/24/outline'

function Contact() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
    attachment: null as File | null,
    consent: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const projectTypes = [
    { value: 'web', label: 'Développement Web', labelEn: 'Web Development' },
    { value: 'mobile', label: 'Développement Mobile', labelEn: 'Mobile Development' },
    { value: 'hosting', label: 'Hébergement', labelEn: 'Hosting' },
    { value: 'training', label: 'Formation', labelEn: 'Training' },
    { value: 'consulting', label: 'Consultation', labelEn: 'Consulting' },
    { value: 'other', label: 'Autre', labelEn: 'Other' },
  ]

  const budgetRanges = [
    { value: '<500k', label: '< 500 000 FCFA', labelEn: '< 500,000 FCFA' },
    { value: '500k-1m', label: '500 000 - 1 000 000 FCFA', labelEn: '500,000 - 1,000,000 FCFA' },
    { value: '1m-5m', label: '1 000 000 - 5 000 000 FCFA', labelEn: '1,000,000 - 5,000,000 FCFA' },
    { value: '5m-10m', label: '5 000 000 - 10 000 000 FCFA', labelEn: '5,000,000 - 10,000,000 FCFA' },
    { value: '>10m', label: '> 10 000 000 FCFA', labelEn: '> 10,000,000 FCFA' },
    { value: 'discuss', label: 'À discuter', labelEn: 'To discuss' },
  ]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, attachment: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simuler l'envoi du formulaire
    // TODO: Implémenter l'envoi réel vers un backend
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitStatus('success')
    
    // Réinitialiser le formulaire
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      budget: '',
      message: '',
      attachment: null,
      consent: false,
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      {/* Hero Section */}
      <div className="mb-16 space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
          {language === 'fr' ? 'Contact' : 'Contact'}
        </p>
        <h1 className="font-display text-4xl text-ink md:text-5xl">
          {language === 'fr' ? 'Contactez-Nous' : 'Contact Us'}
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-600">
          {language === 'fr'
            ? 'Nous sommes disponibles 24/7 pour répondre à vos besoins'
            : 'We are available 24/7 to meet your needs'}
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Informations de Contact */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-6 font-display text-2xl text-ink">
              {language === 'fr' ? 'Informations de Contact' : 'Contact Information'}
            </h2>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="glass-panel flex items-start gap-3 rounded-2xl p-4"
                >
                  <div className="mt-0.5">{info.icon}</div>
                  <div>
                    <p className="text-xs text-slate-500">
                      {language === 'fr' ? info.label : info.labelEn}
                    </p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-sm font-semibold text-ink transition hover:text-brand-600"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-ink">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Réseaux Sociaux */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-ink">
              {language === 'fr' ? 'Suivez-Nous' : 'Follow Us'}
            </h3>
            <div className="flex gap-3">
              <a
                href={companyInfo.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-brand-300 hover:text-brand-600"
                aria-label="WhatsApp"
              >
                💬
              </a>
              <a
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-brand-300 hover:text-brand-600"
                aria-label="Facebook"
              >
                👍
              </a>
              <a
                href={companyInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-brand-300 hover:text-brand-600"
                aria-label="LinkedIn"
              >
                🔗
              </a>
              <a
                href={companyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-brand-300 hover:text-brand-600"
                aria-label="Instagram"
              >
                📸
              </a>
            </div>
          </div>

          {/* FAQ Rapide */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-ink">
              {language === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <p className="font-semibold">
                  {language === 'fr'
                    ? 'Q: Quel est votre délai de réponse ?'
                    : 'Q: What is your response time?'}
                </p>
                <p>
                  {language === 'fr'
                    ? 'R: Nous répondons généralement sous 24 heures maximum.'
                    : 'A: We usually respond within 24 hours maximum.'}
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  {language === 'fr'
                    ? 'Q: Proposez-vous des consultations gratuites ?'
                    : 'Q: Do you offer free consultations?'}
                </p>
                <p>
                  {language === 'fr'
                    ? 'R: Oui, la première consultation pour analyser votre projet est gratuite.'
                    : 'A: Yes, the first consultation to analyze your project is free.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire de Contact */}
        <div className="lg:col-span-2">
          <div className="glass-panel rounded-3xl p-8">
            <h2 className="mb-6 font-display text-2xl text-ink">
              {language === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-800">
                {language === 'fr'
                  ? 'Message envoyé avec succès ! Nous vous répondrons sous 24h.'
                  : 'Message sent successfully! We will respond within 24h.'}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    {language === 'fr' ? 'Nom complet' : 'Full name'} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    {language === 'fr' ? 'Téléphone' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    {language === 'fr' ? 'Entreprise' : 'Company'}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="projectType"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    {language === 'fr' ? 'Type de projet' : 'Project type'}
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  >
                    <option value="">
                      {language === 'fr' ? 'Sélectionner...' : 'Select...'}
                    </option>
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {language === 'fr' ? type.label : type.labelEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    {language === 'fr' ? 'Budget estimé' : 'Estimated budget'}
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  >
                    <option value="">
                      {language === 'fr' ? 'Sélectionner...' : 'Select...'}
                    </option>
                    {budgetRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {language === 'fr' ? range.label : range.labelEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  {language === 'fr' ? 'Message' : 'Message'} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="attachment"
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-ink"
                >
                  <PaperClipIcon className="h-4 w-4" />
                  {language === 'fr'
                    ? 'Pièce jointe (optionnel)'
                    : 'Attachment (optional)'}
                </label>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                />
                <label
                  htmlFor="consent"
                  className="text-sm text-slate-600"
                >
                  {language === 'fr' ? (
                    <>
                      J'accepte que mes données soient utilisées pour me
                      recontacter
                    </>
                  ) : (
                    <>I agree that my data be used to contact me back</>
                  )}
                  *
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 disabled:opacity-50"
              >
                {isSubmitting
                  ? language === 'fr'
                    ? 'Envoi en cours...'
                    : 'Sending...'
                  : language === 'fr'
                  ? 'Envoyer le message'
                  : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
