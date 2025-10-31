import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Server, Headphones, Network, Lock, Cloud, Mail, Phone, MapPin } from "lucide-react";

// Palette (référence)
// Bleu acier: #1A2A3A
// Gris foncé: #3C3C3C
// Gris clair: #F2F4F6
// Accent bleu clair: #4B8DF8

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
  console.log("submit", form);
  ev.preventDefault();
  if (!validate()) return;
  setStatus({ sending: true, ok: null, msg: "" });

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        consent: form.consent,
        company: form.company || "",
        _honeypot: form._honeypot,
        page: typeof window !== "undefined" ? window.location.href : "",
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Échec d’envoi");

    setStatus({ sending: false, ok: true, msg: "Message envoyé. Merci ! Réponse sous 24h ouvrées." });
    setForm({ name: "", email: "", phone: "", message: "", consent: false, company: "", _honeypot: "" });
    setErrors({});
  } catch (err) {
    setStatus({ sending: false, ok: false, msg: err.message || "Erreur réseau" });
  }
};

  return (
    <div className="min-h-screen bg-white text-[#3C3C3C]">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-3" aria-label="Silicium 360 — Accueil">
              <div className="relative h-9 w-9 rounded-full ring-2 ring-[#1A2A3A] flex items-center justify-center">
                <span className="text-xs font-bold text-[#1A2A3A]">360</span>
              </div>
              <div className="leading-tight">
                <div className="text-xl font-extrabold tracking-wide text-[#1A2A3A]">SILICIUM 360</div>
                <div className="text-xs text-gray-500">Infogérance & Services IT</div>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="#services" className="hover:text-[#1A2A3A]">Services</a>
              <a href="#engagements" className="hover:text-[#1A2A3A]">Engagements</a>
              <a href="#expertises" className="hover:text-[#1A2A3A]">Expertises</a>
              <a href="#contact" className="hover:text-[#1A2A3A]">Contact</a>
              <a href="#contact" className="inline-flex items-center rounded-2xl border border-[#1A2A3A] px-4 py-2 text-[#1A2A3A] font-semibold hover:bg-[#1A2A3A] hover:text-white transition">Devis gratuit</a>
            </nav>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-gray-300" aria-label="Ouvrir le menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="#1A2A3A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-2 text-sm">
              <a href="#services" onClick={() => setMenuOpen(false)} className="py-2">Services</a>
              <a href="#engagements" onClick={() => setMenuOpen(false)} className="py-2">Engagements</a>
              <a href="#expertises" onClick={() => setMenuOpen(false)} className="py-2">Expertises</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="py-2">Contact</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="inline-flex w-fit items-center rounded-2xl border border-[#1A2A3A] px-4 py-2 text-[#1A2A3A] font-semibold">Devis gratuit</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F2F4F6]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <motion.h1 initial={{opacity:0, y: 10}} whileInView={{opacity:1, y:0}} viewport={{ once: true }} transition={{ duration: .5 }} className="text-4xl md:text-5xl font-extrabold text-[#1A2A3A] leading-tight">
                La performance informatique <span className="whitespace-nowrap">sans interruption</span>
              </motion.h1>
              <p className="mt-6 text-lg text-gray-600 max-w-prose">
                Silicium 360 accompagne les TPE/PME dans la <strong>gestion</strong>, la <strong>maintenance</strong> et la <strong>sécurité</strong> de leurs systèmes.
                Supervision 24/7, sauvegardes robustes, support réactif.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="rounded-xl bg-[#1A2A3A] px-5 py-3 text-white font-semibold hover:opacity-90">Demander un devis</a>
                <a href="#services" className="rounded-xl ring-1 ring-[#1A2A3A] px-5 py-3 text-[#1A2A3A] font-semibold hover:bg-[#1A2A3A] hover:text-white">Découvrir nos services</a>
              </div>
              <p className="mt-4 text-sm text-gray-500">SLA au forfait, sans surprise. Interventions à distance et sur site.</p>
            </div>
            <div className="relative">
              <motion.div initial={{opacity:0, scale:.96}} whileInView={{opacity:1, scale:1}} viewport={{ once: true }} transition={{ duration: .6 }} className="rounded-2xl bg-white shadow-xl p-6 ring-1 ring-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {icon: <Server className="h-6 w-6 text-[#1A2A3A]"/>, title: "Infogérance", text: "Supervision, mises à jour, inventaire, support"},
                    {icon: <Lock className="h-6 w-6 text-[#1A2A3A]"/>, title: "Cybersécurité", text: "Durcissement, EDR, MFA, audits"},
                    {icon: <Cloud className="h-6 w-6 text-[#1A2A3A]"/>, title: "Sauvegarde 3-2-1", text: "On‑site, cloud, PRA"},
                    {icon: <Network className="h-6 w-6 text-[#1A2A3A]"/>, title: "Réseau", text: "Wi‑Fi pro, VPN, firewall"},
                  ].map((b, i) => (
                    <div key={i} className="rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center gap-3">
                        {b.icon}
                        <div className="font-semibold text-[#1A2A3A]">{b.title}</div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{b.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-[#1A2A3A]">Nos services</h2>
            <p className="mt-2 text-gray-600 max-w-prose">Un catalogue clair, au forfait ou à la demande.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Infogérance complète",
                desc: "Supervision 24/7, mises à jour, gestion des postes & serveurs, inventaire, télémaintenance.",
                points: ["SLA 8/5 ou 24/7", "Rapports mensuels", "Tableau de bord"],
                icon: <ShieldCheck className="h-6 w-6"/>
              },
              {
                title: "Support utilisateurs",
                desc: "Helpdesk réactif, prise en main à distance, interventions sur site planifiées.",
                points: ["Tickets illimités", "Taux de résolution 1er niveau", "Connaissance client"],
                icon: <Headphones className="h-6 w-6"/>
              },
              {
                title: "Sécurité & conformité",
                desc: "Antivirus/EDR, MFA, sauvegardes chiffrées, durcissement Windows, politiques MDM/Intune.",
                points: ["Audit de sécurité", "Plan d'action priorisé", "Sensibilisation"],
                icon: <Lock className="h-6 w-6"/>
              },
              {
                title: "Sauvegarde & PRA",
                desc: "Stratégie 3‑2‑1, sauvegardes locales + cloud, tests de restauration, plan de reprise.",
                points: ["RPO/RTO adaptés", "Chiffrement", "Surveillance quotidienne"],
                icon: <Cloud className="h-6 w-6"/>
              },
              {
                title: "Réseaux & Firewall",
                desc: "Conception LAN/Wi‑Fi, VPN site‑à‑site, accès Zero‑Trust, QoS, supervision.",
                points: ["Pare‑feu nouvelle génération", "Wi‑Fi pro", "Observation en temps réel"],
                icon: <Network className="h-6 w-6"/>
              },
              {
                title: "Conseil & projets",
                desc: "Audit d'infrastructure, migration Microsoft 365, renouvellement PC, virtualisation.",
                points: ["Roadmap 12‑18 mois", "Budget prévisionnel", "Pilotage projet"],
                icon: <Server className="h-6 w-6"/>
              }
            ].map((card, idx) => (
              <div key={idx} className="group rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-3 text-[#1A2A3A]">
                  {card.icon}
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                </div>
                <p className="mt-3 text-sm text-gray-600">{card.desc}</p>
                <ul className="mt-4 space-y-1 text-sm text-gray-700 list-disc list-inside">
                  {card.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section id="engagements" className="bg-[#F2F4F6] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-[#1A2A3A]">Nos engagements</h2>
            <p className="mt-2 text-gray-600 max-w-prose">Un partenariat fondé sur la fiabilité, la transparence et les résultats.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {title:"Disponibilité", text:"Supervision proactive et astreinte selon contrat (SLA)."},
              {title:"Sécurité", text:"Approche Zero‑Trust, MFA et sauvegardes testées."},
              {title:"Clarté", text:"Rapports mensuels, indicateurs clés et conseil pragmatique."}
            ].map((e, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 ring-1 ring-gray-100">
                <h3 className="text-lg font-semibold text-[#1A2A3A]">{e.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertises */}
      <section id="expertises" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-[#1A2A3A]">Expertises</h2>
            <p className="mt-2 text-gray-600 max-w-prose">Windows Server, Microsoft 365, Intune, réseaux Ubiquiti/Omada, sécurité endpoint/EDR, sauvegarde Veeam, virtualisation, scripts d'automatisation.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#1A2A3A]">Secteurs servis</h3>
              <ul className="mt-3 list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>TPE/PME, retail & associations</li>
                <li>Services et professions libérales</li>
                <li>Éducation & organismes sociaux</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#1A2A3A]">Méthode</h3>
              <ul className="mt-3 list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Audit initial et plan d'action</li>
                <li>Standardisation & automatisation</li>
                <li>Mesure continue et amélioration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#F2F4F6] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-[#1A2A3A]">Contact</h2>
            <p className="mt-2 text-gray-600 max-w-prose">Parlons de votre infrastructure et de vos objectifs. Réponse sous 24h ouvrées.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-100 space-y-4">
              <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-[#1A2A3A]"/><span>contact@silicium360.fr</span></div>
              <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-[#1A2A3A]"/><span>+33 6 00 00 00 00</span></div>
              <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-[#1A2A3A]"/><span>Île‑de‑France</span></div>
              <p className="text-sm text-gray-600">Interventions à distance France entière, sur site en Île‑de‑France.</p>
            </div>

            <form
  onSubmit={onSubmit}
  className="lg:col-span-2 rounded-2xl bg-white p-6 ring-1 ring-gray-100 grid grid-cols-1 gap-4"
  noValidate
>
  {/* Honeypot (champ caché) */}
  <div className="hidden">
    <label htmlFor="company_2">Company</label>
    <input id="company_2" type="text" value={form._honeypot} onChange={onChange("_honeypot")} />
  </div>

  <div>
    <label htmlFor="name" className="text-sm font-medium text-[#1A2A3A]">Nom &amp; société</label>
    <input
      id="name"
      type="text"
      value={form.name}
      onChange={onChange("name")}
      className={`mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#4B8DF8] ${errors.name ? "border-red-400" : "border-gray-300"}`}
      placeholder="Ex. Marie Dupont – Acme SARL"
      aria-invalid={!!errors.name}
      aria-describedby={errors.name ? "err-name" : undefined}
    />
    {errors.name && <p id="err-name" className="mt-1 text-sm text-red-600">{errors.name}</p>}
  </div>

  <div className="grid md:grid-cols-2 gap-4">
    <div>
      <label htmlFor="email" className="text-sm font-medium text-[#1A2A3A]">Email</label>
      <input
        id="email"
        type="email"
        value={form.email}
        onChange={onChange("email")}
        className={`mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#4B8DF8] ${errors.email ? "border-red-400" : "border-gray-300"}`}
        placeholder="vous@entreprise.fr"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "err-email" : undefined}
      />
      {errors.email && <p id="err-email" className="mt-1 text-sm text-red-600">{errors.email}</p>}
    </div>
    <div>
      <label htmlFor="phone" className="text-sm font-medium text-[#1A2A3A]">Téléphone</label>
      <input
        id="phone"
        type="tel"
        value={form.phone}
        onChange={onChange("phone")}
        className={`mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#4B8DF8] ${errors.phone ? "border-red-400" : "border-gray-300"}`}
        placeholder="06 00 00 00 00"
        aria-invalid={!!errors.phone}
        aria-describedby={errors.phone ? "err-phone" : undefined}
      />
      {errors.phone && <p id="err-phone" className="mt-1 text-sm text-red-600">{errors.phone}</p>}
    </div>
  </div>

  <div>
    <label htmlFor="message" className="text-sm font-medium text-[#1A2A3A]">Votre besoin</label>
    <textarea
      id="message"
      rows={5}
      value={form.message}
      onChange={onChange("message")}
      className={`mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#4B8DF8] ${errors.message ? "border-red-400" : "border-gray-300"}`}
      placeholder="Décrivez votre contexte, vos objectifs et vos contraintes…"
      aria-invalid={!!errors.message}
      aria-describedby={errors.message ? "err-message" : undefined}
    />
    {errors.message && <p id="err-message" className="mt-1 text-sm text-red-600">{errors.message}</p>}
  </div>

  <div className="flex items-center justify-between">
    <label className="text-xs text-gray-500 flex items-center gap-2">
      <input
        type="checkbox"
        checked={form.consent}
        onChange={onChange("consent")}
        className="h-4 w-4 rounded border-gray-300"
        aria-invalid={!!errors.consent}
        aria-describedby={errors.consent ? "err-consent" : undefined}
      />
      J'accepte d'être recontacté(e) par Silicium 360.
    </label>
    <button
      type="submit"
      disabled={status.sending}
      className="rounded-xl bg-[#1A2A3A] px-6 py-3 text-white font-semibold disabled:opacity-50 hover:opacity-90"
    >
      {status.sending ? "Envoi..." : "Envoyer"}
    </button>
  </div>
  {errors.consent && <p id="err-consent" className="text-sm text-red-600">{errors.consent}</p>}

  {status.ok === true && (
    <p className="text-sm text-green-700 mt-2">{status.msg}</p>
  )}
  {status.ok === false && (
    <p className="text-sm text-red-600 mt-2">Erreur : {status.msg}</p>
  )}

  <p className="text-xs text-gray-400">
    En envoyant ce formulaire, vous acceptez notre politique de confidentialité. Aucune donnée n'est partagée à des tiers.
  </p>
</form>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded-full ring-2 ring-[#1A2A3A] flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#1A2A3A]">360</span>
              </div>
              <div className="text-sm text-gray-600">© {new Date().getFullYear()} Silicium 360 — Tous droits réservés.</div>
            </div>
            <div className="text-sm text-gray-500 flex gap-4">
              <a href="#" className="hover:text-[#1A2A3A]">Mentions légales</a>
              <a href="#" className="hover:text-[#1A2A3A]">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
