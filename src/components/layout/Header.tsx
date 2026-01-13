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
  'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-brand-700 hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20'

const activeClass = 'text-slate-900 bg-brand-100 font-semibold shadow-sm'
const inactiveClass = 'text-slate-700'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/98 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded-lg"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 p-1.5">
            <img
              src={logoImage}
              alt={`${companyInfo.name} Logo`}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-xl font-semibold text-slate-900">
              {companyInfo.name}
            </p>
            <p className="text-xs text-slate-600">
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
            className="flex items-center gap-1.5 rounded-full border-2 border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-brand-500 hover:bg-brand-100 hover:text-brand-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            <GlobeAltIcon className="h-4 w-4 text-slate-700" />
            <span className="uppercase text-slate-700">{language}</span>
          </button>

          {/* CTA Button */}
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-brand-600 hover:to-brand-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50"
          >
            {t('nav.startProject')}
            <ArrowRightIcon className="h-4 w-4 text-white" />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center gap-1 rounded-full border-2 border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-brand-500 hover:bg-brand-100 hover:text-brand-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/30 lg:hidden"
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-5 w-5 text-slate-700" />
          ) : (
            <Bars3Icon className="h-5 w-5 text-slate-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white/98 backdrop-blur-md lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${
                  isActive
                    ? 'bg-brand-100 text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${
                  isActive
                    ? 'bg-brand-100 text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.services')}
            </NavLink>
            <NavLink
              to="/programmes"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${
                  isActive
                    ? 'bg-brand-100 text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.programs')}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${
                  isActive
                    ? 'bg-brand-100 text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </NavLink>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${
                  isActive
                    ? 'bg-brand-100 text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.portfolio')}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${
                  isActive
                    ? 'bg-brand-100 text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </NavLink>
            <div className="flex items-center gap-2 border-t border-slate-200 pt-4">
              <button
                onClick={toggleLanguage}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:border-brand-500 hover:bg-brand-100 hover:text-brand-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              >
                <GlobeAltIcon className="h-4 w-4 text-slate-700" />
                <span className="uppercase text-slate-700">{language}</span>
              </button>
            </div>
            <NavLink
              to="/contact"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-brand-600 hover:to-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.startProject')}
              <ArrowRightIcon className="h-4 w-4 text-white" />
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
