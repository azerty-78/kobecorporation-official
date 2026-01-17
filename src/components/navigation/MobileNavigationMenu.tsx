import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { NavItem } from '../../data/navigation'

interface MobileNavigationMenuProps {
  items: NavItem[]
  onClose: () => void
}

export function MobileNavigationMenu({ items, onClose }: MobileNavigationMenuProps) {
  const { t } = useLanguage()
  const location = useLocation()
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (path: string) => {
    setOpenItems((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    )
  }

  const handleNavClick = (path: string, anchor?: string) => {
    if (anchor) {
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
        window.location.href = `${path}#${anchor}`
      }
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
                  className={`relative flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
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
                {isOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-neutral-200 pl-4">
                    {item.sections?.map((section) => (
                      <button
                        key={section.anchor}
                        onClick={() => handleNavClick(item.path, section.anchor)}
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-neutral-600 transition-colors duration-200 hover:bg-neutral-50 hover:text-brand-500"
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`relative block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                  isActive
                    ? 'text-brand-500 font-semibold'
                    : 'bg-transparent text-neutral-700 hover:bg-neutral-50 hover:text-brand-500'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-4 h-0.5 w-8 rounded-full bg-brand-500" />
                )}
              </NavLink>
            )}
          </div>
        )
      })}
    </nav>
  )
}
