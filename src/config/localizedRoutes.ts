import routesConfig from './routes.config.json'

export const SITE_BASE_URL = routesConfig.baseUrl

export const PRERENDER_LOCALES = routesConfig.locales as ReadonlyArray<'fr' | 'en'>

/** Segments de pages sous `/:lang/` (hors home) — alignés sur routes.config.json. */
export const LOCALIZED_PAGE_SEGMENTS = [
  'services',
  'programmes',
  'about',
  'portfolio',
  'contact',
  'privacy',
  'legal',
  'terms',
] as const

export type LocalizedPageSegment = (typeof LOCALIZED_PAGE_SEGMENTS)[number]

export interface SitemapPageMeta {
  path: string
  changefreq: string
  priority: string
}

export const SITEMAP_PAGES: ReadonlyArray<SitemapPageMeta> = routesConfig.pages

/** Chemins absolus à pré-rendre, ex. `/fr`, `/fr/services`. */
export function getAllPrerenderRoutes(): string[] {
  const routes: string[] = []
  for (const locale of PRERENDER_LOCALES) {
    for (const page of SITEMAP_PAGES) {
      routes.push(page.path ? `/${locale}/${page.path}` : `/${locale}`)
    }
  }
  return routes
}
