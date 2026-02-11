import { CheckIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { pricingPlans, type PricingPlan } from '../../data/pricingPlans'
import { Button } from '../ui/Button'

const FEATURE_LIMIT = 3
const PRICING_PAGE_URL = 'https://pricing.kobecorporation.com'

function getCardEntryAnimation(index: number, isVisible: boolean) {
  if (isVisible) {
    return 'translate-y-0 translate-x-0 opacity-100 scale-100 rotate-0'
  }

  if (index % 3 === 0) {
    return '-translate-x-10 translate-y-6 opacity-0 scale-95 -rotate-1'
  }

  if (index % 3 === 1) {
    return 'translate-y-10 opacity-0 scale-95'
  }

  return 'translate-x-10 translate-y-6 opacity-0 scale-95 rotate-1'
}

function getPlanTone(plan: PricingPlan) {
  if (plan.highlighted) {
    return {
      card:
        'border-brand-300 bg-gradient-to-b from-brand-50/60 via-white to-white shadow-[0_18px_50px_-20px_rgba(10,122,255,0.45)] ring-1 ring-brand-300/40',
      badge: 'bg-brand-500 text-white',
      priceBox: 'bg-brand-500 text-white',
      checkIcon: 'text-brand-500',
    }
  }

  return {
    card:
      'border-neutral-200 bg-white shadow-card hover:border-brand-300 hover:shadow-card-hover',
    badge: 'bg-brand-100 text-brand-700',
    priceBox: 'bg-brand-700 text-white',
    checkIcon: 'text-brand-500',
  }
}

function PricingFeatureList({
  plan,
  t,
  checkIconClass,
}: {
  plan: PricingPlan
  t: (path: string) => string
  checkIconClass: string
}) {
  const visibleFeatures = plan.features.slice(0, FEATURE_LIMIT)

  return (
    <ul className="space-y-2.5">
      {visibleFeatures.map((feature, i) => {
        const label = t(`pricing.features.${feature.text}`)
        return (
          <li key={i} className="flex items-start gap-2.5">
            <CheckIcon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${checkIconClass}`} />
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
  )
}

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
  const tone = getPlanTone(plan)

  const entryAnimationClass = getCardEntryAnimation(index, isVisible)

  return (
    <a
      href={PRICING_PAGE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
        entryAnimationClass
      } transition-all duration-1000 ease-out`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 transition-all duration-500 hover:-translate-y-1.5 ${tone.card}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 via-transparent to-brand-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
              # {name}
            </h3>
            {isHighlighted && (
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone.badge}`}>
                # {t('pricing.goodDealLabel')}
              </span>
            )}
          </div>
          <p className="mb-4 text-sm leading-relaxed text-neutral-600">
            {description}
          </p>

          <p className="mb-2 text-sm text-neutral-400 line-through">
            {strikethrough} {t('pricing.annualPayment')}
          </p>

          <div
            className={`mb-5 inline-flex w-fit items-baseline gap-1 rounded-xl px-4 py-2.5 shadow-md ${tone.priceBox}`}
          >
            <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {plan.price} f
            </span>
            <span className="text-xs font-medium opacity-90 sm:text-sm">
              /{t('pricing.perMonth')}
            </span>
          </div>

          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">
            {t('pricing.included')}
          </h4>
          <PricingFeatureList plan={plan} t={t} checkIconClass={tone.checkIcon} />

          <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-brand-600">
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            <span>{t('pricing.redirectCta')}</span>
          </div>
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
      className="relative scroll-mt-40 py-16 md:py-20"
    >
      <div
        className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(10,122,255,0.10),transparent_55%)]" />
        <div className="absolute left-0 top-1/4 h-44 w-44 rounded-full border border-brand-200/60" />
        <div className="absolute right-8 bottom-12 h-32 w-32 rounded-2xl border border-brand-200/50" />
      </div>

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
              href={PRICING_PAGE_URL}
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
