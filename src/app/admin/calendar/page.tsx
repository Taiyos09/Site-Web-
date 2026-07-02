"use client"

import { useEffect, useState, useRef } from "react"

import {
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
} from "date-fns"

import { fr } from "date-fns/locale"

type ReservationRoom = {
  id: number
  room_name: string
  room_total: number
}

type Reservation = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  adults: number
  children: number
  babies: number
  total: number
  arrival: string
  departure: string
  status: string
  breakfast: boolean
  lunch: boolean
  dinner: boolean
  pets: boolean
  litParapluie: boolean
  reservation_rooms?: ReservationRoom[]
}

const rooms = [
  "Chambre Double Standard",
  "Chambre Confort",
  "Chambre Familiale",
]

export default function CalendarPage() {

  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null)

  const [reservations, setReservations] =
    useState<Reservation[]>([])

  const [currentMonth, setCurrentMonth] =
    useState(new Date())

  const calendarRef =
  useRef<HTMLDivElement>(null)

  /* ====================================== */
  /* LOAD RESERVATIONS */
  /* ====================================== */

  useEffect(() => {

    const loadReservations =
      async () => {

        try {

          const response =
  await fetch(
    "/api/reservations"
  )

const data =
  await response.json()


          if (data) {

            setReservations(data)
          }

        } catch (error) {

          console.error(
            "Erreur chargement calendrier :",
            error
          )
        }
      }

    loadReservations()

  }, [])

  const monthStart =
    startOfMonth(currentMonth)

  const monthEnd =
    endOfMonth(currentMonth)


  const days =
    eachDayOfInterval({
      start: monthStart,
      end: monthEnd,
    })

     // Scroll vers le début du mois quand currentMonth change
  useEffect(() => {
    if (calendarRef.current) {
      const monthStartIndex = days.findIndex(
        (day) => format(day, "yyyy-MM-dd") === format(monthStart, "yyyy-MM-dd")
      )
      if (monthStartIndex !== -1) {
        const scrollPosition = monthStartIndex * 120
        calendarRef.current.scrollTo({
          left: scrollPosition - 400,
          behavior: "smooth",
        })
      }
    }
  }, [currentMonth, days, monthStart])


  const scrollToToday = () => {

  if (!calendarRef.current)
    return

  const today =
    new Date()

  const todayIndex =
    days.findIndex(
      (day) =>
        format(day, "yyyy-MM-dd") ===
        format(today, "yyyy-MM-dd")
    )

  if (todayIndex === -1)
    return

  const scrollPosition =
    todayIndex * 120

  calendarRef.current.scrollTo({
    left:
      scrollPosition - 400,

    behavior: "smooth",
  })
}

const updateReservationStatus =
  async (
    reservationId: number,
    status: string
  ) => {

    try {

      const response =
  await fetch(

    `/api/reservations/${reservationId}`,

    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        status,
      }),
    }
  )

