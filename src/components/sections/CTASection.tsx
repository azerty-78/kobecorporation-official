import { NavLink } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

function CTASection() {
  const { t } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={elementRef}>
      <Card
        elevation="md"
        className={`group relative mx-auto max-w-3xl p-10 text-center md:p-16 ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Badge décoratif avec orange accent */}
        <div className="mb-6">
          <Badge variant="accent">
            {t('home.cta.title')}
          </Badge>
        </div>
        
        <h2 className="mb-6 font-display text-3xl text-ink transition-colors duration-300 group-hover:text-brand-500 md:text-4xl">
          {t('home.cta.title')}
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-neutral-700">
          {t('home.cta.text')}
        </p>
        
        <Button
          to="/contact"
          variant="primary"
          size="lg"
          icon={<ArrowRightIcon className="h-5 w-5" />}
          iconPosition="right"
        >
          {t('home.cta.button')}
        </Button>
      </Card>
    </section>
  )
}

export default CTASection
