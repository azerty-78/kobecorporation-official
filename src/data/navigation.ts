import { useLanguage } from '../contexts/LanguageContext'

export type NavItem = {
  label: string
  path: string
  sections?: { label: string; anchor: string }[]
}

export function useNavigationItems(): NavItem[] {
  const { language, t } = useLanguage()

  return [
    {
      label: t('nav.home'),
      path: '/',
      sections: [
        { label: language === 'fr' ? 'Accueil' : 'Home', anchor: 'hero' },
        { label: language === 'fr' ? 'Services' : 'Services', anchor: 'services' },
        { label: language === 'fr' ? 'Programmes' : 'Programs', anchor: 'programs' },
        { label: language === 'fr' ? 'Missions' : 'Missions', anchor: 'missions' },
        { label: language === 'fr' ? 'Processus' : 'Process', anchor: 'process' },
        { label: language === 'fr' ? 'Contact' : 'Contact', anchor: 'cta' },
      ],
    },
    {
      label: t('nav.services'),
      path: '/services',
      sections: [
        { label: language === 'fr' ? 'Accueil' : 'Home', anchor: 'hero' },
        { label: language === 'fr' ? 'Forfaits SaaS' : 'SaaS Plans', anchor: 'forfait-saas' },
        { label: language === 'fr' ? 'Développement Logiciel' : 'Software Development', anchor: 'development' },
        { label: language === 'fr' ? 'Hébergement' : 'Hosting', anchor: 'hosting' },
        { label: language === 'fr' ? 'Consultation' : 'Consultation', anchor: 'consultation' },
        { label: language === 'fr' ? 'Formation' : 'Training', anchor: 'training' },
      ],
    },
    {
      label: t('nav.programs'),
      path: '/programmes',
      sections: [
        { label: language === 'fr' ? 'Accueil' : 'Home', anchor: 'hero' },
        { label: language === 'fr' ? 'Freelances' : 'Freelances', anchor: 'freelances' },
        { label: language === 'fr' ? 'Étudiants' : 'Students', anchor: 'students' },
        { label: language === 'fr' ? 'Open Source' : 'Open Source', anchor: 'opensource' },
        { label: language === 'fr' ? 'Networking' : 'Networking', anchor: 'networking' },
      ],
    },
    {
      label: t('nav.about'),
      path: '/about',
      sections: [
        { label: language === 'fr' ? 'Accueil' : 'Home', anchor: 'hero' },
        { label: language === 'fr' ? 'Notre Histoire' : 'Our Story', anchor: 'story' },
        { label: language === 'fr' ? 'Équipe' : 'Team', anchor: 'team' },
        { label: language === 'fr' ? 'Valeurs' : 'Values', anchor: 'values' },
      ],
    },
    {
      label: t('nav.portfolio'),
      path: '/portfolio',
    },
    {
      label: t('nav.contact'),
      path: '/contact',
    },
  ]
}
