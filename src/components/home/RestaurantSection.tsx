"use client"

import Image from "next/image"
import Link from "next/link"

export default function RestaurantSection() {
  return (
    <section
  className="
    pt-8
    pb-20
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
        {/* TITRE */}

        <div className="mb-10">

          <p
            className="
              uppercase
              tracking-[0.35em]
              text-[#c89b5f]
            "
          >
            Restaurant
          </p>

          <h2
            className="
              mt-3
              font-serif
              text-4xl
              text-[#2f241d]
              leading-tight
            "
          >
            Une cuisine simple,
            <br />
            généreuse et authentique.
          </h2>

        </div>

        {/* BANNIÈRE */}

        <div
          className="
            overflow-hidden
            rounded-[36px]
            bg-white
            shadow-xl
          "
        >
          <div
            className="
              grid
              lg:grid-cols-2
            "
          >

            {/* TEXTE */}

            <div
              className="
                flex
                flex-col
                justify-center
                p-8
                md:p-8
              "
            >

              <p
                className="
                  text-lg
                  leading-relaxed
                  text-[#5a4c42]
                "
              >
                Découvrez notre carte,
                nos menus et nos spécialités
                dans une ambiance chaleureuse
                et conviviale.
              </p>

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-3
                "
              >

                <div
                  className="
                    rounded-full
                    bg-[#f5f1ea]
                    px-4
                    py-2
                    text-sm
                    font-medium
                  "
                >
                  🍽 Cuisine traditionnelle
                </div>

                <div
                  className="
                    rounded-full
                    bg-[#f5f1ea]
                    px-4
                    py-2
                    text-sm
                    font-medium
                  "
                >
                  🍷 Bar convivial
                </div>

                <div
                  className="
                    rounded-full
                    bg-[#f5f1ea]
                    px-4
                    py-2
                    text-sm
                    font-medium
                  "
                >
                  📋 Menu du jour
                </div>

              </div>

              <Link
                href="/restaurant"
                className="
                  mt-8
                  inline-flex
                  w-fit
                  rounded-2xl
                  bg-[#c89b5f]
                  px-8
                  py-4
                  font-bold
                  text-white
                  transition
                  hover:bg-[#b98746]
                "
              >
                Voir la carte
              </Link>

            </div>

            {/* IMAGE */}

            <div
              className="
                relative
                h-[320px]
                md:h-[320px]
                overflow-hidden
              "
            >
              <div
  className="
    absolute
    left-0
    top-0
    z-10
    h-full
    w-24
    bg-gradient-to-r
    from-white
    to-transparent
  "
/>
              <Image
                src="/restaurant/resto1.jpeg"
                alt="Restaurant"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}