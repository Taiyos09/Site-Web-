"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function EventsSection() {

  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {

  fetch("/api/events")
    .then((res) => res.json())
    .then((data) => {

      const today = new Date()

today.setHours(
  0,
  0,
  0,
  0
)

const upcomingEvents =
  data.filter(
    (event: any) => {

      const eventDate =
        new Date(event.date)

      eventDate.setHours(
        0,
        0,
        0,
        0
      )

      return (
        eventDate >= today
      )
    }
  )

      const sorted = upcomingEvents.sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      )

      setEvents(
        sorted.slice(0, 3)
      )
    })

}, [])

  return (

    <section
      className="
        bg-[#f5f1ea]
        pt-8
        pb-24
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
            mb-8
            flex
            items-center
            justify-between
          "
        >

          <div>

            <p
              className="
                uppercase
                tracking-[0.3em]
                text-[#c89b5f]
                text-sm
              "
            >
              ÉVÉNEMENTS À VENIR
            </p>

          </div>

          <Link
            href="/evenements"
            className="
              rounded-full
              border
              border-[#c89b5f]
              px-6
              py-3
              text-sm
              font-semibold
              text-[#2f241d]
              transition
              hover:bg-[#c89b5f]
              hover:text-white
            "
          >
            Voir tous les événements
          </Link>

        </div>

        {/* EVENTS */}

        <div
          className="
            grid
            gap-6
            sm:grid-cols-2 lg:grid-cols-3
          "
        >

          {events.map((event) => {

            const date =
              new Date(event.date)

            const day =
              date.toLocaleDateString(
                "fr-FR",
                {
                  day: "2-digit",
                }
              )

            const month =
              date
                .toLocaleDateString(
                  "fr-FR",
                  {
                    month: "short",
                  }
                )
                .replace(".", "")
                .toUpperCase()
                
                console.log(events)
            return (

              <div
                key={event.id}
                className="
                  group
                  relative
                  h-[230px]
                  overflow-hidden
                  rounded-[24px]
                "
              >

                {/* IMAGE */}

                <img
                  src={event.image}
                  alt={event.title}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-all
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* OVERLAY */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/35
                    to-black/10
                  "
                />

                {/* DATE */}

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    z-20
                    rounded-xl
                    bg-white
                    px-4
                    py-2
                    text-center
                    shadow-lg
                  "
                >

                  <div
                    className="
                      text-2xl
                      font-bold
                      leading-none
                      text-[#2f241d]
                    "
                  >
                    {day}
                  </div>

                  <div
                    className="
                      mt-1
                      text-xs
                      font-semibold
                      uppercase
                      text-[#8a6330]
                    "
                  >
                    {month}
                  </div>

                </div>

                {/* CONTENU */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    z-20
                    w-full
                    p-5
                  "
                >

                  <h3
                    className="
                      mb-2
                      font-serif
                      text-3xl
                      font-bold
                      text-white
                    "
                  >
                    {event.title}
                  </h3>

                  <p
                    className="
                      mb-3
                      line-clamp-2
                      text-white/90
                    "
                  >
                    {event.description}
                  </p>

                  <Link
                    href="/evenements"
                    className="
                      text-sm
                      font-semibold
                      text-[#d6b98c]
                    "
                  >
                    En savoir plus →
                  </Link>

                </div>

              </div>

            )

          })}

        </div>

      </div>

    </section>
  )
}
