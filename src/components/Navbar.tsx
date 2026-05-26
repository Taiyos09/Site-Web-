"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Chambre d'hôtes", href: "/hotel" },
  { name: "Restaurant", href: "/restaurant" },
  { name: "Événements", href: "/evenements" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false)

  return (

    <>

      {/* NAVBAR */}

      <header
        className="
          fixed
          top-0
          left-0
          z-50
          w-full
          border-b
          border-white/10
          bg-[#1a120e]/70
          backdrop-blur-xl
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            justify-between
            px-6
            py-4
            text-white
          "
        >

          {/* LOGO */}

          <Link
            href="/"
            className="
              flex
              items-center
              gap-4
              transition-opacity
              hover:opacity-90
            "
          >

            <div
              className="
                h-3
                w-3
                rounded-full
                bg-[#c89b5f]
                shadow-[0_0_15px_rgba(200,155,95,0.7)]
              "
            />

            <div className="leading-tight">

              <div
                className="
                  font-serif
                  text-[22px]
                  tracking-wide
                  md:text-[28px]
                "
              >
                Auberge de St Aubin
              </div>

              <div
                className="
                  mt-1
                  text-[10px]
                  uppercase
                  tracking-[0.35em]
                  text-[#d6b98c]
                  md:text-[11px]
                "
              >
                Bourbonnais
              </div>

            </div>

          </Link>

          {/* NAVIGATION DESKTOP */}

          <nav
            className="
              hidden
              items-center
              gap-10
              md:flex
            "
          >

            {navigation.map((item) => (

              <Link
                key={item.name}
                href={item.href}
                className="
                  relative
                  text-[15px]
                  font-medium
                  text-white/85
                  transition-all
                  duration-300
                  hover:text-[#d6b98c]
                "
              >
                {item.name}
              </Link>

            ))}

          </nav>

          {/* ACTIONS */}

          <div className="flex items-center gap-4">

            {/* CTA DESKTOP */}

            <Link
              href="/hotel?scroll=chambres"
              className="
                hidden
                rounded-full
                border
                border-[#c89b5f]
                bg-[#c89b5f]/10
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                backdrop-blur-sm
                transition-all
                duration-300
                hover:scale-105
                hover:bg-[#c89b5f]
                hover:text-[#2f241d]
                md:block
              "
            >
              Réserver
            </Link>

            {/* BURGER */}

            <button
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
              className="
                text-white
                transition
                hover:text-[#d6b98c]
                md:hidden
              "
            >

              {mobileMenuOpen ? (
                <X size={30} />
              ) : (
                <Menu size={30} />
              )}

            </button>

          </div>

        </div>

      </header>

      {/* MENU MOBILE */}

     <div
  className={`
    fixed
    inset-0
    z-40
    flex
    flex-col
    items-center
    justify-center
    gap-8
    bg-[#1a120e]/95
    backdrop-blur-2xl
    transition-all
    duration-300
    ${
      mobileMenuOpen
        ? "visible opacity-100"
        : "invisible opacity-0"
    }
  `}
>

        {navigation.map((item) => (

          <Link
            key={item.name}
            href={item.href}
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="
              text-3xl
              font-semibold
              text-white
              transition
              hover:text-[#d6b98c]
            "
          >
            {item.name}
          </Link>

        ))}

        {/* CTA MOBILE */}

        <Link
          href="/hotel?scroll=chambres"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          className="
            mt-4
            rounded-full
            bg-[#c89b5f]
            px-8
            py-4
            text-lg
            font-semibold
            text-[#2f241d]
            shadow-2xl
            transition-all
            duration-300
            hover:scale-105
          "
        >
          Réserver
        </Link>

      </div>

    </>
  )
}