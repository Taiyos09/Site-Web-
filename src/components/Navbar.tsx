"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {

  const [scrolled, setScrolled] =
    useState(false)

  const [isOpen, setIsOpen] =
  useState(false)

  const pathname = usePathname()

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(
        window.scrollY > 30
      )

    }

    window.addEventListener(
      "scroll",
      handleScroll
    )

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      )

  }, [])

  return (

    

    <header
      className={`
        fixed
        top-0
        left-0
        z-50
        w-full
        transition-all
        duration-300

        ${
          scrolled
            ? `
              bg-black/70
              backdrop-blur-md
              shadow-lg
            `
            : `
              bg-black/45
              backdrop-blur-sm
            `
        }
      `}
    >

      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
        "
      >

        {/* LOGO */}

        <div
          className="
            flex
            w-[200px] sm:w-[240px] md:w-[260px]
            items-center
            gap-3
          "
        >

          <Image
  src="/logo/logo2.webp"
  alt="Auberge Saint Aubin"
  width={52}
  height={52}
  className="
    h-8
    w-auto
    object-contain
    md:h-12
  "
/>

          <div>

            <div
  className="
    font-serif
    text-base sm:text-lg
    md:text-2xl
    leading-none
    text-white
  "
>
              Auberge
              <br />
              de St Aubin
            </div>

          </div>

        </div>

        {/* MENU */}

        <nav
          className="
            hidden
            flex-1
            items-center
            justify-center
            gap-10
            lg:flex
          "
        >

          <Link
  href="/"
  className="
    relative
    font-medium
    text-white
    transition
    hover:text-[#d6b98c]
  "
>
  Accueil

  {pathname === "/" && (
    <span
      className="
        absolute
        -bottom-2
        left-0
        h-[2px]
        w-full
        bg-[#c89b5f]
      "
    />
  )}
</Link>

          <Link
  href="/hotel"
  className="
    relative
    font-medium
    text-white
    transition
    hover:text-[#d6b98c]
  "
>
  Hôtel

  {(
  pathname.startsWith("/hotel") ||
  pathname.startsWith("/chambres")
) && (
    <span
      className="
        absolute
        -bottom-2
        left-0
        h-[2px]
        w-full
        bg-[#c89b5f]
      "
    />
  )}
</Link>

          <Link
            href="/restaurant"
            className="
    relative
    font-medium
    text-white
    transition
    hover:text-[#d6b98c]
  "
          >
            Restaurant

            {pathname.startsWith("/restaurant") && (
    <span
      className="
        absolute
        -bottom-2
        left-0
        h-[2px]
        w-full
        bg-[#c89b5f]
      "
    />
  )}
          </Link>

          <Link
            href="/evenements"
            className="
    relative
    font-medium
    text-white
    transition
    hover:text-[#d6b98c]
  "
          >
            Événements

            {pathname.startsWith("/evenements") && (
    <span
      className="
        absolute
        -bottom-2
        left-0
        h-[2px]
        w-full
        bg-[#c89b5f]
      "
    />
  )}
          </Link>

          <Link
            href="/contact"
            className="
    relative
    font-medium
    text-white
    transition
    hover:text-[#d6b98c]
  "
          >
            Contact

            {pathname.startsWith("/contact") && (
    <span
      className="
        absolute
        -bottom-2
        left-0
        h-[2px]
        w-full
        bg-[#c89b5f]
      "
    />
  )}
          </Link>

          <Link
            href="/notre-region"
            className="
    relative
    font-medium
    text-white
    transition
    hover:text-[#d6b98c]
  "
          >
            Notre Region

            {pathname.startsWith("/notre-region") && (
    <span
      className="
        absolute
        -bottom-2
        left-0
        h-[2px]
        w-full
        bg-[#c89b5f]
      "
    />
  )}
          </Link>

        </nav>

        {/* BOUTON MOBILE */}

<button
  onClick={() =>
    setIsOpen(!isOpen)
  }
  className="
    flex
    lg:hidden
    items-center
    justify-center
    text-white
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {isOpen ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    )}
  </svg>
</button>

        {/* CTA DESKTOP */}

<div
  className="
    hidden
    lg:flex
    w-[200px] sm:w-[240px] md:w-[260px]
    justify-end
  "
>
  <Link
    href="/hotel"
    className="
      rounded-full
      bg-[#c89b5f]
      px-6
      py-3
      text-sm
      font-semibold
      text-white
      transition-all
      duration-300
      hover:scale-105
      hover:bg-[#b98746]
    "
  >
    Réserver une chambre
  </Link>
</div>
</div>

    {/* MENU MOBILE */}

{isOpen && (

  <div
    className="
      lg:hidden
      bg-black/95
      backdrop-blur-xl
      border-t
      border-white/10
    "
  >

    <div
      className="
        flex
        flex-col
        gap-6
        px-6
        py-8
      "
    >

      <Link href="/" onClick={() => setIsOpen(false)} className="text-white">
        Accueil
      </Link>

      <Link href="/hotel" onClick={() => setIsOpen(false)} className="text-white">
        Hôtel
      </Link>

      <Link href="/restaurant" onClick={() => setIsOpen(false)} className="text-white">
        Restaurant
      </Link>

      <Link href="/evenements" onClick={() => setIsOpen(false)} className="text-white">
        Événements
      </Link>

      <Link href="/contact" onClick={() => setIsOpen(false)} className="text-white">
        Contact
      </Link>

      <Link href="/notre-region" onClick={() => setIsOpen(false)} className="text-white">
        Notre Region
      </Link>

      <Link
        href="/hotel"
        onClick={() => setIsOpen(false)}
        className="
          mt-2
          rounded-full
          bg-[#c89b5f]
          px-6
          py-4
          text-center
          font-semibold
          text-white
        "
      >
        Réserver une chambre
      </Link>

    </div>

  </div>

)}

    </header>

  )
}
