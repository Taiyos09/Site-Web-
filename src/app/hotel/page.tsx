"use client"

import { useEffect, useMemo, useState } from "react"
import { getHotelData } from "@/lib/hotel"
import Link from "next/link"

export default function HotelPage() {

  const [hotelConfig, setHotelConfig] =
    useState<any>(null)

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

  const [babyCount, setBabyCount] =
    useState(0)

  const [babyBed, setBabyBed] =
    useState(false)

  const [highChair, setHighChair] =
    useState(false)

  const [acceptTerms, setAcceptTerms] =
    useState(false)

  const [people, setPeople] =
    useState(0)

  const [checkIn, setCheckIn] =
    useState("")

  const [checkOut, setCheckOut] =
    useState("")

  const [firstName, setFirstName] =
    useState("")

  const [lastName, setLastName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [phone, setPhone] =
    useState("")

  const [message, setMessage] =
    useState("")

  const [loading, setLoading] =
    useState(false)

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

  useEffect(() => {

    const loadHotel =
      async () => {

        const data =
          await getHotelData()

        const formattedRooms =
          data.rooms.map(
            (room: any) => ({

              ...room,

              images: [
                room.image_1,
                room.image_2,
                room.image_3,
              ].filter(Boolean),

            })
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

            extraBed:
              data.settings?.extra_bed || 0,
          },

          roomPrices: {

            onePerson:
              formattedRooms[0]
                ?.one_person_price || 0,

            twoPeople:
              formattedRooms[0]
                ?.two_people_price || 0,

            doubleRoom:
              (
                formattedRooms[0]
                  ?.two_people_price || 0
              ) * 2,
          },
        })

        setCurrentImages(
          formattedRooms.map(() => 0)
        )
      }

    loadHotel()

    const interval =
      setInterval(() => {

        setCurrentImages((prev) => {

          return prev.map(
            (value, index) => {

              const totalImages =
                hotelConfig?.rooms?.[
                  index
                ]?.images?.length || 1

              return (
                value + 1
              ) % totalImages
            }
          )
        })

      }, 3500)

    return () => clearInterval(interval)

  }, [hotelConfig])

  if (!hotelConfig) {

    return (
      <div className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#f5f1ea]
      ">
        Chargement...
      </div>
    )
  }

  let roomsNeeded = 0
  let roomTotal = 0
  let bookingPossible = true

  if (people === 1) {

    roomsNeeded = 1

    roomTotal =
      hotelConfig.roomPrices.onePerson *
      nights
  }

  else if (people === 2) {

    roomsNeeded = 1

    roomTotal =
      hotelConfig.roomPrices.twoPeople *
      nights
  }

  else if (people === 3) {

    roomsNeeded = 1

    roomTotal =
      hotelConfig.roomPrices.doubleRoom *
      nights
  }

  else if (people === 4) {

    roomsNeeded = 2

    roomTotal =
      hotelConfig.roomPrices.twoPeople *
      2 *
      nights
  }

  else if (people === 5) {

    roomsNeeded = 2

    roomTotal =
      (
        hotelConfig.roomPrices.doubleRoom +
        hotelConfig.roomPrices.twoPeople
      ) * nights
  }

  else if (people === 6) {

    roomsNeeded = 3

    roomTotal =
      (
        hotelConfig.roomPrices.twoPeople *
        2 +
        hotelConfig.roomPrices.doubleRoom
      ) * nights
  }

  else if (people === 7) {

    roomsNeeded = 3

    roomTotal =
      (
        hotelConfig.roomPrices.twoPeople *
        2 +
        hotelConfig.roomPrices.doubleRoom
      ) * nights
  }

  else if (people > 7) {

    bookingPossible = false

    roomsNeeded = 3

    roomTotal =
      (
        hotelConfig.roomPrices.twoPeople *
        2 +
        hotelConfig.roomPrices.doubleRoom
      ) * nights
  }

  const breakfastTotal =
    breakfast
      ? hotelConfig.options.breakfast *
        people *
        nights
      : 0

  const lunchTotal =
    lunch
      ? hotelConfig.options.lunch *
        people *
        nights
      : 0

  const dinnerTotal =
    dinner
      ? hotelConfig.options.dinner *
        people *
        nights
      : 0

  const petTotal =
    petCount *
    hotelConfig.options.pet *
    nights

  const touristTaxTotal =
    hotelConfig.options.touristTax *
    people *
    nights

  const totalPrice =
    roomTotal +
    breakfastTotal +
    lunchTotal +
    dinnerTotal +
    petTotal +
    touristTaxTotal

  return (

    <div className="
      min-h-screen
      bg-[#f5f1ea]
      text-[#2f241d]
    ">

      {/* HERO */}

      <section
        className="
          relative
          min-h-screen
          snap-start
          flex
          h-[60vh]
          items-center
          justify-center
          bg-cover
          bg-center
        "
        style={{
          backgroundImage:
            "url('/images/hotel/HERO.jpg')",
        }}
      >

        <div className="
          absolute
          inset-0
          bg-black/50
        " />

        <div className="
          relative
          z-10
          px-6
          text-center
          text-white
        ">

          <h1 className="
            mb-4
            text-5xl
            font-bold
            md:text-7xl
          ">
            Hôtel
          </h1>

          <p className="
            mx-auto
            max-w-2xl
            text-lg
            text-white/90
            md:text-xl
          ">
            Découvrez nos chambres chaleureuses
            et profitez d'un séjour confortable
            à L'auberge de St Aubin.
          </p>

        </div>

      </section>

      {/* CHAMBRES */}

      <section
        className="
          snap-start
          min-h-screen
          bg-cover
          bg-center
          py-24
        "
        style={{
          backgroundImage:
            "url('/images/hotel/bois.jpg')",
        }}
      >

        <div className="
          mx-auto
          max-w-[1800px]
          px-10
        ">

          <div className="
            mb-14
            text-center
          ">

            <h2 className="
              mb-4
              text-4xl
              font-bold
            ">
              Nos chambres
            </h2>

          </div>

          <div className="
            mx-auto
            grid
            max-w-[1800px]
            grid-cols-1
            gap-14
            md:grid-cols-2
            2xl:grid-cols-3
          ">

            {(hotelConfig?.rooms ?? []).map(
              (room: any, roomIndex: number) => (

                <div
                  key={room.id}
                  className="
                    mx-auto
                    w-full
                    max-w-[650px]
                    overflow-hidden
                    rounded-3xl
                    bg-[#f3ede3]/95
                    shadow-2xl
                    backdrop-blur
                    transition-all
                    duration-500
                    hover:-translate-y-2
                  "
                >

                  <div className="
                    relative
                    h-[280px]
                    overflow-hidden
                  ">

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
                            absolute inset-0
                            h-full w-full
                            object-cover
                            transition-all
                            duration-1000
                            ${
                              imgIndex ===
                              (
                                currentImages[
                                  roomIndex
                                ] ?? 0
                              )
                                ? "opacity-100"
                                : "opacity-0"
                            }
                          `}
                        />

                      )
                    )}

                    <div className="
                      absolute
                      right-4
                      top-4
                      rounded-full
                      bg-[#f3ede3]/90
                      px-4
                      py-2
                      text-sm
                      font-bold
                      text-[#8a6330]
                    ">
                      {room.size}
                    </div>

                  </div>

                  <div className="p-6">

                    <h3 className="
                      mb-4
                      text-2xl
                      font-bold
                      font-serif
                    ">
                      {room.name}
                    </h3>

                    <p className="
                      mb-6
                      leading-relaxed
                      text-[#5a4c42]
                    ">
                      {room.description}
                    </p>

                    <div className="
                      mb-6
                      flex
                      items-center
                      justify-between
                      border-t
                      border-[#d8cbbb]
                      pt-4
                    ">

                      <span className="
                        text-3xl
                        font-bold
                      ">
                        {room.one_person_price}€
                      </span>

                      <span className="
                        text-sm
                        text-[#7a6a5d]
                      ">
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
                        py-4
                        text-lg
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:scale-[1.02]
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

      </section>

    </div>
  )
}