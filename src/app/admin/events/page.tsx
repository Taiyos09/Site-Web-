"use client"

import { useEffect, useState } from "react"
import AdminNavbar from "@/components/AdminNavbar"
import Image from "next/image"

export default function EventsPage() {

    const [eventsData, setEventsData] =
  useState<any[]>([])

  const [search, setSearch] = useState("")

  useEffect(() => {

  fetch("/api/events")

    .then((res) =>
      res.json()
    )

    .then((data) =>
      setEventsData(data)
    )

}, [])

  const updateEvent = (
  index: number,
  field: string,
  value: any
) => {

  const updated = [...eventsData];

  updated[index] = {
    ...updated[index],
    [field]: value,
  };

  setEventsData(updated);
}


  const addGalleryImage = (
    eventIndex: number
  ) => {

    const updated = [...eventsData]

    if (
  !updated[eventIndex]
    .gallery
)
  updated[eventIndex]
    .gallery = []

updated[eventIndex]
  .gallery.push(
    "/images/photo.jpg"
  )

    setEventsData(updated)
  }

  const uploadGalleryImage = async (
  e: React.ChangeEvent<HTMLInputElement>,
  eventIndex: number,
  photoIndex: number
) => {

  const file =
    e.target.files?.[0]

  if (!file) return

  try {

    const formData =
      new FormData()

    formData.append(
      "file",
      file
    )

    const res =
      await fetch(
        "/api/upload",
        {
          method: "POST",
          body: formData,
        }
      )

    const data =
      await res.json()

    const updated =
      [...eventsData]

    updated[eventIndex]
      .gallery[photoIndex] =
        data.url

    setEventsData(updated)

  } catch (error) {

    console.error(error)

    alert(
      "Erreur lors de l'upload"
    )

  }
}

  const addEvent = () => {
  setEventsData([
    ...eventsData,
    {
      title: "",
      date: "",
      description: "",
      image: "",
      gallery: [],
      showWarning: false,
    },
  ])
}

  const removeEvent = (
    index: number
  ) => {

    setEventsData(
      eventsData.filter(
        (_, i) => i !== index
      )
    )
  }

  const saveEvents = async () => {

  try {

    await fetch(
      "/api/events",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          eventsData
        ),
      }
    )

    alert(
      "Événements sauvegardés"
    )

  } catch (error) {

    console.error(error)

    alert(
      "Erreur de sauvegarde"
    )
  }
}

