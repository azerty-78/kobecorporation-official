import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { NavLink } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import SEO from '../components/SEO'
import { getSEOData } from '../data/seoData'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

// Types de projets (à remplir avec de vrais projets plus tard)
const projectCategories = [
  { id: 'all', label: 'Tous', labelEn: 'All' },
  { id: 'web', label: 'Applications Web', labelEn: 'Web Applications' },
  { id: 'mobile', label: 'Applications Mobiles', labelEn: 'Mobile Applications' },
  { id: 'enterprise', label: 'Solutions Entreprise', labelEn: 'Enterprise Solutions' },
  { id: 'open-source', label: 'Projets Open Source', labelEn: 'Open Source Projects' },
]

// Placeholder pour les projets (à remplir avec de vrais projets)
const projects = [
  {
    id: 1,
    name: 'Projet à venir',
    nameEn: 'Project coming soon',
    category: 'web',
    description: 'Les projets seront ajoutés prochainement.',
    descriptionEn: 'Projects will be added soon.',
    technologies: ['React', 'Node.js'],
    image: null,
  },
]

function Portfolio() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const seo = getSEOData('/portfolio', language)

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      {/* Hero Section améliorée avec animations */}
      <div className="group relative mb-16 overflow-hidden rounded-3xl bg-white p-12 text-center shadow-xl md:p-16">
        {/* Fond blanc pur */}
        <div className="absolute inset-0 bg-white" />
        
        {/* Particules animées */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 h-2 w-2 rounded-full bg-brand-400 animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute top-20 right-20 h-1.5 w-1.5 rounded-full bg-brand-300 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-20 h-2.5 w-2.5 rounded-full bg-brand-500 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-10 right-10 h-1 w-1 rounded-full bg-brand-400 animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="relative space-y-4">
          <div className="group/badge relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-600 shadow-md transition-all duration-300 hover:border-brand-300 hover:shadow-lg hover:-translate-y-0.5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-50/50 to-transparent translate-x-[-100%] group-hover/badge:translate-x-[100%] transition-transform duration-1000" />
            <div className="absolute inset-0 bg-brand-50/50 opacity-0 transition-opacity duration-300 group-hover/badge:opacity-100" />
            <span className="relative z-10 uppercase tracking-[0.2em] transition-colors duration-300 group-hover/badge:text-brand-700">{language === 'fr' ? 'Portfolio' : 'Portfolio'}</span>
          </div>
          
          <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl lg:text-6xl">
            {language === 'fr' ? 'Nos Réalisations' : 'Our Achievements'}
          </h1>
          
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-neutral-600">
            {language === 'fr'
              ? 'Découvrez les projets sur lesquels nous avons travaillé'
              : 'Discover the projects we have worked on'}
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {projectCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-0 focus:border-0 ${
              selectedCategory === category.id
                ? 'bg-neutral-800 text-white shadow-subtle'
                : 'border border-neutral-200 bg-white text-neutral-700 hover:border-brand-300 hover:text-brand-600'
            }`}
            aria-label={language === 'fr' ? `Filtrer par ${category.label}` : `Filter by ${category.labelEn}`}
          >
            {language === 'fr' ? category.label : category.labelEn}
          </button>
        ))}
      </div>

      {/* Projets */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              elevation="md"
              className="group"
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-brand-500/20 to-brand-600/20">
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-neutral-500">
                    {language === 'fr' ? 'Image à venir' : 'Image coming soon'}
                  </p>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <h3 className="mb-2 font-display text-xl text-ink">
                  {language === 'fr' ? project.name : project.nameEn}
                </h3>
                <p className="mb-4 text-sm text-neutral-600">
                  {language === 'fr'
                    ? project.description
                    : project.descriptionEn}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-brand-50 px-2 py-1 text-xs font-medium text-brand-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2">
                  {language === 'fr' ? 'Voir le projet' : 'View project'}
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <Card elevation="md" className="mx-auto max-w-md p-12">
            <p className="text-neutral-600">
              {language === 'fr'
                ? 'Aucun projet dans cette catégorie pour le moment.'
                : 'No projects in this category at the moment.'}
            </p>
          </Card>
        </div>
      )}

      {/* CTA */}
      <div className="mt-24 text-center">
        <Card elevation="lg" className="mx-auto max-w-3xl p-8 md:p-12">
          <h2 className="mb-4 font-display text-3xl text-ink">
            {language === 'fr'
              ? 'Votre Projet Est le Prochain ?'
              : 'Is Your Project Next?'}
          </h2>
          <p className="mb-8 text-neutral-600">
            {language === 'fr'
              ? 'Discutons de votre idée et transformons-la en réalité.'
              : 'Let\'s discuss your idea and turn it into reality.'}
          </p>
          <Button
            to="/contact"
            variant="primary"
            size="md"
            icon={<ArrowRightIcon className="h-4 w-4" />}
            iconPosition="right"
          >
            {language === 'fr' ? 'Discutons de votre idée' : 'Let\'s discuss your idea'}
          </Button>
        </Card>
      </div>
    </div>
    </>
  )
}

export default Portfolio
