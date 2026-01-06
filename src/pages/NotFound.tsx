import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-6 px-6 py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Erreur 404</p>
      <h1 className="font-display text-4xl text-ink md:text-5xl">Page introuvable</h1>
      <p className="max-w-xl text-slate-600">
        La page que vous recherchez n’existe pas ou n’est plus disponible. Retournez vers l’accueil pour
        explorer les services de KOBE Corporation.
      </p>
      <Link
        to="/"
        className="inline-flex items-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-600"
      >
        Revenir à l’accueil
      </Link>
    </div>
  )
}

export default NotFound

