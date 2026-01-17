import { useState, useEffect } from 'react'
import type { ImgHTMLAttributes } from 'react'

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: 'high' | 'low' | 'auto'
  className?: string
}

/**
 * Composant Image optimisé pour le SEO et les performances
 * - Lazy loading automatique
 * - Gestion du CLS avec width/height
 * - Support des formats modernes (WebP/AVIF)
 * - Fetch priority pour les images critiques
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = 'auto',
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Déterminer fetchPriority
  const fetchPriority = priority === 'high' ? 'high' : priority === 'low' ? 'low' : undefined

  // Déterminer loading
  const loading = priority === 'high' ? 'eager' : 'lazy'

  useEffect(() => {
    // Précharger l'image si elle est prioritaire
    if (priority === 'high' && src) {
      const img = new Image()
      img.onload = () => setIsLoaded(true)
      img.onerror = () => setError(true)
      img.src = src
    }
  }, [src, priority])

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      className={`${className} ${!isLoaded && !error ? 'opacity-0 bg-neutral-100' : 'opacity-100'} transition-opacity duration-300`}
      onLoad={() => setIsLoaded(true)}
      onError={() => setError(true)}
      {...props}
    />
  )
}
