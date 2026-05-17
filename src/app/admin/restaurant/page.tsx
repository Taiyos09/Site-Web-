"use client"

import { useEffect, useState } from "react"
import AdminNavbar from "@/components/AdminNavbar"
import { RESTAURANT_CONFIG } from "@/data/restaurant"


export default function RestaurantAdminPage() {

  const [restaurantData, setRestaurantData] =
    useState(RESTAURANT_CONFIG)

  useEffect(() => {

    const savedRestaurant =
      localStorage.getItem(
        "restaurantData"
      )

    if (savedRestaurant) {

      const parsedRestaurant =
        JSON.parse(savedRestaurant)

      setRestaurantData({
        ...RESTAURANT_CONFIG,
        ...parsedRestaurant,
      })
    }

  }, [])

  const saveChanges = () => {

    localStorage.setItem(
      "restaurantData",
      JSON.stringify(restaurantData)
    )

    alert("Modifications sauvegardées")
  }

  const updateMenuItem = (
    category: string,
    index: number,
    field: string,
    value: string | number
  ) => {

    const categoryData =
      restaurantData[
        category as keyof typeof restaurantData
      ]

    const updatedCategory =
      Array.isArray(categoryData)
        ? [...categoryData]
        : []

    updatedCategory[index] = {
      ...updatedCategory[index],
      [field]: value,
    }

    setRestaurantData({
      ...restaurantData,
      [category]: updatedCategory,
    })
  }

  const addMenuItem = (
    category: string
  ) => {

    const categoryData =
      restaurantData[
        category as keyof typeof restaurantData
      ]

    const currentItems =
      Array.isArray(categoryData)
        ? categoryData
        : []

    setRestaurantData({
      ...restaurantData,
      [category]: [
        ...currentItems,
        {
          name: "Nouveau plat",
          price: 0,
        },
      ],
    })
  }

  const removeMenuItem = (
    category: string,
    index: number
  ) => {

    const categoryData =
      restaurantData[
        category as keyof typeof restaurantData
      ]

    const updatedCategory =
      Array.isArray(categoryData)
        ? categoryData.filter(
            (_: unknown, i) =>
              i !== index
          )
        : []

    setRestaurantData({
      ...restaurantData,
      [category]: updatedCategory,
    })
  }

  const updateHoraire = (
    type:
      | "barHoraires"
      | "restaurantHoraires",

    index: number,

    field:
      | "day"
      | "hours",

    value: string
  ) => {

    const updated = [
      ...restaurantData[type],
    ]

    updated[index][field] = value

    setRestaurantData({
      ...restaurantData,
      [type]: updated,
    })
  }

  const updateMenuDuJour = (
    field: string,
    value: string | number
  ) => {

    setRestaurantData({
      ...restaurantData,

      menuDuJour: {
        ...restaurantData.menuDuJour,
        [field]: value,
      },
    })
  }

  const updateMenuEnfant = (
    field: string,
    value: string | number
  ) => {

    setRestaurantData({
      ...restaurantData,

      menuEnfant: {
        ...restaurantData.menuEnfant,
        [field]: value,
      },
    })
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

          <div className="
            mb-10
            flex items-center
            justify-between
          ">

            <div>

              <h1 className="
                font-serif
                text-5xl
                font-bold
              ">
                Restaurant
              </h1>

              <p className="
                mt-2
                text-[#6b5b4f]
              ">
                Gestion de la carte et des menus.
              </p>

            </div>

            <button
              onClick={saveChanges}
              className="
                rounded-2xl
                bg-[#2f241d]
                px-8 py-4
                text-lg
                font-bold
                text-white
              "
            >
              Sauvegarder
            </button>

          </div>

          {/* RESTAURANT */}
          <section className="
            rounded-[36px]
            border border-[#e7ded2]
            bg-white/80
            p-10
            shadow-xl
            backdrop-blur
          ">

            <div className="space-y-12">

              {/* ENTREES / PLATS / DESSERTS */}
              {Object.entries(
                restaurantData
              )
                .filter(
                  ([key, items]) =>
                    Array.isArray(items) &&
                    key !== "barHoraires" &&
                    key !== "restaurantHoraires"
                )
                .map(
                  ([category, items]) => (

                    <div
                      key={category}
                      className="
                        rounded-3xl
                        bg-[#faf7f2]
                        p-8
                      "
                    >

                      <div className="
                        mb-8
                        flex items-center
                        justify-between
                      ">

                        <h3 className="
                          text-2xl
                          font-bold
                          capitalize
                        ">
                          {category}
                        </h3>

                        <button
                          onClick={() =>
                            addMenuItem(
                              category
                            )
                          }
                          className="
                            rounded-2xl
                            bg-[#c89b5f]
                            px-5 py-3
                            font-semibold
                            text-white
                          "
                        >
                          Ajouter
                        </button>

                      </div>

                      <div className="
                        space-y-4
                      ">

                        {(items as any[]).map(
                          (
                            item: any,
                            index: number
                          ) => (

                            <div
                              key={index}
                              className="
                                grid gap-4
                                rounded-3xl
                                bg-white
                                p-4
                                shadow-sm
                                md:grid-cols-[1fr_160px_140px]
                              "
                            >

                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) =>
                                  updateMenuItem(
                                    category,
                                    index,
                                    "name",
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
                                type="number"
                                value={item.price}
                                onChange={(e) =>
                                  updateMenuItem(
                                    category,
                                    index,
                                    "price",
                                    Number(
                                      e.target.value
                                    )
                                  )
                                }
                                className="
                                  rounded-2xl
                                  border
                                  p-4
                                "
                              />

                              <button
                                onClick={() =>
                                  removeMenuItem(
                                    category,
                                    index
                                  )
                                }
                                className="
                                  rounded-2xl
                                  bg-red-500
                                  px-4 py-3
                                  font-semibold
                                  text-white
                                "
                              >
                                Supprimer
                              </button>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  )
                )}

                {/* MENU DU JOUR */}

<div
  className="
    rounded-3xl
    bg-[#faf7f2]
    p-8
  "
>

  <h3
    className="
      mb-8
      text-3xl
      font-bold
      font-serif
    "
  >
    Menu du jour
  </h3>

  <div
    className="
      grid gap-4
      md:grid-cols-2
    "
  >

    <input
      type="text"
      placeholder="Titre"
      value={restaurantData.menuDuJour.title}
      onChange={(e) =>
        updateMenuDuJour(
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
      type="number"
      placeholder="Prix"
      value={restaurantData.menuDuJour.price}
      onChange={(e) =>
        updateMenuDuJour(
          "price",
          Number(e.target.value)
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
      placeholder="Description"
      value={restaurantData.menuDuJour.description}
      onChange={(e) =>
        updateMenuDuJour(
          "description",
          e.target.value
        )
      }
      className="
        rounded-2xl
        border
        p-4
        md:col-span-2
      "
    />

    <input
      type="text"
      placeholder="Entrée"
      value={restaurantData.menuDuJour.starter}
      onChange={(e) =>
        updateMenuDuJour(
          "starter",
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
      placeholder="Plat"
      value={restaurantData.menuDuJour.main}
      onChange={(e) =>
        updateMenuDuJour(
          "main",
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
      placeholder="Dessert"
      value={restaurantData.menuDuJour.dessert}
      onChange={(e) =>
        updateMenuDuJour(
          "dessert",
          e.target.value
        )
      }
      className="
        rounded-2xl
        border
        p-4
        md:col-span-2
      "
    />

  </div>

</div>

{/* MENU ENFANT */}

<div
  className="
    rounded-3xl
    bg-[#faf7f2]
    p-8
  "
>

  <h3
    className="
      mb-8
      text-3xl
      font-bold
      font-serif
    "
  >
    Menu enfant
  </h3>

  <div
    className="
      grid gap-4
      md:grid-cols-2
    "
  >

    <input
      type="text"
      placeholder="Plat"
      value={restaurantData.menuEnfant.main}
      onChange={(e) =>
        updateMenuEnfant(
          "main",
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
      placeholder="Accompagnement"
      value={restaurantData.menuEnfant.side}
      onChange={(e) =>
        updateMenuEnfant(
          "side",
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
      placeholder="Boisson"
      value={restaurantData.menuEnfant.drink}
      onChange={(e) =>
        updateMenuEnfant(
          "drink",
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
      placeholder="Dessert"
      value={restaurantData.menuEnfant.dessert}
      onChange={(e) =>
        updateMenuEnfant(
          "dessert",
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
      type="number"
      placeholder="Prix"
      value={restaurantData.menuEnfant.price}
      onChange={(e) =>
        updateMenuEnfant(
          "price",
          Number(e.target.value)
        )
      }
      className="
        rounded-2xl
        border
        p-4
        md:col-span-2
      "
    />

  </div>

</div>

              {/* HORAIRES BAR */}
              <div className="
                rounded-3xl
                bg-[#faf7f2]
                p-8
              ">

                <h3 className="
                  mb-8
                  text-3xl
                  font-bold
                  font-serif
                ">
                  Horaires du bar
                </h3>

                <div className="
                  space-y-4
                ">

                  {restaurantData.barHoraires?.map(
                    (
                      horaire,
                      index
                    ) => (

                      <div
                        key={index}
                        className="
                          grid gap-4
                          rounded-2xl
                          bg-white
                          p-4
                          md:grid-cols-2
                        "
                      >

                        <input
                          type="text"
                          value={horaire.day}
                          onChange={(e) =>
                            updateHoraire(
                              "barHoraires",
                              index,
                              "day",
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
                          value={horaire.hours}
                          onChange={(e) =>
                            updateHoraire(
                              "barHoraires",
                              index,
                              "hours",
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

                    )
                  )}

                </div>

              </div>

              {/* HORAIRES RESTAURANT */}
              <div className="
                rounded-3xl
                bg-[#faf7f2]
                p-8
              ">

                <h3 className="
                  mb-8
                  text-3xl
                  font-bold
                  font-serif
                ">
                  Horaires restaurant
                </h3>

                <div className="
                  space-y-4
                ">

                  {restaurantData.restaurantHoraires?.map(
                    (
                      horaire,
                      index
                    ) => (

                      <div
                        key={index}
                        className="
                          grid gap-4
                          rounded-2xl
                          bg-white
                          p-4
                          md:grid-cols-2
                        "
                      >

                        <input
                          type="text"
                          value={horaire.day}
                          onChange={(e) =>
                            updateHoraire(
                              "restaurantHoraires",
                              index,
                              "day",
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
                          value={horaire.hours}
                          onChange={(e) =>
                            updateHoraire(
                              "restaurantHoraires",
                              index,
                              "hours",
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

                    )
                  )}

                </div>

              </div>

            </div>

          </section>

        </div>

      </main>

    </>
  )
}