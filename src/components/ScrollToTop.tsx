import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Si il y a un hash dans l'URL, on laisse le comportement par défaut
    // (le navigateur scrollera vers l'élément avec cet ID)
    if (hash) {
      // Attendre que le DOM soit prêt
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          // Calculer la position en tenant compte du header fixe
          const headerOffset = 80 // Hauteur approximative du header
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }
      }, 100)
    } else {
      // Sinon, scroll vers le haut de la page
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
