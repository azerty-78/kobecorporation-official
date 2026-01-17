import { NavLink } from 'react-router-dom'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { companyInfo } from '../../data/siteContent'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

function HeroHome() {
  const { language, t } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section
      ref={elementRef}
      id="hero"
      className="relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-brand-100/40 via-brand-50/30 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-accent-100/30 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center lg:gap-16">
        {/* Left Column - Main Content */}
        <div className="relative z-10 space-y-8">
          {/* Badge with enhanced animation */}
          <div
            className={`transform transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-6 opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <Badge variant="accent" icon={<SparklesIcon className="h-4 w-4 animate-pulse" />}>
              {companyInfo.slogan}
            </Badge>
          </div>

          {/* Main Title with gradient effect */}
          <h1
            className={`font-display text-4xl leading-[1.1] text-ink transition-all duration-1000 ease-out md:text-5xl lg:text-6xl ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="block bg-gradient-to-r from-ink via-ink to-brand-600 bg-clip-text text-transparent">
              {t('home.hero.title')}
            </span>
          </h1>

          {/* Subtitle with refined typography */}
          <p
            className={`max-w-2xl text-lg leading-relaxed text-neutral-600 transition-all duration-1000 ease-out md:text-xl ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '350ms' }}
          >
            {t('home.hero.subtitle')}
          </p>

          {/* Description */}
          <p
            className={`max-w-2xl text-base leading-relaxed text-neutral-600 transition-all duration-1000 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            {t('home.hero.description')}
          </p>

          {/* CTA Buttons with enhanced hover effects */}
          <div
            className={`flex flex-wrap gap-4 pt-2 transition-all duration-1000 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '650ms' }}
          >
            <Button
              to="/services"
              variant="primary"
              size="lg"
              icon={<ArrowRightIcon className="h-5 w-5" />}
              iconPosition="right"
              className="group/btn relative overflow-hidden"
            >
              <span className="relative z-10">{t('home.hero.cta1')}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-500 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
            </Button>
            <Button
              to="/contact"
              variant="secondary"
              size="lg"
              className="group/btn"
            >
              {t('home.hero.cta2')}
            </Button>
          </div>
        </div>

        {/* Right Column - Mission Card with enhanced design */}
        <Card
          elevation="lg"
          className={`group relative overflow-hidden transition-all duration-700 ease-out ${
            isVisible
              ? 'translate-y-0 opacity-100 scale-100 rotate-0'
              : 'translate-y-12 opacity-0 scale-95 -rotate-1'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-transparent to-accent-50/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          {/* Content */}
          <div className="relative z-10 space-y-6">
            {/* Header with animated line */}
            <div className="flex items-center gap-4">
              <div className="relative h-1.5 w-16 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-brand-300">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-600 transition-colors duration-300 group-hover:text-brand-700">
                {language === 'fr' ? 'Notre mission' : 'Our Mission'}
              </p>
            </div>

            {/* Mission text with improved readability */}
            <p className="text-lg leading-relaxed text-neutral-700 transition-colors duration-300 group-hover:text-neutral-800 md:text-xl">
              {language === 'fr'
                ? 'Nous créons des expériences et des opérations qui mettent vos équipes et vos clients au centre. Notre approche holistique combine stratégie, design et technologies pour livrer des résultats mesurables.'
                : 'We create experiences and operations that put your teams and clients at the center. Our holistic approach combines strategy, design and technology to deliver measurable results.'}
            </p>

            {/* Decorative elements */}
            <div className="flex gap-2 pt-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full bg-gradient-to-r from-brand-400 to-brand-500 opacity-30 transition-all duration-500 group-hover:opacity-60"
                  style={{ transitionDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default HeroHome
