import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { NavLink } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

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

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      {/* Introduction */}
      <div className="mb-16 space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
          {language === 'fr' ? 'Portfolio' : 'Portfolio'}
        </p>
        <h1 className="font-display text-4xl text-ink dark:text-white md:text-5xl">
          {language === 'fr' ? 'Nos Réalisations' : 'Our Achievements'}
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
          {language === 'fr'
            ? 'Découvrez les projets sur lesquels nous avons travaillé'
            : 'Discover the projects we have worked on'}
        </p>
      </div>

      {/* Filtres */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {projectCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedCategory === category.id
                ? 'bg-brand-500 text-white shadow-soft dark:bg-brand-600'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-600 dark:hover:text-brand-400'
            }`}
          >
            {language === 'fr' ? category.label : category.labelEn}
          </button>
        ))}
      </div>

      {/* Projets */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel group overflow-hidden rounded-2xl transition hover:-translate-y-1"
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-brand-500/20 to-brand-600/20 dark:from-brand-500/30 dark:to-brand-600/30">
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {language === 'fr' ? 'Image à venir' : 'Image coming soon'}
                  </p>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <h3 className="mb-2 font-display text-xl text-ink dark:text-white">
                  {language === 'fr' ? project.name : project.nameEn}
                </h3>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  {language === 'fr'
                    ? project.description
                    : project.descriptionEn}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-brand-50 px-2 py-1 text-xs font-medium text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2 dark:text-brand-400">
                  {language === 'fr' ? 'Voir le projet' : 'View project'}
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <div className="glass-panel mx-auto max-w-md rounded-3xl p-12">
            <p className="text-slate-600 dark:text-slate-400">
              {language === 'fr'
                ? 'Aucun projet dans cette catégorie pour le moment.'
                : 'No projects in this category at the moment.'}
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-24 text-center">
        <div className="glass-panel mx-auto max-w-3xl rounded-3xl p-8 md:p-12">
          <h2 className="mb-4 font-display text-3xl text-ink dark:text-white">
            {language === 'fr'
              ? 'Votre Projet Est le Prochain ?'
              : 'Is Your Project Next?'}
          </h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            {language === 'fr'
              ? 'Discutons de votre idée et transformons-la en réalité.'
              : 'Let\'s discuss your idea and turn it into reality.'}
          </p>
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
          >
            {language === 'fr' ? 'Discutons de votre idée' : 'Let\'s discuss your idea'}
            <ArrowRightIcon className="h-4 w-4" />
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
