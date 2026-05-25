"use client"

import { useEffect, useState } from "react"

type ReservationData = {
  from: string
  to: string
  roomName: string
  roomSlug: string
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

  const [reservation, setReservation] =
    useState<ReservationData | null>(null)

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

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "reservationData"
      )

    if (saved) {
      setReservation(JSON.parse(saved))
    }

  }, [])

  const handleReservation = async () => {

  if (!reservation) return

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

  const payload = {

    status: "pending",
    first_name: firstName,
    last_name: lastName,
    
    email,
    phone,
    message,

    arrival: reservation.from,
    departure: reservation.to,
    
    roomName: reservation.roomName,
    roomSlug: reservation.roomSlug,

    nights: reservation.nights,
    people: reservation.people,

    pets: reservation.pets,
    lunch: reservation.lunch,
    dinner: reservation.dinner,
    baby: reservation.baby,

    tourist_tax:
      reservation.touristTaxTotal,

    total: reservation.total,

  }

  try {

    const response = await fetch(
      "/api/reservation",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      }
    )

    const data =
      await response.json()

    if (!response.ok) {

  console.error(data)

  alert(
    data.error ||
    "Erreur lors de l'envoi"
  )

  return
}

    alert(
      "Votre demande de réservation a bien été envoyée."
    )

    localStorage.removeItem(
      "reservationData"
    )

    window.location.href = "/"

  } catch (error) {

    console.error(error)

    alert(
      "Erreur serveur"
    )
  }
}

  if (!reservation) {
    return null
  }

  return (
    <main className="min-h-screen bg-[#f5f1ea] px-6 py-20 text-[#2f241d]">

      <div className="mx-auto grid max-w-7xl gap-12 xl:grid-cols-[1fr_420px]">

        {/* FORMULAIRE */}
        <div className="rounded-[36px] bg-white p-10 shadow-2xl">

          <h1 className="mb-10 font-serif text-5xl font-bold">
            Finaliser la réservation
          </h1>

          <div className="grid gap-6 md:grid-cols-2">

            <input
              type="text"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value
                )
              }
              className="rounded-2xl border p-5"
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
              className="rounded-2xl border p-5"
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
              className="rounded-2xl border p-5"
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
              className="rounded-2xl border p-5"
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

          <button
            onClick={handleReservation}
            className="
              mt-10
              w-full
              rounded-2xl
              bg-[#2f241d]
              py-5
              text-xl
              font-bold
              text-white
              transition-all duration-300
              hover:scale-[1.02]
              hover:bg-[#43352c]
            "
          >
            Envoyer la demande
          </button>

        </div>

        {/* RECAP */}
        <div className="h-fit rounded-[36px] bg-white p-10 shadow-2xl">

          <h2 className="mb-8 font-serif text-4xl font-bold">
            Récapitulatif
          </h2>

          <div className="space-y-5 text-lg">

            <div className="flex justify-between border-b pb-3">
  <span>Arrivée</span>

  <span>
    {new Date(
      reservation.from
    ).toLocaleDateString(
      "fr-FR",
      {
        timeZone: "Europe/Paris",
      }
    )}
  </span>
</div>

<div className="flex justify-between border-b pb-3">
  <span>Départ</span>

  <span>
    {new Date(
      reservation.to
    ).toLocaleDateString(
      "fr-FR",
      {
        timeZone: "Europe/Paris",
      }
    )}
  </span>
</div>
            <div className="flex justify-between border-b pb-3">
              <span>Nuits</span>
              <span>
                {reservation.nights}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Personnes</span>
              <span>
                {reservation.people}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
                <span>Taxe de séjour</span>
                <span>
                {(reservation.touristTaxTotal ?? 0).toFixed(2)}€
                </span>
            </div>

            {reservation.lunch && (
              <div className="flex justify-between border-b pb-3">
                <span>Repas midi</span>
                <span>Oui</span>
              </div>
            )}

            <div className="flex justify-between border-b pb-3">
                <span>Petit Déjeuner</span>
                <span>Compris</span>
              </div>
            

            {reservation.dinner && (
              <div className="flex justify-between border-b pb-3">
                <span>Repas soir</span>
                <span>Oui</span>
              </div>
            )}

            {reservation.pets && (
              <div className="flex justify-between border-b pb-3">
                <span>Animal</span>
                <span>Oui</span>
              </div>
            )}

            <div className="flex justify-between pt-4 text-3xl font-bold">
              <span>Total</span>

              <span>
                {reservation.total.toFixed(2)}€
              </span>
            </div>

          </div>

        </div>

      </div>

    </main>
  )
}