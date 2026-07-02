"use client"

import {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react"

import { motion } from "framer-motion"
import { getHotelData } from "@/lib/hotel"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"


function HotelContent() {

  const [hotelConfig, setHotelConfig] =
    useState<any>(null)

  const searchParams = useSearchParams()

  const [currentImages, setCurrentImages] =
    useState<number[]>([])

  const [breakfast, setBreakfast] =
    useState(false)
    const [lunch, setLunch] =
    useState(false)

  const [dinner, setDinner] =
    useState(false)

  const [petCount, setPetCount] =
    useState(0)

  const [people, setPeople] =
    useState(1)

  const [checkIn, setCheckIn] =
    useState("")

  const [checkOut, setCheckOut] =
    useState("")

  const [searchCheckIn, setSearchCheckIn] =
    useState("")

  const [searchCheckOut, setSearchCheckOut] =
    useState("")

  const [searchPeople, setSearchPeople] =
  useState(1)

  const [searchError, setSearchError] =
  useState("")

  const [loading, setLoading] =
    useState(false)

  /* ====================================== */
  /* ANIMATION */
  /* ====================================== */

  const fadeUp = {

    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.7,
      },
    },
  }

  /* ====================================== */
  /* NIGHTS */
  /* ====================================== */

  const nights = useMemo(() => {

    if (!searchCheckIn || !searchCheckOut)
      return 1

    const start =
      new Date(searchCheckIn)

    const end =
      new Date(searchCheckOut)

    const diff =
      end.getTime() -
      start.getTime()

    const total = Math.ceil(
      diff /
      (1000 * 60 * 60 * 24)
    )

    return total > 0 ? total : 1

  }, [searchCheckIn, searchCheckOut])

  const handleSearch = () => {

  if (!checkIn || !checkOut) {

    setSearchError(
      "Veuillez sélectionner une date d'arrivée et de départ."
    )

    return
  }

  setSearchError("")

  setSearchPeople(people)

  setSearchCheckIn(checkIn)

  setSearchCheckOut(checkOut)

  const chambresSection =
    document.getElementById("chambres")

  chambresSection?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

  /* ====================================== */
  /* LOAD HOTEL */
  /* ====================================== */

  useEffect(() => {

  const loadHotel =
    async () => {

      try {

        const data =
          await getHotelData()

        console.log(
          "HOTEL DATA:",
          data
        )

        if (!data) {

          console.error(
            "Aucune donnée hôtel"
          )

          return
        }

        const formattedRooms =
  (data.rooms || []).map(
    (room: any) => {

      let images: string[] = []

      // CAS ARRAY
      if (Array.isArray(room.images)) {

        images = room.images.map(
          (img: string) =>

            img
              .trim()
              .replace(/\r/g, "")
              .replace(/\n/g, "")
              .replace(/\t/g, "")
              .replace(/\\/g, "/")
        )
      }

      // CAS STRING
      else if (
        typeof room.images === "string"
      ) {

        images = room.images

          .replace("[", "")
          .replace("]", "")
          .replaceAll('"', "")

          .split(",")

          .map((img: string) =>

            img

              .trim()

              .replace(/\r/g, "")
              .replace(/\n/g, "")
              .replace(/\t/g, "")

              .replace(/\\/g, "/")
          )

          .filter(Boolean)
      }

      return {
        ...room,
        images,
      }
    }
  )

        setHotelConfig({

          rooms: formattedRooms,

          options: {

            breakfast:
              data.settings?.breakfast || 0,

            lunch:
              data.settings?.lunch || 0,

            dinner:
              data.settings?.dinner || 0,

            pet:
              data.settings?.pet || 0,

            touristTax:
              data.settings?.tourist_tax || 0,
          },
        })

        setCurrentImages(
          formattedRooms.map(() => 0)
        )

      } catch (error) {

        console.error(
          "Erreur chargement hôtel :",
          error
        )

      }

    }

  loadHotel()

}, [])

  /* ====================================== */
  /* AUTO SLIDER */
  /* ====================================== */

  useEffect(() => {

    if (!hotelConfig?.rooms)
      return

    const interval =
      setInterval(() => {

        setCurrentImages((prev) => {

          return prev.map(
            (value, index) => {

              const totalImages =
                hotelConfig.rooms[
                  index
                ]?.images?.length || 1

              return (
                value + 1
              ) % totalImages
            }
          )
        })

      }, 3500)

    return () =>
      clearInterval(interval)

  }, [hotelConfig])

    /* ====================================== */
  /* SCROLL TO CHAMBRES */
  /* ====================================== */

  useEffect(() => {

    const scrollTarget =
      searchParams.get("scroll")

    if (
      scrollTarget === "chambres"
    ) {

      setTimeout(() => {

        const element =
          document.getElementById(
            "chambres"
          )

        if (element) {

          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })

        }

      }, 300)
    }

  }, [searchParams, hotelConfig])

  if (!hotelConfig) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#f5f1ea]
        "
      >
        Chargement...
      </div>
    )
  }

