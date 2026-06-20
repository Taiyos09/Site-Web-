"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export default function EvenementsPage() {

  const [eventsData, setEventsData] = useState<any[]>([])
const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {

  fetch("/api/events")

    .then((res) => res.json())

    .then((data) => {

      setEventsData(data)

    })

    .catch(console.error)

}, [])

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
    min-h-screen
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

      {/* NAVBAR */}
      
            <Navbar />
      
            {/* HERO */}
      <section className="relative h-[75vh] overflow-hidden">

  <Image
    src="/images/festif.png"
    alt="Événements"
    fill
    priority
    className="object-cover"
  />

  <div className="absolute inset-0 bg-black/50" />

  <div className="absolute inset-0 flex items-center justify-center">

    <div className="text-center text-white">

      <p className="mb-4 uppercase tracking-[0.35em] text-[#d6b98c]">
        ÉVÉNEMENTS
      </p>

      <h1 className="font-serif text-6xl font-bold">
        Des moments festifs
        <br />
        toute l'année
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
        Karaokés, repas à thème, soirées musicales
        et événements conviviaux à l'Auberge de St Aubin.
      </p>

    </div>

  </div>

</section>

      <section className="bg-[#f5f1ea] py-24">

  <div className="mx-auto max-w-7xl px-6">

    <div className="mb-12 text-center">

      <p className="uppercase tracking-[0.3em] text-[#c89b5f]">
        ÉVÉNEMENTS À VENIR
      </p>

      <h2 className="mt-4 font-serif text-6xl font-bold text-[#2f241d]">
        Nos prochains rendez-vous
      </h2>

    </div>

    <div className="grid gap-8 lg:grid-cols-3">

  {eventsData.map((event) => {

    const date = new Date(event.date)

    const day = date.toLocaleDateString(
      "fr-FR",
      { day: "2-digit" }
    )

    const month = date
      .toLocaleDateString(
        "fr-FR",
        { month: "short" }
      )
      .replace(".", "")
      .toUpperCase()

    return (

      <div
        key={event.id}
        className="
          group
          relative
          h-[320px]
          overflow-hidden
          rounded-[28px]
        "
      >

        <Image
          src={event.image}
          alt={event.title}
          fill
          className="
            object-cover
            transition-all
            duration-700
            group-hover:scale-105
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/85
            via-black/35
            to-transparent
          "
        />

        {/* DATE */}

        <div
          className="
            absolute
            left-6
            top-6
            z-20
            rounded-2xl
            bg-white
            px-5
            py-3
            text-center
          "
        >

          <div className="text-3xl font-bold text-[#2f241d]">
            {day}
          </div>

          <div
            className="
              text-sm
              font-semibold
              uppercase
              text-[#c89b5f]
            "
          >
            {month}
          </div>

        </div>

        {/* TEXTE */}

        <div
          className="
            absolute
            bottom-6
            left-6
            right-6
            z-20
          "
        >

          <h3
            className="
              mb-2
              font-serif
              text-4xl
              font-bold
              text-white
            "
          >
            {event.title}
          </h3>

          <p className="line-clamp-2 text-white/90">
            {event.description}
          </p>

        </div>

      </div>

    )

  })}

</div>

  </div>

</section>

<section className="bg-[#f5f1ea] pb-24">

  <div className="mx-auto max-w-7xl px-6">

    <div className="mb-12 text-center">

      <p className="uppercase tracking-[0.3em] text-[#c89b5f]">
        SOUVENIRS
      </p>

      <h2 className="mt-4 font-serif text-6xl font-bold text-[#2f241d]">
        Nos soirées en images
      </h2>

    </div>

    <div className="grid gap-6 md:grid-cols-3">

      <img
        src="/images/events/karaoke.jpg"
        className="h-[350px] w-full rounded-[28px] object-cover"
      />

      <img
        src="/images/events/repas.jpg"
        className="h-[350px] w-full rounded-[28px] object-cover"
      />

      <img
        src="/images/events/concert.jpg"
        className="h-[350px] w-full rounded-[28px] object-cover"
      />

    </div>

  </div>

</section>

<section className="bg-[#f5f1ea] pb-24">

  <div
    className="
      mx-auto
      max-w-5xl
      rounded-[36px]
      bg-white
      p-16
      shadow-xl
      text-center
    "
  >

    <p className="uppercase tracking-[0.3em] text-[#c89b5f]">
      ORGANISATION
    </p>

    <h2 className="mt-4 font-serif text-6xl font-bold text-[#2f241d]">
      Organisez votre événement
    </h2>

    <p className="mx-auto mt-8 max-w-3xl text-lg text-[#5a4c42]">
      Repas de groupe, anniversaires,
      associations ou événements privés,
      nous vous accueillons dans une ambiance
      chaleureuse et conviviale.
    </p>

    <Link
      href="/contact"
      className="
        mt-10
        inline-flex
        rounded-2xl
        bg-[#2f241d]
        px-10
        py-4
        font-bold
        text-white
      "
    >
      Nous contacter
    </Link>

  </div>

</section>

      {/* FOOTER */}

      <Footer />
    </div>
    
  )
}