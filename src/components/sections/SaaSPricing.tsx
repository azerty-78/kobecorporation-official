import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { HandThumbUpIcon as HandThumbUpSolid } from '@heroicons/react/24/solid'
import { useLanguage } from '../../contexts/LanguageContext'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { pricingPlans, type PricingPlan } from '../../data/pricingPlans'
import { Button } from '../ui/Button'

function PricingCard({
  plan,
  t,
  index,
  isVisible,
}: {
  plan: PricingPlan
  t: (path: string) => string
  index: number
  isVisible: boolean
}) {
  const name = t(`pricing.plans.${plan.nameKey}`)
  const description = t(`pricing.plans.${plan.descriptionKey}`)
  const strikethrough = t(`pricing.plans.${plan.strikethroughKey}`)
  const isHighlighted = plan.highlighted
  const visibleFeatures = plan.features.slice(0, 3)

  return (
    <a
      href="https://pricing.kobecorporation.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } transition-all duration-700`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border-2 bg-white ${
          isHighlighted
            ? 'border-success-500/40 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.25)] ring-2 ring-success-500/20'
            : 'border-neutral-200 shadow-card hover:border-brand-300 hover:shadow-card-hover'
        } transition-all duration-700`}
      >
        {/* Badge "Good Deal" sur le plan mis en avant */}
        {isHighlighted && (
          <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-success-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
            <HandThumbUpSolid className="h-4 w-4" />
            <span># {t('pricing.goodDealLabel')}</span>
          </div>
        )}

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {/* En-tête */}
          <h3 className="mb-1 font-display text-xl font-bold text-ink sm:text-2xl">
            # {name}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-neutral-600">
            {description}
          </p>

          {/* Prix barré */}
          <p className="mb-2 text-sm text-neutral-400 line-through">
            {strikethrough} {t('pricing.annualPayment')}
          </p>

          {/* Prix actuel */}
          <div
            className={`mb-5 inline-flex w-fit items-baseline gap-1 rounded-lg px-4 py-2.5 ${
              isHighlighted ? 'bg-success-500 text-white' : 'bg-ink text-white'
            }`}
          >
            <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {plan.price} f
            </span>
            <span className="text-xs font-medium opacity-90 sm:text-sm">
              /{t('pricing.perMonth')}
            </span>
          </div>

          {/* Liste "Ce qui est inclus" (3 avantages clés) */}
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">
            {t('pricing.included')}
          </h4>
          <ul className="space-y-2.5">
            {visibleFeatures.map((feature, i) => {
              const label = t(`pricing.features.${feature.text}`)
              return (
                <li key={i} className="flex items-start gap-2.5">
                  {feature.included ? (
                    <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-success-500" />
                  ) : (
                    <XMarkIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-400" />
                  )}
                  <span
                    className={`text-sm leading-snug text-neutral-600 ${
                      feature.bold ? 'font-semibold text-ink' : ''
                    }`}
                  >
                    {label}
                  </span>
                </li>
              )
            })}
          </ul>

          <p className="mt-4 text-xs font-medium text-brand-600 underline underline-offset-4">
            {t('pricing.redirectCta')}
          </p>
        </div>
      </div>
    </a>
  )
}

export function SaaSPricing() {
  const { t } = useLanguage()
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section
      id="forfait-saas"
      ref={elementRef}
      className="scroll-mt-20 py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="mb-12 text-center">
          <div
            className={`mb-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-600 shadow-sm transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '50ms' }}
          >
            <span>{t('pricing.sectionBadge')}</span>
          </div>
          <h2
            className={`mb-3 font-display text-3xl font-semibold text-ink transition-all duration-700 md:text-4xl ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            {t('pricing.sectionTitle')}
          </h2>
          <p
            className={`mx-auto max-w-2xl text-neutral-600 transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            {t('pricing.sectionSubtitle')}
          </p>

          <div
            className={`mt-4 flex flex-col items-center justify-center gap-3 text-sm text-neutral-600 transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '320ms' }}
          >
            <span className="max-w-xl">
              {t('pricing.redirectText')}
            </span>
            <Button
              href="https://pricing.kobecorporation.com"
              variant="primary"
              size="sm"
            >
              {t('pricing.redirectCta')}
            </Button>
          </div>
        </div>

        {/* Grille des 3 forfaits */}
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              t={t}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
