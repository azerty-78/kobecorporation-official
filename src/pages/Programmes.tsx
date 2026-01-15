import { useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { programmes } from '../data/siteContent'
import {
  CheckIcon,
  ArrowRightIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// Images professionnelles pour chaque programme (2 par programme)
const programmeImages = {
  freelances: [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&q=80',
  ],
  etudiants: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80',
  ],
  'open-source': [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
  ],
  networking: [
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
  ],
}

// Détails enrichis pour chaque programme
const programmeDetails = {
  freelances: {
    benefits: [
      'Facturation simplifiée et automatisée',
      'Gestion complète de la TVA et fiscalité',
      'Contrats pré-rédigés et personnalisables',
      'Support juridique et administratif',
      'Statut professionnel reconnu',
      'Accès à des projets premium',
    ],
    benefitsEn: [
      'Simplified and automated invoicing',
      'Complete VAT and tax management',
      'Pre-written and customizable contracts',
      'Legal and administrative support',
      'Recognized professional status',
      'Access to premium projects',
    ],
    stats: [
      { label: 'Freelances actifs', labelEn: 'Active freelancers', value: '50+' },
      { label: 'Projets livrés', labelEn: 'Projects delivered', value: '200+' },
      { label: 'Satisfaction', labelEn: 'Satisfaction', value: '98%' },
    ],
    guarantees: [
      'Cadre légal 100% conforme',
      'Support administratif dédié',
      'Facturation sous 24h',
      'Protection juridique incluse',
    ],
    guaranteesEn: [
      '100% compliant legal framework',
      'Dedicated administrative support',
      'Invoicing within 24h',
      'Legal protection included',
    ],
  },
  etudiants: {
    benefits: [
      'Projets réels en production',
      'Mentorat personnalisé par expert',
      'Code reviews hebdomadaires',
      'Portfolio professionnel valorisé',
      'Certification de compétences',
      'Opportunités d\'embauche',
    ],
    benefitsEn: [
      'Real projects in production',
      'Personalized mentoring by expert',
      'Weekly code reviews',
      'Valued professional portfolio',
      'Skills certification',
      'Hiring opportunities',
    ],
    stats: [
      { label: 'Stagiaires formés', labelEn: 'Trainees trained', value: '100+' },
      { label: 'Taux d\'embauche', labelEn: 'Hiring rate', value: '75%' },
      { label: 'Projets en prod', labelEn: 'Projects in prod', value: '150+' },
    ],
    guarantees: [
      'Projets réels garantis',
      'Mentor dédié expérimenté',
      'Certification à la fin',
      'Possibilité d\'embauche',
    ],
    guaranteesEn: [
      'Real projects guaranteed',
      'Dedicated experienced mentor',
      'Certification at the end',
      'Hiring possibility',
    ],
  },
  'open-source': {
    benefits: [
      'Visibilité internationale',
      'Contributions valorisées',
      'Apprentissage collaboratif',
      'Networking avec experts',
      'Portfolio technique solide',
      'Reconnaissance communautaire',
    ],
    benefitsEn: [
      'International visibility',
      'Valued contributions',
      'Collaborative learning',
      'Networking with experts',
      'Strong technical portfolio',
      'Community recognition',
    ],
    stats: [
      { label: 'Contributeurs', labelEn: 'Contributors', value: '200+' },
      { label: 'Projets actifs', labelEn: 'Active projects', value: '30+' },
      { label: 'Stars GitHub', labelEn: 'GitHub stars', value: '5K+' },
    ],
    guarantees: [
      'Projets professionnels uniquement',
      'Code review par experts',
      'Reconnaissance publique',
      'Mentorat communautaire',
    ],
    guaranteesEn: [
      'Professional projects only',
      'Code review by experts',
      'Public recognition',
      'Community mentoring',
    ],
  },
  networking: {
    benefits: [
      'Accès réseau clients premium',
      'Projets innovants exclusifs',
      'Événements tech privés',
      'Workshops avec experts',
      'Meetups développeurs',
      'Conférences techniques',
    ],
    benefitsEn: [
      'Access to premium client network',
      'Exclusive innovative projects',
      'Private tech events',
      'Workshops with experts',
      'Developer meetups',
      'Technical conferences',
    ],
    stats: [
      { label: 'Membres actifs', labelEn: 'Active members', value: '300+' },
      { label: 'Événements/an', labelEn: 'Events/year', value: '50+' },
      { label: 'Clients partenaires', labelEn: 'Partner clients', value: '100+' },
    ],
    guarantees: [
      'Accès réseau exclusif',
      'Événements premium',
      'Networking facilité',
      'Opportunités régulières',
    ],
    guaranteesEn: [
      'Exclusive network access',
      'Premium events',
      'Facilitated networking',
      'Regular opportunities',
    ],
  },
}

function Programmes() {
  const { language } = useLanguage()
  const { elementRef: introRef, isVisible: introVisible } = useScrollAnimation({ threshold: 0.2 })

  useEffect(() => {
    // Scroll vers l'ancre si présente dans l'URL
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      {/* Introduction avec animations */}
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
          <span>{language === 'fr' ? 'Nos Programmes' : 'Our Programs'}</span>
        </div>
        <h1 className="font-display text-4xl text-ink transition-all duration-1000 delay-200 md:text-5xl lg:text-6xl">
          {language === 'fr'
            ? 'Nos Programmes de Développement'
            : 'Our Development Programs'}
        </h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 transition-all duration-1000 delay-300">
          {language === 'fr'
            ? 'Rejoignez une communauté dynamique de développeurs passionnés. Que vous soyez freelance, étudiant ou développeur open source, découvrez des opportunités qui transforment votre carrière.'
            : 'Join a dynamic community of passionate developers. Whether you\'re a freelancer, student or open source developer, discover opportunities that transform your career.'}
        </p>
      </div>

      {/* Programmes avec animations */}
      <div className="space-y-32">
        {programmes.map((programme, index) => {
          const images = programmeImages[programme.id as keyof typeof programmeImages] || []
          const details = programmeDetails[programme.id as keyof typeof programmeDetails]
          const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

          return (
            <section
              key={programme.id}
              id={programme.id}
              ref={elementRef}
              className="scroll-mt-20"
            >
              <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                {/* Contenu avec animations */}
                <div
                  className={`space-y-8 transition-all duration-1000 ${
                    isVisible
                      ? 'translate-x-0 opacity-100'
                      : index % 2 === 0
                      ? '-translate-x-8 opacity-0'
                      : 'translate-x-8 opacity-0'
                  } ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-50 to-brand-100 px-4 py-2 text-xs font-semibold text-brand-600 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="transition-transform duration-300 hover:rotate-12">
                      {programme.icon}
                    </div>
                    <span>
                      {language === 'fr' ? programme.title : programme.titleEn}
                    </span>
                  </div>

                  {/* Titre */}
                  <h2 className="font-display text-3xl leading-tight text-ink transition-all duration-1000 delay-100 md:text-4xl lg:text-5xl">
                    {language === 'fr' ? programme.title : programme.titleEn}
                  </h2>

                  {/* Slogan */}
                  <p className="text-xl font-semibold text-brand-600 transition-all duration-1000 delay-200">
                    {language === 'fr' ? programme.slogan : programme.sloganEn}
                  </p>

                  {/* Description */}
                  <p className="text-lg leading-relaxed text-slate-600 transition-all duration-1000 delay-300">
                    {language === 'fr'
                      ? programme.description
                      : programme.descriptionEn}
                  </p>

                  {/* Statistiques */}
                  {details?.stats && (
                    <div className="grid grid-cols-3 gap-4 transition-all duration-1000 delay-400">
                      {details.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="group glass-panel rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                          <div className="mb-1 font-display text-2xl font-bold text-brand-600 transition-colors duration-300 group-hover:text-brand-700">
                            {stat.value}
                          </div>
                          <div className="text-xs text-slate-600">
                            {language === 'fr' ? stat.label : stat.labelEn}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Features */}
                  <div className="glass-panel rounded-2xl p-6 transition-all duration-1000 delay-500">
                    <div className="mb-4 flex items-center gap-3">
                      <StarIcon className="h-6 w-6 text-brand-500" />
                      <h3 className="font-semibold text-ink">
                        {language === 'fr' ? 'Avantages' : 'Benefits'}
                      </h3>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(language === 'fr'
                        ? details?.benefits
                        : details?.benefitsEn
                      )?.map((benefit, idx) => (
                        <div
                          key={idx}
                          className="group flex items-start gap-3 transition-all duration-300 hover:translate-x-1"
                        >
                          <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500 transition-transform duration-300 group-hover:scale-110" />
                          <span className="text-sm leading-relaxed text-slate-700">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Garanties */}
                  {details?.guarantees && (
                    <div className="glass-panel rounded-2xl p-6 transition-all duration-1000 delay-600">
                      <div className="mb-4 flex items-center gap-3">
                        <ShieldCheckIcon className="h-6 w-6 text-brand-500" />
                        <h3 className="font-semibold text-ink">
                          {language === 'fr' ? 'Nos Garanties' : 'Our Guarantees'}
                        </h3>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {(language === 'fr'
                          ? details.guarantees
                          : details.guaranteesEn
                        )?.map((guarantee, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2"
                          >
                            <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                            <span className="text-sm text-slate-600">
                              {guarantee}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA spécifique selon le programme */}
                  <div className="pt-4 transition-all duration-1000 delay-700">
                    {programme.id === 'freelances' && (
                      <NavLink
                        to="/contact"
                        className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-brand-500 px-8 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative z-10">
                          {language === 'fr'
                            ? 'Rejoindre le programme Freelance'
                            : 'Join the Freelance Program'}
                        </span>
                        <ArrowRightIcon className="relative z-10 h-5 w-5 transition-all duration-300 group-hover/cta:translate-x-2 group-hover/cta:scale-110" />
                      </NavLink>
                    )}
                    {programme.id === 'etudiants' && (
                      <NavLink
                        to="/contact"
                        className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-brand-500 px-8 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative z-10">
                          {language === 'fr'
                            ? 'Postuler pour un stage'
                            : 'Apply for an internship'}
                        </span>
                        <ArrowRightIcon className="relative z-10 h-5 w-5 transition-all duration-300 group-hover/cta:translate-x-2 group-hover/cta:scale-110" />
                      </NavLink>
                    )}
                    {programme.id === 'open-source' && (
                      <a
                        href="https://github.com/kobecorporation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-brand-500 px-8 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative z-10">
                          {language === 'fr'
                            ? 'Voir nos projets GitHub'
                            : 'View our GitHub projects'}
                        </span>
                        <ArrowRightIcon className="relative z-10 h-5 w-5 transition-all duration-300 group-hover/cta:translate-x-2 group-hover/cta:scale-110" />
                      </a>
                    )}
                    {programme.id === 'networking' && (
                      <NavLink
                        to="/contact"
                        className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-brand-500 px-8 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative z-10">
                          {language === 'fr'
                            ? 'Rejoindre la communauté'
                            : 'Join the community'}
                        </span>
                        <ArrowRightIcon className="relative z-10 h-5 w-5 transition-all duration-300 group-hover/cta:translate-x-2 group-hover/cta:scale-110" />
                      </NavLink>
                    )}
                  </div>
                </div>

                {/* Images avec animations */}
                <div
                  className={`space-y-6 transition-all duration-1000 ${
                    isVisible
                      ? 'translate-x-0 opacity-100'
                      : index % 2 === 0
                      ? 'translate-x-8 opacity-0'
                      : '-translate-x-8 opacity-0'
                  } ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                  style={{ transitionDelay: '200ms' }}
                >
                  {images.map((imageUrl, imgIndex) => (
                    <div
                      key={imgIndex}
                      className={`group relative overflow-hidden rounded-3xl transition-all duration-700 hover:shadow-2xl ${
                        imgIndex === 0 ? 'lg:h-80' : 'lg:h-72'
                      }`}
                      style={{ transitionDelay: `${300 + imgIndex * 100}ms` }}
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10" />

                      {/* Image */}
                      <img
                        src={imageUrl}
                        alt={`${language === 'fr' ? programme.title : programme.titleEn} - Image ${imgIndex + 1}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Badge sur l'image */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                        <div className="rounded-xl bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg">
                          <p className="text-xs font-semibold text-ink">
                            {language === 'fr' ? 'Programme Premium' : 'Premium Program'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* CTA Final amélioré */}
      <div className="mt-32">
        <div className="group glass-panel relative mx-auto max-w-4xl overflow-hidden rounded-3xl p-10 shadow-xl transition-all duration-700 hover:shadow-2xl md:p-16">
          {/* Gradient animé */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-white to-brand-100/30 animate-gradient-shift" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-200/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          {/* Particules décoratives */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 h-2 w-2 rounded-full bg-brand-400 animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="absolute top-20 right-20 h-1.5 w-1.5 rounded-full bg-brand-300 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-20 left-20 h-2.5 w-2.5 rounded-full bg-brand-500 animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="relative text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-600 shadow-sm">
              <UserGroupIcon className="h-4 w-4 animate-pulse" />
              <span>{language === 'fr' ? 'Rejoignez-nous' : 'Join us'}</span>
            </div>

            <h2 className="mb-6 font-display text-3xl text-ink transition-colors duration-300 group-hover:text-brand-600 md:text-4xl">
              {language === 'fr'
                ? 'Prêt à Rejoindre Notre Communauté ?'
                : 'Ready to Join Our Community?'}
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-slate-600">
              {language === 'fr'
                ? 'Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous accompagner dans votre développement professionnel. Rejoignez une communauté dynamique de développeurs passionnés.'
                : 'Contact us to discuss your project and discover how we can support you in your professional development. Join a dynamic community of passionate developers.'}
            </p>

            <NavLink
              to="/contact"
              className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 via-brand-600 to-brand-500 px-8 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
            >
              {/* Effet de brillance animé */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-1000" />

              <span className="relative z-10">
                {language === 'fr' ? 'Nous contacter' : 'Contact us'}
              </span>

              <div className="relative z-10 flex items-center">
                <div className="h-0.5 w-0 bg-white transition-all duration-300 group-hover/cta:w-6" />
                <ArrowRightIcon className="h-5 w-5 transition-all duration-300 group-hover/cta:translate-x-2 group-hover/cta:scale-110" />
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Programmes
