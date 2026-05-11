"use client"

import Link from "next/link"

export default function AdminNavbar() {

  return (

    <header
      className="
        sticky
        top-0
        z-50
        mb-10
        rounded-[28px]
        border
        border-[#e7ded2]
        bg-white/95
        backdrop-blur-xl
        shadow-xl
      "
    >

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-4
          px-8
          py-5
        "
      >

        <div>

          <h2
            className="
              font-serif
              text-3xl
              font-bold
              text-[#2f241d]
            "
          >
            Administration
          </h2>

          <p className="text-[#6b5b4f]">
            Gestion de l’auberge
          </p>

        </div>

        <nav
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >

          <Link
            href="/"
            className="
              rounded-2xl
              bg-white
              px-5
              py-3
              font-semibold
              text-[#2f241d]
              border
              transition
              hover:bg-[#faf7f2]
            "
          >
            Accueil Site
          </Link>
          
          <Link
            href="/admin"
            className="
              rounded-2xl
              bg-white
              px-5
              py-3
              font-semibold
              text-[#2f241d]
              border
              transition
              hover:bg-[#faf7f2]
            "
          >
            Accueil Admin
          </Link>
          
          <Link
            href="/admin/hotel"
            className="
              rounded-2xl
              bg-[#2f241d]
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-[#43352c]
            "
          >
            Tarif hôtel
          </Link>

          <Link
            href="/admin/restaurant"
            className="
              rounded-2xl
              bg-white
              px-5
              py-3
              font-semibold
              text-[#2f241d]
              border
              transition
              hover:bg-[#faf7f2]
            "
          >
            Tarif restaurant
          </Link>

          <Link
            href="/admin/events"
            className="
              rounded-2xl
              bg-white
              px-5
              py-3
              font-semibold
              text-[#2f241d]
              border
              transition
              hover:bg-[#faf7f2]
            "
          >
            Événements
          </Link>

          <Link
            href="/admin/reservations"
            className="
              rounded-2xl
              bg-white
              px-5
              py-3
              font-semibold
              text-[#2f241d]
              border
              transition
              hover:bg-[#faf7f2]
            "
          >
            Réservations
          </Link>

          <Link
            href="/admin/calendar"
            className="
              rounded-2xl
              bg-green-600
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-green-700
            "
          >
            Calendrier chambres
          </Link>

        </nav>

      </div>

    </header>
  )
}