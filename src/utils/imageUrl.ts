/**
 * Helpers URLs images (Unsplash + dérivation WebP/AVIF pour assets locaux).
 */

const RASTER_EXT_RE = /\.(png|jpe?g)(\?.*)?$/i

/** Ajoute auto=format aux URLs Unsplash (WebP/AVIF selon Accept). */
export function withUnsplashAutoFormat(url: string): string {
  if (!url.includes('images.unsplash.com')) return url
  if (/[?&]auto=format(?:&|$)/.test(url)) return url
  return url.includes('?') ? `${url}&auto=format` : `${url}?auto=format`
}

export interface DerivedImageSources {
  avif?: string
  webp?: string
}

/**
 * Pour un chemin local /logo-nom.jpeg → { avif, webp }.
 * Ignore les URLs absolues http(s) et les modules Vite hashés (passer webpSrc/avifSrc).
 */
export function deriveLocalFormatSources(src: string): DerivedImageSources {
  if (!src || /^https?:\/\//i.test(src)) return {}
  // Assets Vite hashés : foo.AbCd1234.png — le .webp n'a pas le même hash
  if (/\.[A-Za-z0-9_-]{6,}\.(png|jpe?g)$/i.test(src)) return {}
  if (!RASTER_EXT_RE.test(src)) return {}

  return {
    avif: src.replace(RASTER_EXT_RE, '.avif$2'),
    webp: src.replace(RASTER_EXT_RE, '.webp$2'),
  }
}
