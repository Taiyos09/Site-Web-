"use client"

import { useEffect, useState } from "react"
import { DayPicker } from "react-day-picker"
import type { DateRange } from "react-day-picker"
import { differenceInDays, format } from "date-fns"
import { fr } from "date-fns/locale"
import { supabase } from "@/lib/supabase"

import "react-day-picker/dist/style.css"

type Props = {
  onePersonPrice: number
  twoPeoplePrice: number
  roomName: string
  roomSlug: string
}

export default function BookingCalendar({
  onePersonPrice,
  twoPeoplePrice,
  roomName,
  roomSlug,
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

  const [settings, setSettings] =
    useState<any>(null)

  /* ---------------- DATES BLOQUÉES ---------------- */

useEffect(() => {

  const loadBlockedDates =
    async () => {

      const response = await fetch(
  `/api/blocked-dates?roomSlug=${roomSlug}`
)

const data = await response.json()

if (!data) {
  return
} 

      const dates: Date[] = []

      data.forEach((item: any) => {

        const reservation =
          item.reservations

        if (!reservation) return

        // ignorer annulées/refusées
        if (
          reservation.status === "refused" ||
          reservation.status === "cancelled"
        ) {
          return
        }

        const start =
          new Date(
            reservation.arrival +
            "T12:00:00"
          )

        const end =
          new Date(
            reservation.departure +
            "T12:00:00"
          )

        const current =
          new Date(start)

        while (current < end) {

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

}, [roomSlug])

  /* ---------------- SETTINGS ---------------- */

  useEffect(() => {

    const loadSettings =
      async () => {

        const { data } =
          await supabase
            .from("hotel_settings")
            .select("*")
            .single()

        if (data) {
          setSettings(data)
        }
      }

    loadSettings()

  }, [])

  /* ---------------- NUITS ---------------- */

  const nights =
    range?.from && range?.to
      ? differenceInDays(
          range.to,
          range.from
        )
      : 0

  /* ---------------- TARIFS ---------------- */

  const roomPrice =
    people <= 1
      ? Number(onePersonPrice)
      : Number(twoPeoplePrice)

  const roomTotal =
    roomPrice * nights

  const extraPeople =
    people > 2
      ? people - 2
      : 0

  const extraBedTotal =
    extraPeople *
    (settings?.extra_bed || 15) *
    nights

  const petTotal =
    pets
      ? (settings?.pet || 5) *
        nights
      : 0

  const breakfastTotal =
    breakfast
      ? people *
        (settings?.breakfast || 8) *
        nights
      : 0

  const lunchTotal =
    lunch
      ? people *
        (settings?.lunch || 15) *
        nights
      : 0

  const dinnerTotal =
    dinner
      ? people *
        (settings?.dinner || 20) *
        nights
      : 0

  const touristTaxTotal =
    nights *
    people *
    (settings?.tourist_tax || 1.3)

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
          disabled={(date) => {

            if (
              date <
              new Date(
                new Date().setHours(
                  0,
                  0,
                  0,
                  0
                )
              )
            ) {
              return true
            }

            if (!range?.from) {

              return blockedDates.some(
                (blockedDate) =>

                  format(
                    blockedDate,
                    "yyyy-MM-dd"
                  ) ===
                  format(
                    date,
                    "yyyy-MM-dd"
                  )
              )
            }

            return false
          }}
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
              3 personnes
            </option>

            <option value={4}>
              4 personnes
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
              {" "}
              {settings?.extra_bed || 15}€
              {" "}
              / nuit / personne
            </p>

          )}

        </div>

        {/* OPTIONS CHECKBOX */}

        <div
          className="
            rounded-3xl
            bg-[#faf7f2]
            p-6
            space-y-4
          "
        >

          {[
            {
              label: "Petit déjeuner",
              checked: breakfast,
              set: setBreakfast,
              price: `${settings?.breakfast || 8}€ / pers / nuit`,
            },
            {
              label: "Repas midi",
              checked: lunch,
              set: setLunch,
              price: `${settings?.lunch || 15}€ / pers / nuit`,
            },
            {
              label: "Repas soir",
              checked: dinner,
              set: setDinner,
              price: `${settings?.dinner || 20}€ / pers / nuit`,
            },
            {
              label: "Animal",
              checked: pets,
              set: setPets,
              price: `${settings?.pet || 5}€ / nuit`,
            },
            {
              label: "Lit bébé",
              checked: baby,
              set: setBaby,
              price: `Gratuit`,
            },
          ].map((option) => (

            <label
              key={option.label}
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >

              <div className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={() =>
                    option.set(
                      !option.checked
                    )
                  }
                />

                <span>
                  {option.label}
                </span>

              </div>

              <span
                className="
                  text-sm
                  font-semibold
                  text-[#8a6330]
                "
              >
                {option.price}
              </span>

            </label>

          ))}

        </div>

        {/* RÉCAP */}

        {range?.from && range?.to && (

          <div
            className="
              rounded-3xl
              bg-[#faf7f2]
              p-6
            "
          >

            <div className="space-y-4">

              {/* CHAMBRE */}

              <div className="
                flex
                items-center
                justify-between
              ">

                <div>

                  <p className="font-semibold">
                    Chambre
                  </p>

                  <p className="text-sm text-[#6b5b4f]">
                    {roomPrice}€
                    {" "}×{" "}
                    {nights}
                    {" "}nuits
                  </p>

                </div>

                <span>
                  {roomTotal.toFixed(2)}€
                </span>

              </div>

              {/* LIT SUP */}

              {extraBedTotal > 0 && (

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <div>

                    <p className="font-semibold">
                      Lit supplémentaire
                    </p>

                    <p className="text-sm text-[#6b5b4f]">
                      {settings?.extra_bed || 15}€
                      {" "}×{" "}
                      {extraPeople}
                      {" "}personne(s)
                      {" "}×{" "}
                      {nights}
                      {" "}nuits
                    </p>

                  </div>

                  <span>
                    {extraBedTotal.toFixed(2)}€
                  </span>

                </div>

              )}

              {/* PETIT DEJ */}

              {breakfastTotal > 0 && (

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <div>

                    <p className="font-semibold">
                      Petit déjeuner
                    </p>

                    <p className="text-sm text-[#6b5b4f]">
                      {settings?.breakfast || 8}€
                      {" "}×{" "}
                      {people}
                      {" "}personne(s)
                      {" "}×{" "}
                      {nights}
                      {" "}nuits
                    </p>

                  </div>

                  <span>
                    {breakfastTotal.toFixed(2)}€
                  </span>

                </div>

              )}

              {/* MIDI */}

              {lunchTotal > 0 && (

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <div>

                    <p className="font-semibold">
                      Repas midi
                    </p>

                    <p className="text-sm text-[#6b5b4f]">
                      {settings?.lunch || 15}€
                      {" "}×{" "}
                      {people}
                      {" "}personne(s)
                      {" "}×{" "}
                      {nights}
                      {" "}nuits
                    </p>

                  </div>

                  <span>
                    {lunchTotal.toFixed(2)}€
                  </span>

                </div>

              )}

              {/* SOIR */}

              {dinnerTotal > 0 && (

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <div>

                    <p className="font-semibold">
                      Repas soir
                    </p>

                    <p className="text-sm text-[#6b5b4f]">
                      {settings?.dinner || 20}€
                      {" "}×{" "}
                      {people}
                      {" "}personne(s)
                      {" "}×{" "}
                      {nights}
                      {" "}nuits
                    </p>

                  </div>

                  <span>
                    {dinnerTotal.toFixed(2)}€
                  </span>

                </div>

              )}

              {/* ANIMAL */}

              {petTotal > 0 && (

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <div>

                    <p className="font-semibold">
                      Animal
                    </p>

                    <p className="text-sm text-[#6b5b4f]">
                      {settings?.pet || 5}€
                      {" "}×{" "}
                      {nights}
                      {" "}nuits
                    </p>

                  </div>

                  <span>
                    {petTotal.toFixed(2)}€
                  </span>

                </div>

              )}

              {/* TAXE */}

              <div className="
                flex
                items-center
                justify-between
              ">

                <div>

                  <p className="font-semibold">
                    Taxe de séjour
                  </p>

                  <p className="text-sm text-[#6b5b4f]">
                    {settings?.tourist_tax || 1.3}€
                    {" "}×{" "}
                    {people}
                    {" "}personne(s)
                    {" "}×{" "}
                    {nights}
                    {" "}nuits
                  </p>

                </div>

                <span>
                  {touristTaxTotal.toFixed(2)}€
                </span>

              </div>

              {/* TOTAL */}

              <div
                className="
                  mt-6
                  flex
                  items-center
                  justify-between
                  border-t
                  border-[#e7ded2]
                  pt-5
                "
              >

                <span
                  className="
                    text-3xl
                    font-bold
                    text-[#2f241d]
                  "
                >
                  Total
                </span>

                <span
                  className="
                    text-4xl
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

                  from: format(
                    range.from,
                    "yyyy-MM-dd"
                  ),

                  to: format(
                    range.to,
                    "yyyy-MM-dd"
                  ),

                  roomName,
                  roomSlug,

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

    </div>
  )
}