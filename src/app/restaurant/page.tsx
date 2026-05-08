"use client"

import Link from "next/link"
import { useEffect, useState, useMemo } from "react"
import { RESTAURANT_CONFIG } from "@/data/restaurant"

const images = [
  "/images/restaurant1.jpeg",
  "/images/restaurant2.jpeg",
  "/images/restaurant3.jpeg",
]

export default function RestaurantPage() {
  const [restaurantConfig, setRestaurantConfig] = useState(RESTAURANT_CONFIG)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const readRestaurantConfig = () => {
      const savedRestaurant = localStorage.getItem("restaurantData")
      if (!savedRestaurant) return

      setRestaurantConfig(JSON.parse(savedRestaurant))
    }

    readRestaurantConfig()

    window.addEventListener("pricesUpdated", readRestaurantConfig)
    return () => {
      window.removeEventListener("pricesUpdated", readRestaurantConfig)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#2f241d]">
      {/* HERO */}
      <section
        className="relative h-[75vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/restaurant-hero.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="mb-4 h-150 w-auto drop-shadow-2xl"
          />

          <p className="max-w-3xl text-lg md:text-2xl text-white/90">
            Cuisine maison, terroir bourbonnais et ambiance conviviale.
          </p>
        </div>
      </section>

      {/* PRESENTATION */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-bold">
              Une cuisine authentique
            </h2>

            <p className="mb-4 text-lg leading-relaxed text-[#5a4c42]">
              L&apos;Auberge de St Aubin vous accueille dans une ambiance
              chaleureuse et familiale autour d&apos;une cuisine généreuse et
              traditionnelle.
            </p>

            <p className="text-lg leading-relaxed text-[#5a4c42]">
              Produits locaux, plats maison, menus du jour et soirées
              conviviales rythment la vie de l&apos;auberge au cœur de la
              campagne bourbonnaise.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-[#f5f1ea] shadow-2xl">
            <img
              src={images[currentImage]}
              alt="Restaurant"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* CARTE */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              Notre carte
            </h2>

            <p className="text-lg text-[#6b5b4f]">
              Découvrez nos spécialités maison.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* ENTREES */}
            <div className="rounded-3xl bg-[#faf7f2] p-8 shadow-xl">
              <h3 className="mb-8 text-3xl font-bold">
                Entrées
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between">
                    <span>{restaurantConfig.entrees[0].name}</span>
                    <span>{restaurantConfig.entrees[0].price}€</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>{restaurantConfig.entrees[1].name}</span>
                    <span>{restaurantConfig.entrees[1].price}€</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>{restaurantConfig.entrees[2].name}</span>
                    <span>{restaurantConfig.entrees[2].price}€</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PLATS */}
            <div className="rounded-3xl bg-[#faf7f2] p-8 shadow-xl">
              <h3 className="mb-8 text-3xl font-bold">
                Plats
              </h3>

              <div className="space-y-6">
                <div className="flex justify-between">
                  <span>{restaurantConfig.plats[0].name}</span>
                  <span>{restaurantConfig.plats[0].price}€</span>
                </div>

                <div className="flex justify-between">
                  <span>{restaurantConfig.plats[1].name}</span>
                  <span>{restaurantConfig.plats[1].price}€</span>
                </div>

                <div className="flex justify-between">
                  <span>{restaurantConfig.plats[2].name}</span>
                  <span>{restaurantConfig.plats[2].price}€</span>
                </div>

                <div className="flex justify-between">
                  <span>{restaurantConfig.plats[3].name}</span>
                  <span>{restaurantConfig.plats[3].price}€</span>
                </div>
              </div>
            </div>

            {/* DESSERTS */}
            <div className="rounded-3xl bg-[#faf7f2] p-8 shadow-xl">
              <h3 className="mb-8 text-3xl font-bold">
                Desserts
              </h3>

              <div className="space-y-6">
                <div className="flex justify-between">
                  <span>{restaurantConfig.desserts[0].name}</span>
                  <span>{restaurantConfig.desserts[0].price}€</span>
                </div>

                <div className="flex justify-between">
                  <span>{restaurantConfig.desserts[1].name}</span>
                  <span>{restaurantConfig.desserts[1].price}€</span>
                </div>

                <div className="flex justify-between">
                  <span>{restaurantConfig.desserts[2].name}</span>
                  <span>{restaurantConfig.desserts[2].price}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU DU JOUR */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[40px] bg-[#2f241d] p-12 text-white shadow-2xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              Menu du jour
            </h2>

            <p className="text-lg text-white/80">
              Disponible du lundi au vendredi midi.
            </p>
          </div>

          <div className="space-y-6 text-center text-xl">
            <p>🥗 {restaurantConfig.menuDuJour.starter}</p>
            <p>🍖 {restaurantConfig.menuDuJour.main}</p>
            <p>🍰 {restaurantConfig.menuDuJour.dessert}</p>

            <div className="pt-6 text-4xl font-bold text-[#c89b5f]">
              {restaurantConfig.menuDuJour.price}€
            </div>
          </div>
        </div>
      </section>

      {/* HORAIRES */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              Horaires du restaurant
            </h2>

            <p className="text-lg text-[#6b5b4f]">
              Retrouvez nos horaires de service.
            </p>
          </div>

          <div className="rounded-3xl bg-[#faf7f2] p-10 shadow-xl">
            <div className="space-y-4 text-lg">
              <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
                <span>{restaurantConfig.horaires[0].day}</span>
                <span>{restaurantConfig.horaires[0].hours}</span>
              </div>

              <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
                <span>{restaurantConfig.horaires[1].day}</span>
                <span>{restaurantConfig.horaires[1].hours}</span>
              </div>

              <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
                <span>{restaurantConfig.horaires[2].day}</span>
                <span>{restaurantConfig.horaires[2].hours}</span>
              </div>

              <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
                <span>{restaurantConfig.horaires[3].day}</span>
                <span>{restaurantConfig.horaires[3].hours}</span>
              </div>

              <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
                <span>{restaurantConfig.horaires[4].day}</span>
                <span>{restaurantConfig.horaires[4].hours}</span>
              </div>

              <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
                <span>{restaurantConfig.horaires[5].day}</span>
                <span>{restaurantConfig.horaires[5].hours}</span>
              </div>

              <div className="flex justify-between">
                <span>{restaurantConfig.horaires[6].day}</span>
                <span>{restaurantConfig.horaires[6].hours}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="mb-6 text-4xl font-bold">
          Informations pratiques
        </h2>

        <div className="space-y-4 text-lg text-[#5a4c42]">
          <p>📍 Auberge de St Aubin - Allier</p>
          <p>📞 00 00 00 00 00</p>
          <p>🍷 Bar & restaurant convivial</p>
          <p>🚗 Parking disponible</p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="rounded-2xl bg-[#2f241d] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#43352c]"
          >
            Retour à l’accueil
          </Link>
        </div>
      </section>
    </div>
  )
}