"use client"

const reviews = [
  {
    name: "Arthur D.",
    text: "Très bel endroit! La cuisine de Marion est superbe! Profitez en pour faire un tour dans ce charmant village également!",
  },
  {
    name: "Alix H.",
    text: "Un personnel aux petits soins pour notre séjour en famille, prise d'intiative, chaleureux et arrangeants, merci l'équipe! Le cadre est magnifique et les repas excellents, nous reviendrons!",
  },
  {
    name: "Olivier G.",
    text: "Super endroit où l'on y mange délicieusement et les patrons sont très sympas",
  },
]

export default function ReviewsSection() {

  return (

    <section
      className="
        bg-[#f5f1ea]
        py-20
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          px-6
        "
      >

        <div
          className="
            mb-12
            text-center
          "
        >

          <p
            className="
              mb-3
              uppercase
              tracking-[0.3em]
              text-[#c89b5f]
            "
          >
            Avis Clients
          </p>

          <h2
            className="
              font-serif
              text-5xl
              text-[#2f241d]
            "
          >
            Ils ont séjourné chez nous
          </h2>

        </div>

        <div
          className="
            grid
            gap-8
            sm:grid-cols-2 lg:grid-cols-3
          "
        >

          {reviews.map((review, index) => (

            <div
              key={index}
              className="
                rounded-[28px]
                bg-white
                p-8
                shadow-lg
              "
            >

              <div
                className="
                  mb-5
                  text-[#c89b5f]
                  text-xl
                "
              >
                ★★★★★
              </div>

              <p
                className="
                  mb-6
                  leading-relaxed
                  text-[#5a4c42]
                "
              >
                "{review.text}"
              </p>

              <div
                className="
                  font-semibold
                  text-[#2f241d]
                "
              >
                {review.name}
              </div>

            </div>

          ))}

        </div>

      </div>

    <div className="mt-12 flex justify-center">

  <a
    href="https://www.google.com/travel/search?gsas=1&ts=GhwSGhIUCgcI6g8QCBgDEgcI6g8QCBgEGAEyAhAA&qs=MjJDaUVJZ0xxZHFyYXl3SVFjRU9penZaT2dwYXVlSVJvTEwyY3ZNWFJvWkRWZmVuY1FBUTgC&ap=ugEHcmV2aWV3cw&ictx=111&rlz=1C1VDKB_frFR1211FR1211&biw=1920&bih=919&ved=0CAAQ5JsGahcKEwiQ8d6EgOGVAxUAAAAAHQAAAAAQAw"
    target="_blank"
    rel="noopener noreferrer"
    className="
      group
      inline-flex
      items-center
      gap-4
      rounded-full
      border
      border-[#c89b5f]
      bg-white
      px-8
      py-4
      text-[#2f241d]
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-[#b9894f]
      hover:bg-[#c89b5f]
      hover:text-white
    "
  >
    <div className="leading-none">
      <div className="text-lg text-[#d4a24c] group-hover:text-white">
        ★★★★★
      </div>

      <div className="text-sm font-medium">
        Voir tous les avis sur Google
      </div>
    </div>

    <span
      className="
        text-xl
        transition-transform
        duration-300
        group-hover:translate-x-1
      "
    >
      →
    </span>

  </a>

</div>
    </section>
  )
}
