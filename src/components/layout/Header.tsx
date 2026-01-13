import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTheme } from '../../contexts/ThemeContext'
import { companyInfo } from '../../data/siteContent'

const navLinkBase =
  'rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-400'

const activeClass = 'text-brand-600 dark:text-brand-400'
const inactiveClass = 'text-slate-700 dark:text-slate-300'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur dark:border-slate-800/50 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft">
            <span className="font-display text-lg">K</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-xl text-ink dark:text-white">
              {companyInfo.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
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
        <div className="hidden items-center gap-3 lg:flex">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-600 dark:hover:text-brand-400"
            aria-label="Changer de langue"
          >
            <GlobeAltIcon className="h-4 w-4" />
            <span className="uppercase">{language}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-600 dark:hover:text-brand-400"
            aria-label="Changer de thème"
          >
            {theme === 'light' ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </button>

          {/* Phone (Desktop) */}
          <a
            href={`tel:${companyInfo.contact.phone}`}
            className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-600 dark:hover:text-brand-400 xl:flex"
          >
            {companyInfo.contact.phone}
          </a>

          {/* CTA Button */}
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
          >
            {t('nav.startProject')}
            <ArrowRightIcon className="h-4 w-4" />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 lg:hidden"
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <Bars3Icon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.services')}
            </NavLink>
            <NavLink
              to="/programmes"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.programs')}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </NavLink>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.portfolio')}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </NavLink>
            <div className="flex items-center gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
              <button
                onClick={toggleLanguage}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-600 dark:hover:text-brand-400"
              >
                <GlobeAltIcon className="h-4 w-4" />
                <span className="uppercase">{language}</span>
              </button>
              <button
                onClick={toggleTheme}
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-600 dark:hover:text-brand-400"
              >
                {theme === 'light' ? (
                  <MoonIcon className="h-5 w-5" />
                ) : (
                  <SunIcon className="h-5 w-5" />
                )}
              </button>
              <a
                href={`tel:${companyInfo.contact.phone}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-600 dark:hover:text-brand-400"
              >
                {companyInfo.contact.phone}
              </a>
            </div>
            <NavLink
              to="/contact"
              className="mt-2 block rounded-lg bg-ink px-4 py-2.5 text-center text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.startProject')}
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
