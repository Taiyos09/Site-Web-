"use client"

import Link from "next/link"

export default function HeroSection() {
  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
      "
    >
      {/* IMAGE FOND */}

      <img
        src="/images/hero.webp"
        alt="Auberge de St Aubin"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-black/55
        "
      />

      {/* CONTENU */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          item-start
          pt-48
          px-6
        "
      >
        <div className="max-w-4xl">

          <p
            className="
              mb-6
              uppercase
              tracking-[0.4em]
              text-[#d6b98c]
            "
          >
            Bar • Restaurant • Hôtel
          </p>

          <h1
            className="
              font-serif
              text-6xl
              font-bold
              leading-none
              text-white
              md:text-7xl
              lg:text-[7rem]
            "
          >
            Auberge
            <br />
            de St Aubin
          </h1>

          <p
            className="
              mt-8
              max-w-2xl
              text-xl
              leading-relaxed
              text-white/90
            "
          >
            Une auberge authentique au cœur du
            Bourbonnais. Chambres confortables,
            restaurant convivial et soirées
            organisées toute l'année.
          </p>

          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-4
            "
          >
          
          </div>

        </div>
      </div>

      {/* SCROLL INDICATOR */}

      <div
        className="
          absolute
          bottom-10
          left-1/2
          -translate-x-1/2
          text-white/80
        "
      >
        ↓
      </div>
    </section>
  )
}