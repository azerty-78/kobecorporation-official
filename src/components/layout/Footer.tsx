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
    <footer className="border-t border-slate-200 bg-white/90 py-12 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Colonne 1: À Propos */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="mb-4 inline-flex items-center gap-2 transition-transform duration-200 hover:scale-105">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg">
                <span className="font-display text-lg font-bold">K</span>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-ink dark:text-white">
                  {companyInfo.name}
                </p>
              </div>
            </NavLink>
            <p className="mb-2 text-sm font-semibold text-brand-600 dark:text-brand-400">
              {companyInfo.slogan}
            </p>
            <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {language === 'fr'
                ? 'KOBE Corporation - Votre partenaire technologique pour transformer vos idées en solutions logicielles innovantes.'
                : 'KOBE Corporation - Your technology partner to transform ideas into innovative software solutions.'}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-600 dark:hover:bg-brand-900/20 dark:hover:text-brand-400"
                aria-label="Changer de langue"
              >
                <GlobeAltIcon className="h-4 w-4" />
                <span className="uppercase font-semibold">{language}</span>
              </button>
              <button
                onClick={toggleTheme}
                className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-700 shadow-sm transition-all duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-600 dark:hover:bg-brand-900/20 dark:hover:text-brand-400"
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink dark:text-white">
              {t('footer.quickLinks')}
            </h3>
            <nav className="space-y-2">
              <NavLink
                to="/"
                className="block text-sm text-slate-600 transition-colors duration-200 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                {t('nav.home')}
              </NavLink>
              <NavLink
                to="/services"
                className="block text-sm text-slate-600 transition-colors duration-200 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                {t('nav.services')}
              </NavLink>
              <NavLink
                to="/programmes"
                className="block text-sm text-slate-600 transition-colors duration-200 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                {t('nav.programs')}
              </NavLink>
              <NavLink
                to="/about"
                className="block text-sm text-slate-600 transition-colors duration-200 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                {t('nav.about')}
              </NavLink>
              <NavLink
                to="/portfolio"
                className="block text-sm text-slate-600 transition-colors duration-200 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                {t('nav.portfolio')}
              </NavLink>
              <NavLink
                to="/contact"
                className="block text-sm text-slate-600 transition-colors duration-200 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
              >
                {t('nav.contact')}
              </NavLink>
            </nav>
          </div>

          {/* Colonne 3: Programmes */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink dark:text-white">
              {t('footer.programs')}
            </h3>
            <nav className="space-y-2">
              {programmes.map((programme) => (
                <NavLink
                  key={programme.id}
                  to={`/programmes#${programme.id}`}
                  className="block text-sm text-slate-600 transition-colors duration-200 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                >
                  {language === 'fr' ? programme.title : programme.titleEn}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Colonne 4: Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink dark:text-white">
              {t('nav.contact')}
            </h3>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="mt-0.5 text-brand-500">{info.icon}</div>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-sm text-slate-600 transition-colors duration-200 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {info.value}
                    </p>
                  )}
                </div>
              ))}
              <p className="text-xs text-slate-500 dark:text-slate-500">
                {t('footer.available247')}
              </p>
            </div>
          </div>
        </div>

        {/* Section Réseaux Sociaux et Copyright */}
        <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink dark:text-white">
                {t('footer.followUs')}
              </h3>
              <div className="flex gap-3">
                <a
                  href={companyInfo.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#25D366] transition-all duration-200 hover:scale-110 hover:border-[#25D366] hover:bg-[#25D366]/10 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-[#25D366]"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="h-6 w-6" />
                </a>
                <a
                  href={companyInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#1877F2] transition-all duration-200 hover:scale-110 hover:border-[#1877F2] hover:bg-[#1877F2]/10 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-[#1877F2]"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-6 w-6" />
                </a>
                <a
                  href={companyInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0A66C2] transition-all duration-200 hover:scale-110 hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-[#0A66C2]"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-6 w-6" />
                </a>
                <a
                  href={companyInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#E4405F] transition-all duration-200 hover:scale-110 hover:border-[#E4405F] hover:bg-[#E4405F]/10 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-[#E4405F]"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <p className="mb-2">{t('footer.copyright')}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-brand-600 dark:hover:text-brand-400"
                >
                  {t('footer.legal.privacy')}
                </a>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-brand-600 dark:hover:text-brand-400"
                >
                  {t('footer.legal.terms')}
                </a>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-brand-600 dark:hover:text-brand-400"
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
