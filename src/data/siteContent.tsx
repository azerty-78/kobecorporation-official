import {
  BriefcaseIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CheckBadgeIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  CodeBracketIcon,
  ServerIcon,
  ChartBarIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  NetworkIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

// Informations de l'entreprise
export const companyInfo = {
  name: 'KOBE Corporation',
  founder: 'Ben Djibril',
  year: '2025',
  slogan: 'Build Your Own Legacy',
  address: {
    street: 'Carrefour Belle Mère',
    city: 'Yaoundé',
    region: 'Région du Centre',
    country: 'Cameroun',
    full: 'Carrefour Belle Mère, Yaoundé, Cameroun',
  },
  contact: {
    phone: '+237-655-938-501',
    email: 'contact@kobecorporation.com',
    availability: '24/7',
  },
  social: {
    whatsapp: 'https://whatsapp.com/channel/0029VbByklp7oQhjSR9w482f',
    facebook: 'https://www.facebook.com/share/14cRYHeBKCY/',
    linkedin: 'https://www.linkedin.com/company/kobe-corporation/',
    instagram: 'https://www.instagram.com/kobecorporation?igsh=MWVyZWs0eGk3MnVwNA==',
    website: 'www.kobecorporation.com',
  },
}

// Services principaux
export const services = [
  {
    icon: <CodeBracketIcon className="h-6 w-6 text-brand-500" />,
    title: 'Développement Logiciel',
    titleEn: 'Software Development',
    desc: 'Applications web, mobiles et desktop sur mesure pour répondre à vos besoins spécifiques',
    descEn: 'Custom web, mobile and desktop applications tailored to your specific needs',
    slug: 'developpement-logiciel',
  },
  {
    icon: <ServerIcon className="h-6 w-6 text-brand-500" />,
    title: 'Hébergement & Infrastructure',
    titleEn: 'Hosting & Infrastructure',
    desc: 'Hébergement sécurisé de vos applications avec une disponibilité optimale',
    descEn: 'Secure hosting of your applications with optimal availability',
    slug: 'hebergement-infrastructure',
  },
  {
    icon: <ChartBarIcon className="h-6 w-6 text-brand-500" />,
    title: 'Consultation & Audit',
    titleEn: 'Consultation & Audit',
    desc: 'Analyse de vos besoins et recommandations stratégiques pour votre transformation digitale',
    descEn: 'Analysis of your needs and strategic recommendations for your digital transformation',
    slug: 'consultation-audit',
  },
  {
    icon: <AcademicCapIcon className="h-6 w-6 text-brand-500" />,
    title: 'Formation & Bootcamp',
    titleEn: 'Training & Bootcamp',
    desc: 'Programmes de formation intensive pour développer vos compétences techniques',
    descEn: 'Intensive training programs to develop your technical skills',
    slug: 'formation-bootcamp',
  },
]

// Valeurs de l'entreprise
export const valeurs = [
  {
    icon: <CheckBadgeIcon className="h-5 w-5 text-brand-500" />,
    title: 'Excellence opérationnelle',
    titleEn: 'Operational Excellence',
    text: 'Des méthodes éprouvées, des équipes engagées et un pilotage transparent.',
    textEn: 'Proven methods, committed teams and transparent management.',
  },
  {
    icon: <BuildingOffice2Icon className="h-5 w-5 text-brand-500" />,
    title: 'Proximité client',
    titleEn: 'Client Proximity',
    text: 'Un interlocuteur dédié et des points de contact réguliers pour avancer ensemble.',
    textEn: 'A dedicated contact and regular touchpoints to move forward together.',
  },
  {
    icon: <GlobeAltIcon className="h-5 w-5 text-brand-500" />,
    title: 'Ouverture internationale',
    titleEn: 'International Openness',
    text: 'Nous intervenons sur plusieurs marchés et cultivons une culture multiculturelle.',
    textEn: 'We operate in multiple markets and cultivate a multicultural culture.',
  },
]

// Chiffres clés
export const chiffres = [
  { label: 'Année de création', labelEn: 'Year founded', value: '2025' },
  { label: 'Disponibilité', labelEn: 'Availability', value: '24/7' },
  { label: 'Types de clients', labelEn: 'Client types', value: '3+' },
  { label: 'Solutions personnalisées', labelEn: 'Custom solutions', value: '100%' },
]

// Programmes
export const programmes = [
  {
    id: 'freelances',
    icon: <BriefcaseIcon className="h-6 w-6 text-brand-500" />,
    title: 'Freelances',
    titleEn: 'Freelances',
    slogan: 'Facture tes clients sans créer ta boîte',
    sloganEn: 'Invoice your clients without creating your company',
    description: 'KOBE Corporation vous offre un cadre légal complet pour exercer votre activité freelance en toute sérénité. Nous gérons tous les aspects administratifs pendant que vous vous concentrez sur ce que vous faites de mieux : coder.',
    descriptionEn: 'KOBE Corporation provides you with a complete legal framework to carry out your freelance activity with peace of mind. We handle all administrative aspects while you focus on what you do best: coding.',
    features: [
      'Cadre légal complet',
      'Génération automatique de contrats',
      'Facturation professionnelle',
      'Gestion administrative',
      'Accompagnement fiscal',
      'Assurance professionnelle',
    ],
    featuresEn: [
      'Complete legal framework',
      'Automatic contract generation',
      'Professional invoicing',
      'Administrative management',
      'Tax support',
      'Professional insurance',
    ],
  },
  {
    id: 'etudiants',
    icon: <AcademicCapIcon className="h-6 w-6 text-brand-500" />,
    title: 'Étudiants',
    titleEn: 'Students',
    slogan: 'Des stages sur des VRAIS projets',
    sloganEn: 'Internships on REAL projects',
    description: 'Oubliez les stages où vous faites des photocopies ou du café. Chez KOBE Corporation, vous travaillez sur de vrais projets qui partent en production. Chaque ligne de code que vous écrivez compte et impacte de vraies entreprises.',
    descriptionEn: 'Forget internships where you make photocopies or coffee. At KOBE Corporation, you work on real projects that go into production. Every line of code you write counts and impacts real businesses.',
    features: [
      'Projets réels en production',
      'Mentor dédié expérimenté',
      'Code review réguliers',
      'Portfolio professionnel',
      'Certification de compétences',
      'Possibilité d\'embauche',
    ],
    featuresEn: [
      'Real projects in production',
      'Dedicated experienced mentor',
      'Regular code reviews',
      'Professional portfolio',
      'Skills certification',
      'Hiring opportunity',
    ],
  },
  {
    id: 'open-source',
    icon: <BookOpenIcon className="h-6 w-6 text-brand-500" />,
    title: 'Open Source',
    titleEn: 'Open Source',
    slogan: 'Ton GitHub devient ton meilleur CV',
    sloganEn: 'Your GitHub becomes your best resume',
    description: 'Contribuez à des projets open source utilisés par de vraies entreprises. Vos contributions seront visibles par des milliers de développeurs et employeurs potentiels. Rejoignez une communauté active de développeurs passionnés.',
    descriptionEn: 'Contribute to open source projects used by real companies. Your contributions will be visible to thousands of developers and potential employers. Join an active community of passionate developers.',
    features: [
      'Projets open source professionnels',
      'Visibilité internationale',
      'Apprentissage collaboratif',
      'Networking avec des experts',
      'Portfolio technique solide',
      'Reconnaissance communautaire',
    ],
    featuresEn: [
      'Professional open source projects',
      'International visibility',
      'Collaborative learning',
      'Networking with experts',
      'Strong technical portfolio',
      'Community recognition',
    ],
  },
  {
    id: 'networking',
    icon: <NetworkIcon className="h-6 w-6 text-brand-500" />,
    title: 'Networking',
    titleEn: 'Networking',
    slogan: 'Plus on grandit, plus tu as d\'opportunités',
    sloganEn: 'The more we grow, the more opportunities you have',
    description: 'Accédez à notre réseau de clients, projets et événements exclusifs. Plus KOBE Corporation se développe, plus les opportunités pour notre communauté augmentent. Faites partie d\'un écosystème technologique en pleine expansion.',
    descriptionEn: 'Access our network of clients, projects and exclusive events. As KOBE Corporation grows, opportunities for our community increase. Be part of a rapidly expanding technology ecosystem.',
    features: [
      'Portfolio de clients diversifié',
      'Projets innovants',
      'Événements tech exclusifs',
      'Workshops & masterclasses',
      'Meetups développeurs',
      'Conférences techniques',
    ],
    featuresEn: [
      'Diverse client portfolio',
      'Innovative projects',
      'Exclusive tech events',
      'Workshops & masterclasses',
      'Developer meetups',
      'Technical conferences',
    ],
  },
]

// Technologies utilisées
export const technologies = {
  frontend: ['React', 'Vue.js', 'Angular', 'Next.js'],
  backend: ['Node.js', 'Python', 'Java', 'PHP'],
  mobile: ['React Native', 'Flutter'],
  database: ['PostgreSQL', 'MongoDB', 'MySQL'],
}

// Processus de travail
export const process = [
  {
    step: 1,
    title: 'Découverte',
    titleEn: 'Discovery',
    description: 'Compréhension de vos besoins et analyse de faisabilité',
    descriptionEn: 'Understanding your needs and feasibility analysis',
  },
  {
    step: 2,
    title: 'Planification',
    titleEn: 'Planning',
    description: 'Définition du scope, établissement du timeline et estimation budgétaire',
    descriptionEn: 'Scope definition, timeline establishment and budget estimation',
  },
  {
    step: 3,
    title: 'Développement',
    titleEn: 'Development',
    description: 'Méthodologie Agile avec sprints itératifs et revues régulières',
    descriptionEn: 'Agile methodology with iterative sprints and regular reviews',
  },
  {
    step: 4,
    title: 'Testing & QA',
    titleEn: 'Testing & QA',
    description: 'Tests rigoureux et validation utilisateur',
    descriptionEn: 'Rigorous testing and user validation',
  },
  {
    step: 5,
    title: 'Déploiement',
    titleEn: 'Deployment',
    description: 'Mise en production et formation des utilisateurs',
    descriptionEn: 'Production deployment and user training',
  },
  {
    step: 6,
    title: 'Maintenance',
    titleEn: 'Maintenance',
    description: 'Support continu et mises à jour régulières',
    descriptionEn: 'Ongoing support and regular updates',
  },
]

// Informations de contact pour le footer
export const contactInfo = [
  {
    icon: <MapPinIcon className="h-5 w-5 text-brand-500" />,
    label: 'Adresse',
    labelEn: 'Address',
    value: companyInfo.address.full,
    link: null,
  },
  {
    icon: <PhoneIcon className="h-5 w-5 text-brand-500" />,
    label: 'Téléphone',
    labelEn: 'Phone',
    value: companyInfo.contact.phone,
    link: `tel:${companyInfo.contact.phone}`,
  },
  {
    icon: <EnvelopeIcon className="h-5 w-5 text-brand-500" />,
    label: 'Email',
    labelEn: 'Email',
    value: companyInfo.contact.email,
    link: `mailto:${companyInfo.contact.email}`,
  },
]