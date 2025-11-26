import { useState } from "react";
import { motion } from "framer-motion";

export default function MentionsLegalesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, delay },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Background global */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="pointer-events-none fixed inset-x-0 top-[-10%] -z-10 h-[400px] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent)]" />

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Silicium 360 — Accueil">
            <div className="relative h-9 w-9 overflow-hidden rounded-2xl bg-slate-900 ring-2 ring-slate-300/50">
              <div className="absolute inset-0 bg-[conic-gradient(from_140deg_at_50%_50%,#4B8DF8,#22c55e,#4B8DF8)] opacity-80" />
              <div className="relative flex h-full w-full items-center justify-center">
                <span className="text-xs font-black tracking-[0.12em] text-slate-950">360</span>
              </div>
            </div>
            <div className="leading-tight">
              <div className="text-lg font-semibold tracking-[0.2em] text-slate-50">
                SILICIUM 360
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Infogérance & services IT
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-xs text-slate-300 md:flex">
            <a href="/" className="hover:text-white">
              Retour au site
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-700 p-2 text-slate-100 md:hidden"
            aria-label="Ouvrir le menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-800 bg-slate-950 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm text-slate-200">
              <a href="/" onClick={() => setMenuOpen(false)} className="py-2">
                Retour au site
              </a>
            </div>
          </div>
        )}
      </header>

      {/* CONTENU */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.section {...fadeUp(0)}>
          <h1 className="text-3xl font-bold text-slate-50 mb-4">
            Mentions légales
          </h1>
          <p className="text-sm text-slate-400 mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <div className="space-y-8 text-sm text-slate-300">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                1. Éditeur du site
              </h2>
              <p className="mt-2">
                <strong>Silicium 360</strong><br />
                Entreprise individuelle – Infogérance &amp; services IT<br />
                SIREN : 913894788 <br />
                Adresse : Île-de-France<br />
                Email : contact@silicium360.fr
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                2. Hébergement
              </h2>
              <p className="mt-2">
                Site hébergé par Vercel Inc.<br />
                440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
                Site web : vercel.com
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                3. Propriété intellectuelle
              </h2>
              <p className="mt-2">
                L’ensemble des contenus de ce site (textes, images, graphismes, logo, etc.)
                est la propriété exclusive de Silicium 360, sauf mention contraire.
                Toute reproduction, représentation ou diffusion, totale ou partielle,
                sans autorisation écrite préalable est interdite.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                4. Données personnelles
              </h2>
              <p className="mt-2">
                Les informations transmises via le formulaire de contact sont utilisées
                uniquement pour répondre à votre demande et, le cas échéant, préparer
                une proposition commerciale.
              </p>
              <p className="mt-2">
                Les données ne sont ni vendues, ni cédées, ni louées à des tiers.
                Elles sont conservées pour une durée maximale de 12 mois en l’absence
                de relation commerciale.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                5. Droits des utilisateurs
              </h2>
              <p className="mt-2">
                Conformément au RGPD, vous disposez d’un droit d’accès, de rectification,
                d’effacement, d’opposition et de limitation du traitement de vos données.
              </p>
              <p className="mt-2">
                Pour exercer ces droits, contactez :<br />
                <strong>contact@silicium360.fr</strong>
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                6. Responsabilité
              </h2>
              <p className="mt-2">
                Silicium 360 met tout en œuvre pour fournir des informations fiables
                et à jour sur ce site. Toutefois, aucune garantie n’est donnée quant à
                l’exactitude ou l’exhaustivité des contenus. L’utilisation du site se
                fait sous votre seule responsabilité.
              </p>
            </div>
          </div>
        </motion.section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative h-7 w-7 overflow-hidden rounded-2xl bg-slate-900 ring-2 ring-slate-300/60">
              <div className="absolute inset-0 bg-[conic-gradient(from_140deg_at_50%_50%,#4B8DF8,#22c55e,#4B8DF8)] opacity-80" />
              <div className="relative flex h-full w-full items-center justify-center">
                <span className="text-[9px] font-black tracking-[0.14em] text-slate-950">360</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-medium tracking-[0.18em] text-slate-200">
                SILICIUM 360
              </div>
              <div className="text-[11px] text-slate-500">
                © {new Date().getFullYear()} — Tous droits réservés.
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-[11px]">
            <a href="/mentions-legales" className="hover:text-slate-200">
              Mentions légales
            </a>
            <a href="/politique-de-confidentialite" className="hover:text-slate-200">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
