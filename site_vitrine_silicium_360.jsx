import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Server,
  Headphones,
  Network,
  Lock,
  Cloud,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
} from "lucide-react";

// Stub de RevealContact pour la prévisualisation dans le canvas
function RevealContact({ valueB64, masked, label }) {
  const [revealed, setRevealed] = useState(false);
  let decoded = "";
  try {
    decoded = valueB64 ? atob(valueB64) : "";
  } catch {
    decoded = "";
  }

  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      className="inline-flex items-center gap-1 text-sm text-sky-300 hover:text-sky-200"
    >
      {revealed ? decoded : masked || label}
    </button>
  );
}

// ⚠️ Remplace par tes vraies valeurs pour le vrai site
const PHONE_CLEAR = "+33 6 00 00 00 00"; // ton numéro formaté lisible
const EMAIL_CLEAR = "contact@silicium360.fr"; // ton email

// Encodage base64 (SSR safe)
const PHONE_B64 =
  typeof window === "undefined"
    ? Buffer.from(PHONE_CLEAR).toString("base64")
    : btoa(PHONE_CLEAR);
const EMAIL_B64 =
  typeof window === "undefined"
    ? Buffer.from(EMAIL_CLEAR).toString("base64")
    : btoa(EMAIL_CLEAR);

export default function Silicium360Site() {
  const [menuOpen, setMenuOpen] = useState(false);

  // ----- ÉTAT FORMULAIRE -----
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
    company: "",
    _honeypot: "", // honeypot anti-bot
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v ?? "");
  const phoneOk = (v) => !v || v.replace(/\D/g, "").length >= 9;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nom / société requis";
    if (!emailOk(form.email)) e.email = "Email invalide";
    if (!phoneOk(form.phone)) e.phone = "Téléphone invalide";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message trop court (≥ 10 caractères)";
    if (!form.consent) e.consent = "Consentement requis";
    if (form._honeypot) e._honeypot = "Bot détecté";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (k) => (ev) => {
    const v = ev?.target?.type === "checkbox" ? ev.target.checked : ev.target.value;
    setForm((f) => ({ ...f, [k]: v }));
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus({ sending: true, ok: null, msg: "" });

    // Pour la prévisualisation dans le canvas, on SIMULE juste un succès
    setTimeout(() => {
      setStatus({
        sending: false,
        ok: true,
        msg: "Message envoyé. Merci ! Réponse sous 24h ouvrées.",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false,
        company: "",
        _honeypot: "",
      });
      setErrors({});
    }, 800);
  };

  const onSubmitCapture = (e) => {
    console.log("[capture] submit event", e.type);
  };
  const onClickButton = () => {
    console.log("[click] bouton submit cliqué");
  };

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
          <a href="#top" className="flex items-center gap-3" aria-label="Silicium 360 — Accueil">
            <div className="relative h-9 w-9 overflow-hidden rounded-2xl bg-slate-900 ring-2 ring-slate-300/50">
              <div className="absolute inset-0 bg-[conic-gradient(from_140deg_at_50%_50%,#4B8DF8,#22c55e,#4B8DF8)] opacity-80" />
              <div className="relative flex h-full w-full items-center justify-center">
                <span className="text-xs font-black tracking-[0.12em] text-slate-950">360</span>
              </div>
            </div>
            <div className="leading-tight">
              <div className="text-lg font-semibold tracking-[0.2em] text-slate-50">SILICIUM 360</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Infogérance & services IT</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#process" className="hover:text-white">Méthode</a>
            <a href="#expertises" className="hover:text-white">Expertises</a>
            <a href="#engagements" className="hover:text-white">Engagements</a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-900 hover:bg-slate-200"
            >
              Devis gratuit
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-700 p-2 text-slate-100 md:hidden"
            aria-label="Ouvrir le menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-800 bg-slate-950 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm text-slate-200">
              <a href="#services" onClick={() => setMenuOpen(false)} className="py-2">
                Services
              </a>
              <a href="#process" onClick={() => setMenuOpen(false)} className="py-2">
                Méthode
              </a>
              <a href="#expertises" onClick={() => setMenuOpen(false)} className="py-2">
                Expertises
              </a>
              <a href="#engagements" onClick={() => setMenuOpen(false)} className="py-2">
                Engagements
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex w-fit items-center rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-900"
              >
                Devis gratuit
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-slate-800/60">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:py-20 lg:px-8">
            <motion.div {...fadeUp(0)}>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Supervision & support pour TPE/PME en Île-de-France
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                Votre informatique{" "}
                <span className="bg-gradient-to-r from-sky-400 via-emerald-300 to-sky-400 bg-clip-text text-transparent">
                  sous contrôle
                </span>
                , pas sous tension.
              </h1>

              <p className="mt-5 max-w-xl text-base text-slate-300 sm:text-lg">
                Silicium 360 pilote votre parc, vos sauvegardes et votre sécurité au quotidien. Vous restez concentré sur le
                business, pas sur les tickets.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
                >
                  Diagnostic offert 15 min
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-950/60 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-slate-900"
                >
                  Voir les packs d&apos;infogérance
                </a>
              </div>

              <dl className="mt-7 grid max-w-xl grid-cols-2 gap-4 text-xs text-slate-300 sm:text-sm">
                <div>
                  <dt className="font-semibold text-slate-100">SLA au forfait</dt>
                  <dd className="mt-1 text-slate-300">Engagements de délais clairs, adaptés à votre activité.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-100">Parc standardisé</dt>
                  <dd className="mt-1 text-slate-300">Moins d&apos;incidents, plus de visibilité sur les coûts.</dd>
                </div>
              </dl>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),transparent)]" />
              <div className="relative space-y-4 rounded-3xl border border-slate-700/80 bg-slate-900/80 p-5 shadow-2xl shadow-sky-900/40 backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Vue d&apos;ensemble</p>
                    <p className="mt-1 text-sm font-semibold text-slate-50">Parc sous infogérance</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/60 px-3 py-1 text-xs font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    98% des postes à jour
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Tickets</span>
                      <Headphones className="h-4 w-4 text-sky-400" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-slate-50">12</p>
                    <p className="mt-1 text-[11px] text-emerald-300">9 résolus en 24h</p>
                  </div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Sauvegardes</span>
                      <Cloud className="h-4 w-4 text-emerald-400" />
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-slate-50">OK</p>
                    <p className="mt-1 text-[11px] text-slate-300">Dernier test de restauration : 2 j</p>
                  </div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Sécurité</span>
                      <Lock className="h-4 w-4 text-indigo-400" />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-50">MFA & EDR actifs</p>
                    <p className="mt-1 text-[11px] text-slate-300">0 alerte critique</p>
                  </div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Réseau</span>
                      <Network className="h-4 w-4 text-cyan-400" />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-50">Latence stable</p>
                    <p className="mt-1 text-[11px] text-slate-300">Monitoring temps réel</p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/90 p-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Onboarding d&apos;un nouveau collaborateur</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    <Clock className="mr-1 inline h-3 w-3" />
                    &lt; 1 h
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bandeau pour qui */}
          <div className="border-t border-slate-800/70 bg-slate-950/80">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 text-xs text-slate-300 sm:px-6 lg:px-8">
              <span className="rounded-full border border-slate-700/70 bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-200">
                Pour qui travaillons-nous ?
              </span>
              <div className="flex flex-wrap gap-3 text-[11px] sm:text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                  <Server className="h-3 w-3 text-sky-400" />
                  TPE/PME & retail
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  Services & professions libérales
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
                  <Users className="h-3 w-3 text-indigo-400" />
                  Associatif & social
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="border-b border-slate-800/70 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp(0)}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Services</p>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">Tout ce qu&apos;il faut pour un parc serein.</h2>
                <p className="max-w-md text-sm text-slate-300">
                  Infogérance complète, support utilisateurs, sécurité, sauvegardes, réseau et conseil. Vous choisissez le pack,
                  on s&apos;occupe du reste.
                </p>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Infogérance complète",
                  desc: "Supervision 24/7, mises à jour, inventaire, télémaintenance.",
                  points: ["Postes & serveurs gérés", "Rapports mensuels", "Tableau de bord décisionnel"],
                  icon: ShieldCheck,
                },
                {
                  title: "Support utilisateurs",
                  desc: "Helpdesk réactif, prise en main à distance, interventions sur site.",
                  points: [
                    "Tickets illimités (selon contrat)",
                    "Résolution 1er niveau priorisée",
                    "Accompagnement non-technique",
                  ],
                  icon: Headphones,
                },
                {
                  title: "Sécurité & conformité",
                  desc: "Durcissement, MFA, EDR, politiques MDM / Intune.",
                  points: ["Audit de sécurité", "Plan d&apos;action priorisé", "Sensibilisation des équipes"],
                  icon: Lock,
                },
                {
                  title: "Sauvegarde & PRA",
                  desc: "Stratégie 3-2-1, local + cloud, tests de restauration.",
                  points: ["RPO/RTO adaptés au business", "Surveillance quotidienne", "Plan de reprise documenté"],
                  icon: Cloud,
                },
                {
                  title: "Réseaux & firewall",
                  desc: "LAN, Wi-Fi pro, VPN, segmentation & QoS.",
                  points: ["Pare-feu nouvelle génération", "Wi-Fi pro", "Observation en temps réel"],
                  icon: Network,
                },
                {
                  title: "Conseil & projets",
                  desc: "Audit d&apos;infrastructure, migrations, renouvellement parc.",
                  points: ["Roadmap 12-18 mois", "Budget prévisionnel", "Pilotage projet pragmatique"],
                  icon: Server,
                },
              ].map((card, idx) => (
                <motion.div
                  key={card.title}
                  {...fadeUp(idx * 0.05 + 0.05)}
                  className="group relative flex flex-col rounded-3xl border border-slate-800 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/40 transition hover:-translate-y-1 hover:border-sky-500/60 hover:bg-slate-900/80"
                >
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-50">{card.title}</h3>
                  <p className="mt-2 text-xs text-slate-300">{card.desc}</p>
                  <ul className="mt-3 space-y-1 text-xs text-slate-300">
                    {card.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-sky-400" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex-1" />
                  <div className="mt-3 flex items-center text-[11px] font-medium text-sky-300">
                    Inclus dans nos offres
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-3xl bg-gradient-to-t from-sky-500/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>

            {/* Packs teaser */}
            <motion.div
              {...fadeUp(0.2)}
              className="mt-10 grid gap-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Packs d&apos;infogérance</p>
                <h3 className="mt-2 text-sm font-semibold text-slate-50">Une base commune, des options sur-mesure.</h3>
                <p className="mt-2 text-xs text-slate-300">
                  À partir d&apos;un certain nombre de postes, nous standardisons votre environnement et sécurisons l&apos;ensemble. Vous
                  conservez la maîtrise du budget.
                </p>
              </div>
              <div className="grid gap-3 text-xs sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-400">Essentiel</p>
                  <p className="mt-1 text-sm font-semibold text-slate-50">Parc sous contrôle</p>
                  <p className="mt-1 text-[11px] text-slate-300">Mises à jour, sauvegardes, support mail & portail.</p>
                </div>
                <div className="rounded-2xl border border-sky-500/70 bg-slate-900/80 p-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-sky-300">Business</p>
                  <p className="mt-1 text-sm font-semibold text-slate-50">Support prioritaire</p>
                  <p className="mt-1 text-[11px] text-slate-300">Helpdesk téléphonique, interventions sur site planifiées.</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/70 bg-slate-900/80 p-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-300">Premium</p>
                  <p className="mt-1 text-sm font-semibold text-slate-50">Continuité d&apos;activité</p>
                  <p className="mt-1 text-[11px] text-slate-300">PRA avancé, astreinte, sécurité renforcée.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="border-b border-slate-800/70 bg-slate-950/80 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp(0)}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Méthode</p>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">Une trajectoire claire, pas un mille-feuille.</h2>
                <p className="max-w-md text-sm text-slate-300">
                  On commence simple : comprendre votre contexte, sécuriser l&apos;essentiel, puis planifier des évolutions qui ont du
                  sens pour vous.
                </p>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-6 md:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Diagnostic flash",
                  text: "Inventaire rapide, risques majeurs, irritants utilisateurs.",
                },
                {
                  step: "02",
                  title: "Plan d&apos;action",
                  text: "Priorisation par impact / effort, budget lisible.",
                },
                {
                  step: "03",
                  title: "Mise sous contrôle",
                  text: "Standardisation, sauvegardes, sécurité minimale solide.",
                },
                {
                  step: "04",
                  title: "Amélioration continue",
                  text: "Revue régulière, indicateurs, ajustement des services.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  {...fadeUp(0.05 * (i + 1))}
                  className="relative h-full rounded-3xl border border-slate-800 bg-slate-950/70 p-4"
                >
                  <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-slate-500">{item.step}</div>
                  <h3 className="text-sm font-semibold text-slate-50">{item.title}</h3>
                  <p className="mt-2 text-xs text-slate-300">{item.text}</p>
                  {i < 3 && (
                    <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-slate-700 to-sky-500 md:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERTISES */}
        <section id="expertises" className="border-b border-slate-800/70 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp(0)}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Expertises</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-50 sm:text-3xl">Ce que nous maîtrisons au quotidien.</h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-300">
                Windows Server, Active Directory, Microsoft 365 / Intune, réseaux Ubiquiti / Omada, sauvegarde Veeam, virtualisation,
                scripts d&apos;automatisation… le tout pensé pour les contraintes réelles des TPE/PME.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <motion.div
                {...fadeUp(0.1)}
                className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5"
              >
                <h3 className="text-sm font-semibold text-slate-50">Secteurs servis</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>TPE/PME, retail & associations</li>
                  <li>Services, cabinets et professions libérales</li>
                  <li>Éducation & organismes sociaux</li>
                </ul>
              </motion.div>
              <motion.div
                {...fadeUp(0.15)}
                className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5"
              >
                <h3 className="text-sm font-semibold text-slate-50">Méthode technique</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>Audit initial et plan d&apos;action réaliste</li>
                  <li>Standardisation & automatisation des tâches récurrentes</li>
                  <li>Mesure continue et amélioration incrémentale</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ENGAGEMENTS */}
        <section id="engagements" className="border-b border-slate-800/70 bg-slate-950/85 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp(0)}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Engagements</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-50 sm:text-3xl">
                Un partenaire long terme, pas un simple prestataire.
              </h2>
            </motion.div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Disponibilité",
                  text: "Supervision proactive, astreinte selon contrat et canaux de contact simples.",
                },
                {
                  title: "Sécurité",
                  text: "Approche Zero-Trust pragmatique, MFA, sauvegardes testées régulièrement.",
                },
                {
                  title: "Clarté",
                  text: "Rapports, indicateurs, langage compréhensible par les non-techniques.",
                },
              ].map((e, i) => (
                <motion.div
                  key={e.title}
                  {...fadeUp(0.05 * (i + 1))}
                  className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5"
                >
                  <h3 className="text-sm font-semibold text-slate-50">{e.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{e.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-b border-slate-800/70 bg-slate-950 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp(0)}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Contact</p>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">Parlez-nous de votre contexte.</h2>
                <p className="max-w-md text-sm text-slate-300">
                  Expliquez brièvement votre situation. Nous revenons vers vous sous 24h ouvrées avec des pistes concrètes.
                </p>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              {/* Coordonnées */}
              <motion.div
                {...fadeUp(0.05)}
                className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/80 p-5"
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-sky-400" />
                  <RevealContact
                    valueB64={EMAIL_B64}
                    masked="cont***@silicium360.fr"
                    label="Afficher l’email"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-emerald-400" />
                  <RevealContact valueB64={PHONE_B64} masked="06 ** ** ** **" label="Afficher le numéro" />
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <MapPin className="h-5 w-5 text-indigo-400" />
                  <span>Île-de-France</span>
                </div>
                <p className="text-xs text-slate-300">
                  Interventions à distance France entière, sur site en Île-de-France.
                </p>
                <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/90 p-3 text-xs text-slate-300">
                  <p className="font-semibold text-slate-100">Comment ça se passe ?</p>
                  <ul className="mt-2 space-y-1">
                    <li>1. Vous décrivez votre contexte.</li>
                    <li>2. On planifie un échange de 15 min.</li>
                    <li>3. Vous recevez une proposition adaptée (sans jargon).</li>
                  </ul>
                </div>
              </motion.div>

              {/* Formulaire */}
              <motion.form
                {...fadeUp(0.1)}
                onSubmitCapture={onSubmitCapture}
                onSubmit={onSubmit}
                className="lg:col-span-2 grid grid-cols-1 gap-4 rounded-3xl border border-slate-800 bg-slate-950/80 p-5"
                noValidate
              >
                {/* Honeypot caché */}
                <div className="hidden">
                  <label htmlFor="company_2">Company</label>
                  <input
                    id="company_2"
                    type="text"
                    value={form._honeypot}
                    onChange={onChange("_honeypot")}
                  />
                </div>

                <div>
                  <label htmlFor="name" className="text-sm font-medium text-slate-100">
                    Nom & société
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={onChange("name")}
                    className={`mt-1 w-full rounded-2xl border bg-slate-950/60 px-4 py-3 text-sm text-slate-50 outline-none transition focus:ring-2 focus:ring-sky-500 ${
                      errors.name ? "border-red-500/70" : "border-slate-700"
                    }`}
                    placeholder="Ex. Marie Dupont – Acme SARL"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "err-name" : undefined}
                  />
                  {errors.name && (
                    <p id="err-name" className="mt-1 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-slate-100">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={onChange("email")}
                      className={`mt-1 w-full rounded-2xl border bg-slate-950/60 px-4 py-3 text-sm text-slate-50 outline-none transition focus:ring-2 focus:ring-sky-500 ${
                        errors.email ? "border-red-500/70" : "border-slate-700"
                      }`}
                      placeholder="vous@entreprise.fr"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                    />
                    {errors.email && (
                      <p id="err-email" className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-slate-100">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={onChange("phone")}
                      className={`mt-1 w-full rounded-2xl border bg-slate-950/60 px-4 py-3 text-sm text-slate-50 outline-none transition focus:ring-2 focus:ring-sky-500 ${
                        errors.phone ? "border-red-500/70" : "border-slate-700"
                      }`}
                      placeholder="06 00 00 00 00"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "err-phone" : undefined}
                    />
                    {errors.phone && (
                      <p id="err-phone" className="mt-1 text-xs text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium text-slate-100">
                    Votre besoin
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={onChange("message")}
                    className={`mt-1 w-full rounded-2xl border bg-slate-950/60 px-4 py-3 text-sm text-slate-50 outline-none transition focus:ring-2 focus:ring-sky-500 ${
                      errors.message ? "border-red-500/70" : "border-slate-700"
                    }`}
                    placeholder="Décrivez votre contexte, vos objectifs et vos contraintes…"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "err-message" : undefined}
                  />
                  {errors.message && (
                    <p id="err-message" className="mt-1 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-2 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={onChange("consent")}
                      className="h-4 w-4 rounded border-slate-700 bg-slate-950/60 text-sky-500"
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? "err-consent" : undefined}
                    />
                    J&apos;accepte d&apos;être recontacté(e) par Silicium 360.
                  </label>
                  <button
                    type="submit"
                    onClick={onClickButton}
                    disabled={status.sending}
                    className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:opacity-50"
                  >
                    {status.sending ? "Envoi..." : "Envoyer le message"}
                  </button>
                </div>
                {errors.consent && (
                  <p id="err-consent" className="text-xs text-red-400">
                    {errors.consent}
                  </p>
                )}

                {status.ok === true && (
                  <p className="mt-1 text-xs text-emerald-400">{status.msg}</p>
                )}
                {status.ok === false && (
                  <p className="mt-1 text-xs text-red-400">Erreur : {status.msg}</p>
                )}

                <p className="mt-2 text-[11px] text-slate-500">
                  En envoyant ce formulaire, vous acceptez notre politique de confidentialité. Aucune donnée n&apos;est partagée à des
                  tiers.
                </p>
              </motion.form>
            </div>
          </div>
        </section>
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
              <div className="text-[11px] font-medium tracking-[0.18em] text-slate-200">SILICIUM 360</div>
              <div className="text-[11px] text-slate-500">
                © {new Date().getFullYear()} — Tous droits réservés.
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-[11px]">
            <a href="#" className="hover:text-slate-200">
              Mentions légales
            </a>
            <a href="#" className="hover:text-slate-200">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
