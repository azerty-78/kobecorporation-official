import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/SEO'
import { getSEOData } from '../data/seoData'
import { companyInfo } from '../data/siteContent'
import { ScaleIcon, BuildingOfficeIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

function Legal() {
  const { language } = useLanguage()
  const seo = getSEOData('/legal', language)

  return (
    <>
      <SEO {...seo} />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
                <ScaleIcon className="h-4 w-4" />
                <span>{language === 'fr' ? 'Mentions Légales' : 'Legal Notice'}</span>
              </div>
              <h1 className="mb-4 font-display text-4xl font-bold text-ink sm:text-5xl md:text-6xl">
                {language === 'fr' ? 'Mentions Légales' : 'Legal Notice'}
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                {language === 'fr'
                  ? 'Informations légales concernant KOBE Corporation et l\'utilisation de ce site web.'
                  : 'Legal information regarding KOBE Corporation and the use of this website.'}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-slate max-w-none space-y-8">
              {/* Éditeur */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <BuildingOfficeIcon className="h-6 w-6 text-brand-600" />
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {language === 'fr' ? '1. Éditeur du site' : '1. Website Publisher'}
                  </h2>
                </div>
                <div className="space-y-3 text-slate-600">
                  <p>
                    <strong>{language === 'fr' ? 'Raison sociale :' : 'Company name:'}</strong> {companyInfo.name}
                  </p>
                  <p>
                    <strong>{language === 'fr' ? 'Fondateur :' : 'Founder:'}</strong> {companyInfo.founder}
                  </p>
                  <p>
                    <strong>{language === 'fr' ? 'Année de création :' : 'Year of creation:'}</strong> {companyInfo.year}
                  </p>
                  <p>
                    <strong>{language === 'fr' ? 'Slogan :' : 'Slogan:'}</strong> {companyInfo.slogan}
                  </p>
                </div>
              </div>

              {/* Adresse */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <MapPinIcon className="h-6 w-6 text-brand-600" />
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {language === 'fr' ? '2. Adresse' : '2. Address'}
                  </h2>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p>{companyInfo.address.street}</p>
                  <p>{companyInfo.address.city}</p>
                  <p>{companyInfo.address.region}</p>
                  <p>{companyInfo.address.country}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <EnvelopeIcon className="h-6 w-6 text-brand-600" />
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {language === 'fr' ? '3. Contact' : '3. Contact'}
                  </h2>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p>
                    {language === 'fr' ? 'Email :' : 'Email:'} <a href={`mailto:${companyInfo.contact.email}`} className="text-brand-600 hover:underline">{companyInfo.contact.email}</a>
                  </p>
                  <p>
                    {language === 'fr' ? 'Téléphone :' : 'Phone:'} <a href={`tel:${companyInfo.contact.phone}`} className="text-brand-600 hover:underline">{companyInfo.contact.phone}</a>
                  </p>
                  <p>
                    {language === 'fr' ? 'Disponibilité :' : 'Availability:'} {companyInfo.contact.availability}
                  </p>
                </div>
              </div>

              {/* Hébergement */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '4. Hébergement' : '4. Hosting'}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Ce site web est hébergé sur nos propres serveurs. Pour toute question concernant l\'hébergement, veuillez nous contacter.'
                    : 'This website is hosted on our own servers. For any questions regarding hosting, please contact us.'}
                </p>
              </div>

              {/* Propriété intellectuelle */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '5. Propriété intellectuelle' : '5. Intellectual Property'}
                </h2>
                <p className="mb-4 text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'L\'ensemble du contenu de ce site (textes, images, logos, graphismes, etc.) est la propriété exclusive de KOBE Corporation, sauf mention contraire. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.'
                    : 'All content on this site (texts, images, logos, graphics, etc.) is the exclusive property of KOBE Corporation, unless otherwise stated. Any reproduction, representation, modification, publication or adaptation of all or part of the site elements, regardless of the means or process used, is prohibited without prior written authorization.'}
                </p>
              </div>

              {/* Responsabilité */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '6. Responsabilité' : '6. Liability'}
                </h2>
                <p className="mb-4 text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'KOBE Corporation s\'efforce de fournir des informations exactes et à jour. Cependant, nous ne pouvons garantir l\'exactitude, la complétude ou l\'actualité des informations diffusées sur le site. KOBE Corporation ne pourra être tenue responsable des dommages directs ou indirects résultant de l\'utilisation du site.'
                    : 'KOBE Corporation strives to provide accurate and up-to-date information. However, we cannot guarantee the accuracy, completeness or timeliness of the information published on the site. KOBE Corporation cannot be held liable for direct or indirect damages resulting from the use of the site.'}
                </p>
              </div>

              {/* Liens externes */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '7. Liens externes' : '7. External Links'}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Ce site peut contenir des liens vers des sites externes. KOBE Corporation n\'est pas responsable du contenu de ces sites externes.'
                    : 'This site may contain links to external sites. KOBE Corporation is not responsible for the content of these external sites.'}
                </p>
              </div>

              {/* Droit applicable */}
              <div className="glass-panel rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
                  {language === 'fr' ? '8. Droit applicable' : '8. Applicable Law'}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Les présentes mentions légales sont régies par le droit camerounais. Tout litige relatif à l\'utilisation du site sera de la compétence exclusive des tribunaux de Yaoundé, Cameroun.'
                    : 'These legal notices are governed by Cameroonian law. Any dispute relating to the use of the site will be under the exclusive jurisdiction of the courts of Yaoundé, Cameroon.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Legal
