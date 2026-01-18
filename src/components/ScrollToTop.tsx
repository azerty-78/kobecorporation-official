import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const previousPathname = useRef(pathname)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Nettoyer les timeouts précédents
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    const isPathChange = previousPathname.current !== pathname
    previousPathname.current = pathname

    // Fonction pour scroller de manière invisible (sans transition visible)
    const scrollToElement = (element: HTMLElement, headerOffset: number) => {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      
      // Scroll immédiat sans animation
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        left: 0,
        behavior: 'auto',
      })
    }

    // Si changement de page (pas juste de hash), scroll au top
    if (isPathChange && !hash) {
      // Attendre que le loader soit affiché avant de scroller
      // pour éviter de voir la transition
      scrollTimeoutRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto',
          })
        })
      }, 50)
      return
    }

    // Si il y a un hash dans l'URL, scroll vers l'élément
    if (hash) {
      const checkAndScroll = () => {
        const element = document.querySelector(hash) as HTMLElement
        if (element) {
          const headerOffset = 80
          scrollToElement(element, headerOffset)
          return true
        }
        return false
      }

      // Essayer plusieurs fois avec des délais progressifs
      let attempts = 0
      const maxAttempts = 10

      const tryScroll = () => {
        attempts++
        if (checkAndScroll() || attempts >= maxAttempts) {
          return
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          tryScroll()
        }, 50 * attempts) // Délai progressif
      }

      // Démarrer après un petit délai pour laisser le DOM se mettre à jour
      scrollTimeoutRef.current = setTimeout(() => {
        tryScroll()
      }, 100)

      return () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
      }
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
