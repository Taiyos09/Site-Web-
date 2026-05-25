"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Room = {
  id: string
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

  const [savingRoom, setSavingRoom] =
    useState<string | null>(null)

  const [savingSettings, setSavingSettings] =
    useState(false)

  useEffect(() => {
    loadData()
  }, [])

  

  async function loadData() {
    try {
      const { data: roomsData, error: roomsError } =
        await supabase
          .from("rooms")
          .select("*")
          .order("name")

      if (roomsError) {
        console.error(roomsError)
      }
      

      const {
        data: settingsData,
        error: settingsError,
      } = await supabase
        .from("hotel_settings")
        .select("*")
        .single()

      if (settingsError) {
        console.error(settingsError)
      }

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
  

  // =========================
  // UPDATE ROOM LOCAL STATE
  // =========================

  function handleRoomChange(
    roomId: string,
    field: keyof Room,
    value: any
  ) {
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
  }

  // =========================
  // SAVE ROOM
  // =========================

  async function saveRoom(room: Room) {
    try {
      setSavingRoom(room.id)

      const { error } =
        await supabase
          .from("rooms")
          .update({
            name: room.name,
            description: room.description,
            size: room.size,

            one_person_price:
              room.one_person_price,

            two_people_price:
              room.two_people_price,

            image_1: room.image_1,
            image_2: room.image_2,
            image_3: room.image_3,
          })
          .eq("id", room.id)

      console.log(error)

if (error) {
        alert(
          "Erreur lors de la sauvegarde"
        )
        return
      }

      alert(
        `Chambre "${room.name}" sauvegardée`
      )
    } catch (error) {
      console.error(error)

      alert(
        "Erreur lors de la sauvegarde"
      )
    } finally {
      setSavingRoom(null)
    }
  }

  // =========================
  // SETTINGS LOCAL STATE
  // =========================

  function handleSettingChange(
    field: keyof HotelSettings,
    value: number
  ) {
    if (!settings) return

    setSettings({
      ...settings,
      [field]: value,
    })
  }

  // =========================
  // SAVE SETTINGS
  // =========================

  async function saveSettings() {
    if (!settings) return

    try {
      setSavingSettings(true)

      const { error } =
        await supabase
          .from("hotel_settings")
          .update({

            lunch:
              settings.lunch,

            dinner:
              settings.dinner,

            pet:
              settings.pet,

            tourist_tax:
              settings.tourist_tax,

            extra_bed:
              settings.extra_bed,
          })
          .eq("id", settings.id)

      if (error) {
        console.error(error)

        alert(
          "Erreur sauvegarde paramètres"
        )

        return
      }

      alert(
        "Paramètres sauvegardés"
      )
    } catch (error) {
      console.error(error)

      alert(
        "Erreur sauvegarde paramètres"
      )
    } finally {
      setSavingSettings(false)
    }
  }

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#f5f1ea]
        "
      >
        Chargement...
      </div>
    )
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#f5f1ea]
        p-10
        text-[#2f241d]
      "
    >
      {/* HEADER */}

      <div className="mb-12">
        <h1
          className="
            font-serif
            text-5xl
            font-bold
          "
        >
          Gestion Hôtel
        </h1>

        <p
          className="
            mt-2
            text-[#6b5b4f]
          "
        >
          Gérez les chambres,
          tarifs et paramètres
          de réservation.
        </p>
      </div>

      {/* SETTINGS */}

      {settings && (
        <section
          className="
            mb-12
            rounded-[36px]
            bg-white
            p-8
            shadow-xl
          "
        >
          <div
            className="
              mb-8
              flex
              items-center
              justify-between
            "
          >
            <h2
              className="
                font-serif
                text-3xl
                font-bold
              "
            >
              Tarifs supplémentaires
            </h2>

            <button
              onClick={saveSettings}
              disabled={savingSettings}
              className="
                rounded-2xl
                bg-[#2f241d]
                px-6
                py-3
                font-bold
                text-white
                transition
                hover:opacity-90
                disabled:opacity-50
              "
            >
              {savingSettings
                ? "Sauvegarde..."
                : "Sauvegarder"}
            </button>
          </div>

          <div
            className="
              grid
              gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            <div>
              <label className="mb-2 block font-bold">
                Repas midi
              </label>

              <input
                type="number"
                value={settings.lunch}
                onChange={(e) =>
                  handleSettingChange(
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
                  handleSettingChange(
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
                  handleSettingChange(
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
                  handleSettingChange(
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
                value={
                  settings.tourist_tax
                }
                onChange={(e) =>
                  handleSettingChange(
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

      {/* ROOMS */}

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
            <div
              className="
                mb-8
                flex
                items-center
                justify-between
              "
            >
              <div>
                <h2
                  className="
                    font-serif
                    text-3xl
                    font-bold
                  "
                >
                  {room.name}
                </h2>

                <p className="mt-1 text-sm text-[#6b5b4f]">
                  Slug : {room.slug}
                </p>
              </div>

              <button
                onClick={() =>
                  saveRoom(room)
                }
                disabled={
                  savingRoom === room.id
                }
                className="
                  rounded-2xl
                  bg-[#2f241d]
                  px-6
                  py-3
                  font-bold
                  text-white
                  transition
                  hover:opacity-90
                  disabled:opacity-50
                "
              >
                {savingRoom === room.id
                  ? "Sauvegarde..."
                  : "Sauvegarder"}
              </button>
            </div>

            <div
              className="
                grid
                gap-8
                lg:grid-cols-2
              "
            >
              {/* IMAGE */}

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

              {/* FORM */}

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block font-bold">
                    Nom
                  </label>

                  <input
                    type="text"
                    value={room.name}
                    onChange={(e) =>
                      handleRoomChange(
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
                  <label className="mb-2 block font-bold">
                    Taille
                  </label>

                  <input
                    type="text"
                    value={room.size}
                    onChange={(e) =>
                      handleRoomChange(
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
                  <label className="mb-2 block font-bold">
                    Description
                  </label>

                  <textarea
                    value={
                      room.description || ""
                    }
                    onChange={(e) =>
                      handleRoomChange(
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

                <div
                  className="
                    grid
                    gap-4
                    md:grid-cols-2
                  "
                >
                  <div>
                    <label className="mb-2 block font-bold">
                      Prix 1 personne
                    </label>

                    <input
                      type="number"
                      value={
                        room.one_person_price || 0
                      }
                      onChange={(e) =>
                        handleRoomChange(
                          room.id,
                          "one_person_price",
                          Number(
                            e.target.value
                          )
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
                      Prix 2 personnes
                    </label>

                    <input
                      type="number"
                      value={
                        room.two_people_price || 0
                      }
                      onChange={(e) =>
                        handleRoomChange(
                          room.id,
                          "two_people_price",
                          Number(
                            e.target.value
                          )
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

                <div className="grid gap-4">
                  <input
                    type="text"
                    value={room.image_1 || ""}
                    onChange={(e) =>
                      handleRoomChange(
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
                    value={room.image_2 || ""}
                    onChange={(e) =>
                      handleRoomChange(
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
                    value={room.image_3 || ""}
                    onChange={(e) =>
                      handleRoomChange(
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