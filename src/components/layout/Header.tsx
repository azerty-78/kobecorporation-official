import { NavLink } from 'react-router-dom'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'

const navLinkBase =
  'rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-brand-600'

const activeClass = 'text-brand-600'
const inactiveClass = 'text-slate-700'

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/50 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft">
            <span className="font-display text-lg">K</span>
          </div>
          <div>
            <p className="font-display text-xl text-ink">KOBE Corporation</p>
            <p className="text-sm text-slate-500">Stratégie · Qualité · Innovation</p>
          </div>
        </NavLink>
        <div className="hidden items-center gap-3 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : inactiveClass}`}
          >
            Accueil
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : inactiveClass}`}
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `${navLinkBase} ${isActive ? activeClass : inactiveClass}`}
          >
            Contact
          </NavLink>
        </div>
        <NavLink
          to="/contact"
          className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600 md:inline-flex"
        >
          Parler à un expert
          <ArrowRightIcon className="h-4 w-4" />
        </NavLink>
        <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-soft md:hidden">
          <SparklesIcon className="h-3 w-3 text-brand-500" />
          Menu
        </button>
      </div>
    </header>
  )
}

export default Header

