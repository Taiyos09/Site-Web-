import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import RoomGallery from "@/components/RoomGallery";

import {
  Wifi,
  Tv,
  Bath,
  ParkingCircle,
  Croissant,
  Toilet,
  Briefcase,
  Ruler,
} from "lucide-react"
import Footer from "@/components/Footer"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function RoomPage({
  params,
}: Props) {

  
  const { slug } =
    await params

  const response =
  await fetch(

    `http://localhost:3000/api/rooms`,

    {
      cache: "no-store",
    }
  )

const rooms =
  await response.json()

const room =
  rooms.find(
    (room: any) =>
      room.slug === slug
  )

if (!room) {

  notFound()
}

  const images =
  Array.isArray(room.images)
    ? room.images.map(
        (img: string) =>
          img
            .trim()
            .replace(/\\/g, "/")
      )
    : []

  return (

    <main className="min-h-screen bg-[#f5f1ea] text-[#2f241d]">

      {/* NAVBAR */}
            
                  <Navbar />
            
      {/* HERO */}

      <section
  className="
    relative
    h-[500px]
    md:h-[80px]
    overflow-hidden
  "
>

        <Image
          src={images[0]}
          alt={room.name}
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">

  <h1 className="font-serif text-6xl font-bold">
    {room.name}
  </h1>

  <p className="mt-4 text-xl text-white/90">
    À partir de {room.priceOnePerson}€ / nuit
  </p>

</div>

      </section>

      {/* CONTENU */}

      <section className="mx-auto max-w-[1400px] px-6 py-10">

        <div className="grid gap-20 xl:grid-cols-[1.4fr_500px]">

          {/* GAUCHE */}

          <div>

            {/* GALERIE */}

            <RoomGallery
  images={images}
  roomName={room.name}
/>

            {/* DESCRIPTION */}

            <div className="mt-20">

              <h2 className="mb-8 font-serif text-5xl font-bold">
                {room.name}
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">

  <span className="rounded-full bg-[#c89b5f]/20 px-4 py-2">
    {room.capacity} personnes
  </span>

  <span className="rounded-full bg-[#2f241d]/10 px-4 py-2">
    {room.size}
  </span>

  <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
    Petit déjeuner inclus
  </span>

</div>

              <div className="space-y-6 text-lg leading-relaxed text-[#5a4c42]">

                <p>
                  {room.description}
                </p>

              </div>

            </div>

          </div>

          {/* DROITE */}

          <div>

            <div className="sticky top-32 overflow-hidden rounded-[36px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

              {/* PRIX */}

              <div className="mt-6 rounded-3xl bg-[#f8f4ee] p-6">

  <p className="text-sm text-[#6b5b4f]">
    Tarifs
  </p>

  <div className="mt-4 space-y-3">

    <div className="flex justify-between">
      <span>1 personne</span>
      <strong>{room.priceOnePerson}€</strong>
    </div>

    <div className="flex justify-between">
      <span>2 personnes</span>
      <strong>{room.priceTwoPeople}€</strong>
    </div>

  </div>

</div>

              {/* INFOS */}

              <div className="space-y-5 p-6">

                <div>

                  <h3 className="mb-4 text-2xl font-bold">
                    Informations
                  </h3>

                  <div className="space-y-4 text-[#5a4c42]">

                    <div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Ruler
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      Surface
    </span>

  </div>

  <span className="font-medium">
    {room.size}
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Wifi
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      Wi-Fi
    </span>

  </div>

  <span> Inclus
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Croissant
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      Petit Déjeuner
    </span>

  </div>

  <span> Inclus
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Bath
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      Salle de Bain
    </span>

  </div>

  <span> Privative
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Toilet
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      Toilette
    </span>

  </div>

  <span> Privative
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Briefcase
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      Rangement
    </span>

  </div>

  <span> Oui
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Tv
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      Télévision
    </span>

  </div>

  <span> Oui
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <ParkingCircle
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      Parking
    </span>

  </div>

  <span> Gratuit
  </span>

</div>

                  </div>

                </div>

                {/* CTA */}

                <Link
                  href={`/reservation/${room.slug}`}
                  className="
                    flex items-center justify-center
                    rounded-2xl
                    bg-[#c89b5f]
                    px-8 py-5
                    text-lg font-bold text-white
                    shadow-xl
                    transition-all duration-300
                    hover:scale-[1.02]
                    hover:bg-[#d6aa70]
                  "
                >
                  Réserver cette chambre
                </Link>

              </div>

            </div>

          </div>

          </div>

      </section>

      {/* AUTRES CHAMBRES */}

<section className="mx-auto mt-24 max-w-[1400px] px-6">

  <h2
    className="
      mb-10
      text-center
      font-serif
      text-5xl
      font-bold
    "
  >
    Autres chambres
  </h2>

  <div
    className="
      grid
      gap-8
      md:grid-cols-2
      xl:grid-cols-3
    "
  >

    {rooms
      .filter(
        (r: any) =>
          r.slug !== room.slug
      )
      .slice(0, 3)
      .map((otherRoom: any) => (

        <Link
          key={otherRoom.id}
          href={`/hotel/${otherRoom.slug}`}
          className="
            overflow-hidden
            rounded-[32px]
            bg-white
            shadow-xl
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-2xl
          "
        >

          <div className="relative h-64">

            <Image
              src={
                otherRoom.images?.[0]
              }
              alt={otherRoom.name}
              fill
              className="object-cover"
            />

          </div>

          <div className="p-6">

            <h3
              className="
                mb-3
                font-serif
                text-3xl
                font-bold
              "
            >
              {otherRoom.name}
            </h3>

            <p className="text-[#6b5b4f]">
              À partir de
              {" "}
              {otherRoom.priceOnePerson}€
              / nuit
            </p>

          </div>

        </Link>

      ))}

  </div>

</section>

      {/* FOOTER */}
            
            <Footer />
    </main>
  )
}