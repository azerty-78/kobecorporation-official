function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white/80 py-6 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} KOBE Corporation. Tous droits réservés.
        </p>
        <div className="flex gap-4 text-sm text-slate-500">
          <span>Confidentialité</span>
          <span>Mentions légales</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

