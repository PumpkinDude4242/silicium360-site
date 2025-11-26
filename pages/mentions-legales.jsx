export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mentions légales</h1>

      <section className="space-y-4 text-slate-300 text-sm">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">1. Éditeur du site</h2>
          <p>
            <strong>Silicium 360</strong><br />
            Entreprise individuelle – Infogérance & Services IT<br />
            SIREN : 913894788<br />
            Adresse : Île-de-France<br />
            Email : contact@silicium360.fr
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100">2. Hébergement</h2>
          <p>
            Le site est hébergé par Vercel Inc.<br />
            Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
            Site web : https://vercel.com
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100">3. Propriété intellectuelle</h2>
          <p>
            L’ensemble des contenus (textes, images, logos, éléments graphiques, etc.)
            est la propriété exclusive de Silicium 360, sauf mentions contraires.
            Toute reproduction ou utilisation non autorisée est strictement interdite.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100">4. Données personnelles</h2>
          <p>
            Les informations collectées via le formulaire de contact sont uniquement utilisées
            pour répondre aux demandes. Aucune donnée n’est vendue ou transférée à des tiers.
          </p>
          <p>
            Vous disposez d’un droit d’accès, de rectification et de suppression en écrivant à :
            contact@silicium360.fr.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100">5. Responsabilité</h2>
          <p>
            Silicium 360 s’efforce de fournir des informations fiables, mais ne peut garantir
            l’absence totale d’erreurs. L’utilisation du site se fait sous votre responsabilité.
          </p>
        </div>
      </section>

      <footer className="mt-10 text-xs text-slate-500">
        © {new Date().getFullYear()} Silicium 360 — Tous droits réservés.
      </footer>
    </div>
  );
}
