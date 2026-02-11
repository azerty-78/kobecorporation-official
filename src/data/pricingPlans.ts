export type PricingFeature = {
  text: string
  included: boolean
  bold?: boolean
}

export type PricingPlan = {
  id: string
  nameKey: string
  descriptionKey: string
  strikethroughKey: string
  price: string
  highlighted?: boolean
  features: PricingFeature[]
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'pro',
    nameKey: 'pro',
    descriptionKey: 'proDescription',
    strikethroughKey: 'proStrikethrough',
    price: '27 700',
    features: [
      { text: 'domainSubdomainMailPro', included: true },
      { text: 'fiftyPercentPremium', included: true },
      { text: 'hosting15Go', included: true },
      { text: 'advancedSearchFilters', included: true },
      { text: 'supportEmailWhatsapp24h', included: true },
      { text: 'graphicCustomization', included: true },
      { text: 'analyticsDashboard', included: true },
      { text: 'limitedAds', included: false },
    ],
  },
  {
    id: 'good-deal',
    nameKey: 'goodDeal',
    descriptionKey: 'goodDealDescription',
    strikethroughKey: 'goodDealStrikethrough',
    price: '15 500',
    highlighted: true,
    features: [
      { text: 'domainMailPro', included: true },
      { text: 'freeModulesCrm', included: true },
      { text: 'hosting10Go', included: true },
      { text: 'threeInterfaces', included: true },
      { text: 'basicSearchFilters', included: true },
      { text: 'supportEmail48h', included: true },
      { text: 'premiumModulesLocked', included: false },
      { text: 'kobeAdsIncluded', included: false },
    ],
  },
  {
    id: 'ultra',
    nameKey: 'ultra',
    descriptionKey: 'ultraDescription',
    strikethroughKey: 'ultraStrikethrough',
    price: '40 900',
    features: [
      { text: 'domainTwoSubdomainsMailPremium', included: true },
      { text: 'allFeaturesUnlocked', included: true, bold: true },
      { text: 'aiSearchAdvancedFilters', included: true },
      { text: 'biAnalyticsUnlimited', included: true },
      { text: 'fullUiUxCustomization', included: true },
      { text: 'unlimitedCloudBackup', included: true },
      { text: 'hosting20Go', included: true, bold: true },
      { text: 'restApiIntegrations', included: true },
      { text: 'dedicatedProjectManagerVip', included: true },
      { text: 'noAdsNoRestrictions', included: true },
    ],
  },
]
