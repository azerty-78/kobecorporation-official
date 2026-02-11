import { useEffect, useState } from 'react'

interface PageLoaderProps {
  isLoading: boolean
  onComplete?: () => void
}

export function PageLoader({ isLoading, onComplete }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isLoading) {
      // Petit délai pour éviter les flashes sur navigations très rapides
      const showTimer = setTimeout(() => {
        setShouldRender(true)
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      }, 80)
      return () => clearTimeout(showTimer)
    } else {
      setIsVisible(false)
      // Masquer légèrement après le fade-out pour une sortie douce
      const timer = setTimeout(() => {
        setShouldRender(false)
        onComplete?.()
      }, 180)
      return () => clearTimeout(timer)
    }
  }, [isLoading, onComplete])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-white/55 via-white/35 to-white/55 backdrop-blur-[1px] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        willChange: 'opacity',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
      aria-hidden={!isLoading}
      aria-label="Chargement de la page"
    >
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/70 bg-white/80 px-6 py-5 shadow-soft">
        {/* Spinner principal */}
        <div className="relative h-16 w-16">
          <div
            className="absolute inset-0 animate-spin rounded-full border-4 border-brand-200 border-t-transparent"
            style={{
              animationDuration: '0.8s',
              willChange: 'transform',
            }}
          />
          <div
            className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-500"
            style={{
              animationDuration: '1.2s',
              animationDirection: 'reverse',
              willChange: 'transform',
            }}
          />
        </div>
        
        {/* Texte de chargement optionnel */}
        <p className="text-sm font-medium text-neutral-600 animate-pulse-soft">
          Chargement...
        </p>
      </div>
    </div>
  )
}
