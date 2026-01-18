import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '../../contexts/LanguageContext'
import { testimonials } from '../../data/testimonials'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Card } from '../ui/Card'

function TestimonialsSection() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

  // Auto-play carousel
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isVisible])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      ref={elementRef}
      id="testimonials"
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
          {language === 'fr' ? 'Témoignages' : 'Testimonials'}
        </p>
        <h2 className="font-display text-3xl text-ink md:text-4xl">
          {language === 'fr'
            ? 'Ce que disent nos clients'
            : 'What our clients say'}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
          {language === 'fr'
            ? 'Découvrez les expériences de nos clients qui nous font confiance'
            : 'Discover the experiences of our clients who trust us'}
        </p>
      </div>

      <div className="relative">
        <Card
          elevation="lg"
          className={`group relative p-8 md:p-12 ${
            isVisible
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-8 opacity-0 scale-95'
          }`}
        >

          <div className="relative">
            {/* Étoiles de notation avec animation */}
            <div className="mb-8 flex justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="relative"
                  style={{
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <StarIcon
                    className={`h-6 w-6 transition-all duration-500 ${
                      i < currentTestimonial.rating
                        ? 'text-yellow-400 scale-110'
                        : 'text-neutral-300'
                    }`}
                  />
                  {/* Effet de brillance sur les étoiles actives */}
                  {i < currentTestimonial.rating && (
                    <div className="absolute inset-0 animate-ping">
                      <StarIcon className="h-6 w-6 text-yellow-400 opacity-20" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contenu du témoignage */}
            <blockquote
              className="mb-10 text-center text-lg italic text-neutral-700 transition-all duration-700 md:text-xl"
              key={currentIndex}
            >
              <div className="relative">
                {/* Guillemets décoratifs */}
                <div className="absolute -left-4 -top-2 text-6xl font-serif text-brand-200/30 leading-none">
                  "
                </div>
                <p className="relative leading-relaxed">
                  {language === 'fr'
                    ? currentTestimonial.content
                    : currentTestimonial.contentEn}
                </p>
                <div className="absolute -right-4 -bottom-2 text-6xl font-serif text-brand-200/30 leading-none">
                  "
                </div>
              </div>
            </blockquote>

            {/* Auteur */}
            <div className="flex flex-col items-center gap-4">
              <div className="group/avatar relative">
                {/* Cercle externe pulsant */}
                <div className="absolute inset-0 rounded-full bg-brand-400/30 animate-ping" />
                
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 text-white shadow-xl transition-all duration-500 group-hover/avatar:scale-110 group-hover/avatar:rotate-12">
                  <span className="relative z-10 font-display text-2xl font-bold">
                    {currentTestimonial.name.charAt(0)}
                  </span>
                  
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
                </div>
              </div>
              
              <div className="text-center">
                <p className="font-semibold text-ink transition-colors duration-300 group-hover:text-brand-600">
                  {currentTestimonial.name}
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  {language === 'fr'
                    ? currentTestimonial.role
                    : currentTestimonial.roleEn}
                  {' '}
                  {language === 'fr' ? 'chez' : 'at'}{' '}
                  <span className="font-medium text-brand-600">
                    {currentTestimonial.company}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Boutons de navigation améliorés */}
          <button
            onClick={prevTestimonial}
            className="group/btn absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-125 hover:shadow-2xl focus:outline-none focus:ring-0 focus:border-0 active:scale-95"
            aria-label={language === 'fr' ? 'Témoignage précédent' : 'Previous testimonial'}
          >
            <ChevronLeftIcon className="h-6 w-6 text-ink transition-transform duration-300 group-hover/btn:-translate-x-1" />
          </button>
          <button
            onClick={nextTestimonial}
            className="group/btn absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-125 hover:shadow-2xl focus:outline-none focus:ring-0 focus:border-0 active:scale-95"
            aria-label={language === 'fr' ? 'Témoignage suivant' : 'Next testimonial'}
          >
            <ChevronRightIcon className="h-6 w-6 text-ink transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </Card>

        {/* Indicateurs de pagination améliorés */}
        <div className="mt-8 flex justify-center gap-2.5">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`group relative rounded-full transition-all duration-500 hover:scale-125 active:scale-95 focus:outline-none focus:ring-0 focus:border-0 ${
                index === currentIndex
                  ? 'h-3 w-10 bg-gradient-to-r from-brand-500 to-brand-600 shadow-lg'
                  : 'h-2.5 w-2.5 bg-neutral-300 hover:bg-brand-400 hover:w-3 hover:h-3'
              }`}
              aria-label={language === 'fr' ? `Afficher le témoignage ${index + 1}` : `Show testimonial ${index + 1}`}
            >
              {/* Effet de brillance sur l'indicateur actif */}
              {index === currentIndex && (
                <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
