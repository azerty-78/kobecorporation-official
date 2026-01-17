import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import type { NavItem } from '../../data/navigation'

interface MobileNavigationMenuProps {
  items: NavItem[]
  onClose: () => void
}

export function MobileNavigationMenu({ items, onClose }: MobileNavigationMenuProps) {
  const { t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const [openItems, setOpenItems] = useState<string[]>([])
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const toggleItem = (path: string) => {
    setOpenItems((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    )
  }

  const handleNavClick = (path: string, anchor?: string) => {
    if (anchor) {
      // Si on est déjà sur la page, scroll vers la section
      if (location.pathname === path) {
        setTimeout(() => {
          const element = document.getElementById(anchor)
          if (element) {
            const headerOffset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            })
            // Mettre à jour l'URL avec le hash
            window.history.replaceState(null, '', `${path}#${anchor}`)
          }
        }, 100)
      } else {
        // Sinon, naviguer puis scroll après chargement
        navigate(`${path}#${anchor}`)
        setTimeout(() => {
          const element = document.getElementById(anchor)
          if (element) {
            const headerOffset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            })
          }
        }, 300)
      }
    } else {
      // Si pas d'ancre, naviguer vers la page
      navigate(path)
    }
    onClose()
  }

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const hasSections = item.sections && item.sections.length > 0
        const isOpen = openItems.includes(item.path)
        const isActive = location.pathname === item.path

        return (
          <div key={item.path}>
            {hasSections ? (
              <>
                <button
                  onClick={() => toggleItem(item.path)}
                  className={`relative flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none ${
                    isActive
                      ? 'text-brand-500 font-semibold'
                      : 'bg-transparent text-neutral-700 hover:bg-neutral-50 hover:text-brand-500'
                  }`}
                >
                  {isActive && (
                    <span className="absolute bottom-0 left-4 h-0.5 w-8 rounded-full bg-brand-500" />
                  )}
                  <span>{item.label}</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  ref={(el) => (sectionRefs.current[item.path] = el)}
                  className={`ml-4 overflow-hidden border-l-2 border-neutral-200 pl-4 transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <div className="space-y-1">
                    {item.sections?.map((section, index) => {
                      // Vérifier si cette section est actuellement visible (basé sur le hash de l'URL)
                      const currentHash = window.location.hash.replace('#', '')
                      const isSectionActive = location.pathname === item.path && currentHash === section.anchor
                      
                      return (
                        <button
                          key={section.anchor}
                          onClick={() => handleNavClick(item.path, section.anchor)}
                          className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 focus:outline-none ${
                            isSectionActive
                              ? 'text-brand-500 font-semibold'
                              : 'text-neutral-600 hover:bg-neutral-50 hover:text-brand-500'
                          }`}
                          style={{
                            animation: isOpen ? `slideInLeft 0.3s ease-out ${index * 0.05}s both` : 'none',
                          }}
                        >
                          {section.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate(item.path)
                  onClose()
                }}
                className={`relative block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'text-brand-500 font-semibold'
                    : 'bg-transparent text-neutral-700 hover:bg-neutral-50 hover:text-brand-500'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-4 h-0.5 w-8 rounded-full bg-brand-500" />
                )}
              </button>
            )}
          </div>
        )
      })}
    </nav>
  )
}
