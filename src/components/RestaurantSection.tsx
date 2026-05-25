"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"

const images = [
  "/restaurant/resto1.jpeg",
  "/restaurant/resto2.jpeg",
  "/restaurant/resto3.jpeg",
]

export default function RestaurantSection() {

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
        z-10
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
          src="/images/table.png"
          alt="Restaurant background"
          fill
          className="object-cover"
        />

        <div
          className="
            absolute
            inset-0
            bg-black/5
          "
        />

      </div>

      <div
        className="
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-20
          px-6

          lg:grid-cols-2
        "
      >

        {/* SLIDER */}

        <div
          className="
            relative
            h-[650px]
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
                alt="Restaurant"
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

        {/* CONTENT */}

        <div
          className="
            rounded-[40px]
            bg-[#f7f2ea]/88
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
            Restaurant & Bar
          </p>

          <h2
            className="
              font-serif
              text-6xl
              leading-none
              text-[#2f241d]
            "
          >
            Cuisine
            traditionnelle et
            ambiance conviviale
          </h2>

          <p
            className="
              mt-8
              text-xl
              leading-relaxed
              text-[#6b5b4f]
            "
          >
            Découvrez une cuisine
            conviviale avec carte fixe,
            menu du jour et soirées
            à thème dans une ambiance
            chaleureuse bourbonnaise.
          </p>

          <div
            className="
              mt-10

              flex
              flex-wrap
              items-center
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
              🍷 Bar convivial
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
              🍽 Menu du jour
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
              🎵 Soirées événements
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
              🎵 groupe possible
            </div>

          </div>

          <div className="mt-12">

          <Link
            href="/restaurant#carte"
            className="
              mt-12
              shrink-0
              rounded-2xl
              bg-[#c89b5f]
              px-8
              py-5
              text-lg
              font-bold
              text-white
              transition-all
              duration-300

              hover:scale-105
              hover:bg-[#b98746]
            "
          >
            Voir la carte
          </Link>
          </div>

        </div>

      </div>

    </section>
  )
}