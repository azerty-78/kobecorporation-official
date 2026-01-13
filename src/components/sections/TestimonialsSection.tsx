import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '../../contexts/LanguageContext'
import { testimonials } from '../../data/testimonials'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

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
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          {language === 'fr'
            ? 'Découvrez les expériences de nos clients qui nous font confiance'
            : 'Discover the experiences of our clients who trust us'}
        </p>
      </div>

      <div className="relative">
        <div
          className={`glass-panel relative overflow-hidden rounded-3xl p-8 md:p-12 transition-all duration-1000 ${
            isVisible
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-8 opacity-0 scale-95'
          }`}
        >
          {/* Gradient animé */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-white to-brand-100/20 animate-gradient-shift" />

          <div className="relative">
            {/* Étoiles de notation */}
            <div className="mb-6 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 transition-all duration-300 ${
                    i < currentTestimonial.rating
                      ? 'text-yellow-400'
                      : 'text-slate-300'
                  }`}
                  style={{
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              ))}
            </div>

            {/* Contenu du témoignage */}
            <blockquote
              className="mb-8 text-center text-lg italic text-slate-700 transition-all duration-500 md:text-xl"
              key={currentIndex}
            >
              <p className="leading-relaxed">
                "{language === 'fr'
                  ? currentTestimonial.content
                  : currentTestimonial.contentEn}"
              </p>
            </blockquote>

            {/* Auteur */}
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-semibold text-xl">
                {currentTestimonial.name.charAt(0)}
              </div>
              <div className="text-center">
                <p className="font-semibold text-ink">
                  {currentTestimonial.name}
                </p>
                <p className="text-sm text-slate-600">
                  {language === 'fr'
                    ? currentTestimonial.role
                    : currentTestimonial.roleEn}
                  {' '}
                  {language === 'fr' ? 'chez' : 'at'}{' '}
                  {currentTestimonial.company}
                </p>
              </div>
            </div>
          </div>

          {/* Boutons de navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            aria-label={language === 'fr' ? 'Témoignage précédent' : 'Previous testimonial'}
          >
            <ChevronLeftIcon className="h-6 w-6 text-ink" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            aria-label={language === 'fr' ? 'Témoignage suivant' : 'Next testimonial'}
          >
            <ChevronRightIcon className="h-6 w-6 text-ink" />
          </button>
        </div>

        {/* Indicateurs de pagination */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 hover:scale-125 active:scale-95 ${
                index === currentIndex
                  ? 'w-8 bg-brand-500 shadow-md'
                  : 'w-2 bg-slate-300 hover:bg-slate-400 hover:w-3'
              }`}
              aria-label={`${language === 'fr' ? 'Témoignage' : 'Testimonial'} ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
