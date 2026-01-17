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
import logoImage from '../../assets/logo/kobe_corp_logo-nbgpng.png'

const navLinkBase =
  'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-white/20'

const activeClass = 'text-brand-400 font-semibold'
const inactiveClass = 'text-white hover:text-brand-400'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md shadow-sm" style={{ backgroundColor: '#000000' }}>
      <div className="mx-auto flex h-auto min-h-16 max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-2.5 lg:px-8 lg:py-0 lg:h-16">
        {/* Logo avec Nom et Slogan - Toujours visible même en mobile */}
        <NavLink
          to="/"
          className="flex min-w-0 flex-1 items-center gap-2 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-transparent transition-all duration-200 hover:scale-105 p-1 sm:h-10 sm:w-10">
            <img
              src={logoImage}
              alt={`${companyInfo.name} Logo`}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-semibold text-white sm:text-base lg:text-xl">
              {companyInfo.name}
            </p>
            <p className="truncate text-[10px] font-semibold text-brand-400 sm:text-xs">
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
            className="flex items-center gap-1.5 rounded-full border-2 border-white/20 bg-transparent px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:border-white/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/30 group"
            aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            <GlobeAltIcon className="h-4 w-4 text-white transition-colors duration-300 group-hover:text-brand-400" />
            <span className="uppercase text-white">{language}</span>
          </button>

          {/* CTA Button */}
          <a
            href="https://ben-djibril.kobecorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[rgb(31,41,55)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgb(15,23,42)] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50"
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
            className="flex items-center justify-center rounded-full border-2 border-white/20 bg-transparent p-2 text-white shadow-sm transition-all duration-200 hover:border-white/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/30 group"
            aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            <GlobeAltIcon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-brand-400" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-full border-2 border-white/20 bg-transparent p-2 text-white shadow-sm transition-all duration-200 hover:border-white/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/30 group"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-brand-400" />
            ) : (
              <Bars3Icon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-brand-400" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 backdrop-blur-md lg:hidden" style={{ backgroundColor: '#000000' }}>
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                  isActive
                    ? 'bg-transparent text-brand-400'
                    : 'bg-transparent text-white hover:text-brand-400'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                  isActive
                    ? 'bg-transparent text-brand-400'
                    : 'bg-transparent text-white hover:text-brand-400'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.services')}
            </NavLink>
            <NavLink
              to="/programmes"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                  isActive
                    ? 'bg-transparent text-brand-400'
                    : 'bg-transparent text-white hover:text-brand-400'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.programs')}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                  isActive
                    ? 'bg-transparent text-brand-400'
                    : 'bg-transparent text-white hover:text-brand-400'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </NavLink>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                  isActive
                    ? 'bg-transparent text-brand-400'
                    : 'bg-transparent text-white hover:text-brand-400'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.portfolio')}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                  isActive
                    ? 'bg-transparent text-brand-400'
                    : 'bg-transparent text-white hover:text-brand-400'
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
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[rgb(31,41,55)] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[rgb(15,23,42)] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50"
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
