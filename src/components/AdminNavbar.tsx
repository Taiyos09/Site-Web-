"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BedDouble,
  UtensilsCrossed,
  PartyPopper,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react"


const handleLogout = async () => {

  await fetch(
    "/api/logout",
    {
      method: "POST",
    }
  )

  window.location.href =
    "/admin/login"
}

export default function AdminSidebar() {

  const pathname = usePathname()

  return (

    <aside
      className="
        fixed
        left-0
        top-0
        h-screen
        w-72
        bg-[#2f241d]
        text-white
        border-r
        border-[#46362b]
      "
    >

      <div className="p-8">
        
        <Image
  src="/images/logo2.webp"
  alt="Auberge"
  width={48}
  height={48}
  className="h-12 w-auto"
/>

        <h1
          className="
            font-serif
            text-3xl
            font-bold
          "
        >
          Auberge
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-[#d6b98c]
          "
        >
          Administration
        </p>

      </div>

      <nav
        className="
          flex
          flex-col
          gap-2
          px-4
        "
      >

        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#3c2d24]"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/admin/reservations"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#3c2d24]"
        >
          <CalendarDays size={20} />
          Réservations
        </Link>

        <Link
          href="/admin/calendar"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#3c2d24]"
        >
          <CalendarDays size={20} />
          Calendrier
        </Link>

        <Link
          href="/admin/hotel"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#3c2d24]"
        >
          <BedDouble size={20} />
          Chambres
        </Link>

        <Link
          href="/admin/restaurant"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#3c2d24]"
        >
          <UtensilsCrossed size={20} />
          Restaurant
        </Link>

        <Link
          href="/admin/events"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#3c2d24]"
        >
          <PartyPopper size={20} />
          Événements
        </Link>

        <Link
          href="/admin/memories"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#3c2d24]"
        >
          <Settings size={20} />
          Nos souvenir
        </Link>

        <Link
          href="/admin/tourism"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#3c2d24]"
        >
          <Settings size={20} />
          Notre Region
        </Link>

        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#3c2d24]"
        >
          <Settings size={20} />
          retour Site
        </Link>

      </nav>

      <div
        className="
          absolute
          bottom-6
          left-4
          right-4
        "
      >

        <button
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            bg-red-600
            px-4
            py-3
            text-white
          "
        >
          <LogOut size={20} />
          Déconnexion
        </button>

      </div>

    </aside>
  )
}