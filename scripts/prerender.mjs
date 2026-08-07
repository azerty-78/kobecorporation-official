import { execSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { preview } from 'vite'
import { getAllPrerenderRoutes } from './lib/routes.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const PORT = 4173
const ORIGIN = `http://127.0.0.1:${PORT}`

function routeToDistFile(route) {
  const segments = route.split('/').filter(Boolean)
  return path.join(distDir, ...segments, 'index.html')
}

async function prerenderRoute(page, route) {
  const url = `${ORIGIN}${route}`
  console.log(`  → ${route}`)

  await page.goto(url, { waitUntil: 'load', timeout: 60_000 })

  // Contenu principal (lazy route hydratée)
  await page.waitForSelector('main h1', { timeout: 30_000 })

  // SEO.tsx injecte title/meta immédiatement, JSON-LD via requestIdleCallback (timeout 2s)
  await page.waitForFunction(
    (expectedPath) => {
      const title = document.title?.trim() || ''
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''
      const schemas = document.querySelectorAll(
        'script[type="application/ld+json"][data-kobe-seo="true"]',
      )
      const pathOk =
        canonical.includes(expectedPath) ||
        (expectedPath.match(/^\/(fr|en)$/) && canonical.endsWith(expectedPath))

      return (
        title.length > 5 &&
        description.length > 20 &&
        pathOk &&
        schemas.length >= 1
      )
    },
    route,
    { timeout: 15_000 },
  )

  const html = await page.evaluate(
    () => `<!DOCTYPE html>\n${document.documentElement.outerHTML}`,
  )

  const outFile = routeToDistFile(route)
  await mkdir(path.dirname(outFile), { recursive: true })
  await writeFile(outFile, html, 'utf8')
}

async function main() {
  const routes = getAllPrerenderRoutes()
  console.log(`Prerender: ${routes.length} routes → ${distDir}`)

  // Idempotent : télécharge Chromium si absent
  execSync('npx playwright install chromium', { stdio: 'inherit' })

  const previewServer = await preview({
    configFile: path.join(rootDir, 'vite.config.ts'),
    preview: {
      port: PORT,
      host: '127.0.0.1',
      strictPort: true,
    },
  })

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    for (const route of routes) {
      await prerenderRoute(page, route)
    }
    console.log('Prerender terminé.')
  } finally {
    await browser.close()
    await previewServer.close()
  }
}

main().catch((error) => {
  console.error('Prerender échoué:', error)
  process.exit(1)
})
