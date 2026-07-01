"use client"

import { useEffect, useState } from "react"

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

  arrival: string
  departure: string

  adults: number
  children: number
  babies: number

  pets: boolean
  breakfast: boolean
  lunch: boolean
  dinner: boolean

  litParapluie: boolean

  message: string

  total: number

  status: string

  depositRequired: boolean

  depositAmount: number

  depositPaid: boolean

  depositPaidAt?: string

  reservation_rooms?: ReservationRoom[]
}

export default function ReservationsPage() {

  const [
  showConfirmModal,
  setShowConfirmModal,
] = useState(false)

const [
  reservationToConfirm,
  setReservationToConfirm,
] = useState<Reservation | null>(
  null
)

  const [reservations, setReservations] =
    useState<Reservation[]>([])

  const [showModal, setShowModal] =
    useState(false)

  const [search, setSearch] =
  useState("")

const [statusFilter, setStatusFilter] =
  useState("all")

  const [
  manualReservation,
  setManualReservation,
] = useState({

  first_name: "",
  last_name: "",

  email: "",
  phone: "",

  arrival: "",
  departure: "",

  adults: 1,
  children: 0,
  babies: 0,

  rooms: [] as string[],

  lunch: false,
  dinner: false,
  breakfast: false,
  pets: false,

  litParapluie: false,

  message: "",
})

  const [hotelSettings, setHotelSettings] =
  useState({

    lunch: 0,
    dinner: 0,
    breakfast: 0,
    pet: 0,
    tourist_tax: 0,
    extra_bed: 0,
    lit_parapluie: 0,
  })

  const [roomsData, setRoomsData] =
    useState<any[]>([])

  useEffect(() => {

  const loadData =
    async () => {

      try {

        const reservationsRes =
          await fetch(
            "/api/reservations"
          )

        const reservationsData =
          await reservationsRes.json()

        setReservations(
          reservationsData
        )

        const settingsRes =
          await fetch(
            "/api/hotel-settings"
          )

        const settingsData =
  await settingsRes.json()

console.log(settingsData)


        const roomsRes =
          await fetch("/api/rooms")

        const roomsData =
          await roomsRes.json()

          console.log(roomsData)

        setRoomsData(roomsData)
        setHotelSettings(settingsData)

        console.log("ROOMS API", roomsData)

      } catch (error) {

        console.error(error)
      }
    }

  loadData()

}, [])

  /* ---------------- STATUS ---------------- */

  const updateReservationStatus =
async (
  reservation: Reservation,
  status: string,
  askDeposit = false
) => {

    try {

      console.log("RESERVATION EMAIL", reservation)

      await fetch(
        `/api/reservations/${reservation.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
  ...reservation,
  status,

  depositRequired:
  askDeposit,

depositAmount:
  askDeposit
    ? reservation.total *
      (hotelSettings.deposit_percent / 100)
    : 0,

depositPaid: false,
}),
        }
      )

      await fetch(
  "/api/send-status-email",
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({
      ...reservation,

      status,

      depositRequired:
        askDeposit,

      depositAmount:
        askDeposit
          ? (
              reservation.total *
              0.20
            )
          : 0,
    }),
  }
)

      if (status === "rejected") {

        await fetch(
          `/api/blocked-dates/${reservation.id}`,
          {
            method: "DELETE",
          }
        )
      }

      setReservations((prev) =>
  prev.map((r) =>
    r.id === reservation.id
      ? {
          ...r,
          status,

          depositRequired:
            askDeposit,

          depositAmount:
            askDeposit
              ? reservation.total *
                (hotelSettings.deposit_percent / 100)
              : 0,

          depositPaid: false,
        }
      : r
  )
)

    } catch (error) {

      console.error(error)
    }
  }

  const markDepositPaid =
async (
  reservationId: number
) => {

  try {

    await fetch(

      `/api/reservations/${reservationId}`,

      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          depositPaid: true,

          depositPaidAt:
            new Date(),
        }),
      }
    )

    setReservations(
      reservations.map(
        (reservation) =>

          
          reservation.id ===
          reservationId

            ? {

                ...reservation,

                depositPaid:
                  true,

                depositPaidAt:
                  new Date()
                    .toISOString(),
              }

            : reservation
      )
    )

  } catch (error) {

    console.error(error)
  }
}

  /* ---------------- DELETE ---------------- */

  const deleteReservation =
  async (id: number) => {

    const confirmDelete =
      confirm(
        "Supprimer cette réservation ?"
      )

    if (!confirmDelete) return

    try {

      await fetch(
        `/api/reservations/${id}`,
        {
          method: "DELETE",
        }
      )

      setReservations((prev) =>
        prev.filter(
          (r) => r.id !== id
        )
      )

    } catch (error) {

      console.error(error)
    }
  }

  /* ---------------- CALCUL PRIX CHAMBRE ---------------- */

  const getRoomPrice = (
  roomName: string,
  people: number
) => {

  if (!roomsData.length) {
    return 0
  }

  const roomData =
    roomsData.find((r) =>

      r.name
        ?.replace(/\s+/g, " ")
        .trim()
        .toLowerCase()

      ===

      roomName
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()
    )

    console.log({
  roomName,
  roomsData,
  found: roomData,
})

  if (!roomData) {

    console.log(
      "ROOM NOT FOUND",
      roomName,
      roomsData
    )

    return 0
  }

  const onePersonPrice =
    Number(
      roomData.priceOnePerson
    ) || 0

  const twoPeoplePrice =
    Number(
      roomData.priceTwoPeople
    ) || 0

  return people <= 1
    ? onePersonPrice
    : twoPeoplePrice
}

  /* ---------------- AJOUT MANUEL ---------------- */

  const handleAddReservation =
    async () => {

for (
  const room of
  manualReservation.rooms
) {

  
    const roomData =
  roomsData.find((r) => {

    const dbName =
      String(r.name)
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()

    const selectedName =
      String(room)
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()

    return dbName.includes(selectedName)
  })

  if (!roomData) {

    alert(
      `Impossible de trouver le slug de la chambre ${room}`
    )

    return
  }

  const response =
  await fetch(
    `/api/blocked-dates?room_slug=${roomData.slug}`
  )

const existingReservations =
  await response.json()  

  const newArrival =
    new Date(
      manualReservation.arrival
    )

  const newDeparture =
    new Date(
      manualReservation.departure
    )

  const isOverlapping =
    existingReservations?.some(
      (reservation) => {

        const existingArrival =
          new Date(
            reservation.from_date
          )

        const existingDeparture =
          new Date(
            reservation.to_date
          )

        return (
          newArrival <
            existingDeparture &&
          newDeparture >
            existingArrival
        )
      }
    )

  if (isOverlapping) {

    alert(
      `La chambre "${room}" est déjà réservée sur cette période`
    )

    return
  }
}

      try {

        const roomCapacities:
  Record<string, number> = {

  "Chambre Double Standard": 3,

  "Chambre Confort": 4,

  "Chambre Familiale": 4,
}

/* VERIFICATION CHAMBRE */

for (
  const room of
  manualReservation.rooms
) {

  const maxCapacity =
    roomCapacities[room] || 0

  if (
    occupancy >
    maxCapacity
  ) {

    alert(

      `${room}

Capacité maximum :
${maxCapacity} personnes`

    )

    return
  }
}

/* TOTAL CAPACITE */

const totalCapacity =
  manualReservation.rooms.reduce(
    (total, room) => {

      return (
        total +
        (roomCapacities[room] || 0)
      )
    },
    0
  )

/* VERIFICATION GLOBALE */

if (
  occupancy >
  totalCapacity
) {

  alert(
`Capacité maximum dépassée.

Maximum autorisé :
${totalCapacity} personnes`
  )

  return
}
        if (
          manualReservation.rooms.length === 0
        ) {

          alert(
            "Sélectionnez au moins une chambre"
          )

          return
        }

        const start =
          new Date(
            manualReservation.arrival
          )

        const end =
          new Date(
            manualReservation.departure
          )

        const nights =
          Math.ceil(
            (
              end.getTime() -
              start.getTime()
            ) /
            (
              1000 *
              60 *
              60 *
              24
            )
          )

        let total = 0

        const roomDetails = []

        for (
          const room of
          manualReservation.rooms
        ) {

          const roomPrice =
            getRoomPrice(
              room,
              occupancy
            )

          const roomTotal =
            roomPrice * nights

          total += roomTotal

          roomDetails.push({

            room_name: room,

            people:
              occupancy,

            room_total:
              roomTotal,
          })
        }

        if (
  manualReservation.litParapluie
) {

  total +=
    Number(
      hotelSettings.lit_parapluie || 5
    ) *
    manualReservation.babies *
    nights
}

if (
  manualReservation.lunch
) {

  total +=
    occupancy *
    (hotelSettings.lunch || 0) *
    nights
}

if (
  manualReservation.breakfast
) {

  total +=
    (
      manualReservation.adults *
        Number(
          hotelSettings.breakfast || 12
        )
      +
      manualReservation.children *
        6
    ) *
    nights
}

if (
  manualReservation.dinner
) {

  total +=
    occupancy *
    (hotelSettings.dinner || 0) *
    nights
}

if (
  manualReservation.pets
) {

  total +=
    (hotelSettings.pet || 0) *
    nights
}

/* TAXE DE SÉJOUR */

total +=
  (hotelSettings.tourist_tax || 0) *
  manualReservation.adults *
  nights

console.log(
  JSON.stringify({
    ...manualReservation,
    total,
    roomSlug: "confort",
    roomName: "Chambre Confort",
  }, null, 2)
)
        const response =
  await fetch(
    "/api/reservations",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({

  ...manualReservation,

  roomSlug: "confort",

  roomName: "Chambre Confort",

  total,

  roomIds:
    manualReservation.rooms
      .map((roomName) => {
        const room =
          roomsData.find(
            (r) => r.name === roomName
          )

        return room?.id
      })
      .filter(Boolean),
}),
    }
  )

if (!response.ok) {
  const error = await response.json()

  console.log(error)

  alert(
    JSON.stringify(error, null, 2)
  )

  return
}

const reservationData =
  await response.json()
        

        await fetch(
  "/api/send-status-email",
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({

      status: "confirmed",

      email:
        manualReservation.email,

      first_name:
        manualReservation.first_name,

      last_name:
        manualReservation.last_name,

      roomName:
        manualReservation.rooms.join(", "),

      arrival:
        manualReservation.arrival,

      departure:
        manualReservation.departure,

      total,

      adults:
  manualReservation.adults,

children:
  manualReservation.children,

babies:
  manualReservation.babies,

litParapluie:
  manualReservation.litParapluie,

      breakfast:
        manualReservation.breakfast,
      lunch:
        manualReservation.lunch,

      dinner:
        manualReservation.dinner,

      pets:
        manualReservation.pets,
    }),
  }
)

        alert(
          "Réservation ajoutée"
        )

        window.location.reload()

      } catch (error) {

        console.error(error)

        alert(
          "Erreur réservation"
        )
      }
    }

  /* ---------------- CALCUL TOTAL ---------------- */
  const occupancy =
  manualReservation.adults +
  manualReservation.children

  const startDate =
    manualReservation.arrival
      ? new Date(
          manualReservation.arrival
        )
      : null

  const endDate =
    manualReservation.departure
      ? new Date(
          manualReservation.departure
        )
      : null

  const nights =
    startDate && endDate
      ? Math.ceil(
          (
            endDate.getTime() -
            startDate.getTime()
          ) /
          (
            1000 *
            60 *
            60 *
            24
          )
        )
      : 0

  let roomsTotal = 0

  manualReservation.rooms.forEach(
    (room) => {

      const roomPrice =
        getRoomPrice(
          room,
          occupancy
        )

      roomsTotal +=
        roomPrice * nights
    }
  )

  console.log({
  nights,
  people:
    occupancy,
  breakfast:
    hotelSettings.breakfast,
  lunch:
    hotelSettings.lunch,
  dinner:
    hotelSettings.dinner,
  pet:
    hotelSettings.pet,
})

const breakfastTotal =
  manualReservation.breakfast
    ? (
        manualReservation.adults *
          Number(
            hotelSettings.breakfast || 12
          )
        +
        manualReservation.children * 6
      ) * nights
    : 0

const lunchTotal =
  manualReservation.lunch
    ? occupancy *
      Number(
        hotelSettings.lunch || 0
      ) *
      nights
    : 0

const dinnerTotal =
  manualReservation.dinner
    ? occupancy *
      Number(
        hotelSettings.dinner || 0
      ) *
      nights
    : 0

const petsTotal =
  manualReservation.pets
    ? Number(
        hotelSettings.pet || 0
      ) *
      nights
    : 0

const extraPeople =
  Math.max(
    occupancy - 2,
    0
  )

const extraBedTotal =
  extraPeople *
  Number(
    hotelSettings.extra_bed || 0
  ) *
  nights

const touristTax =
  Number(
    hotelSettings.tourist_tax || 0
  ) *
  manualReservation.adults *
  nights

const litParapluieTotal =
  manualReservation.litParapluie
    ? Number(
        hotelSettings.lit_parapluie || 5
      ) *
      manualReservation.babies *
      nights
    : 0

const totalPrice =
    roomsTotal +
    extraBedTotal +
    breakfastTotal +
    lunchTotal +
    dinnerTotal +
    petsTotal +
    touristTax +
    litParapluieTotal

  const getStatusStyle = (
  status: string
) => {

  switch (status) {

    case "confirmed":

      return {
        label: "Confirmée",

        className:
          `
            bg-green-100
            text-green-700
            border-green-300
          `,
      }

    case "checked_in":

      return {
        label: "Check-in",

        className:
          `
            bg-blue-100
            text-blue-700
            border-blue-300
          `,
      }

    case "checked_out":

      return {
        label: "Check-out",

        className:
          `
            bg-gray-100
            text-gray-700
            border-gray-300
          `,
      }

    case "rejected":

      return {
        label: "Refusée",

        className:
          `
            bg-red-100
            text-red-700
            border-red-300
          `,
      }

    default:

      return {
        label: "En attente",

        className:
          `
            bg-yellow-100
            text-yellow-700
            border-yellow-300
          `,
      }
  }
}

const filteredReservations =
  reservations.filter(
    (reservation) => {

      const matchesSearch =

        `${reservation.first_name}
        ${reservation.last_name}
        ${reservation.email}
        ${reservation.phone}`

          .toLowerCase()

          .includes(
            search.toLowerCase()
          )

      const matchesStatus =

        statusFilter === "all"

          ? true

          : reservation.status ===
            statusFilter

      return (
        matchesSearch &&
        matchesStatus
      )
    }
  )

  return (

    <main className="
      min-h-screen
      bg-[#f5f1ea]
      p-10
      text-[#2f241d]
    ">

      <div className="mt-10">

        <div className="mb-10">

          <h1 className="
            font-serif
            text-5xl
            font-bold
          ">
            Réservations
          </h1>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="
            rounded-2xl
            bg-[#c89b5f]
            px-6
            py-4
            font-bold
            text-white
          "
        >
          Ajouter une réservation
        </button>

        <div
  className="
    mt-8
    flex
    flex-col
    gap-4

    lg:flex-row
    lg:items-center
    lg:justify-between
  "
>

  {/* RECHERCHE */}

  <input
    type="text"

    placeholder="
      Rechercher un client...
    "

    value={search}

    onChange={(e) =>
      setSearch(e.target.value)
    }

    className="
      w-full
      rounded-2xl
      border
      border-[#e7ded2]
      bg-white
      px-5
      py-4

      lg:max-w-md
    "
  />

  {/* FILTRES */}

  <div
    className="
      flex
      flex-wrap
      gap-3
    "
  >

    {[
      {
        label: "Toutes",
        value: "all",
      },

      {
        label: "Confirmées",
        value: "confirmed",
      },

      {
        label: "En attente",
        value: "pending",
      },

      {
        label: "Refusées",
        value: "rejected",
      },
    ].map((filter) => (

      <button
        key={filter.value}

        onClick={() =>
          setStatusFilter(
            filter.value
          )
        }

        className={`
          rounded-2xl
          px-5
          py-3
          font-semibold
          transition

          ${
            statusFilter ===
            filter.value

              ? `
                bg-[#2f241d]
                text-white
              `

              : `
                border
                bg-white
                hover:bg-[#faf7f2]
              `
          }
        `}
      >

        {filter.label}

      </button>

    ))}

  </div>

</div>

{/* STATS */}

<div
  className="
    mt-8
    grid
    gap-6

    md:grid-cols-2
    xl:grid-cols-4
  "
>

  {/* TOTAL RESERVATIONS */}

  <div
  className="
    rounded-[32px]
    bg-white
    p-8
    shadow-xl
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-2xl
  "
>

    <p
      className="
        text-sm
        font-semibold
        uppercase
        tracking-wide
        text-[#6b5b4f]
      "
    >
      Réservations
    </p>

    <h2 className="
  mt-4
  text-6xl
  font-black
  tracking-tight
">
      {reservations.length}
    </h2>

  </div>

  {/* CONFIRMEES */}

  <div
  className="
    rounded-[32px]
    bg-white
    p-8
    shadow-xl
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-2xl
  "
>

    <p
      className="
        text-sm
        font-semibold
        uppercase
        tracking-wide
        opacity-80
      "
    >
      Confirmées
    </p>

    <h2
      className="
        mt-4
        text-5xl
        font-bold
      "
    >
      {
        reservations.filter(
          (r) =>
            r.status ===
            "confirmed"
        ).length
      }
    </h2>

  </div>

  {/* EN ATTENTE */}

  <div
  className="
    rounded-[32px]
    bg-white
    p-8
    shadow-xl
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-2xl
  "
>

    <p
      className="
        text-sm
        font-semibold
        uppercase
        tracking-wide
        opacity-80
      "
    >
      En attente
    </p>

    <h2
      className="
        mt-4
        text-5xl
        font-bold
      "
    >
      {
        reservations.filter(
          (r) =>
            r.status ===
            "pending"
        ).length
      }
    </h2>

  </div>

  {/* CHIFFRE AFFAIRES */}

  <div
  className="
    rounded-[32px]
    bg-white
    p-8
    shadow-xl
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-2xl
  "
>

    <p
      className="
        text-sm
        font-semibold
        uppercase
        tracking-wide
        opacity-80
      "
    >
      Chiffre d’affaires
    </p>

    <h2
      className="
        mt-4
        text-5xl
        font-bold
      "
    >
            {
        reservations
          .filter(
            (r) =>
              r.status ===
              "confirmed"
          )
          .reduce(
            (
              total,
              reservation
            ) =>
              total +
              reservation.total,

            0
          )
          .toFixed(2)
      }€
    </h2>

  </div>

</div>

        <section
          className="
            mt-8
            rounded-[36px]
            border
            border-[#e7ded2]
            bg-white/80
            p-10
          "
        >

          <div className="space-y-6">

            {filteredReservations.map(
  (reservation) => (

    <div
      key={reservation.id}
      className="
        overflow-hidden
        rounded-[36px]
        border
        border-[#e7ded2]
        bg-white
        shadow-xl
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-6
          border-b
          border-[#efe7dc]
          bg-[#faf7f2]
          p-8

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <div>

          <h2
            className="
              font-serif
              text-4xl
              font-bold
              text-[#2f241d]
            "
          >
            {reservation.first_name}
            {" "}
            {reservation.last_name}
          </h2>

          <p
            className="
              mt-2
              text-[#6b5b4f]
            "
          >
            Séjour du{" "}

            {new Date(
              reservation.arrival
            ).toLocaleDateString("fr-FR")}

            {" "}au{" "}

            {new Date(
              reservation.departure
            ).toLocaleDateString("fr-FR")}
          </p>

        </div>

        <div className="flex flex-col items-end gap-3">

  <span
    className={`
      rounded-full
      border
      px-5
      py-3
      text-sm
      font-bold
      ${
        getStatusStyle(
          reservation.status
        ).className
      }
    `}
  >
    {
      getStatusStyle(
        reservation.status
      ).label
    }
  </span>

  {reservation.depositRequired && (

    <div
      className={`
        rounded-xl
        px-4
        py-3
        text-sm
        font-bold

        ${
          reservation.depositPaid

            ? `
              bg-green-100
              text-green-700
            `

            : `
              bg-orange-100
              text-orange-700
            `
        }
      `}
    >

      {reservation.depositPaid
        ? `✅ Acompte reçu (${reservation.depositAmount.toFixed(2)}€)`
        : `💰 Acompte demandé (${reservation.depositAmount.toFixed(2)}€)`
      }

      {reservation.depositPaidAt && (
        <div className="mt-1 text-xs opacity-70">
          reçu le{" "}
          {new Date(
            reservation.depositPaidAt
          ).toLocaleDateString("fr-FR")}
        </div>
      )}

    </div>

  )}

</div>

      </div>

      {/* BODY */}

      <div
        className="
          grid
          gap-8
          p-8

          lg:grid-cols-3
        "
      >

        {/* CLIENT */}

        <div
          className="
            rounded-3xl
            bg-[#faf7f2]
            p-6
          "
        >

          <h3
            className="
              mb-4
              text-lg
              font-bold
            "
          >
            Client
          </h3>

          <div className="space-y-3">

          <a href={`mailto:${reservation.email}`}>
  {reservation.email}
</a>

            <br/><a href={`tel:${reservation.phone}`}>
  {reservation.phone}
</a>

            <div className="space-y-2">

  <p>
    👨 Adultes :
    {" "}
    {reservation.adults}
  </p>

  <p>
    🧒 Enfants :
    {" "}
    {reservation.children}
  </p>

  {reservation.babies > 0 && (

    <p>
      👶 Bébés :
      {" "}
      {reservation.babies}
    </p>

  )}

</div>

          </div>

        </div>

        {/* CHAMBRES */}

        <div
          className="
            rounded-3xl
            bg-[#faf7f2]
            p-6
          "
        >

          <h3
            className="
              mb-4
              text-lg
              font-bold
            "
          >
            Chambres
          </h3>

          <div className="space-y-3">

            {reservation.reservation_rooms?.map(
              (room) => (

                <div
                  key={room.id}
                  className="
                    rounded-2xl
                    bg-white
                    px-4
                    py-3
                    text-sm
                    font-semibold
                  "
                >

                  {room.room_name}
                  {" "}
                  
                </div>

              )
            )}

          </div>

        </div>

        {/* OPTIONS */}

        <div
          className="
            rounded-3xl
            bg-[#faf7f2]
            p-6
          "
        >

          <h3
            className="
              mb-4
              text-lg
              font-bold
            "
          >
            Options
          </h3>

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >

            <div
              className="
                rounded-full
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
              "
            >
               Petit Déjeuner :
              {" "}
              {reservation.breakfast
                ? "Oui"
                : "Non"}
            </div>

            <div
              className="
                rounded-full
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
              "
            >
              🍽 Midi :
              {" "}
              {reservation.lunch
                ? "Oui"
                : "Non"}
            </div>

            <div
              className="
                rounded-full
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
              "
            >
              🌙 Soir :
              {" "}
              {reservation.dinner
                ? "Oui"
                : "Non"}
            </div>

            <div
              className="
                rounded-full
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
              "
            >
              🐶 Animal :
              {" "}
              {reservation.pets
                ? "Oui"
                : "Non"}
            </div>

            {reservation.litParapluie && (

  <div
    className="
      rounded-full
      bg-white
      px-4
      py-2
      text-sm
      font-semibold
    "
  >
    🛏️ Lit parapluie demandé
  </div>

)}

          </div>

        </div>

        {/* MESSAGE */}

        {reservation.message && (

          <div
            className="
              rounded-3xl
              bg-[#faf7f2]
              p-6

              lg:col-span-3
            "
          >

            <h3
              className="
                mb-4
                text-lg
                font-bold
              "
            >
              Message
            </h3>

            <p
              className="
                rounded-2xl
                bg-white
                p-4
                text-sm
              "
            >
              {reservation.message}
            </p>

          </div>

        )}

        {/* TOTAL */}

        <div
          className="
            rounded-3xl
            bg-[#2f241d]
            p-6
            text-white

            lg:col-span-3
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <span className="text-xl">
              Total réservation
            </span>

            <span
  className="
    text-5xl
    font-black
    text-[#d6b98c]
  "
>
  {reservation.total.toFixed(2)}€
</span>

          </div>

        </div>

      </div>

      {/* ACTIONS */}

      <div
        className="
          flex
          flex-wrap
          gap-4

          border-t
          border-[#efe7dc]

          p-8
        "
      >

        <button
  className="
    rounded-xl
    bg-green-700
    px-6
    py-3
    font-bold
    text-white
    transition
    hover:bg-green-800
  "
  onClick={() => {

    setReservationToConfirm(
      reservation
    )

    setShowConfirmModal(
      true
    )
  }}
>
  Confirmer
</button>

{reservation.depositRequired &&
 !reservation.depositPaid && (

  <button
    onClick={() =>
      markDepositPaid(
        reservation.id
      )
    }
    className="
      rounded-xl
      bg-emerald-600
      px-5
      py-3
      font-bold
      text-white
      hover:bg-emerald-700
    "
  >
    Acompte reçu
  </button>

)}

        <button
  disabled={
    reservation.status ===
    "checked_in"
  }

  onClick={() =>
    updateReservationStatus(
      reservation,
      "checked_in"
    )
  }

  className={`
    rounded-xl
    px-5
    py-3
    font-bold
    text-white
    transition

    ${
      reservation.status ===
      "checked_in"

        ? `
          cursor-not-allowed
          bg-blue-300
        `

        : `
          bg-blue-600
          hover:bg-blue-700
        `
    }
  `}
>
  Check-in
</button>

<button
  disabled={
    reservation.status ===
    "checked_out"
  }

  onClick={() =>
    updateReservationStatus(
      reservation,
      "checked_out"
    )
  }

  className={`
    rounded-xl
    px-5
    py-3
    font-bold
    text-white
    transition

    ${
      reservation.status ===
      "checked_out"

        ? `
          cursor-not-allowed
          bg-gray-300
        `

        : `
          bg-gray-700
          hover:bg-gray-800
        `
    }
  `}
>
  Check-out
</button>

        <button
          disabled={
            reservation.status ===
            "rejected"
          }

          onClick={() =>
            updateReservationStatus(
              reservation,
              "rejected"
            )
          }

          className={`
            rounded-xl
            px-5
            py-3
            font-bold
            text-white
            transition

            ${
              reservation.status ===
              "rejected"

                ? "cursor-not-allowed bg-red-300"

                : "bg-red-600 hover:bg-red-700"
            }
          `}
        >
          Refuser
        </button>

        <button
          onClick={() =>
            deleteReservation(
              reservation.id
            )
          }
          className="
            rounded-xl
            bg-black
            px-5
            py-3
            font-bold
            text-white
          "
        >
          Supprimer
        </button>

        <button
          onClick={async () => {

            try {

              const response =
                await fetch(
                  "/api/generate-invoice",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body: JSON.stringify({

                      ...reservation,

                      rooms:
                        reservation.reservation_rooms || [],
                    }),
                  }
                )

              if (!response.ok) {

                throw new Error(
                  "Erreur génération PDF"
                )
              }

              const blob =
                await response.blob()

              const url =
                window.URL.createObjectURL(blob)

              const a =
                document.createElement("a")

              a.href = url

              a.download =
                `facture-${reservation.id}.pdf`

              document.body.appendChild(a)

              a.click()

              a.remove()

              window.URL.revokeObjectURL(url)

            } catch (error) {

              console.error(error)

              alert(
                "Erreur génération facture"
              )
            }
          }}

          className="
            rounded-xl
            bg-[#c89b5f]
            px-5
            py-3
            font-bold
            text-white
          "
        >
          Facture PDF
        </button>

      </div>

    </div>

  )
)}

          </div>

        </section>

      </div>

      {showModal && (

  <div className="
    fixed
    inset-0
    z-50
    overflow-y-auto
    bg-black/50
    p-6
  ">

    <div className="
      mx-auto
      max-w-4xl
      rounded-[36px]
      bg-white
      p-10
    ">

      <div className="
        mb-10
        flex
        items-center
        justify-between
      ">

      <h2
  className="
    font-serif
    text-5xl
    font-bold
    tracking-tight
  "
>
          Nouvelle réservation
        </h2>

        <button
          onClick={() =>
            setShowModal(false)
          }
          className="
            rounded-xl
            bg-black
            px-5
            py-3
            text-white
          "
        >
          Fermer
        </button>

      </div>

      <div className="space-y-6">

        {/* INFOS CLIENT */}

        <div className="
          grid gap-4
          md:grid-cols-2
        ">

          <input
            type="text"
            placeholder="Prénom"
            value={
              manualReservation.first_name
            }
            onChange={(e) =>
              setManualReservation({
                ...manualReservation,
                first_name:
                  e.target.value,
              })
            }
            className="
              rounded-2xl
              border
              p-4
            "
          />

          <input
            type="text"
            placeholder="Nom"
            value={
              manualReservation.last_name
            }
            onChange={(e) =>
              setManualReservation({
                ...manualReservation,
                last_name:
                  e.target.value,
              })
            }
            className="
              rounded-2xl
              border
              p-4
            "
          />

        </div>

        <div className="
          grid gap-4
          md:grid-cols-2
        ">

          <input
            type="email"
            placeholder="Email"
            value={
              manualReservation.email
            }
            onChange={(e) =>
              setManualReservation({
                ...manualReservation,
                email:
                  e.target.value,
              })
            }
            className="
              rounded-2xl
              border
              p-4
            "
          />

          <input
            type="text"
            placeholder="Téléphone"
            value={
              manualReservation.phone
            }
            onChange={(e) =>
              setManualReservation({
                ...manualReservation,
                phone:
                  e.target.value,
              })
            }
            className="
              rounded-2xl
              border
              p-4
            "
          />

        </div>

        {/* DATES */}

        <div className="
          grid gap-4
          md:grid-cols-2
        ">

          <input
            type="date"
            lang="fr-FR"
            value={
              manualReservation.arrival
            }
            onChange={(e) =>
              setManualReservation({
                ...manualReservation,
                arrival:
                  e.target.value,
              })
            }
            className="
              rounded-2xl
              border
              p-4
            "
          />

          <input
            type="date"
            lang="fr-FR"
            value={
              manualReservation.departure
            }
            onChange={(e) =>
              setManualReservation({
                ...manualReservation,
                departure:
                  e.target.value,
              })
            }
            className="
              rounded-2xl
              border
              p-4
            "
          />

        </div>

        {/* PERSONNES */}

        <div className="grid gap-4 md:grid-cols-3">

  <div>
    <label className="mb-2 block font-semibold">
      Adultes
    </label>

    <input
      type="number"
      min={1}
      value={manualReservation.adults}
      onChange={(e) =>
        setManualReservation({
          ...manualReservation,
          adults: Number(e.target.value),
        })
      }
      className="
        w-full
        rounded-2xl
        border
        p-4
      "
    />
  </div>

  <div>
    <label className="mb-2 block font-semibold">
      Enfants
    </label>

    <input
      type="number"
      min={0}
      value={manualReservation.children}
      onChange={(e) =>
        setManualReservation({
          ...manualReservation,
          children: Number(e.target.value),
        })
      }
      className="
        w-full
        rounded-2xl
        border
        p-4
      "
    />
  </div>

  <div>
    <label className="mb-2 block font-semibold">
      Bébés (-2 ans)
    </label>

    <input
      type="number"
      min={0}
      value={manualReservation.babies}
      onChange={(e) =>
        setManualReservation({
          ...manualReservation,
          babies: Number(e.target.value),
        })
      }
      className="
        w-full
        rounded-2xl
        border
        p-4
      "
    />
  </div>

</div>

        {/* CHAMBRES */}

        <div className="space-y-4">

          {[
            "Chambre Double Standard",
            "Chambre Confort",
            "Chambre Familiale",
          ].map((room) => {

            const checked =
              manualReservation.rooms.includes(
                room
              )

            if (!roomsData.length) {
    
  return (
    <div>
      Chargement...
    </div>
  )
}

            return (

              <label
                key={room}
                className="
                  flex items-center gap-3
                  rounded-2xl
                  bg-[#f5f1ea]
                  p-4
                "
              >

                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => {

                    if (e.target.checked) {

                      setManualReservation({
                        ...manualReservation,

                        rooms: [
                          ...manualReservation.rooms,
                          room,
                        ],
                      })

                    } else {

                      setManualReservation({
                        ...manualReservation,

                        rooms:
                          manualReservation.rooms.filter(
                            (r) => r !== room
                          ),
                      })
                    }
                  }}
                />

                {room}

              </label>

            )
          })}

        </div>

        {/* OPTIONS */}

<div className="
  grid gap-4
  md:grid-cols-2
">

  <label className="
    flex items-center gap-3
    rounded-2xl
    bg-[#f5f1ea]
    p-4
  ">

    <input
      type="checkbox"
      checked={
        manualReservation.breakfast
      }
      onChange={(e) =>
        setManualReservation({
          ...manualReservation,
          breakfast:
            e.target.checked,
        })
      }
    />

    Petit Déjeuner

  </label>
  
  <label className="
    flex items-center gap-3
    rounded-2xl
    bg-[#f5f1ea]
    p-4
  ">

    <input
      type="checkbox"
      checked={
        manualReservation.lunch
      }
      onChange={(e) =>
        setManualReservation({
          ...manualReservation,
          lunch:
            e.target.checked,
        })
      }
    />

    Repas midi

  </label>

  <label className="
    flex items-center gap-3
    rounded-2xl
    bg-[#f5f1ea]
    p-4
  ">

    <input
      type="checkbox"
      checked={
        manualReservation.dinner
      }
      onChange={(e) =>
        setManualReservation({
          ...manualReservation,
          dinner:
            e.target.checked,
        })
      }
    />

    Repas soir

  </label>

  <label className="
    flex items-center gap-3
    rounded-2xl
    bg-[#f5f1ea]
    p-4
  ">

    <input
      type="checkbox"
      checked={
        manualReservation.pets
      }
      onChange={(e) =>
        setManualReservation({
          ...manualReservation,
          pets:
            e.target.checked,
        })
      }
    />

    Animal

  </label>

  <label
  className="
    flex items-center gap-3
    rounded-2xl
    bg-[#f5f1ea]
    p-4
  "
>

  <input
    type="checkbox"
    checked={
      manualReservation.litParapluie
    }
    onChange={(e) =>
      setManualReservation({
        ...manualReservation,
        litParapluie:
          e.target.checked,
      })
    }
  />

  Demande de lit parapluie

</label>

</div>

{/* MESSAGE */}

<textarea
  placeholder="Message"
  value={
    manualReservation.message
  }
  onChange={(e) =>
    setManualReservation({
      ...manualReservation,
      message:
        e.target.value,
    })
  }
  className="
    min-h-[140px]
    w-full
    rounded-2xl
    border
    p-4
  "
/>

{/* RECAP */}

<div className="
  rounded-3xl
  bg-[#f5f1ea]
  p-6
">

  <h3 className="
    mb-6
    text-2xl
    font-bold
    font-serif
  ">
    Récapitulatif tarifaire
  </h3>

  <div className="space-y-3">

    {manualReservation.rooms.map(
      (room) => {

        const price =
          getRoomPrice(
            room,
            occupancy
          )

        return (

          <div
            key={room}
            className="
              flex justify-between
            "
          >

            <span>
              {room}
              {" "}
              ({price}€
              ×
              {nights}
              nuits)
            </span>

            <span>
              {price * nights}€
            </span>

          </div>

        )
      }
    )}

    {occupancy >= 3 && (

  <div className="flex justify-between border-b border-black/20 py-3">

    <div>
      Personne supplémentaire (
      {hotelSettings.extra_bed}€
      × {(occupancy - 2)}
      × {nights} nuits)
    </div>

    <div>
      {extraBedTotal}€
    </div>

  </div>
)}

{/* Matin */}

<div className="
  flex justify-between
  border-b
  pb-3
">

  <span>
    Petit Déjeuner

    {manualReservation.breakfast && (
  <span className="text-[#6b5b4f]">

    {manualReservation.adults > 0 && (
      <>
        {manualReservation.adults}
        {" "}adulte(s)
        ×
        {" "}
        {Number(
          hotelSettings.breakfast || 12
        )}€
        {" "}
      </>
    )}

    {manualReservation.children > 0 && (
      <>
        {manualReservation.children}
        {" "}enfant(s)
        × 6€
        {" "}
      </>
    )}

    {manualReservation.babies > 0 && (
      <>
        {manualReservation.babies}
        {" "}bébé(s)
        gratuits
        {" "}
      </>
    )}

    × {nights} nuit(s)

  </span>
)}
  </span>

  <span>
    {manualReservation.breakfast
      ? `${breakfastTotal}€`
      : "Non"}
  </span>

</div>

{/* MIDI */}

<div className="
  flex justify-between
  border-b
  pb-3
">

  <span>
    Repas midi

    {manualReservation.lunch && (
      <span className="text-[#6b5b4f]">
        {" "}
        (
        {Number(hotelSettings.lunch || 0)}€
        {" "}×{" "}
        {occupancy}
        {" "}personnes
        {" "}×{" "}
        {nights}
        {" "}nuits
        )
      </span>
    )}
  </span>

  <span>
    {manualReservation.lunch
      ? `${lunchTotal}€`
      : "Non"}
  </span>

</div>

{/* SOIR */}

<div className="
  flex justify-between
  border-b
  pb-3
">

  <span>
    Repas soir

    {manualReservation.dinner && (
      <span className="text-[#6b5b4f]">
        {" "}
        (
        {hotelSettings?.dinner || 0}€
        {" "}×{" "}
        {occupancy}
        {" "}personnes
        {" "}×{" "}
        {nights}
        {" "}nuits
        )
      </span>
    )}
  </span>

  <span>
    {manualReservation.dinner
      ? `${dinnerTotal}€`
      : "Non"}
  </span>

</div>

{/* ANIMAL */}

<div className="
  flex justify-between
  border-b
  pb-3
">

  <span>
    Animal

    {manualReservation.pets && (
      <span className="text-[#6b5b4f]">
        {" "}
        (
        {hotelSettings?.pet || 0}€
        {" "}×{" "}
        {nights}
        {" "}nuits
        )
      </span>
    )}
  </span>

  <span>
    {manualReservation.pets
      ? `${petsTotal}€`
      : "Non"}
  </span>

</div>

{/* TAXE DE SÉJOUR */}

<div className="
  flex justify-between
  border-b
  pb-3
">

  <span>
    Taxe de séjour

    <span className="text-[#6b5b4f]">
      {" "}
      (
      {hotelSettings?.tourist_tax || 0}€
      {" "}×{" "}
      {manualReservation.adults}
      {" "}adultes
      {" "}×{" "}
      {nights}
      {" "}nuits
      )
    </span>

  </span>

  <span>
    {touristTax.toFixed(2)}€
  </span>

</div>

<div className="flex justify-between border-b pb-3">
  <span>👨 Adultes</span>
  <span>{manualReservation.adults}</span>
</div>

<div className="flex justify-between border-b pb-3">
  <span>🧒 Enfants</span>
  <span>{manualReservation.children}</span>
</div>

{manualReservation.babies > 0 && (
  <div className="flex justify-between border-b pb-3">
    <span>👶 Bébés</span>
    <span>{manualReservation.babies}</span>
  </div>
)}

{manualReservation.litParapluie && (
  <div className="flex justify-between border-b pb-3">
    <span>
      🛏️ Lit parapluie

      <span className="text-[#6b5b4f]">
      {hotelSettings.lit_parapluie || 5}€
      {" "}×{" "}
      {manualReservation.babies}
      {" "}×{" "}
      {nights}
      {" "}nuits 
    </span>
    </span>

    <span>
  {litParapluieTotal.toFixed(2)}€
</span>
    
  </div>
)}

    <div className="
      mt-6
      flex justify-between
      border-t
      pt-4
      text-3xl
      font-bold
    ">

      <span>
        Total
      </span>

      <span>
        {totalPrice.toFixed(2)}€
      </span>

    </div>

  </div>

</div>

<button
  onClick={
    handleAddReservation
  }
  className="
    w-full
    rounded-2xl
    bg-[#2f241d]
    py-5
    text-xl
    font-bold
    text-white
  "
>
  Ajouter la réservation
</button>

      </div>

    </div>

  </div>

)}

{
  showConfirmModal &&
  reservationToConfirm && (

    <div className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/50
    ">

      <div className="
        w-full
        max-w-xl
        rounded-3xl
        bg-white
        p-8
        shadow-2xl
      ">

        <h2 className="
          text-3xl
          font-bold
          text-[#2f241d]
        ">
          Confirmation
        </h2>

        <p className="
          mt-4
          text-[#6b5b4f]
        ">
          Souhaitez-vous demander
          un acompte de
          <strong>
            {" "}
            {hotelSettings.deposit_percent}%
          </strong>
          ?
        </p>

        <div className="
          mt-6
          rounded-2xl
          bg-[#faf7f2]
          p-5
        ">

          <p>
            Client :
            <strong>
              {" "}
              {reservationToConfirm.name}
            </strong>
          </p>

          <p>
            Montant total :
            <strong>
              {" "}
              {reservationToConfirm.total.toFixed(
                2
              )}€
            </strong>
          </p>

          <p>
            Acompte :
            <strong>
              {" "}
              {(
                reservationToConfirm.total *
                hotelSettings.deposit_percent /
                100
              ).toFixed(2)}
              €
            </strong>
          </p>

        </div>

        <div className="
          mt-8
          flex
          justify-end
          gap-4
        ">

          <button
            className="
              rounded-xl
              border
              px-5
              py-3
            "
            onClick={() =>
              setShowConfirmModal(
                false
              )
            }
          >
            Annuler
          </button>

          <button
            className="
              rounded-xl
              bg-blue-700
              px-5
              py-3
              font-bold
              text-white
            "
            onClick={() => {

              updateReservationStatus(
                reservationToConfirm,
                "confirmed",
                false
              )

              setShowConfirmModal(
                false
              )
            }}
          >
            Sans acompte
          </button>

          <button
            className="
              rounded-xl
              bg-green-700
              px-5
              py-3
              font-bold
              text-white
            "
            onClick={() => {

              updateReservationStatus(
                reservationToConfirm,
                "confirmed",
                true
              )

              setShowConfirmModal(
                false
              )
            }}
          >
            Avec acompte
          </button>

        </div>

      </div>

    </div>
  )
}

    </main>
  )
}