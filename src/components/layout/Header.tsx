import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { companyInfo } from '../../data/siteContent'
import logoImage from '../../assets/logo/kobe_corp_logo.jpeg'

const navLinkBase =
  'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-500/20'

const activeClass = 'text-brand-500 font-semibold bg-brand-50'
const inactiveClass = 'text-neutral-700 hover:text-brand-500 hover:bg-neutral-50'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md shadow-subtle">
      <div className="mx-auto flex h-auto min-h-16 max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-2.5 lg:px-8 lg:py-0 lg:h-16">
        {/* Logo avec Nom et Slogan - Toujours visible même en mobile */}
        <NavLink
          to="/"
          className="flex min-w-0 flex-1 items-center gap-2 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-transparent transition-all duration-200 hover:scale-105 p-1 sm:h-12 sm:w-12">
            <img
              src={logoImage}
              alt={`${companyInfo.name} Logo`}
              className="h-full w-full rounded-lg object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-semibold text-ink sm:text-base lg:text-xl">
              {companyInfo.name}
            </p>
            <p className="truncate text-[10px] font-semibold text-brand-500 sm:text-xs">
              {companyInfo.slogan}
            </p>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : inactiveClass}`
            }
          >
            {t('nav.home')}
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : inactiveClass}`
            }
          >
            {t('nav.services')}
          </NavLink>
          <NavLink
            to="/programmes"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : inactiveClass}`
            }
          >
            {t('nav.programs')}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : inactiveClass}`
            }
          >
            {t('nav.about')}
          </NavLink>
          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : inactiveClass}`
            }
          >
            {t('nav.portfolio')}
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : inactiveClass}`
            }
          >
            {t('nav.contact')}
          </NavLink>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-subtle transition-all duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/20 group"
            aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            <GlobeAltIcon className="h-4 w-4 text-neutral-600 transition-colors duration-300 group-hover:text-brand-500" />
            <span className="uppercase text-neutral-700 group-hover:text-brand-600">{language}</span>
          </button>

          {/* CTA Button */}
          <a
            href="https://ben-djibril.kobecorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50"
          >
            {t('nav.chatWithBen')}
            <ArrowRightIcon className="h-4 w-4 text-white" />
          </a>
        </div>

        {/* Mobile Actions - Toujours visible */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          {/* Language Switcher Mobile */}
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center rounded-full border border-neutral-200 bg-white p-2 text-neutral-700 shadow-subtle transition-all duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/20 group"
            aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            <GlobeAltIcon className="h-5 w-5 text-neutral-600 transition-colors duration-300 group-hover:text-brand-500" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white p-2 text-neutral-700 shadow-subtle transition-all duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/20 group"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-5 w-5 text-neutral-700 transition-colors duration-300 group-hover:text-brand-500" />
            ) : (
              <Bars3Icon className="h-5 w-5 text-neutral-700 transition-colors duration-300 group-hover:text-brand-500" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-neutral-200 bg-white backdrop-blur-md lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                  isActive
                    ? 'bg-brand-50 text-brand-500 font-semibold'
                    : 'bg-transparent text-neutral-700 hover:bg-neutral-50 hover:text-brand-500'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                  isActive
                    ? 'bg-brand-50 text-brand-500 font-semibold'
                    : 'bg-transparent text-neutral-700 hover:bg-neutral-50 hover:text-brand-500'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.services')}
            </NavLink>
            <NavLink
              to="/programmes"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                  isActive
                    ? 'bg-brand-50 text-brand-500 font-semibold'
                    : 'bg-transparent text-neutral-700 hover:bg-neutral-50 hover:text-brand-500'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.programs')}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                  isActive
                    ? 'bg-brand-50 text-brand-500 font-semibold'
                    : 'bg-transparent text-neutral-700 hover:bg-neutral-50 hover:text-brand-500'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </NavLink>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                  isActive
                    ? 'bg-brand-50 text-brand-500 font-semibold'
                    : 'bg-transparent text-neutral-700 hover:bg-neutral-50 hover:text-brand-500'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.portfolio')}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                  isActive
                    ? 'bg-brand-50 text-brand-500 font-semibold'
                    : 'bg-transparent text-neutral-700 hover:bg-neutral-50 hover:text-brand-500'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </NavLink>
            <a
              href="https://ben-djibril.kobecorporation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-brand-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.chatWithBen')}
              <ArrowRightIcon className="h-4 w-4 text-white" />
            </a>
          </nav>
      </div>
      )}
    </header>
  )
}

export default Header
