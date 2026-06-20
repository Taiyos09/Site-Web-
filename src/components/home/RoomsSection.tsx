"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function RoomsSection() {

  const [rooms, setRooms] = useState<any[]>([])

  useEffect(() => {

    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))

  }, [])

  return (

    <section
  className="
    pt-16
    pb-10
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

        {/* HEADER */}

        <div
          className="
            mb-12
            flex
            items-end
            justify-between
          "
        >

          <div>

            <p
              className="
                mb-2
                uppercase
                tracking-[0.3em]
                text-[#c89b5f]
              "
            >
              Nos chambres
            </p>

            <h2
              className="
                font-serif
                text-5xl
                font-bold
                text-[#2f241d]
              "
            >
              Chambres en vedette
            </h2>

          </div>

          <Link
            href="/hotel"
            className="
              rounded-full
              border
              border-[#d9c6a7]
              px-5
              py-2
              text-sm
              font-semibold
            "
          >
            Voir toutes les chambres
          </Link>

        </div>

        {/* CARTES */}

        <div
          className="
            grid
            gap-8
            lg:grid-cols-3
          "
        >

          {rooms.slice(0, 3).map((room) => (

            <div
              key={room.id}
              className="
                overflow-hidden
                rounded-[28px]
                bg-white
                shadow-lg
                transition
                duration-300
                hover:-translate-y-1
              "
            >

              {/* IMAGE */}

              <div className="h-[180px]">

                <img
                  src={room.images?.[0]}
                  alt={room.name}
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

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
                    mb-4
                    text-sm
                    text-[#5a4c42]
                    line-clamp-1
                  "
                >
                  {room.description}
                </p>

                <div
                  className="
                    mb-5
                    inline-flex
                    rounded-full
                    bg-[#f3ede3]
                    px-2
                    py-1
                    text-xs
                    font-semibold
                    text-[#8a6330]
                  "
                >
                  👤 Jusqu'à {room.capacity} personne{room.capacity > 1 ? "s" : ""}
                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-t
                    border-[#e7ddd0]
                    pt-5
                  "
                >

                  <span
                    className="
                      text-3xl
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
                    mt-5
                    flex
                    justify-center
                    rounded-2xl
                    bg-[#2f241d]
                    py-3
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

          ))}

        </div>

      </div>

    </section>
  )
}