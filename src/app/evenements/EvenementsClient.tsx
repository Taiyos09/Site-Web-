"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { EVENTS } from "@/data/events"
import Image from "next/image"

export default function EvenementsPage() {

  const [eventsData, setEventsData] = useState(EVENTS)
const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {

  const interval = setInterval(() => {

    setCurrentImage((prev) => prev + 1)

  }, 3500)

  return () => clearInterval(interval)

}, [])

  return (
  <div
  className="
    relative
    h-screen
    snap-y
    snap-mandatory
    overflow-y-scroll
    scroll-smooth
    text-[#2f241d]
  "
>

  <div
    className="
      fixed
      inset-0
      -z-20
    "
  >

    <Image
      src="/images/festif.png"
      alt="Ambiance festive"
      fill
      priority
      className="object-cover"
      sizes="100vw"
    />

  </div>

      {/* OVERLAY */}
      <div className="fixed inset-0 -z-10 bg-black/45" />

      {/* HERO */}
      <section className="relative snap-start flex min-h-screen items-center justify-center text-white">

        <div className="relative z-10 px-6 text-center">

          <h1
            className="mb-6 text-5xl font-bold font-serif md:text-6xl"
            style={{
              textShadow: `
                0 0 3px rgba(0,0,0,0.95),
                2px 2px 4px rgba(0,0,0,0.9),
                4px 4px 8px rgba(0,0,0,0.85)
              `,
            }}
          >
            Nos événements
          </h1>

          <p
            className="mx-auto max-w-3xl text-lg text-white/90 md:text-xl"
            style={{
              textShadow: `
                0 0 3px rgba(0,0,0,0.95),
                2px 2px 4px rgba(0,0,0,0.9),
                4px 4px 8px rgba(0,0,0,0.85)
              `,
            }}
          >
            Concerts, soirées à thème, karaokés et moments festifs à l'Auberge de St Aubin.
          </p>

        </div>
      </section>

      {/* EVENEMENTS */}
      <section className="mx-auto flex max-w-5xl flex-col gap-16 px-6 pt-0 pb-24">

        {eventsData.map((event, index) => (

          <div
            key={index}
            className="snap-start min-h-screen overflow-hidden rounded-[40px] bg-white/92 shadow-2xl backdrop-blur-sm flex flex-col justify-start"
          >

            {/* IMAGE HERO */}
            <div className="relative h-[220px] md:h-[320px] overflow-hidden">

              <Image
  src={event.image}
  alt={event.title}
  fill
  className="object-cover object-center"
  sizes="(max-width: 768px) 100vw, 1200px"
/>

              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute bottom-6 left-6 text-white">

                <div className="mb-3 inline-block rounded-2xl bg-[#c89b5f] px-4 py-2 text-sm font-serif shadow-xl">
                  {event.date}
                </div>

                <h2
                  className="text-4xl font-bold font-serif"
                  style={{
                    textShadow:
                      "0 2px 10px rgba(0,0,0,0.65)",
                  }}
                >
                  {event.title}
                </h2>

              </div>
            </div>

            {/* CONTENU */}
            <div className="grid gap-10 p-8 lg:grid-cols-[1fr_360px]">

              {/* TEXTE */}
              <div>

                <h3 className="mb-6 text-3xl font-bold font-serif">
                  Présentation
                </h3>

                <p className="text-lg leading-relaxed text-[#5a4c42] font-sans">
                  {event.description}
                </p>

                <p className="mt-6 text-lg leading-relaxed text-[#5a4c42] font-sans">
                  Profitez d’une ambiance conviviale et chaleureuse dans un cadre authentique au cœur du Bourbonnais.
                </p>

              </div>

              {/* DIAPORAMA */}
              <div>

                <h3 className="mb-6 text-center text-3xl font-bold font-serif">
                  Photos des soirées
                </h3>

                <div
  className="
    relative
    h-[260px]
    overflow-hidden
    rounded-3xl
    shadow-2xl
  "
>

                  <Image
  src={
    typeof event.gallery[
      currentImage % event.gallery.length
    ] === "string"

      ? event.gallery[
          currentImage % event.gallery.length
        ]

      : event.gallery[
          currentImage % event.gallery.length
        ]
  }
  alt={event.title}
  fill
  className="
    object-cover
    transition-all
    duration-500
  "
  sizes="(max-width: 768px) 100vw, 360px"
/>

                </div>

              </div>
            </div>

          </div>
        ))}
      </section>

      {/* BOUTON RETOUR */}
      <div className="pb-24 text-center">

        <Link
          href="/"
          className="rounded-2xl bg-[#2f241d] px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#43352c]"
        >
          Retour à l’accueil
        </Link>

      </div>

      {/* FOOTER */}

      <footer
  className="
    bg-[#1f1712]
    px-6
    py-10
    text-center
    text-white/70
  "
>

  <p className="mb-4">
    © 2026 L&apos;Auberge de St Aubin — Tous droits réservés
  </p>

  <Link
    href="/login"
    className="
      text-[11px]
      text-white/20
      transition
      hover:text-white/50
    "
  >
    administration
  </Link>

  <Link href="/mentions-legales">
  Mentions légales
</Link>

<Link href="/confidentialite">
  Confidentialité
</Link>

<Link href="/cgv">
  CGV
</Link>


<Link href="/cookies">
  Cookies
</Link>


</footer>
    </div>
    
  )
}