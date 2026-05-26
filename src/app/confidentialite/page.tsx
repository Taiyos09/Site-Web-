export default function ConfidentialitePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">
        Politique de confidentialité
      </h1>

      <section className="space-y-8 text-sm leading-7 text-gray-700">

        <div>
          <p>
            La présente politique de confidentialité a pour objectif
            d’informer les utilisateurs du site de L&apos;Auberge de St Aubin
            sur la manière dont leurs données personnelles sont collectées,
            utilisées et protégées.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Responsable du traitement
          </h2>

          <p>
            L&apos;Auberge de St Aubin
          </p>

          <p>
            SARL au capital de [CAPITAL SOCIAL]
          </p>

          <p>
            Adresse : [ADRESSE COMPLÈTE]
          </p>

          <p>
            Email : contact@auberge-saint-aubin.fr
          </p>

          <p>
            Téléphone : [NUMÉRO]
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Données collectées
          </h2>

          <p>
            Nous pouvons collecter les données suivantes :
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Informations de réservation</li>
            <li>Adresse IP</li>
            <li>Données de navigation</li>
            <li>Préférences liées au séjour</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Finalités de la collecte
          </h2>

          <p>
            Les données collectées sont utilisées pour :
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Gérer les réservations</li>
            <li>Répondre aux demandes de contact</li>
            <li>Assurer le suivi client</li>
            <li>Émettre des factures</li>
            <li>Améliorer le fonctionnement du site</li>
            <li>Respecter les obligations légales</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Base légale du traitement
          </h2>

          <p>
            Les traitements réalisés reposent sur :
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>L’exécution d’un contrat lors d’une réservation</li>
            <li>Le consentement de l’utilisateur</li>
            <li>Les obligations légales applicables</li>
            <li>L’intérêt légitime de l’établissement</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Durée de conservation
          </h2>

          <p>
            Les données personnelles sont conservées uniquement
            pendant la durée nécessaire aux finalités pour lesquelles
            elles ont été collectées, conformément à la réglementation en vigueur.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Partage des données
          </h2>

          <p>
            Certaines données peuvent être transmises à des prestataires techniques
            nécessaires au fonctionnement du site et des réservations.
          </p>

          <p>
            Cela peut notamment inclure :
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>MySql(base de données)</li>
            <li>Stripe ou SumUp (paiement sécurisé)</li>
            <li>Vercel (hébergement du site)</li>
          </ul>

          <p className="mt-3">
            Ces prestataires appliquent également des mesures conformes
            au RGPD.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Sécurité des données
          </h2>

          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles
            afin de protéger les données personnelles contre toute perte,
            accès non autorisé, divulgation ou destruction.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Droits des utilisateurs
          </h2>

          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD),
            vous disposez des droits suivants :
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Droit d’accès</li>
            <li>Droit de rectification</li>
            <li>Droit d’effacement</li>
            <li>Droit d’opposition</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
          </ul>

          <p className="mt-3">
            Pour exercer vos droits,
            vous pouvez nous contacter à l’adresse suivante :
            contact@auberge-saint-aubin.fr
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Cookies
          </h2>

          <p>
            Le site peut utiliser des cookies afin d’améliorer l’expérience utilisateur,
            mesurer l’audience ou assurer certaines fonctionnalités essentielles.
          </p>

          <p>
            Vous pouvez configurer votre navigateur afin de refuser tout ou partie
            des cookies.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Modification de la politique
          </h2>

          <p>
            La présente politique de confidentialité peut être modifiée à tout moment
            afin de garantir sa conformité avec la législation en vigueur.
          </p>
        </div>

      </section>
    </main>
  )
}
