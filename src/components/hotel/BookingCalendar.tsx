"use client"

import { useEffect, useState } from "react"
import { DayPicker } from "react-day-picker"
import type { DateRange } from "react-day-picker"
import { differenceInDays, format } from "date-fns"
import { fr } from "date-fns/locale"
import { HOTEL_CONFIG } from "@/data/hotel"
import { supabase } from "@/lib/supabase"

import "react-day-picker/dist/style.css"

type Props = {
  price: number,
  roomName: string
}

export default function BookingCalendar({
  price,
  roomName
}: Props) {

  const [range, setRange] =
    useState<DateRange | undefined>()

  const [pets, setPets] =
    useState(false)

  const [people, setPeople] =
    useState(2)

  const [breakfast, setBreakfast] =
    useState(false)

  const [lunch, setLunch] =
    useState(false)

  const [dinner, setDinner] =
    useState(false)

  const [baby, setBaby] =
    useState(false)

  const [blockedDates, setBlockedDates] =
    useState<Date[]>([])

  /* ---------------- DATES BLOQUÉES ---------------- */

  useEffect(() => {

    const loadBlockedDates =
      async () => {

        const { data } =
          await supabase
            .from("blocked_dates")
            .select("*")

        if (!data) return

        const dates: Date[] = []

        data.forEach((reservation) => {

          const start =
            new Date(
              reservation.from_date +
              "T12:00:00"
            )

          const end =
            new Date(
              reservation.to_date +
              "T12:00:00"
            )

          const current =
            new Date(start)

          while (current <= end) {

            dates.push(
              new Date(current)
            )

            current.setDate(
              current.getDate() + 1
            )
          }
        })

        setBlockedDates(dates)
      }

    loadBlockedDates()

  }, [])

  /* ---------------- NUITS ---------------- */

  const nights =
    range?.from && range?.to
      ? differenceInDays(
          range.to,
          range.from
        )
      : 0

  /* ---------------- CHAMBRE ---------------- */

  const roomTotal =
    price * nights

  /* ---------------- PERSONNES SUPP ---------------- */

  const extraPeople =
    people > 2
      ? people - 2
      : 0

  const extraBedTotal =
    extraPeople * 15 * nights

  /* ---------------- ANIMAUX ---------------- */

  const petTotal =
    pets ? 8 * nights : 0

  /* ---------------- PETIT DÉJ ---------------- */

  const breakfastTotal =
    breakfast
      ? people * 8 * nights
      : 0

  /* ---------------- MIDI ---------------- */

  const lunchTotal =
    lunch
      ? people * 18 * nights
      : 0

  /* ---------------- SOIR ---------------- */

  const dinnerTotal =
    dinner
      ? people * 20 * nights
      : 0

  /* ---------------- TAXE ---------------- */

  const touristTaxTotal =
    nights *
    people *
    HOTEL_CONFIG.options.touristTax

  /* ---------------- TOTAL ---------------- */

  const total =
    roomTotal +
    extraBedTotal +
    petTotal +
    breakfastTotal +
    lunchTotal +
    dinnerTotal +
    touristTaxTotal

  return (

    <div
      className="
        rounded-[36px]
        bg-white
        p-8
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
    >

      {/* HEADER */}
      <div className="mb-8">

        <h2
          className="
            mb-3
            font-serif
            text-4xl
            font-bold
            text-[#2f241d]
          "
        >
          Réserver
        </h2>

        <p className="text-[#6b5b4f]">
          Sélectionnez vos dates de séjour.
        </p>

      </div>

      {/* CALENDRIER */}
      <div
        className="
          overflow-hidden
          rounded-3xl
          border border-[#e7ded2]
          p-4
        "
      >

        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
          locale={fr}
          disabled={[
            { before: new Date() },
            ...blockedDates,
          ]}
          modifiers={{
            booked: blockedDates,
          }}
          modifiersClassNames={{
            booked:
              "bg-red-500 text-white rounded-full",
          }}
        />

      </div>

      {/* OPTIONS */}
      <div className="mt-8 space-y-6">

        {/* PERSONNES */}
        <div
          className="
            rounded-3xl
            bg-[#faf7f2]
            p-6
          "
        >

          <label
            className="
              mb-3 block
              text-lg font-semibold
            "
          >
            Nombre de personnes
          </label>

          <select
            value={people}
            onChange={(e) =>
              setPeople(
                Number(e.target.value)
              )
            }
            className="
              w-full
              rounded-2xl
              border
              p-4
            "
          >

            <option value={1}>
              1 personne
            </option>

            <option value={2}>
              2 personnes
            </option>

            <option value={3}>
              3 personnes (+ lit supplémentaire)
            </option>

            <option value={4}>
              4 personnes (+ lit supplémentaire)
            </option>

          </select>

          {people > 2 && (
            <p
              className="
                mt-3
                text-sm
                text-[#6b5b4f]
              "
            >
              Supplément lit :
              15€ / nuit / personne.
            </p>
          )}

        </div>

        {/* ANIMAUX */}
        <div
          className="
            rounded-3xl
            bg-[#faf7f2]
            p-6
          "
        >

          <label
            className="
              flex items-center justify-between
              text-lg font-semibold
            "
          >

            <span>
              Animal de compagnie
            </span>

            <input
              type="checkbox"
              checked={pets}
              onChange={(e) =>
                setPets(
                  e.target.checked
                )
              }
              className="h-5 w-5"
            />

          </label>

          <p className="mt-2 text-sm text-[#6b5b4f]">
            Supplément animal : 8€
          </p>

        </div>

        {/* PETIT DÉJ */}
        <div
          className="
            rounded-3xl
            bg-[#faf7f2]
            p-6
          "
        >

          <label
            className="
              flex items-center justify-between
              text-lg font-semibold
            "
          >

            <span>
              Petit-déjeuner
            </span>

            <input
              type="checkbox"
              checked={breakfast}
              onChange={(e) =>
                setBreakfast(
                  e.target.checked
                )
              }
              className="h-5 w-5"
            />

          </label>

          <p
            className="
              mt-2
              text-sm
              text-[#6b5b4f]
            "
          >
            8€ / nuit / personne
          </p>

        </div>

        {/* MIDI */}
        <div
          className="
            rounded-3xl
            bg-[#faf7f2]
            p-6
          "
        >

          <label
            className="
              mb-3 block
              text-lg font-semibold
            "
          >
            Repas du midi
          </label>

          <input
            type="checkbox"
            checked={lunch}
            onChange={(e) =>
              setLunch(
                e.target.checked
              )
            }
            className="h-5 w-5"
          />

          <p
            className="
              mt-2
              text-sm
              text-[#6b5b4f]
            "
          >
            18€ / midi / personne
          </p>

        </div>

        {/* SOIR */}
        <div
          className="
            rounded-3xl
            bg-[#faf7f2]
            p-6
          "
        >

          <label
            className="
              mb-3 block
              text-lg font-semibold
            "
          >
            Repas du soir
          </label>

          <input
            type="checkbox"
            checked={dinner}
            onChange={(e) =>
              setDinner(
                e.target.checked
              )
            }
            className="h-5 w-5"
          />

          <p
            className="
              mt-2
              text-sm
              text-[#6b5b4f]
            "
          >
            20€ / soir / personne
          </p>

        </div>

        {/* BÉBÉ */}
        <div
          className="
            rounded-3xl
            bg-[#faf7f2]
            p-6
          "
        >

          <label
            className="
              flex items-center justify-between
              text-lg font-semibold
            "
          >

            <span>
              Enfant en bas âge
            </span>

            <input
              type="checkbox"
              checked={baby}
              onChange={(e) =>
                setBaby(
                  e.target.checked
                )
              }
              className="h-5 w-5"
            />

          </label>

          <p className="mt-2 text-sm text-[#6b5b4f]">
            Lit bébé possible selon disponibilité.
          </p>

        </div>

      </div>

      {/* RÉCAP */}
      {range?.from && range?.to && (

        <div
          className="
            mt-8
            rounded-3xl
            bg-[#faf7f2]
            p-6
          "
        >

          <div className="space-y-4">

            <div
              className="
                flex items-center justify-between
                border-b border-[#e7ded2]
                pb-3
              "
            >

              <span>
                Arrivée
              </span>

              <span className="font-semibold">
                {format(
                  range.from,
                  "dd MMM yyyy",
                  {
                    locale: fr,
                  }
                )}
              </span>

            </div>

            <div
              className="
                flex items-center justify-between
                border-b border-[#e7ded2]
                pb-3
              "
            >

              <span>
                Départ
              </span>

              <span className="font-semibold">
                {format(
                  range.to,
                  "dd MMM yyyy",
                  {
                    locale: fr,
                  }
                )}
              </span>

            </div>

            <div
              className="
                flex items-center justify-between
                border-b border-[#e7ded2]
                pb-3
              "
            >

              <span>
                Nombre de nuits
              </span>

              <span className="font-semibold">
                {nights}
              </span>

            </div>

            <div
              className="
                flex items-center justify-between
                border-b border-[#e7ded2]
                pb-3
              "
            >

              <span>
                Taxe de séjour
              </span>

              <span>
                {touristTaxTotal.toFixed(2)}€
              </span>

            </div>

            <div
              className="
                flex items-center justify-between
                pt-2
              "
            >

              <span
                className="
                  text-xl font-bold
                "
              >
                Total
              </span>

              <span
                className="
                  text-3xl
                  font-bold
                  text-[#2f241d]
                "
              >
                {total.toFixed(2)}€
              </span>

            </div>

          </div>

          <button
            onClick={() => {

              if (
                !range?.from ||
                !range?.to
              ) {
                alert(
                  "Sélectionnez vos dates"
                )
                return
              }

              const reservation = {

                room_name: roomName,

                from: format(
                  range.from,
                  "yyyy-MM-dd"
                ),

                to: format(
                  range.to,
                  "yyyy-MM-dd"
                ),

                nights,
                people,
                pets,
                breakfast,
                lunch,
                dinner,
                baby,
                touristTaxTotal,
                total,
              }

              localStorage.setItem(
                "reservationData",
                JSON.stringify(
                  reservation
                )
              )

              window.location.href =
                "/checkout"
            }}
            className="
              mt-8
              w-full
              rounded-2xl
              bg-[#2f241d]
              px-6 py-5
              text-lg font-bold
              text-white
              transition-all duration-300
              hover:scale-[1.02]
              hover:bg-[#43352c]
            "
          >
            Réserver maintenant
          </button>

        </div>

      )}

    </div>
  )
}