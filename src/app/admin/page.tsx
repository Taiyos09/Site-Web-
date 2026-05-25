"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

const cards = [
  {
    title: "Tarifs hôtel",
    href: "/admin/hotel",
    color:
      "from-[#2f241d] to-[#4b3a2f]",
  },

  {
    title: "Restaurant",
    href: "/admin/restaurant",
    color:
      "from-[#c89b5f] to-[#d8ae74]",
  },

  {
    title: "Événements",
    href: "/admin/events",
    color:
      "from-[#3558ff] to-[#5a78ff]",
  },

  {
    title: "Réservations",
    href: "/admin/reservations",
    color:
      "from-[#ff7300] to-[#ff9b45]",
  },

  {
    title: "Calendrier",
    href: "/admin/calendar",
    color:
      "from-[#17a63d] to-[#32c95c]",
  },

]

export default function AdminDashboard() {

  const router = useRouter()

  const [checkingAuth, setCheckingAuth] =
    useState(true)

  /* ====================================== */
  /* CHECK AUTH */
  /* ====================================== */

  useEffect(() => {

    const checkAuth = async () => {

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {

        router.push("/login")
        return
      }

      setCheckingAuth(false)
    }

    checkAuth()

  }, [router])

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
            md:flex-row
            md:items-center
            md:justify-between
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

        {/* CARDS */}

        <div
          className="
            grid
            gap-8
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {cards.map((card) => (

            <Link
              key={card.href}
              href={card.href}
              className={`
  group
  relative
  overflow-hidden
  rounded-[36px]

  bg-gradient-to-br
  ${card.color}

  p-10
  text-white

  shadow-[0_12px_35px_rgba(0,0,0,0.12)]

  transition-all
  duration-300

  hover:scale-[1.03]
  hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)]

  before:absolute
  before:inset-0
  before:bg-white/10
  before:opacity-0
  before:transition
  before:duration-300

  hover:before:opacity-100
`}
            >

              <div
                className="
                  flex
                  h-full
                  flex-col
                  justify-between
                "
              >

                <div>

                  <h2
                    className="
                      font-serif
                      text-3xl
                      font-bold
                      md:text-4xl
                    "
                  >
                    {card.title}
                  </h2>

                  <p
                    className="
                      mt-4
                      text-lg
                      text-white/85
                    "
                  >
                    Accéder au module
                  </p>

                </div>

                <div
                  className="
                    mt-10
                    text-sm
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-white/70
                    transition-all
                    duration-300
                    group-hover:text-white
                  "
                >
                  Ouvrir →
                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </main>
  )
}