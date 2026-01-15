import { useLanguage } from '../contexts/LanguageContext'
import { services, process } from '../data/siteContent'
import { NavLink } from 'react-router-dom'
import {
  CodeBracketIcon,
  ServerIcon,
  ChartBarIcon,
  AcademicCapIcon,
  CheckIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// Images professionnelles pour chaque service (2 par service)
const serviceImages = {
  'developpement-logiciel': [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&q=80',
  ],
  'hebergement-infrastructure': [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
  ],
  'consultation-audit': [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
  ],
  'formation-bootcamp': [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80',
  ],
}

function Services() {
  const { language } = useLanguage()
  const { elementRef: introRef, isVisible: introVisible } = useScrollAnimation({ threshold: 0.2 })

  const serviceDetails = [
    {
      id: 'developpement-logiciel',
      icon: <CodeBracketIcon className="h-8 w-8 text-brand-500" />,
      title: language === 'fr' ? 'Développement de Logiciels Sur Mesure' : 'Custom Software Development',
      description: language === 'fr'
        ? 'Nous transformons vos idées en solutions logicielles performantes, évolutives et sécurisées. De la conception à la mise en production, notre équipe d\'experts vous accompagne à chaque étape.'
        : 'We transform your ideas into performant, scalable and secure software solutions. From design to production, our team of experts accompanies you at every step.',
      sections: [
        {
          subtitle: language === 'fr' ? 'Pour les Individus' : 'For Individuals',
          content: language === 'fr'
            ? 'Applications personnelles, sites web portfolio, outils d\'automatisation adaptés à vos besoins individuels. Solutions légères et performantes pour vos projets personnels.'
            : 'Personal applications, portfolio websites, automation tools tailored to your individual needs. Lightweight and performant solutions for your personal projects.',
          icon: <UserGroupIcon className="h-5 w-5 text-brand-500" />,
        },
        {
          subtitle: language === 'fr' ? 'Pour les PME' : 'For SMEs',
          content: language === 'fr'
            ? 'Solutions de gestion d\'entreprise, CRM, systèmes de facturation, applications métier pour optimiser vos opérations. ROI mesurable et amélioration de la productivité.'
            : 'Business management solutions, CRM, billing systems, business applications to optimize your operations. Measurable ROI and productivity improvement.',
          icon: <RocketLaunchIcon className="h-5 w-5 text-brand-500" />,
        },
        {
          subtitle: language === 'fr' ? 'Pour les Grandes Entreprises' : 'For Large Enterprises',
          content: language === 'fr'
            ? 'Architectures complexes, intégrations système, applications d\'entreprise scalables et sécurisées. Support dédié et SLA garantis pour vos opérations critiques.'
            : 'Complex architectures, system integrations, scalable and secure enterprise applications. Dedicated support and guaranteed SLA for your critical operations.',
          icon: <ShieldCheckIcon className="h-5 w-5 text-brand-500" />,
        },
      ],
      guarantees: [
        language === 'fr' ? 'Code review systématique' : 'Systematic code review',
        language === 'fr' ? 'Tests automatisés (90%+ coverage)' : 'Automated tests (90%+ coverage)',
        language === 'fr' ? 'Documentation complète' : 'Complete documentation',
        language === 'fr' ? 'Support post-lancement 6 mois' : '6 months post-launch support',
        language === 'fr' ? 'Formation des équipes' : 'Team training',
        language === 'fr' ? 'Garantie de performance' : 'Performance guarantee',
      ],
    },
    {
      id: 'hebergement-infrastructure',
      icon: <ServerIcon className="h-8 w-8 text-brand-500" />,
      title: language === 'fr' ? 'Hébergement & Infrastructure Cloud' : 'Hosting & Cloud Infrastructure',
      description: language === 'fr'
        ? 'Infrastructure cloud sécurisée et performante pour vos applications. Disponibilité garantie 99.9%, monitoring 24/7 et support technique réactif pour votre tranquillité d\'esprit.'
        : 'Secure and performant cloud infrastructure for your applications. 99.9% guaranteed availability, 24/7 monitoring and reactive technical support for your peace of mind.',
      features: [
        language === 'fr' ? 'Hébergement sécurisé avec SSL/TLS' : 'Secure hosting with SSL/TLS',
        language === 'fr' ? 'Sauvegardes automatiques quotidiennes' : 'Daily automatic backups',
        language === 'fr' ? 'Monitoring 24/7 avec alertes proactives' : '24/7 monitoring with proactive alerts',
        language === 'fr' ? 'Scalabilité automatique selon la charge' : 'Automatic scalability based on load',
        language === 'fr' ? 'Support technique dédié (réponse < 2h)' : 'Dedicated technical support (response < 2h)',
        language === 'fr' ? 'Disponibilité garantie 99.9% (SLA)' : '99.9% uptime guarantee (SLA)',
        language === 'fr' ? 'CDN global pour performances optimales' : 'Global CDN for optimal performance',
        language === 'fr' ? 'Conformité RGPD et sécurité renforcée' : 'GDPR compliance and enhanced security',
      ],
      plans: [
        { 
          name: 'Starter', 
          desc: language === 'fr' ? 'Pour petits projets et startups' : 'For small projects and startups',
          features: ['10GB storage', '100GB bandwidth', 'Email support'],
        },
        { 
          name: 'Business', 
          desc: language === 'fr' ? 'Pour PME en croissance' : 'For growing SMEs',
          features: ['100GB storage', '1TB bandwidth', 'Priority support'],
        },
        { 
          name: 'Enterprise', 
          desc: language === 'fr' ? 'Pour grandes structures' : 'For large organizations',
          features: ['Unlimited storage', 'Unlimited bandwidth', '24/7 dedicated support'],
        },
        { 
          name: 'Custom', 
          desc: language === 'fr' ? 'Solutions personnalisées' : 'Custom solutions',
          features: ['Tailored infrastructure', 'Custom SLA', 'Dedicated team'],
        },
      ],
      guarantees: [
        language === 'fr' ? 'SLA 99.9% garanti' : '99.9% SLA guaranteed',
        language === 'fr' ? 'Support 24/7/365' : '24/7/365 support',
        language === 'fr' ? 'Migration gratuite' : 'Free migration',
        language === 'fr' ? 'Sauvegardes incluses' : 'Backups included',
      ],
    },
    {
      id: 'consultation-audit',
      icon: <ChartBarIcon className="h-8 w-8 text-brand-500" />,
      title: language === 'fr' ? 'Consultation Technique & Audit IT' : 'Technical Consultation & IT Audit',
      description: language === 'fr'
        ? 'Audit complet de votre infrastructure, analyse de vos besoins et recommandations stratégiques pour optimiser vos performances et réduire vos coûts. Expertise reconnue et approche méthodique.'
        : 'Complete audit of your infrastructure, analysis of your needs and strategic recommendations to optimize your performance and reduce costs. Recognized expertise and methodical approach.',
      services: [
        language === 'fr' ? 'Audit complet de votre infrastructure existante' : 'Complete audit of existing infrastructure',
        language === 'fr' ? 'Analyse des besoins et recommandations stratégiques' : 'Needs analysis and strategic recommendations',
        language === 'fr' ? 'Roadmap technologique sur 12-24 mois' : 'Technology roadmap for 12-24 months',
        language === 'fr' ? 'Optimisation de performance et coûts' : 'Performance and cost optimization',
        language === 'fr' ? 'Conseil en architecture logicielle' : 'Software architecture consulting',
        language === 'fr' ? 'Évaluation de sécurité et conformité' : 'Security and compliance assessment',
        language === 'fr' ? 'Analyse de la dette technique' : 'Technical debt analysis',
        language === 'fr' ? 'Recommandations d\'outils et technologies' : 'Tools and technology recommendations',
      ],
      deliverables: [
        language === 'fr' ? 'Rapport d\'audit détaillé (50+ pages)' : 'Detailed audit report (50+ pages)',
        language === 'fr' ? 'Roadmap priorisée avec budget' : 'Prioritized roadmap with budget',
        language === 'fr' ? 'Présentation executive summary' : 'Executive summary presentation',
        language === 'fr' ? 'Plan d\'action immédiat' : 'Immediate action plan',
      ],
      guarantees: [
        language === 'fr' ? 'Audit en 2-3 semaines' : 'Audit in 2-3 weeks',
        language === 'fr' ? 'Expertise certifiée' : 'Certified expertise',
        language === 'fr' ? 'Recommandations actionnables' : 'Actionable recommendations',
        language === 'fr' ? 'Suivi post-audit inclus' : 'Post-audit follow-up included',
      ],
    },
    {
      id: 'formation-bootcamp',
      icon: <AcademicCapIcon className="h-8 w-8 text-brand-500" />,
      title: language === 'fr' ? 'Formation Professionnelle & Bootcamps' : 'Professional Training & Bootcamps',
      description: language === 'fr'
        ? 'Programmes de formation intensifs et certifiants pour développer les compétences techniques de vos équipes. Approche pratique avec projets réels et mentorat personnalisé.'
        : 'Intensive and certifying training programs to develop your teams\' technical skills. Practical approach with real projects and personalized mentoring.',
      programs: [
        language === 'fr' ? 'Développement Web Full-Stack' : 'Full-Stack Web Development',
        language === 'fr' ? 'Développement Mobile (React Native, Flutter)' : 'Mobile Development (React Native, Flutter)',
        language === 'fr' ? 'DevOps & Cloud Computing (AWS, Azure, GCP)' : 'DevOps & Cloud Computing (AWS, Azure, GCP)',
        language === 'fr' ? 'Cybersécurité & Ethical Hacking' : 'Cybersecurity & Ethical Hacking',
        language === 'fr' ? 'Data Science & Intelligence Artificielle' : 'Data Science & Artificial Intelligence',
        language === 'fr' ? 'Gestion de projet Agile & Scrum' : 'Agile & Scrum Project Management',
      ],
      formats: [
        language === 'fr' ? 'Bootcamps intensifs (8-12 semaines)' : 'Intensive bootcamps (8-12 weeks)',
        language === 'fr' ? 'Formations à la carte sur mesure' : 'Custom tailored training',
        language === 'fr' ? 'Formations en entreprise (on-site/remote)' : 'Corporate training (on-site/remote)',
        language === 'fr' ? 'Mentorat individuel et coaching' : 'Individual mentoring and coaching',
        language === 'fr' ? 'Workshops et masterclasses' : 'Workshops and masterclasses',
      ],
      guarantees: [
        language === 'fr' ? 'Certification reconnue' : 'Recognized certification',
        language === 'fr' ? 'Projets réels en portfolio' : 'Real projects in portfolio',
        language === 'fr' ? 'Support post-formation 3 mois' : '3 months post-training support',
        language === 'fr' ? 'Garantie emploi ou remboursement' : 'Job guarantee or refund',
      ],
    },
  ]

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
          <ClockIcon className="h-4 w-4 animate-pulse" />
          <span>{language === 'fr' ? 'Services' : 'Services'}</span>
        </div>
        <h1 className="font-display text-4xl text-ink transition-all duration-1000 delay-200 md:text-5xl lg:text-6xl">
          {language === 'fr' ? 'Nos Services' : 'Our Services'}
        </h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 transition-all duration-1000 delay-300">
          {language === 'fr'
            ? 'Des solutions technologiques complètes et sur mesure pour transformer vos défis en opportunités. Expertise, innovation et accompagnement dédié pour votre réussite.'
            : 'Complete and tailored technology solutions to transform your challenges into opportunities. Expertise, innovation and dedicated support for your success.'}
        </p>
      </div>

      {/* Services Détaillés avec animations */}
      <div className="space-y-32">
        {services.map((service, index) => {
          const detail = serviceDetails[index]
          const images = serviceImages[service.slug as keyof typeof serviceImages] || []
          const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

          return (
            <section key={service.slug} ref={elementRef} className="scroll-mt-20">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                {/* Contenu avec animations */}
                <div className={`space-y-8 transition-all duration-1000 ${
                  isVisible
                    ? 'translate-x-0 opacity-100'
                    : index % 2 === 0 ? '-translate-x-8 opacity-0' : 'translate-x-8 opacity-0'
                } ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-50 to-brand-100 px-4 py-2 text-xs font-semibold text-brand-600 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="transition-transform duration-300 hover:rotate-12">
                      {service.icon}
                    </div>
                    <span>{language === 'fr' ? service.title : service.titleEn}</span>
                  </div>

                  {/* Titre */}
                  <h2 className="font-display text-3xl leading-tight text-ink transition-all duration-1000 delay-100 md:text-4xl lg:text-5xl">
                    {detail.title}
                  </h2>

                  {/* Description */}
                  <p className="text-lg leading-relaxed text-slate-600 transition-all duration-1000 delay-200">
                    {detail.description}
                  </p>

                  {/* Contenu spécifique selon le service */}
                  {service.slug === 'developpement-logiciel' && (
                    <div className="space-y-6 transition-all duration-1000 delay-300">
                      {detail.sections?.map((section, idx) => (
                        <div 
                          key={idx} 
                          className="group glass-panel relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                        >
                          {/* Ligne décorative */}
                          <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500 group-hover:w-full" />
                          
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-100">
                              {section.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="mb-2 font-semibold text-ink transition-colors duration-300 group-hover:text-brand-600">
                                {section.subtitle}
                              </h3>
                              <p className="text-sm leading-relaxed text-slate-600">
                                {section.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Garanties */}
                      <div className="glass-panel rounded-2xl p-6 transition-all duration-1000 delay-400">
                        <div className="mb-4 flex items-center gap-3">
                          <ShieldCheckIcon className="h-6 w-6 text-brand-500" />
                          <h3 className="font-semibold text-ink">
                            {language === 'fr' ? 'Nos Garanties' : 'Our Guarantees'}
                          </h3>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {detail.guarantees?.map((guarantee, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                              <span className="text-sm text-slate-600">{guarantee}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {service.slug === 'hebergement-infrastructure' && (
                    <div className="space-y-6 transition-all duration-1000 delay-300">
                      <div className="glass-panel rounded-2xl p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <ShieldCheckIcon className="h-6 w-6 text-brand-500" />
                          <h3 className="font-semibold text-ink">
                            {language === 'fr' ? 'Caractéristiques Premium' : 'Premium Features'}
                          </h3>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {detail.features?.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                              <span className="text-sm text-slate-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="glass-panel rounded-2xl p-6">
                        <h3 className="mb-4 font-semibold text-ink">
                          {language === 'fr' ? 'Plans d\'hébergement' : 'Hosting Plans'}
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {detail.plans?.map((plan, idx) => (
                            <div
                              key={idx}
                              className="group relative overflow-hidden rounded-xl border-2 border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
                            >
                              {/* Gradient au hover */}
                              <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                              
                              <div className="relative">
                                <p className="mb-1 font-display text-xl font-semibold text-ink">
                                  {plan.name}
                                </p>
                                <p className="mb-3 text-xs text-slate-500">
                                  {plan.desc}
                                </p>
                                {plan.features && (
                                  <ul className="space-y-1">
                                    {plan.features.map((feat, i) => (
                                      <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                                        <div className="h-1 w-1 rounded-full bg-brand-500" />
                                        {feat}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Garanties */}
                      <div className="glass-panel rounded-2xl p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <ShieldCheckIcon className="h-6 w-6 text-brand-500" />
                          <h3 className="font-semibold text-ink">
                            {language === 'fr' ? 'Nos Engagements' : 'Our Commitments'}
                          </h3>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {detail.guarantees?.map((guarantee, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                              <span className="text-sm text-slate-600">{guarantee}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {service.slug === 'consultation-audit' && (
                    <div className="space-y-6 transition-all duration-1000 delay-300">
                      <div className="glass-panel rounded-2xl p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <ChartBarIcon className="h-6 w-6 text-brand-500" />
                          <h3 className="font-semibold text-ink">
                            {language === 'fr' ? 'Services Inclus' : 'Services Included'}
                          </h3>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {detail.services?.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                              <span className="text-sm text-slate-600">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="glass-panel rounded-2xl p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <RocketLaunchIcon className="h-6 w-6 text-brand-500" />
                          <h3 className="font-semibold text-ink">
                            {language === 'fr' ? 'Livrables' : 'Deliverables'}
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {detail.deliverables?.map((deliverable, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                              <span className="text-sm text-slate-600">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Garanties */}
                      <div className="glass-panel rounded-2xl p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <ShieldCheckIcon className="h-6 w-6 text-brand-500" />
                          <h3 className="font-semibold text-ink">
                            {language === 'fr' ? 'Nos Garanties' : 'Our Guarantees'}
                          </h3>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {detail.guarantees?.map((guarantee, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                              <span className="text-sm text-slate-600">{guarantee}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {service.slug === 'formation-bootcamp' && (
                    <div className="space-y-6 transition-all duration-1000 delay-300">
                      <div className="glass-panel rounded-2xl p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <AcademicCapIcon className="h-6 w-6 text-brand-500" />
                          <h3 className="font-semibold text-ink">
                            {language === 'fr' ? 'Programmes de Formation' : 'Training Programs'}
                          </h3>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {detail.programs?.map((program, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                              <span className="text-sm text-slate-600">{program}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="glass-panel rounded-2xl p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <ClockIcon className="h-6 w-6 text-brand-500" />
                          <h3 className="font-semibold text-ink">
                            {language === 'fr' ? 'Formats Disponibles' : 'Available Formats'}
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {detail.formats?.map((format, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                              <span className="text-sm text-slate-600">{format}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Garanties */}
                      <div className="glass-panel rounded-2xl p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <ShieldCheckIcon className="h-6 w-6 text-brand-500" />
                          <h3 className="font-semibold text-ink">
                            {language === 'fr' ? 'Nos Garanties' : 'Our Guarantees'}
                          </h3>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {detail.guarantees?.map((guarantee, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                              <span className="text-sm text-slate-600">{guarantee}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA pour ce service */}
                  <div className="pt-4 transition-all duration-1000 delay-500">
                    <NavLink
                      to="/contact"
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[rgb(31,41,55)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[rgb(15,23,42)] hover:shadow-xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative z-10">
                        {language === 'fr' ? 'Discuter de ce service' : 'Discuss this service'}
                      </span>
                      <ArrowRightIcon className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                    </NavLink>
                  </div>
                </div>

                {/* Images avec animations */}
                <div
                  className={`space-y-6 transition-all duration-1000 ${
                    isVisible
                      ? 'translate-x-0 opacity-100'
                      : index % 2 === 0 ? 'translate-x-8 opacity-0' : '-translate-x-8 opacity-0'
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
                        alt={`${detail.title} - Image ${imgIndex + 1}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Badge sur l'image */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                        <div className="rounded-xl bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg">
                          <p className="text-xs font-semibold text-ink">
                            {language === 'fr' ? 'Solution Professionnelle' : 'Professional Solution'}
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

      {/* Timeline Méthodologie */}
      <section className="mt-32">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-600 shadow-sm mb-4">
            <ClockIcon className="h-4 w-4" />
            <span>{language === 'fr' ? 'Méthodologie' : 'Methodology'}</span>
          </div>
          <h2 className="mb-4 font-display text-3xl text-ink md:text-4xl">
            {language === 'fr' ? 'Notre Méthodologie' : 'Our Methodology'}
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            {language === 'fr'
              ? 'Un processus structuré et éprouvé pour garantir le succès de votre projet à chaque étape'
              : 'A structured and proven process to ensure your project success at every step'}
          </p>
        </div>
        
        {/* Timeline Container */}
        <div className="relative">
          {/* Ligne verticale centrale (desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 md:block">
            {/* Ligne de base */}
            <div className="absolute inset-0 bg-slate-200 opacity-30" />
            
            {/* Ligne animée qui se remplit */}
            <div 
              className="absolute top-0 left-0 w-full transition-all duration-2000"
              style={{
                height: '100%',
                backgroundColor: 'rgb(31, 41, 55)',
                transitionDelay: '300ms',
              }}
            />
            
            {/* Particules animées le long de la ligne */}
            {process.map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[rgb(31,41,55)] shadow-lg animate-pulse"
                style={{
                  top: `${(i / (process.length - 1)) * 100}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>

          {/* Étapes de la timeline */}
          <div className="space-y-12 md:space-y-16">
            {process.map((step, index) => {
              const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })
              const isEven = index % 2 === 0

              return (
                <div
                  key={step.step}
                  ref={elementRef}
                  className={`relative grid gap-8 md:grid-cols-2 md:items-center ${
                    isEven ? '' : 'md:grid-flow-dense'
                  }`}
                >
                  {/* Contenu (gauche pour pair, droite pour impair) */}
                  <div
                    className={`group glass-panel relative overflow-hidden rounded-2xl p-6 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl md:p-8 ${
                      isEven ? 'md:col-start-1' : 'md:col-start-2'
                    } ${
                      isVisible
                        ? 'translate-x-0 opacity-100'
                        : isEven
                        ? '-translate-x-8 opacity-0'
                        : 'translate-x-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {/* Ligne décorative animée */}
                    <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-700 group-hover:w-full" />
                    
                    {/* Gradient au hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-100/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    <div className="relative">
                      <div className="mb-4 flex items-center gap-4">
                        {/* Badge numéro d'étape */}
                        <div className="relative">
                          <div className="absolute inset-0 rounded-2xl bg-brand-400/30 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
                          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgb(31,41,55)] text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[rgb(15,23,42)]">
                            <span className="font-display text-2xl font-bold">{step.step}</span>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-600">
                            {language === 'fr' ? 'Étape' : 'Step'} {step.step}
                          </div>
                          <h3 className="text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-brand-600 md:text-2xl">
                            {language === 'fr' ? step.title : step.titleEn}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                        {language === 'fr' ? step.description : step.descriptionEn}
                      </p>
                    </div>
                  </div>

                  {/* Point de connexion sur la ligne (desktop) */}
                  <div
                    className={`hidden items-center justify-center md:flex ${
                      isEven ? 'md:col-start-2 md:justify-start' : 'md:col-start-1 md:justify-end'
                    }`}
                  >
                    <div className="group/connector relative z-10">
                      {/* Cercle externe pulsant */}
                      <div className="absolute inset-0 rounded-full bg-brand-400/30 animate-ping" />
                      
                      {/* Point central */}
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(31,41,55)] shadow-xl transition-all duration-500 hover:scale-125 hover:rotate-180 hover:bg-[rgb(15,23,42)]">
                        <div className="h-6 w-6 rounded-full bg-white shadow-inner transition-all duration-300 group-hover/connector:scale-110" />
                        
                        {/* Effet de brillance */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover/connector:opacity-100" />
                      </div>
                    </div>
                  </div>

                  {/* Espace vide pour l'alignement */}
                  <div
                    className={`hidden md:block ${
                      isEven ? 'md:col-start-1' : 'md:col-start-2'
                    }`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>

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
              <RocketLaunchIcon className="h-4 w-4 animate-pulse" />
              <span>{language === 'fr' ? 'Prêt à commencer ?' : 'Ready to start?'}</span>
            </div>
            
            <h2 className="mb-6 font-display text-3xl text-ink transition-colors duration-300 group-hover:text-brand-600 md:text-4xl">
              {language === 'fr'
                ? 'Prêt à Démarrer Votre Projet ?'
                : 'Ready to Start Your Project?'}
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-slate-600">
              {language === 'fr'
                ? 'Contactez-nous dès aujourd\'hui pour discuter de vos besoins. Notre équipe d\'experts est prête à vous accompagner dans votre transformation digitale.'
                : 'Contact us today to discuss your needs. Our team of experts is ready to accompany you in your digital transformation.'}
            </p>
            
            <NavLink
              to="/contact"
              className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[rgb(31,41,55)] px-8 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:bg-[rgb(15,23,42)] hover:shadow-2xl"
            >
              {/* Effet de brillance animé */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-1000" />
              
              <span className="relative z-10">
                {language === 'fr' ? 'Commencer maintenant' : 'Get started now'}
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

export default Services
