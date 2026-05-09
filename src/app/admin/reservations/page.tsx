"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import AdminNavbar from "@/components/AdminNavbar"

type Reservation = {
  id: number

  first_name: string
  last_name: string

  email: string
  phone: string

  arrival: string
  departure: string

  people: number
  total: number

  room_name: string

  status: string
}

export default function ReservationsPage() {

  const [reservations, setReservations] =
    useState<Reservation[]>([])

  useEffect(() => {

    const loadReservations =
      async () => {

        const { data } =
          await supabase
            .from("reservations")
            .select("*")
            .order("created_at", {
              ascending: false,
            })

        if (data) {
          setReservations(data)
        }
      }

    loadReservations()

  }, [])

  const updateReservationStatus =
    async (
      reservation: Reservation,
      status: string
    ) => {

      await supabase
        .from("reservations")
        .update({ status })
        .eq("id", reservation.id)

      if (status === "confirmed") {

        await supabase
          .from("blocked_dates")
          .insert({
            from_date:
              reservation.arrival,

            to_date:
              reservation.departure,

            reservation_id:
              reservation.id,
          })
      }

      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservation.id
            ? {
                ...r,
                status,
              }
            : r
        )
      )
    }

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

        <AdminNavbar />

        <div className="mt-10">

          {/* HEADER */}
          <div className="mb-10">

            <h1 className="
              font-serif
              text-5xl
              font-bold
            ">
              Réservations
            </h1>

            <p className="
              mt-2
              text-[#6b5b4f]
            ">
              Gestion des demandes clients.
            </p>

          </div>

          {/* RESERVATIONS */}
          <section
            className="
              rounded-[36px]
              border border-[#e7ded2]
              bg-white/80
              p-10
              shadow-xl
            "
          >

            <div className="space-y-6">

              {reservations.map((reservation) => (

                <div
                  key={reservation.id}
                  className="
                    rounded-3xl
                    bg-[#faf7f2]
                    p-8
                  "
                >

                  <div
                    className="
                      flex flex-col gap-6
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                    "
                  >

                    {/* INFOS */}
                    <div className="space-y-3">

                      <h3
                        className="
                          text-2xl
                          font-bold
                        "
                      >
                        {reservation.first_name}{" "}
                        {reservation.last_name}
                      </h3>

                      <p>
                        {reservation.email}
                      </p>

                      <p>
                        {reservation.phone}
                      </p>

                      <p>
                        Du{" "}
                        {new Date(
                          reservation.arrival
                        ).toLocaleDateString(
                          "fr-FR",
                          {
                            timeZone:
                              "Europe/Paris",
                          }
                        )}
                        {" "}au{" "}
                        {new Date(
                          reservation.departure
                        ).toLocaleDateString(
                          "fr-FR",
                          {
                            timeZone:
                              "Europe/Paris",
                          }
                        )}
                      </p>

                      <p>
                        {
                          reservation.people
                        }{" "}
                        personnes
                      </p>

                      <p>
                        Chambre :
                        {" "}
                        <strong>
                          {
                            reservation.room_name ||
                            "Non définie"
                          }
                        </strong>
                      </p>

                      <p
                        className="
                          text-2xl
                          font-bold
                        "
                      >
                        {reservation.total}€
                      </p>

                      {/* STATUS */}
                      <div
                        className={`
                          inline-flex
                          rounded-full
                          px-4 py-2
                          text-sm
                          font-bold
                          text-white
                          ${
                            reservation.status ===
                            "confirmed"
                              ? "bg-green-500"
                              : reservation.status ===
                                "rejected"
                              ? "bg-red-500"
                              : "bg-orange-500"
                          }
                        `}
                      >

                        {
                          reservation.status ===
                          "confirmed"
                            ? "Confirmée"
                            : reservation.status ===
                              "rejected"
                            ? "Refusée"
                            : "En attente"
                        }

                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="
                      flex gap-4
                    ">

                      <button
                        onClick={() =>
                          updateReservationStatus(
                            reservation,
                            "confirmed"
                          )
                        }
                        className="
                          rounded-2xl
                          bg-green-600
                          px-6 py-4
                          font-bold
                          text-white
                          transition
                          hover:bg-green-700
                        "
                      >
                        Confirmer
                      </button>

                      <button
                        onClick={() =>
                          updateReservationStatus(
                            reservation,
                            "rejected"
                          )
                        }
                        className="
                          rounded-2xl
                          bg-red-600
                          px-6 py-4
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

              ))}

            </div>

          </section>

        </div>

      </main>

    </>
  )
}