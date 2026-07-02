"use client"

import { useEffect, useState } from "react"
import {
  tourismCategories
} from "@/lib/tourism-categories"

export default function TourismAdminPage() {

const [selectedFile,
  setSelectedFile] =
  useState<File | null>(
    null
  )

const [editingId,
  setEditingId] =
  useState<number | null>(
    null
  )

  const [places, setPlaces] =
    useState<any[]>([])

  const [form, setForm] =
  useState({

    name: "",
    slug: "",
    description: "",
    address: "",
    image: "",
    website: "",
    maps_url: "",
    travel_time: "",
    category: "",
    featured: false,
  })

  async function loadPlaces() {

    const response =
      await fetch("/api/tourism")

    const data =
      await response.json()

    setPlaces(data)
  }

  useEffect(() => {

    loadPlaces()

  }, [])

function handleEdit(
  place: any
) {

  setEditingId(
    place.id
  )

  setForm({

    name:
      place.name || "",

    slug:
      place.slug || "",

    description:
      place.description || "",

    address:
      place.address || "",

    travel_time:
      place.travel_time || "",

    image:
      place.image || "",

    website:
      place.website || "",

    category:
      place.category || "",

    featured:
      place.featured || false,

    maps_url:
      place.maps_url || "",
  })
}

async function handleDelete(
  id: number
) {

  if (
    !confirm(
      "Supprimer cette activité ?"
    )
  ) {
    return
  }

  await fetch(
    `/api/tourism/${id}`,
    {
      method: "DELETE",
    }
  )

  await loadPlaces()
}


  async function handleSubmit() {

  let imagePath = ""

  if (selectedFile) {

    const formData =
      new FormData()

    formData.append(
      "file",
      selectedFile
    )

    const uploadResponse =
      await fetch(
        "/api/uploads",
        {
          method: "POST",
          body: formData,
        }
      )

    const uploadData =
      await uploadResponse.json()

    imagePath =
      uploadData.url
  }

  const response =
  await fetch(

    editingId
      ? `/api/tourism/${editingId}`
      : "/api/tourism",

    {

      method:
        editingId
          ? "PUT"
          : "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({

        ...form,

        image:
          imagePath ||
          form.image,
      }),
    }
  )

  if (!response.ok) {

  alert(
    "Erreur création"
  )

  return
}

setForm({

  name: "",

  slug: "",

  description: "",

  address: "",

  travel_time: "",

  image: "",

  website: "",

  category: "",

  maps_url: "",

  featured: false,
})

setSelectedFile(
  null
)

setEditingId(
  null
)

await loadPlaces()

}

  return (

    <div className="p-8 text-black">

      <h1
        className="
          mb-8
          text-4xl
          font-bold
        "
      >
        Activités touristiques
      </h1>

      <div
        className="
          mb-10
          rounded-xl
          bg-white
          p-6
          shadow
        "
      >

        <h2
  className="
    mb-6
    text-2xl
    font-bold
  "
>
  {
    editingId
      ? "Modifier l'activité"
      : "Ajouter une activité"
  }
</h2>

        <div
          className="
            grid
            gap-4
            md:grid-cols-2
          "
        >

          <input
            placeholder="Nom"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target.value,
              })
            }
            className="rounded border p-3 text-black"
          />

          <input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) =>
              setForm({
                ...form,
                slug:
                  e.target.value,
              })
            }
            className="rounded border p-3 text-black"
          />

          <select
  value={form.category}
  onChange={(e) =>
    setForm({
      ...form,
      category:
        e.target.value,
    })
  }
  className="
    rounded
    border
    border-gray-300
    bg-white
    p-3
    text-black
  "
>

  <option value="">
    Catégorie
  </option>

  {tourismCategories.map(
    (category) => (

      <option
        key={category.value}
        value={category.value}
      >
        {category.label}
      </option>

    )
  )}

