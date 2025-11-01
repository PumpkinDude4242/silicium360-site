import { useState } from "react";

function decodeBase64(b64) {
  try { return atob(b64); }
  catch { return ""; }
}

export default function RevealContact({
  kind = "phone",           // "phone" | "email"
  label = "Afficher",
  valueB64,                 // valeur encodée en base64
  masked = "",              // texte masqué initial (ex: "06 ** ** ** **")
  delayMs = 400,            // petite latence anti-bot
  className = "",
  onReveal,                 // callback optionnel
}) {
  const [revealed, setRevealed] = useState(false);
  const [value, setValue] = useState("");

  const handleReveal = async () => {
    await new Promise(r => setTimeout(r, delayMs)); // micro-friction
    const v = decodeBase64(valueB64);
    setValue(v);
    setRevealed(true);
    onReveal?.(kind, v);
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(value); } catch {}
  };

  if (!revealed) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        {masked && <span aria-hidden="true">{masked}</span>}
        <button
          type="button"
          onClick={handleReveal}
          className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 text-sm"
          aria-label={`Afficher le ${kind === "phone" ? "numéro" : "mail"}`}
        >
          {label}
        </button>
        <noscript>
          <span className="ml-2 text-xs text-gray-500">
            (Activez JavaScript pour afficher le {kind === "phone" ? "numéro" : "mail"})
          </span>
        </noscript>
      </div>
    );
  }

  const href = kind === "phone"
    ? `tel:${value.replace(/\s+/g, "")}`
    : `mailto:${value}`;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <a
        href={href}
        className="underline underline-offset-4"
        rel="nofollow"
        aria-label={`${kind === "phone" ? "Appeler" : "Écrire à"} ${value}`}
      >
        {value}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 text-sm"
        aria-label="Copier"
        title="Copier"
      >
        Copier
      </button>
    </div>
  );
}
