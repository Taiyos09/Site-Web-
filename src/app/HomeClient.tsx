"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import Navbar from "@/components/Navbar"
import { RESTAURANT_CONFIG } from "@/data/restaurant"
import Image from "next/image"
import RestaurantSection from "@/components/RestaurantSection"
import RoomsSection from "@/components/RoomsSection"
import Footer from "@/components/Footer"

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
]

export default function AubergeSaintAubinHomepage() {

  const [currentImage, setCurrentImage] =
    useState(0)

  const [eventsData, setEventsData] =
    useState<any[]>([])

  useEffect(() => {

  fetch("/api/events")

    .then((res) => res.json())

    .then((data) => {

      setEventsData(data)

    })

    .catch(console.error)

}, [])

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

    const [
  acceptPrivacy,
  setAcceptPrivacy,
] = useState(false)

  /* ===================================== */
  /* ANIMATIONS */
  /* ===================================== */

  const fadeUp = {

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

<section className="relative h-screen min-h-[850px] overflow-hidden">

  {/* IMAGE */}

  <Image
  src="/images/auberge-de-saint-aubin.jpg"
  alt="Auberge de St Aubin"
  fill
  priority
  className="
    object-cover
    scale-105
  "
  sizes="100vw"
/>

  {/* OVERLAY */}

  <div className="absolute inset-0 bg-black/45" />

  {/* CONTENU */}

  <div
    className="
      relative
      z-10
      flex
      h-full
      w-full
      flex-col
      items-center
      justify-center
      px-6
      text-center
      text-white
    "
  >

    {/* LOGO */}

    <Image
  src="/images/logo1.png"
  alt="Logo Auberge St Aubin"
  width={208}
  height={208}
  priority
  className="
    mb-8
    w-40
    drop-shadow-2xl
    md:w-52
  "
/>

    {/* TITRE */}

    <h1
      className="
        mb-6
        max-w-5xl
        font-serif
        text-5xl
        font-bold
        leading-tight
        text-white
        drop-shadow-[0_5px_18px_rgba(0,0,0,0.95)]
        md:text-7xl
      "
    >
      Auberge de St Aubin
    </h1>

    {/* TEXTE */}

    <p
      className="
        max-w-3xl
        text-xl
        leading-relaxed
        text-white/95
        drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]
        md:text-2xl
      "
    >
      Une auberge chaleureuse entre
      authenticité, convivialité
      et tradition bourbonnaise.
    </p>

    {/* BOUTONS */}

    <div
      className="
        mt-12
        flex
        flex-wrap
        justify-center
        gap-5
      "
    >

      <Link
        href="/hotel"
        className="
          rounded-full
          bg-[#c89b5f]
          px-9
          py-4
          text-base
          font-semibold
          text-white
          shadow-2xl
          transition-all
          duration-300
          hover:scale-105
          hover:bg-[#d6aa70]
        "
      >
        Réserver une chambre
      </Link>

      <Link
        href="/restaurant"
        className="
          rounded-full
          border
          border-white/30
          bg-white/10
          px-9
          py-4
          text-base
          font-semibold
          text-white
          shadow-xl
          backdrop-blur-md
          transition-all
          duration-300
          hover:bg-white/20
        "
      >
        Découvrir le restaurant
      </Link>

    </div>

  </div>

  {/* DEGRADE BAS */}

  <div
  className="
    pointer-events-none
    absolute
    bottom-0
    left-0
    h-20
    w-full
    bg-gradient-to-b
    from-transparent
    via-[#f5f1ea]/40
    to-[#f5f1ea]
  "
/>

</section>

      {/* PRESENTATION */}

      <motion.section
        variants={fadeUp}
        initial={false}
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
    relative
    overflow-hidden
    border-t
    border-[#e4d8c8]
    py-20
    md:py-28
  "
>

  <Image
    src="/images/test.png"
    alt="Fond auberge"
    fill
    className="object-cover"
    sizes="100vw"
  />

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

            <div
  className="
    relative
    h-[420px]
    w-full
  "
>

  <Image
    src={images[currentImage]}
    alt="Auberge de St Aubin"
    fill
    className="object-cover"
    sizes="(max-width: 1024px) 100vw, 50vw"
  />

</div>

          </div>

        </div>

        {/* DEGRADE BAS */}

  <div
  className="
    pointer-events-none
    absolute
    bottom-0
    left-0
    h-20
    w-full
    bg-gradient-to-b
    from-transparent
    via-[#f5f1ea]/40
    to-[#f5f1ea]
  "
/>


      </motion.section>

      {/* HORAIRES */}

      <motion.section
        variants={fadeUp}
        initial={false}
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
    relative
    overflow-hidden
    border-t
    border-[#e4d8c8]
    py-20
    md:py-28
  "
>

  <Image
    src="/images/horaires-bg.png"
    alt="Fond horaires"
    fill
    className="object-cover"
    sizes="100vw"
  />

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

        {/* DEGRADE BAS */}

  <div
  className="
    pointer-events-none
    absolute
    bottom-0
    left-0
    h-20
    w-full
    bg-gradient-to-b
    from-transparent
    via-[#f5f1ea]/40
    to-[#f5f1ea]
  "
/>

      </motion.section>

      <RestaurantSection />

      <RoomsSection />

      {/* EVENEMENTS */}

      <motion.section
        variants={fadeUp}
        initial={false}
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
            {eventsData.length === 0 && (

  <div className="text-center text-white/70">

    Aucun événement programmé.

  </div>

)}
            {eventsData.map((event, index) => (

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

                  <div
  className="
    relative
    h-56
    w-full
  "
>

  <Image
  src={
    event.image ||
    "/images/event-default.jpg"
  }
  alt={event.title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 33vw"
/>

</div>

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
        initial={false}
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

              <div
  className="
    rounded-2xl
    border
    border-[#e7ddd2]
    bg-[#faf8f5]
    p-5
  "
>

  <label
    className="
      flex
      items-start
      gap-3
      text-sm
      leading-6
      text-[#6b5b4f]
    "
  >

    <input
      type="checkbox"
      checked={
        acceptPrivacy
      }
      onChange={(e) =>
        setAcceptPrivacy(
          e.target.checked
        )
      }
      className="
        mt-1
        h-4
        w-4
        accent-[#2f241d]
      "
    />

    <span>

      J&apos;accepte que mes données
      soient utilisées afin de répondre
      à ma demande conformément à la{" "}

      <Link
        href="/confidentialite"
        target="_blank"
        className="
          font-semibold
          underline
          underline-offset-2
        "
      >
        politique de confidentialité
      </Link>

    </span>

  </label>

</div>

              <button
  type="submit"

  disabled={
    loading ||
    !acceptPrivacy
  }

  className="
    w-full
    rounded-2xl
    bg-[#2f241d]
    py-4
    text-white
    transition-all
    duration-300
    hover:bg-[#43352c]
    hover:scale-[1.01]
    disabled:cursor-not-allowed
    disabled:opacity-50
    disabled:hover:scale-100
    disabled:hover:bg-[#2f241d]
  "
>
  {loading
    ? "Envoi en cours..."
    : "Envoyer"}
</button>

            </div>

          </form>

        </div>

        {/* DEGRADE BAS */}

  <div
  className="
    pointer-events-none
    absolute
    bottom-0
    left-0
    h-20
    w-full
    bg-gradient-to-b
    from-transparent
    via-[#f5f1ea]/40
    to-[#f5f1ea]
  "
/>

      </motion.section>

      {/* FOOTER */}

      <Footer />

    </div>
  )
}