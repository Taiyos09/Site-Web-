"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { addDays, format } from "date-fns"
import { fr } from "date-fns/locale"
import AdminNavbar from "@/components/AdminNavbar"

type Reservation = {
  id: number

  first_name: string
  last_name: string

  room_name: string

  arrival: string
 departure: string

  status: string
}

const rooms = [
  "Chambre double standard",
  "Chambre Confort",
  "Chambre Familiale",
]

export default function CalendarPage() {

  const [reservations, setReservations] =
    useState<Reservation[]>([])

  useEffect(() => {

    const loadReservations =
      async () => {

        const { data } =
          await supabase
            .from("reservations")
            .select("*")
            .eq("status", "confirmed")

        if (data) {
          setReservations(data)
        }
      }

    loadReservations()

  }, [])

  const days =
    Array.from(
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

      <main className="
        min-h-screen
        bg-[#f5f1ea]
        p-10
        text-[#2f241d]
      ">

        {/* NAVBAR ADMIN */}
        <AdminNavbar />

        <div className="mt-10" />

        {/* TITRE */}
        <div className="mb-10">

          <h1 className="
            font-serif
            text-5xl
            font-bold
          ">
            Calendrier hôtel
          </h1>

          <p className="mt-2 text-[#6b5b4f]">
            Gestion des disponibilités.
          </p>

        </div>

        {/* CALENDRIER */}
        <div className="
          overflow-x-auto
          rounded-[36px]
          bg-white
          p-6
          shadow-2xl
        ">

          <div
            className="grid"
            style={{
              gridTemplateColumns:
                `220px repeat(${days.length}, 120px)`,
            }}
          >

            {/* HEADER */}
            <div className="
              border-b
              p-4
              font-bold
              bg-white
              sticky left-0 z-30
            ">
              Chambres
            </div>

            {days.map((day) => (

              <div
                key={day.toISOString()}
                className="
                  border-b
                  border-l
                  p-4
                  text-center
                  font-bold
                  min-w-[120px]
                "
              >

                <div>
                  {format(day, "dd")}
                </div>

                <div className="
                  text-sm
                  text-[#6b5b4f]
                ">
                  {format(day, "MMM", {
                    locale: fr,
                  })}
                </div>

              </div>

            ))}

            {/* LIGNES */}
            {rooms.map((room) => {

              const roomReservations =
                reservations.filter(
                  (r) =>
                    r.room_name === room
                )

              return (

                <>

                  {/* NOM CHAMBRE */}
                  <div
                    key={room}
                    className="
                      border-t
                      border-r
                      p-4
                      font-bold
                      bg-white
                      sticky left-0 z-20
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
                      gridColumn:
                        `span ${days.length}`,
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
                        gridTemplateColumns:
                          `repeat(${days.length}, 1fr)`,
                      }}
                    >
                      {days.map((_, i) => (
                        <div
                          key={i}
                          className="border-r"
                        />
                      ))}
                    </div>

                    {/* RESERVATIONS */}
                    {roomReservations.map(
                      (reservation) => {

                        const arrival =
                          new Date(
                            reservation.arrival +
                            "T12:00:00"
                          )

                        const departure =
                          new Date(
                            reservation.departure +
                            "T12:00:00"
                          )

                        const startIndex =
                          days.findIndex(
                            (d) =>
                              format(
                                d,
                                "yyyy-MM-dd"
                              ) ===
                              format(
                                arrival,
                                "yyyy-MM-dd"
                              )
                          )

                        const endIndex =
                          days.findIndex(
                            (d) =>
                              format(
                                d,
                                "yyyy-MM-dd"
                              ) ===
                              format(
                                departure,
                                "yyyy-MM-dd"
                              )
                          )

                        if (
                          startIndex === -1 ||
                          endIndex === -1
                        ) {
                          return null
                        }

                        return (

                          <button
                            key={reservation.id}
                            className="
                              absolute
                              top-2
                              h-[80px]
                              rounded-2xl
                              bg-green-600
                              px-4
                              py-3
                              text-left
                              text-white
                              shadow-xl
                              transition
                              hover:scale-[1.02]
                            "
                            style={{
                              left:
                                `${(startIndex / days.length) * 100}%`,

                              width:
                                `${((endIndex - startIndex + 1) / days.length) * 100}%`,
                            }}
                          >

                            <div className="font-bold">
                              {
                                reservation.first_name
                              }
                            </div>

                            <div className="text-sm">
                              {
                                reservation.last_name
                              }
                            </div>

                            <div className="mt-1 text-xs opacity-80">
                              {format(
                                arrival,
                                "dd MMM",
                                { locale: fr }
                              )}
                              {" → "}
                              {format(
                                departure,
                                "dd MMM",
                                { locale: fr }
                              )}
                            </div>

                          </button>

                        )
                      }
                    )}

                  </div>

                </>
              )
            })}

          </div>

        </div>

      </main>

    </>
  )
}