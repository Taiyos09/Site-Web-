"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { HOTEL_CONFIG } from "@/data/hotel"
import { RESTAURANT_CONFIG } from "@/data/restaurant"

export default function AdminPage() {
  const [hotelData, setHotelData] =
    useState(HOTEL_CONFIG)

  const [restaurantData, setRestaurantData] =
    useState(RESTAURANT_CONFIG)

  useEffect(() => {
  const savedHotel =
    localStorage.getItem("hotelData")

  const savedRestaurant =
    localStorage.getItem("restaurantData")

  if (savedHotel) {
    setHotelData(JSON.parse(savedHotel))
  }

  if (savedRestaurant) {
  const parsedRestaurant =
    JSON.parse(savedRestaurant)

  setRestaurantData({
    ...RESTAURANT_CONFIG,
    ...parsedRestaurant,

    menuDuJour: {
      ...RESTAURANT_CONFIG.menuDuJour,
      ...parsedRestaurant.menuDuJour,
    },

    menuEnfant: {
      ...RESTAURANT_CONFIG.menuEnfant,
      ...parsedRestaurant.menuEnfant,
    },

    barHoraires:
      parsedRestaurant.barHoraires ||
      RESTAURANT_CONFIG.barHoraires,

    restaurantHoraires:
      parsedRestaurant.restaurantHoraires ||
      RESTAURANT_CONFIG.restaurantHoraires,
  })
}
}, [])

  /* ---------------- HOTEL ---------------- */

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

  /* ---------------- RESTAURANT ---------------- */

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

    const updatedCategory = Array.isArray(
      categoryData
    )
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

  const addMenuItem = (category: string) => {
    const categoryData =
      restaurantData[
        category as keyof typeof restaurantData
      ]

    const currentItems = Array.isArray(
      categoryData
    )
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

    const updatedCategory = Array.isArray(
      categoryData
    )
      ? categoryData.filter(
          (_: unknown, i) => i !== index
        )
      : []

    setRestaurantData({
      ...restaurantData,
      [category]: updatedCategory,
    })
  }

  /* ---------------- MENU DU JOUR ---------------- */

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

  /* ---------------- MENU ENFANT ---------------- */

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

  const updateHoraire = (
  type: "barHoraires" | "restaurantHoraires",
  index: number,
  field: "day" | "hours",
  value: string
) => {

  const updated = [
    ...restaurantData[type]
  ]

  updated[index][field] = value

  setRestaurantData({
    ...restaurantData,
    [type]: updated,
  })
}

  /* ---------------- SAVE ---------------- */

  const saveChanges = () => {
    localStorage.setItem(
      "hotelData",
      JSON.stringify(hotelData)
    )

    localStorage.setItem(
      "restaurantData",
      JSON.stringify(restaurantData)
    )

    window.dispatchEvent(
      new Event("pricesUpdated")
    )

    alert("Modifications sauvegardées")
  }

  return (
  <div className="min-h-screen bg-[#f5f1ea] text-[#2f241d]">

    {/* HEADER */}
    <div className="sticky top-0 z-50 border-b border-[#e7ded2] bg-[#f5f1ea]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

        <div className="flex items-center gap-4">

  <Link
    href="/"
    className="rounded-2xl border border-[#d8cfc3] bg-white px-5 py-3 font-semibold transition hover:bg-[#faf7f2]"
  >
    ← Accueil
  </Link>

  <div>
    <h1 className="text-4xl font-bold font-serif">
      Administration
    </h1>

    <p className="mt-1 text-[#6b5b4f]">
      Gestion de l’auberge, restaurant et menus.
    </p>
  </div>

</div>

        <button
          onClick={saveChanges}
          className="rounded-2xl bg-[#2f241d] px-8 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#43352c]"
        >
          Sauvegarder
        </button>
      </div>
    </div>

    {/* CONTENU */}
    <div className="mx-auto max-w-7xl space-y-10 px-8 py-10">

      {/* HOTEL */}
      <section className="rounded-[36px] border border-[#e7ded2] bg-white/80 p-10 shadow-xl backdrop-blur">

        <div className="mb-10">
          <h2 className="text-3xl font-bold font-serif">
            Hôtel
          </h2>

          <p className="mt-2 text-[#6b5b4f]">
            Gestion des prix et options des chambres.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* PRIX */}
          <div className="space-y-6 rounded-3xl bg-[#faf7f2] p-8">

            <h3 className="text-2xl font-bold">
              Prix des chambres
            </h3>

            <div>
              <label className="mb-2 block font-medium">
                1 personne
              </label>

              <input
                type="number"
                value={hotelData.roomPrices.onePerson}
                onChange={(e) =>
                  updateRoomPrice(
                    "onePerson",
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-2xl border border-[#d8cfc3] bg-white p-4 outline-none transition focus:border-[#c89b5f] focus:ring-4 focus:ring-[#c89b5f]/20"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                2 personnes
              </label>

              <input
                type="number"
                value={hotelData.roomPrices.twoPeople}
                onChange={(e) =>
                  updateRoomPrice(
                    "twoPeople",
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-2xl border border-[#d8cfc3] bg-white p-4 outline-none transition focus:border-[#c89b5f] focus:ring-4 focus:ring-[#c89b5f]/20"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                2 chambres
              </label>

              <input
                type="number"
                value={hotelData.roomPrices.doubleRoom}
                onChange={(e) =>
                  updateRoomPrice(
                    "doubleRoom",
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-2xl border border-[#d8cfc3] bg-white p-4 outline-none transition focus:border-[#c89b5f] focus:ring-4 focus:ring-[#c89b5f]/20"
              />
            </div>
          </div>

          {/* OPTIONS */}
          <div className="space-y-6 rounded-3xl bg-[#faf7f2] p-8">

            <h3 className="text-2xl font-bold">
              Options hôtel
            </h3>

            {Object.entries(hotelData.options).map(
              ([key, value]) => (
                <div key={key}>
                  <label className="mb-2 block font-medium capitalize">
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
                    className="w-full rounded-2xl border border-[#d8cfc3] bg-white p-4 outline-none transition focus:border-[#c89b5f] focus:ring-4 focus:ring-[#c89b5f]/20"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* RESTAURANT */}
      <section className="rounded-[36px] border border-[#e7ded2] bg-white/80 p-10 shadow-xl backdrop-blur">

        <div className="mb-10">
          <h2 className="text-3xl font-bold font-serif">
            Restaurant
          </h2>

          <p className="mt-2 text-[#6b5b4f]">
            Gestion de la carte et des menus.
          </p>
        </div>

        <div className="space-y-12">

          {/* ENTREES / PLATS / DESSERTS */}
{Object.entries(restaurantData)
  .filter(
    ([key, items]) =>
      Array.isArray(items) &&
      key !== "barHoraires" &&
      key !== "restaurantHoraires"
  )
  .map(([category, items]) => (
              <div
                key={category}
                className="rounded-3xl bg-[#faf7f2] p-8"
              >

                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-2xl font-bold capitalize">
                    {category}
                  </h3>

                  <button
                    onClick={() =>
                      addMenuItem(category)
                    }
                    className="rounded-2xl bg-[#c89b5f] px-5 py-3 font-semibold text-white transition hover:scale-105"
                  >
                    Ajouter
                  </button>
                </div>

                <div className="space-y-4">
                  {(items as any[]).map(
                    (item: any, index: number) => (
                      <div
                        key={index}
                        className="grid gap-4 rounded-3xl bg-white p-4 shadow-sm md:grid-cols-[1fr_160px_140px]"
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
                          className="rounded-2xl border border-[#d8cfc3] bg-[#fffdf9] p-4 outline-none transition focus:border-[#c89b5f] focus:ring-4 focus:ring-[#c89b5f]/20"
                        />

                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            updateMenuItem(
                              category,
                              index,
                              "price",
                              Number(e.target.value)
                            )
                          }
                          className="rounded-2xl border border-[#d8cfc3] bg-[#fffdf9] p-4 outline-none transition focus:border-[#c89b5f] focus:ring-4 focus:ring-[#c89b5f]/20"
                        />

                        <button
                          onClick={() =>
                            removeMenuItem(
                              category,
                              index
                            )
                          }
                          className="rounded-2xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
                        >
                          Supprimer
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}

          {/* HORAIRES BAR */}
<div className="rounded-3xl bg-[#faf7f2] p-8 shadow-sm">

  <div className="mb-8">
    <h3 className="text-3xl font-bold font-serif">
      Horaires du bar
    </h3>
  </div>

  <div className="space-y-4">

  {restaurantData.barHoraires?.map(
    (horaire, index) => (
      <div
        key={index}
        className="grid gap-4 rounded-2xl bg-white p-4 md:grid-cols-2"
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
          className="rounded-2xl border p-4"
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
          className="rounded-2xl border p-4"
        />
      </div>
    )
  )}

</div>
</div>

{/* HORAIRES RESTAURANT */}
<div className="rounded-3xl bg-[#faf7f2] p-8 shadow-sm">

  <div className="mb-8">
    <h3 className="text-3xl font-bold font-serif">
      Horaires restaurant
    </h3>
  </div>

  <div className="space-y-4">

    {restaurantData.restaurantHoraires?.map(
      (horaire, index) => (
        <div
          key={index}
          className="grid gap-4 rounded-2xl bg-white p-4 md:grid-cols-2"
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
            className="rounded-2xl border p-4"
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
            className="rounded-2xl border p-4"
          />
        </div>
      )
    )}
  </div>
</div>

          {/* MENUS */}
          <div className="grid gap-8 lg:grid-cols-2">

            {/* MENU JOUR */}
            <div className="rounded-[32px] bg-[#2f241d] p-8 text-white shadow-2xl">

              <h3 className="mb-8 text-3xl font-bold font-serif">
                Menu du jour
              </h3>

              <div className="space-y-5">

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
                  className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/50 outline-none backdrop-blur"
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
                  className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/50 outline-none backdrop-blur"
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
                  className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/50 outline-none backdrop-blur"
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
                  className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/50 outline-none backdrop-blur"
                />
              </div>
            </div>

            {/* MENU ENFANT */}
            <div className="rounded-[32px] bg-[#c89b5f] p-8 text-white shadow-2xl">

              <h3 className="mb-8 text-3xl font-bold font-serif">
                Menu enfant
              </h3>

              <div className="space-y-5">

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
                  className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/60 outline-none backdrop-blur"
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
                  className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/60 outline-none backdrop-blur"
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
                  className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/60 outline-none backdrop-blur"
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
                  className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/60 outline-none backdrop-blur"
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
                  className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder:text-white/60 outline-none backdrop-blur"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
)
}