if (!response.ok) {

  console.error(
    "Erreur mise à jour"
  )

  return
}

      setReservations((prev) =>
        prev.map((reservation) =>

          reservation.id ===
          reservationId

            ? {
                ...reservation,
                status,
              }

            : reservation
        )
      )

      setSelectedReservation(
        (prev) =>

          prev
            ? {
                ...prev,
                status,
              }

            : null
      )

    } catch (error) {

      console.error(error)
    }
  }

  return (
    <>
      <style>{`
  .public-navbar {
    display: none !important;
  }
`}</style>

      <main
        className="
          min-h-screen
          bg-[#f5f1ea]
          p-10
          text-[#2f241d]
        "
      >

        <div className="mt-10">

          <div className="mb-10">

            <h1
              className="
                font-serif
                text-5xl
                font-bold
              "
            >
              Calendrier hôtel
            </h1>

            <p className="mt-2 text-[#6b5b4f]">
              Gestion des disponibilités.
            </p>

          </div>

          <div
  className="
    mt-8
    mb-8
    grid
    gap-6
    md:grid-cols-4
  "
>

  <div className="rounded-3xl bg-white p-6 shadow-lg">
    <p className="text-sm text-[#6b5b4f]">
      Réservations
    </p>

    <h2 className="mt-2 text-5xl font-bold">
      {reservations.length}
    </h2>
  </div>

  <div className="rounded-3xl bg-white p-6 shadow-lg">
    <p className="text-sm text-[#6b5b4f]">
      Confirmées
    </p>

    <h2 className="mt-2 text-5xl font-bold text-green-600">
      {
        reservations.filter(
          r => r.status === "confirmed"
        ).length
      }
    </h2>
  </div>

  <div className="rounded-3xl bg-white p-6 shadow-lg">
    <p className="text-sm text-[#6b5b4f]">
      En attente
    </p>

    <h2 className="mt-2 text-5xl font-bold text-yellow-500">
      {
        reservations.filter(
          r => r.status === "pending"
        ).length
      }
    </h2>
  </div>

  <div className="rounded-3xl bg-white p-6 shadow-lg">
    <p className="text-sm text-[#6b5b4f]">
      Taux occupation
    </p>

    <h2 className="mt-2 text-5xl font-bold text-[#c89b5f]">
  {
    rooms.length > 0
      ? Math.round(
          (
            reservations.filter(
              (r) =>
                r.status ===
                "confirmed"
            ).length /
            rooms.length
          ) * 100
        )
      : 0
  }%
</h2>
  </div>

</div>

          {/* LEGENDE */}

          <div
            className="
              mb-6
              flex
              flex-wrap
              gap-4
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <div
                className="
                  h-4
                  w-4
                  rounded-full
                  bg-green-600
                "
              />

              <span>
                Confirmée
              </span>

            </div>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <div
                className="
                  h-4
                  w-4
                  rounded-full
                  bg-yellow-500
                "
              />

              <span>
                En attente
              </span>

            </div>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <div
                className="
                  h-4
                  w-4
                  rounded-full
                  bg-red-600
                "
              />

              <span>
                Refusée
              </span>

            </div>

          </div>

          {/* TOOLBAR */}

          <div
            className="
              mb-6
              flex
              items-center
              justify-between
              gap-4
              flex-wrap
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <button

                onClick={() =>
                  setCurrentMonth(
                    addMonths(
                      currentMonth,
                      -1
                    )
                  )
                }

                className="
                  rounded-2xl
                  border
                  bg-white
                  px-5
                  py-3
                  font-semibold
                  shadow-sm
                  transition
                  hover:bg-[#faf7f2]
                "
              >
                ←
              </button>

              <button

                onClick={() =>
                  setCurrentMonth(
                    addMonths(
                      currentMonth,
                      1
                    )
                  )
                }

                className="
                  rounded-2xl
                  border
                  bg-white
                  px-5
                  py-3
                  font-semibold
                  shadow-sm
                  transition
                  hover:bg-[#faf7f2]
                "
              >
                →
              </button>

              <div
                className="
                  rounded-2xl
                  border
                  bg-white
                  px-6
                  py-3
                  font-bold
                  shadow-sm
                  capitalize
                "
              >
                {format(
                  currentMonth,
                  "MMMM yyyy",
                  { locale: fr }
                )}
              </div>

            </div>

            <button

  onClick={() => {

    setCurrentMonth(new Date())
     
    setTimeout(() => {

      scrollToToday()

    }, 100)
  }}

  className="
    rounded-2xl
    border
    bg-white
    px-6
    py-3
    font-semibold
    shadow-sm
    transition
    hover:bg-[#faf7f2]
  "
>
  Aujourd'hui
</button>

          </div>

          {/* CALENDRIER */}
          <div className="rounded-[36px] bg-white shadow-2xl overflow-hidden">
            <div className="flex">
              {/* COLONNE FIXE - CHAMBRES */}
              <div className="w-[260px] flex-shrink-0 bg-white border-r z-10">
                {/* Header fixe */}
                <div className="h-[60px] flex items-center p-4 font-bold border-b bg-white">
                  Chambres
                </div>
                {/* Noms des chambres */}
                {rooms.map((room) => (
                  <div key={room} className="h-[170px] flex items-center p-4 font-bold border-t bg-white">
                    {room}
                  </div>
                ))}
              </div>

              {/* CONTENU SCROLLABLE - JOURS */}
              <div 
                ref={calendarRef}
                className="flex-1 overflow-x-auto"
              >
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `repeat(${days.length}, 120px)`,
                  }}
                >
                  {/* Header jours */}
{days.map((day) => {

  const isToday =
    format(day, "yyyy-MM-dd") ===
    format(new Date(), "yyyy-MM-dd")

  return (

    <div
      key={day.toISOString()}
      className={`
        min-w-[120px]
        border-b
        border-l
        p-4
        text-center
        font-bold
        h-[60px]
        flex
        flex-col
        items-center
        justify-center

        ${
          isToday
            ? "bg-[#c89b5f] text-white"
            : "bg-white"
        }
      `}
    >

      <div>
        {format(day, "dd")}
      </div>

      <div
        className={`
          text-sm
          ${
            isToday
              ? "text-white/90"
              : "text-[#6b5b4f]"
          }
        `}
      >
        {format(day, "MMM", {
          locale: fr,
        })}
      </div>

    </div>

  )

})}

                  {/* Lignes chambres avec réservations */}
                  {rooms.map((room) => {
                    const roomReservations = reservations.filter((reservation) =>
                      reservation.reservation_rooms?.some((r) => r.room_name === room)
                    )

                    return (
                      <div
                        key={room}
                        className="contents"
                      >
                        {/* Ligne de réservations pour cette chambre */}
                        <div
                          className="relative border-t"
                          style={{
                            gridColumn: `span ${days.length}`,
                            height: "170px",
                          }}
                        >
                          {/* Grille de fond */}
                          <div
                            className="absolute inset-0 grid"
                            style={{
                              gridTemplateColumns: `repeat(${days.length}, 1fr)`,
                            }}
                          >
                            {days.map((_, i) => (
                              <div
                                key={`grid-${room}-${i}`}
                                className="border-r"
                              />
                            ))}
                          </div>

                          {/* RESERVATIONS */}
                          {roomReservations.map((reservation) => {
                            const currentRoom = reservation.reservation_rooms?.find(
                              (r) => r.room_name === room
                            )

                            if (!reservation.arrival || !reservation.departure) {
                              return null
                            }

                            const arrival = new Date(reservation.arrival)
                            const departure = new Date(reservation.departure)

                            if (isNaN(arrival.getTime()) || isNaN(departure.getTime())) {
                              console.error("Date invalide :", reservation)
                              return null
                            }

                            const visibleStart =
  days[0]

const visibleEnd =
  days[days.length - 1]

const reservationStart =
  new Date(arrival)

const reservationEnd =
  new Date(departure)

/* =========================
   ON LIMITE AU MOIS VISIBLE
========================= */

const displayStart =

  reservationStart < visibleStart
    ? visibleStart
    : reservationStart

const visibleEndPlusOne =
  new Date(visibleEnd)

visibleEndPlusOne.setDate(
  visibleEndPlusOne.getDate() + 1
)

const displayEnd =

  reservationEnd > visibleEndPlusOne

    ? visibleEndPlusOne

    : reservationEnd

/* =========================
   POSITION DE DÉPART
========================= */

const startIndex =
  days.findIndex(

    (d) =>

      format(
        d,
        "yyyy-MM-dd"
      )

      ===

      format(
        displayStart,
        "yyyy-MM-dd"
      )
  )

if (startIndex === -1) {
  return null
}

/* =========================
   NOMBRE DE JOURS VISIBLES
========================= */

const MS_PER_DAY =
  1000 * 60 * 60 * 24

const startDate =
  new Date(
    displayStart.getFullYear(),
    displayStart.getMonth(),
    displayStart.getDate()
  )

const endDate =
  new Date(
    displayEnd.getFullYear(),
    displayEnd.getMonth(),
    displayEnd.getDate()
  )

const visibleNights =
  Math.max(
    1,

    Math.round(
      (
        endDate.getTime() -
        startDate.getTime()
      ) / MS_PER_DAY
    )
  )

const colorPalette = [

  `bg-[#4f6f52] border-[#7da37f]`,

  `bg-[#5b6c8f] border-[#8ea1c7]`,

  `bg-[#7b5b8a] border-[#aa8dc0]`,

  `bg-[#9c6b3f] border-[#c89b5f]`,

  `bg-[#7a4b4b] border-[#b07a7a]`,

  `bg-[#3f6f73] border-[#6ea4aa]`,
]

const clientKey =
  `${reservation.id}`

const clientHash =
  clientKey
    .split("")
    .reduce(

      (acc, char) =>

        acc +
        char.charCodeAt(0),

      0
    )

const clientColor =
  colorPalette[
    clientHash %
    colorPalette.length
  ]

const reservationColor =

  reservation.status ===
  "rejected"

    ? `bg-red-600 border-red-300`

    : reservation.status ===
      "pending"

    ? `bg-yellow-500 border-yellow-300`

    : clientColor

return (

  <button

    key={`${reservation.id}-${room}`}

    onClick={() =>
      setSelectedReservation(
        reservation
      )
    }

    className={`
      absolute
      top-4
      min-h-[140px]
      rounded-2xl
      border-2
      px-4
      py-3
      text-left
      text-white
      shadow-xl
      backdrop-blur-sm
      transition-all
      duration-300
      hover:z-20
      hover:scale-[1.02]
      hover:shadow-2xl

      ${reservationColor}
    `}

    style={{

  left:
    `${startIndex * 120}px`,

  width:
    `${visibleNights * 120}px`,

  zIndex: 10,
}}
  >

    <div className="font-bold text-lg">
      {reservation.first_name}
    </div>

    <div className="text-sm">
      {reservation.last_name}
    </div>

    <div
      className="
        mt-2
        inline-block
        rounded-full
        bg-white/20
        px-3
        py-1
        text-[10px]
        font-bold
        uppercase
        tracking-wide
      "
    >

      {

        reservation.status ===
        "confirmed"

          ? "Confirmée"

          : reservation.status ===
            "pending"

          ? "En attente"

          : reservation.status ===
            "rejected"

          ? "Refusée"

          : reservation.status
      }

    </div>

    <div
  className="
    mt-2
    text-xs
    opacity-90
  "
>
  👨 {reservation.adults}

  {" · "}

  🧒 {reservation.children}

  {reservation.babies > 0 && (
    <>
      {" · "}
      👶 {reservation.babies}
    </>
  )}
</div>

  </button>
)

})}

                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* MODAL */}

        {selectedReservation && (

          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/50
              backdrop-blur-sm
              p-6
            "
            onClick={() =>
              setSelectedReservation(null)
            }
          >

            <div
              className="
                w-full
                max-w-2xl
                rounded-[36px]
                bg-white
                p-10
                shadow-2xl
              "
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div
                className="
                  mb-8
                  flex
                  items-center
                  justify-between
                "
              >

                <h2
                  className="
                    font-serif
                    text-4xl
                    font-bold
                  "
                >
                  Réservation
                </h2>

                <button
                  onClick={() =>
                    setSelectedReservation(null)
                  }
                  className="
                    rounded-xl
                    bg-[#2f241d]
                    px-4
                    py-2
                    text-white
                  "
                >
                  Fermer
                </button>

              </div>

              <div
                className="
                  space-y-4
                  text-lg
                "
              >

                <p>
                  <strong>Client :</strong>
                  {" "}
                  {selectedReservation.first_name}
                  {" "}
                  {selectedReservation.last_name}
                </p>

                <p>
                  <strong>Email :</strong>
                  {" "}
                  {selectedReservation.email}
                </p>

                <p>
                  <strong>Téléphone :</strong>
                  {" "}
                  {selectedReservation.phone}
                </p>

                <p>
  <strong>Chambres :</strong>
  {" "}
  {selectedReservation
    .reservation_rooms
    ?.map(
      (room) => room.room_name
    )
    .join(", ")}
</p>

<div className="flex flex-wrap gap-3">

  <span className="rounded-full bg-[#f5f1ea] px-4 py-2">
    👨 {selectedReservation.adults} adulte(s)
  </span>

  <span className="rounded-full bg-[#f5f1ea] px-4 py-2">
    🧒 {selectedReservation.children} enfant(s)
  </span>

  {selectedReservation.babies > 0 && (
    <span className="rounded-full bg-[#f5f1ea] px-4 py-2">
      👶 {selectedReservation.babies} bébé(s)
    </span>
  )}

</div>

<p>
  <strong>Lit parapluie :</strong>
  {" "}
  {
    selectedReservation.litParapluie
      ? "Demandé"
      : "Non"
  }
</p>

                <p>
                  <strong>Arrivée :</strong>
                  {" "}
                  {new Date(
                    selectedReservation.arrival
                  ).toLocaleDateString("fr-FR")}
                </p>

                <p>
                  <strong>Départ :</strong>
                  {" "}
                  {new Date(
                    selectedReservation.departure
                  ).toLocaleDateString("fr-FR")}
                </p>

<p>
  <strong>Petit Déjeuner :</strong>
  {" "}
  {selectedReservation.breakfast
    ? `${selectedReservation.adults} adulte(s),
       ${selectedReservation.children} enfant(s),
       ${selectedReservation.babies} bébé(s)`
    : "Non"}
</p>
<p>
  <strong>Repas midi :</strong>
  {" "}
  {selectedReservation.lunch
    ? "Oui"
    : "Non"}
</p>

<p>
  <strong>Repas soir :</strong>
  {" "}
  {selectedReservation.dinner
    ? "Oui"
    : "Non"}
</p>

<p>
  <strong>Animaux :</strong>
  {" "}
  {selectedReservation.pets
    ? "Oui"
    : "Non"}
</p>


                <p>
                  <strong>Total :</strong>
                  {" "}
                  {selectedReservation.total}€
                </p>

                <p>
  <strong>Statut :</strong>
  {" "}

  <span
    className={`
      rounded-full
      px-4
      py-2
      text-sm
      font-bold
      text-white

      ${
        selectedReservation.status ===
        "confirmed"

          ? "bg-green-600"

          : selectedReservation.status ===
            "pending"

          ? "bg-yellow-500"

          : selectedReservation.status ===
            "rejected"

          ? "bg-red-600"

          : "bg-gray-500"
      }
    `}
  >

    {selectedReservation.status}

  </span>

</p>

<div
  className="
    mt-10
    flex
    flex-wrap
    gap-4
  "
>

  {/* CONFIRMER */}

  <button
    onClick={() =>
      updateReservationStatus(
        selectedReservation.id,
        "confirmed"
      )
    }

    className="
      rounded-2xl
      bg-green-600
      px-5
      py-3
      font-bold
      text-white
      transition
      hover:bg-green-700
    "
  >
    Confirmer
  </button>

  {/* CHECK-IN */}

  <button
    onClick={() =>
      updateReservationStatus(
        selectedReservation.id,
        "checked_in"
      )
    }

    className="
      rounded-2xl
      bg-blue-600
      px-5
      py-3
      font-bold
      text-white
      transition
      hover:bg-blue-700
    "
  >
    Check-in
  </button>

  {/* CHECK-OUT */}

  <button
    onClick={() =>
      updateReservationStatus(
        selectedReservation.id,
        "checked_out"
      )
    }

    className="
      rounded-2xl
      bg-gray-700
      px-5
      py-3
      font-bold
      text-white
      transition
      hover:bg-gray-800
    "
  >
    Check-out
  </button>

  {/* REFUSER */}

  <button
    onClick={() =>
      updateReservationStatus(
        selectedReservation.id,
        "rejected"
      )
    }

    className="
      rounded-2xl
      bg-red-600
      px-5
      py-3
      font-bold
      text-white
      transition
      hover:bg-red-700
    "
  >
    Refuser
  </button>

</div>

              </div>

            </div>

          </div>

        )}

        {/* STATS RESTAURATION */}

<div className="
  mt-8
  grid
  gap-6
  md:grid-cols-3
">

  {/* PETIT DEJ */}

  <div className="
    rounded-3xl
    bg-white
    p-6
    shadow-lg
  ">

    <p className="
      text-sm
      uppercase
      tracking-wider
      text-[#8a6330]
    ">
      Petit déjeuner demain
    </p>

    <h2 className="
      mt-3
      text-5xl
      font-bold
      text-[#2f241d]
    ">
      {

        reservations
  .filter((reservation) => {

    const today =
      new Date()

    const tomorrow =
      new Date()

    tomorrow.setDate(
      tomorrow.getDate() + 1
    )

    const arrival =
      new Date(
        reservation.arrival
      )

    const departure =
      new Date(
        reservation.departure
      )

    return (

      reservation.status ===
      "confirmed"

      &&

      reservation.breakfast

      &&

      arrival <= today

      &&

      departure > tomorrow
    )
  })

  .reduce(
    (total, reservation) =>

      total +
      reservation.adults +
      reservation.children,

    0
  )
      }
    </h2>

    <p className="
      mt-2
      text-[#7b6d63]
    ">
      personnes
    </p>

  </div>

  {/* MIDI */}

  <div className="
    rounded-3xl
    bg-white
    p-6
    shadow-lg
  ">

    <p className="
      text-sm
      uppercase
      tracking-wider
      text-[#8a6330]
    ">
      Repas midi aujourd'hui
    </p>

    <h2 className="
      mt-3
      text-5xl
      font-bold
      text-[#2f241d]
    ">
      {

        reservations

          .filter((reservation) => {

            const today =
              new Date()

            const arrival =
              new Date(
                reservation.arrival
              )

            const departure =
              new Date(
                reservation.departure
              )

            return (

              reservation.status ===
              "confirmed"

              &&

              reservation.lunch

              &&

              arrival <= today

              &&

              departure > today
            )
          })

          .reduce(
            (total, reservation) =>

              total +
              reservation.adults +
              reservation.children,

            0
          )
      }
    </h2>

    <p className="
      mt-2
      text-[#7b6d63]
    ">
      repas
    </p>

  </div>

  {/* SOIR */}

  <div className="
    rounded-3xl
    bg-white
    p-6
    shadow-lg
  ">

    <p className="
      text-sm
      uppercase
      tracking-wider
      text-[#8a6330]
    ">
      Repas soir aujourd'hui
    </p>

    <h2 className="
      mt-3
      text-5xl
      font-bold
      text-[#2f241d]
    ">
      {

        reservations

          .filter((reservation) => {

            const today =
              new Date()

            const arrival =
              new Date(
                reservation.arrival
              )

            const departure =
              new Date(
                reservation.departure
            )

            return (

              reservation.status ===
              "confirmed"

              &&

              reservation.dinner

              &&

              arrival <= today

              &&

              departure > today
            )
          })

          .reduce(
            (total, reservation) =>

              total +
              reservation.adults +
              reservation.children,

            0
          )
      }
    </h2>

    <p className="
      mt-2
      text-[#7b6d63]
    ">
      repas
    </p>

  </div>

</div>

      </main>
    </>
  )
}
