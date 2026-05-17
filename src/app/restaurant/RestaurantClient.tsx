"use client"

import Link from "next/link"
import Image from "next/image"

import {
  motion,
} from "framer-motion"

import {
  useEffect,
  useState,
} from "react"

import Navbar from "@/components/Navbar"

import {
  RESTAURANT_CONFIG,
} from "@/data/restaurant"

const images = [
  "/images/restaurant1.jpeg",
  "/images/restaurant2.jpeg",
  "/images/restaurant3.jpeg",
]

export default function RestaurantPage() {

  const [
    restaurantConfig,
    setRestaurantConfig,
  ] = useState(RESTAURANT_CONFIG)

  const [
    currentImage,
    setCurrentImage,
  ] = useState(0)

  /* ====================================== */
  /* ANIMATIONS */
  /* ====================================== */

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

  /* ====================================== */
  /* LOAD DATA */
  /* ====================================== */

  useEffect(() => {

    const readRestaurantConfig =
      () => {

        const savedRestaurant =
          localStorage.getItem(
            "restaurantData"
          )

        if (!savedRestaurant)
          return

        setRestaurantConfig(
          JSON.parse(savedRestaurant)
        )
      }

    readRestaurantConfig()

    window.addEventListener(
      "pricesUpdated",
      readRestaurantConfig
    )

    return () => {

      window.removeEventListener(
        "pricesUpdated",
        readRestaurantConfig
      )
    }

  }, [])

  /* ====================================== */
  /* AUTO SLIDER */
  /* ====================================== */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrentImage((prev) =>
          prev === images.length - 1
            ? 0
            : prev + 1
        )

      }, 4000)

    return () =>
      clearInterval(interval)

  }, [])

  return (

    <div
      className="
        
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
  src="/images/restaurant-hero.jpeg"
  alt="Restaurant Auberge de St Aubin"
  fill
  priority
  className="
    object-cover
    scale-105
  "
  sizes="100vw"
/>

  {/* OVERLAY */}

  <div className="absolute inset-0 bg-black/55" />

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
  src="/images/logo2.png"
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
      Restaurant
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
      Cuisine maison, terroir bourbonnais
      et ambiance conviviale.
    </p>

    {/* BOUTON */}

    <div className="mt-12">

      <Link
        href="#carte"
        className="
          inline-block
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
        Découvrir la carte
      </Link>

    </div>

  </div>

  {/* DEGRADE BAS */}

  <div
    className="
      absolute
      bottom-0
      left-0
      h-28
      w-full
      bg-gradient-to-b
      from-transparent
      to-[#f5f1ea]
    "
  />

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
              bg-white
              p-8
              shadow-xl
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
              Restaurant
            </p>

            <h2
              className="
                mb-6
                font-serif
                text-4xl
                font-bold
                leading-tight
                md:text-4xl
              "
            >
              Une cuisine généreuse
              et authentique
            </h2>

            <div
              className="
                space-y-5
                text-[20px]
                leading-relaxed
                text-[#5a4c42]
              "
            >

              <p>
                Située au cœur de la
                campagne bourbonnaise,
                l’Auberge de St Aubin
                vous accueille dans
                une ambiance chaleureuse
                et familiale.
              </p>

              <p>
                Découvrez une cuisine
                maison inspirée du
                terroir, avec des plats
                simples, généreux
                et conviviaux.
              </p>

              <p>
                Entre repas en famille,
                menu du jour et soirées
                animées, profitez d’un
                véritable moment
                de partage.
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
    alt="Restaurant Auberge de St Aubin"
    fill
    className="object-cover"
    sizes="(max-width: 1024px) 100vw, 50vw"
  />

</div>

          </div>

        </div>

      </motion.section>

      {/* CARTE */}

      <motion.section
        id="carte"
        variants={fadeUp}
        initial="hidden"
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
    src="/images/restaurant-propos.png"
    alt="Fond restaurant"
    fill
    className="object-cover"
    sizes="100vw"
  />

        <div
          className="
            absolute
            inset-0
            bg-black/10
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-6
          "
        >

          {/* TITRE */}

          <div className="mb-16 text-center">

            <p
              className="
                mb-3
                text-sm
                uppercase
                tracking-[0.3em]
                text-[#8a6330]
              "
            >
              Cuisine maison
            </p>

            <h2
              className="
                mb-4
                font-serif
                text-4xl
                font-bold
                md:text-4xl
              "
            >
              Nos propositions culinaires
            </h2>

            <p
              className="
                mx-auto
                max-w-2xl
                text-lg
                text-[#5a4c42]
              "
            >
              Découvrez notre carte
              et nos menus du moment.
            </p>

          </div>

          {/* CONTENU */}

<div
  className="
    grid
    items-start
    gap-10
    xl:grid-cols-[0.72fr_1.28fr]
  "
>

  {/* MENUS EN AVANT */}

  <div className="space-y-6">

    {/* MENU JOUR */}

    <div
      className="
        rounded-[32px]
        max-w-[520px]
        bg-[#2f241d]
        p-6
        text-white
        shadow-[0_18px_45px_rgba(0,0,0,0.22)]
        border
        border-[#c89b5f]/30
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >

      <div className="mb-6 text-center">

        <p
          className="
            mb-2
            text-xs
            uppercase
            tracking-[0.35em]
            text-[#c89b5f]
          "
        >
          Formule
        </p>

        <h2
          className="
            mb-3
            font-serif
            text-3xl
            font-bold
            md:text-4xl
          "
        >
          Menu du jour
        </h2>

        <p
          className="
            text-lg
            text-white/80
          "
        >
          Disponible du lundi
          au vendredi midi.
        </p>

      </div>

      <div
        className="
          space-y-4
          text-center
          text-lg
          leading-relaxed
        "
      >

        <p>
          🥗 {restaurantConfig.menuDuJour.starter}
        </p>

        <p>
          🍖 {restaurantConfig.menuDuJour.main}
        </p>

        <p>
          🍰 {restaurantConfig.menuDuJour.dessert}
        </p>

      </div>

      <div
        className="
          mt-6
          text-center
          text-4xl
          font-bold
          text-[#c89b5f]
        "
      >
        {restaurantConfig.menuDuJour.price}€
      </div>

    </div>

    {/* MENU ENFANT */}

    <div
      className="
        rounded-[32px]
        max-w-[520px]
        bg-[#c89b5f]
        p-6
        text-white
        shadow-[0_18px_45px_rgba(0,0,0,0.18)]
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >

      <div className="mb-6 text-center">

        <p
          className="
            mb-2
            text-xs
            uppercase
            tracking-[0.35em]
            text-white/80
          "
        >
          Enfants
        </p>

        <h2
          className="
            mb-3
            font-serif
            text-3xl
            font-bold
            md:text-4xl
          "
        >
          Menu enfant
        </h2>

        <p
          className="
            text-lg
            text-white/90
          "
        >
          Pour les petits gourmands.
        </p>

      </div>

      <div
        className="
          space-y-4
          text-center
          text-lg
          leading-relaxed
        "
      >

        <p>
          🍗 {restaurantConfig.menuEnfant.main}
        </p>

        <p>
          🍟 {restaurantConfig.menuEnfant.side}
        </p>

        <p>
          🧃 {restaurantConfig.menuEnfant.drink}
        </p>

        <p>
          🍦 {restaurantConfig.menuEnfant.dessert}
        </p>

      </div>

      <div
        className="
          mt-6
          text-center
          text-4xl
          font-bold
          text-[#2f241d]
        "
      >
        {restaurantConfig.menuEnfant.price}€
      </div>

    </div>

  </div>

  {/* CARTE */}

  <div
    className="
      grid
      gap-6
      sm:grid-cols-2
      xl:grid-cols-3
    "
  >

    {/* ENTREES */}

    <div
      className="
        rounded-[26px]
        bg-[#faf7f2]/88
        p-7
        shadow-lg
        backdrop-blur-sm
      "
    >

      <h3
        className="
          mb-6
          text-center
          font-serif
          text-2xl
          font-bold
        "
      >
        Entrées
      </h3>

      <div className="space-y-4">

        {restaurantConfig.entrees.map(
          (item, index) => (

            <div
              key={index}
              className="
                flex
                justify-between
                gap-4
                border-b
                border-[#ddd2c3]
                pb-3
                text-lg
              "
            >

              <span>
                {item.name}
              </span>

              <span>
                {item.price}€
              </span>

            </div>

          )
        )}

      </div>

    </div>

    {/* PLATS */}

    <div
      className="
        rounded-[26px]
        bg-[#faf7f2]/88
        p-7
        shadow-lg
        backdrop-blur-sm
      "
    >

      <h3
        className="
          mb-6
          text-center
          font-serif
          text-2xl
          font-bold
        "
      >
        Plats
      </h3>

      <div className="space-y-4">

        {restaurantConfig.plats.map(
          (item, index) => (

            <div
              key={index}
              className="
                flex
                justify-between
                gap-4
                border-b
                border-[#ddd2c3]
                pb-3
                text-lg
              "
            >

              <span>
                {item.name}
              </span>

              <span>
                {item.price}€
              </span>

            </div>

          )
        )}

      </div>

    </div>

    {/* DESSERTS */}

    <div
      className="
        rounded-[26px]
        bg-[#faf7f2]/88
        p-7
        shadow-lg
        backdrop-blur-sm
      "
    >

      <h3
        className="
          mb-6
          text-center
          font-serif
          text-2xl
          font-bold
        "
      >
        Desserts
      </h3>

      <div className="space-y-4">

        {restaurantConfig.desserts.map(
          (item, index) => (

            <div
              key={index}
              className="
                flex
                justify-between
                gap-4
                border-b
                border-[#ddd2c3]
                pb-3
                text-lg
              "
            >

              <span>
                {item.name}
              </span>

              <span>
                {item.price}€
              </span>

            </div>

          )
        )}

      </div>

    </div>

  </div>

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
          border-t
          border-[#e4d8c8]
          bg-[#efe7db]
          py-20
          md:py-28
        "
      >

        <div
          className="
            mx-auto
            max-w-5xl
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
                text-[#b18752]
              "
            >
              Informations
            </p>

            <h2
              className="
                font-serif
                text-4xl
                font-bold
                md:text-5xl
              "
            >
              Horaires du restaurant
            </h2>

          </div>

          <div
            className="
              rounded-[28px]
              bg-white
              p-8
              shadow-xl
            "
          >

            <div className="space-y-4 text-[20px]">

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

      </motion.section>

      {/* INFOS */}

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
    overflow-hidden
    border-t
    border-[#e4d8c8]
    py-20
    md:py-28
  "
>

  <Image
    src="/images/stone-bg.png"
    alt="Fond pierre restaurant"
    fill
    className="object-cover"
    sizes="100vw"
  />

        <div
          className="
            absolute
            inset-0
            bg-black/35
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-5xl
            px-6
          "
        >

          <div
            className="
              rounded-[32px]
              bg-[rgba(255,248,240,0.88)]
              p-7
              text-center
              shadow-2xl
              backdrop-blur-sm
            "
          >

            <h2
              className="
                mb-8
                font-serif
                text-4xl
                font-bold
                md:text-4xl
              "
            >
              Informations pratiques
            </h2>

            <div
              className="
                space-y-5
                text-[20px]
                leading-relaxed
                text-[#4e4036]
              "
            >

              <p>
                📍 Auberge de St Aubin
                <br />
                21 Rue Saint-Barnabé
                <br />
                03160 Saint-Aubin-le-Monial
              </p>

              <p>
                📞 04 70 66 50 97
              </p>

              <p>
                🍷 Bar & restaurant convivial
              </p>

              <p>
                🚗 Parking disponible
              </p>

            </div>

            <div className="mt-12">

              <Link
                href="/"
                className="
                  inline-block
                  rounded-2xl
                  bg-[#2f241d]
                  px-8
                  py-4
                  text-[20px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#43352c]
                "
              >
                Retour à l’accueil
              </Link>

            </div>

          </div>

        </div>

      </motion.section>

    </div>
  )
}