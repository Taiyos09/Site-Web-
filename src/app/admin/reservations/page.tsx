"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

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

  people: number

  pets: boolean
  breakfast: boolean
  lunch: boolean
  dinner: boolean
  baby: boolean

  message: string

  total: number

  status: string

  reservation_rooms?: ReservationRoom[]
}

export default function ReservationsPage() {

  const [reservations, setReservations] =
    useState<Reservation[]>([])

  const [showModal, setShowModal] =
    useState(false)

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

    people: 2,

    rooms: [] as string[],

    breakfast: false,
    lunch: false,
    dinner: false,
    pets: false,
    baby: false,

    message: "",
  })

  const [hotelSettings, setHotelSettings] =
    useState<any>(null)

  const [roomsData, setRoomsData] =
    useState<any[]>([])

  useEffect(() => {

    const loadData =
      async () => {

        try {

          const {
            data,
            error,
          } = await supabase
            .from("reservations")
            .select(`
              *,
              reservation_rooms (*)
            `)
            .order("created_at", {
              ascending: false,
            })

          if (error) {
            console.error(error)
            return
          }

          if (data) {
            setReservations(data)
          }

          const {
            data: settingsData
          } = await supabase
            .from("hotel_settings")
            .select("*")
            .single()

          if (settingsData) {
            setHotelSettings(settingsData)
          }

          const {
            data: roomsTable
          } = await supabase
            .from("rooms")
            .select("*")

          if (roomsTable) {
            setRoomsData(roomsTable)
          }

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
      status: string
    ) => {

      try {

        await supabase
          .from("reservations")
          .update({ status })
          .eq("id", reservation.id)

        if (status === "rejected") {

          await supabase
            .from("blocked_dates")
            .delete()
            .eq(
              "reservation_id",
              reservation.id
            )
        }

        await fetch(
  "/api/send-status-email",
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({

      status,

      people:
  reservation.people,

breakfast:
  reservation.breakfast,

lunch:
  reservation.lunch,

dinner:
  reservation.dinner,

pets:
  reservation.pets,

baby:
  reservation.baby,

      email:
        reservation.email,

      first_name:
        reservation.first_name,

      last_name:
        reservation.last_name,

      roomName:
        reservation
          .reservation_rooms?.[0]
          ?.room_name || "",

      arrival:
        reservation.arrival,

      departure:
        reservation.departure,

      total:
        reservation.total,
    }),
  }
)

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

        await supabase
          .from("reservation_rooms")
          .delete()
          .eq("reservation_id", id)

        await supabase
          .from("blocked_dates")
          .delete()
          .eq("reservation_id", id)

        await supabase
          .from("reservations")
          .delete()
          .eq("id", id)

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

    const roomData =
      roomsData.find(
        (r) =>
          r.name?.trim().toLowerCase() ===
          roomName.trim().toLowerCase()
      )

    if (!roomData) {
      return 0
    }

    const onePersonPrice =
      parseFloat(
        roomData.one_person_price
      ) || 0

    const twoPeoplePrice =
      parseFloat(
        roomData.two_people_price
      ) || 0

    if (people <= 1) {
      return onePersonPrice
    }

    return twoPeoplePrice
  }

  /* ---------------- AJOUT MANUEL ---------------- */

  const handleAddReservation =
    async () => {

for (
  const room of
  manualReservation.rooms
) {

  const roomData =
    roomsData.find(
      (r) =>
        r.name?.trim().toLowerCase() ===
        room.trim().toLowerCase()
    )

  if (!roomData) {

    alert(
      `Impossible de trouver le slug de la chambre ${room}`
    )

    return
  }

  const {
    data: existingReservations,
    error: checkError,
  } = await supabase
    .from("blocked_dates")
    .select("*")
    .eq(
      "room_slug",
      roomData.slug
    )

  if (checkError) {

    console.error(checkError)

    alert(
      "Erreur vérification disponibilités"
    )

    return
  }

  

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
              manualReservation.people
            )

          const roomTotal =
            roomPrice * nights

          total += roomTotal

          roomDetails.push({

            room_name: room,

            people:
              manualReservation.people,

            room_total:
              roomTotal,
          })
        }

        if (
          manualReservation.breakfast
        ) {

          total +=
            manualReservation.people *
            (hotelSettings?.breakfast || 0) *
            nights
        }

        if (
          manualReservation.lunch
        ) {

          total +=
            manualReservation.people *
            (hotelSettings?.lunch || 0) *
            nights
        }

        if (
          manualReservation.dinner
        ) {

          total +=
            manualReservation.people *
            (hotelSettings?.dinner || 0) *
            nights
        }

        if (
          manualReservation.pets
        ) {

          total +=
            (hotelSettings?.pet || 0) *
            nights

            total +=
  (hotelSettings?.tourist_tax || 0) *
  manualReservation.people *
  nights
        }

        const {
          data: reservationData,
          error,
        } = await supabase
          .from("reservations")
          .insert([
            {

              first_name:
                manualReservation.first_name,

              last_name:
                manualReservation.last_name,

              email:
                manualReservation.email,

              phone:
                manualReservation.phone,

              arrival:
                manualReservation.arrival,

              departure:
                manualReservation.departure,

              people:
                manualReservation.people,

              breakfast:
                manualReservation.breakfast,

              lunch:
                manualReservation.lunch,

              dinner:
                manualReservation.dinner,

              pets:
                manualReservation.pets,

              baby:
                manualReservation.baby,

              message:
                manualReservation.message,

              total,

              status:
                "confirmed",
            },
          ])
          .select()
          .single()

        if (error) {

          console.error(error)

          alert(
            "Erreur création réservation"
          )

          return
        }

        for (
          const room of roomDetails
        ) {

          await supabase
            .from("reservation_rooms")
            .insert({

              reservation_id:
                reservationData.id,

              room_name:
                room.room_name,

              people:
                room.people,

              room_total:
                room.room_total,
            })

          const roomData =
  roomsData.find(
    (r) =>
      r.name?.trim().toLowerCase() ===
      room.room_name.trim().toLowerCase()
  )

await supabase
  .from("blocked_dates")
  .insert({

    reservation_id:
      reservationData.id,

    room_name:
      room.room_name,

    room_slug:
      roomData?.slug,

    from_date:
      manualReservation.arrival,

    to_date:
      manualReservation.departure,
  })
        }

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

      people:
        manualReservation.people,

      breakfast:
        manualReservation.breakfast,

      lunch:
        manualReservation.lunch,

      dinner:
        manualReservation.dinner,

      pets:
        manualReservation.pets,

      baby:
        manualReservation.baby,
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
          manualReservation.people
        )

      roomsTotal +=
        roomPrice * nights
    }
  )

  const breakfastTotal =
    manualReservation.breakfast
      ? manualReservation.people *
        (hotelSettings?.breakfast || 0) *
        nights
      : 0

  const lunchTotal =
    manualReservation.lunch
      ? manualReservation.people *
        (hotelSettings?.lunch || 0) *
        nights
      : 0

  const dinnerTotal =
    manualReservation.dinner
      ? manualReservation.people *
        (hotelSettings?.dinner || 0) *
        nights
      : 0

  const petsTotal =
    manualReservation.pets
      ? (hotelSettings?.pet || 0) *
        nights
      : 0

  const touristTax =
  (hotelSettings?.tourist_tax || 0) *
  manualReservation.people *
  nights

  const totalPrice =
    roomsTotal +
    breakfastTotal +
    lunchTotal +
    dinnerTotal +
    petsTotal +
    touristTax

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

            {reservations.map(
              (reservation) => (

                <div
                  key={reservation.id}
                  className="
                    rounded-3xl
                    bg-[#faf7f2]
                    p-8
                  "
                >

                  <div className="
                    flex
                    flex-col
                    gap-4
                  ">

                    <h2 className="
                      text-2xl
                      font-bold
                    ">
                      {reservation.first_name}
                      {" "}
                      {reservation.last_name}
                    </h2>

                    <p>
  {reservation.email}
</p>

<p>
  {reservation.phone}
</p>

<p>
  Arrivée :
  {" "}
  {new Date(
    reservation.arrival
  ).toLocaleDateString("fr-FR")}
</p>

<p>
  Départ :
  {" "}
  {new Date(
    reservation.departure
  ).toLocaleDateString("fr-FR")}
</p>

<p>
  Personnes :
  {" "}
  {reservation.people}
</p>

{/* CHAMBRES */}

<div>

  <p className="font-semibold">
    Chambres réservées :
  </p>

  <div className="mt-2 space-y-1">

    {reservation.reservation_rooms?.map(
      (room) => (

        <div
          key={room.id}
          className="
            rounded-xl
            bg-white
            px-4
            py-2
            text-sm
          "
        >

          {room.room_name}
          {" "}
          —
          {" "}
          {room.room_total}€

        </div>

      )
    )}

  </div>

</div>

{/* OPTIONS */}

<div className="space-y-1">

  <p className="font-semibold">
    Options :
  </p>

  <div className="text-sm">

    Petit déjeuner :
    {" "}
    {reservation.breakfast
      ? "Oui"
      : "Non"}

  </div>

  <div className="text-sm">

    Repas midi :
    {" "}
    {reservation.lunch
      ? "Oui"
      : "Non"}

  </div>

  <div className="text-sm">

    Repas soir :
    {" "}
    {reservation.dinner
      ? "Oui"
      : "Non"}

  </div>

  <div className="text-sm">

    Animal :
    {" "}
    {reservation.pets
      ? "Oui"
      : "Non"}

  </div>

  <div className="text-sm">

    Bébé :
    {" "}
    {reservation.baby
      ? "Oui"
      : "Non"}

  </div>

</div>

{reservation.message && (

  <div>

    <p className="font-semibold">
      Message :
    </p>

    <p className="
      mt-1
      rounded-2xl
      bg-white
      p-4
      text-sm
    ">
      {reservation.message}
    </p>

  </div>

)}

<p className="
  text-xl
  font-bold
">

  Total :
  {" "}
  {reservation.total}€

</p>

<p>

  Statut :
  {" "}

  <strong>
    {reservation.status}
  </strong>

</p>

                    <div className="
                      flex
                      gap-4
                      flex-wrap
                    ">

                      <button
                        onClick={() =>
                          updateReservationStatus(
                            reservation,
                            "confirmed"
                          )
                        }
                        className="
                          rounded-xl
                          bg-green-600
                          px-5
                          py-3
                          text-white
                          font-bold
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
                          rounded-xl
                          bg-red-600
                          px-5
                          py-3
                          text-white
                          font-bold
                        "
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
                          text-white
                          font-bold
                        "
                      >
                        Supprimer
                      </button>

                      <button
  onClick={async () => {

    try {

      const response = await fetch(
        "/api/generate-invoice",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
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
    text-white
    font-bold
  "
>
  Facture PDF
</button>

                    </div>

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

        <h2 className="
          font-serif
          text-4xl
          font-bold
        ">
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

        <select
          value={
            manualReservation.people
          }
          onChange={(e) =>
            setManualReservation({
              ...manualReservation,
              people:
                Number(e.target.value),
            })
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

        {/* CHAMBRES */}

        <div className="space-y-4">

          {[
            "Chambre Double standard",
            "Chambre Confort",
            "Chambre Familiale",
          ].map((room) => {

            const checked =
              manualReservation.rooms.includes(
                room
              )

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

    Petit déjeuner

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

  <label className="
    flex items-center gap-3
    rounded-2xl
    bg-[#f5f1ea]
    p-4
  ">

    <input
      type="checkbox"
      checked={
        manualReservation.baby
      }
      onChange={(e) =>
        setManualReservation({
          ...manualReservation,
          baby:
            e.target.checked,
        })
      }
    />

    Enfant en bas âge

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
            manualReservation.people
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

    {/* PETIT DÉJEUNER */}

<div className="
  flex justify-between
  border-b
  pb-3
">

  <span>
    Petit déjeuner

    {manualReservation.breakfast && (
      <span className="text-[#6b5b4f]">
        {" "}
        (
        {hotelSettings?.breakfast || 0}€
        {" "}×{" "}
        {manualReservation.people}
        {" "}personnes
        {" "}×{" "}
        {nights}
        {" "}nuits
        )
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
        {hotelSettings?.lunch || 0}€
        {" "}×{" "}
        {manualReservation.people}
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
        {manualReservation.people}
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
      {manualReservation.people}
      {" "}personnes
      {" "}×{" "}
      {nights}
      {" "}nuits
      )
    </span>

  </span>

  <span>
    {touristTax}€
  </span>

</div>

{/* BÉBÉ */}

<div className="
  flex justify-between
  border-b
  pb-3
">

  <span>
    Enfant en bas âge
  </span>

  <span>
    {manualReservation.baby
      ? "Oui"
      : "Non"}
  </span>

</div>

{/* BÉBÉ */}

<div className="
  flex justify-between
  border-b
  pb-3
">

  <span>
    Enfant en bas âge
  </span>

  <span>
    {manualReservation.baby
      ? "Oui"
      : "Non"}
  </span>

</div>

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
        {totalPrice}€
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

    </main>
  )
}