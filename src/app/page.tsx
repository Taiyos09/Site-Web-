"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import { RESTAURANT_CONFIG } from "@/data/restaurant"
import { EVENTS } from "@/data/events"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Hôtel", href: "/hotel" },
  { name: "Restaurant", href: "/restaurant" },
  { name: "Événements", href: "/evenements" },
  { name: "Contact", href: "/contact" },
]

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
]

export default function AubergeSaintAubinHomepage() {
  const [currentImage, setCurrentImage] = useState(0)

  const [eventsData, setEventsData] =
  useState(EVENTS)

  const [restaurantConfig, setRestaurantConfig] =
  useState(RESTAURANT_CONFIG)

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
})

const [loading, setLoading] = useState(false)

useEffect(() => {

  /* RESTAURANT */

  const savedRestaurant =
    localStorage.getItem("restaurantData")

  if (savedRestaurant) {

    const parsedRestaurant =
      JSON.parse(savedRestaurant)

    setRestaurantConfig({
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

  /* EVENEMENTS */

  const savedEvents =
    localStorage.getItem("eventsData")

  if (savedEvents) {
    setEventsData(JSON.parse(savedEvents))
  }

  const refreshEvents = () => {

    const updatedEvents =
      localStorage.getItem("eventsData")

    if (updatedEvents) {
      setEventsData(JSON.parse(updatedEvents))
    }
  }

  window.addEventListener(
    "pricesUpdated",
    refreshEvents
  )

  return () => {
    window.removeEventListener(
      "pricesUpdated",
      refreshEvents
    )
  }

}, [])
const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault()

  setLoading(true)

  try {

    const response = await fetch(
      "/api/contact",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    )

    if (response.ok) {

      alert("Message envoyé !")

      setFormData({
        name: "",
        email: "",
        message: "",
      })

    } else {
      alert("Erreur lors de l'envoi")
    }

  } catch (error) {

    alert("Erreur serveur")
  }

  setLoading(false)
}

  return (
  <div
    className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-[#f5f1ea] text-[#2f241d] font-serif pt-24"
  >
      {/* NAVBAR */}
      <Navbar />
      {/* HERO */}
      <section
        className="relative snap-start min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/auberge-de-saint-aubin.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex min-h-[calc(100vh-96px)] flex-col items-center justify-center px-6 text-center text-white">
          <div className=" p-8 rounded-lg ">
            <div className="flex flex-col items-center gap-1">
  <img
    src="/images/logo2.png"
    alt="Logo Auberge St Aubin"
    className="h-80 w-auto drop-shadow-2xl"
  />
            <p className="mt-1 mb-8 max-w-3xl text-lg md:text-xl text-white/90">
              Une auberge chaleureuse entre authenticité, convivialité et
              traditionnelle.
            </p>
</div>
          </div>
       <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/hotel"
              className="rounded-2xl bg-[#c89b5f] px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:bg-[#d4a76a]"
          >
              Réserver une chambre
            </Link>

            <Link
              href="/restaurant" 
              className="rounded-2xl border border-white/70 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:bg-white/20 hover:shadow-2xl"
            >
              Découvrir le restaurant
            </Link>
          </div>
        </div>
      </section>

      {/* PRESENTATION */}
<section
  id="restaurant"
  className="relative snap-start min-h-screen border-t border-[#e5ddd2] bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage: "url('/images/test.png')",
  }}
>
  <div className="absolute inset-0 bg-white/0" />
  <div className="relative mx-auto max-w-7xl px-6 w-full">
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div className=" p-8 ">
        <h2 className="mb-6 text-4xl text-white font-bold font-serif"
        style={{
    textShadow: `
      0 0 3px rgba(0,0,0,0.95),
    2px 2px 4px rgba(0,0,0,0.9),
    4px 4px 8px rgba(0,0,0,0.85),
    6px 6px 12px rgba(0,0,0,0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '1'
  }}>
          Une auberge authentique
        </h2>

        <p className="mb-4 text-lg leading-relaxed font-sans text-white">
          <span
  className="inline-block"
  style={{
    textShadow: `
      0 0 3px rgba(0,0,0,0.95),
    2px 2px 4px rgba(0,0,0,0.9),
    4px 4px 8px rgba(0,0,0,0.85),
    6px 6px 12px rgba(0,0,0,0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '1'
  }}
>
            Située au cœur de la campagne bourbonnaise, dans un cadre calme et
            authentique, l'Auberge de St Aubin vous accueille pour partager un
            moment convivial autour d'une cuisine généreuse et traditionnelle.
            Que ce soit pour une pause au bar, un repas en famille ou un séjour
            au calme dans l'Allier, l'auberge vous ouvre ses portes dans une
            ambiance chaleureuse et familiale.
          </span>
        </p>

        <p className="text-lg leading-relaxed font-sans text-white">
          <span
  className="inline-block"
  style={{
    textShadow: `
      0 0 3px rgba(0,0,0,0.95),
    2px 2px 4px rgba(0,0,0,0.9),
    4px 4px 8px rgba(0,0,0,0.85),
    6px 6px 12px rgba(0,0,0,0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '0.95'
  }}
>
            Entre chambres confortables, cuisine maison et événements du vendredi
            soir, découvrez une ambiance rustique moderne pensée pour tous.
          </span>
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

      {/* HORAIRES */}
<section
  id="horaires"
  className="relative snap-start min-h-screen border-t border-[#e5ddd2] bg-cover bg-center bg-no-repeat flex items-center justify-center"
  style={{ backgroundImage: "url('/images/horaires-bg.png')" }}
>
  <div className="absolute inset-0 bg-white/0"></div>

  <div className="relative mx-auto max-w-7xl px-6 w-full">

    {/* TITRE */}
    <div className="mb-14 text-center">
      <h2
        className="mb-4 text-4xl text-white font-bold"
        style={{
          textShadow: `
            0 0 3px rgba(0,0,0,0.95),
            2px 2px 4px rgba(0,0,0,0.9),
            4px 4px 8px rgba(0,0,0,0.85),
            6px 6px 12px rgba(0,0,0,0.75)
          `,
        }}
      >
        Nos horaires
      </h2>

      <p
        className="text-lg text-white font-sans"
        style={{
          textShadow: `
            0 0 3px rgba(0,0,0,0.95),
            2px 2px 4px rgba(0,0,0,0.9),
            4px 4px 8px rgba(0,0,0,0.85),
            6px 6px 12px rgba(0,0,0,0.75)
          `,
        }}
      >
        Retrouvez les horaires du bar et du restaurant.
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-2">

      {/* BAR */}
      <div className="rounded-3xl bg-[#faf7f2] p-8 shadow-xl">

        <h3 className="mb-6 text-3xl font-bold text-[#2f241d]">
          🍷 Bar
        </h3>

        <div className="space-y-4 text-lg">

          {restaurantConfig.barHoraires.map(
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

      {/* RESTAURANT */}
      <div className="rounded-3xl bg-[#faf7f2] p-8 shadow-xl">

        <h3 className="mb-6 text-3xl font-bold text-[#2f241d]">
          🍽️ Restaurant
        </h3>

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
  </div>
</section>

      {/* RESTAURANT */}
      <section
        id="restaurantbar"
        className="relative border-t snap-start min-h-screen border-[#e5ddd2] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/table.png')",
        }}
      >
        <div className="absolute inset-0 bg-[#f5f1ea]/10 backdrop-blur-[1px]" />
        <div className="relative mx-auto max-w-7xl px-6 w-full">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <img
              src="/images/bar.jpeg"
              alt="Restaurant"
              className="rounded-3xl shadow-2xl"
            />

            <div>
              <h2 className="mb-6 text-4xl font-bold font-serif"
              style={{
    textShadow: `
      0 0 3px rgba(255, 255, 255, 0.95),
    2px 2px 4px rgba(255, 255, 255, 0.9),
    4px 4px 8px rgba(255, 255, 255, 0.85),
    6px 6px 12px rgba(255, 255, 255, 0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '1'
  }}>Restaurant & bar</h2>

              <p className="mb-4 text-lg leading-relaxed font-bold font-sans text-[rgb(0, 0, 0)]"
              style={{
    textShadow: `
      0 0 3px rgba(255, 255, 255, 0.95),
    2px 2px 4px rgba(255, 255, 255, 0.9),
    4px 4px 8px rgba(255, 255, 255, 0.85),
    6px 6px 12px rgba(255, 255, 255, 0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '1'
  }}>
                Découvrez une cuisine conviviale avec carte fixe et menu du jour
                du lundi au vendredi.
              </p>

              <p className="mb-8 text-lg leading-relaxed font-bold font-sans text-[rgb(0, 0, 0)]"
              style={{
    textShadow: `
      0 0 3px rgba(255, 255, 255, 0.95),
    2px 2px 4px rgba(255, 255, 255, 0.9),
    4px 4px 8px rgba(255, 255, 255, 0.85),
    6px 6px 12px rgba(255, 255, 255, 0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '1'
  }}>
                Le bar accueille également des soirées événements et concerts
                occasionnels.
              </p>

              <Link
                href="/restaurant"
                className="inline-block font-sans rounded-2xl bg-[#c89b5f] px-8 py-4 text-lg text-[rgb(0, 0, 0)] shadow-xl transition hover:scale-105"
              >
                Voir la carte
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EVENEMENTS */}
<section
  id="evenements"
  className="relative snap-start min-h-screen border-t border-white/10 bg-cover bg-center text-white"
  style={{
    backgroundImage: "url('/images/festif.png')",
  }}
>
  {/* OVERLAY */}
  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

  {/* CONTENU */}
  <div className="relative z-10 mx-auto flex min-h-screen max-w-[1800px] items-center px-10 py-24">
    <div className="w-full">
      
      {/* TITRE */}
      <div className="mb-20 text-center">
        <h2 className="mb-4 font-serif text-5xl font-bold">
          Événements
        </h2>

        <p className="font-sans text-xl text-white/90">
          Concerts, soirées du vendredi et animations.
        </p>
      </div>

      {/* CARDS */}
<div className="grid gap-8 md:grid-cols-3">

  {/* CARD 1 */}
 {eventsData.map((event, index) => (
  <div
    key={index}
    className="rounded-3xl bg-white/10 p-6 text-center shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/15"
  >

    {/* DATE */}
    <div className="mb-8 inline-block rounded-2xl bg-[#c89b5f] px-5 py-2 font-serif text-white shadow-lg">
      {event.date}
    </div>

    {/* TITRE */}
    <h3 className="mb-6 font-serif text-3xl font-semibold">
      {event.title}
    </h3>

    {/* IMAGE */}
    <img
      src={event.image}
      alt={event.title}
      className="mb-8 h-34 w-full rounded-2xl object-cover shadow-xl md:w-34 md:mx-auto"
    />

    {/* TEXTE */}
    <p className="font-sans text-lg leading-relaxed text-white/90">
      {event.description}
    </p>

  </div>
))}
</div> {/* FIN GRID */}
    </div> {/* FIN W-FULL */}
  </div> {/* FIN CONTENU */}
</section> {/* FIN EVENEMENTS */}
      {/* CONTACT */}
      <section id="contact" className="border-t snap-start min-h-screen border-[#e5ddd2] flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-bold">Contact</h2>

            <div className="space-y-4 text-lg text-[#5a4c42]">
              <p>📍 L&apos;Auberge de St Aubin
                  <br />
                  21 Rue Saint-Barnabé
                  <br />
                  03160 Saint Aubin le Monial</p>
              <p>📞 04 70 66 50 97</p>
              <p>✉️ contact@auberge-st-aubin.fr</p>
            </div>
          </div>

          <form
  onSubmit={handleSubmit}
  className="space-y-4 rounded-3xl bg-white p-8 shadow-xl"
>
            <input
  type="text"
  placeholder="Nom"
  value={formData.name}
  onChange={(e) =>
    setFormData({
      ...formData,
      name: e.target.value,
    })
  }
  className="w-full rounded-2xl border p-4"
/>

            <input
  type="email"
  placeholder="Email"
  value={formData.email}
  onChange={(e) =>
    setFormData({
      ...formData,
      email: e.target.value,
    })
  }
  className="w-full rounded-2xl border p-4"
/>

            <textarea
              placeholder="Votre message"
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              className="w-full rounded-2xl border p-4"
            />

            <button 
  type="submit"
  className="w-full rounded-2xl bg-[#2f241d] py-4 text-white transition hover:bg-[#43352c]"
  disabled={loading}
>
              {loading ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1f1712] px-6 py-10 text-center text-white/70">
        <p>© 2026 L&apos;auberge de St Aubin — Tous droits réservés</p>
      </footer>
    </div>
  )
}