const filteredRooms =
  hotelConfig.rooms.filter(
    (room: any) => {

      if (
        room.capacity <
        searchPeople
      ) {
        return false
      }

      if (
  !searchCheckIn ||
  !searchCheckOut
) {
  return true
}

      const occupied =
        room.reservations?.some(
          (r: any) => {

            if (
              r.reservation.status ===
              "refused"
            ) {
              return false
            }

            const arrival =
              new Date(
                r.reservation.arrival
              )

            const departure =
              new Date(
                r.reservation.departure
              )

            return (
              new Date(searchCheckIn) <
                departure &&
              new Date(searchCheckOut) >
                arrival
            )
          }
        )

      return !occupied
    }
  )

  return (

    <div
      className="
        bg-[#f5f1ea]
        text-[#2f241d]
      "
    >

      {/* NAVBAR */}
      
            <Navbar />
      
    {/* HERO */}

      <section
  className="
    relative
    flex
    h-[60vh]
    min-h-[500px]
    max-h-[600px]
    items-center
    justify-center
    overflow-hidden
    border-b
    border-[#e4d8c8]
  "
>

  <Image
    src="/images/hotel/HERO.webp"
    alt="Hôtel Auberge de St Aubin"
    fill
    priority
    className="object-cover"
    sizes="100vw"
  />

        <div
  className="
    absolute
    inset-x-0
    bottom-0
    h-24
    bg-gradient-to-t
    from-[#f5f1ea]
    via-[#f5f1ea]/70
    to-transparent
    pointer-events-none
  "
/>

        <div
          className="
            absolute
            inset-0
            bg-black/45
          "
        />
        <div
  className="
    relative
    z-10
    px-6
    text-center
    text-white
  "
>

  <h1
    className="
      font-serif
      text-5xl
      font-bold
      md:text-7xl
    "
  >
    Nos Chambres
  </h1>

  <p
    className="
      mx-auto
      mt-6
      max-w-3xl
      text-lg
      text-white/90
      md:text-2xl
    "
  >
    Profitez d'un séjour calme et confortable
    au cœur du Bourbonnais dans l'une de nos
    chambres de caractère.
  </p>

  <div
    className="
      mt-8
      inline-flex
      rounded-full
      bg-white/20
      px-6
      py-3
      backdrop-blur
    "
  >
    À partir de 88€ / nuit
  </div>

  <div className="mt-8">

    <button
      onClick={() =>
        document
          .getElementById("chambres")
          ?.scrollIntoView({
            behavior: "smooth",
          })
      }
      className="
        rounded-2xl
        bg-[#c89b5f]
        px-8
        py-4
        text-lg
        font-bold
        text-white
        transition
        hover:scale-105
      "
    >
      Voir nos chambres
    </button>

  </div>

</div>

      </section>

    <section
  className="
    relative
    z-20
    mx-auto
    -mt-10
    max-w-5xl
    px-8
  "
>

  {searchError && (

  <div
    className="
      mb-4
      rounded-2xl
      border
      border-red-200
      bg-red-50
      px-5
      py-3
      text-center
      font-medium
      text-red-600
    "
  >
    {searchError}
  </div>

)}

  <div
    className="
      rounded-[32px]
      bg-white
      p-6
      shadow-2xl
    "
  >

    <div
      className="
        grid
        gap-4
        md:grid-cols-4
      "
    >

      <div className="flex flex-col gap-2">
  <label className="text-sm font-medium text-[#5a4c42] text-center">
    Date d'arrivée
  </label>

  <input
    type="date"
    value={checkIn}
    onChange={(e) =>
      setCheckIn(e.target.value)
    }
    className="
      w-full
      rounded-2xl
      border
      px-4
      py-4
    "
  />
</div>

<div className="flex flex-col gap-2">
  <label className="text-sm font-medium text-[#5a4c42] text-center">
    Date de départ
  </label>

  <input
    type="date"
    value={checkOut}
    onChange={(e) =>
      setCheckOut(e.target.value)
    }
    className="
      w-full
      rounded-2xl
      border
      px-4
      py-4
    "
  />
</div>

<div className="flex flex-col gap-2">
  <label className="text-sm font-medium text-[#5a4c42] text-center">
    Nombre de personnes
  </label>
      <input
  type="number"
  min={1}
  max={8}
  value={people}
  onChange={(e) =>
    setPeople(
      Math.max(
        1,
        Number(e.target.value)
      )
    )
  }
  className="
    w-full
    rounded-2xl
    border
    px-4
    py-4
    "
/>
</div>

      <button
  onClick={handleSearch}
  className="
    rounded-2xl
    bg-[#2f241d]
    px-8
    py-4
    font-semibold
    text-white
  "
>
  Découvrir nos chambres
</button>

    </div>

  </div>

</section>

{/* SERVICES */}

<section
  className="
    py-16
    bg-[#f5f1ea]
  "
>

  <div
    className="
      mx-auto
      max-w-7xl
      px-6
    "
  >

    <div
      className="
        mb-10
        text-center
      "
    >

      <p
        className="
          uppercase
          tracking-[0.3em]
          text-[#c89b5f]
        "
      >
        Services inclus
      </p>

      <h2
        className="
          mt-3
          font-serif
          text-5xl
          text-[#2f241d]
        "
      >
        Tout pour votre confort
      </h2>

    </div>

    <div
      className="
        grid
        gap-6
        md:grid-cols-3
        lg:grid-cols-4
      "
    >

      {[
        {
          icon: "📶",
          title: "Wifi gratuit",
        },

        {
          icon: "🚿",
          title: "Salle de bain privative",
        },

        {
          icon: "📺",
          title: "Télévision",
        },

        {
          icon: "🚗",
          title: "Parking",
        },
      ].map((item) => (

        <div
          key={item.title}
          className="
            rounded-[28px]
            bg-white
            p-6
            text-center
            shadow-lg
          "
        >

          <div className="text-4xl">
            {item.icon}
          </div>

          <p
            className="
              mt-4
              font-semibold
            "
          >
            {item.title}
          </p>

        </div>

      ))}

    </div>

  </div>

</section>

 {/* CHAMBRES */}

      <motion.section
        variants={fadeUp}
        id="chambres"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
    relative
    overflow-hidden
    border-t
    border-[#e4d8c8]
  pt-0
  pb-20"
>

        <div
          className="
            mx-auto
            max-w-7xl
            px-6
          "
        >

          <div
  className="
    py-16
    text-center
  "
>

  <p
    className="
      uppercase
      tracking-[0.3em]
      text-[#c89b5f]
    "
  >
    Nos chambres
  </p>

  <h2
    className="
      mt-3
      font-serif
      text-5xl
      text-[#2f241d]
    "
  >
    Trouvez votre chambre idéale
  </h2>

</div>

<div
            className="
  grid
  gap-8
  md:grid-cols-2
  xl:grid-cols-3
"
          >

            {filteredRooms.map(
              (room: any, roomIndex: number) => (

                <div
                  key={room.id}
                  className="
                    overflow-hidden
                    rounded-[36px]
                    bg-[#f3ede3]/95
                    shadow-xl
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]
                  "
                >

                  {/* diaporama */}

                  <div
  className="
    relative
    w-full
    h-[260px]
    overflow-hidden
  "
>

  {(room.images ?? []).map(
    (
      img: string,
      imgIndex: number
    ) => (

      <img
        key={imgIndex}
        src={img}
        alt={room.name}
        className={`
          absolute
          inset-0
          w-full
          h-full
          object-cover
          transition-opacity
          duration-1000
          ${
            imgIndex ===
            (currentImages[roomIndex] ?? 0)
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      />

    )
  )}

  <div
    className="
      absolute
      right-4
      top-4
      z-20
      rounded-full
      bg-[#f3ede3]/90
      px-4
      py-2
      text-sm
      font-bold
      text-[#8a6330]
    "
  >
    {room.size}
  </div>

</div>

                  {/* CONTENU */}

                  <div className="p-6">

                    <h3
                      className="
                        mb-4
                        font-serif
                        text-2xl
                        font-bold
                      "
                    >
                      {room.name}
                    </h3>

                    <p
                      className="
                        mb-6
                        leading-relaxed
                        text-[#5a4c42]
                      "
                    >
                      {room.description}
                    </p>

                    <div
  className="
    mb-4
    inline-flex
    rounded-full
    bg-[#ede4d6]
    px-3
    py-1
    text-sm
    font-semibold
    text-[#8a6330]
  "
>
  👤 Jusqu'à {room.capacity} personne{room.capacity > 1 ? "s" : ""}
</div>
                    

                    <div
                      className="
                        mb-6
                        flex
                        items-center
                        justify-between
                        border-t
                        border-[#d8cbbb]
                        pt-5
                      "
                    >

                      <span
                        className="
                          text-2xl
                          font-bold
                        "
                      >
                        {room.priceOnePerson}€
                      </span>

                      <span
                        className="
                          text-sm
                          text-[#7a6a5d]
                        "
                      >
                        par nuit
                      </span>

                    </div>

                    <Link
                      href={`/chambres/${room.slug}`}
                      className="
                        flex
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#2f241d]
                        px-6
                        py-3.5
                        text-lg
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#43352c]
                      "
                    >
                      Découvrir la chambre
                    </Link>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </motion.section>

      <section
  className="
    py-20
    bg-[#f5f1ea]
  "
>

  <div
    className="
      mx-auto
      max-w-5xl
      px-6
    "
  >

    <div
      className="
        rounded-[36px]
        bg-white
        p-10
        shadow-xl
        text-center
      "
    >

      <p
        className="
          uppercase
          tracking-[0.3em]
          text-[#c89b5f]
        "
      >
        Informations pratiques
      </p>

      <h2
        className="
          mt-3
          font-serif
          text-4xl
          text-[#2f241d]
        "
      >
        Préparer votre séjour
      </h2>

      <div
        className="
          mt-8
          grid
          gap-6
          md:grid-cols-2
        "
      >

        <div>
          <u><strong>Arrivée</strong></u>
          <p>À partir de 16h</p>
        </div>

        <div>
          <u><strong>Départ</strong></u>
          <p>Avant 11h</p>
        </div>

        <div>
          <u><strong>Parking</strong></u>
          <p>Gratuit pour les clients</p>
        </div>

      </div>

    </div>

  </div>

</section>

      {/* FOOTER */}
      
      <Footer />

    </div>
  )
}

export default function HotelPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          Chargement...
        </main>
      }
    >
      <HotelContent />
    </Suspense>
  )
}