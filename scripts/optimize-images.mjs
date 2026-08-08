import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const INPUT_DIRS = [
  path.join(rootDir, 'public'),
  path.join(rootDir, 'src', 'assets'),
]

const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg'])

/**
 * Génère des variantes .webp et .avif à côté de chaque raster source.
 * Les originaux sont conservés tels quels (fallback <img>).
 */
async function collectRasters(dir) {
  /** @type {string[]} */
  const files = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return files
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectRasters(full)))
      continue
    }
    const ext = path.extname(entry.name).toLowerCase()
    if (RASTER_EXT.has(ext)) files.push(full)
  }
  return files
}

async function writeIfChanged(outPath, buffer) {
  try {
    const existing = await sharp(outPath).toBuffer()
    if (Buffer.compare(existing, buffer) === 0) return false
  } catch {
    // fichier absent ou illisible → écrire
  }
  await mkdir(path.dirname(outPath), { recursive: true })
  await writeFile(outPath, buffer)
  return true
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

async function optimizeOne(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const base = filePath.slice(0, -ext.length)
  const webpPath = `${base}.webp`
  const avifPath = `${base}.avif`

  const input = sharp(filePath, { failOn: 'none' })
  const meta = await input.metadata()
  const srcStat = await stat(filePath)

  // PNG avec alpha : préserver la transparence
  const hasAlpha = Boolean(meta.hasAlpha)

  const webpBuf = await sharp(filePath, { failOn: 'none' })
    .webp({ quality: 82, alphaQuality: 90, effort: 4 })
    .toBuffer()

  const avifBuf = await sharp(filePath, { failOn: 'none' })
    .avif({ quality: hasAlpha ? 60 : 55, effort: 4 })
    .toBuffer()

  const wroteWebp = await writeIfChanged(webpPath, webpBuf)
  const wroteAvif = await writeIfChanged(avifPath, avifBuf)

  const rel = path.relative(rootDir, filePath)
  console.log(
    `  ${rel} (${formatKb(srcStat.size)}) → webp ${formatKb(webpBuf.length)}${wroteWebp ? '' : ' (inchangé)'}, avif ${formatKb(avifBuf.length)}${wroteAvif ? '' : ' (inchangé)'}`,
  )

  return {
    src: srcStat.size,
    webp: webpBuf.length,
    avif: avifBuf.length,
  }
}

async function main() {
  console.log('Optimisation images → WebP + AVIF…')
  const files = (await Promise.all(INPUT_DIRS.map(collectRasters))).flat()

  if (files.length === 0) {
    console.log('Aucune image raster trouvée.')
    return
  }

  let totalSrc = 0
  let totalWebp = 0
  let totalAvif = 0

  for (const file of files) {
    const sizes = await optimizeOne(file)
    totalSrc += sizes.src
    totalWebp += sizes.webp
    totalAvif += sizes.avif
  }

  console.log(
    `Terminé: ${files.length} image(s). Originaux ${formatKb(totalSrc)} → WebP ${formatKb(totalWebp)} / AVIF ${formatKb(totalAvif)}`,
  )
}

main().catch((error) => {
  console.error('optimize-images échoué:', error)
  process.exit(1)
})
