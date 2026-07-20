  import Footer from "@/components/Footer";
  import { Link } from "@/i18n/navigation";
 export default function ConfidentialitePage() {
  return (

    <>
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">
        Politique de confidentialité
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
      </p>

      <section className="space-y-8 text-sm leading-7 text-gray-700">

        <div>
          <p>
            La présente politique de confidentialité a pour objectif
            d'informer les utilisateurs du site de L&​apos;Auberge de St Aubin
            sur la manière dont leurs données personnelles sont collectées,
            utilisées et protégées, conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Responsable du traitement
          </h2>

          <p>
            <strong>L&​apos;Auberge de St Aubin</strong>
          </p>

          <p>
            SARL au capital de 5 000 €
          </p>

          <p>
            Adresse : 21 Rue Saint-Barnabé, 03160 Saint Aubin le Monial
          </p>

          <p>
            Email : contact@auberge-saint-aubin.fr
          </p>

          <p>
            Téléphone : 04 70 66 50 97
          </p>

          <p className="mt-3">
            En cas de réclamation, vous avez également le droit de saisir la CNIL :
          </p>

          <p>
            <a href="https://www.cnil.fr" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              https://www.cnil.fr
            </a>
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
            <li>L'exécution d'un contrat lors d'une réservation</li>
            <li>Le consentement de l'utilisateur</li>
            <li>Les obligations légales applicables</li>
            <li>L'intérêt légitime de l'établissement</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Durée de conservation
          </h2>

          <p>
            Les données personnelles sont conservées selon les durées suivantes :
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li><strong>Données de réservation :</strong> 5 ans à compter de la fin du séjour (obligations fiscales et comptables)</li>
            <li><strong>Données de contact (formulaire) :</strong> 3 ans à compter du dernier contact</li>
            <li><strong>Données de navigation (cookies) :</strong> 13 mois maximum</li>
            <li><strong>Données administratives :</strong> 10 ans (obligations légales)</li>
          </ul>

          <p className="mt-3">
            Au-delà de ces durées, les données sont soit supprimées, soit anonymisées.
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
            <li>MySQL (base de données)</li>
            <li>Vercel (hébergement du site)</li>
            <li>Gmail (service d'envoi d'emails)</li>
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

          <p className="mt-3">
            Ces mesures incluent :
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Hachage des mots de passe avec bcrypt</li>
            <li>Rate-limiting sur les tentatives de connexion</li>
            <li>Validation des entrées utilisateur</li>
            <li>Connexion HTTPS sécurisée</li>
            <li>Accès restreint à la base de données</li>
          </ul>
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
            <li><strong>Droit d'accès (Article 15) :</strong> Savoir si vos données sont traitées et accéder à celles-ci</li>
            <li><strong>Droit de rectification (Article 16) :</strong> Demander la correction de données inexactes</li>
            <li><strong>Droit à l'effacement (Article 17) :</strong> Demander la suppression de vos données (droit à l'oubli)</li>
            <li><strong>Droit d'opposition (Article 21) :</strong> Vous opposer au traitement de vos données</li>
            <li><strong>Droit à la limitation (Article 18) :</strong> Demander la limitation du traitement</li>
            <li><strong>Droit à la portabilité (Article 20) :</strong> Recevoir vos données dans un format structuré</li>
          </ul>

          <p className="mt-3">
            <strong>Pour exercer vos droits :</strong>
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Par email : contact@auberge-saint-aubin.fr</li>
            <li>Par courrier : 21 Rue Saint-Barnabé, 03160 Saint Aubin le Monial</li>
            <li>Par téléphone : 04 70 66 50 97</li>
          </ul>

          <p className="mt-3">
            Nous répondrons à votre demande dans un délai d'un mois à compter de sa réception.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Cookies
          </h2>

          <p>
            Le site peut utiliser des cookies afin d'améliorer l'expérience utilisateur,
            mesurer l'audience ou assurer certaines fonctionnalités essentielles.
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

    <Footer />
  </>
  )
}
