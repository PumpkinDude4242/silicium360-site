import { useState } from "react";
import { motion } from "framer-motion";

export default function PolitiqueConfidentialitePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, delay },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="pointer-events-none fixed inset-x-0 top-[-10%] -z-10 h-[400px] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent)]" />

      {/* HEADER (copié de MentionsLegalesPage) */}
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
          <h1 className="text-3xl font-bold mb-4">Politique de confidentialité</h1>
          <p className="text-sm text-slate-400 mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <div className="space-y-6 text-sm text-slate-300">
            <div>
              <p>
                La présente politique de confidentialité explique comment <strong>Silicium 360</strong> collecte,
                utilise et protège vos données personnelles lorsque vous utilisez ce site ou notre
                formulaire de contact.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100">1. Données collectées</h2>
              <p>
                Lorsque vous utilisez notre formulaire de contact, nous collectons uniquement les
                informations nécessaires au traitement de votre demande :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Nom et/ou nom de société</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone (optionnel)</li>
                <li>Message transmis</li>
                <li>Votre consentement à être recontacté(e)</li>
              </ul>
              <p className="mt-3">
                Aucune donnée sensible n’est collectée. Aucune donnée n’est collectée automatiquement
                en dehors des cookies techniques nécessaires au fonctionnement du site.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100">2. Finalités du traitement</h2>
              <p>Vos données sont utilisées uniquement pour :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Répondre à vos demandes de contact</li>
                <li>Préparer une proposition ou un devis</li>
                <li>Planifier un échange (téléphone, visio, rendez-vous)</li>
              </ul>
              <p className="mt-3">
                Elles ne sont pas utilisées pour de la prospection de masse sans votre accord explicite.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100">3. Base légale</h2>
              <p>
                Le traitement de vos données repose sur :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Votre <strong>consentement</strong> lorsque vous envoyez une demande via le formulaire</li>
                <li>L’intérêt légitime de Silicium 360 à pouvoir vous répondre</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100">4. Durée de conservation</h2>
              <p>
                Les données issues du formulaire de contact sont conservées pour une durée maximale
                de <strong>12 mois</strong> en l’absence de relation commerciale.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100">5. Stockage et sécurité</h2>
              <p>
                Vos données sont stockées de manière sécurisée. L’accès est limité aux seules personnes
                qui en ont besoin dans le cadre de la relation commerciale.
              </p>
              <p className="mt-2">
                Nous mettons en œuvre des mesures raisonnables pour protéger vos informations
                (accès restreint, sécurité applicative, mises à jour régulières).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100">6. Partage des données</h2>
              <p>
                Vos données ne sont <strong>jamais vendues</strong>, ni louées, ni cédées à des tiers à des fins commerciales.
              </p>
              <p className="mt-2">
                Elles peuvent être communiquées uniquement :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>En cas d’obligation légale</li>
                <li>A des prestataires techniques (hébergeur, email) strictement nécessaires au fonctionnement du service</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100">7. Vos droits (RGPD)</h2>
              <p>
                Vous disposez des droits suivants sur vos données personnelles :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Droit d’accès</li>
                <li>Droit de rectification</li>
                <li>Droit à l’effacement</li>
                <li>Droit d’opposition</li>
                <li>Droit à la limitation du traitement</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, vous pouvez nous contacter à : <br />
                <strong>contact@silicium360.fr</strong>
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-100">8. Contact</h2>
              <p>
                Pour toute question relative à cette politique de confidentialité, vous pouvez
                écrire à : <br />
                <strong>contact@silicium360.fr</strong>
              </p>
            </div>
          </div>
        </motion.section>
      </main>

      {/* FOOTER identique */}
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
