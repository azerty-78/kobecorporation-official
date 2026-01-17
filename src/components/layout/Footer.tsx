import { NavLink } from 'react-router-dom'
import {
  GlobeAltIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCookies } from '../../contexts/CookieContext'
import { companyInfo, contactInfo, programmes } from '../../data/siteContent'
import { WhatsAppIcon, FacebookIcon, LinkedInIcon, InstagramIcon } from '../icons/SocialIcons'
import logoImage from '../../assets/logo/kobe_corp_logo.jpeg'

function Footer() {
  const { language, setLanguage, t } = useLanguage()
  const { openSettings } = useCookies()

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Colonne 1: À Propos */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="mb-4 inline-flex items-center gap-2 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-transparent transition-all duration-200 hover:scale-105 p-1.5">
                <img
                  src={logoImage}
                  alt={`${companyInfo.name} Logo`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-ink">
                  {companyInfo.name}
                </p>
              </div>
            </NavLink>
            <p className="mb-2 text-sm font-semibold text-brand-500">
              {companyInfo.slogan}
            </p>
            <p className="mb-4 text-sm leading-relaxed text-neutral-600">
              {language === 'fr'
                ? 'KOBE Corporation - Votre partenaire technologique pour transformer vos idées en solutions logicielles innovantes.'
                : 'KOBE Corporation - Your technology partner to transform ideas into innovative software solutions.'}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-subtle transition-all duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                aria-label="Changer de langue"
              >
                <GlobeAltIcon className="h-4 w-4 text-neutral-600" />
                <span className="uppercase text-neutral-700">{language}</span>
              </button>
            </div>
          </div>

          {/* Colonne 2: Navigation Rapide */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">
              {t('footer.quickLinks')}
            </h3>
            <nav className="space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded ${
                    isActive
                      ? 'text-brand-500 font-semibold'
                      : 'text-neutral-600 hover:text-brand-500'
                  }`
                }
              >
                {t('nav.home')}
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `block text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded ${
                    isActive
                      ? 'text-brand-500 font-semibold'
                      : 'text-neutral-600 hover:text-brand-500'
                  }`
                }
              >
                {t('nav.services')}
              </NavLink>
              <NavLink
                to="/programmes"
                className={({ isActive }) =>
                  `block text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded ${
                    isActive
                      ? 'text-brand-500 font-semibold'
                      : 'text-neutral-600 hover:text-brand-500'
                  }`
                }
              >
                {t('nav.programs')}
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded ${
                    isActive
                      ? 'text-brand-500 font-semibold'
                      : 'text-neutral-600 hover:text-brand-500'
                  }`
                }
              >
                {t('nav.about')}
              </NavLink>
              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  `block text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded ${
                    isActive
                      ? 'text-brand-500 font-semibold'
                      : 'text-neutral-600 hover:text-brand-500'
                  }`
                }
              >
                {t('nav.portfolio')}
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded ${
                    isActive
                      ? 'text-brand-500 font-semibold'
                      : 'text-neutral-600 hover:text-brand-500'
                  }`
                }
              >
                {t('nav.contact')}
              </NavLink>
            </nav>
          </div>

          {/* Colonne 3: Programmes */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">
              {t('footer.programs')}
            </h3>
            <nav className="space-y-2">
              {programmes.map((programme) => (
                <NavLink
                  key={programme.id}
                  to={`/programmes#${programme.id}`}
                  className="block text-sm text-neutral-600 transition-all duration-200 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded"
                >
                  {language === 'fr' ? programme.title : programme.titleEn}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Colonne 4: Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">
              {t('nav.contact')}
            </h3>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="mt-0.5 text-brand-500">{info.icon}</div>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-sm text-neutral-600 transition-colors duration-200 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm text-neutral-600">
                      {info.value}
                    </p>
                  )}
                </div>
              ))}
              <p className="text-xs text-neutral-500">
                {t('footer.available247')}
              </p>
            </div>
          </div>
        </div>

        {/* Section Réseaux Sociaux et Copyright */}
        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">
                {t('footer.followUs')}
              </h3>
              <div className="flex gap-3">
                <a
                  href={companyInfo.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-white/20 bg-transparent text-[#25D366] transition-all duration-200 hover:scale-110 hover:border-[#25D366] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#25D366]/30"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="h-6 w-6" />
                </a>
                <a
                  href={companyInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-white/20 bg-transparent text-[#1877F2] transition-all duration-200 hover:scale-110 hover:border-[#1877F2] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2]/30"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-6 w-6" />
                </a>
                <a
                  href={companyInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-white/20 bg-transparent text-[#0A66C2] transition-all duration-200 hover:scale-110 hover:border-[#0A66C2] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/30"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-6 w-6" />
                </a>
                <a
                  href={companyInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-white/20 bg-transparent text-[#E4405F] transition-all duration-200 hover:scale-110 hover:border-[#E4405F] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E4405F]/30"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div className="text-sm text-neutral-600">
              <p className="mb-2 font-medium text-neutral-700">{t('footer.copyright')}</p>
              <div className="flex flex-wrap gap-4">
                <NavLink
                  to="/privacy"
                  className="text-neutral-600 transition-colors duration-200 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded"
                >
                  {t('footer.legal.privacy')}
                </NavLink>
                <NavLink
                  to="/legal"
                  className="text-neutral-600 transition-colors duration-200 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded"
                >
                  {t('footer.legal.terms')}
                </NavLink>
                <NavLink
                  to="/terms"
                  className="text-neutral-600 transition-colors duration-200 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded"
                >
                  {language === 'fr' ? 'CGU' : 'Terms'}
                </NavLink>
                <button
                  onClick={openSettings}
                  className="text-neutral-600 transition-colors duration-200 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded"
                >
                  {t('footer.legal.cookies')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
