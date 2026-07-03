"use client"

const reviews = [
  {
    name: "Marie D.",
    text: "Excellent accueil, chambre confortable et très propre. Nous avons passé un agréable séjour.",
  },
  {
    name: "Jean P.",
    text: "Très bon restaurant avec une cuisine généreuse. Personnel sympathique et service rapide.",
  },
  {
    name: "Sophie L.",
    text: "Une auberge authentique dans un cadre calme. Nous reviendrons avec plaisir.",
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

    </section>
  )
}
