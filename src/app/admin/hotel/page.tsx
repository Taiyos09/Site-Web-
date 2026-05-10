"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Room = {
  id: number
  name: string
  slug: string
  description: string
  size: string

  one_person_price: number
  two_people_price: number

  image_1: string
  image_2: string
  image_3: string
}

type HotelSettings = {
  id: number

  breakfast: number
  lunch: number
  dinner: number

  pet: number

  tourist_tax: number

  extra_bed: number
}

export default function HotelAdminPage() {

  const [rooms, setRooms] =
    useState<Room[]>([])

  const [settings, setSettings] =
    useState<HotelSettings | null>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    loadData()

  }, [])

  async function loadData() {

    try {

      const { data: roomsData } =
        await supabase
          .from("rooms")
          .select("*")
          .order("id")

      const { data: settingsData } =
        await supabase
          .from("hotel_settings")
          .select("*")
          .single()

      setRooms(roomsData || [])

      if (settingsData) {
        setSettings(settingsData)
      }

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  async function updateRoom(
    roomId: number,
    field: string,
    value: any
  ) {

    try {

      await supabase
        .from("rooms")
        .update({
          [field]: value,
        })
        .eq("id", roomId)

      setRooms((prev) =>
        prev.map((room) =>
          room.id === roomId
            ? {
                ...room,
                [field]: value,
              }
            : room
        )
      )

    } catch (error) {

      console.error(error)
    }
  }

  async function updateSetting(
    field: string,
    value: number
  ) {

    if (!settings) return

    try {

      await supabase
        .from("hotel_settings")
        .update({
          [field]: value,
        })
        .eq("id", settings.id)

      setSettings({
        ...settings,
        [field]: value,
      })

    } catch (error) {

      console.error(error)
    }
  }

  if (loading) {

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

  return (

    <main className="
      min-h-screen
      bg-[#f5f1ea]
      p-10
      text-[#2f241d]
    ">

      <div className="mb-12">

        <h1 className="
          text-5xl
          font-bold
          font-serif
        ">
          Gestion Hôtel
        </h1>

        <p className="
          mt-2
          text-[#6b5b4f]
        ">
          Toutes les modifications sont
          appliquées automatiquement
          sur le site.
        </p>

      </div>

      {/* TARIFS GÉNÉRAUX */}

      {settings && (

        <section className="
          mb-12
          rounded-[36px]
          bg-white
          p-8
          shadow-xl
        ">

          <h2 className="
            mb-8
            text-3xl
            font-bold
            font-serif
          ">
            Tarifs supplémentaires
          </h2>

          <div className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          ">

            <div>
              <label className="mb-2 block font-bold">
                Petit déjeuner
              </label>

              <input
                type="number"
                value={settings.breakfast}
                onChange={(e) =>
                  updateSetting(
                    "breakfast",
                    Number(e.target.value)
                  )
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  p-4
                "
              />
            </div>

            <div>
              <label className="mb-2 block font-bold">
                Repas midi
              </label>

              <input
                type="number"
                value={settings.lunch}
                onChange={(e) =>
                  updateSetting(
                    "lunch",
                    Number(e.target.value)
                  )
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  p-4
                "
              />
            </div>

            <div>
              <label className="mb-2 block font-bold">
                Repas soir
              </label>

              <input
                type="number"
                value={settings.dinner}
                onChange={(e) =>
                  updateSetting(
                    "dinner",
                    Number(e.target.value)
                  )
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  p-4
                "
              />
            </div>

            <div>
              <label className="mb-2 block font-bold">
                Animal
              </label>

              <input
                type="number"
                value={settings.pet}
                onChange={(e) =>
                  updateSetting(
                    "pet",
                    Number(e.target.value)
                  )
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  p-4
                "
              />
            </div>

            <div>
              <label className="mb-2 block font-bold">
                Lit supplémentaire
              </label>

              <input
                type="number"
                value={settings.extra_bed}
                onChange={(e) =>
                  updateSetting(
                    "extra_bed",
                    Number(e.target.value)
                  )
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  p-4
                "
              />
            </div>

            <div>
              <label className="mb-2 block font-bold">
                Taxe touristique
              </label>

              <input
                type="number"
                step="0.1"
                value={settings.tourist_tax}
                onChange={(e) =>
                  updateSetting(
                    "tourist_tax",
                    Number(e.target.value)
                  )
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  p-4
                "
              />
            </div>

          </div>

        </section>

      )}

      {/* CHAMBRES */}

      <div className="space-y-10">

        {rooms.map((room) => (

          <section
            key={room.id}
            className="
              rounded-[36px]
              bg-white
              p-8
              shadow-xl
            "
          >

            <div className="
              grid
              gap-8
              lg:grid-cols-2
            ">

              <div>

                <img
                  src={room.image_1}
                  alt={room.name}
                  className="
                    h-[400px]
                    w-full
                    rounded-3xl
                    object-cover
                  "
                />

              </div>

              <div className="space-y-5">

                <div>

                  <label className="
                    mb-2
                    block
                    font-bold
                  ">
                    Nom
                  </label>

                  <input
                    type="text"
                    value={room.name}
                    onChange={(e) =>
                      updateRoom(
                        room.id,
                        "name",
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      p-4
                    "
                  />

                </div>

                <div>

                  <label className="
                    mb-2
                    block
                    font-bold
                  ">
                    Taille
                  </label>

                  <input
                    type="text"
                    value={room.size}
                    onChange={(e) =>
                      updateRoom(
                        room.id,
                        "size",
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      p-4
                    "
                  />

                </div>

                <div>

                  <label className="
                    mb-2
                    block
                    font-bold
                  ">
                    Description
                  </label>

                  <textarea
                    value={room.description}
                    onChange={(e) =>
                      updateRoom(
                        room.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="
                      min-h-[160px]
                      w-full
                      rounded-2xl
                      border
                      p-4
                    "
                  />

                </div>

                <div className="
                  grid
                  gap-4
                  md:grid-cols-2
                ">

                  <div>

                    <label className="
                      mb-2
                      block
                      font-bold
                    ">
                      Prix 1 personne
                    </label>

                    <input
                      type="number"
                      value={room.one_person_price}
                      onChange={(e) =>
                        updateRoom(
                          room.id,
                          "one_person_price",
                          Number(e.target.value)
                        )
                      }
                      className="
                        w-full
                        rounded-2xl
                        border
                        p-4
                      "
                    />

                  </div>

                  <div>

                    <label className="
                      mb-2
                      block
                      font-bold
                    ">
                      Prix 2 personnes
                    </label>

                    <input
                      type="number"
                      value={room.two_people_price}
                      onChange={(e) =>
                        updateRoom(
                          room.id,
                          "two_people_price",
                          Number(e.target.value)
                        )
                      }
                      className="
                        w-full
                        rounded-2xl
                        border
                        p-4
                      "
                    />

                  </div>

                </div>

                <div className="
                  grid
                  gap-4
                ">

                  <input
                    type="text"
                    value={room.image_1}
                    onChange={(e) =>
                      updateRoom(
                        room.id,
                        "image_1",
                        e.target.value
                      )
                    }
                    placeholder="Image 1"
                    className="
                      w-full
                      rounded-2xl
                      border
                      p-4
                    "
                  />

                  <input
                    type="text"
                    value={room.image_2}
                    onChange={(e) =>
                      updateRoom(
                        room.id,
                        "image_2",
                        e.target.value
                      )
                    }
                    placeholder="Image 2"
                    className="
                      w-full
                      rounded-2xl
                      border
                      p-4
                    "
                  />

                  <input
                    type="text"
                    value={room.image_3}
                    onChange={(e) =>
                      updateRoom(
                        room.id,
                        "image_3",
                        e.target.value
                      )
                    }
                    placeholder="Image 3"
                    className="
                      w-full
                      rounded-2xl
                      border
                      p-4
                    "
                  />

                </div>

              </div>

            </div>

          </section>

        ))}

      </div>

    </main>
  )
}