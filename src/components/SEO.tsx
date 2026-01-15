import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { companyInfo } from '../data/siteContent'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  type?: string
  noindex?: boolean
  canonical?: string
}

const baseUrl = 'https://www.kobecorporation.com'
const defaultImage = `${baseUrl}/og-image.png`
const defaultDescription = 'KOBE Corporation - Build Your Own Legacy. Votre partenaire technologique pour transformer vos idées en solutions logicielles innovantes. Développement logiciel, hébergement, consultation et formation au Cameroun.'

function SEO({
  title,
  description = defaultDescription,
  keywords = 'KOBE Corporation, développement logiciel, Cameroun, Yaoundé, applications web, applications mobiles, hébergement, consultation, formation, Ben Djibril, Kotlin, KMP, Spring Boot',
  image = defaultImage,
  type = 'website',
  noindex = false,
  canonical,
}: SEOProps) {
  const location = useLocation()
  const fullTitle = title ? `${title} | ${companyInfo.name}` : `${companyInfo.name} - ${companyInfo.slogan}`
  const url = canonical || `${baseUrl}${location.pathname}${location.search}`

  useEffect(() => {
    // Mettre à jour le titre de la page
    document.title = fullTitle

    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', description)

    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.setAttribute('name', 'keywords')
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute('content', keywords)

    // Robots
    let metaRobots = document.querySelector('meta[name="robots"]')
    if (noindex) {
      if (!metaRobots) {
        metaRobots = document.createElement('meta')
        metaRobots.setAttribute('name', 'robots')
        document.head.appendChild(metaRobots)
      }
      metaRobots.setAttribute('content', 'noindex, nofollow')
    } else {
      if (metaRobots) {
        metaRobots.remove()
      }
    }

    // Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]')
    if (!linkCanonical) {
      linkCanonical = document.createElement('link')
      linkCanonical.setAttribute('rel', 'canonical')
      document.head.appendChild(linkCanonical)
    }
    linkCanonical.setAttribute('href', url)

    // Open Graph
    const ogTags = [
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: companyInfo.name },
      { property: 'og:locale', content: 'fr_FR' },
      { property: 'og:locale:alternate', content: 'en_US' },
    ]

    ogTags.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    })

    // Twitter Card
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:site', content: '@kobecorporation' },
      { name: 'twitter:creator', content: '@le_bendji' },
    ]

    twitterTags.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    })

    // Schema.org JSON-LD - Organization
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: companyInfo.name,
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description: description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: companyInfo.address.street,
        addressLocality: companyInfo.address.city,
        addressRegion: companyInfo.address.region,
        addressCountry: companyInfo.address.country,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: companyInfo.contact.phone,
        contactType: 'customer service',
        email: companyInfo.contact.email,
        availableLanguage: ['French', 'English'],
      },
      sameAs: [
        companyInfo.social.linkedin,
        companyInfo.social.facebook,
        companyInfo.social.instagram,
        companyInfo.social.whatsapp,
      ],
      founder: {
        '@type': 'Person',
        name: companyInfo.founder,
        url: 'https://www.ben-djibril.kobecorporation.com',
      },
    }

    // Supprimer l'ancien schema s'il existe
    let existingSchema = document.querySelector('script[type="application/ld+json"]')
    if (existingSchema) {
      existingSchema.remove()
    }

    // Ajouter le nouveau schema
    const schemaScript = document.createElement('script')
    schemaScript.type = 'application/ld+json'
    schemaScript.textContent = JSON.stringify(organizationSchema)
    document.head.appendChild(schemaScript)
  }, [fullTitle, description, keywords, image, type, noindex, url])

  return null
}

export default SEO
