import { useState, useEffect } from 'react'
import type { ImgHTMLAttributes, CSSProperties } from 'react'
import { deriveLocalFormatSources } from '../utils/imageUrl'

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  /** Variante WebP explicite (imports Vite hashés). Sinon dérivée pour les chemins /public. */
  webpSrc?: string
  /** Variante AVIF explicite (imports Vite hashés). */
  avifSrc?: string
  priority?: 'high' | 'low' | 'auto'
  className?: string
}

/**
 * Image optimisée SEO / perf :
 * - <picture> avec AVIF → WebP → raster original
 * - Lazy / eager selon priority
 * - width/height (+ aspect-ratio) pour limiter le CLS
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  webpSrc,
  avifSrc,
  priority = 'auto',
  className = '',
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  const derived = deriveLocalFormatSources(src)
  const avif = avifSrc ?? derived.avif
  const webp = webpSrc ?? derived.webp
  const usePicture = Boolean(avif || webp)

  const fetchPriority = priority === 'high' ? 'high' : priority === 'low' ? 'low' : undefined
  const loading = priority === 'high' ? 'eager' : priority === 'low' ? 'lazy' : undefined
  const decoding = priority === 'high' ? 'sync' : 'async'

  const sizingStyle: CSSProperties | undefined =
    width && height
      ? { aspectRatio: `${width} / ${height}`, ...style }
      : style

  useEffect(() => {
    if (priority === 'high' && src) {
      const img = new Image()
      img.onload = () => setIsLoaded(true)
      img.onerror = () => setError(true)
      img.src = src
    }
  }, [src, priority])

  const imgClassName = `${className} ${!isLoaded && !error ? 'opacity-0 bg-neutral-100' : 'opacity-100'} transition-opacity duration-300`

  const image = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      className={imgClassName}
      style={sizingStyle}
      onLoad={() => setIsLoaded(true)}
      onError={() => setError(true)}
      {...props}
    />
  )

  if (!usePicture) {
    return image
  }

  return (
    <picture className="contents">
      {avif ? <source type="image/avif" srcSet={avif} /> : null}
      {webp ? <source type="image/webp" srcSet={webp} /> : null}
      {image}
    </picture>
  )
}
