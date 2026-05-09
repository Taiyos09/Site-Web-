import Link from "next/link"
import { notFound } from "next/navigation"
import { HOTEL_CONFIG } from "@/data/hotel"
import BookingCalendar from "@/components/hotel/BookingCalendar"

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

  const room = HOTEL_CONFIG.rooms.find(
    (r) => r.slug === slug
  )

  if (!room) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#2f241d]">

      {/* HERO */}
      <section className="relative h-[72vh] overflow-hidden">

        <img
          src={room.images[0]}
          alt={room.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full items-end">

          <div className="mx-auto w-full max-w-[1700px] px-8 pb-20">

            <div className="max-w-3xl">

              <p className="mb-4 text-lg tracking-[0.3em] text-[#d6b98c] uppercase">
                Auberge de St Aubin
              </p>

              <h1 className="mb-6 font-serif text-6xl font-bold text-white md:text-8xl">
                {room.name}
              </h1>

              <p className="max-w-2xl text-xl leading-relaxed text-white/90">
                {room.description}
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* CONTENU */}
      <section className="mx-auto max-w-[1700px] px-8 py-24">

        <div className="grid gap-20 xl:grid-cols-[1.4fr_500px]">

          {/* GAUCHE */}
          <div>

            {/* GALERIE */}
            <div className="grid gap-6 md:grid-cols-2">

              {room.images.map((img, index) => (

                <div
                  key={index}
                  className={`
                    overflow-hidden rounded-[32px]
                    shadow-2xl
                    ${index === 0 ? "md:col-span-2" : ""}
                  `}
                >

                  <img
                    src={img}
                    alt={room.name}
                    className={`
                      w-full object-cover transition duration-700 hover:scale-105
                      ${index === 0
                        ? "h-[650px]"
                        : "h-[320px]"
                      }
                    `}
                  />

                </div>

              ))}

            </div>

            {/* DESCRIPTION */}
            <div className="mt-20">

              <h2 className="mb-8 font-serif text-5xl font-bold">
                Une expérience chaleureuse
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-[#5a4c42]">

                <p>
                  {room.description}
                </p>

                <p>
                  Profitez d’un séjour paisible au cœur
                  de la campagne dans une atmosphère
                  authentique et conviviale.
                </p>

                <p>
                  Chaque chambre de l’auberge possède
                  son charme avec une décoration
                  traditionnelle et tout le confort
                  nécessaire pour un séjour reposant.
                </p>

              </div>

            </div>

          </div>

          {/* DROITE */}
          <div>

            <div className="sticky top-32 overflow-hidden rounded-[36px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

              {/* PRIX */}
              <div className="bg-[#2f241d] p-10 text-white">

                <p className="mb-3 text-lg text-white/70">
                  À partir de
                </p>

                <div className="flex items-end gap-3">

                  <span className="text-6xl font-bold">
                    {HOTEL_CONFIG.roomPrices.onePerson}€
                  </span>

                  <span className="pb-2 text-white/70">
                    / nuit
                  </span>

                </div>

              </div>

              {/* INFOS */}
              <div className="space-y-8 p-10">

                <div>

                  <h3 className="mb-4 text-2xl font-bold">
                    Informations
                  </h3>

                  <div className="space-y-4 text-[#5a4c42]">

                    <div className="flex justify-between border-b pb-3">
                      <span>Surface</span>
                      <span>{room.size}</span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                      <span>Wi-Fi</span>
                      <span>Inclus</span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                      <span>Salle de bain</span>
                      <span>Privative</span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                      <span>Télévision</span>
                      <span>Oui</span>
                    </div>

                    <div className="flex justify-between pb-3">
                      <span>Parking</span>
                      <span>Gratuit</span>
                    </div>

                  </div>

                </div>

                {/* CTA */}
                <Link
                  href={`/reservation/${room.slug}`}
                  className="
                    flex items-center justify-center
                    rounded-2xl
                    bg-[#c89b5f]
                    px-8 py-5
                    text-lg font-bold text-white
                    shadow-xl
                    transition-all duration-300
                    hover:scale-[1.02]
                    hover:bg-[#d6aa70]
                  "
                >
                  Réserver cette chambre
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}