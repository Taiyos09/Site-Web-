"use client"

import { useEffect, useState } from "react"

type Room = {
  id: string

  nameFr: string
  nameEn: string
  nameNl: string

  slug: string

  descriptionFr: string
  descriptionEn: string
  descriptionNl: string

  size: string
  capacity: number

  priceOnePerson: number
  priceTwoPeople: number

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

  lit_parapluie: number

  iban: string
  bic: string
  account_name: string
  deposit_percent: number
}

export default function HotelAdminPage() {

  const uploadRoomImage = async (
  e: React.ChangeEvent<HTMLInputElement>,
  roomId: string,
  imageIndex: number
) => {

  const file =
    e.target.files?.[0]

  if (!file) return

  const formData =
    new FormData()

  formData.append(
    "file",
    file
  )

  const res =
    await fetch(
      "/api/uploads",
      {
        method: "POST",
        body: formData,
      }
    )

  const data =
    await res.json()

  const field =
    imageIndex === 0
      ? "image_1"
      : imageIndex === 1
      ? "image_2"
      : "image_3"

  handleRoomChange(
    roomId,
    field as keyof Room,
    data.url
  )
}
  
  const [rooms, setRooms] =
    useState<Room[]>([])

  const [settings, setSettings] =
    useState<HotelSettings | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [savedRoom, setSavedRoom] =
  useState<string | null>(null)

  const [savingRoom, setSavingRoom] =
    useState<string | null>(null)

  const [savingSettings, setSavingSettings] =
    useState(false)

  useEffect(() => {
    loadData()
  }, [])

  

  async function loadData() {
  try {

    const response =
      await fetch("/api/rooms")

    const roomsData =
      await response.json()

    const responseSettings =
      await fetch(
        "/api/hotel-settings"
      )

    const settingsData =
      await responseSettings.json()

    const formattedRooms =
  roomsData.map((room: any) => {

    const images =
      String(room.images || "")
        .split(",")
        .map((img: string) =>
          img.trim()
        )


    return {

      ...room,

      image_1:
        images[0] || "",

      image_2:
        images[1] || "",

      image_3:
        images[2] || "",
    }
  })

setRooms(formattedRooms)

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

    const response =
      await fetch(
        `/api/rooms/${room.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
  nameFr: room.nameFr,
  nameEn: room.nameEn,
  nameNl: room.nameNl,

  descriptionFr: room.descriptionFr,
  descriptionEn: room.descriptionEn,
  descriptionNl: room.descriptionNl,

  size: room.size,
  capacity: room.capacity,
  one_person_price: room.priceOnePerson,
  two_people_price: room.priceTwoPeople,

  image_1: room.image_1,
  image_2: room.image_2,
  image_3: room.image_3
}),
        }
      )

    if (!response.ok) {
      alert(
        "Erreur lors de la sauvegarde"
      )
      return
    }

   setSavedRoom(room.id)

setTimeout(() => {
  setSavedRoom(null)
}, 3000)

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
  value: string | number
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

    const response =
      await fetch(
        "/api/hotel-settings",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
  breakfast: settings.breakfast,
  lunch: settings.lunch,
  dinner: settings.dinner,
  pet: settings.pet,

  tourist_tax:
    settings.tourist_tax,

  extra_bed:
    settings.extra_bed,

  lit_parapluie:
    settings.lit_parapluie,

  iban:
    settings.iban,

  bic:
    settings.bic,

  account_name:
    settings.account_name,

  deposit_percent:
    settings.deposit_percent,
}),
        }
      )

    if (!response.ok) {

      alert(
        "Erreur sauvegarde paramètres"
      )

      return
    }

    alert("Paramètres sauvegardés")

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

        <div
  className="
    mt-8
    grid
    gap-6
    md:grid-cols-4
  "
>

  <div className="rounded-3xl bg-white p-6 shadow-lg">
    <p className="text-sm text-[#6b5b4f]">
      Chambres
    </p>

    <p className="mt-2 text-5xl font-bold font-serif">
      {rooms.length}
    </p>
  </div>

  <div className="rounded-3xl bg-white p-6 shadow-lg">
    <p className="text-sm text-[#6b5b4f]">
      Prix moyen
    </p>

    <p className="mt-2 text-5xl font-bold font-serif">
      {Math.round(
        rooms.reduce(
          (acc, room) =>
            acc + room.priceTwoPeople,
          0
        ) / rooms.length
      )}€
    </p>
  </div>

  <div className="rounded-3xl bg-white p-6 shadow-lg">
    <p className="text-sm text-[#6b5b4f]">
      Repas midi
    </p>

    <p className="mt-2 text-5xl font-bold font-serif">
      {settings?.lunch}€
    </p>
  </div>

  <div className="rounded-3xl bg-white p-6 shadow-lg">
    <p className="text-sm text-[#6b5b4f]">
      Repas soir
    </p>

    <p className="mt-2 text-5xl font-bold font-serif">
      {settings?.dinner}€
    </p>
  </div>

</div>

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
                Personne supplémentaire
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
    Lit parapluie
  </label>

  <input
    type="number"
    value={
      settings.lit_parapluie || 5
    }
    onChange={(e) =>
      handleSettingChange(
        "lit_parapluie",
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

            <div>
  <label className="mb-2 block font-bold">
    Petit Déjeuner
  </label>

  <input
    type="number"
    value={
      settings.breakfast || 12
    }
    onChange={(e) =>
      handleSettingChange(
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
    IBAN
  </label>

  <input
    type="text"
    value={settings.iban || ""}
    onChange={(e) =>
      setSettings({
        ...settings,
        iban: e.target.value,
      })
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
    BIC
  </label>

  <input
    type="text"
    value={settings.bic || ""}
    onChange={(e) =>
      setSettings({
        ...settings,
        bic: e.target.value,
      })
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
    Titulaire du compte
  </label>

  <input
    type="text"
    value={settings.account_name || ""}
    onChange={(e) =>
      setSettings({
        ...settings,
        account_name: e.target.value,
      })
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
    Acompte (%)
  </label>

  <input
    type="number"
    value={
      settings.deposit_percent || 20
    }
    onChange={(e) =>
      setSettings({
        ...settings,
        deposit_percent:
          Number(e.target.value),
      })
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
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-2xl
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
                  {room.nameFr}
                </h2>

                <p className="mt-1 text-sm text-[#6b5b4f]">
                  Slug : {room.slug}
                </p>
              </div>

              <div className="mt-3 flex gap-3">

  <span
    className="
      rounded-full
      bg-[#c89b5f]/20
      px-3
      py-1
      text-sm
      font-medium
    "
  >
    {room.capacity} pers.
  </span>

  <span
    className="
      rounded-full
      bg-[#2f241d]/10
      px-3
      py-1
      text-sm
      font-medium
    "
  >
    {room.size}
  </span>

  <span
    className="
      rounded-full
      bg-green-100
      px-3
      py-1
      text-sm
      font-medium
      text-green-700
    "
  >
    Disponible
  </span>

</div>

              <button
  onClick={() =>
    saveRoom(room)
  }
  disabled={
    savingRoom === room.id
  }
  className={`
    rounded-2xl
    px-6
    py-3
    font-bold
    text-white
    transition-all
    duration-300
    disabled:opacity-50

    ${
      savedRoom === room.id
        ? "bg-green-600"
        : "bg-[#2f241d]"
    }
  `}
>
  {savingRoom === room.id
    ? "Sauvegarde..."
    : savedRoom === room.id
    ? "✅ Sauvegardé"
    : "💾 Sauvegarder"}
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
                  alt={room.nameFr}
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
                    Nom (FR)
                  </label>
                  <input
  value={room.nameFr || ""}
  onChange={(e) =>
    handleRoomChange(room.id, "nameFr", e.target.value)
  }
/>

<label>Nom (EN)</label>
<input
  value={room.nameEn || ""}
  onChange={(e) =>
    handleRoomChange(room.id, "nameEn", e.target.value)
  }
/>

<label>Nom (NL)</label>
<input
  value={room.nameNl || ""}
  onChange={(e) =>
    handleRoomChange(room.id, "nameNl", e.target.value)
  }
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
                    Capacité
                  </label>

                  <input
                    type="text"
                    value={room.capacity}
                    onChange={(e) =>
                      handleRoomChange(
                        room.id,
                        "capacity",
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
  Description (FR)
</label>

<textarea
  value={room.descriptionFr || ""}
  onChange={(e) =>
    handleRoomChange(room.id, "descriptionFr", e.target.value)
  }
  className="min-h-[160px] w-full rounded-2xl border p-4"
/>

<label className="mb-2 mt-4 block font-bold">
  Description (EN)
</label>

<textarea
  value={room.descriptionEn || ""}
  onChange={(e) =>
    handleRoomChange(room.id, "descriptionEn", e.target.value)
  }
  className="min-h-[160px] w-full rounded-2xl border p-4"
/>

<label className="mb-2 mt-4 block font-bold">
  Description (NL)
</label>

<textarea
  value={room.descriptionNl || ""}
  onChange={(e) =>
    handleRoomChange(room.id, "descriptionNl", e.target.value)
  }
  className="min-h-[160px] w-full rounded-2xl border p-4"
/>            </div>

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
                        room.priceOnePerson || 0
                      }
                      onChange={(e) =>
                        handleRoomChange(
                          room.id,
                          "priceOnePerson",
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
                        room.priceTwoPeople || 0
                      }
                      onChange={(e) =>
                        handleRoomChange(
                          room.id,
                          "priceTwoPeople",
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

                <div className="mt-6">

  <h3 className="mb-6 text-2xl font-bold">
    Galerie photos
  </h3>

  <div className="grid gap-6 md:grid-cols-3">

    {[
      room.image_1,
      room.image_2,
      room.image_3,
    ].map((image, imageIndex) => (

      <div
        key={imageIndex}
        className="
          rounded-3xl
          bg-[#faf7f2]
          p-4
          shadow-md
        "
      >

        <div
          className="
            relative
            h-48
            overflow-hidden
            rounded-2xl
            border
          "
        >

          {image ? (

            <img
              src={image}
              alt=""
              className="
                h-full
                w-full
                object-cover
              "
            />

          ) : (

            <div
              className="
                flex
                h-full
                items-center
                justify-center
                text-sm
                text-gray-400
              "
            >
              Aucune image
            </div>

          )}

        </div>

        <label
          className="
            mt-4
            block
            cursor-pointer
            rounded-2xl
            bg-[#2f241d]
            px-4
            py-3
            text-center
            font-semibold
            text-white
          "
        >
          Choisir une image

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              uploadRoomImage(
                e,
                room.id,
                imageIndex
              )
            }
          />

        </label>

      </div>

    ))}

  </div>

</div>
              </div>
            </div>
          </section>
        ))}
      </div>

    </main>
  )
}