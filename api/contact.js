// /api/contact.js
export default async function handler(req, res) {
  // Accepter uniquement POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // ---- Rate limiting (IP) ----
  if (tooMany(req)) {
    return res.status(429).json({ error: "Trop de requêtes, réessayez plus tard." });
  }

  try {
    // ---- Origin whitelist (anti-abuse intersite) ----
    const origin = (req.headers.origin || "").replace(/\/$/, "");
    const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "https://silicium360.fr,https://www.silicium360.fr")
      .split(",")
      .map(s => s.trim().replace(/\/$/, ""))
      .filter(Boolean);
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return res.status(403).json({ error: "Origin interdit" });
    }

    // ---- Extraction champs ----
    const {
      name, email, phone, message, consent,
      company = "", _honeypot = "", page = "",
      // Turnstile envoie le token dans ce champ (name="cf-turnstile-response")
      ["cf-turnstile-response"]: turnstileToken
    } = req.body || {};

    // ---- Honeypot anti-bot ----
    if (_honeypot) {
      // On fait comme si c'était ok pour ne pas entraîner les bots
      return res.status(200).json({ ok: true });
    }

    // ---- Captcha Turnstile (si secret défini) ----
    const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET || "";
    if (TURNSTILE_SECRET) {
      if (!turnstileToken) {
        return res.status(400).json({ error: "Captcha manquant" });
      }
      const vr = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET,
          response: turnstileToken,
          // bonus: si besoin -> remoteip: req.headers["x-forwarded-for"] || ""
        })
      });
      const vjson = await vr.json();
      if (!vjson?.success) {
        return res.status(400).json({ error: "Captcha invalide" });
      }
    }

    // ---- Validation serveur ----
    const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
    if (!name || !emailOk(email) || !message || !consent) {
      return res.status(400).json({ error: "Champs invalides ou manquants" });
    }

    // ---- Garde-fous anti-spam soft ----
    if (message.length > 4000) {
      return res.status(400).json({ error: "Message trop long" });
    }
    const linkCount = (message.match(/https?:\/\/|www\./gi) || []).length;
    if (linkCount > 3) {
      return res.status(400).json({ error: "Trop de liens détectés" });
    }

    // ---- Préparation email ----
    const to = process.env.SEND_TO || "contact@silicium360.fr";
    const subject = `Nouveau message site — ${name}`;
    const html = `
      <h2>Nouveau message du site Silicium 360</h2>
      <p><b>Nom & société:</b> ${escapeHtml(name)} ${company ? `(${escapeHtml(company)})` : ""}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Téléphone:</b> ${escapeHtml(phone || "")}</p>
      <p><b>Consentement:</b> ${consent ? "oui" : "non"}</p>
      <p><b>Page:</b> ${escapeHtml(page || "")}</p>
      <hr/>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `;

    // ---- Envoi via Resend (simulation si pas de clé) ----
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return res.status(200).json({ ok: true, simulated: true });
    }

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Silicium 360 <" + (process.env.SEND_FROM || "onboarding@resend.dev") + ">",
        to: [to],
        subject,
        html,
      }),
    });

    if (!r.ok) {
      const detail = await safeText(r);
      // Journaliser pour analyse
      console.error("Resend error:", r.status, detail?.slice?.(0, 800));
      return res.status(502).json({ error: "Échec d'envoi email", detail });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return res.status(500).json({ error: "Erreur serveur", detail: e?.message || String(e) });
  }
}

// ---- Utils ----

// Petite mémoire process pour limiter les rafales (OK en serverless pour du soft limit)
const BUCKET = new Map(); // ip -> { count, ts }
const WINDOW_MS = 60_000; // 1 minute
const LIMIT = 5;          // 5 requêtes/min/IP

function tooMany(req) {
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown");
  const now = Date.now();
  const entry = BUCKET.get(ip) || { count: 0, ts: now };
  if (now - entry.ts > WINDOW_MS) {
    entry.count = 0; entry.ts = now;
  }
  entry.count++;
  BUCKET.set(ip, entry);
  return entry.count > LIMIT;
}

function escapeHtml(s = "") {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

async function safeText(resp) {
  try { return await resp.text(); } catch { return ""; }
}
