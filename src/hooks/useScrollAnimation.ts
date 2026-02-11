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
    threshold = 0.08,
    rootMargin = '0px 0px -60px 0px',
    triggerOnce = true,
    disableOnMobile = false,
    delay = 0,
  } = options

  const deviceType = useDeviceType()
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const isMobile = deviceType === 'mobile' || deviceType === 'tablet'
  const isLowPerfMode =
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('low-perf-mode')

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Sur mobile ou mode basse performance, rendre visible immédiatement
    if ((isMobile && disableOnMobile) || (isMobile && isLowPerfMode)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
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
      },
      {
        threshold: isMobile ? Math.max(threshold, 0.05) : threshold,
        rootMargin: isMobile ? '0px 0px -40px 0px' : rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce, disableOnMobile, delay, isMobile, isLowPerfMode])

  return { elementRef, isVisible }
}
