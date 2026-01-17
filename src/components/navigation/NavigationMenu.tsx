import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'

interface NavItem {
  label: string
  path: string
  sections?: { label: string; anchor: string }[]
}

interface NavigationMenuProps {
  items: NavItem[]
  className?: string
}

export function NavigationMenu({ items, className = '' }: NavigationMenuProps) {
  const { t } = useLanguage()
  const location = useLocation()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(dropdownRefs.current).forEach((key) => {
        if (
          dropdownRefs.current[key] &&
          !dropdownRefs.current[key]?.contains(event.target as Node)
        ) {
          setOpenDropdown(null)
        }
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
          }
        }, 100)
      } else {
        // Sinon, naviguer puis scroll après chargement
        window.location.href = `${path}#${anchor}`
      }
    }
    setOpenDropdown(null)
  }

  return (
    <nav className={`flex items-center gap-1 ${className}`}>
      {items.map((item) => {
        const hasSections = item.sections && item.sections.length > 0
        const isOpen = openDropdown === item.path

        if (hasSections) {
          return (
            <div
              key={item.path}
              ref={(el) => (dropdownRefs.current[item.path] = el)}
              className="relative"
            >
              <button
                onClick={() => setOpenDropdown(isOpen ? null : item.path)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                  location.pathname === item.path
                    ? 'text-brand-500 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50 hover:text-brand-500'
                }`}
              >
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-brand-500" />
                )}
                <span className="flex items-center gap-1.5">
                  {item.label}
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </span>
              </button>

              {isOpen && (
                <div
                  className="absolute top-full left-0 mt-2 min-w-[200px] rounded-xl border border-neutral-200 bg-white shadow-card-hover z-50"
                  style={{ zIndex: 50 }}
                >
                  <div className="py-2">
                    {item.sections?.map((section) => (
                      <button
                        key={section.anchor}
                        onClick={() => handleNavClick(item.path, section.anchor)}
                        className="block w-full px-4 py-2 text-left text-sm text-neutral-600 transition-colors duration-200 hover:bg-neutral-50 hover:text-brand-500"
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        }

        const isActive = location.pathname === item.path
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
              isActive
                ? 'text-brand-500 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-50 hover:text-brand-500'
            }`}
          >
            {item.label}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-brand-500" />
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
