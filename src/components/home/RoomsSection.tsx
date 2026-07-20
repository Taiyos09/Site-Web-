"use client"

import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react"
import {useTranslations} from "next-intl";
import { useLocale } from "next-intl";

export default function RoomsSection() {

   const t = useTranslations("home");
   const locale = useLocale();

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
            flex-col sm:flex-row sm:items-end
            sm:justify-between
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
              {t("RoomTitre")}
            </p>

            <h2
              className="
                font-serif
                text-5xl
                font-bold
                text-[#2f241d]
              "
            >
              {t("RoomTitre2")}
            </h2>

          </div>

          <Link
            href="/hotel"
            className="
              rounded-full
              mt-5
              sm:mt-0
              self-center
              sm:self-auto
              border
              border-[#d9c6a7]
              px-5
              py-2
              text-sm
              font-semibold
            "
          >
            {t("RoomSubBouton")}
          </Link>

        </div>

        {/* CARTES */}

        <div
          className="
            grid
            gap-8
            sm:grid-cols-2 lg:grid-cols-3
          "
        >

          {rooms.slice(0, 3).map((room) => {

  const roomName =
    locale === "en"
      ? room.nameEn || room.nameFr
      : locale === "nl"
      ? room.nameNl || room.nameFr
      : room.nameFr;

  const roomDescription =
    locale === "en"
      ? room.descriptionEn || room.descriptionFr
      : locale === "nl"
      ? room.descriptionNl || room.descriptionFr
      : room.descriptionFr;

  return (

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

              <div className="h-[200px] sm:h-[180px]">

                <img
                  src={room.images?.[0]}
                  alt={roomName}
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
                  {roomName}
                </h3>

                <p
                  className="
                    mb-4
                    text-sm
                    text-[#5a4c42]
                    line-clamp-1
                  "
                >
                  {roomDescription}
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
                  👤 {t("Jusque")} {room.capacity} {t("Personne")}{room.capacity > 1 ? "s" : ""}
                </div>

                <div
                  className="
                    flex
                    items-center
                    sm:justify-between
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
                    {t("night")}
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
                  {t("nightbouton")}
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
