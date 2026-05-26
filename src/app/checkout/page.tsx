"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { useSearchParams } from "next/navigation"

type ReservationData = {
  from: string
  to: string
  roomName: string
  roomSlug: string
  roomId: number
  status: string
  nights: number
  people: number
  touristTaxTotal: number
  pets: boolean
  lunch: boolean
  dinner: boolean
  baby: boolean
  total: number
}

export default function CheckoutPage() {

  const searchParams =
    useSearchParams()

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

      const people =
        Number(
          searchParams.get(
            "people"
          ) || 1
        )

      const pets =
        searchParams.get(
          "pets"
        ) === "true"

      const lunch =
        searchParams.get(
          "lunch"
        ) === "true"

      const dinner =
        searchParams.get(
          "dinner"
        ) === "true"

      const baby =
        searchParams.get(
          "baby"
        ) === "true"

      const total =
        Number(
          searchParams.get(
            "total"
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

      return {

        from: arrival,
        to: departure,

        roomName,
        roomSlug,

        roomId:
          roomIds?.[0] || 0,

        status: "pending",

        nights,

        people,

        touristTaxTotal:
          people *
          nights *
          1.3,

        pets,
        lunch,
        dinner,
        baby,

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
          "Veuillez remplir tous les champs obligatoires"
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

        people:
          reservation.people,

        pets:
          reservation.pets,

        lunch:
          reservation.lunch,

        dinner:
          reservation.dinner,

        baby:
          reservation.baby,

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

        alert(
          "Votre réservation a bien été envoyée."
        )

        window.location.href =
          "/"

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
          grid
          max-w-7xl
          gap-12
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

              <span>
                Personnes
              </span>

              <span>
                {
                  reservation.people
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
                Taxe de séjour
              </span>

              <span>

                {
                  reservation
                    .touristTaxTotal
                    .toFixed(2)
                }€

              </span>

            </div>

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
                  Repas midi
                </span>

                <span>
                  Oui
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
                  Repas soir
                </span>

                <span>
                  Oui
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

            {reservation.baby && (

              <div
                className="
                  flex
                  justify-between
                  border-b
                  pb-3
                "
              >

                <span>
                  Lit bébé
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

      <footer
  className="
    bg-[#1f1712]
    px-6
    py-10
    text-center
    text-white/70
  "
>

  <p className="mb-4">
    © 2026 L&apos;Auberge de St Aubin — Tous droits réservés
  </p>

  <Link
    href="/login"
    className="
      text-[11px]
      text-white/20
      transition
      hover:text-white/50
    "
  >
    administration
  </Link>

  <Link href="/mentions-legales">
  Mentions légales
</Link>

<Link href="/confidentialite">
  Confidentialité
</Link>

<Link href="/cgv">
  CGV
</Link>


<Link href="/cookies">
  Cookies
</Link>


</footer>

    </main>
  )
}