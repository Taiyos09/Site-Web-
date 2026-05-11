"use client"

import { useState } from "react"
import AdminNavbar from "@/components/AdminNavbar"
import { EVENTS } from "@/data/events"

export default function EventsPage() {

  const [eventsData, setEventsData] =
    useState(EVENTS)

  const updateEvent = (
    index: number,
    field: string,
    value: string
  ) => {

    const updated = [...eventsData]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    setEventsData(updated)
  }

  const updateGalleryImage = (
    eventIndex: number,
    imageIndex: number,
    value: string
  ) => {

    const updated = [...eventsData]

    updated[eventIndex]
      .gallery[imageIndex] = value

    setEventsData(updated)
  }

  const addGalleryImage = (
    eventIndex: number
  ) => {

    const updated = [...eventsData]

    updated[eventIndex]
      .gallery.push("/images/photo.jpg")

    setEventsData(updated)
  }

  const addEvent = () => {

    setEventsData([
      ...eventsData,

      {
        title: "Nouvel événement",
        date: "Date",
        description: "Description",
        image: "/images/event.jpg",
        gallery: [],
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

            </div>

            <div className="space-y-10">

              {eventsData.map((event, index) => (

                <div
                  key={index}
                  className="
                    rounded-3xl
                    bg-[#faf7f2]
                    p-8
                  "
                >

                  <div className="
                    mb-8
                    flex
                    items-center
                    justify-between
                  ">

                    <h3 className="
                      text-2xl
                      font-bold
                      font-serif
                    ">
                      {event.title}
                    </h3>

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
                        p-4
                      "
                    />

                    <input
                      type="text"
                      value={event.date}
                      placeholder="Date"
                      onChange={(e) =>
                        updateEvent(
                          index,
                          "date",
                          e.target.value
                        )
                      }
                      className="
                        rounded-2xl
                        border
                        p-4
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
                        p-4
                      "
                    />

                    <input
                      type="text"
                      value={event.image}
                      placeholder="Image principale"
                      onChange={(e) =>
                        updateEvent(
                          index,
                          "image",
                          e.target.value
                        )
                      }
                      className="
                        rounded-2xl
                        border
                        p-4
                      "
                    />

                  </div>

                  {/* GALERIE */}
                  <div className="mt-10">

                    <div className="
                      mb-6
                      flex
                      items-center
                      justify-between
                    ">

                      <h4 className="
                        text-2xl
                        font-bold
                        font-serif
                      ">
                        Galerie photos
                      </h4>

                      <button
                        onClick={() =>
                          addGalleryImage(index)
                        }
                        className="
                          rounded-2xl
                          bg-[#2f241d]
                          px-5
                          py-3
                          text-white
                        "
                      >
                        Ajouter une photo
                      </button>

                    </div>

                    <div className="space-y-4">

                      {event.gallery.map(
                        (
                          photo,
                          photoIndex
                        ) => (

                          <input
                            key={photoIndex}
                            type="text"
                            value={photo}
                            onChange={(e) =>
                              updateGalleryImage(
                                index,
                                photoIndex,
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

    </>
  )
}