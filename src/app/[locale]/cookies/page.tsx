import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Link } from "@/i18n/navigation";

export default function CookiesPage() {

  return (

    <>

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold mb-10">
          Politique de cookies
        </h1>

      <section className="space-y-8 text-sm leading-7 text-gray-700">

        <div>
          <p>
            La présente politique de cookies explique comment
            L&apos;Auberge de St Aubin utilise des cookies
            et technologies similaires lors de votre navigation sur le site.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            1. Qu’est-ce qu’un cookie ?
          </h2>

          <p>
            Un cookie est un petit fichier texte enregistré
            sur votre appareil (ordinateur, smartphone ou tablette)
            lorsque vous consultez un site internet.
          </p>

          <p>
            Les cookies permettent notamment d’assurer
            le bon fonctionnement du site,
            d’améliorer l’expérience utilisateur
            et de mesurer l’audience.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            2. Types de cookies utilisés
          </h2>

          <h3 className="font-semibold mt-4 mb-2">
            Cookies essentiels
          </h3>

          <p>
            Ces cookies sont nécessaires au fonctionnement du site
            et ne peuvent pas être désactivés.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Gestion de session</li>
            <li>Sécurité du site</li>
            <li>Fonctionnement des réservations</li>
          </ul>

          <h3 className="font-semibold mt-6 mb-2">
            Cookies de mesure d’audience
          </h3>

          <p>
            Ces cookies permettent de mesurer la fréquentation du site
            et d’améliorer les performances.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Analyse des visites</li>
            <li>Statistiques de navigation</li>
            <li>Performance des pages</li>
          </ul>

          <h3 className="font-semibold mt-6 mb-2">
            Cookies tiers
          </h3>

          <p>
            Certains services tiers utilisés sur le site
            peuvent également déposer des cookies,
            notamment les solutions de paiement,
            cartes interactives ou outils d’analyse.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            3. Gestion des cookies
          </h2>

          <p>
            Lors de votre première visite,
            un bandeau peut vous permettre d’accepter,
            refuser ou personnaliser l’utilisation des cookies.
          </p>

          <p>
            Vous pouvez également configurer votre navigateur
            afin de bloquer ou supprimer les cookies.
          </p>

          <p>
            Le refus de certains cookies peut toutefois
            limiter certaines fonctionnalités du site.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            4. Durée de conservation
          </h2>

          <p>
            Les cookies sont conservés pour une durée maximale
            de 13 mois conformément à la réglementation applicable.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            5. Contact
          </h2>

          <p>
            Pour toute question concernant l’utilisation des cookies,
            vous pouvez nous contacter à l’adresse suivante :
          </p>

          <p className="mt-3">
            contact@auberge-saint-aubin.fr
          </p>
        </div>

      </section>

      </main>

      <Footer />

    </>

  )
}
