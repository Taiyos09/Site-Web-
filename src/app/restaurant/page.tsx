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
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-[#f5f1ea] text-[#2f241d]">
      {/* HERO */}
      <section
        className="relative snap-start min-h-screen flex h-[60vh] items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/restaurant-hero.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <img
            src="/images/logo2.png"
            alt="Logo"
            className="mb-4 h-100 w-auto drop-shadow-2xl"
          />

          <p className="max-w-3xl text-lg md:text-2xl text-white/90"style={{
    textShadow: `
      0 0 3px rgba(0,0,0,0.95),
    2px 2px 4px rgba(0,0,0,0.9),
    4px 4px 8px rgba(0,0,0,0.85),
    6px 6px 12px rgba(0,0,0,0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '1'
  }}>
            Cuisine maison, terroir bourbonnais et ambiance conviviale.
          </p>
        </div>
      </section>

      {/* PRESENTATION */}
      <section
  id="restaurant"
  className="snap-start min-h-screen flex items-center justify-center bg-[#f5f1ea]"
>
  <div className="mx-auto max-w-7xl px-6">
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div>
      <h2 className="mb-6 text-4xl font-serif font-bold">
        Une auberge authentique
      </h2>

      <p className="mb-4 text-lg leading-relaxed font-sans text-[#5a4c42]">
        Située au cœur de la campagne bourbonnaise, dans un cadre calme et
        authentique, l’Auberge de St Aubin vous accueille pour partager un
        moment convivial autour d’une cuisine généreuse et traditionnelle.
        Que ce soit pour une pause au bar, un repas en famille ou un séjour
        au calme dans l’Allier, l’auberge vous ouvre ses portes dans une
        ambiance chaleureuse et familiale.
      </p>

      <p className="text-lg leading-relaxed font-sans text-[#5a4c42]">
        Entre chambres confortables, cuisine maison et événements du vendredi
        soir, découvrez une ambiance rustique moderne pensée pour tous.
      </p>
      </div>

      <div className="overflow-hidden rounded-3xl shadow-2xl bg-[#f5f1ea] h-[280px] sm:h-[360px] md:h-[420px]">
        <img
          src={images[currentImage]}
          alt="Auberge"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </div>
  </div>
</section>

     {/* CARTE + MENU */}
<section
  className="relative snap-start min-h-screen overflow-hidden py-24"
  style={{
    backgroundImage:
      "url('/images/restaurant-propos.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>

  {/* OVERLAY SOMBRE */}
  <div className="absolute inset-0 bg-black/10" />

{/* TITRE */}
    <div className="mb-10 text-center">
      <h2 className="mb-3 text-5xl font-serif font-bold text-[rgba(0, 0, 0, 0.8)]">
        Nos Propositions culinaires
      </h2>

      <p className="mx-auto max-w-2xl text-lg text-[rgba(0, 0, 0, 0.8)] font-sans">
        Découvrez notre cuisine maison et notre menu du jour.
      </p>
    </div>

    {/* CONTENU */}
    <div className="grid items-start gap-8 xl:grid-cols-[1.75fr_0.55fr]">

      {/* CARTE */}
      <div className="grid gap-8 md:grid-cols-3">

        {/* ENTREES */}
        <div className="rounded-3xl bg-[#faf7f2]/80 p-8 shadow-xl">
          <h3 className="mb-10 text-center text-3xl font-serif font-bold">
            Entrées
          </h3>

          <div className="space-y-6 font-sans">
            {restaurantConfig.entrees.map((item, index) => (
              <div
                key={index}
                className="flex justify-between"
              >
                <span>{item.name}</span>
                <span>{item.price}€</span>
              </div>
            ))}
          </div>
        </div>

        {/* PLATS */}
        <div className="rounded-3xl bg-[#faf7f2]/80 p-8 shadow-xl">
          <h3 className="mb-10 text-center text-3xl font-serif font-bold">
            Plats
          </h3>

          <div className="space-y-6 font-sans">
            {restaurantConfig.plats.map((item, index) => (
              <div
                key={index}
                className="flex justify-between"
              >
                <span>{item.name}</span>
                <span>{item.price}€</span>
              </div>
            ))}
          </div>
        </div>

        {/* DESSERTS */}
        <div className="rounded-3xl bg-[#faf7f2]/80 p-8 shadow-xl">
          <h3 className="mb-10 text-center text-3xl font-serif font-bold">
            Desserts
          </h3>

          <div className="space-y-6 font-sans">
            {restaurantConfig.desserts.map((item, index) => (
              <div
                key={index}
                className="flex justify-between"
              >
                <span>{item.name}</span>
                <span>{item.price}€</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COLONNE DROITE */}
      <div className="-mt-25 flex flex-col gap-6">

        {/* MENU DU JOUR */}
        <div className="rounded-[32px] bg-[#2f241d] p-7 text-white shadow-2xl">

          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold font-serif">
              {restaurantConfig.menuDuJour.title}
            </h2>

            <p className="text-lg font-sans text-white/80">
              {restaurantConfig.menuDuJour.description}
            </p>
          </div>

          <div className="space-y-4 text-center text-xl">
            <p>
              🥗 {restaurantConfig.menuDuJour.starter}
            </p>

            <p>
              🍖 {restaurantConfig.menuDuJour.main}
            </p>

            <p>
              🍰 {restaurantConfig.menuDuJour.dessert}
            </p>

            <div className="pt-6 text-4xl font-bold text-[#c89b5f]">
              {restaurantConfig.menuDuJour.price}€
            </div>
          </div>
        </div>

        {/* MENU ENFANT */}
        <div className="rounded-[32px] bg-[#c89b5f] p-6 text-white shadow-2xl">

          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold font-serif">
              Menu enfant
            </h2>

            <p className="font-sans text-white/90">
              Pour les petits gourmands.
            </p>
          </div>

          <div className="space-y-5 text-center">

            <p className="font-sans text-lg">
              🍗 {restaurantConfig.menuEnfant.main}
            </p>

            <p className="font-sans text-lg">
              🍟 {restaurantConfig.menuEnfant.side}
            </p>

            <p className="font-sans text-lg">
              🧃 {restaurantConfig.menuEnfant.drink}
            </p>

            <p className="font-sans text-lg">
              🍦 {restaurantConfig.menuEnfant.dessert}
            </p>

            <div className="pt-4 text-3xl font-bold text-[#2f241d]">
              {restaurantConfig.menuEnfant.price}€
            </div>
          </div>
        </div>

      </div>
      </div>
</section>

      {/* HORAIRES */}
<section className="snap-start min-h-screen flex items-center justify-center bg-[#f5f1ea]"
style={{
  backgroundImage: "url('/images/stone-bg.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
}}>

  <div className="mx-auto max-w-5xl px-6">

    {/* TITRE */}
    <div className="mb-14 text-center">

      <h2
  className="mb-4 text-5xl font-bold text-white"
  style={{
    textShadow: `
      0 0 4px rgba(0,0,0,0.95),
      2px 2px 6px rgba(0,0,0,0.9),
      4px 4px 12px rgba(0,0,0,0.8)
    `,
  }}
>
  Horaires du restaurant
</h2>

<p
  className="text-xl text-white/95"
  style={{
    textShadow: `
      0 0 4px rgba(0,0,0,0.95),
      2px 2px 6px rgba(0,0,0,0.9),
      4px 4px 12px rgba(0,0,0,0.8)
    `,
  }}
>
  Retrouvez nos horaires de service.
</p>

    </div>

    {/* CARD */}
    <div className="rounded-3xl bg-[#faf7f2]/50 p-10 shadow-xl">

      <div className="space-y-4 text-lg">

        {restaurantConfig.restaurantHoraires.map(
          (horaire, index) => (

            <div
              key={index}
              className="flex justify-between border-b border-[#e5ddd2] pb-3"
            >
              <span>{horaire.day}</span>

              <span>{horaire.hours}</span>
            </div>

          )
        )}

      </div>
    </div>
  </div>
</section>
      {/* CONTACT */}
<section
  className="relative mx-auto flex min-h-screen snap-start items-center justify-center overflow-hidden px-6 text-center"
  style={{
    backgroundImage: "url('/images/stone-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-black/35" />

  {/* CONTENU */}
  <div className="relative z-10 rounded-[40px] bg-[rgba(255,248,240,0.82)] p-14 shadow-2xl backdrop-blur-sm">

    <h2
      className="mb-6 text-5xl font-bold text-[#2f241d]"
      style={{
        textShadow:
          "0 2px 10px rgba(255,255,255,0.35)",
      }}
    >
      Informations pratiques
    </h2>

    <div className="space-y-5 text-xl text-[#4e4036]">

      <p>📍 Auberge de St Aubin - Allier</p>

      <p>📞 00 00 00 00 00</p>

      <p>🍷 Bar & restaurant convivial</p>

      <p>🚗 Parking disponible</p>

    </div>

    <div className="mt-12">
      <Link
        href="/"
        className="rounded-2xl bg-[#2f241d] px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#43352c]"
      >
        Retour à l’accueil
      </Link>
    </div>

  </div>
</section>
    </div>
  )
}