import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const configPath = path.resolve(__dirname, '../../src/config/routes.config.json')

/** @type {{ baseUrl: string, locales: string[], pages: Array<{ path: string, changefreq: string, priority: string }> }} */
export const routesConfig = JSON.parse(readFileSync(configPath, 'utf8'))

export const SITE_BASE_URL = routesConfig.baseUrl
export const PRERENDER_LOCALES = routesConfig.locales
export const SITEMAP_PAGES = routesConfig.pages

/** Chemins absolus à pré-rendre, ex. `/fr`, `/fr/services`. */
export function getAllPrerenderRoutes() {
  const routes = []
  for (const locale of PRERENDER_LOCALES) {
    for (const page of SITEMAP_PAGES) {
      routes.push(page.path ? `/${locale}/${page.path}` : `/${locale}`)
    }
  }
  return routes
}
