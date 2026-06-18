"use client"

import { useEffect, useState } from "react"
import { DayPicker } from "react-day-picker"
import type { DateRange } from "react-day-picker"
import { differenceInDays, format } from "date-fns"
import { fr } from "date-fns/locale"
import { useRouter } from "next/navigation"

import "react-day-picker/dist/style.css"

type Props = {
  priceOnePerson: number
  priceTwoPeople: number
  roomName: string
  roomSlug: string
  roomId: number
  roomCapacity: number
}

export default function BookingCalendar({

  priceOnePerson,
  priceTwoPeople,
  roomName,
  roomSlug,
  roomId,
  roomCapacity
}: Props) {

  const maxPeople =
  roomCapacity

  const [range, setRange] =
    useState<DateRange | undefined>()

  const [pets, setPets] =
    useState(false)

  const [litParapluie, setLitParapluie] =
    useState(false)

  const [adults, setAdults] =
  useState(2)

const [children, setChildren] =
  useState(0)

const [babies, setBabies] =
  useState(0)

const occupancy =
  adults + children

  const [lunch, setLunch] =
    useState(false)

  const [dinner, setDinner] =
    useState(false)


  const [blockedDates, setBlockedDates] =
    useState<Date[]>([])

  const [settings, setSettings] =
    useState<any>(null)

  const router =
  useRouter()

  /* =========================
     DATES BLOQUÉES
  ========================= */

  useEffect(() => {

    const loadBlockedDates =
      async () => {

        try {

          const response =
            await fetch(

              `/api/blocked-dates?room_slug=${roomSlug}`

            )

          const data =
            await response.json()

          console.log(
            "BLOCKED DATES API:",
            data
          )

          if (
            !Array.isArray(data)
          ) {

            setBlockedDates([])

            return
          }

          const dates =

            data

              .map((item: any) => {

                if (!item?.date) {

                  return null
                }

                const parsed =
                  new Date(item.date)

                if (
                  isNaN(
                    parsed.getTime()
                  )
                ) {

                  return null
                }

                parsed.setHours(
                  12,
                  0,
                  0,
                  0
                )

                return parsed
              })

              .filter(Boolean)

          setBlockedDates(
            dates as Date[]
          )

        } catch (error) {

          console.error(
            "Erreur dates bloquées :",
            error
          )
        }
      }

    if (roomSlug) {

      loadBlockedDates()
    }

  }, [roomSlug])

  /* =========================
     SETTINGS
  ========================= */

  useEffect(() => {

    const loadSettings =
      async () => {

        const response =
          await fetch(
            "/api/hotel-settings"
          )

        const data =
          await response.json()

        if (data) {

          setSettings(data)
        }
      }

    loadSettings()

  }, [])

  /* =========================
     NUITS
  ========================= */

  const nights =
    range?.from && range?.to
      ? differenceInDays(
          range.to,
          range.from
        )
      : 0

  /* =========================
     TARIFS
  ========================= */

  const roomPrice =
  occupancy <= 1
    ? Number(priceOnePerson)
    : Number(priceTwoPeople)

  const roomTotal =
    roomPrice * nights

  const extraPeople =
  occupancy > 2
    ? occupancy - 2
    : 0

  const extraBedTotal =
    extraPeople *
    (settings?.extra_bed || 15) *
    nights

  const petTotal =
    pets
      ? (settings?.pet ?? 5) *
        nights
      : 0

  const litParapluieTotal =
    litParapluie
      ? (settings?.litParapluie ?? 5) *
        nights
     : 0

  const lunchTotal =
    lunch
      ? occupancy *
        (settings?.lunch ?? 15) *
        nights
      : 0

  const dinnerTotal =
    dinner
      ? occupancy *
        (settings?.dinner ?? 20) *
        nights
      : 0

  const touristTaxTotal =
  nights *
  adults *
  (settings?.tourist_tax ?? 1.3)

  /* =========================
     TOTAL
  ========================= */

  const total =
  roomTotal +
  extraBedTotal +
  petTotal +
  lunchTotal +
  dinnerTotal +
  touristTaxTotal +
  litParapluieTotal

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

          numberOfMonths={1}

          locale={fr}

          disabled={(date) => {

            const today =
              new Date()

            today.setHours(
              0,
              0,
              0,
              0
            )

            /* DATES PASSÉES */

            if (date < today) {

              return true
            }

            /* SÉCURITÉ */

            if (
              !Array.isArray(blockedDates)
            ) {

              return false
            }

            /* DATES BLOQUÉES */

            return blockedDates.some(
              (blockedDate) => {

                if (
                  !(blockedDate instanceof Date)
                ) {

                  return false
                }

                if (
                  isNaN(
                    blockedDate.getTime()
                  )
                ) {

                  return false
                }

                return (

                  blockedDate
                    .toDateString()

                  ===

                  date
                    .toDateString()
                )
              }
            )
          }}

          modifiers={{

            booked: (date) => {

              if (
                !Array.isArray(blockedDates)
              ) {

                return false
              }

              return blockedDates.some(
                (blockedDate) => {

                  if (
                    !(blockedDate instanceof Date)
                  ) {

                    return false
                  }

                  if (
                    isNaN(
                      blockedDate.getTime()
                    )
                  ) {

                    return false
                  }

                  return (

                    blockedDate
                      .toDateString()

                    ===

                    date
                      .toDateString()
                  )
                }
              )
            },
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
              mb-3
              block
              text-lg
              font-semibold
            "
          >
            Nombre de personnes
          </label>

          <div className="grid grid-cols-3 gap-3">

  <div>

    <label className="mb-1 block text-sm font-medium">
      Adultes
    </label>

    <select
      value={adults}
      onChange={(e) =>
        setAdults(
          Number(e.target.value)
        )
      }
      className="
        w-full
        rounded-xl
        border
        p-2
      "
    >
      {Array.from(
  { length: maxPeople },
  (_, i) => i + 1
).map((n) => (

  <option
    key={n}
    value={n}
  >
    {n} adulte{n > 1 ? "s" : ""}
  </option>

))}
    </select>

  </div>

  <div>

    <label className="mb-1 block text-sm font-medium">
      Enfants (2 ans +)
    </label>

    <select
      value={children}
      onChange={(e) =>
        setChildren(
          Number(e.target.value)
        )
      }
      className="
        w-full
        rounded-xl
        border
        p-2
      "
    >
      {Array.from(
  { length: maxPeople + 1 },
  (_, i) => i
).map((n) => (
        <option
          key={n}
          value={n}
        >
          {n}
        </option>
      ))}
    </select>

  </div>

  <div>

    <label className="mb-1 block text-sm font-medium">
      Bébés (- 2 ans)
    </label>

    <select
      value={babies}
      onChange={(e) =>
        setBabies(
          Number(e.target.value)
        )
      }
      className="
        w-full
        rounded-2xl
        border
        p-2
      "
    >
      {[0,1,2].map((n) => (
        <option
          key={n}
          value={n}
        >
          {n}
        </option>
      ))}
    </select>

  </div>

</div>

<p
  className="
    mt-4
    text-sm
    text-[#7a6a5d]
  "
>
  {maxPeople > 2 && (

  <p
    className="
      mt-2
      text-sm
      text-[#7a6a5d]
    "
  >
    - Au-delà de 2 personnes,
    un supplément de {settings?.extra_bed || 15} €
    par personne et par nuit
    est appliqué.
  </p>

)}

</p>

<p
  className="
    text-sm
    text-[#7a6a5d]
  "
>
  - Les bébés de moins de 2 ans sont accueillis gratuitement.
</p>

          {/* OPTIONS */}

<div className="grid gap-3">

  {/* MIDI */}

  <label
    className="
      flex
      cursor-pointer
      items-center
      justify-between
      rounded-2xl
      border
      border-[#e7ded2]
      bg-[#faf7f2]
      p-5
    "
  >

    <div>

      <p className="text-sm font-semibold">
        🍽️ Repas midi
      </p>

      <p className="text-xs text-[#7a6a5d]">
        +{settings?.lunch || 15}€
        / personne
      </p>

    </div>

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

  </label>

  {/* SOIR */}

  <label
    className="
      flex
      cursor-pointer
      items-center
      justify-between
      rounded-2xl
      border
      border-[#e7ded2]
      bg-[#faf7f2]
      p-5
    "
  >

    <div>

      <p className="text-sm font-semibold">
        🌙 Repas soir
      </p>

      <p className="text-xs text-[#7a6a5d]">
        +{settings?.dinner || 20}€
        / personne
      </p>

    </div>

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

  </label>

  {/* ANIMAUX */}

  <label
    className="
      flex
      cursor-pointer
      items-center
      justify-between
      rounded-2xl
      border
      border-[#e7ded2]
      bg-[#faf7f2]
      p-5
    "
  >

    <div>

      <p className="text-sm font-semibold">
        🐶 Animal
      </p>

      <p className="text-xs text-[#7a6a5d]">
        +{settings?.pet || 5}€
        / nuit
      </p>

    </div>

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

  {babies > 0 && (

  <label
    className="
      flex
      cursor-pointer
      items-center
      justify-between
      rounded-2xl
      border
      border-[#e7ded2]
      bg-[#faf7f2]
      p-5
    "
  >

    <div>

      <p className="text-sm font-semibold">
        👶 Lit parapluie
      </p>

      <p className="text-xs text-[#7a6a5d]">
        +{settings?.litParapluie || 5}€
      </p>

    </div>

    <input
      type="checkbox"
      checked={litParapluie}
      onChange={(e) =>
        setLitParapluie(
          e.target.checked
        )
      }
      className="h-5 w-5"
    />

  </label>

)}

  </div>

{/* TOTAL */}

<div
  className="
    mt-8
    rounded-3xl
    bg-[#2f241d]
    p-6
    text-white
  "
>

{extraPeople > 0 && (

  <div
    className="
      mb-4
      rounded-2xl
      border
      border-[#d6b98c]
      bg-[#f8f2e8]
      p-4
      text-sm
      text-[#6b5b4f]
    "
  >
    <p className="text-sm font-semibold">
  🛏️ {
    extraPeople > 1
      ? "Personnes supplémentaires"
      : "Personne supplémentaire"
  }
</p>

    <p className="mt-1">
  {extraPeople} {
    extraPeople > 1
      ? "personnes supplémentaires"
      : "personne supplémentaire"
  } ×
  {settings?.extra_bed || 15}€
  × {nights} {
    nights > 1
      ? "nuits"
      : "nuit"
  }
</p>

    <p className="mt-2 font-bold">
      Supplément :
      {extraBedTotal.toFixed(2)}€
    </p>
  </div>

)}

  <div
    className="
      mb-4
      flex
      items-center
      justify-between
    "
  >

    <span>Total</span>

    <span
      className="
        text-3xl
        font-bold
      "
    >
      {total.toFixed(2)}€
    </span>

  </div>

  {occupancy > maxPeople && (

  <p className="mb-4 text-red-600 font-medium">
    Cette chambre peut accueillir au maximum {maxPeople} personnes.
  </p>

)}

  <button
  disabled={occupancy > maxPeople}
  onClick={() => {

    if (
      !range?.from ||
      !range?.to
    ) {

      alert(
        "Veuillez sélectionner vos dates"
      )

      return
    }

    console.log(
  "LIT PARAPLUIE =",
  litParapluie
)

    router.push(

      `/checkout?arrival=${format(
        range.from,
        "yyyy-MM-dd"
      )}&departure=${format(
        range.to,
        "yyyy-MM-dd"
      )}&roomName=${roomName}&roomSlug=${roomSlug}&roomIds=${JSON.stringify(
        [roomId]
      )}&adults=${adults}&children=${children}&babies=${babies}&pets=${pets}&lunch=${lunch}&dinner=${dinner}&litParapluie=${litParapluie}&total=${total}`

    )
  }}

  className={`
  w-full
  rounded-2xl
  px-6
  py-4
  text-lg
  font-bold
  text-white
  transition

  ${
    occupancy > maxPeople
      ? `
        cursor-not-allowed
        bg-gray-400
      `
      : `
        bg-[#c89b5f]
        hover:opacity-90
      `
  }
`}
>
  Réserver
</button>

</div>

        </div>

      </div>

    </div>
  )
}