const filteredEvents =
  eventsData.filter((event) =>
    event.title
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )

  return (

      <main className="min-h-screen bg-[#f5f1ea] p-10 text-[#2f241d]">

        <div className="mt-10">

          {/* EVENEMENTS */}
          <section className="
            rounded-[36px]
            border
            border-[#e7ded2]
            bg-white/80
            p-10
            shadow-xl
            backdrop-blur
          ">

            <div className="
              mb-10
              flex
              items-center
              justify-between
            ">

              <div>

                <h2 className="
                  text-3xl
                  font-bold
                  font-serif
                ">
                  Événements
                </h2>

                <p className="
                  mt-2
                  text-[#6b5b4f]
                ">
                  Gestion des soirées et événements.
                </p>

              </div>

              <div className="flex items-center gap-4">

  <div className="rounded-2xl bg-[#f5f1ea] px-4 py-3">
    <p className="text-sm text-[#6b5b4f]">
      Événements
    </p>

    <p className="text-3xl font-bold">
      {eventsData.length}
    </p>
  </div>

  <button
    onClick={addEvent}
    className="
      rounded-2xl
      bg-[#c89b5f]
      px-6
      py-3
      font-semibold
      text-white
    "
  >
    Ajouter un événement
  </button>

  <button
    onClick={saveEvents}
    className="
      rounded-2xl
      bg-green-600
      px-6
      py-3
      font-semibold
      text-white
    "
  >
    Sauvegarder
  </button>

</div>

</div>

<input
  type="text"
  placeholder="Rechercher un événement..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="
    mb-10
    w-full
    rounded-2xl
    border
    p-4
  "
/>

            <div className="space-y-10">

              {filteredEvents.map((event, index) => (

                <div
  key={index}
  className="
  mx-auto
  max-w-5xl
  rounded-[32px]
  bg-white
  p-8
  shadow-xl
  transition-all
  duration-300
  hover:-translate-y-1
  hover:shadow-2xl
"
>

                  <div className="
                    mb-8
                    flex
                    items-center
                    justify-between
                  ">

                    <div className="flex items-center gap-4">

  <div
    className="
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-2xl
      bg-[#c89b5f]/20
      text-2xl
    "
  >
    🎉
  </div>

  <h3
    className="
      text-3xl
      font-bold
      font-serif
    "
  >
    {event.title || "Nouvel événement"}
  </h3>

</div>

<div
  className="
    flex
    items-center
    gap-4
    rounded-2xl
    border
    p-4
  "
>
  <input
    type="checkbox"
  checked={event.showWarning || false}
  onChange={(e) =>
    updateEvent(
      index,
      "showWarning",
      e.target.checked
      )
    }
    className="h-5 w-5"
  />

  <div>
    <div className="font-semibold">
      Avertir les clients
    </div>

    <div className="text-sm text-gray-500">
      Cet événement peut provoquer
      du bruit ou une fréquentation
      plus importante.
    </div>
  </div>
</div>

                    <button
                      onClick={() =>
                        removeEvent(index)
                      }
                      className="
                        rounded-2xl
                        bg-red-500
                        px-5
                        py-3
                        font-semibold
                        text-white
                      "
                    >
                      Supprimer
                    </button>

                  </div>

                  <div className="grid gap-6">

  <input
    type="text"
    value={event.title}
    placeholder="Titre"
    onChange={(e) =>
      updateEvent(
        index,
        "title",
        e.target.value
      )
    }
    className="
      rounded-2xl
      border
      p-3
    "
  />

  <input
  type="date"
  value={event.date}
  onChange={(e) =>
  updateEvent(
    index,
    "date",
    e.target.value
  )
}
  className="
    rounded-xl
    border
    border-gray-300
    px-4
    py-2
  "
/>

  <textarea
    value={event.description}
    placeholder="Description"
    onChange={(e) =>
      updateEvent(
        index,
        "description",
        e.target.value
      )
    }
    className="
      min-h-[140px]
      rounded-2xl
      border
      p-3
    "
  />

  {/* IMAGE PRINCIPALE */}

  <div
  className="
    relative
    h-72
    overflow-hidden
    rounded-3xl
    border
    shadow-lg
  "
>

  {event.image ? (

    <Image
      src={event.image}
      alt={event.title || "Image événement"}
      fill
      className="object-cover"
    />

  ) : (

    <div
      className="
        flex
        h-full
        items-center
        justify-center
        text-gray-500
      "
    >
      Aucune image sélectionnée
    </div>

  )}

</div>

    <label
      className="
        inline-block
        cursor-pointer
        rounded-2xl
        bg-[#2f241d]
        px-5
        py-3
        text-white
      "
    >
      Choisir une image

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {

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

          updateEvent(
            index,
            "image",
            data.url
          )
        }}
      />

    </label>

  </div>

{/* GALERIE */}

<div className="mt-10">

  <div
    className="
      mb-6
      flex
      items-center
      justify-between
    "
  >

    <h4
      className="
        text-2xl
        font-bold
        font-serif
      "
    >
      Galerie photos
    </h4>

    <button
  onClick={() =>
    addGalleryImage(
      index
    )
  }
  className="
    rounded-xl
    bg-[#c89b5f]
    px-5
    py-3
    font-bold
    text-white
  "
>
  Ajouter une photo
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

  {event.gallery?.map(
    (
      photo: string,
      photoIndex: number
    ) => (

      <div
        key={photoIndex}
        className="
          rounded-2xl
          border
          p-4
        "
      >

        <div
          className="
            relative
            mb-4
            h-48
            overflow-hidden
            rounded-2xl
          "
        >

          <Image
            src={photo}
            alt=""
            sizes="33vw"
            fill
            className="object-cover"
          />

        </div>

        <label
          className="
            block
            cursor-pointer
            rounded-xl
            bg-[#2f241d]
            px-4
            py-3
            text-center
            text-white
          "
        >

          Modifier

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              uploadGalleryImage(
                e,
                index,
                photoIndex
              )
            }
          />

        </label>

      </div>
    )
  )}

</div>
</div>

</div>

))}

</div>
          </section>

        </div>

      </main>

  )
}