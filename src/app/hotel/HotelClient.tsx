"use client"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import { motion } from "framer-motion"
import { getHotelData } from "@/lib/hotel"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

export default function HotelPage() {

  const [hotelConfig, setHotelConfig] =
    useState<any>(null)

  const searchParams = useSearchParams()

  const [currentImages, setCurrentImages] =
    useState<number[]>([])

  const [lunch, setLunch] =
    useState(false)

  const [dinner, setDinner] =
    useState(false)

  const [petCount, setPetCount] =
    useState(0)

  const [people, setPeople] =
    useState(0)

  const [checkIn, setCheckIn] =
    useState("")

  const [checkOut, setCheckOut] =
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

    if (!checkIn || !checkOut)
      return 1

    const start =
      new Date(checkIn)

    const end =
      new Date(checkOut)

    const diff =
      end.getTime() -
      start.getTime()

    const total = Math.ceil(
      diff /
      (1000 * 60 * 60 * 24)
    )

    return total > 0 ? total : 1

  }, [checkIn, checkOut])

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

  return (

    <div
      className="
        bg-[#f5f1ea]
        text-[#2f241d]
      "
    >

      {/* HERO */}

      <section
  className="
    relative
    flex
    h-screen
    min-h-[760px]
    items-center
    justify-center
    overflow-hidden
    border-b
    border-[#e4d8c8]
  "
>

  <Image
    src="/images/hotel/HERO.jpg"
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
              mb-5
              font-serif
              text-5xl
              font-bold
              md:text-7xl
            "
          >
            Hôtel
          </h1>

          <p
            className="
              mx-auto
              max-w-2xl
              text-lg
              leading-relaxed
              text-white/90
              md:text-xl
            "
          >
            Découvrez nos chambres
            chaleureuses et profitez
            d’un séjour confortable
            dans une ambiance simple
            et conviviale.
          </p>

        </div>

      </section>

      {/* PRESENTATION */}

      <motion.section
        variants={fadeUp}
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
    py-20
    pt-24
    md:py-28
  "
>

  <Image
    src="/images/hotel/fd1.png"
    alt="Fond hôtel"
    fill
    className="object-cover"
    sizes="100vw"
  />

        <div
          className="
            absolute
            inset-0
            bg-black/25
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-6xl
            items-center
            gap-16
            px-6
            lg:grid-cols-2
          "
        >

          {/* TEXTE */}

          <div
            className="
              rounded-[28px]
              bg-[#f6f1e8]/88
              p-8
              shadow-xl
              backdrop-blur-sm
            "
          >

            <h2
              className="
                mb-6
                font-serif
                text-4xl
                font-bold
                leading-tight
                md:text-5xl
              "
            >
              Un séjour au calme
              au cœur de la
              campagne bourbonnaise
            </h2>

            <div
              className="
                space-y-5
                text-lg
                leading-relaxed
                text-[#5a4c42]
              "
            >

              <p>
                Nos chambres vous
                accueillent dans une
                ambiance simple,
                chaleureuse et
                authentique.
              </p>

              <p>
                Que vous soyez de
                passage dans l’Allier
                ou en séjour dans la
                région, profitez d’un
                cadre calme et familial.
              </p>

              <p>
                Lors de votre réservation,
                vous pourrez ajouter
                différentes options
                comme le petit déjeuner
                ou les repas.
              </p>

            </div>

          </div>

          {/* IMAGE */}

          <div
  className="
    relative
    h-[520px]
    w-full
    max-w-[680px]
    overflow-hidden
    rounded-[28px]
    shadow-2xl
  "
>

  <Image
    src="/images/gab.png"
    alt="Chambre de l'Auberge"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 680px"
  />

</div>

        </div>

      </motion.section>

      {/* INFOS */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
          border-t
          border-[#e4d8c8]
          bg-[#efe7db]
          py-20
          md:py-28
        "
      >

        <div
          className="
            mx-auto
            max-w-6xl
            px-6
          "
        >

          <div className="mb-14 text-center">

            <p
              className="
                mb-3
                text-sm
                uppercase
                tracking-[0.3em]
                text-[#b18752]
              "
            >
              Informations pratiques
            </p>

            <h2
              className="
                font-serif
                text-4xl
                font-bold
                md:text-5xl
              "
            >
              Horaires & services
            </h2>

          </div>

          <div
            className="
              grid
              gap-8
              md:grid-cols-2
              xl:grid-cols-4
            "
          >

            {[
              {
                title: "🛎️ Arrivée",
                text: "Check-in à partir de",
                value: "16h00",
              },

              {
                title: "🚪 Départ",
                text: "Check-out avant",
                value: "11h00",
              },

              {
                title: "🥐 Petit déjeuner Compris",
                text: "Service de",
                value: "7h00 à 9h00",
              },

              {
                title: "🍽️ Restaurant",
                text: "Midi : 12h00 - 14h00\nSoir : 19h00 - 21h00",
                value: "",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="
                  rounded-[28px]
                  bg-white
                  p-8
                  shadow-md
                "
              >

                <h3
                  className="
                    mb-5
                    font-serif
                    text-2xl
                    font-bold
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    whitespace-pre-line
                    text-lg
                    leading-relaxed
                    text-[#5a4c42]
                  "
                >
                  {item.text}

                  {item.value && (
                    <>
                      <br />

                      <span className="font-bold">
                        {item.value}
                      </span>
                    </>
                  )}

                </p>

              </div>

            ))}

          </div>

        </div>

      </motion.section>

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
    py-20
    md:py-28
  "
>

  <Image
    src="/images/hotel/bois.jpg"
    alt="Fond chambres"
    fill
    className="object-cover"
    sizes="100vw"
  />

        <div
          className="
            mx-auto
            max-w-7xl
            px-6
          "
        >

          <div className="mb-16 text-center">

            <p
              className="
                mb-3
                text-sm
                uppercase
                tracking-[0.3em]
                text-[#b18752]
              "
            >
              Hébergement
            </p>

            <h2
              className="
                font-serif
                text-4xl
                font-bold
                md:text-5xl
              "
            >
              Nos chambres
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

            {(hotelConfig?.rooms ?? []).map(
              (room: any, roomIndex: number) => (

                <div
                  key={room.id}
                  className="
                    overflow-hidden
                    rounded-[28px]
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
    h-[240px]
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