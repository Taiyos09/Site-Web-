"use client"

import { notFound } from "next/navigation"
import BookingCalendar from "@/components/hotel/BookingCalendar"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Room = {
  id: number
  name: string
  slug: string
  size: string
  description: string

  one_person_price: number
  two_people_price: number

  image_1: string
  image_2: string
  image_3: string
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

      const { data, error } =
        await supabase
          .from("rooms")
          .select("*")
          .eq("slug", slug)
          .single()

      if (error || !data) {

        console.error(error)

        setRoom(null)

        return
      }

      setRoom(data)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  if (loading) {

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

  return (

    <main className="
      min-h-screen
      bg-[#f5f1ea]
      text-[#2f241d]
    ">

      {/* HERO */}

      <section className="
        relative
        h-[45vh]
        overflow-hidden
      ">

        <img
          src={room.image_1}
          alt={room.name}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />

        <div className="
          absolute
          inset-0
          bg-black/50
        " />

        <div className="
          relative
          z-10
          flex
          h-full
          items-end
        ">

          <div className="
            mx-auto
            w-full
            max-w-[1600px]
            px-8
            pb-16
          ">

            <h1 className="
              font-serif
              text-5xl
              font-bold
              text-white
              md:text-7xl
            ">
              Réservation
            </h1>

            <p className="
              mt-4
              text-xl
              text-white/90
            ">
              {room.name}
            </p>

          </div>

        </div>

      </section>

      {/* CONTENU */}

      <section className="
        mx-auto
        max-w-[1600px]
        px-8
        py-20
      ">

        <div className="
          grid
          gap-14
          xl:grid-cols-[1fr_520px]
        ">

          {/* GAUCHE */}

          <div>

            <div className="
              overflow-hidden
              rounded-[36px]
              bg-white
              shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            ">

              <img
                src={room.image_2}
                alt={room.name}
                className="
                  h-[420px]
                  w-full
                  object-cover
                "
              />

              <div className="p-10">

                <h2 className="
                  mb-6
                  font-serif
                  text-4xl
                  font-bold
                ">
                  {room.name}
                </h2>

                <p className="
                  mb-4
                  text-lg
                  text-[#8a6330]
                ">
                  {room.size}
                </p>

                <p className="
                  text-lg
                  leading-relaxed
                  text-[#5a4c42]
                ">
                  {room.description}
                </p>

              </div>

            </div>

          </div>

          {/* DROITE */}

          <div className="
            sticky
            top-28
            h-fit
          ">

            <BookingCalendar
  onePersonPrice={
    Number(room.one_person_price)
  }
  twoPeoplePrice={
    Number(room.two_people_price)
  }
  roomName={room.name}
  roomSlug={room.slug}
/>

          </div>

        </div>

      </section>

    </main>
  )
}