</select>

          <input
            placeholder="Adresse"
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address:
                  e.target.value,
              })
            }
            className="rounded border p-3 text-black"
          />

          <input
  placeholder="Temps depuis l'auberge (ex: 45 min)"
  value={form.travel_time}
  onChange={(e) =>
    setForm({
      ...form,
      travel_time:
        e.target.value,
    })
  }
  className="
    rounded
    border
    p-3
    text-black
  "
/>

          <input
  type="file"
  accept="image/*"
  onChange={(e) => {

    const file =
      e.target.files?.[0]

    if (file) {

      setSelectedFile(
        file
      )
    }
  }}
/>
{selectedFile && (

  <img
    src={URL.createObjectURL(
      selectedFile
    )}
    alt="Aperçu"
    className="
      mt-4
      h-40
      rounded-xl
      object-cover
    "
  />

)}

          <input
            placeholder="Site web"
            value={form.website}
            onChange={(e) =>
              setForm({
                ...form,
                website:
                  e.target.value,
              })
            }
            className="rounded border p-3 text-black"
          />

          <input
  placeholder="Lien Google Maps"
  value={form.maps_url}
  onChange={(e) =>
    setForm({
      ...form,
      maps_url:
        e.target.value,
    })
  }
  className="
    rounded
    border
    p-3
    text-black
  "
/>

        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
          className="
            mt-4
            h-32
            w-full
            rounded
            border
            p-3
            text-black
          "
        />

        <label
          className="
            mt-4
            flex
            items-center
            gap-2
          "
        >
          <input
            type="checkbox"
            checked={
              form.featured
            }
            onChange={(e) =>
              setForm({
                ...form,
                featured:
                  e.target.checked,
              })
            }
          />

          Mise en avant
        </label>

        <button
          onClick={handleSubmit}
          className="
            mt-6
            rounded-lg
            bg-green-600
            px-6
            py-3
            text-white
          "
        >
          {
  editingId
    ? "Enregistrer"
    : "Ajouter"
}
        </button>

      </div>

      <div
        className="
          rounded-xl
          bg-white
          p-6
          shadow
        "
      >

        <h2
          className="
            mb-6
            text-2xl
            font-bold
          "
        >
          Activités enregistrées
        </h2>

        <div className="space-y-4">

          {places.map(
  (place: any) => (

    <div
      key={place.id}
      className="
        rounded-lg
        border
        p-4
      "
    >

      <h3
        className="
          text-xl
          font-bold
        "
      >
        {place.name}
      </h3>

      <p className="mt-2 text-sm text-gray-600">
  {place.address}
</p>

{place.travel_time && (

  <p
    className="
      mt-1
      text-sm
      font-medium
      text-[#c89b5f]
    "
  >
    🚗 {place.travel_time} depuis l'auberge
  </p>

)}

{place.website && (
  <a
    href={place.website}
    target="_blank"
    rel="noreferrer"
    className="
      text-blue-600
      underline
    "
  >
    Site web
  </a>
)}

      <p
        className="
          inline-block
          rounded-full
          bg-[#f5f1ea]
          px-3
          py-1
          text-sm
        "
      >
        {
          tourismCategories.find(
            (c) =>
              c.value ===
              place.category
          )?.label
        }
      </p>

      {place.image && (

        <img
          src={place.image}
          alt={place.name}
          className="
            mt-4
            h-40
            w-full
            rounded-xl
            object-cover
          "
        />

      )}

      <div
        className="
          mt-4
          flex
          gap-2
        "
      >

        {place.maps_url && (

  <a
    href={place.maps_url}
    target="_blank"
    rel="noreferrer"
    className="
      inline-block
      rounded-lg
      bg-green-600
      px-4
      py-2
      text-white
    "
  >
    Voir sur Google Maps
  </a>

)}

<button
          onClick={() =>
            handleEdit(place)
          }
          className="
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-white
          "
        >
          Modifier
        </button>

        <button
          onClick={() =>
            handleDelete(
              place.id
            )
          }
          className="
            rounded-lg
            bg-red-600
            px-4
            py-2
            text-white
          "
        >
          Supprimer
        </button>

      </div>

    </div>

  )
)}
        </div>

      </div>

    </div>
  )
}