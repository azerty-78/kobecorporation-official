import { useEffect, useRef, useState } from 'react'
import { useDeviceType } from './useDeviceType'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  disableOnMobile?: boolean
  delay?: number
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true,
    disableOnMobile = false,
    delay = 0,
  } = options

  const deviceType = useDeviceType()
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const isMobile = deviceType === 'mobile' || deviceType === 'tablet'

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Sur mobile, si désactivé, rendre visible immédiatement
    if (isMobile && disableOnMobile) {
      setIsVisible(true)
      return
    }

    // Optimisation: utiliser un délai pour éviter de multiples vérifications
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Utiliser requestAnimationFrame pour optimiser les performances
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        
        timeoutId = setTimeout(() => {
          requestAnimationFrame(() => {
            if (entry.isIntersecting) {
              if (delay > 0) {
                setTimeout(() => {
                  setIsVisible(true)
                  if (triggerOnce) {
                    observer.unobserve(element)
                  }
                }, delay)
              } else {
                setIsVisible(true)
                if (triggerOnce) {
                  observer.unobserve(element)
                }
              }
            } else if (!triggerOnce) {
              setIsVisible(false)
            }
          })
        }, isMobile ? 50 : 0) // Délai plus court sur mobile
      },
      {
        threshold: isMobile ? Math.max(threshold, 0.05) : threshold, // Threshold plus bas sur mobile
        rootMargin: isMobile ? '0px 0px -50px 0px' : rootMargin, // Marge réduite sur mobile
      }
    )

    observer.observe(element)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce, disableOnMobile, delay, isMobile])

  return { elementRef, isVisible }
}
