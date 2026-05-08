"use client"

import { useEffect , useState } from "react"
import { HOTEL_CONFIG } from "@/data/hotel"
import { RESTAURANT_CONFIG } from "@/data/restaurant"

export default function AdminPage() {
  const [hotelData, setHotelData] = useState(HOTEL_CONFIG)
  const [restaurantData, setRestaurantData] = useState(RESTAURANT_CONFIG)

  useEffect(() => {
  const savedHotel = localStorage.getItem("hotelData")
  const savedRestaurant =
    localStorage.getItem("restaurantData")

  if (savedHotel) {
    setHotelData(JSON.parse(savedHotel))
  }

  if (savedRestaurant) {
    setRestaurantData(JSON.parse(savedRestaurant))
  }
}, [])

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

  const updateMenuItem = (
    category: string,
    index: number,
    field: string,
    value: string | number
  ) => {
    const categoryData = restaurantData[category as keyof typeof restaurantData]
    const updatedCategory = Array.isArray(categoryData) ? [...categoryData] : []

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
    const categoryData = restaurantData[category as keyof typeof restaurantData]
    const currentItems = Array.isArray(categoryData) ? categoryData : []
    
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

  const removeMenuItem = (category: string, index: number) => {
    const categoryData = restaurantData[category as keyof typeof restaurantData]
    const updatedCategory = Array.isArray(categoryData) 
      ? categoryData.filter((_: unknown, i) => i !== index)
      : []

    setRestaurantData({
      ...restaurantData,
      [category]: updatedCategory,
    })
  }

const saveChanges = () => {
  localStorage.setItem(
    "hotelData",
    JSON.stringify(hotelData)
  )

  localStorage.setItem(
    "restaurantData",
    JSON.stringify(restaurantData)
  )

  window.dispatchEvent(new Event("pricesUpdated"))

  alert("Modifications sauvegardées")
}

  return (
  <div className="min-h-screen bg-[#faf7f2] p-8 text-[#2f241d]">
    <div className="mx-auto max-w-4xl space-y-12">
      <h1 className="text-4xl font-bold text-[#2f241d]">
        Admin
      </h1>

      <section className="space-y-8 rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="text-3xl font-bold">Hôtel</h2>

          <div className="space-y-8">
            <div className="space-y-5">
              <h3 className="text-2xl font-semibold">
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
                  className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4 text-[#2f241d]"
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
                  className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4 text-[#2f241d]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  2 chambres de 2 personnes
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
                  className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4 text-[#2f241d]"
                />
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-2xl font-semibold">
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
                      className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4 text-[#2f241d]"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section className="space-y-8 rounded-3xl bg-white p-8">
          <h2 className="text-3xl font-bold">Restaurant</h2>

          <div className="space-y-12">
            {Object.entries(restaurantData)
  .filter(([_, items]) => Array.isArray(items))
  .map(([category, items]) => (
                <div key={category}>
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-2xl font-semibold capitalize">
                      {category}
                    </h3>

                    <button
                      onClick={() => addMenuItem(category)}
                      className="rounded-2xl bg-[#c89b5f] px-5 py-3 font-semibold text-white"
                    >
                      Ajouter
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(items as any[]).map((item: any, index: number) => (
                      <div
                        key={index}
                        className="grid gap-4 rounded-2xl bg-[#faf7f2] p-4 md:grid-cols-[1fr_150px_120px]"
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
                          className="rounded-2xl border border-[#d9d1c7] bg-white p-4 text-[#2f241d]"
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
                          className="rounded-2xl border border-[#d9d1c7] bg-white p-4 text-[#2f241d]"
                        />

                        <button
                          onClick={() =>
                            removeMenuItem(category, index)
                          }
                          className="rounded-2xl bg-red-500 px-4 py-3 font-semibold text-white"
                        >
                          Supprimer
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        <button
          onClick={saveChanges}
          className="w-full rounded-3xl bg-[#2f241d] py-5 text-xl font-bold text-white transition hover:bg-[#43352c]"
        >
          Sauvegarder les modifications
        </button>
      </div>
    </div>
  )
}