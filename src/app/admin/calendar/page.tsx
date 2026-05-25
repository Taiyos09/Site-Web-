"use client"

import { useEffect, useState, useRef } from "react"

import { supabase } from "@/lib/supabase"

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
  people: number
  room_total: number
}

type Reservation = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  people: number
  total: number
  arrival: string
  departure: string
  status: string
  lunch: boolean
  dinner: boolean
  animals: boolean
  baby: boolean
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

          const { data, error } =
            await supabase
              .from("reservations")
              .select(`
                *,
                reservation_rooms (*)
              `)

          if (error) {

            console.error(error)
            return
          }

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

      const { error } =
        await supabase
          .from("reservations")
          .update({ status })
          .eq("id", reservationId)

      if (error) {

        console.error(error)
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
      <style jsx global>{`
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

    setCurrentMonth(
      new Date()
    )

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
  Aujourd’hui
</button>

          </div>

          {/* CALENDRIER */}

          <div
            ref={calendarRef}
            className="
              overflow-x-auto
              w-full
              rounded-[36px]
              bg-white
              p-8
              shadow-2xl
            "
          >

            <div
              className="grid"
              style={{
                gridTemplateColumns:
                  `260px repeat(${days.length}, 120px)`,
              }}
            >

              {/* HEADER */}

              <div
  className="
    sticky
    left-0
    z-40

    flex
    items-center

    border-b
    border-r

    bg-white

    p-4

    font-bold

    shadow-[8px_0_12px_-8px_rgba(0,0,0,0.08)]
  "

  style={{
    width: "260px",
    minWidth: "260px",
  }}
>
  Chambres
</div>

              {days.map((day) => (

                <div
                  key={day.toISOString()}
                  className="
                    min-w-[120px]
                    border-b
                    border-l
                    p-4
                    text-center
                    font-bold
                  "
                >

                  <div>
                    {format(day, "dd")}
                  </div>

                  <div className="text-sm text-[#6b5b4f]">

                    {format(day, "MMM", {
                      locale: fr,
                    })}

                  </div>

                </div>

              ))}

              {/* LIGNES */}

              {rooms.map((room) => {

                const roomReservations =
                  reservations.filter((reservation) =>
                    reservation.reservation_rooms?.some(
                      (r) => r.room_name === room
                    )
                  )

                return (

                  <div
                    key={room}
                    className="contents"
                  >

                    {/* NOM CHAMBRE */}

                    <div
  className="
    sticky
    left-0
    z-30

    flex
    items-center

    border-r
    border-t

    bg-white

    p-4

    font-bold

    shadow-[8px_0_12px_-8px_rgba(0,0,0,0.08)]
  "

  style={{
    width: "260px",
    minWidth: "260px",
  }}
>
  {room}
</div>

                    {/* LIGNE */}

                    <div
                      className="
                        relative
                        border-t
                      "
                      style={{
                        gridColumn:
                          `span ${days.length}`,

                        height: "170px",
                      }}
                    >

                      {/* GRILLE */}

                      <div
                        className="
                          absolute
                          inset-0
                          grid
                        "
                        style={{
                          gridTemplateColumns:
                            `repeat(${days.length}, 1fr)`,
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

                        const currentRoom =
                          reservation.reservation_rooms?.find(
                            (r) => r.room_name === room
                          )

                        const arrival = new Date(
                          reservation.arrival + "T12:00:00"
                        )

                        const departure = new Date(
                          reservation.departure + "T12:00:00"
                        )

                        const startIndex =
                          days.findIndex(
                            (d) =>
                              format(d, "yyyy-MM-dd") ===
                              format(arrival, "yyyy-MM-dd")
                          )

                        const endIndex =
                          days.findIndex(
                            (d) =>
                              format(d, "yyyy-MM-dd") ===
                              format(departure, "yyyy-MM-dd")
                          ) - 1

                        if (
                          startIndex === -1 ||
                          endIndex === -1
                        ) {
                          return null
                        }

                        const colorPalette = [

  `
    bg-[#4f6f52]
    border-[#7da37f]
  `,

  `
    bg-[#5b6c8f]
    border-[#8ea1c7]
  `,

  `
    bg-[#7b5b8a]
    border-[#aa8dc0]
  `,

  `
    bg-[#9c6b3f]
    border-[#c89b5f]
  `,

  `
    bg-[#7a4b4b]
    border-[#b07a7a]
  `,

  `
    bg-[#3f6f73]
    border-[#6ea4aa]
  `,
]

const clientKey =
  `${reservation.id}`

const clientHash =
  clientKey
    .split("")
    .reduce(
      (acc, char) =>
        acc + char.charCodeAt(0),
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

    ? `
      bg-red-600
      border-red-300
    `

    : reservation.status ===
      "pending"

    ? `
      bg-yellow-500
      border-yellow-300
    `

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
                              h-[130px]

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
                                `${(startIndex / days.length) * 100}%`,

                              width:
                                `${((endIndex - startIndex + 1.02) / days.length) * 100}%`,
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

                              {reservation.status ===
                              "confirmed"

                                ? "Confirmée"

                                : reservation.status ===
                                  "pending"

                                ? "En attente"

                                : reservation.status ===
                                  "rejected"

                                ? "Refusée"

                                : reservation.status}

                            </div>

                            <div className="mt-2 text-sm opacity-90">
                              {currentRoom?.people} pers.
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

                <p>
                  <strong>Personnes :</strong>
                  {" "}
                  {selectedReservation.people}
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
  {selectedReservation.animals
    ? "Oui"
    : "Non"}
</p>

<p>
  <strong>Enfant bas âge :</strong>
  {" "}
  {selectedReservation.baby
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

      </main>
    </>
  )
}