"use client"

import Link from "next/link"
import {useTranslations} from "next-intl";

export default function HeroSection() {

  const t = useTranslations("home");

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
          pt-32 sm:pt-40 md:pt-48
          px-6
        "
      >
        <div className="max-w-4xl">

          <p
            className="
              mb-6
              uppercase
              tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em]
              text-[#d6b98c]
            "
          >
            {t("heroSubtitle")}
          </p>

          <h1
            className="
              font-serif
              text-4xl sm:text-5xl md:text-6xl
              font-bold
              leading-none
              text-white
              md:text-6xl
              lg:text-[7rem]
            "
          >
            {t("heroTitle")}
            <br />
            {t("heroTitle1")}
          </h1>

          <p
            className="
              mt-8
              max-w-2xl
              text-base sm:text-lg md:text-xl
              leading-relaxed
              text-white/90
            "
          >
            {t("heroDescription")}
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
