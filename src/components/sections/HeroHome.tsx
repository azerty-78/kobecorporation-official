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
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section
      ref={elementRef}
      className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center lg:gap-16"
    >
      <div
        className={`space-y-6 transition-all duration-1000 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
      >
        <div
          className={`transition-all duration-300 delay-100 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <Badge variant="accent" icon={<SparklesIcon className="h-4 w-4 animate-pulse" />}>
            {companyInfo.slogan}
          </Badge>
        </div>
        <h1
          className={`font-display text-4xl leading-tight text-ink transition-all duration-1000 delay-200 md:text-5xl ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {t('home.hero.title')}
        </h1>
        <p
          className={`max-w-2xl text-lg text-neutral-600 transition-all duration-1000 delay-300 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {t('home.hero.subtitle')}
        </p>
        <p
          className={`max-w-2xl text-neutral-600 transition-all duration-1000 delay-400 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {t('home.hero.description')}
        </p>
        <div
          className={`flex flex-wrap gap-3 transition-all duration-1000 delay-500 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          <Button
            to="/services"
            variant="primary"
            icon={<ArrowRightIcon className="h-4 w-4" />}
            iconPosition="right"
          >
            {t('home.hero.cta1')}
          </Button>
          <Button
            to="/contact"
            variant="secondary"
          >
            {t('home.hero.cta2')}
          </Button>
        </div>
        {/* Statistiques masquées temporairement - entreprise en création */}
        {/* <div
          className={`flex flex-wrap gap-6 pt-4 transition-all duration-1000 delay-600 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {chiffres.map((item, index) => (
            <StatCounter
              key={index}
              item={item}
              isActive={isVisible}
              language={language}
            />
          ))}
        </div> */}
      </div>
      <Card
        elevation="md"
        className={`group relative transition-all duration-300 delay-700 ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        <div className="relative space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-300 group-hover:w-16" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500 transition-colors duration-300 group-hover:text-brand-600">
              {language === 'fr' ? 'Notre mission' : 'Our Mission'}
            </p>
          </div>
          <p className="text-lg leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-neutral-700">
            {language === 'fr'
              ? 'Nous créons des expériences et des opérations qui mettent vos équipes et vos clients au centre. Notre approche holistique combine stratégie, design et technologies pour livrer des résultats mesurables.'
              : 'We create experiences and operations that put your teams and clients at the center. Our holistic approach combines strategy, design and technology to deliver measurable results.'}
          </p>
        </div>
      </Card>
    </section>
  )
}

export default HeroHome
