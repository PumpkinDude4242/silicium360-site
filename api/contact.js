// /api/contact.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const {
      name, email, phone, message, consent,
      company = "", _honeypot = "", page = ""
    } = req.body || {};

    // Honeypot anti-bot
    if (_honeypot) return res.status(200).json({ ok: true });

    // Validation serveur
    const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
    if (!name || !emailOk(email) || !message || !consent) {
      return res.status(400).json({ error: "Champs invalides ou manquants" });
    }

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

    // Envoi via Resend si la clé existe, sinon "simulé: true"
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
        from: "Silicium 360 <noreply@silicium360.fr>",
        to: [to],
        subject,
        html,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      return res.status(502).json({ error: "Échec d'envoi email", detail });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "Erreur serveur", detail: e?.message });
  }
}

function escapeHtml(s = "") {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}
