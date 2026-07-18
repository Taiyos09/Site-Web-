"use client"

import Link from "next/link"

export default function WelcomeSection() {
  return (
    <section
      className="
        bg-[#f5f1ea]
        pt-20
        pb-16
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-16
          px-6
          lg:grid-cols-2
        "
      >
        {/* PHOTO */}

        <div>
          <img
            src="/images/auberge.webp"
            alt="Auberge de St Aubin"
            className="
              h-[280px] sm:h-[320px] md:h-[380px]
              w-full
              rounded-[32px]
              object-cover
              shadow-xl
            "
          />
        </div>

        {/* TEXTE */}

<div className="relative max-w-[550px]">

  <div
    className="
      absolute
      right-0
      bottom-0
      opacity-5
      text-[120px] sm:text-[150px] md:text-[220px]
      pointer-events-none
      select-none
    "
  >
    🏨
  </div>

  <p
    className="
      mb-4
      uppercase
      tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.35em]
      text-[#c89b5f]
    "
  >
    Bienvenue
  </p>

  <h2
    className="
      font-serif
      text-3xl sm:text-4xl
      md:text-5xl
      font-bold
      leading-tight
      text-[#2f241d]
    "
  >
    Bienvenue à
    l’Auberge de
    Saint-Aubin
  </h2>

  <p
    className="
      mt-10
      text-base sm:text-lg
      leading-relaxed
      text-[#5a4c42]
    "
  >
    Depuis plusieurs années,
    l'établissement accueille
    voyageurs, familles et
    professionnels dans une
    ambiance chaleureuse et
    conviviale.
  </p>

  <p
    className="
      mt-6
      text-base sm:text-lg
      leading-relaxed
      text-[#5a4c42]
    "
  >
    Profitez d’une cuisine
    traditionnelle, de chambres
    confortables et d’un cadre
    calme au cœur de la campagne
    bourbonnaise.
  </p>

  <Link
    href="/notre-region"
    className="
      mt-10
      inline-flex
      rounded-2xl
      bg-[#2f241d]
      px-8
      py-4
      font-bold
      text-white
      transition
      hover:bg-[#43352c]
    "
  >
    Activités aux Alentours
  </Link>

</div>
      </div>
    </section>
  )
}
