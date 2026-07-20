"use client"

import { useEffect, useState } from "react"
import { DayPicker } from "react-day-picker"
import type { DateRange } from "react-day-picker"
import { differenceInDays, format } from "date-fns"
import { fr } from "date-fns/locale"
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  RESTAURANT_CONFIG,
} from "@/data/restaurant"

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

  const [petCount, setPetCount] = useState(0)

    const [
    restaurantConfig,
    setRestaurantConfig,
  ] = useState(RESTAURANT_CONFIG)

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

const [breakfast, setBreakfast] =
  useState(false)

  const [lunch, setLunch] =
    useState(false)

  const [dinner, setDinner] =
    useState(false)


  const [blockedDates, setBlockedDates] =
    useState<Date[]>([])

  const [settings, setSettings] =
    useState<any>(null)

  const [showEventPopup,
  setShowEventPopup] =
  useState(false);

const [eventsWarning,
  setEventsWarning] =
  useState<any[]>([]);

const [accepted,
  setAccepted] =
  useState(false);

const [
  showSundayInfo,
  setShowSundayInfo,
] = useState(false)

const [
  showSundayModal,
  setShowSundayModal,
] = useState(false)

const [
  sundayDates,
  setSundayDates,
] = useState<Date[]>([])

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

  useEffect(() => {

     console.log("RANGE =", range);

  if (!range?.from || !range?.to)
    return

  const checkEvents =
    async () => {

      console.log("CHECK EVENTS");

      try {

        if (
  !range?.from ||
  !range?.to
) {
  return
}

const response =
          await fetch(
            "/api/events/warnings",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                arrival: format(
                  range.from,
                  "yyyy-MM-dd"
                ),

                departure: format(
                  range.to,
                  "yyyy-MM-dd"
                ),
              }),
            }
          )

        const data =
          await response.json();

          console.log(
      "EVENTS FOUND =",
      data
    );

        if (
          Array.isArray(data) &&
          data.length > 0
        ) {
          console.log(
        "SHOW POPUP"
          );

          setEventsWarning(data)

          setAccepted(false)

          setShowEventPopup(
            true
          )
        }

      } catch (error) {

        console.error(
          error
        )
      }
    }

  if (
  range?.from &&
  range?.to
) {

  const sundays: Date[] = []

  const current =
    new Date(range.from)

  while (
    current < range.to
  ) {

    if (
      current.getDay() === 0
    ) {

      sundays.push(
        new Date(current)
      )
    }

    current.setDate(
      current.getDate() + 1
    )
  }

  if (
    sundays.length > 0
  ) {

    setSundayDates(
      sundays
    )

    setShowSundayInfo(
      true
    )
  }
}

  checkEvents()

}, [range])

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
   SERVICES
========================= */

let breakfastDays = 0;
let lunchDays = 0;
let dinnerDays = 0;

if (
  range?.from &&
  range?.to
) {

  // Petit déjeuner :
  // tous les matins du séjour
  // y compris le jour du départ
  breakfastDays =
  differenceInDays(
    range.to,
    range.from
  );

  const current =
    new Date(range.from);

  while (
    current < range.to
  ) {

    const day =
      current.getDay();

    // Repas du soir :
    // jour d'arrivée inclus
    // dimanche exclu
    if (day !== 0) {
      dinnerDays++;
    }

    // Repas du midi :
    // pas le jour d'arrivée
    // pas le dimanche
    if (
      current.getTime() !==
        range.from.getTime() &&
      day !== 0
    ) {
      lunchDays++;
    }

    current.setDate(
      current.getDate() + 1
    );
  }
}

  
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
  petCount *
  (settings?.pet || 5) *
  nights

  const litParapluieTotal =
  litParapluie
    ? (settings?.lit_parapluie ?? 5) *
      babies *
      nights
    : 0

  const lunchChildPrice =
  restaurantConfig.menuEnfant.price

  const lunchTotal =
  lunch
    ? (
        adults * (settings?.lunch ?? 15) +
        children * lunchChildPrice
      ) * lunchDays
    : 0

  const breakfastTotal =
  breakfast
    ? (
        adults * (settings?.breakfast ?? 12)
        +
        children * 6
      ) * breakfastDays
    : 0

  const dinnerChildPrice = 10

const dinnerTotal =
  dinner
    ? (
        adults * (settings?.dinner ?? 20) +
        children * dinnerChildPrice
      ) * dinnerDays
    : 0

  /* =========================
     TOTAL
  ========================= */

  const total =
  roomTotal +
  extraBedTotal +
  petTotal +
  breakfastTotal +
  lunchTotal +
  dinnerTotal +
  litParapluieTotal

