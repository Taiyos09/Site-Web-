"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const images = [
  "/rooms/room1.jpg",
  "/rooms/room2.jpg",
  "/rooms/room3.jpg",
]

export default function RoomsSection() {

  const [currentImage, setCurrentImage] =
    useState(0)

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrentImage((prev) =>
          (prev + 1) % images.length
        )

      }, 5000)

    return () =>
      clearInterval(interval)

  }, [])

  return (

    <section
      className="
        relative
        overflow-hidden
        py-32
      "
    >

      {/* BACKGROUND */}

      <div
        className="
          absolute
          inset-0
          z-0
        "
      >

        <Image
          src="/images/room.jpg"
          alt="Background chambres"
          fill
          className="object-cover"
        />

        <div
          className="
            absolute
            inset-0
            bg-black/10
          "
        />

      </div>

      <div
        className="
          relative
          z-10

          mx-auto
          grid
          max-w-7xl
          items-center
          gap-20
          px-6

          lg:grid-cols-2
        "
      >

        {/* CONTENT */}

        <div
          className="
            rounded-[40px]
            bg-[#f7f2ea]/90
            p-12
            shadow-2xl
            backdrop-blur-sm
          "
        >

          <p
            className="
              mb-5
              text-sm
              uppercase
              tracking-[0.4em]
              text-[#c89b5f]
            "
          >
            Chambre d'hôte
          </p>

          <h2
            className="
              font-serif
              text-6xl
              leading-none
              text-[#2f241d]
            "
          >
            Des chambres
            confortables et
            authentiques
          </h2>

          <p
            className="
              mt-8
              text-xl
              leading-relaxed
              text-[#6b5b4f]
            "
          >
            Profitez d’un séjour calme
            et chaleureux dans notre
            auberge bourbonnaise.
          </p>

          {/* BADGES */}

          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-4
            "
          >
            <div
              className="
                rounded-full
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                shadow-md
              "
            >
              🥐 Petit Déjeuner Compris
            </div>
            <div
              className="
                rounded-full
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                shadow-md
              "
            >
              🛏 Chambres doubles
            </div>

            <div
              className="
                rounded-full
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                shadow-md
              "
            >
              🚿 Salle de bain et toilette privatif
            </div>

            <div
              className="
                rounded-full
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                shadow-md
              "
            >
              📺 Télévision inclus
            </div>

            <div
              className="
                rounded-full
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                shadow-md
              "
            >
              📶 Wi-Fi gratuit
            </div>

          </div>

          {/* BUTTON */}

          <div className="mt-12">

            <Link
              href="/hotel?scroll=chambres"

              className="
                inline-flex
                items-center
                justify-center

                rounded-2xl
                bg-[#2f241d]

                px-8
                py-5

                text-lg
                font-bold
                text-white

                transition-all
                duration-300

                hover:scale-105
                hover:bg-[#43352c]
              "
            >
              Réserver une chambre
            </Link>

          </div>

        </div>

        {/* SLIDER */}

        <div
          className="
            relative
            h-[700px]
            overflow-hidden
            rounded-[40px]
            shadow-2xl
          "
        >

          {images.map((image, index) => (

            <div
              key={image}

              className={`
                absolute
                inset-0

                transition-all
                duration-1000

                ${
                  currentImage === index

                    ? `
                      opacity-100
                      scale-100
                    `

                    : `
                      opacity-0
                      scale-105
                    `
                }
              `}
            >

              <Image
                src={image}
                alt="Chambre"
                fill
                className="object-cover"
              />

            </div>

          ))}

          {/* DOTS */}

          <div
            className="
              absolute
              bottom-6
              left-1/2
              flex
              -translate-x-1/2
              gap-3
            "
          >

            {images.map((_, index) => (

              <button
                key={index}

                onClick={() =>
                  setCurrentImage(index)
                }

                className={`
                  h-3
                  w-3
                  rounded-full
                  transition-all

                  ${
                    currentImage === index

                      ? "bg-white"

                      : "bg-white/40"
                  }
                `}
              />

            ))}

          </div>

        </div>

      </div>

      {/* DEGRADE BAS */}

  <div
  className="
    pointer-events-none
    absolute
    bottom-0
    left-0
    h-20
    w-full
    bg-gradient-to-b
    from-transparent
    via-[#f5f1ea]/40
    to-[#f5f1ea]
  "
/>

    </section>
  )
}