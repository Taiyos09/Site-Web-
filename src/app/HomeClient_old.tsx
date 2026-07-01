"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import Navbar from "@/components/Navbar"
import { RESTAURANT_CONFIG } from "@/data/restaurant"
import Image from "next/image"
import RestaurantSection from "@/components/home/RestaurantSection"
import RoomsSection from "@/components/home/RoomsSection"
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

     <section className="relative min-h-[750px] overflow-hidden">

        <Image
          src="/images/hero.jpg"
          alt="Auberge de St Aubin"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[750px]
            max-w-7xl
            items-center
            px-6
          "
        >

          <div className="max-w-4xl">

            <p
              className="
                mb-4
                uppercase
                tracking-[0.3em]
                text-[#d6b98c]
              "
            >
              Bienvenue à
            </p>

            <h1
              className="
                mb-6
                font-serif
                text-5xl
                font-bold
                text-white
                md:text-6xl
              "
            >
              l'Auberge
              <br />
              de St Aubin
            </h1>

            <p
              className="
                mb-8
                text-xl
                text-white/90
              "
            >
              Bar • Restaurant • Hôtel
            </p>

            <p
              className="
                mb-10
                max-w-2xl
                text-lg
                leading-relaxed
                text-white/80
              "
            >
              Découvrez une auberge authentique
              au cœur du Bourbonnais.
              Profitez d’un séjour confortable,
              d’une cuisine traditionnelle et
              de soirées authentiques toute l’année.
            </p>

            <div className="flex flex-wrap gap-4">

              <Link
                href="/hotel"
                className="
                  rounded-full
                  bg-[#c89b5f]
                  px-8
                  py-4
                  font-semibold
                  text-white
                  transition
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
                  border-white
                  px-8
                  py-4
                  font-semibold
                  text-white
                  transition
                  hover:bg-white
                  hover:text-[#2f241d]
                "
              >
                Découvrir le restaurant
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* SERVICES */}

      <section className="-mt-12 relative z-20">

        <div
          className="
            mx-auto
            max-w-7xl
            px-6
          "
        >

          <div
            className="
              grid
              gap-6
              rounded-[32px]
              bg-white
              p-8
              shadow-xl
              md:grid-cols-4
            "
          >

            <div>
              <h3 className="mb-2 font-bold">
                🍻 Bar
              </h3>
              <p className="text-[#5a4c42]">
                Bar de campagne 
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold">
                🍽 Restaurant
              </h3>
              <p className="text-[#5a4c42]">
                Cuisine traditionnelle
                et produits locaux.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold">
                🏡 Chambres d’hôtes
              </h3>
              <p className="text-[#5a4c42]">
                Un accueil chaleureux
                toute l’année.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold">
                🎉 Événements
              </h3>
              <p className="text-[#5a4c42]">
                Soirées, repas de groupe
                et animations.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* NOS UNIVERS */}

<section className="py-24">

  <div className="mx-auto max-w-7xl px-6">

    <div className="mb-16 text-center">

      <p
        className="
          mb-3
          uppercase
          tracking-[0.3em]
          text-[#c89b5f]
        "
      >
        Découvrez
      </p>

      <h2
        className="
          font-serif
          text-5xl
          font-bold
        "
      >
        Nos Univers
      </h2>

      <p
        className="
          mt-6
          mx-auto
          max-w-3xl
          text-lg
          text-[#5a4c42]
        "
      >
        L'Auberge de St Aubin vous accueille
        autour de trois expériences :
        l'hébergement, la restauration
        et les événements.
      </p>

    </div>

    <div
      className="
        grid
        gap-8
        lg:grid-cols-3
      "
    >

      {/* HOTEL */}

      <Link
        href="/hotel"
        className="
          group
          relative
          h-[550px]
          overflow-hidden
          rounded-[36px]
        "
      >

        <img
          src="/images/hotel.png"
          alt="Hôtel"
          className="
            h-full
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-black/45" />

        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            justify-end
            p-10
            text-white
          "
        >

          <span
            className="
              mb-4
              uppercase
              tracking-[0.25em]
              text-[#d6b98c]
            "
          >
            Hôtel
          </span>

          <h3
            className="
              mb-4
              font-serif
              text-4xl
              font-bold
            "
          >
            Chambres
            d'hôtes
          </h3>

          <p className="mb-8 text-white/90">
            Séjournez dans nos chambres
            confortables au cœur du
            Bourbonnais.
          </p>

          <div
            className="
              w-fit
              rounded-full
              bg-white
              px-6
              py-3
              font-semibold
              text-[#2f241d]
            "
          >
            Découvrir →
          </div>

        </div>

      </Link>

      {/* RESTAURANT */}

      <Link
        href="/restaurant"
        className="
          group
          relative
          h-[550px]
          overflow-hidden
          rounded-[36px]
        "
      >

        <img
          src="/images/restaurant.jpeg"
          alt="Restaurant"
          className="
            h-full
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-black/45" />

        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            justify-end
            p-10
            text-white
          "
        >

          <span
            className="
              mb-4
              uppercase
              tracking-[0.25em]
              text-[#d6b98c]
            "
          >
            Restaurant
          </span>

          <h3
            className="
              mb-4
              font-serif
              text-4xl
              font-bold
            "
          >
            Cuisine
            traditionnelle
          </h3>

          <p className="mb-8 text-white/90">
            Produits locaux et recettes
            authentiques dans une ambiance
            conviviale.
          </p>

          <div
            className="
              w-fit
              rounded-full
              bg-white
              px-6
              py-3
              font-semibold
              text-[#2f241d]
            "
          >
            Découvrir →
          </div>

        </div>

      </Link>

      {/* EVENEMENTS */}

      <Link
        href="/evenements"
        className="
          group
          relative
          h-[550px]
          overflow-hidden
          rounded-[36px]
        "
      >

        <img
          src="/images/evenement.avif
        "
          alt="Événements"
          className="
            h-full
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-black/45" />

        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            justify-end
            p-10
            text-white
          "
        >

          <span
            className="
              mb-4
              uppercase
              tracking-[0.25em]
              text-[#d6b98c]
            "
          >
            Événements
          </span>

          <h3
            className="
              mb-4
              font-serif
              text-4xl
              font-bold
            "
          >
            Soirées &
            animations
          </h3>

          <p className="mb-8 text-white/90">
            Découvrez les événements
            organisés tout au long
            de l'année.
          </p>

          <div
            className="
              w-fit
              rounded-full
              bg-white
              px-6
              py-3
              font-semibold
              text-[#2f241d]
            "
          >
            Découvrir →
          </div>

        </div>

      </Link>

    </div>

  </div>

</section>

      <RoomsSection />

      <RestaurantSection />
      

      

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