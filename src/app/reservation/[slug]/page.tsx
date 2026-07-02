"use client"

import { notFound } from "next/navigation"
import BookingCalendar from "@/components/hotel/BookingCalendar"
import { useEffect, useState } from "react"
import Link from "next/link"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

type Room = {
  id: number
  name: string
  slug: string
  size: string
  description: string
  capacity: number

  priceOnePerson: number
  priceTwoPeople: number

  images: string[]
}

export default function ReservationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const [slug, setSlug] =
    useState("")

  const [room, setRoom] =
    useState<Room | null>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

  const getSlug = async () => {

    const resolvedParams =
      await params

    setSlug(
      resolvedParams.slug
    )
  }

  getSlug()

}, [params])

useEffect(() => {

  if (!slug) return

  loadRoom()

}, [slug])

  async function loadRoom() {

    try {

      const response =
  await fetch(

    "http://localhost:3000/api/rooms",

    {
      cache: "no-store",
    }
  )

const rooms =
  await response.json()

const data =
  rooms.find(
    (room: any) =>
      room.slug === slug
  )

if (!data) {

  setRoom(null)

  console.log(room)

  return
}

setRoom(data)

      setRoom(data)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  if (loading) {

console.log(room)
    return (
      <div className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#f5f1ea]
      ">
        Chargement...
      </div>
    )
  }

  if (!room) {
    notFound()
  }
console.log(room)
  return (


    <main className="
      min-h-screen
      bg-[#f5f1ea]
      text-[#2f241d]
    ">
      {/* NAVBAR */}

      <Navbar />

    {/* HERO */}

      <section
  className="
    relative
    h-[260px]
    overflow-hidden
  "
>
  <img
    src={room.images?.[0]}
    alt={room.name}
    className="
      absolute
      inset-0
      h-full
      w-full
      object-cover
    "
  />

  <div className="absolute inset-0 bg-black/55" />

  <div
    className="
      relative
      z-10
      flex
      h-full
      items-center
      justify-center
      text-center
      px-6
    "
  >
    <div>

      <p
        className="
          mb-2
          uppercase
          tracking-[0.3em]
          text-[#d6b98c]
        "
      >
        Auberge de St Aubin
      </p>

      <h1
        className="
          font-serif
          text-4xl
          md:text-6xl
          font-bold
          text-white
        "
      >
        Réserver votre séjour
      </h1>

      <p
        className="
          mt-3
          text-white/90
        "
      >
        {room.name} • {room.size}
      </p>

    </div>
  </div>
</section>

      {/* CONTENU */}

      <section className="
        mx-auto
        max-w-[1300px]
        px-6
        py-12
      ">

        <div className="
          grid
          gap-14
          xl:grid-cols-[1fr_520px]
        ">

          {/* GAUCHE */}

          {/* GAUCHE */}

<div className="space-y-8">

  {/* GALERIE */}

  <div className="grid gap-4">

    <img
      src={room.images?.[0]}
      alt={room.name}
      className="
        h-[420px]
        w-full
        rounded-[32px]
        object-cover
        shadow-xl
      "
    />

    <div className="grid grid-cols-2 gap-4">

      {room.images?.slice(1, 3).map(
        (img, index) => (

          <img
            key={index}
            src={img}
            alt={room.name}
            className="
              h-[180px]
              w-full
              rounded-[24px]
              object-cover
              shadow-lg
            "
          />

        )
      )}

    </div>

  </div>

  {/* FICHE CHAMBRE */}

  <div
    className="
      rounded-[32px]
      bg-white
      p-8
      shadow-xl
    "
  >

    <div className="flex items-center gap-4 mb-4">

      <span
        className="
          rounded-full
          bg-[#f2e7d7]
          px-4
          py-2
          text-sm
          font-semibold
          text-[#8a6330]
        "
      >
        {room.size}
      </span>

      <span
        className="
          rounded-full
          bg-[#f2e7d7]
          px-4
          py-2
          text-sm
          font-semibold
          text-[#8a6330]
        "
      >
        Jusqu'à {room.capacity} personnes
      </span>

    </div>

    <h2
      className="
        mb-4
        font-serif
        text-4xl
        font-bold
      "
    >
      {room.name}
    </h2>

    <p
      className="
        text-lg
        leading-relaxed
        text-[#5a4c42]
      "
    >
      {room.description}
    </p>

  </div>

</div>

          {/* DROITE */}

          <div className="
            sticky
            top-28
            h-fit
          ">

            <BookingCalendar

  roomId={room.id}

  priceOnePerson={
    room.priceOnePerson
  }

  priceTwoPeople={
    room.priceTwoPeople
  }

  roomName={room.name}

  roomSlug={room.slug}
  
  roomCapacity={room.capacity}
/>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <Footer />

    </main>

    
  )
}