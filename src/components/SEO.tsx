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

/**
 * Normalise une URL canonique pour éviter les duplications
 * - Utilise toujours www.kobecorporation.com
 * - Supprime les paramètres de requête (UTM, tracking, etc.)
 * - Normalise les trailing slashes (supprime sauf pour la home)
 * - Redirige /home vers /
 */
function normalizeCanonicalUrl(pathname: string, search: string, customCanonical?: string): string {
  // Si une URL canonique personnalisée est fournie, l'utiliser
  if (customCanonical) {
    // S'assurer qu'elle utilise www.kobecorporation.com
    return customCanonical.replace(/https?:\/\/(www\.)?kobecorporation\.com/, baseUrl)
  }

  // Normaliser le pathname
  let normalizedPath = pathname

  // Rediriger /home vers /
  if (normalizedPath === '/home') {
    normalizedPath = '/'
  }

  // Normaliser les trailing slashes : supprimer sauf pour la racine
  if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1)
  }

  // Supprimer tous les paramètres de requête pour éviter les duplications
  // (Les paramètres comme ?utm_source=xxx peuvent créer des duplications)
  // Note: Si vous avez besoin de paramètres spécifiques, vous pouvez ajouter une logique ici

  return `${baseUrl}${normalizedPath}`
}

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
  const url = normalizeCanonicalUrl(location.pathname, location.search, canonical)

  useEffect(() => {
    // Utiliser requestIdleCallback pour décaler les manipulations DOM non critiques
    // et éviter de bloquer le thread principal
    const updateSEO = () => {
      // Mettre à jour le titre de la page (critique, fait immédiatement)
      document.title = fullTitle

      // Batch toutes les manipulations DOM pour réduire les reflows
      const updates: Array<() => void> = []

      // Meta description
      updates.push(() => {
        let metaDescription = document.querySelector('meta[name="description"]')
        if (!metaDescription) {
          metaDescription = document.createElement('meta')
          metaDescription.setAttribute('name', 'description')
          document.head.appendChild(metaDescription)
        }
        metaDescription.setAttribute('content', description)
      })

      // Meta keywords
      updates.push(() => {
        let metaKeywords = document.querySelector('meta[name="keywords"]')
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta')
          metaKeywords.setAttribute('name', 'keywords')
          document.head.appendChild(metaKeywords)
        }
        metaKeywords.setAttribute('content', keywords)
      })

      // Robots - S'assurer que la balise est toujours présente avec la bonne valeur
      updates.push(() => {
        let metaRobots = document.querySelector('meta[name="robots"]')
        if (!metaRobots) {
          metaRobots = document.createElement('meta')
          metaRobots.setAttribute('name', 'robots')
          document.head.appendChild(metaRobots)
        }
        // Définir explicitement index, follow ou noindex, nofollow
        if (noindex) {
          metaRobots.setAttribute('content', 'noindex, nofollow')
        } else {
          metaRobots.setAttribute('content', 'index, follow')
        }
      })

      // Canonical URL
      updates.push(() => {
        let linkCanonical = document.querySelector('link[rel="canonical"]')
        if (!linkCanonical) {
          linkCanonical = document.createElement('link')
          linkCanonical.setAttribute('rel', 'canonical')
          document.head.appendChild(linkCanonical)
        }
        linkCanonical.setAttribute('href', url)
      })

      // Open Graph - batch creation (amélioré)
      const ogTags = [
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: `${companyInfo.name} - ${description.substring(0, 100)}` },
        { property: 'og:url', content: url },
        { property: 'og:type', content: type },
        { property: 'og:site_name', content: companyInfo.name },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:locale:alternate', content: 'en_US' },
      ]

      ogTags.forEach(({ property, content }) => {
        updates.push(() => {
          let meta = document.querySelector(`meta[property="${property}"]`)
          if (!meta) {
            meta = document.createElement('meta')
            meta.setAttribute('property', property)
            document.head.appendChild(meta)
          }
          meta.setAttribute('content', content)
        })
      })

      // Twitter Card - batch creation
      const twitterTags = [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
        { name: 'twitter:site', content: '@kobecorporation' },
        { name: 'twitter:creator', content: '@le_bendji' },
      ]

      twitterTags.forEach(({ name, content }) => {
        updates.push(() => {
          let meta = document.querySelector(`meta[name="${name}"]`)
          if (!meta) {
            meta = document.createElement('meta')
            meta.setAttribute('name', name)
            document.head.appendChild(meta)
          }
          meta.setAttribute('content', content)
        })
      })

      // Exécuter toutes les mises à jour en batch
      updates.forEach(update => update())
    }

    // Exécuter immédiatement les mises à jour critiques
    updateSEO()

    // Schema.org JSON-LD - Créer les schémas améliorés
    const createSchemas = () => {
      // Supprimer les anciens schémas
      const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]')
      existingSchemas.forEach(schema => schema.remove())

      // Schema Organization (amélioré)
      const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: companyInfo.name,
        alternateName: 'KOBE Corp',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
          width: 512,
          height: 512,
        },
        description: description,
        foundingDate: companyInfo.year,
        address: {
          '@type': 'PostalAddress',
          streetAddress: companyInfo.address.street,
          addressLocality: companyInfo.address.city,
          addressRegion: companyInfo.address.region,
          addressCountry: companyInfo.address.country,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: companyInfo.contact.phone,
            contactType: 'customer service',
            email: companyInfo.contact.email,
            availableLanguage: ['French', 'English'],
            areaServed: 'CM', // Code pays Cameroun
          },
        ],
        sameAs: [
          companyInfo.social.linkedin,
          companyInfo.social.facebook,
          companyInfo.social.instagram,
          companyInfo.social.whatsapp,
        ],
        // Informations supplémentaires pour le SEO
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          value: '1-10',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Cameroun',
        },
        founder: {
          '@type': 'Person',
          name: companyInfo.founder,
          url: 'https://ben-djibril.kobecorporation.com',
        },
      }

      // Schema WebSite (nouveau - important pour SEO)
      const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: companyInfo.name,
        url: baseUrl,
        description: description,
        publisher: {
          '@type': 'Organization',
          name: companyInfo.name,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: ['fr', 'en'],
      }

      // Ajouter les schémas
      const schemas = [organizationSchema, websiteSchema]
      schemas.forEach(schema => {
        const schemaScript = document.createElement('script')
        schemaScript.type = 'application/ld+json'
        schemaScript.textContent = JSON.stringify(schema)
        document.head.appendChild(schemaScript)
      })
    }

    // Décaler la création des schémas avec requestIdleCallback pour éviter de bloquer
    if ('requestIdleCallback' in window) {
      requestIdleCallback(createSchemas, { timeout: 2000 })
    } else {
      // Fallback pour les navigateurs qui ne supportent pas requestIdleCallback
      setTimeout(createSchemas, 0)
    }
  }, [fullTitle, description, keywords, image, type, noindex, url])

  return null
}

export default SEO
