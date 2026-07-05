"use client"

import {
  Suspense,
  useMemo,
  useState,
  useEffect,
} from "react"

import Link from "next/link"
import Footer from "@/components/Footer"
import { useSearchParams } from "next/navigation"

type ReservationData = {
  from: string
  to: string
  roomName: string
  roomSlug: string
  roomId: number
  status: string
  nights: number
  breakfastDays: number
  lunchDays: number
  dinnerDays: number
  breakfastTotal: number
  lunchTotal: number
  dinnerTotal: number
  adults: number
  children: number
  babies: number
  touristTaxTotal: number
  pets: boolean
  breakfast: boolean
  lunch: boolean
  dinner: boolean
  litParapluie: boolean
  roomPrice: number
  roomTotal: number
  total: number
}

function CheckoutContent() {

  const searchParams =
    useSearchParams()

  const [settings, setSettings] =
  useState<any>(null)

useEffect(() => {

  const loadSettings =
    async () => {

      const response =
        await fetch(
          "/api/hotel-settings"
        )

      const data =
        await response.json()

      setSettings(data)
    }

  loadSettings()

}, [])

  const reservation: ReservationData =
    useMemo(() => {

      const arrival =
        searchParams.get(
          "arrival"
        ) || ""

      const departure =
        searchParams.get(
          "departure"
        ) || ""

      const roomName =
        searchParams.get(
          "roomName"
        ) || ""

      const roomSlug =
        searchParams.get(
          "roomSlug"
        ) || ""

      const roomIds =
        JSON.parse(
          searchParams.get(
            "roomIds"
          ) || "[]"
        )

      const adults =
  Number(
    searchParams.get(
      "adults"
    ) || 1
  )

const children =
  Number(
    searchParams.get(
      "children"
    ) || 0
  )

const babies =
  Number(
    searchParams.get(
      "babies"
    ) || 0
  )

      const pets =
        searchParams.get(
          "pets"
        ) === "true"

      const breakfast =
        searchParams.get(
          "breakfast"
        ) === "true"

      const lunch =
        searchParams.get(
          "lunch"
        ) === "true"

      const dinner =
        searchParams.get(
          "dinner"
        ) === "true"

      const litParapluie =
         searchParams.get(
            "litParapluie"
          ) === "true"

      const total =
        Number(
          searchParams.get(
            "total"
          ) || 0
        )

      const roomPrice =
  Number(
    searchParams.get(
      "roomPrice"
    ) || 0
  )

const roomTotal =
  Number(
    searchParams.get(
      "roomTotal"
    ) || 0
  )

      const fromDate =
        new Date(arrival)

      const toDate =
        new Date(departure)

      const nights =
        Math.max(
          1,
          Math.ceil(
            (
              toDate.getTime() -
              fromDate.getTime()
            ) /
            (
              1000 *
              60 *
              60 *
              24
            )
          )
        )

    /* =========================
   SERVICES
========================= */

const breakfastDays =
  nights;

let lunchDays = 0;
let dinnerDays = 0;

const occupancy =
  adults + children;

const current =
  new Date(fromDate);

while (
  current < toDate
) {

  const day =
    current.getDay();

  // Repas du soir :
  // jour d'arrivée inclus
  // dimanche exclu
  if (day !== 0) {
    dinnerDays++;
  }

  // Repas du midi :
  // pas le jour d'arrivée
  // pas le dimanche
  if (
    current.getTime() !==
      fromDate.getTime() &&
    day !== 0
  ) {
    lunchDays++;
  }

  current.setDate(
    current.getDate() + 1
  );
}

/* =========================
   TOTAUX
========================= */

const breakfastTotal =
  breakfast
    ? (
        adults *
          (settings?.breakfast ?? 12)
        +
        children * 6
      ) *
      breakfastDays
    : 0;

const lunchTotal =
  lunch
    ? occupancy *
      (settings?.lunch ?? 18) *
      lunchDays
    : 0;

const dinnerTotal =
  dinner
    ? occupancy *
      (settings?.dinner ?? 18) *
      dinnerDays
    : 0;

      return {

        from: arrival,
        to: departure,

        roomName,
        roomSlug,

        roomPrice,
        roomTotal,

        roomId:
          roomIds?.[0] || 0,

        status: "pending",

        nights,

        breakfastDays,
        lunchDays,
        dinnerDays,

        breakfastTotal,
        lunchTotal,
        dinnerTotal,

        adults,
        children,
        babies,

        touristTaxTotal:
         adults *
         nights *
         1.3,

        pets,
        lunch,
        dinner,
        litParapluie,
        breakfast,

        total,
      }

    }, [searchParams])

  const [firstName, setFirstName] =
    useState("")

  const [lastName, setLastName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [phone, setPhone] =
    useState("")

  const [message, setMessage] =
    useState("")

  const [
  showSuccessModal,
  setShowSuccessModal,
] = useState(false)

  const [acceptCGV, setAcceptCGV] =
  useState(false)

  const [
  acceptPrivacy,
  setAcceptPrivacy,
] = useState(false)

  const handleReservation =
    async () => {

      if (
  !firstName ||
  !lastName ||
  !email ||
  !phone
) {

  alert(
    "Veuillez remplir tous les champs."
  )

  return
}

      if (
  !acceptCGV ||
  !acceptPrivacy
) {

  alert(
    "Veuillez accepter les CGV et la politique de confidentialité"
  )

  return
}

      const payload = {

        status: "pending",

        first_name:
          firstName,

        last_name:
          lastName,

        email,
        phone,
        message,

        arrival:
          reservation.from,

        departure:
          reservation.to,

        roomName:
          reservation.roomName,

        roomSlug:
          reservation.roomSlug,

        roomIds: [
          reservation.roomId,
        ],

        nights:
          reservation.nights,

        pets:
          reservation.pets,

        adults:
           reservation.adults,

        children:
          reservation.children,

        babies:
        reservation.babies,

        litParapluie:
        reservation.litParapluie,

        breakfast:
          reservation.breakfast,

        lunch:
          reservation.lunch,

        dinner:
          reservation.dinner,

        tourist_tax:
          reservation.touristTaxTotal,

        total:
          reservation.total,
      }

      try {

        const response =
          await fetch(
            "/api/reservations",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  payload
                ),
            }
          )

        const data =
          await response.json()

        if (
          !response.ok
        ) {

          console.error(
            data
          )

          alert(
            data.error ||
            "Erreur lors de l'envoi"
          )

          return
        }

        setShowSuccessModal(true)

      } catch (error) {

        console.error(
          error
        )

        alert(
          "Erreur serveur"
        )
      }
    }

  return (

    <>
    {showSuccessModal && (

  <div
    className="
      fixed
      inset-0
      z-[9999]
      flex
      items-center
      justify-center
      bg-black/70
      p-4
    "
  >

    <div
      className="
        max-w-2xl
        rounded-[32px]
        bg-white
        p-8
        shadow-2xl
      "
    >

      <div
        className="
          mb-5
          text-6xl
        "
      >
        ✅
      </div>

      <h2
        className="
          mb-5
          font-serif
          text-4xl
          font-bold
          text-[#2f241d]
        "
      >
        Réservation enregistrée
      </h2>

      <p
        className="
          mb-6
          leading-8
          text-[#6b5b4d]
        "
      >
        Votre demande de réservation a
        bien été prise en compte.
      </p>

      <div
  className="
    mb-6
    rounded-2xl
    border
    border-[#eadfce]
    bg-[#faf7f2]
    p-5
    text-[#5e4f42]
  "
>

  <div className="mb-2">
    🏨 <span className="font-semibold">
      {reservation.roomName}
    </span>
  </div>

  <div className="mb-2">
    📅 Du{" "}
    {new Date(
      reservation.from
    ).toLocaleDateString(
      "fr-FR"
    )}
    {" "}au{" "}
    {new Date(
      reservation.to
    ).toLocaleDateString(
      "fr-FR"
    )}
  </div>

  <div>
    👥 {reservation.adults}
    {" "}
    adulte
    {reservation.adults > 1
      ? "s"
      : ""}
    {reservation.children > 0 &&
      ` • ${reservation.children} enfant${
        reservation.children > 1
          ? "s"
          : ""
      }`}
  </div>

</div>

      <div
  className="
    mb-8
    rounded-3xl
    border
    border-[#eadfce]
    bg-[#faf7f2]
    p-6
    text-[#5e4f42]
  "
>

  <p className="mb-4 flex gap-3">
    <span>📧</span>
    <span>
      Un e-mail de confirmation de
      réception vient de vous être envoyé.
    </span>
  </p>

  <p className="mb-4 flex gap-3">
    <span>⏳</span>
    <span>
      Notre équipe va vérifier les
      disponibilités et traiter votre
      demande.
    </span>
  </p>

  <p className="flex gap-3">
    <span>✉️</span>
    <span>
      Vous recevrez ensuite un e-mail
      vous informant de l'acceptation
      ou du refus de votre réservation.
    </span>
  </p>

</div>

      <button
        onClick={() => {

  window.location.href = "/"
}}
        className="
          w-full
          rounded-2xl
          bg-[#c89b5f]
          py-4
          text-lg
          font-semibold
          text-white
          transition
          hover:opacity-90
        "
      >
        Retour à l'accueil
      </button>

      <p
  className="
    mt-4
    text-center
    text-sm
    text-[#7a6a5d]
  "
>
  Merci d'avoir choisi
  l'Auberge de Saint-Aubin.
</p>

    </div>

  </div>

)}

    <main
      className="
        min-h-screen
        bg-[#f5f1ea]
        px-6
        py-20
        text-[#2f241d]
      "
    >

     <div
  className="
    mx-auto
    flex
    flex-col-reverse
    gap-12
    max-w-7xl
    xl:grid
    xl:grid-cols-[1fr_420px]
  "
>

        {/* FORMULAIRE */}

        <div
          className="
            rounded-[36px]
            bg-white
            p-10
            shadow-2xl
          "
        >

          <h1
            className="
              mb-10
              font-serif
              text-5xl
              font-bold
            "
          >
            Finaliser la réservation
          </h1>

          <div
            className="
              grid
              gap-6
              md:grid-cols-2
            "
          >

            <input
              type="text"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value
                )
              }
              className="
                rounded-2xl
                border
                p-5
              "
            />

            <input
              type="text"
              placeholder="Nom"
              value={lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value
                )
              }
              className="
                rounded-2xl
                border
                p-5
              "
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                rounded-2xl
                border
                p-5
              "
            />

            <input
              type="text"
              placeholder="Téléphone"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              className="
                rounded-2xl
                border
                p-5
              "
            />

          </div>

          <textarea
  placeholder="Message complémentaire"
  value={message}
  onChange={(e) =>
    setMessage(
      e.target.value
    )
  }
  className="
    mt-6
    min-h-[180px]
    w-full
    rounded-2xl
    border
    p-5
  "
/>

<div
  className="
    mt-8
    space-y-5
    rounded-3xl
    border
    bg-[#faf8f5]
    p-6
  "
>

  <label
    className="
      flex
      items-start
      gap-3
      text-sm
      leading-6
    "
  >

    <input
      type="checkbox"
      checked={acceptCGV}
      onChange={(e) =>
        setAcceptCGV(
          e.target.checked
        )
      }
      className="
        mt-1
        h-4
        w-4
      "
    />

    <span>

      J&apos;accepte les{" "}

      <Link
        href="/cgv"
        target="_blank"
        className="
          font-semibold
          underline
        "
      >
        Conditions Générales
        de Vente
      </Link>

    </span>

  </label>

  <label
    className="
      flex
      items-start
      gap-3
      text-sm
      leading-6
    "
  >

    <input
      type="checkbox"
      checked={
        acceptPrivacy
      }
      onChange={(e) =>
        setAcceptPrivacy(
          e.target.checked
        )
      }
      className="
        mt-1
        h-4
        w-4
      "
    />

    <span>

      J&apos;accepte la{" "}

      <Link
        href="/confidentialite"
        target="_blank"
        className="
          font-semibold
          underline
        "
      >
        politique de confidentialité
      </Link>

    </span>

  </label>

  <p
    className="
      text-xs
      leading-5
      text-[#6b5b4d]
    "
  >
    En validant votre réservation,
    vous acceptez nos conditions
    générales de vente ainsi que
    notre politique de confidentialité.
  </p>

</div>

          

          <button
  onClick={
    handleReservation
  }

  disabled={
    !acceptCGV ||
    !acceptPrivacy
  }

  className="
    mt-10
    w-full
    rounded-2xl
    bg-[#2f241d]
    py-5
    text-xl
    font-bold
    text-white
    transition-all
    duration-300
    hover:scale-[1.02]
    hover:bg-[#43352c]
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
>
  Envoyer la demande
</button>

        </div>

        {/* RECAP */}

       <div
  className="
    order-1
    xl:order-2
    h-fit
    rounded-[36px]
    bg-white
    p-10
    shadow-2xl
  "
>

          <h2
            className="
              mb-8
              font-serif
              text-4xl
              font-bold
            "
          >
            Récapitulatif
          </h2>

          <div
            className="
              space-y-5
              text-lg
            "
          >

            <div
              className="
                flex
                justify-between
                border-b
                pb-3
              "
            >
              <span>
                Chambre
              </span>

              <span>
                {
                  reservation.roomName
                }
              </span>
            </div>

            <div
              className="
                flex
                justify-between
                border-b
                pb-3
              "
            >

              <span>
                Arrivée
              </span>

              <span>

                {new Date(
                  reservation.from
                ).toLocaleDateString(
                  "fr-FR"
                )}

              </span>

            </div>

            <div
              className="
                flex
                justify-between
                border-b
                pb-3
              "
            >

              <span>
                Départ
              </span>

              <span>

                {new Date(
                  reservation.to
                ).toLocaleDateString(
                  "fr-FR"
                )}

              </span>

            </div>

            <div
              className="
                flex
                justify-between
                border-b
                pb-3
              "
            >

              <span>
                Nuits
              </span>

              <span>
                {
                  reservation.nights
                }
              </span>

            </div>

            <div
  className="
    flex
    justify-between
    border-b
    pb-3
  "
>
  <span>Adultes</span>
  <span>{reservation.adults}</span>
</div>

<div
  className="
    flex
    justify-between
    border-b
    pb-3
  "
>
  <span>Enfants</span>
  <span>{reservation.children}</span>
</div>

{reservation.babies > 0 && (

  <div
    className="
      flex
      justify-between
      border-b
      pb-3
    "
  >
    <span>
      Bébés (-2 ans)
    </span>

    <span>
      {reservation.babies}
    </span>
  </div>

)}

{reservation.litParapluie && (

  <div
    className="
      flex
      justify-between
      border-b
      pb-3
    "
  >

    <span>
      👶 Lit parapluie
    </span>

    <span>
      {settings?.lit_parapluie || 5}€
    </span>

  </div>

)}


 <div
  className="
    flex
    justify-between
    border-b
    pb-3
  "
>

  <span>
    Chambre
  </span>

  <span
    className="
      text-right
      text-sm
    "
  >

    <div>
      {reservation.adults}
      {" "}
      personne
      {
        reservation.adults > 1
          ? "s"
          : ""
      }
      ×
      {" "}
      {
        reservation.roomPrice
      }€
    </div>

    <div>
      ×
      {" "}
      {
        reservation.nights
      }
      {" "}
      nuit
      {
        reservation.nights > 1
          ? "s"
          : ""
      }
    </div>

    <div
      className="
        mt-2
        font-semibold
      "
    >
      =
      {" "}
      {
        reservation
          .roomTotal
          .toFixed(2)
      }
      €
    </div>

  </span>

</div>


            <div
  className="
    flex
    justify-between
    border-b
    pb-3
  "
>

  <span>
    Taxe de séjour
  </span>

  <span
    className="
      text-right
      text-sm
    "
  >

    <div>
      {reservation.adults}
      {" "}
      adulte
      {
        reservation.adults > 1
          ? "s"
          : ""
      }
      ×
      {" "}
      {settings?.tourist_tax || 1.3}€
    </div>

    <div>
      ×
      {" "}
      {reservation.nights}
      {" "}
      nuit
      {
        reservation.nights > 1
          ? "s"
          : ""
      }
    </div>

    <div className="mt-2 font-semibold">
      =
      {" "}
      {
        reservation
          .touristTaxTotal
          .toFixed(2)
      }
      €
    </div>

  </span>

</div>

            {reservation.breakfast && (

              <div
                className="
                  flex
                  justify-between
                  border-b
                  pb-3
                "
              >

                <span>
                  Petit Déjeuner
                </span>

                <span className="text-right text-sm">

  {reservation.adults > 0 && (
    <div>
      {reservation.adults}
      {" "}
      adulte(s)
      ×
      {" "}
      {settings?.breakfast || 12}€
    </div>
  )}

  {reservation.children > 0 && (
    <div>
      {reservation.children}
      {" "}
      enfant(s)
      × 6€
    </div>
  )}

  {reservation.babies > 0 && (
    <div>
      {reservation.babies}
      {" "}
      bébé(s)
      gratuits
    </div>
  )}

  <div>
  × {reservation.breakfastDays}
  {
    reservation.breakfastDays > 1
      ? " petits-déjeuners"
      : " petit-déjeuner"
  }
</div>

<p className="mt-2 font-semibold">
  = {
      reservation
        .breakfastTotal
        .toFixed(2)
    }€
</p>

</span>

              </div>

            )}

            {reservation.lunch && (

              <div
                className="
                  flex
                  justify-between
                  border-b
                  pb-3
                "
              >

                <span>
                  Repas Midi
                </span>

                <span className="text-right text-sm">

  {reservation.adults > 0 && (
    <div>
      {reservation.adults}
      {" "}
      adulte(s)
      ×
      {" "}
      {settings?.lunch || 15}€
    </div>
  )}

  {reservation.children > 0 && (
    <div>
      {reservation.children}
      {" "}
      enfant(s)
      × 10€
    </div>
  )}

  {reservation.babies > 0 && (
    <div>
      {reservation.babies}
      {" "}
      bébé(s)
      gratuits
    </div>
  )}

  <div>
  × {reservation.lunchDays}
  {
    reservation.lunchDays > 1
      ? " repas"
      : " repas"
  }
</div>

  <p className="mt-2 font-semibold">
  = {
      reservation
        .lunchTotal
        .toFixed(2)
    }€
</p>

</span>

              </div>

            )}

            {reservation.dinner && (

              <div
                className="
                  flex
                  justify-between
                  border-b
                  pb-3
                "
              >

                <span>
                  Repas Soir
                </span>

                <span className="text-right text-sm">

  {reservation.adults > 0 && (
    <div>
      {reservation.adults}
      {" "}
      adulte(s)
      ×
      {" "}
      {settings?.dinner || 20}€
    </div>
  )}

  {reservation.children > 0 && (
    <div>
      {reservation.children}
      {" "}
      enfant(s)
      × 10€
    </div>
  )}

  {reservation.babies > 0 && (
    <div>
      {reservation.babies}
      {" "}
      bébé(s)
      gratuits
    </div>
  )}

  <div>
  × {reservation.dinnerDays}
  {
    reservation.dinnerDays > 1
      ? " repas"
      : " repas"
  }
</div>

  <p className="mt-2 font-semibold">
  = {
      reservation
        .dinnerTotal
        .toFixed(2)
    }€
</p>

</span>

              </div>

            )}


            {reservation.pets && (

              <div
                className="
                  flex
                  justify-between
                  border-b
                  pb-3
                "
              >

                <span>
                  Animal
                </span>

                <span>
                  Oui
                </span>

              </div>

            )}

            <div
              className="
                flex
                justify-between
                pt-4
                text-3xl
                font-bold
              "
            >

              <span>
                Total
              </span>

              <span>
                {
                  reservation.total.toFixed(
                    2
                  )
                }€
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      
            <Footer />

    </main>

  </>
)
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          Chargement...
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}