console.log(
  "POPUP =",
  showEventPopup
);

  return (

    <>

  {showSundayInfo && (

  <div
    className="
      fixed
      inset-0
      z-[9999]
      flex
      items-center
      justify-center
      bg-black/70
      p-4
    "
  >

    <div
      className="
        max-w-xl
        rounded-[32px]
        bg-white
        p-8
        shadow-2xl
      "
    >

      <div
        className="
          mb-4
          text-5xl
        "
      >
        🍽️
      </div>

      <h2
        className="
          mb-5
          font-serif
          text-3xl
          font-bold
        "
      >
        Information restauration
      </h2>

      <p
        className="
          mb-6
          leading-7
          text-[#6b5b4d]
        "
      >
        Votre séjour comprend
        un ou plusieurs dimanches.

        <br /><br />

        L'Auberge de Saint-Aubin
        ne propose pas de service
        de restauration le dimanche
        midi et le dimanche soir.

        <br /><br />

        Nous vous invitons à prévoir
        vos repas à l'extérieur.

        <br /><br />

        Les petits-déjeuners restent
        servis normalement.
      </p>

      <div
        className="
          mb-8
          rounded-2xl
          bg-[#faf7f2]
          p-4
        "
      >

        {sundayDates.map(
          (date) => (

            <div key={date.toISOString()}>
              • {
                date.toLocaleDateString(
                  "fr-FR",
                  {
                    weekday:
                      "long",
                    day:
                      "numeric",
                    month:
                      "long",
                  }
                )
              }
            </div>

          )
        )}

      </div>

      <button
        onClick={() =>
          setShowSundayInfo(
            false
          )
        }
        className="
          w-full
          rounded-2xl
          bg-[#c9a063]
          py-4
          font-semibold
          text-white
        "
      >
        J'ai compris
      </button>

    </div>

  </div>

)}

  {showSundayModal && (

  <div
    className="
      fixed
      inset-0
      z-[9999]
      flex
      items-center
      justify-center
      bg-black/70
      p-4
    "
  >

    <div
      className="
        max-w-md
        rounded-[32px]
        bg-white
        p-8
        shadow-2xl
      "
    >

      <div
        className="
          mb-5
          text-5xl
        "
      >
        📅
      </div>

      <h2
        className="
          mb-4
          font-serif
          text-3xl
          font-bold
          text-[#2f241d]
        "
      >
        Arrivée indisponible
      </h2>

      <p
        className="
          mb-8
          leading-7
          text-[#6b5b4d]
        "
      >
        Les arrivées le dimanche ne sont
        pas possibles à l'Auberge de
        Saint-Aubin.

        <br />
        <br />

        Merci de sélectionner une autre
        date d'arrivée.
      </p>

      <button
        onClick={() =>
          setShowSundayModal(false)
        }
        className="
          w-full
          rounded-2xl
          bg-[#c9a063]
          py-4
          font-semibold
          text-white
          transition
          hover:bg-[#b88d4f]
        "
      >
        Compris
      </button>

    </div>

  </div>

)}

  {showEventPopup && (

<div
  className="
    fixed
    inset-0
    z-[999]
    flex
    items-center
    justify-center
    bg-black/70
    p-4
  "
>

<div
  className="
    max-w-xl
    rounded-3xl
    bg-white
    p-8
    shadow-2xl
  "
>

<h2
  className="
    mb-4
    text-3xl
    font-bold
  "
>
  ⚠️ Information
</h2>

<p className="mb-6">

  Des événements sont prévus
  durant votre séjour.

  Ceux-ci peuvent provoquer
  du bruit ou une fréquentation
  plus importante.

</p>

<div className="space-y-4">

  {eventsWarning.map((event) => (

    <div
      key={event.id}
      className="
        flex
        overflow-hidden
        rounded-2xl
        border
        bg-white
      "
    >

      {/* TEXTE */}

      <div className="flex-1 p-5">

        <div className="mb-2 font-bold text-xl">
          {event.title}
        </div>

        <div className="mb-3 text-sm text-gray-500">
          {new Date(
            event.date
          ).toLocaleDateString(
            "fr-FR"
          )}
        </div>

        {event.description && (
          <p className="text-[#6b5b4f]">
            {event.description}
          </p>
        )}

      </div>

      {/* IMAGE */}

      {event.image && (
        <div
          className="
            relative
            hidden
            w-38
            md:block
          "
        >
          <img
            src={event.image}
            alt={event.title}
            className="
              h-full
              w-full
              object-cover
            "
          />
        </div>
      )}

    </div>

  ))}

</div>

<label
  className="
    mt-6
    flex
    items-center
    gap-3
  "
>

  <input
    type="checkbox"
    checked={accepted}
    onChange={(e) =>
      setAccepted(
        e.target.checked
      )
    }
  />

  J'ai pris connaissance
  des informations.

</label>

<div
  className="
    mt-8
    flex
    justify-end
    gap-4
  "
>

<button
  onClick={() => {

    setRange(
      undefined
    )

    setShowEventPopup(
      false
    )

  }}
  className="
    rounded-xl
    border
    px-5
    py-3
  "
>
  Changer mes dates
</button>

<button
  disabled={!accepted}
  onClick={() =>
    setShowEventPopup(
      false
    )
  }
  className="
    rounded-xl
    bg-[#c89b5f]
    px-5
    py-3
    text-white
    disabled:opacity-50
  "
>
  Continuer
</button>

</div>

</div>
</div>

)}

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

          onSelect={(selected) => {

  // interdit une arrivée le dimanche
  if (
  selected?.from &&
  selected.from.getDay() === 0
) {

  setShowSundayModal(true)

  return
}

  setRange(selected);
}}

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
      Adultes (13 ans +)
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
      Enfants (3 - 12 )
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
      Bébés (- 3 ans)
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
  - Les bébés de moins de 3 ans sont accueillis gratuitement.
</p>

          {/* OPTIONS */}

<div className="grid gap-3">

  {/* Matin */}

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
        🥐 Petit Déjeuner
      </p>

      <p className="text-xs text-[#7a6a5d]">
  Adulte :
  {settings?.breakfast || 12}€
  • Enfant :
  6€
  • Bébé :
  gratuit
</p>

{breakfast && breakfastDays > 0 && (
  <p className="mt-1 text-xs italic text-[#7a6a5d]">
    {occupancy}
    {occupancy > 1 ? " personnes" : " personne"}
    × {breakfastDays}
    {breakfastDays > 1
      ? " petits-déjeuners"
      : " petit-déjeuner"}
  </p>
)}

    </div>

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
        Adulte : {settings?.lunch || 15}€
        • Enfant : {restaurantConfig.menuEnfant.price}€
        • Bébé : gratuit
      </p>

      {lunch && lunchDays > 0 && (
  <p className="mt-1 text-xs italic text-[#7a6a5d]">
    {occupancy}
    {occupancy > 1 ? " personnes" : " personne"}
    × {lunchDays}
    {lunchDays > 1
      ? " repas"
      : " repas"}
  </p>
)}

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
        Adulte : {settings?.dinner || 20}€
        • Enfant : 10€
        • Bébé : gratuit
      </p>

      {dinner && dinnerDays > 0 && (
  <p className="mt-1 text-xs italic text-[#7a6a5d]">
    {occupancy}
    {occupancy > 1 ? " personnes" : " personne"}
    × {dinnerDays}
    {dinnerDays > 1
      ? " repas"
      : " repas"}
  </p>
)}
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

  <p
  className="
    px-2
    text-xs
    italic
    text-[#7a6a5d]
  "
>
  * Les repas du midi et du soir
  ne sont pas servis le dimanche.
</p>

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
      +{settings?.pet || 5}€ / animal / nuit
    </p>

  </div>

  <div className="flex items-center gap-3">

    <input
      type="checkbox"
      checked={petCount > 0}
      onChange={(e) => {
        if (e.target.checked) {
          setPetCount(1)
        } else {
          setPetCount(0)
        }
      }}
      className="h-5 w-5"
    />

    {petCount > 0 && (
      <input
        type="number"
        min={1}
        max={10}
        value={petCount}
        onChange={(e) =>
          setPetCount(Number(e.target.value))
        }
        className="w-16 rounded border px-2 py-1 text-center"
      />
    )}

  </div>

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
  eventsWarning.length > 0 &&
  !accepted
) {

  setShowEventPopup(
    true
  )

  return
}

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
      )}&adults=${adults}&children=${children}&babies=${babies}&petCount=${petCount}&breakfast=${breakfast}&lunch=${lunch}&dinner=${dinner}&litParapluie=${litParapluie}&roomPrice=${roomPrice}
&roomTotal=${roomTotal}&total=${total}`

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
    </>
  )
}