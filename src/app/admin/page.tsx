"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


export default function AdminDashboard() {

  const router = useRouter()

  const [checkingAuth, setCheckingAuth] =
    useState(true)


  const [pendingCount, setPendingCount] = useState(0)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {

  fetch("/api/admin/dashboard")
    .then((res) => res.json())
    .then((data) => {
      setStats(data)
    })
    .then((data) => {
  console.log("DASHBOARD :", data)
  setStats(data)
})

}, [])

  /* ====================================== */
  /* CHECK AUTH */
  /* ====================================== */
  useEffect(() => {

  fetch("/api/admin/dashboard")
    .then((res) => res.json())
    .then((data) => {

      console.log("DATA :", data)

      setStats(data)

    })

}, [])

useEffect(() => {
  console.log("STATS =", stats)
}, [stats])


  useEffect(() => {

    const checkAuth = async () => {

      const response =
  await fetch(
    "/api/check-auth"
  )

if (!response.ok) {


  return
}

      setCheckingAuth(false)
    }

    checkAuth()

  }, [router])

    useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await fetch('/api/reservations')
        const data = await response.json()
        const pending = data.filter((r: any) => r.status === 'pending').length
        setPendingCount(pending)
      } catch (error) {
        console.error('Error fetching pending count:', error)
      }
    }
    fetchPendingCount()
  }, [])

  /* ====================================== */
  /* LOADING */
  /* ====================================== */

  if (checkingAuth) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#f5f1ea]
          text-2xl
          font-semibold
          text-[#2f241d]
        "
      >
        Chargement...
      </div>
    )
  }

  /* ====================================== */
  /* LOGOUT */
  /* ====================================== */

  return (

    <main
      className="
        min-h-screen
        bg-[#f5f1ea]
        px-6
        py-10
        text-[#2f241d]
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
        "
      >

        {/* HEADER */}

<div
  className="
    mb-14
    flex
    flex-col
    gap-6
  "
>

  <div>

    <h1
      className="
        font-serif
        text-5xl
        font-bold
        md:text-6xl
      "
    >
      Dashboard
    </h1>

    <p
      className="
        mt-3
        text-lg
        text-[#6b5b4f]
      "
    >
      Administration de l’auberge.
    </p>

  </div>

</div>

{/* STATISTIQUES */}


{stats && (

  <div
    className="
      mb-12
      grid
      gap-6
      md:grid-cols-2
      xl:grid-cols-5
    "
  >

    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <p className="text-sm text-[#6b5b4f]">
        Réservations
      </p>

      <h2 className="mt-2 text-5xl font-bold">
        {stats.reservations}
      </h2>
    </div>

    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <p className="text-sm text-[#6b5b4f]">
        En attente
      </p>

      <h2 className="mt-2 text-5xl font-bold text-orange-500">
        {stats.pendingReservations}
      </h2>
    </div>

    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <p className="text-sm text-[#6b5b4f]">
        Chambres
      </p>

      <h2 className="mt-2 text-5xl font-bold">
        {stats.rooms}
      </h2>
    </div>

    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <p className="text-sm text-[#6b5b4f]">
        Événements
      </p>

      <h2 className="mt-2 text-5xl font-bold">
        {stats.events}
      </h2>
    </div>

    <div className="rounded-3xl bg-white p-6 shadow-lg">
  <p className="text-sm text-[#6b5b4f]">
    Chiffre d'affaires
  </p>

  <h2 className="mt-2 text-5xl font-bold text-green-600">
    {stats.revenue}€
  </h2>
</div>

  </div>

)}

{/* TABLEAUX */}

{stats && (

  <div
    className="
      mb-12
      grid
      gap-8
      xl:grid-cols-2
    "
  >

    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        Réservations récentes
      </h2>

      <div className="space-y-4">

        {stats.latestReservations.map(
  (reservation: any) => (

    <div
      key={reservation.id}
      className="
        border-b
        pb-4
      "
    >

      <div className="flex justify-between">

        <p className="font-semibold">
          {reservation.name}
        </p>

        <p>
          {reservation.adults} pers.
        </p>

      </div>

      <p className="text-sm text-[#6b5b4f]">

        {new Date(
          reservation.arrival
        ).toLocaleDateString("fr-FR")}

        {" → "}

        {new Date(
          reservation.departure
        ).toLocaleDateString("fr-FR")}

      </p>

      <p
        className={`text-sm font-semibold mt-1 ${
          reservation.status === "confirmed"
            ? "text-green-600"
            : reservation.status === "pending"
            ? "text-orange-500"
            : "text-red-500"
        }`}
      >
        {reservation.status}
      </p>

    </div>

  )
)}

      </div>

    </div>

    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        Prochains événements
      </h2>

      <div className="space-y-4">

        {stats.upcomingEvents.map(
          (event: any) => (

            <div
  key={event.id}
  className="border-b pb-4"
>

  <img
    src={event.image}
    alt={event.title}
    className="
      mb-3
      h-40
      w-full
      rounded-2xl
      object-cover
    "
  />

  <p className="font-semibold text-lg">
    {event.title}
  </p>

  <p className="text-sm text-[#6b5b4f]">
    {new Date(
      event.date
    ).toLocaleDateString("fr-FR")}
  </p>

</div>

          )
        )}

      </div>

    </div>

  </div>

)}
<div className="rounded-3xl bg-white p-8 shadow-lg">

  <h2 className="mb-6 text-2xl font-bold">
    Actions rapides
  </h2>

  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

    <Link
      href="/admin/reservations"
      className="rounded-2xl border p-4 hover:bg-[#f8f4ee]"
    >
      📅 Réservations
    </Link>

    <Link
      href="/admin/events"
      className="rounded-2xl border p-4 hover:bg-[#f8f4ee]"
    >
      🎉 Événements
    </Link>

    <Link
      href="/admin/restaurant"
      className="rounded-2xl border p-4 hover:bg-[#f8f4ee]"
    >
      🍽 Restaurant
    </Link>

    <Link
      href="/admin/hotel"
      className="rounded-2xl border p-4 hover:bg-[#f8f4ee]"
    >
      🛏 Chambres
    </Link>

    <Link
      href="/admin/calendar"
      className="rounded-2xl border p-4 hover:bg-[#f8f4ee]"
    >
      📆 Calendrier
    </Link>

  </div>

</div>

      </div>

    </main>
  )
}