import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/SEO'
import { getSEOData } from '../data/seoData'
import { companyInfo } from '../data/siteContent'
import { DocumentCheckIcon, HandshakeIcon, CreditCardIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

function Terms() {
  const { language } = useLanguage()
  const seo = getSEOData('/terms', language)

  return (
    <>
      <SEO {...seo} />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
                <DocumentCheckIcon className="h-4 w-4" />
                <span>{language === 'fr' ? 'Conditions Générales' : 'Terms & Conditions'}</span>
              </div>
              <h1 className="mb-4 font-display text-4xl font-bold text-ink sm:text-5xl md:text-6xl">
                {language === 'fr' ? 'Conditions Générales d\'Utilisation' : 'Terms & Conditions'}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                {language === 'fr'
                  ? 'Les conditions générales d\'utilisation régissent l\'utilisation de notre site web et de nos services.'
                  : 'The terms and conditions govern the use of our website and services.'}
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
              {/* Acceptation */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <HandshakeIcon className="h-6 w-6 text-brand-600" />
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {language === 'fr' ? '1. Acceptation des conditions' : '1. Acceptance of Terms'}
                  </h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'En accédant et en utilisant ce site web, vous acceptez d\'être lié par ces conditions générales d\'utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser ce site.'
                    : 'By accessing and using this website, you agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use this site.'}
                </p>
              </div>

              {/* Utilisation du site */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '2. Utilisation du site' : '2. Use of the Site'}
                </h2>
                <p className="mb-4 text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Vous vous engagez à utiliser ce site de manière légale et conforme à ces conditions. Vous ne devez pas :'
                    : 'You agree to use this site in a legal manner and in accordance with these terms. You must not:'}
                </p>
                <ul className="ml-6 list-disc space-y-2 text-slate-600">
                  <li>{language === 'fr' ? 'Utiliser le site à des fins illégales' : 'Use the site for illegal purposes'}</li>
                  <li>{language === 'fr' ? 'Tenter d\'accéder à des zones non autorisées' : 'Attempt to access unauthorized areas'}</li>
                  <li>{language === 'fr' ? 'Transmettre des virus ou codes malveillants' : 'Transmit viruses or malicious code'}</li>
                  <li>{language === 'fr' ? 'Copier ou reproduire le contenu sans autorisation' : 'Copy or reproduce content without authorization'}</li>
                  <li>{language === 'fr' ? 'Perturber le fonctionnement du site' : 'Disrupt the site\'s operation'}</li>
                </ul>
              </div>

              {/* Services */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '3. Services proposés' : '3. Services Offered'}
                </h2>
                <p className="mb-4 text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'KOBE Corporation propose les services suivants :'
                    : 'KOBE Corporation offers the following services:'}
                </p>
                <ul className="ml-6 list-disc space-y-2 text-slate-600">
                  <li>{language === 'fr' ? 'Développement logiciel sur mesure' : 'Custom software development'}</li>
                  <li>{language === 'fr' ? 'Hébergement et infrastructure' : 'Hosting and infrastructure'}</li>
                  <li>{language === 'fr' ? 'Consultation et audit IT' : 'IT consultation and audit'}</li>
                  <li>{language === 'fr' ? 'Formation et bootcamp' : 'Training and bootcamp'}</li>
                </ul>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Les détails spécifiques de chaque service sont définis dans des contrats séparés.'
                    : 'Specific details for each service are defined in separate contracts.'}
                </p>
              </div>

              {/* Tarifs et paiement */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <CreditCardIcon className="h-6 w-6 text-brand-600" />
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {language === 'fr' ? '4. Tarifs et paiement' : '4. Pricing and Payment'}
                  </h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Les tarifs de nos services sont indiqués sur demande. Les modalités de paiement sont définies dans chaque contrat de service. Tous les prix sont exprimés en FCFA (Franc CFA) sauf indication contraire.'
                    : 'Our service prices are available upon request. Payment terms are defined in each service contract. All prices are expressed in FCFA (CFA Franc) unless otherwise indicated.'}
                </p>
              </div>

              {/* Propriété intellectuelle */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '5. Propriété intellectuelle' : '5. Intellectual Property'}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Tous les contenus de ce site (textes, images, logos, code source) sont la propriété de KOBE Corporation ou de ses partenaires. Toute reproduction non autorisée est interdite.'
                    : 'All content on this site (texts, images, logos, source code) is the property of KOBE Corporation or its partners. Any unauthorized reproduction is prohibited.'}
                </p>
              </div>

              {/* Limitation de responsabilité */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <ExclamationTriangleIcon className="h-6 w-6 text-brand-600" />
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {language === 'fr' ? '6. Limitation de responsabilité' : '6. Limitation of Liability'}
                  </h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'KOBE Corporation ne pourra être tenue responsable des dommages directs, indirects, accessoires ou consécutifs résultant de l\'utilisation ou de l\'impossibilité d\'utiliser ce site ou nos services, sauf en cas de faute lourde ou de dol.'
                    : 'KOBE Corporation cannot be held liable for direct, indirect, incidental or consequential damages resulting from the use or inability to use this site or our services, except in case of gross negligence or fraud.'}
                </p>
              </div>

              {/* Modification des conditions */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '7. Modification des conditions' : '7. Modification of Terms'}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'KOBE Corporation se réserve le droit de modifier ces conditions générales à tout moment. Les modifications entrent en vigueur dès leur publication sur le site. Il est de votre responsabilité de consulter régulièrement ces conditions.'
                    : 'KOBE Corporation reserves the right to modify these terms and conditions at any time. Modifications take effect upon publication on the site. It is your responsibility to regularly review these terms.'}
                </p>
              </div>

              {/* Contact */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '8. Contact' : '8. Contact'}
                </h2>
                <p className="mb-4 text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Pour toute question concernant ces conditions générales, contactez-nous :'
                    : 'For any questions regarding these terms and conditions, contact us:'}
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

export default Terms
