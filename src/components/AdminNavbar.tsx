"use client"

import Link from "next/link"

import {
  usePathname,
  useRouter,
} from "next/navigation"

import {
  LayoutDashboard,
  BedDouble,
  UtensilsCrossed,
  CalendarDays,
  CalendarRange,
  PartyPopper,
  LogOut,
  Home,
} from "lucide-react"

import { supabase } from "@/lib/supabase"

const links = [

  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    label: "Tarifs hôtel",
    href: "/admin/hotel",
    icon: BedDouble,
  },

  {
    label: "Restaurant",
    href: "/admin/restaurant",
    icon: UtensilsCrossed,
  },

  {
    label: "Événements",
    href: "/admin/events",
    icon: PartyPopper,
  },

  {
    label: "Réservations",
    href: "/admin/reservations",
    icon: CalendarDays,
  },

  {
    label: "Calendrier",
    href: "/admin/calendar",
    icon: CalendarRange,
  },

]

export default function AdminNavbar() {

  const pathname = usePathname()

  const router = useRouter()

  const handleLogout =
    async () => {

      await supabase.auth.signOut()

      router.push("/login")
    }

  return (

    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-[#e7ded2]
        bg-[#f9f5ef]/90
        backdrop-blur-xl
      "
    >

      <div
        className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-6
          px-3
          py-2
          md:px-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* LOGO */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-6
          "
        >

          <div>

            <h2
              className="
                font-serif
                text-2xl
                font-bold
                text-[#2f241d]
              "
            >
              Administration
            </h2>

            <p
              className="
                mt-1
                text-[#6b5b4f]
              "
            >
              Gestion Hotel
            </p>

          </div>

          {/* HOME */}

          <Link
            href="/"
            className="
              hidden
              items-center
              gap-2
              rounded-2xl
              border
              border-[#ddd2c3]
              bg-white
              px-5
              py-3
              font-semibold
              text-[#2f241d]
              transition-all
              duration-300
              hover:bg-[#f5efe6]
              md:flex
            "
          >

            <Home size={18} />

            Site

          </Link>

        </div>

        {/* NAV */}

        <nav
          className="
            whitespace-nowrap
            flex
            flex-nowrap
            gap-1
            flex-1
            justify-end
          "
        >

          {links.map((link) => {

            const Icon =
              link.icon

            const isActive =
              pathname === link.href

            return (

              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex
                  items-center
                  gap-2

                  rounded-2xl
                  px-3
                  py-2

                  text-sm
                  font-semibold

                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        bg-[#2f241d]
                        text-white
                        shadow-lg
                      `
                      : `
                        border
                        border-[#ddd2c3]
                        bg-white
                        text-[#2f241d]
                        hover:bg-[#f5efe6]
                      `
                  }
                `}
              >

                <Icon size={18} />

                {link.label}

              </Link>
            )
          })}

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2

              rounded-2xl
              bg-red-600
              px-3
              py-2

              text-sm
              font-semibold
              text-white

              transition-all
              duration-300

              hover:bg-red-700
            "
          >

            <LogOut size={18} />

            Déconnexion

          </button>

        </nav>

      </div>

    </header>
  )
}