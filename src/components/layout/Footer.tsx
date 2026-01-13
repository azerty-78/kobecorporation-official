import { NavLink } from 'react-router-dom'
import {
  GlobeAltIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { companyInfo, contactInfo, programmes } from '../../data/siteContent'
import { WhatsAppIcon, FacebookIcon, LinkedInIcon, InstagramIcon } from '../icons/SocialIcons'
import logoImage from '../../assets/logo/kobe_corp_logo-nbgpng.png'

function Footer() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <footer className="border-t border-white/10 py-12 backdrop-blur-md" style={{ backgroundColor: '#000000' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Colonne 1: À Propos */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="mb-4 inline-flex items-center gap-2 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-transparent shadow-[0_4px_12px_rgba(255,255,255,0.15)] transition-all duration-200 hover:shadow-[0_6px_16px_rgba(255,255,255,0.25)] hover:scale-105 p-1.5">
                <img
                  src={logoImage}
                  alt={`${companyInfo.name} Logo`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  {companyInfo.name}
                </p>
              </div>
            </NavLink>
            <p className="mb-2 text-sm font-semibold text-brand-400">
              {companyInfo.slogan}
            </p>
            <p className="mb-4 text-sm leading-relaxed text-slate-300">
              {language === 'fr'
                ? 'KOBE Corporation - Votre partenaire technologique pour transformer vos idées en solutions logicielles innovantes.'
                : 'KOBE Corporation - Your technology partner to transform ideas into innovative software solutions.'}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="flex items-center gap-1.5 rounded-lg border-2 border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:border-white/40 hover:bg-white/20 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Changer de langue"
              >
                <GlobeAltIcon className="h-4 w-4 text-white" />
                <span className="uppercase text-white">{language}</span>
              </button>
            </div>
          </div>

          {/* Colonne 2: Navigation Rapide */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t('footer.quickLinks')}
            </h3>
            <nav className="space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded ${
                    isActive
                      ? 'text-brand-400 font-semibold'
                      : 'text-slate-300 hover:text-brand-400'
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
                      ? 'text-brand-400 font-semibold'
                      : 'text-slate-300 hover:text-brand-400'
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
                      ? 'text-brand-400 font-semibold'
                      : 'text-slate-300 hover:text-brand-400'
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
                      ? 'text-brand-400 font-semibold'
                      : 'text-slate-300 hover:text-brand-400'
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
                      ? 'text-brand-400 font-semibold'
                      : 'text-slate-300 hover:text-brand-400'
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
                      ? 'text-brand-400 font-semibold'
                      : 'text-slate-300 hover:text-brand-400'
                  }`
                }
              >
                {t('nav.contact')}
              </NavLink>
            </nav>
          </div>

          {/* Colonne 3: Programmes */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t('footer.programs')}
            </h3>
            <nav className="space-y-2">
              {programmes.map((programme) => (
                <NavLink
                  key={programme.id}
                  to={`/programmes#${programme.id}`}
                  className="block text-sm text-slate-300 transition-all duration-200 hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-white/20 rounded"
                >
                  {language === 'fr' ? programme.title : programme.titleEn}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Colonne 4: Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t('nav.contact')}
            </h3>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="mt-0.5 text-brand-400">{info.icon}</div>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-sm text-slate-300 transition-colors duration-200 hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-white/20 rounded"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-300">
                      {info.value}
                    </p>
                  )}
                </div>
              ))}
              <p className="text-xs text-slate-400">
                {t('footer.available247')}
              </p>
            </div>
          </div>
        </div>

        {/* Section Réseaux Sociaux et Copyright */}
        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                {t('footer.followUs')}
              </h3>
              <div className="flex gap-3">
                <a
                  href={companyInfo.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-white/20 bg-white/10 text-[#25D366] transition-all duration-200 hover:scale-110 hover:border-[#25D366] hover:bg-[#25D366]/20 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#25D366]/30"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="h-6 w-6" />
                </a>
                <a
                  href={companyInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-white/20 bg-white/10 text-[#1877F2] transition-all duration-200 hover:scale-110 hover:border-[#1877F2] hover:bg-[#1877F2]/20 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2]/30"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-6 w-6" />
                </a>
                <a
                  href={companyInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-white/20 bg-white/10 text-[#0A66C2] transition-all duration-200 hover:scale-110 hover:border-[#0A66C2] hover:bg-[#0A66C2]/20 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/30"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-6 w-6" />
                </a>
                <a
                  href={companyInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-white/20 bg-white/10 text-[#E4405F] transition-all duration-200 hover:scale-110 hover:border-[#E4405F] hover:bg-[#E4405F]/20 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E4405F]/30"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div className="text-sm text-slate-300">
              <p className="mb-2 font-medium text-white">{t('footer.copyright')}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-white/20 rounded"
                >
                  {t('footer.legal.privacy')}
                </a>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-white/20 rounded"
                >
                  {t('footer.legal.terms')}
                </a>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-white/20 rounded"
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
