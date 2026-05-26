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
        py-20
        md:py-32
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
          sizes="100vw"
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
          gap-10
          px-4
          md:px-6
          lg:grid-cols-2
          lg:gap-16
        "
      >

        {/* CONTENT */}

        <div
          className="
            rounded-[32px]
            bg-[#f7f2ea]/90
            p-6
            shadow-2xl
            backdrop-blur-sm
            md:p-10
            lg:p-12
          "
        >

          <p
            className="
              mb-5
              text-xs
              uppercase
              tracking-[0.3em]
              text-[#c89b5f]
              md:text-sm
              md:tracking-[0.4em]
            "
          >
            Chambre d'hôte
          </p>

          <h2
            className="
              font-serif
              text-4xl
              leading-tight
              text-[#2f241d]
              md:text-5xl
              lg:text-6xl
            "
          >
            Des chambres
            confortables et
            authentiques
          </h2>

          <p
            className="
              mt-6
              text-base
              leading-relaxed
              text-[#6b5b4f]
              md:mt-8
              md:text-lg
              lg:text-xl
            "
          >
            Profitez d’un séjour calme
            et chaleureux dans notre
            auberge bourbonnaise.
          </p>

          {/* BADGES */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-3
              md:mt-10
              md:gap-4
            "
          >

            {[
              "🥐 Petit Déjeuner Compris",
              "🛏 Chambres doubles",
              "🚿 Salle de bain et toilette privatif",
              "📺 Télévision inclus",
              "📶 Wi-Fi gratuit",
            ].map((item) => (

              <div
                key={item}
                className="
                  rounded-full
                  bg-white
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  shadow-md
                  md:px-5
                  md:py-3
                  md:text-sm
                "
              >
                {item}
              </div>

            ))}

          </div>

          {/* BUTTON */}

          <div className="mt-10 md:mt-12">

            <Link
              href="/hotel?scroll=chambres"

              className="
                inline-flex
                w-full
                items-center
                justify-center
                rounded-2xl
                bg-[#2f241d]
                px-6
                py-4
                text-base
                font-bold
                text-white
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:bg-[#43352c]
                sm:w-auto
                md:px-8
                md:py-5
                md:text-lg
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
            h-[320px]
            overflow-hidden
            rounded-[32px]
            shadow-2xl
            sm:h-[420px]
            md:h-[520px]
            lg:h-[700px]
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
                sizes="(max-width: 1024px) 100vw, 50vw"
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

    </section>
  )
}