import { useLanguage } from '../contexts/LanguageContext'
import { services, technologies, process } from '../data/siteContent'
import { NavLink } from 'react-router-dom'
import {
  CodeBracketIcon,
  ServerIcon,
  ChartBarIcon,
  AcademicCapIcon,
  CheckIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

function Services() {
  const { language } = useLanguage()

  const serviceDetails = [
    {
      id: 'developpement-logiciel',
      icon: <CodeBracketIcon className="h-8 w-8 text-brand-500" />,
      title: language === 'fr' ? 'Développement de Logiciels Sur Mesure' : 'Custom Software Development',
      sections: [
        {
          subtitle: language === 'fr' ? 'Pour les Individus' : 'For Individuals',
          content: language === 'fr'
            ? 'Applications personnelles, sites web portfolio, outils d\'automatisation adaptés à vos besoins individuels'
            : 'Personal applications, portfolio websites, automation tools tailored to your individual needs',
        },
        {
          subtitle: language === 'fr' ? 'Pour les PME' : 'For SMEs',
          content: language === 'fr'
            ? 'Solutions de gestion d\'entreprise, CRM, systèmes de facturation, applications métier pour optimiser vos opérations'
            : 'Business management solutions, CRM, billing systems, business applications to optimize your operations',
        },
        {
          subtitle: language === 'fr' ? 'Pour les Grandes Entreprises' : 'For Large Enterprises',
          content: language === 'fr'
            ? 'Architectures complexes, intégrations système, applications d\'entreprise scalables et sécurisées'
            : 'Complex architectures, system integrations, scalable and secure enterprise applications',
        },
      ],
    },
    {
      id: 'hebergement-infrastructure',
      icon: <ServerIcon className="h-8 w-8 text-brand-500" />,
      title: language === 'fr' ? 'Hébergement & Infrastructure Cloud' : 'Hosting & Cloud Infrastructure',
      features: [
        language === 'fr' ? 'Hébergement sécurisé avec SSL' : 'Secure hosting with SSL',
        language === 'fr' ? 'Sauvegardes automatiques quotidiennes' : 'Daily automatic backups',
        language === 'fr' ? 'Monitoring 24/7 avec alertes' : '24/7 monitoring with alerts',
        language === 'fr' ? 'Scalabilité selon vos besoins' : 'Scalability according to your needs',
        language === 'fr' ? 'Support technique dédié' : 'Dedicated technical support',
        language === 'fr' ? 'Disponibilité garantie 99.9%' : '99.9% uptime guarantee',
      ],
      plans: [
        { name: 'Starter', desc: language === 'fr' ? 'Pour petits projets' : 'For small projects' },
        { name: 'Business', desc: language === 'fr' ? 'Pour PME' : 'For SMEs' },
        { name: 'Enterprise', desc: language === 'fr' ? 'Pour grandes structures' : 'For large organizations' },
        { name: 'Custom', desc: language === 'fr' ? 'Solutions personnalisées' : 'Custom solutions' },
      ],
    },
    {
      id: 'consultation-audit',
      icon: <ChartBarIcon className="h-8 w-8 text-brand-500" />,
      title: language === 'fr' ? 'Consultation Technique & Audit IT' : 'Technical Consultation & IT Audit',
      services: [
        language === 'fr' ? 'Audit de votre infrastructure existante' : 'Audit of existing infrastructure',
        language === 'fr' ? 'Analyse des besoins et recommandations' : 'Needs analysis and recommendations',
        language === 'fr' ? 'Roadmap technologique' : 'Technology roadmap',
        language === 'fr' ? 'Optimisation de performance' : 'Performance optimization',
        language === 'fr' ? 'Conseil en architecture logicielle' : 'Software architecture consulting',
        language === 'fr' ? 'Évaluation de sécurité' : 'Security assessment',
      ],
    },
    {
      id: 'formation-bootcamp',
      icon: <AcademicCapIcon className="h-8 w-8 text-brand-500" />,
      title: language === 'fr' ? 'Formation Professionnelle & Bootcamps' : 'Professional Training & Bootcamps',
      programs: [
        language === 'fr' ? 'Développement Web Full-Stack' : 'Full-Stack Web Development',
        language === 'fr' ? 'Développement Mobile' : 'Mobile Development',
        language === 'fr' ? 'DevOps & Cloud Computing' : 'DevOps & Cloud Computing',
        language === 'fr' ? 'Cybersécurité' : 'Cybersecurity',
        language === 'fr' ? 'Data Science & IA' : 'Data Science & AI',
        language === 'fr' ? 'Gestion de projet Agile' : 'Agile Project Management',
      ],
      formats: [
        language === 'fr' ? 'Bootcamps intensifs (8-12 semaines)' : 'Intensive bootcamps (8-12 weeks)',
        language === 'fr' ? 'Formations à la carte' : 'Custom training',
        language === 'fr' ? 'Formations en entreprise' : 'Corporate training',
        language === 'fr' ? 'Mentorat individuel' : 'Individual mentoring',
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      {/* Introduction */}
      <div className="mb-16 space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
          {language === 'fr' ? 'Services' : 'Services'}
        </p>
        <h1 className="font-display text-4xl text-ink md:text-5xl">
          {language === 'fr' ? 'Nos Services' : 'Our Services'}
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-600">
          {language === 'fr'
            ? 'Des solutions technologiques complètes pour votre réussite'
            : 'Complete technology solutions for your success'}
        </p>
      </div>

      {/* Services Détaillés */}
      <div className="space-y-24">
        {services.map((service, index) => {
          const detail = serviceDetails[index]
          return (
            <section key={service.slug} className="scroll-mt-20">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
                    {service.icon}
                    <span>{language === 'fr' ? service.title : service.titleEn}</span>
                  </div>
                  <h2 className="font-display text-3xl text-ink md:text-4xl">
                    {detail.title}
                  </h2>
                  <p className="text-slate-600">
                    {language === 'fr' ? service.desc : service.descEn}
                  </p>

                  {/* Contenu spécifique selon le service */}
                  {service.slug === 'developpement-logiciel' && (
                    <div className="space-y-6">
                      {detail.sections?.map((section, idx) => (
                        <div key={idx} className="glass-panel rounded-2xl p-6">
                          <h3 className="mb-2 font-semibold text-ink">
                            {section.subtitle}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {section.content}
                          </p>
                        </div>
                      ))}
                      <div className="glass-panel rounded-2xl p-6">
                        <h3 className="mb-4 font-semibold text-ink">
                          {language === 'fr' ? 'Technologies utilisées' : 'Technologies used'}
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="mb-2 text-xs font-semibold text-slate-500">
                              Frontend:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {technologies.frontend.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="mb-2 text-xs font-semibold text-slate-500">
                              Backend:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {technologies.backend.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="mb-2 text-xs font-semibold text-slate-500">
                              Mobile:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {technologies.mobile.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="mb-2 text-xs font-semibold text-slate-500">
                              Bases de données:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {technologies.database.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {service.slug === 'hebergement-infrastructure' && (
                    <div className="space-y-6">
                      <div className="glass-panel rounded-2xl p-6">
                        <h3 className="mb-4 font-semibold text-ink">
                          {language === 'fr' ? 'Caractéristiques' : 'Features'}
                        </h3>
                        <div className="space-y-2">
                          {detail.features?.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                              <span className="text-sm text-slate-600">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="glass-panel rounded-2xl p-6">
                        <h3 className="mb-4 font-semibold text-ink">
                          {language === 'fr' ? 'Plans d\'hébergement' : 'Hosting Plans'}
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {detail.plans?.map((plan, idx) => (
                            <div
                              key={idx}
                              className="rounded-lg border border-slate-200 bg-white p-4"
                            >
                              <p className="font-semibold text-ink">
                                {plan.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {plan.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {service.slug === 'consultation-audit' && (
                    <div className="glass-panel rounded-2xl p-6">
                      <h3 className="mb-4 font-semibold text-ink">
                        {language === 'fr' ? 'Services inclus' : 'Services included'}
                      </h3>
                      <div className="space-y-2">
                        {detail.services?.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                            <span className="text-sm text-slate-600">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.slug === 'formation-bootcamp' && (
                    <div className="space-y-6">
                      <div className="glass-panel rounded-2xl p-6">
                        <h3 className="mb-4 font-semibold text-ink">
                          {language === 'fr' ? 'Programmes de formation' : 'Training Programs'}
                        </h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {detail.programs?.map((program, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                              <span className="text-sm text-slate-600">
                                {program}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="glass-panel rounded-2xl p-6">
                        <h3 className="mb-4 font-semibold text-ink">
                          {language === 'fr' ? 'Format' : 'Format'}
                        </h3>
                        <div className="space-y-2">
                          {detail.formats?.map((format, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                              <span className="text-sm text-slate-600">
                                {format}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Illustration */}
                <div
                  className={`glass-panel relative overflow-hidden rounded-3xl p-8 ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-white to-brand-100/40" />
                  <div className="relative flex h-64 items-center justify-center md:h-80">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-500 text-white">
                        {service.icon}
                      </div>
                      <p className="text-sm text-slate-500">
                        {language === 'fr' ? 'Image à venir' : 'Image coming soon'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* Processus de Travail */}
      <section className="mt-24">
        <div className="text-center">
          <h2 className="mb-4 font-display text-3xl text-ink">
            {language === 'fr' ? 'Notre Méthodologie' : 'Our Methodology'}
          </h2>
          <p className="mb-12 text-slate-600">
            {language === 'fr'
              ? 'Un processus structuré pour garantir le succès de votre projet'
              : 'A structured process to ensure your project success'}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {process.map((step) => (
            <div key={step.step} className="glass-panel rounded-2xl p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white">
                <span className="font-display text-xl">{step.step}</span>
              </div>
              <h3 className="mb-2 font-semibold text-ink">
                {language === 'fr' ? step.title : step.titleEn}
              </h3>
              <p className="text-sm text-slate-600">
                {language === 'fr' ? step.description : step.descriptionEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-24 text-center">
        <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-8 md:p-12">
          <h2 className="mb-4 font-display text-3xl text-ink">
            {language === 'fr'
              ? 'Prêt à Démarrer Votre Projet ?'
              : 'Ready to Start Your Project?'}
          </h2>
          <p className="mb-8 text-slate-600">
            {language === 'fr'
              ? 'Contactez-nous dès aujourd\'hui pour discuter de vos besoins'
              : 'Contact us today to discuss your needs'}
          </p>
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600"
          >
            {language === 'fr' ? 'Commencer maintenant' : 'Get started now'}
            <ArrowRightIcon className="h-4 w-4" />
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Services
