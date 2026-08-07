import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PRERENDER_LOCALES, SITE_BASE_URL, SITEMAP_PAGES } from './lib/routes.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outFile = path.resolve(__dirname, '../public/sitemap.xml')

function localizedUrl(locale, pagePath) {
  return pagePath ? `${SITE_BASE_URL}/${locale}/${pagePath}` : `${SITE_BASE_URL}/${locale}`
}

function buildSitemap(lastmod) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    '',
  ]

  for (const page of SITEMAP_PAGES) {
    for (const locale of PRERENDER_LOCALES) {
      const loc = localizedUrl(locale, page.path)
      lines.push('  <url>')
      lines.push(`    <loc>${loc}</loc>`)
      lines.push(`    <lastmod>${lastmod}</lastmod>`)
      lines.push(`    <changefreq>${page.changefreq}</changefreq>`)
      lines.push(`    <priority>${page.priority}</priority>`)
      for (const alt of PRERENDER_LOCALES) {
        lines.push(
          `    <xhtml:link rel="alternate" hreflang="${alt}" href="${localizedUrl(alt, page.path)}" />`,
        )
      }
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl('en', page.path)}" />`,
      )
      lines.push('  </url>')
    }
    lines.push('')
  }

  lines.push('</urlset>', '')
  return lines.join('\n')
}

async function main() {
  const lastmod = new Date().toISOString().slice(0, 10)
  const xml = buildSitemap(lastmod)
  await writeFile(outFile, xml, 'utf8')
  console.log(`Sitemap généré (${SITEMAP_PAGES.length * PRERENDER_LOCALES.length} URLs) → ${outFile}`)
  console.log(`lastmod=${lastmod}`)
}

main().catch((error) => {
  console.error('Génération sitemap échouée:', error)
  process.exit(1)
})
