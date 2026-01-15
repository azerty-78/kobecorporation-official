import { Link } from 'react-router-dom'
import { HomeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function NotFound() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })
  
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-8 px-6 py-14">
      {/* Hero Section améliorée */}
      <div
        ref={elementRef}
        className={`group relative w-full overflow-hidden rounded-3xl bg-white p-12 text-center shadow-xl transition-all duration-1000 md:p-16 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
      >
        {/* Fond blanc pur */}
        <div className="absolute inset-0 bg-white" />
        
        {/* Particules animées */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 h-2 w-2 rounded-full bg-brand-400 animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute top-20 right-20 h-1.5 w-1.5 rounded-full bg-brand-300 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-20 h-2.5 w-2.5 rounded-full bg-brand-500 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative space-y-6">
          <div
            className={`group/badge relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-600 shadow-md transition-all duration-700 delay-100 hover:border-brand-300 hover:shadow-lg hover:-translate-y-0.5 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-50/50 to-transparent translate-x-[-100%] group-hover/badge:translate-x-[100%] transition-transform duration-1000" />
            <div className="absolute inset-0 bg-brand-50/50 opacity-0 transition-opacity duration-300 group-hover/badge:opacity-100" />
            <ExclamationTriangleIcon className="relative z-10 h-4 w-4 animate-pulse transition-transform duration-300 group-hover/badge:rotate-12 group-hover/badge:scale-110" />
            <span className="relative z-10 uppercase tracking-[0.2em] transition-colors duration-300 group-hover/badge:text-brand-700">Erreur 404</span>
          </div>
          
          <h1
            className={`font-display text-4xl leading-tight text-ink transition-all duration-1000 delay-200 md:text-5xl lg:text-6xl ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Page introuvable
          </h1>
          
          <p
            className={`mx-auto max-w-xl text-lg leading-relaxed text-slate-600 transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            La page que vous recherchez n'existe pas ou n'est plus disponible. Retournez vers l'accueil pour
            explorer les services de KOBE Corporation.
          </p>
          
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <Link
              to="/"
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[rgb(31,41,55)] px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:bg-[rgb(15,23,42)] hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <HomeIcon className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
              <span className="relative z-10">Revenir à l'accueil</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound

