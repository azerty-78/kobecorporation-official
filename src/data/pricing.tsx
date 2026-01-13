import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

export interface PricingPlan {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  originalPrice: string
  currentPrice: string
  priceUnit: string
  priceUnitEn: string
  buttonColor: 'brand' | 'accent'
  isRecommended?: boolean
  features: {
    included: string[]
    includedEn: string[]
    excluded?: string[]
    excludedEn?: string[]
  }
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'pro',
    name: '#Pro',
    nameEn: '#Pro',
    description: 'Forfait équilibré pour les entrepreneurs ambitieux, avec un suivi régulier.',
    descriptionEn: 'Balanced package for ambitious entrepreneurs, with regular follow-up.',
    originalPrice: '450 000',
    currentPrice: '25 700',
    priceUnit: 'f/mois (HT)',
    priceUnitEn: 'f/month (excl. tax)',
    buttonColor: 'brand',
    features: {
      included: [
        'Nom de domaine + Mail pro',
        'MVP.A + 6 fonctionnalités',
        'Hébergement +15Go Stockage',
        '+2 nouvelles fonctionnalité /an',
        '2 Interfaces de gestion',
        'Sauvegarde cloud limité',
      ],
      includedEn: [
        'Domain name + Pro email',
        'MVP.A + 6 functionalities',
        'Hosting +15GB Storage',
        '+2 new functionalities /year',
        '2 Management interfaces',
        'Limited cloud backup',
      ],
      excluded: ['Annonces publicitaires Incluses'],
      excludedEn: ['Advertising included'],
    },
  },
  {
    id: 'good-deal',
    name: '#Good Deal',
    nameEn: '#Good Deal',
    description: 'Forfait accessible pour lancer votre plateforme personnalisée a moindre couts',
    descriptionEn: 'Accessible package to launch your personalized platform at lower costs',
    originalPrice: '200 000',
    currentPrice: '15 500',
    priceUnit: 'f/mois (HT)',
    priceUnitEn: 'f/month (excl. tax)',
    buttonColor: 'accent',
    isRecommended: true,
    features: {
      included: [
        'Nom de domaine + Mail pro',
        'MVP (CRUD) + 4 fonctionnalités',
        'Hébergement +10Go Stockage',
        '+1 nouvelle fonctionnalité /an',
        '2 Interfaces de gestion',
      ],
      includedEn: [
        'Domain name + Pro email',
        'MVP (CRUD) + 4 functionalities',
        'Hosting +10GB Storage',
        '+1 new functionality /year',
        '2 Management interfaces',
      ],
      excluded: ['Pas de sauvegarde cloud', 'Annonces publicitaires Incluses'],
      excludedEn: ['No cloud backup', 'Advertising included'],
    },
  },
  {
    id: 'ultra',
    name: '#Ultra',
    nameEn: '#Ultra',
    description: 'Forfait haut de gamme pour les projets stratégiques, avec accompagnement rapproché',
    descriptionEn: 'High-end package for strategic projects, with close support',
    originalPrice: '600 000',
    currentPrice: '40 900',
    priceUnit: 'f/mois (HT)',
    priceUnitEn: 'f/month (excl. tax)',
    buttonColor: 'brand',
    features: {
      included: [
        'Nom de domaine + Mail pro',
        'MVPA + 10 fonctionnalités',
        'Hébergement +20Go Stockage',
        '+4 nouvelles fonctionnalité /an',
        '3 Interfaces de gestion',
        'Sauvegarde cloud illimité',
        'Aucune publicité Incluse',
      ],
      includedEn: [
        'Domain name + Pro email',
        'MVPA + 10 functionalities',
        'Hosting +20GB Storage',
        '+4 new functionalities /year',
        '3 Management interfaces',
        'Unlimited cloud backup',
        'No advertising included',
      ],
    },
  },
]
