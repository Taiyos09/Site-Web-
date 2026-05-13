"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import Navbar from "@/components/Navbar"
import { RESTAURANT_CONFIG } from "@/data/restaurant"
import { EVENTS } from "@/data/events"

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
]

export default function AubergeSaintAubinHomepage() {

  const [currentImage, setCurrentImage] =
    useState(0)

  const [eventsData, setEventsData] =
    useState(EVENTS)

  const [restaurantConfig, setRestaurantConfig] =
    useState(RESTAURANT_CONFIG)

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      message: "",
    })

  const [loading, setLoading] =
    useState(false)

  /* ===================================== */
  /* ANIMATIONS */
  /* ===================================== */

  const fadeUp = {

    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.7,
      },
    },
  }

  /* ===================================== */
  /* AUTO SLIDER */
  /* ===================================== */

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage((prev) =>
        prev === images.length - 1
          ? 0
          : prev + 1
      )

    }, 5000)

    return () =>
      clearInterval(interval)

  }, [])

  /* ===================================== */
  /* LOAD DATA */
  /* ===================================== */

  useEffect(() => {

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

    const savedEvents =
      localStorage.getItem("eventsData")

    if (savedEvents) {
      setEventsData(JSON.parse(savedEvents))
    }

  }, [])

  /* ===================================== */
  /* CONTACT */
  /* ===================================== */

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
            "Content-Type":
              "application/json",
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

        alert(
          "Erreur lors de l'envoi"
        )
      }

    } catch (error) {

      alert("Erreur serveur")
    }

    setLoading(false)
  }

  return (

    <div
      className="
        overflow-x-hidden
        bg-[#f5f1ea]
        text-[#2f241d]
      "
    >

      {/* NAVBAR */}

      <Navbar />

      {/* HERO */}

      <section
        className="
          relative
          flex
          h-[82vh]
          min-h-[700px]
          items-center
          justify-center
          bg-cover
          bg-center
          border-b
          border-[#e4d8c8]
        "
        style={{
          backgroundImage:
            "url('/images/auberge-de-saint-aubin.jpg')",
        }}
      >

        <div className="absolute inset-0 bg-black/50" />

        <div
          className="
            relative
            z-10
            px-6
            text-center
            text-white
          "
        >

          <img
            src="/images/logo2.png"
            alt="Logo Auberge St Aubin"
            className="
              mx-auto
              mb-6
              h-52
              w-auto
              md:h-64
              drop-shadow-2xl
            "
          />

          <p
            className="
              mx-auto
              mb-10
              max-w-2xl
              text-lg
              leading-relaxed
              text-white/90
              md:text-xl
            "
          >
            Une auberge chaleureuse
            entre authenticité,
            convivialité et tradition.
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <Link
              href="/hotel"
              className="
                rounded-2xl
                bg-[#c89b5f]
                px-8
                py-4
                text-base
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-[#d6aa70]
                hover:scale-[1.03]
              "
            >
              Réserver une chambre
            </Link>

            <Link
              href="/restaurant"
              className="
                rounded-2xl
                border
                border-white/30
                bg-white/10
                px-8
                py-4
                text-base
                font-semibold
                text-white
                backdrop-blur-sm
                transition-all
                duration-300
                hover:bg-white/20
                hover:scale-[1.03]
              "
            >
              Découvrir le restaurant
            </Link>

          </div>

        </div>

      </section>

      {/* PRESENTATION */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
          relative
          border-t
          border-[#e4d8c8]
          bg-cover
          bg-center
          py-20
          md:py-28
        "
        style={{
          backgroundImage:
            "url('/images/test.png')",
        }}
      >

        <div className="absolute inset-0 bg-black/30" />

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-6xl
            items-center
            gap-16
            px-6
            lg:grid-cols-2
          "
        >

          {/* TEXTE */}

          <div
            className="
              rounded-[28px]
              bg-[#f6f1e8]/88
              p-8
              shadow-xl
              backdrop-blur-sm
            "
          >

            <h2
              className="
                mb-6
                font-serif
                text-4xl
                font-bold
                leading-tight
                md:text-5xl
              "
            >
              Une auberge authentique
            </h2>

            <div
              className="
                space-y-5
                text-lg
                leading-relaxed
                text-[#5a4c42]
              "
            >

              <p>
                Située au cœur de la
                campagne bourbonnaise,
                l'Auberge de St Aubin
                vous accueille dans un
                cadre calme et convivial.
              </p>

              <p>
                Entre chambres confortables,
                cuisine maison et ambiance
                familiale, profitez d’un
                lieu authentique pensé
                pour partager de bons moments.
              </p>

            </div>

          </div>

          {/* IMAGE */}

          <div
            className="
              overflow-hidden
              rounded-[28px]
              shadow-2xl
            "
          >

            <img
              src={images[currentImage]}
              alt="Auberge"
              className="
                h-[420px]
                w-full
                object-cover
              "
            />

          </div>

        </div>

      </motion.section>

      {/* HORAIRES */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
          relative
          border-t
          border-[#e4d8c8]
          bg-cover
          bg-center
          py-20
          md:py-28
        "
        style={{
          backgroundImage:
            "url('/images/horaires-bg.png')",
        }}
      >

        <div className="absolute inset-0 bg-black/25" />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-6xl
            px-6
          "
        >

          <div className="mb-14 text-center">

            <p
              className="
                mb-3
                text-sm
                uppercase
                tracking-[0.3em]
                text-[#d8bc8c]
              "
            >
              Informations
            </p>

            <h2
              className="
                font-serif
                text-4xl
                font-bold
                text-white
                md:text-5xl
              "
            >
              Nos horaires
            </h2>

          </div>

          <div
            className="
              grid
              gap-8
              md:grid-cols-2
            "
          >

            {/* BAR */}

            <div
              className="
                rounded-[28px]
                bg-[#faf7f2]
                p-8
                shadow-xl
              "
            >

              <h3
                className="
                  mb-8
                  font-serif
                  text-3xl
                  font-bold
                "
              >
                🍷 Bar
              </h3>

              <div className="space-y-4">

                {restaurantConfig.barHoraires.map(
                  (horaire, index) => (

                    <div
                      key={index}
                      className="
                        flex
                        justify-between
                        border-b
                        border-[#e5ddd2]
                        pb-3
                        text-lg
                      "
                    >

                      <span>
                        {horaire.day}
                      </span>

                      <span>
                        {horaire.hours}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* RESTAURANT */}

            <div
              className="
                rounded-[28px]
                bg-[#faf7f2]
                p-8
                shadow-xl
              "
            >

              <h3
                className="
                  mb-8
                  font-serif
                  text-3xl
                  font-bold
                "
              >
                🍽️ Restaurant
              </h3>

              <div className="space-y-4">

                {restaurantConfig.restaurantHoraires.map(
                  (horaire, index) => (

                    <div
                      key={index}
                      className="
                        flex
                        justify-between
                        border-b
                        border-[#e5ddd2]
                        pb-3
                        text-lg
                      "
                    >

                      <span>
                        {horaire.day}
                      </span>

                      <span>
                        {horaire.hours}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </motion.section>

      {/* RESTAURANT */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
          relative
          border-t
          border-[#e4d8c8]
          bg-cover
          bg-center
          py-20
          md:py-28
        "
        style={{
          backgroundImage:
            "url('/images/table.png')",
        }}
      >

        <div className="absolute inset-0 bg-black/15" />

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-6xl
            items-center
            gap-16
            px-6
            lg:grid-cols-2
          "
        >

          <div
            className="
              overflow-hidden
              rounded-[28px]
              shadow-2xl
            "
          >

            <img
              src="/images/bar.jpeg"
              alt="Restaurant"
              className="
                h-[420px]
                w-full
                object-cover
              "
            />

          </div>

          <div
            className="
              rounded-[28px]
              bg-[#f6f1e8]/88
              p-8
              shadow-xl
              backdrop-blur-sm
            "
          >

            <p
              className="
                mb-3
                text-sm
                uppercase
                tracking-[0.3em]
                text-[#b18752]
              "
            >
              Restaurant & Bar
            </p>

            <h2
              className="
                mb-6
                font-serif
                text-4xl
                font-bold
                md:text-5xl
              "
            >
              Cuisine traditionnelle
              et ambiance conviviale
            </h2>

            <div
              className="
                space-y-5
                text-lg
                leading-relaxed
                text-[#5a4c42]
              "
            >

              <p>
                Découvrez une cuisine
                conviviale avec carte fixe
                et menu du jour.
              </p>

              <p>
                Le bar accueille également
                des soirées événements
                et concerts occasionnels.
              </p>

            </div>

            <Link
              href="/restaurant"
              className="
                mt-8
                inline-block
                rounded-2xl
                bg-[#c89b5f]
                px-7
                py-4
                text-base
                font-semibold
                text-white
                transition
                hover:bg-[#d6aa70]
              "
            >
              Voir la carte
            </Link>

          </div>

        </div>

      </motion.section>

      {/* EVENEMENTS */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
          relative
          border-t
          border-white/10
          bg-[#2f241d]
          py-20
          text-white
          md:py-28
        "
      >

        <div
          className="
            mx-auto
            max-w-6xl
            px-6
          "
        >

          <div className="mb-16 text-center">

            <p
              className="
                mb-3
                text-sm
                uppercase
                tracking-[0.3em]
                text-[#d8bc8c]
              "
            >
              Convivialité
            </p>

            <h2
              className="
                font-serif
                text-4xl
                font-bold
                md:text-5xl
              "
            >
              Nos événements
            </h2>

          </div>

          <div
            className="
              grid
              gap-8
              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {eventsData.map(
              (event, index) => (

                <div
                  key={index}
                  className="
                    overflow-hidden
                    rounded-[28px]
                    bg-white/10
                    shadow-xl
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:-translate-y-2
                  "
                >

                  <img
                    src={event.image}
                    alt={event.title}
                    className="
                      h-56
                      w-full
                      object-cover
                    "
                  />

                  <div className="p-6">

                    <p
                      className="
                        mb-3
                        text-sm
                        uppercase
                        tracking-[0.2em]
                        text-[#d8bc8c]
                      "
                    >
                      {event.date}
                    </p>

                    <h3
                      className="
                        mb-4
                        font-serif
                        text-2xl
                        font-bold
                      "
                    >
                      {event.title}
                    </h3>

                    <p className="text-white/80">
                      {event.description}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </motion.section>

      {/* CONTACT */}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
          border-t
          border-[#e4d8c8]
          py-20
          md:py-28
        "
      >

        <div
          className="
            mx-auto
            grid
            max-w-6xl
            gap-14
            px-6
            lg:grid-cols-2
          "
        >

          <div>

            <p
              className="
                mb-3
                text-sm
                uppercase
                tracking-[0.3em]
                text-[#b18752]
              "
            >
              Contact
            </p>

            <h2
              className="
                mb-8
                font-serif
                text-4xl
                font-bold
                md:text-5xl
              "
            >
              Nous contacter
            </h2>

            <div
              className="
                space-y-5
                text-lg
                leading-relaxed
                text-[#5a4c42]
              "
            >

              <p>
                📍 L'Auberge de St Aubin
                <br />
                21 Rue Saint-Barnabé
                <br />
                03160 Saint Aubin le Monial
              </p>

              <p>
                📞 04 70 66 50 97
              </p>

              <p>
                ✉️ contact@auberge-st-aubin.fr
              </p>

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="
              rounded-[28px]
              bg-white
              p-8
              shadow-xl
            "
          >

            <div className="space-y-5">

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
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[#e7ddd0]
                  p-4
                  outline-none
                "
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
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[#e7ddd0]
                  p-4
                  outline-none
                "
              />

              <textarea
                rows={6}
                placeholder="Votre message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[#e7ddd0]
                  p-4
                  outline-none
                "
              />

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-2xl
                  bg-[#2f241d]
                  py-4
                  text-white
                  transition
                  hover:bg-[#43352c]
                "
              >
                {loading
                  ? "Envoi en cours..."
                  : "Envoyer"}
              </button>

            </div>

          </form>

        </div>

      </motion.section>

      {/* FOOTER */}

      <footer
  className="
    bg-[#1f1712]
    px-6
    py-10
    text-center
    text-white/70
  "
>

  <p className="mb-4">
    © 2026 L&apos;Auberge de St Aubin — Tous droits réservés
  </p>

  <Link
    href="/login"
    className="
      text-[11px]
      text-white/20
      transition
      hover:text-white/50
    "
  >
    administration
  </Link>

</footer>

    </div>
  )
}