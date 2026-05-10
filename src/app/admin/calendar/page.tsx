"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { addDays, format } from "date-fns"
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
  breakfast: boolean
  lunch: boolean
  dinner: boolean
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

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const { data, error } =
          await supabase
            .from("reservations")
            .select(`
              *,
              reservation_rooms (*)
            `)
            .eq("status", "confirmed")

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

  const days = Array.from(
    { length: 30 },
    (_, i) => addDays(new Date(), i)
  )

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

          <div
            className="
              overflow-x-auto
              rounded-[36px]
              bg-white
              p-6
              shadow-2xl
            "
          >
            <div
              className="grid"
              style={{
                gridTemplateColumns: `220px repeat(${days.length}, 120px)`,
              }}
            >
              {/* HEADER */}
              <div
                className="
                  sticky left-0 z-30
                  border-b
                  bg-white
                  p-4
                  font-bold
                "
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
                  <div>{format(day, "dd")}</div>

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
                        sticky left-0 z-20
                        border-r
                        border-t
                        bg-white
                        p-4
                        font-bold
                      "
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
                        gridColumn: `span ${days.length}`,
                        height: "100px",
                      }}
                    >
                      {/* GRILLE */}
                      <div
                        className="
                          absolute inset-0
                          grid
                        "
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

                        const reservationColor =
                          reservation.id % 4 === 0
                            ? "bg-green-600"
                            : reservation.id % 4 === 1
                            ? "bg-blue-600"
                            : reservation.id % 4 === 2
                            ? "bg-orange-500"
                            : "bg-purple-600"

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
                              top-2
                              h-[80px]
                              rounded-2xl
                              px-4
                              py-3
                              text-left
                              text-white
                              shadow-xl
                              transition
                              hover:scale-[1.02]
                              ${reservationColor}
                            `}
                            style={{
                              left: `${(startIndex / days.length) * 100}%`,
                              width: `${((endIndex - startIndex + 1.02) / days.length) * 100}%`,
                            }}
                          >
                            <div className="font-bold">
                              {reservation.first_name}
                            </div>

                            <div className="text-sm">
                              {reservation.last_name}
                            </div>

                            <div className="mt-1 text-xs opacity-80">
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
      fixed inset-0 z-50
      flex items-center justify-center
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

      <div className="
        mb-8
        flex items-center justify-between
      ">

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
            px-4 py-2
            text-white
          "
        >
          Fermer
        </button>

      </div>

      <div className="
        space-y-4
        text-lg
      ">

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
          <strong>Petit déjeuner :</strong>
          {" "}
          {selectedReservation.breakfast
            ? "Oui"
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
          <strong>Total :</strong>
          {" "}
          {selectedReservation.total}€
        </p>

        <p>
          <strong>Statut :</strong>
          {" "}
          {selectedReservation.status}
        </p>

      </div>

    </div>

  </div>

)}
      </main>
    </>
  )
}