"use client"

import Link from "next/link"

import {useTranslations} from "next-intl";

export default function ServicesSection() {

  const t = useTranslations("home");

const services = [
    {
      title: t("carteResto"),
      subtitle: t("carteResto2"),
      description: t("carteRestoDescrip"),
      image: "/restaurant/resto1.webp",
      link: "/restaurant",
    },

    {
      title: t("carteHotel"),
      subtitle: t("carteHotel2"),
      description: t("carteHotelDescrip"),
      image: "/rooms/room1.webp",
      link: "/hotel",
    },

    {
      title: t("carteEvent"),
      subtitle: t("carteEvent2"),
      description: t("carteEventDescrip"),
      image: "/images/evenement.webp",
      link: "/evenements",
    }
  ];
  
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
            {t("decouvrir")}
          </p>

          <h2
            className="
              font-serif
              text-5xl
              font-bold
              text-[#2f241d]
            "
          >
            {t("NosUnivers")}
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
            {t("DescripUniver")}
          </p>

        </div>

        {/* CARTES */}

       <div
  className="
    grid
    gap-10
    grid-cols-1
    sm:grid-cols-2
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
                hover:-translate-y-2
              "
            >

              <div
                className="
                relative
                aspect-[3/4]
                w-full
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
    inline-block
    px-3 py-1
    rounded-full
    bg-black/40
    text-[#CFAE7C]
    uppercase
    tracking-[0.15em]
    font-semibold
    backdrop-blur-sm
  "
  >
  {service.subtitle}
</p>

                  <h3
                    className="
                      mb-4
                      font-serif
                      text-[2.5rem]
                      font-bold
                      text-center
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
                    {t("boutonDecouvrir")} →
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