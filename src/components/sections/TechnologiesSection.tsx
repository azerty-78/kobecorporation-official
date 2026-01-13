import { useLanguage } from '../../contexts/LanguageContext'
import { technologies } from '../../data/siteContent'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

function TechnologiesSection() {
  const { language } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  const allTechnologies = [
    ...technologies.frontend,
    ...technologies.backend,
    ...technologies.mobile,
    ...technologies.database,
  ]

  // Grouper par catégorie pour l'affichage
  const techCategories = [
    {
      title: language === 'fr' ? 'Frontend' : 'Frontend',
      technologies: technologies.frontend,
      color: 'from-blue-500/10 to-blue-600/10',
    },
    {
      title: language === 'fr' ? 'Backend' : 'Backend',
      technologies: technologies.backend,
      color: 'from-green-500/10 to-green-600/10',
    },
    {
      title: language === 'fr' ? 'Mobile' : 'Mobile',
      technologies: technologies.mobile,
      color: 'from-purple-500/10 to-purple-600/10',
    },
    {
      title: language === 'fr' ? 'Bases de données' : 'Databases',
      technologies: technologies.database,
      color: 'from-orange-500/10 to-orange-600/10',
    },
  ]

  return (
    <section
      ref={elementRef}
      id="technologies"
      className="space-y-10 md:space-y-12"
    >
      <div
        className={`text-center transition-all duration-1000 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
          {language === 'fr' ? 'Technologies' : 'Technologies'}
        </p>
        <h2 className="font-display text-3xl text-ink md:text-4xl">
          {language === 'fr'
            ? 'Notre Stack Technologique'
            : 'Our Technology Stack'}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          {language === 'fr'
            ? 'Les technologies modernes que nous maîtrisons pour créer vos solutions'
            : 'Modern technologies we master to create your solutions'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {techCategories.map((category, categoryIndex) => (
          <div
            key={category.title}
            className={`glass-panel group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: `${categoryIndex * 100}ms`,
            }}
          >
            {/* Gradient de fond */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />

            <div className="relative">
              <h3 className="mb-4 text-lg font-semibold text-ink">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech, techIndex) => (
                  <span
                    key={tech}
                    className={`rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 transition-all duration-300 hover:scale-110 hover:bg-brand-100 hover:shadow-md ${
                      isVisible
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0'
                    }`}
                    style={{
                      transitionDelay: `${(categoryIndex * 100) + (techIndex * 50)}ms`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grille de toutes les technologies */}
      <div
        className={`mt-8 transition-all duration-1000 delay-300 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="glass-panel rounded-3xl p-8">
          <h3 className="mb-6 text-center text-xl font-semibold text-ink">
            {language === 'fr'
              ? 'Toutes nos technologies'
              : 'All our technologies'}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {allTechnologies.map((tech, index) => (
              <span
                key={tech}
                className={`rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-600 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:bg-brand-100 hover:shadow-md active:scale-95 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 30}ms`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechnologiesSection
