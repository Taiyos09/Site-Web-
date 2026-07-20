import Footer from "@/components/Footer";

export default function CGVPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">
        Conditions Générales de Vente
      </h1>

      <section className="space-y-8 text-sm leading-7 text-gray-700">

        <div>
          <p>
            Les présentes Conditions Générales de Vente définissent
            les droits et obligations des parties dans le cadre
            des réservations effectuées auprès de L&apos;Auberge de St Aubin.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            1. Objet
          </h2>

          <p>
            Les présentes CGV encadrent les modalités de réservation,
            de paiement et d’occupation des chambres proposées
            par L&apos;Auberge de St Aubin.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            2. Réservation
          </h2>

          <p>
            Toute réservation devient effective après validation
            par l’établissement et réception du paiement ou de l’acompte demandé.
          </p>

          <p>
            Le client garantit l’exactitude des informations transmises
            lors de la réservation.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            3. Tarifs
          </h2>

          <p>
            Les tarifs affichés sont exprimés en euros TTC.
          </p>

          <p>
            L’établissement se réserve le droit de modifier ses tarifs
            à tout moment.
            Toutefois, les réservations confirmées restent facturées
            au tarif en vigueur au moment de la réservation.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            4. Paiement
          </h2>

          <p>
            Le règlement peut être effectué par carte bancaire,
            espèces ou tout autre moyen accepté par l’établissement.
          </p>

          <p>
            Un acompte ou un prépaiement peut être demandé
            afin de confirmer la réservation.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            5. Conditions d’annulation
          </h2>

          <p>
            Toute annulation doit être communiquée par écrit.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>
              Annulation gratuite jusqu’à 10 avant l’arrivée.
            </li>

            <li>
              En cas d’annulation tardive,
              l’acompte pourra être conservé.
            </li>

            <li>
              En cas de non-présentation (« no-show »),
              la totalité de la première nuit pourra être facturée.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            6. Arrivée et départ
          </h2>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>
              Check-in : à partir de 16h
            </li>

            <li>
              Check-out : avant 11h
            </li>
          </ul>

          <p className="mt-3">
            Toute arrivée tardive doit être signalée à l’établissement.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            7. Occupation des chambres
          </h2>

          <p>
            Les chambres sont prévues pour un nombre maximum de personnes.
            Toute occupation supérieure non autorisée pourra entraîner
            un refus d’accès ou une facturation complémentaire.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            8. Animaux
          </h2>

          <p>
            Les animaux sont [AUTORISÉS]
            au sein de l’établissement.
          </p>

          <p>
            En cas d’acceptation,
            un supplément pourra être appliqué.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            9. Dégradations
          </h2>

          <p>
            Le client est responsable des dommages causés
            dans les chambres ou les parties communes.
          </p>

          <p>
            Toute dégradation pourra faire l’objet
            d’une facturation complémentaire.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            10. Responsabilité
          </h2>

          <p>
            L’établissement ne saurait être tenu responsable
            en cas de perte, vol ou détérioration des effets personnels
            des clients.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            11. Données personnelles
          </h2>

          <p>
            Les données collectées lors des réservations
            sont traitées conformément à notre politique de confidentialité.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            12. Litiges
          </h2>

          <p>
            Les présentes CGV sont soumises au droit français.
          </p>

          <p>
            En cas de litige,
            les parties rechercheront une solution amiable avant toute action judiciaire.
          </p>
        </div>

      </section>
      <Footer />
    </main>
  )
}
