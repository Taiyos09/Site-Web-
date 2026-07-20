import Footer from "@/components/Footer";

export default function MentionsLegalesPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">
        Mentions légales
      </h1>

      <section className="space-y-6 text-sm leading-7 text-gray-700">

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Éditeur du site
          </h2>

          <p>
            L&apos;Auberge de St Aubin
          </p>

          <p>
            SARL au capital de 1 000 €
          </p>

          <p>
            Siège social :
            L'Auberge de St Aubin
            21 Rue Saint-Barnabé
            03160 Saint Aubin le Monial
          </p>

          <p>
            SIRET :
            [NUMÉRO SIRET]
          </p>

          <p>
            RCS :
            Montluçon
          </p>

          <p>
            Email :
            contact@auberge-saint-aubin.fr
          </p>

          <p>
            Téléphone :
            04 70 66 50 97
          </p>

          <p>
            Gérants :
            Anthony Duchenne-Brouillet
            et Grégoriane Brack
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Hébergement
          </h2>

          <p>
            Le site est hébergé par :
          </p>

          <p>
            Vercel Inc.
          </p>

          <p>
            340 S Lemon Ave #4133
            Walnut, CA 91789
            États-Unis
          </p>

          <p>
            https://vercel.com
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Propriété intellectuelle
          </h2>

          <p>
            L’ensemble du contenu présent sur ce site
            (textes, images, logos, vidéos, éléments graphiques)
            est protégé par le droit de la propriété intellectuelle.
          </p>

          <p>
            Toute reproduction, représentation,
            modification ou exploitation,
            totale ou partielle,
            sans autorisation écrite préalable
            est interdite.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Responsabilité
          </h2>

          <p>
            L’éditeur du site met tout en œuvre
            pour fournir des informations fiables
            et régulièrement mises à jour.
          </p>

          <p>
            Toutefois,
            il ne saurait être tenu responsable
            des erreurs, omissions
            ou indisponibilités du service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Données personnelles
          </h2>

          <p>
            Les informations collectées via le site
            sont utilisées uniquement
            dans le cadre de la relation commerciale
            et des réservations.
          </p>

          <p>
            Conformément au RGPD,
            vous disposez d’un droit d’accès,
            de rectification
            et de suppression des données vous concernant.
          </p>
        </div>

      </section>

        <Footer />
        
    </main>


  )
}