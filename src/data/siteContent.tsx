import {
  BriefcaseIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CheckBadgeIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

export const services = [
  {
    icon: <BriefcaseIcon className="h-6 w-6 text-brand-500" />,
    title: 'Conseil & Stratégie',
    desc: 'Accompagnement sur-mesure pour accélérer vos projets et sécuriser vos décisions.',
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6 text-brand-500" />,
    title: 'Qualité & Conformité',
    desc: 'Processus rigoureux, documentation claire et conformité aux standards internationaux.',
  },
  {
    icon: <SparklesIcon className="h-6 w-6 text-brand-500" />,
    title: 'Innovation Durable',
    desc: 'Solutions modernes qui conjuguent performance, impact et respect de l’environnement.',
  },
]

export const valeurs = [
  {
    icon: <CheckBadgeIcon className="h-5 w-5 text-brand-500" />,
    title: 'Excellence opérationnelle',
    text: 'Des méthodes éprouvées, des équipes engagées et un pilotage transparent.',
  },
  {
    icon: <BuildingOffice2Icon className="h-5 w-5 text-brand-500" />,
    title: 'Proximité client',
    text: 'Un interlocuteur dédié et des points de contact réguliers pour avancer ensemble.',
  },
  {
    icon: <GlobeAltIcon className="h-5 w-5 text-brand-500" />,
    title: 'Ouverture internationale',
    text: 'Nous intervenons sur plusieurs marchés et cultivons une culture multiculturelle.',
  },
]

export const chiffres = [
  { label: 'Clients accompagnés', value: '120+' },
  { label: 'Années d’expérience', value: '10' },
  { label: 'Taux de satisfaction', value: '96%' },
]

