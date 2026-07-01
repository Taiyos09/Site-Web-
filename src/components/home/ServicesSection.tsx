"use client"

import Link from "next/link"

const services = [
  {
    title: "Restaurant",
    subtitle: "Cuisine traditionnelle",
    description:
      "Produits locaux, menu du jour et ambiance conviviale.",
    image: "/restaurant/resto1.jpeg",
    link: "/restaurant",
  },

  {
    title: "Hôtel",
    subtitle: "Séjour confortable",
    description:
      "Des chambres chaleureuses au cœur du Bourbonnais.",
    image: "/rooms/room1.jpg",
    link: "/hotel",
  },

  {
    title: "Événements",
    subtitle: "Soirées & animations",
    description:
      "Karaoké, repas à thème et soirées organisées toute l'année.",
    image: "/images/evenement.avif",
    link: "/evenements",
  },
]

export default function ServicesSection() {
  return (
    <section
      className="
        bg-[#f5f1ea]
        pt-8
        pb-16
      "
    >
      <div
        className="
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
              text-[#2f241d]
            "
          >
            Nos Univers
          </h2>

          <p
            className="
              mx-auto
              mt-6
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

        {/* CARTES */}

        <div
          className="
            grid
            gap-10
            lg:grid-cols-3
          "
        >
          {services.map((service) => (

            <div
              key={service.title}
              className="
                group
                overflow-hidden
                rounded-[36px]
                bg-white
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-2
              "
            >

              <div
                className="
                  relative
                  h-[500px]
                  max-w-[380px]
                  overflow-hidden
                "
              >

                <img
                  src={service.image}
                  alt={service.title}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/70
                    via-black/10
                    to-transparent
                  "
                />

                <div
                  className="
                    absolute
                    bottom-0
                    p-10
                    text-white
                  "
                >

                  <p
                    className="
                      mb-3
                      uppercase
                      tracking-[0.3em]
                      text-[#d6b98c]
                    "
                  >
                    {service.subtitle}
                  </p>

                  <h3
                    className="
                      mb-4
                      font-serif
                      text-[3rem]
                      font-bold
                      leading-tight
                    "
                  >
                    {service.title}
                  </h3>

                  <p
                    className="
                      mb-8
                      text-lg
                      text-white/90
                    "
                  >
                    {service.description}
                  </p>

                  <Link
                    href={service.link}
                    className="
                      inline-flex
                      rounded-full
                      bg-white
                      px-6
                      py-3
                      font-bold
                      text-[#2f241d]
                    "
                  >
                    Découvrir →
                  </Link>

                </div>

              </div>

            </div>

          ))}
        </div>

      </div>
    </section>
  )
}