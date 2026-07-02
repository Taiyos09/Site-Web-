"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function MemoriesPage() {

  const [memories, setMemories] =
    useState<any[]>([])

  useEffect(() => {

  fetch("/api/memories")
    .then((r) => r.json())
    .then((data) => {

  const formatted =
    data.map(
      (memory: any) => ({

        ...memory,

        images:
          typeof memory.images ===
          "string"

            ? JSON.parse(
                memory.images
              )

            : memory.images,

      })
    )

  console.log(
    formatted
  )

  setMemories(
    formatted
  )
})

}, [])

  const addMemory = () => {

    setMemories([
      ...memories,
      {
        title: "",
        images: [],
        featured: true,
      },
    ])
  }

  const save = async () => {

    await fetch(
      "/api/memories",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body:
          JSON.stringify(
            memories
          ),
      }
    )

    alert(
      "Souvenirs sauvegardés"
    )
  }
  console.log(
  "MEMORIES",
  memories
)

  return (

    <main className="
      min-h-screen
      bg-[#f5f1ea]
      p-10
    ">

      <div className="
        mb-10
        flex
        gap-4
      ">

        <button
          onClick={addMemory}
          className="
            rounded-2xl
            bg-[#c89b5f]
            px-6
            py-3
            text-white
          "
        >
          Ajouter un souvenir
        </button>

        <button
          onClick={save}
          className="
            rounded-2xl
            bg-green-600
            px-6
            py-3
            text-white
          "
        >
          Sauvegarder
        </button>

      </div>

      {memories.map(
        (
          memory,
          memoryIndex
        ) => (

          <div
            key={memoryIndex}
            className="
              mb-10
              rounded-3xl
              bg-white
              p-8
            "
          >

            <input
              value={
                memory.title
              }
              placeholder="Titre"
              onChange={(e) => {

                const copy =
                  [...memories]

                copy[
                  memoryIndex
                ].title =
                  e.target.value

                setMemories(
                  copy
                )
              }}
              className="
                mb-6
                w-full
                rounded-xl
                border
                p-3
              "
            />

            <div className="
  mb-6
  flex
  items-center
  justify-between
">

  <h3 className="
    text-2xl
    font-bold
    font-serif
  ">
    {memory.title || "Nouveau souvenir"}
  </h3>

  <button
    onClick={() => {

      if (
        !confirm(
          "Supprimer ce souvenir ?"
        )
      ) return

      setMemories(
        memories.filter(
          (_: any, i: number) =>
            i !== memoryIndex
        )
      )
    }}
    className="
      rounded-xl
      bg-red-600
      px-4
      py-2
      font-semibold
      text-white
    "
  >
    Supprimer
  </button>

</div>

            <label
  className="
    cursor-pointer
    rounded-xl
    bg-[#2f241d]
    px-4
    py-2
    text-white
    inline-block
  "
>
  Ajouter photo

  <input
    type="file"
    accept="image/*"
    multiple
    className="hidden"

    onChange={async (e) => {

      if (!e.target.files)
        return

      const copy =
        [...memories]

      for (
        const file of
        Array.from(
          e.target.files
        )
      ) {

        const formData =
          new FormData()

        formData.append(
          "file",
          file
        )

        const response =
          await fetch(
            "/api/uploads",
            {
              method: "POST",
              body: formData,
            }
          )

        const data =
          await response.json()

        copy[
          memoryIndex
        ].images.push(
          data.url
        )

        console.log(
  "IMAGES",
  copy[
    memoryIndex
  ].images
)
      }

      setMemories(
        copy
      )
    }}
  />

</label>

<div
  className="
    mt-6
    grid
    gap-6
    md:grid-cols-4
  "
>
  {
    Array.isArray(memory.images)
      ? memory.images.map(
          (
            image: string,
            imageIndex: number
          ) => (
            <div
              key={imageIndex}
              className="
                relative
                overflow-hidden
                rounded-2xl
                shadow-lg
              "
            >
              <div
                className="
                  relative
                  h-56
                  w-full
                "
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            </div>
          )
        )
      : null
  }
</div>

          </div>

        )
      )}

    </main>
  )
}