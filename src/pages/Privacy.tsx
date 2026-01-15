import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/SEO'
import { getSEOData } from '../data/seoData'
import { companyInfo } from '../data/siteContent'
import { ShieldCheckIcon, LockClosedIcon, EyeIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

function Privacy() {
  const { language } = useLanguage()
  const seo = getSEOData('/privacy', language)

  return (
    <>
      <SEO {...seo} />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
                <ShieldCheckIcon className="h-4 w-4" />
                <span>{language === 'fr' ? 'Confidentialité' : 'Privacy'}</span>
              </div>
              <h1 className="mb-4 font-display text-4xl font-bold text-ink sm:text-5xl md:text-6xl">
                {language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                {language === 'fr'
                  ? 'Votre vie privée est importante pour nous. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.'
                  : 'Your privacy is important to us. Learn how we collect, use and protect your personal data.'}
              </p>
              <p className="mt-4 text-sm text-slate-500">
                {language === 'fr' ? 'Dernière mise à jour :' : 'Last updated:'} {new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-slate max-w-none space-y-8">
              {/* Introduction */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <DocumentTextIcon className="h-6 w-6 text-brand-600" />
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {language === 'fr' ? '1. Introduction' : '1. Introduction'}
                  </h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? `${companyInfo.name} ("nous", "notre", "nos") s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations personnelles lorsque vous utilisez notre site web ${companyInfo.social.website}.`
                    : `${companyInfo.name} ("we", "our", "us") is committed to protecting your privacy. This privacy policy explains how we collect, use, disclose and protect your personal information when you use our website ${companyInfo.social.website}.`}
                </p>
              </div>

              {/* Données collectées */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <EyeIcon className="h-6 w-6 text-brand-600" />
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {language === 'fr' ? '2. Données que nous collectons' : '2. Data We Collect'}
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold text-ink">
                      {language === 'fr' ? 'Données que vous nous fournissez :' : 'Data you provide to us:'}
                    </h3>
                    <ul className="ml-6 list-disc space-y-2 text-slate-600">
                      <li>{language === 'fr' ? 'Nom et prénom' : 'First and last name'}</li>
                      <li>{language === 'fr' ? 'Adresse e-mail' : 'Email address'}</li>
                      <li>{language === 'fr' ? 'Numéro de téléphone' : 'Phone number'}</li>
                      <li>{language === 'fr' ? 'Nom de l\'entreprise (si applicable)' : 'Company name (if applicable)'}</li>
                      <li>{language === 'fr' ? 'Messages et communications' : 'Messages and communications'}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-ink">
                      {language === 'fr' ? 'Données collectées automatiquement :' : 'Automatically collected data:'}
                    </h3>
                    <ul className="ml-6 list-disc space-y-2 text-slate-600">
                      <li>{language === 'fr' ? 'Adresse IP' : 'IP address'}</li>
                      <li>{language === 'fr' ? 'Type de navigateur et appareil' : 'Browser and device type'}</li>
                      <li>{language === 'fr' ? 'Pages visitées et temps passé' : 'Pages visited and time spent'}</li>
                      <li>{language === 'fr' ? 'Préférences de langue' : 'Language preferences'}</li>
                      <li>{language === 'fr' ? 'Cookies (voir notre politique de cookies)' : 'Cookies (see our cookie policy)'}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Utilisation des données */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <LockClosedIcon className="h-6 w-6 text-brand-600" />
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {language === 'fr' ? '3. Utilisation des données' : '3. Use of Data'}
                  </h2>
                </div>
                <p className="mb-4 text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Nous utilisons vos données personnelles pour :'
                    : 'We use your personal data to:'}
                </p>
                <ul className="ml-6 list-disc space-y-2 text-slate-600">
                  <li>{language === 'fr' ? 'Répondre à vos demandes et vous fournir nos services' : 'Respond to your requests and provide our services'}</li>
                  <li>{language === 'fr' ? 'Améliorer notre site web et nos services' : 'Improve our website and services'}</li>
                  <li>{language === 'fr' ? 'Vous envoyer des communications importantes' : 'Send you important communications'}</li>
                  <li>{language === 'fr' ? 'Respecter nos obligations légales' : 'Comply with our legal obligations'}</li>
                  <li>{language === 'fr' ? 'Personnaliser votre expérience (préférences de langue, etc.)' : 'Personalize your experience (language preferences, etc.)'}</li>
                </ul>
              </div>

              {/* Partage des données */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '4. Partage des données' : '4. Data Sharing'}
                </h2>
                <p className="mb-4 text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers, sauf dans les cas suivants :'
                    : 'We do not sell, rent or share your personal data with third parties, except in the following cases:'}
                </p>
                <ul className="ml-6 list-disc space-y-2 text-slate-600">
                  <li>{language === 'fr' ? 'Avec votre consentement explicite' : 'With your explicit consent'}</li>
                  <li>{language === 'fr' ? 'Pour respecter une obligation légale' : 'To comply with a legal obligation'}</li>
                  <li>{language === 'fr' ? 'Pour protéger nos droits et notre sécurité' : 'To protect our rights and security'}</li>
                  <li>{language === 'fr' ? 'Avec nos prestataires de services (hébergement, email) sous contrat de confidentialité' : 'With our service providers (hosting, email) under confidentiality agreement'}</li>
                </ul>
              </div>

              {/* Sécurité */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-brand-600" />
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {language === 'fr' ? '5. Sécurité des données' : '5. Data Security'}
                  </h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre l\'accès non autorisé, la perte, la destruction ou l\'altération. Cependant, aucune méthode de transmission sur Internet n\'est 100% sécurisée.'
                    : 'We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, loss, destruction or alteration. However, no method of transmission over the Internet is 100% secure.'}
                </p>
              </div>

              {/* Vos droits */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '6. Vos droits' : '6. Your Rights'}
                </h2>
                <p className="mb-4 text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Conformément au RGPD et aux lois applicables, vous avez le droit de :'
                    : 'In accordance with GDPR and applicable laws, you have the right to:'}
                </p>
                <ul className="ml-6 list-disc space-y-2 text-slate-600">
                  <li>{language === 'fr' ? 'Accéder à vos données personnelles' : 'Access your personal data'}</li>
                  <li>{language === 'fr' ? 'Rectifier vos données inexactes' : 'Rectify your inaccurate data'}</li>
                  <li>{language === 'fr' ? 'Demander la suppression de vos données' : 'Request deletion of your data'}</li>
                  <li>{language === 'fr' ? 'Vous opposer au traitement de vos données' : 'Object to the processing of your data'}</li>
                  <li>{language === 'fr' ? 'Demander la portabilité de vos données' : 'Request portability of your data'}</li>
                  <li>{language === 'fr' ? 'Retirer votre consentement à tout moment' : 'Withdraw your consent at any time'}</li>
                </ul>
              </div>

              {/* Cookies */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '7. Cookies' : '7. Cookies'}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres de votre navigateur ou via notre bannière de cookies. Pour plus d\'informations, consultez notre politique de cookies.'
                    : 'We use cookies to improve your experience. You can manage your cookie preferences at any time via your browser settings or via our cookie banner. For more information, see our cookie policy.'}
                </p>
              </div>

              {/* Contact */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '8. Contact' : '8. Contact'}
                </h2>
                <p className="mb-4 text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, contactez-nous :'
                    : 'For any questions regarding this privacy policy or to exercise your rights, contact us:'}
                </p>
                <div className="space-y-2 text-slate-600">
                  <p>
                    <strong>{companyInfo.name}</strong>
                  </p>
                  <p>{companyInfo.address.full}</p>
                  <p>
                    {language === 'fr' ? 'Email :' : 'Email:'} <a href={`mailto:${companyInfo.contact.email}`} className="text-brand-600 hover:underline">{companyInfo.contact.email}</a>
                  </p>
                  <p>
                    {language === 'fr' ? 'Téléphone :' : 'Phone:'} <a href={`tel:${companyInfo.contact.phone}`} className="text-brand-600 hover:underline">{companyInfo.contact.phone}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Privacy
