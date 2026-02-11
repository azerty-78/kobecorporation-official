import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'
import CookieConsent from './components/CookieConsent'
import { PageLoader } from './components/PageLoader'
import { useNavigation } from './contexts/NavigationContext'

// Lazy loading des pages pour améliorer le code splitting
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const Programmes = lazy(() => import('./pages/Programmes'))
const About = lazy(() => import('./pages/About'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Legal = lazy(() => import('./pages/Legal'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))

function AppContent() {
  const { isNavigating } = useNavigation()

  return (
    <div className="min-h-screen bg-white">
      <PageLoader isLoading={isNavigating} />
      <ScrollToTop />
      <Header />
      <main className={`flex-1 transition-opacity duration-300 ${isNavigating ? 'opacity-[0.985]' : 'opacity-100'}`}>
        <Suspense fallback={
          <div className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center bg-gradient-to-b from-white/55 via-white/35 to-white/55 backdrop-blur-[1px]">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-6 py-5 shadow-soft">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
              <p className="text-sm font-medium text-neutral-600">Chargement...</p>
            </div>
          </div>
        }>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Redirection de /home vers / pour éviter les duplications SEO */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/services" element={<Services />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

function App() {
  return <AppContent />
}

export default App
