"use client"

import Link from "next/link"
import AdminNavbar from "@/components/AdminNavbar"

const cards = [
  {
    title: "Tarifs hôtel",
    href: "/admin/hotel",
    color: "bg-[#2f241d]",
  },

  {
    title: "Restaurant",
    href: "/admin/restaurant",
    color: "bg-[#c89b5f]",
  },

  {
    title: "Événements",
    href: "/admin/events",
    color: "bg-blue-600",
  },

  {
    title: "Réservations",
    href: "/admin/reservations",
    color: "bg-orange-500",
  },

  {
    title: "Calendrier",
    href: "/admin/calendar",
    color: "bg-green-600",
  },
]

export default function AdminDashboard() {

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

          <h1 className="
            font-serif
            text-5xl
            font-bold
          ">
            Dashboard
          </h1>

          <p className="
            mt-2
            text-[#6b5b4f]
          ">
            Administration de l’auberge.
          </p>

        </div>

        <div className="
          mt-12
          grid
          gap-8
          md:grid-cols-2
          xl:grid-cols-3
        ">

          {cards.map((card) => (

            <Link
              key={card.href}
              href={card.href}
              className={`
                ${card.color}

                rounded-[36px]
                p-10
                text-white
                shadow-2xl
                transition-all
                duration-300

                hover:scale-[1.03]
              `}
            >

              <h2 className="
                text-3xl
                font-bold
                font-serif
              ">
                {card.title}
              </h2>

              <p className="mt-4 opacity-80">
                Accéder au module
              </p>

            </Link>

          ))}

        </div>

      </main>

    </>
  )
}