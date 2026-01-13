import { NavLink } from 'react-router-dom'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTheme } from '../../contexts/ThemeContext'
import { companyInfo, contactInfo, programmes } from '../../data/siteContent'
import { WhatsAppIcon, FacebookIcon, LinkedInIcon, InstagramIcon } from '../icons/SocialIcons'

function Footer() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  return (
    <footer className="border-t border-slate-200 bg-slate-50/80 py-12 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Colonne 1: À Propos */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="mb-4 inline-flex items-center gap-2 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105">
                <span className="font-display text-lg font-bold">K</span>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                  {companyInfo.name}
                </p>
              </div>
            </NavLink>
            <p className="mb-2 text-sm font-semibold text-brand-600 dark:text-brand-400">
              {companyInfo.slogan}
            </p>
            <p className="mb-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {language === 'fr'
                ? 'KOBE Corporation - Votre partenaire technologique pour transformer vos idées en solutions logicielles innovantes.'
                : 'KOBE Corporation - Your technology partner to transform ideas into innovative software solutions.'}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="flex items-center gap-1.5 rounded-lg border-2 border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-brand-500 hover:bg-brand-100 hover:text-brand-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:bg-brand-900/50 dark:hover:text-brand-300"
                aria-label="Changer de langue"
              >
                <GlobeAltIcon className="h-4 w-4" />
                <span className="uppercase">{language}</span>
              </button>
              <button
                onClick={toggleTheme}
                className="rounded-lg border-2 border-slate-300 bg-white p-1.5 text-slate-700 shadow-sm transition-all duration-200 hover:border-brand-500 hover:bg-brand-100 hover:text-brand-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:bg-brand-900/50 dark:hover:text-brand-300"
                aria-label="Changer de thème"
              >
                {theme === 'light' ? (
                  <MoonIcon className="h-4 w-4" />
                ) : (
                  <SunIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Colonne 2: Navigation Rapide */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
              {t('footer.quickLinks')}
            </h3>
            <nav className="space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded ${
                    isActive
                      ? 'text-brand-700 font-semibold dark:text-brand-400'
                      : 'text-slate-700 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400'
                  }`
                }
              >
                {t('nav.home')}
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `block text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded ${
                    isActive
                      ? 'text-brand-700 font-semibold dark:text-brand-400'
                      : 'text-slate-700 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400'
                  }`
                }
              >
                {t('nav.services')}
              </NavLink>
              <NavLink
                to="/programmes"
                className={({ isActive }) =>
                  `block text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded ${
                    isActive
                      ? 'text-brand-700 font-semibold dark:text-brand-400'
                      : 'text-slate-700 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400'
                  }`
                }
              >
                {t('nav.programs')}
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded ${
                    isActive
                      ? 'text-brand-700 font-semibold dark:text-brand-400'
                      : 'text-slate-700 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400'
                  }`
                }
              >
                {t('nav.about')}
              </NavLink>
              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  `block text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded ${
                    isActive
                      ? 'text-brand-700 font-semibold dark:text-brand-400'
                      : 'text-slate-700 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400'
                  }`
                }
              >
                {t('nav.portfolio')}
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded ${
                    isActive
                      ? 'text-brand-700 font-semibold dark:text-brand-400'
                      : 'text-slate-700 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400'
                  }`
                }
              >
                {t('nav.contact')}
              </NavLink>
            </nav>
          </div>

          {/* Colonne 3: Programmes */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
              {t('footer.programs')}
            </h3>
            <nav className="space-y-2">
              {programmes.map((programme) => (
                <NavLink
                  key={programme.id}
                  to={`/programmes#${programme.id}`}
                  className="block text-sm text-slate-700 transition-all duration-200 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded dark:text-slate-300 dark:hover:text-brand-400"
                >
                  {language === 'fr' ? programme.title : programme.titleEn}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Colonne 4: Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
              {t('nav.contact')}
            </h3>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="mt-0.5 text-brand-600 dark:text-brand-400">{info.icon}</div>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-sm text-slate-700 transition-colors duration-200 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded dark:text-slate-300 dark:hover:text-brand-400"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {info.value}
                    </p>
                  )}
                </div>
              ))}
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {t('footer.available247')}
              </p>
            </div>
          </div>
        </div>

        {/* Section Réseaux Sociaux et Copyright */}
        <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-700">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
                {t('footer.followUs')}
              </h3>
              <div className="flex gap-3">
                <a
                  href={companyInfo.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-slate-300 bg-white text-[#25D366] transition-all duration-200 hover:scale-110 hover:border-[#25D366] hover:bg-[#25D366]/15 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 dark:border-slate-600 dark:bg-slate-800 dark:text-[#25D366] dark:hover:border-[#25D366] dark:hover:bg-[#25D366]/20"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="h-6 w-6" />
                </a>
                <a
                  href={companyInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-slate-300 bg-white text-[#1877F2] transition-all duration-200 hover:scale-110 hover:border-[#1877F2] hover:bg-[#1877F2]/15 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2]/30 dark:border-slate-600 dark:bg-slate-800 dark:text-[#1877F2] dark:hover:border-[#1877F2] dark:hover:bg-[#1877F2]/20"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-6 w-6" />
                </a>
                <a
                  href={companyInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-slate-300 bg-white text-[#0A66C2] transition-all duration-200 hover:scale-110 hover:border-[#0A66C2] hover:bg-[#0A66C2]/15 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/30 dark:border-slate-600 dark:bg-slate-800 dark:text-[#0A66C2] dark:hover:border-[#0A66C2] dark:hover:bg-[#0A66C2]/20"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-6 w-6" />
                </a>
                <a
                  href={companyInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-slate-300 bg-white text-[#E4405F] transition-all duration-200 hover:scale-110 hover:border-[#E4405F] hover:bg-[#E4405F]/15 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E4405F]/30 dark:border-slate-600 dark:bg-slate-800 dark:text-[#E4405F] dark:hover:border-[#E4405F] dark:hover:bg-[#E4405F]/20"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <p className="mb-2 font-medium text-slate-700 dark:text-slate-300">{t('footer.copyright')}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded dark:hover:text-brand-400"
                >
                  {t('footer.legal.privacy')}
                </a>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded dark:hover:text-brand-400"
                >
                  {t('footer.legal.terms')}
                </a>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded dark:hover:text-brand-400"
                >
                  {t('footer.legal.cookies')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
