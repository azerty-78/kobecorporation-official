type Language = 'fr' | 'en'

export type { Language }

export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      services: 'Services',
      programs: 'Programmes',
      about: 'À propos',
      portfolio: 'Portfolio',
      contact: 'Contact',
      startProject: 'Démarrer un Projet',
    },
    // Home Page
    home: {
      hero: {
        title: 'Construisez Votre Propre Héritage Numérique',
        subtitle: 'KOBE Corporation - Votre partenaire technologique pour transformer vos idées en solutions logicielles innovantes',
        description: 'Depuis 2025, nous développons des logiciels sur mesure pour les individus, PME et grandes entreprises. Nous hébergeons vos applications et accompagnons votre croissance digitale.',
        cta1: 'Découvrir nos services',
        cta2: 'Nous contacter',
      },
      stats: {
        year: 'Année de création',
        availability: 'Disponibilité',
        clientTypes: 'Types de clients',
        customSolutions: 'Solutions personnalisées',
      },
      services: {
        title: 'Nos Expertises',
        service1: {
          title: 'Développement Logiciel',
          desc: 'Applications web, mobiles et desktop sur mesure pour répondre à vos besoins spécifiques',
        },
        service2: {
          title: 'Hébergement & Infrastructure',
          desc: 'Hébergement sécurisé de vos applications avec une disponibilité optimale',
        },
        service3: {
          title: 'Consultation & Audit',
          desc: 'Analyse de vos besoins et recommandations stratégiques pour votre transformation digitale',
        },
        service4: {
          title: 'Formation & Bootcamp',
          desc: 'Programmes de formation intensive pour développer vos compétences techniques',
        },
      },
      programs: {
        title: 'Nos Programmes',
        freelance: 'Freelances',
        students: 'Étudiants',
        openSource: 'Open Source',
        networking: 'Networking',
      },
      testimonials: {
        title: 'Ce Que Disent Nos Clients',
      },
      cta: {
        title: 'Prêt à Démarrer Votre Projet ?',
        text: 'Contactez-nous dès aujourd\'hui pour discuter de vos besoins',
        button: 'Commencer maintenant',
      },
    },
    // Services Page
    services: {
      title: 'Nos Services',
      subtitle: 'Des solutions technologiques complètes pour votre réussite',
      // ... (à compléter)
    },
    // Footer
    footer: {
      slogan: 'Build Your Own Legacy',
      description: 'KOBE Corporation - Votre partenaire technologique pour transformer vos idées en solutions logicielles innovantes.',
      quickLinks: 'Liens rapides',
      programs: 'Programmes',
      followUs: 'Suivez-nous',
      available247: 'Disponible 24/7',
      copyright: '© 2025 KOBE Corporation. Tous droits réservés.',
      legal: {
        privacy: 'Mentions légales',
        terms: 'Politique de confidentialité',
        cookies: 'Conditions d\'utilisation',
      },
    },
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      services: 'Services',
      programs: 'Programs',
      about: 'About',
      portfolio: 'Portfolio',
      contact: 'Contact',
      startProject: 'Start a Project',
    },
    // Home Page
    home: {
      hero: {
        title: 'Build Your Own Legacy',
        subtitle: 'KOBE Corporation - Your technology partner to transform ideas into innovative software solutions',
        description: 'Since 2025, we develop custom software for individuals, SMEs and large enterprises. We host your applications and support your digital growth.',
        cta1: 'Discover our services',
        cta2: 'Contact us',
      },
      stats: {
        year: 'Year founded',
        availability: 'Availability',
        clientTypes: 'Client types',
        customSolutions: 'Custom solutions',
      },
      services: {
        title: 'Our Expertise',
        service1: {
          title: 'Software Development',
          desc: 'Custom web, mobile and desktop applications tailored to your specific needs',
        },
        service2: {
          title: 'Hosting & Infrastructure',
          desc: 'Secure hosting of your applications with optimal availability',
        },
        service3: {
          title: 'Consultation & Audit',
          desc: 'Analysis of your needs and strategic recommendations for your digital transformation',
        },
        service4: {
          title: 'Training & Bootcamp',
          desc: 'Intensive training programs to develop your technical skills',
        },
      },
      programs: {
        title: 'Our Programs',
        freelance: 'Freelances',
        students: 'Students',
        openSource: 'Open Source',
        networking: 'Networking',
      },
      testimonials: {
        title: 'What Our Clients Say',
      },
      cta: {
        title: 'Ready to Start Your Project?',
        text: 'Contact us today to discuss your needs',
        button: 'Get started now',
      },
    },
    // Services Page
    services: {
      title: 'Our Services',
      subtitle: 'Complete technology solutions for your success',
      // ... (à compléter)
    },
    // Footer
    footer: {
      slogan: 'Build Your Own Legacy',
      description: 'KOBE Corporation - Your technology partner to transform ideas into innovative software solutions.',
      quickLinks: 'Quick Links',
      programs: 'Programs',
      followUs: 'Follow Us',
      available247: 'Available 24/7',
      copyright: '© 2025 KOBE Corporation. All rights reserved.',
      legal: {
        privacy: 'Legal notices',
        terms: 'Privacy policy',
        cookies: 'Terms of use',
      },
    },
  },
}

export const getTranslation = (lang: Language, path: string): string => {
  const keys = path.split('.')
  let value: any = translations[lang]
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      return path // Fallback to path if translation not found
    }
  }
  
  return typeof value === 'string' ? value : path
}
