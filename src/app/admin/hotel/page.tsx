"use client"

import { useState } from "react"
import AdminNavbar from "@/components/AdminNavbar"
import { HOTEL_CONFIG } from "@/data/hotel"

export default function HotelAdminPage() {

  const [hotelData, setHotelData] =
    useState(HOTEL_CONFIG)

  /* ---------------- ROOM PRICES ---------------- */

  const updateRoomPrice = (
    key: string,
    value: number
  ) => {

    setHotelData({
      ...hotelData,

      roomPrices: {
        ...hotelData.roomPrices,
        [key]: value,
      },
    })
  }

  /* ---------------- OPTIONS ---------------- */

  const updateOptionPrice = (
    key: string,
    value: number
  ) => {

    setHotelData({
      ...hotelData,

      options: {
        ...hotelData.options,
        [key]: value,
      },
    })
  }

  /* ---------------- SAVE ---------------- */

  const saveChanges = () => {

    localStorage.setItem(
      "hotelData",
      JSON.stringify(hotelData)
    )

    alert(
      "Modifications sauvegardées"
    )
  }

  return (

    <>

      <style jsx global>{`
        .public-navbar {
          display: none !important;
        }
      `}</style>

      <main className="
        min-h-screen
        bg-[#f5f1ea]
        p-10
        text-[#2f241d]
      ">

        <AdminNavbar />

        <div className="mt-10">

          {/* HEADER */}
          <div className="
            mb-10
            flex
            items-center
            justify-between
          ">

            <div>

              <h1 className="
                font-serif
                text-5xl
                font-bold
              ">
                Gestion hôtel
              </h1>

              <p className="
                mt-2
                text-[#6b5b4f]
              ">
                Gestion des tarifs et options.
              </p>

            </div>

            <button
              onClick={saveChanges}
              className="
                rounded-2xl
                bg-[#2f241d]
                px-8
                py-4
                text-lg
                font-bold
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:scale-105
                hover:bg-[#43352c]
              "
            >
              Sauvegarder
            </button>

          </div>

          {/* HOTEL */}
          <section className="
            rounded-[36px]
            border
            border-[#e7ded2]
            bg-white/80
            p-10
            shadow-xl
            backdrop-blur
          ">

            <div className="mb-10">

              <h2 className="
                text-3xl
                font-bold
                font-serif
              ">
                Hôtel
              </h2>

              <p className="
                mt-2
                text-[#6b5b4f]
              ">
                Gestion des prix et options des chambres.
              </p>

            </div>

            <div className="
              grid
              gap-10
              lg:grid-cols-2
            ">

              {/* PRIX */}
              <div className="
                space-y-6
                rounded-3xl
                bg-[#faf7f2]
                p-8
              ">

                <h3 className="
                  text-2xl
                  font-bold
                ">
                  Prix des chambres
                </h3>

                <div>

                  <label className="
                    mb-2
                    block
                    font-medium
                  ">
                    1 personne
                  </label>

                  <input
                    type="number"
                    value={
                      hotelData.roomPrices.onePerson
                    }
                    onChange={(e) =>
                      updateRoomPrice(
                        "onePerson",
                        Number(e.target.value)
                      )
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#d8cfc3]
                      bg-white
                      p-4
                      outline-none
                    "
                  />

                </div>

                <div>

                  <label className="
                    mb-2
                    block
                    font-medium
                  ">
                    2 personnes
                  </label>

                  <input
                    type="number"
                    value={
                      hotelData.roomPrices.twoPeople
                    }
                    onChange={(e) =>
                      updateRoomPrice(
                        "twoPeople",
                        Number(e.target.value)
                      )
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#d8cfc3]
                      bg-white
                      p-4
                      outline-none
                    "
                  />

                </div>

                <div>

                  <label className="
                    mb-2
                    block
                    font-medium
                  ">
                    2 chambres
                  </label>

                  <input
                    type="number"
                    value={
                      hotelData.roomPrices.doubleRoom
                    }
                    onChange={(e) =>
                      updateRoomPrice(
                        "doubleRoom",
                        Number(e.target.value)
                      )
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#d8cfc3]
                      bg-white
                      p-4
                      outline-none
                    "
                  />

                </div>

              </div>

              {/* OPTIONS */}
              <div className="
                space-y-6
                rounded-3xl
                bg-[#faf7f2]
                p-8
              ">

                <h3 className="
                  text-2xl
                  font-bold
                ">
                  Options hôtel
                </h3>

                {Object.entries(
                  hotelData.options
                ).map(
                  ([key, value]) => (

                    <div key={key}>

                      <label className="
                        mb-2
                        block
                        font-medium
                        capitalize
                      ">
                        {key}
                      </label>

                      <input
                        type="number"
                        value={Number(value)}
                        onChange={(e) =>
                          updateOptionPrice(
                            key,
                            Number(e.target.value)
                          )
                        }
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-[#d8cfc3]
                          bg-white
                          p-4
                          outline-none
                        "
                      />

                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        </div>

      </main>

    </>
  )
}