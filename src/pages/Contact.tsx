import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { companyInfo, contactInfo } from '../data/siteContent'
import {
  PaperClipIcon,
  CheckCircleIcon,
  XCircleIcon,
  RocketLaunchIcon,
  CheckIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { WhatsAppIcon, FacebookIcon, LinkedInIcon, InstagramIcon } from '../components/icons/SocialIcons'

// Composant FAQ avec accordéon
function FAQAccordion({ language }: { language: 'fr' | 'en' }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: language === 'fr' 
        ? 'Quel est votre délai de réponse ?'
        : 'What is your response time?',
      answer: language === 'fr'
        ? 'Nous répondons généralement sous 24 heures maximum, même les weekends. Pour les urgences, nous avons un support 24/7 disponible.'
        : 'We usually respond within 24 hours maximum, even on weekends. For emergencies, we have 24/7 support available.',
    },
    {
      question: language === 'fr'
        ? 'Proposez-vous des consultations gratuites ?'
        : 'Do you offer free consultations?',
      answer: language === 'fr'
        ? 'Oui, la première consultation pour analyser votre projet et discuter de vos besoins est entièrement gratuite. C\'est l\'occasion de découvrir comment nous pouvons vous aider.'
        : 'Yes, the first consultation to analyze your project and discuss your needs is completely free. It\'s an opportunity to discover how we can help you.',
    },
    {
      question: language === 'fr'
        ? 'Quels sont vos tarifs ?'
        : 'What are your rates?',
      answer: language === 'fr'
        ? 'Nos tarifs varient selon le type de projet et sa complexité. Nous proposons des budgets adaptés aux particuliers, PME et grandes entreprises. Contactez-nous pour un devis personnalisé gratuit.'
        : 'Our rates vary depending on the type of project and its complexity. We offer budgets adapted to individuals, SMEs and large enterprises. Contact us for a free personalized quote.',
    },
    {
      question: language === 'fr'
        ? 'Travaillez-vous avec des clients internationaux ?'
        : 'Do you work with international clients?',
      answer: language === 'fr'
        ? 'Absolument ! Nous travaillons avec des clients du monde entier. Notre équipe est habituée aux projets à distance et nous utilisons les meilleurs outils de collaboration pour garantir une communication fluide.'
        : 'Absolutely! We work with clients from around the world. Our team is used to remote projects and we use the best collaboration tools to ensure smooth communication.',
    },
    {
      question: language === 'fr'
        ? 'Quelle est votre garantie sur les projets ?'
        : 'What is your guarantee on projects?',
      answer: language === 'fr'
        ? 'Nous garantissons la qualité de notre code avec des tests automatisés (90%+ coverage), code review systématique et documentation complète. Nous offrons également 6 mois de support post-lancement inclus.'
        : 'We guarantee the quality of our code with automated tests (90%+ coverage), systematic code review and complete documentation. We also offer 6 months of post-launch support included.',
    },
    {
      question: language === 'fr'
        ? 'Proposez-vous des formations ?'
        : 'Do you offer training?',
      answer: language === 'fr'
        ? 'Oui ! Nous proposons des bootcamps intensifs, formations en entreprise et mentorat individuel. Nos programmes couvrent le développement web, mobile, DevOps, cybersécurité et bien plus.'
        : 'Yes! We offer intensive bootcamps, corporate training and individual mentoring. Our programs cover web development, mobile, DevOps, cybersecurity and much more.',
    },
    {
      question: language === 'fr'
        ? 'Comment fonctionne le processus de développement ?'
        : 'How does the development process work?',
      answer: language === 'fr'
        ? 'Notre processus suit 5 étapes : Découverte (analyse des besoins), Planification (scope et timeline), Développement (avec code review et tests), Déploiement (mise en production) et Support (accompagnement continu).'
        : 'Our process follows 5 steps: Discovery (needs analysis), Planning (scope and timeline), Development (with code review and tests), Deployment (production) and Support (continuous support).',
    },
    {
      question: language === 'fr'
        ? 'Quels modes de paiement acceptez-vous ?'
        : 'What payment methods do you accept?',
      answer: language === 'fr'
        ? 'Nous acceptons les virements bancaires, Mobile Money (Orange Money, MTN Mobile Money), PayPal et les cartes bancaires. Les paiements peuvent être échelonnés selon le projet.'
        : 'We accept bank transfers, Mobile Money (Orange Money, MTN Mobile Money), PayPal and bank cards. Payments can be spread out according to the project.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
        
        return (
          <div
            key={index}
            ref={elementRef}
            className={`group/faq relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${
              isOpen
                ? 'border-brand-300 bg-gradient-to-br from-brand-50/80 to-white shadow-lg'
                : 'border-slate-200 bg-white hover:border-brand-200 hover:shadow-md'
            } ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {/* Ligne décorative animée */}
            <div className={`absolute top-0 left-0 h-1 bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500 ${
              isOpen ? 'w-full' : 'w-0'
            }`} />
            
            {/* Gradient au hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-100/10 opacity-0 transition-opacity duration-500 group-hover/faq:opacity-100" />
            
            <button
              onClick={() => toggleFAQ(index)}
              className="relative flex w-full items-center justify-between gap-4 p-4 text-left transition-all duration-300 hover:bg-brand-50/30"
              aria-expanded={isOpen}
            >
              <div className="flex flex-1 items-start gap-3">
                <div className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold shadow-sm transition-all duration-300 ${
                  isOpen
                    ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white scale-110 rotate-6'
                    : 'bg-brand-50 text-brand-600 group-hover/faq:bg-brand-100 group-hover/faq:scale-105'
                }`}>
                  {index + 1}
                </div>
                <h4 className={`flex-1 font-semibold leading-snug transition-all duration-300 ${
                  isOpen ? 'text-brand-700 text-base' : 'text-ink text-sm'
                }`}>
                  {faq.question}
                </h4>
              </div>
              <div className={`flex-shrink-0 rounded-lg p-1 transition-all duration-300 ${
                isOpen ? 'bg-brand-100' : 'bg-slate-50'
              }`}>
                <ChevronDownIcon
                  className={`h-5 w-5 text-slate-500 transition-all duration-500 ${
                    isOpen ? 'rotate-180 text-brand-600 scale-110' : 'rotate-0'
                  }`}
                />
              </div>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-4 pb-4 pl-14">
                <div className="group/answer relative flex items-start gap-3 rounded-xl bg-gradient-to-br from-white to-brand-50/30 p-4 shadow-sm transition-all duration-300 hover:shadow-md">
                  {/* Icône avec animation */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-brand-400/20 animate-ping opacity-0 group-hover/answer:opacity-100" />
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-sm">
                      <CheckIcon className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-slate-700">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Contact() {
  const { language } = useLanguage()
  const { elementRef: introRef, isVisible: introVisible } = useScrollAnimation({ threshold: 0.2 })
  
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
      {/* Hero Section avec animations */}
      <div
        ref={introRef}
        className={`mb-20 space-y-6 text-center transition-all duration-1000 ${
          introVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-600 shadow-sm">
          <RocketLaunchIcon className="h-4 w-4 animate-pulse" />
          <span>{language === 'fr' ? 'Contact' : 'Contact'}</span>
        </div>
        <h1 className="font-display text-4xl text-ink transition-all duration-1000 delay-200 md:text-5xl lg:text-6xl">
          {language === 'fr' ? 'Contactez-Nous' : 'Contact Us'}
        </h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 transition-all duration-1000 delay-300">
          {language === 'fr'
            ? 'Nous sommes disponibles 24/7 pour répondre à vos besoins. Discutons de votre projet et découvrons comment nous pouvons vous accompagner.'
            : 'We are available 24/7 to meet your needs. Let\'s discuss your project and discover how we can support you.'}
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Informations de Contact avec animations */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-6 font-display text-2xl text-ink md:text-3xl">
              {language === 'fr' ? 'Informations de Contact' : 'Contact Information'}
            </h2>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
                return (
                  <div
                    key={index}
                    ref={elementRef}
                    className={`group glass-panel relative overflow-hidden flex items-start gap-3 rounded-2xl p-5 transition-all duration-700 hover:-translate-y-1 hover:shadow-xl ${
                      isVisible
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Ligne décorative */}
                    <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500 group-hover:w-full" />
                    
                    {/* Gradient au hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-100/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {language === 'fr' ? info.label : info.labelEn}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-sm font-semibold text-ink transition-colors duration-300 hover:text-brand-600"
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
                )
              })}
            </div>
          </div>

          {/* Réseaux Sociaux améliorés */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-ink">
              {language === 'fr' ? 'Suivez-Nous' : 'Follow Us'}
            </h3>
            <div className="flex gap-3">
              <a
                href={companyInfo.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] transition-all duration-300 hover:scale-110 hover:bg-[#25D366] hover:text-white hover:shadow-lg"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
              <a
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-xl bg-[#1877F2]/10 text-[#1877F2] transition-all duration-300 hover:scale-110 hover:bg-[#1877F2] hover:text-white hover:shadow-lg"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
              <a
                href={companyInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] transition-all duration-300 hover:scale-110 hover:bg-[#0A66C2] hover:text-white hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
              <a
                href={companyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex h-12 w-12 items-center justify-center rounded-xl bg-[#E4405F]/10 text-[#E4405F] transition-all duration-300 hover:scale-110 hover:bg-[#E4405F] hover:text-white hover:shadow-lg"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-6 w-6 transition-transform duration-300 group-hover/social:scale-110" />
              </a>
            </div>
          </div>

          {/* FAQ Interactive avec accordéon */}
          <div className="group glass-panel relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
            {/* Gradient animé */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-100/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Ligne décorative */}
            <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500 group-hover:w-full" />
            
            <div className="relative mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-md">
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-ink md:text-lg">
                {language === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
              </h3>
            </div>
            <FAQAccordion language={language} />
          </div>
        </div>

        {/* Formulaire de Contact amélioré */}
        <div className="lg:col-span-2">
          <div className="group glass-panel relative overflow-hidden rounded-3xl p-8 shadow-xl transition-all duration-700 hover:shadow-2xl md:p-10">
            {/* Gradient animé */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-white to-brand-100/30 animate-gradient-shift" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-200/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            <div className="relative">
              <h2 className="mb-6 font-display text-2xl text-ink md:text-3xl">
                {language === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
              </h2>

              {/* Message de succès amélioré */}
              {submitStatus === 'success' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-800 shadow-sm transition-all duration-500">
                  <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-600" />
                  <div>
                    <p className="font-semibold">
                      {language === 'fr'
                        ? 'Message envoyé avec succès !'
                        : 'Message sent successfully!'}
                    </p>
                    <p className="text-xs text-green-700">
                      {language === 'fr'
                        ? 'Nous vous répondrons sous 24h.'
                        : 'We will respond within 24h.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Message d'erreur */}
              {submitStatus === 'error' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800 shadow-sm">
                  <XCircleIcon className="h-5 w-5 flex-shrink-0 text-red-600" />
                  <div>
                    <p className="font-semibold">
                      {language === 'fr'
                        ? 'Erreur lors de l\'envoi'
                        : 'Error sending message'}
                    </p>
                    <p className="text-xs text-red-700">
                      {language === 'fr'
                        ? 'Veuillez réessayer plus tard.'
                        : 'Please try again later.'}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="group/field">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
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
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-slate-300"
                      placeholder={language === 'fr' ? 'Votre nom' : 'Your name'}
                    />
                  </div>
                  <div className="group/field">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
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
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-slate-300"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="group/field">
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
                    >
                      {language === 'fr' ? 'Téléphone' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-slate-300"
                      placeholder="+237 XXX XXX XXX"
                    />
                  </div>
                  <div className="group/field">
                    <label
                      htmlFor="company"
                      className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
                    >
                      {language === 'fr' ? 'Entreprise' : 'Company'}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-slate-300"
                      placeholder={language === 'fr' ? 'Nom de votre entreprise' : 'Company name'}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="group/field">
                    <label
                      htmlFor="projectType"
                      className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
                    >
                      {language === 'fr' ? 'Type de projet' : 'Project type'}
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-slate-300"
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
                  <div className="group/field">
                    <label
                      htmlFor="budget"
                      className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
                    >
                      {language === 'fr' ? 'Budget estimé' : 'Estimated budget'}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-slate-300"
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

                <div className="group/field">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
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
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-slate-300 resize-none"
                    placeholder={language === 'fr' ? 'Décrivez votre projet...' : 'Describe your project...'}
                  />
                </div>

                <div className="group/field">
                  <label
                    htmlFor="attachment"
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 group-focus-within/field:text-brand-600"
                  >
                    <PaperClipIcon className="h-4 w-4" />
                    {language === 'fr'
                      ? 'Pièce jointe (optionnel)'
                      : 'Attachment (optional)'}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="attachment"
                      name="attachment"
                      onChange={handleFileChange}
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 group-hover/field:border-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-600 hover:file:bg-brand-100"
                    />
                    {formData.attachment && (
                      <p className="mt-2 text-xs text-slate-600">
                        {language === 'fr' ? 'Fichier sélectionné :' : 'Selected file:'} {formData.attachment.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-500 transition-all duration-300 focus:ring-2 focus:ring-brand-500/20"
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm leading-relaxed text-slate-600"
                  >
                    {language === 'fr' ? (
                      <>
                        J'accepte que mes données soient utilisées pour me
                        recontacter *
                      </>
                    ) : (
                      <>I agree that my data be used to contact me back *</>
                    )}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group/btn relative w-full overflow-hidden rounded-full bg-[rgb(31,41,55)] px-8 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:bg-[rgb(15,23,42)] hover:shadow-2xl disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:hover:bg-[rgb(31,41,55)]"
                >
                  {/* Effet de brillance animé */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {language === 'fr' ? 'Envoi en cours...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        {language === 'fr' ? 'Envoyer le message' : 'Send message'}
                        <RocketLaunchIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
