// Données de témoignages clients
export interface Testimonial {
  id: string
  name: string
  role: string
  roleEn: string
  company: string
  avatar?: string
  content: string
  contentEn: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    role: 'Directrice Technique',
    roleEn: 'CTO',
    company: 'TechCorp',
    content: 'KOBE Corporation a transformé notre infrastructure avec une expertise remarquable. Leur approche méthodique et leur réactivité ont fait toute la différence.',
    contentEn: 'KOBE Corporation transformed our infrastructure with remarkable expertise. Their methodical approach and responsiveness made all the difference.',
    rating: 5,
  },
  {
    id: '2',
    name: 'John Smith',
    role: 'CEO',
    roleEn: 'CEO',
    company: 'StartupHub',
    content: 'Une équipe professionnelle qui comprend vraiment les besoins des startups. Ils ont livré notre MVP en temps record avec une qualité exceptionnelle.',
    contentEn: 'A professional team that truly understands startup needs. They delivered our MVP on time with exceptional quality.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Sophie Martin',
    role: 'Product Manager',
    roleEn: 'Product Manager',
    company: 'InnovateLab',
    content: 'Leur expertise en développement full-stack est impressionnante. Notre application web est maintenant plus performante et scalable.',
    contentEn: 'Their full-stack development expertise is impressive. Our web application is now more performant and scalable.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Ahmed Benali',
    role: 'Fondateur',
    roleEn: 'Founder',
    company: 'Digital Solutions',
    content: 'KOBE Corporation a été un partenaire de confiance pour notre transformation digitale. Leur accompagnement a été précieux à chaque étape.',
    contentEn: 'KOBE Corporation has been a trusted partner for our digital transformation. Their support has been valuable at every step.',
    rating: 5,
  },
]
