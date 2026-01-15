export const seoData = {
  home: {
    fr: {
      title: 'Accueil - KOBE Corporation',
      description: 'KOBE Corporation - Build Your Own Legacy. Développement logiciel sur mesure, hébergement, consultation et formation au Cameroun. Transformez vos idées en solutions innovantes.',
      keywords: 'KOBE Corporation, développement logiciel Cameroun, applications web Yaoundé, développement mobile, hébergement applications, consultation IT, formation développeurs, Ben Djibril',
    },
    en: {
      title: 'Home - KOBE Corporation',
      description: 'KOBE Corporation - Build Your Own Legacy. Custom software development, hosting, consulting and training in Cameroon. Transform your ideas into innovative solutions.',
      keywords: 'KOBE Corporation, software development Cameroon, web applications Yaoundé, mobile development, application hosting, IT consulting, developer training, Ben Djibril',
    },
  },
  services: {
    fr: {
      title: 'Nos Services - Développement Logiciel & Hébergement',
      description: 'Découvrez nos services : développement logiciel sur mesure, hébergement sécurisé, consultation IT et formation. Solutions adaptées aux particuliers, PME et grandes entreprises au Cameroun.',
      keywords: 'services développement logiciel, développement web Cameroun, développement mobile, hébergement applications, consultation IT, formation développeurs, PME Cameroun',
    },
    en: {
      title: 'Our Services - Software Development & Hosting',
      description: 'Discover our services: custom software development, secure hosting, IT consulting and training. Solutions tailored for individuals, SMEs and large enterprises in Cameroon.',
      keywords: 'software development services, web development Cameroon, mobile development, application hosting, IT consulting, developer training, SMEs Cameroon',
    },
  },
  programmes: {
    fr: {
      title: 'Nos Programmes - Freelances, Étudiants & Open Source',
      description: 'Rejoignez nos programmes pour freelances, étudiants et développeurs open source. Opportunités de projets réels, mentorat et certification au Cameroun.',
      keywords: 'programme freelance Cameroun, stage développeur, programme étudiant, open source Cameroun, mentorat développeur, certification développeur',
    },
    en: {
      title: 'Our Programs - Freelancers, Students & Open Source',
      description: 'Join our programs for freelancers, students and open source developers. Real project opportunities, mentoring and certification in Cameroon.',
      keywords: 'freelance program Cameroon, developer internship, student program, open source Cameroon, developer mentoring, developer certification',
    },
  },
  about: {
    fr: {
      title: 'À Propos - Notre Histoire & Vision',
      description: 'Découvrez l\'histoire de KOBE Corporation, fondée par Ben Djibril en 2025. Notre mission : transformer l\'écosystème technologique africain avec des solutions innovantes.',
      keywords: 'KOBE Corporation histoire, Ben Djibril, entreprise tech Cameroun, vision technologique, écosystème tech africain, fondateur développeur',
    },
    en: {
      title: 'About Us - Our Story & Vision',
      description: 'Discover the story of KOBE Corporation, founded by Ben Djibril in 2025. Our mission: transform the African technology ecosystem with innovative solutions.',
      keywords: 'KOBE Corporation story, Ben Djibril, tech company Cameroon, technology vision, African tech ecosystem, developer founder',
    },
  },
  portfolio: {
    fr: {
      title: 'Portfolio - Nos Réalisations',
      description: 'Découvrez les projets réalisés par KOBE Corporation : applications web, mobiles et solutions d\'entreprise développées au Cameroun.',
      keywords: 'portfolio KOBE Corporation, projets développés, réalisations Cameroun, applications web, applications mobiles, projets entreprise',
    },
    en: {
      title: 'Portfolio - Our Achievements',
      description: 'Discover projects completed by KOBE Corporation: web applications, mobile apps and enterprise solutions developed in Cameroon.',
      keywords: 'KOBE Corporation portfolio, developed projects, achievements Cameroon, web applications, mobile applications, enterprise projects',
    },
  },
  contact: {
    fr: {
      title: 'Contact - Parlons de Votre Projet',
      description: 'Contactez KOBE Corporation pour discuter de votre projet. Disponible 24/7. Email, téléphone et formulaire de contact. Basé à Yaoundé, Cameroun.',
      keywords: 'contact KOBE Corporation, devis développement logiciel, consultation gratuite, Yaoundé Cameroun, téléphone entreprise, email contact',
    },
    en: {
      title: 'Contact - Let\'s Talk About Your Project',
      description: 'Contact KOBE Corporation to discuss your project. Available 24/7. Email, phone and contact form. Based in Yaoundé, Cameroon.',
      keywords: 'contact KOBE Corporation, software development quote, free consultation, Yaoundé Cameroon, business phone, contact email',
    },
  },
}

export const getSEOData = (path: string, language: 'fr' | 'en' = 'fr') => {
  const pathKey = path.replace('/', '') || 'home'
  const data = seoData[pathKey as keyof typeof seoData]
  return data ? data[language] : seoData.home[language]
}
