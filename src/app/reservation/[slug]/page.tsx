import { notFound } from "next/navigation"
import { HOTEL_CONFIG } from "@/data/hotel"
import BookingCalendar from "@/components/hotel/BookingCalendar"

export default async function ReservationPage({
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
      <section className="relative h-[45vh] overflow-hidden">

        <img
          src={room.images[0]}
          alt={room.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full items-end">

          <div className="mx-auto w-full max-w-[1600px] px-8 pb-16">

            <h1 className="
              font-serif
              text-5xl
              font-bold
              text-white
              md:text-7xl
            ">
              Réservation
            </h1>

            <p className="
              mt-4
              text-xl
              text-white/90
            ">
              {room.name}
            </p>

          </div>

        </div>

      </section>

      {/* CONTENU */}
      <section className="
        mx-auto
        max-w-[1600px]
        px-8
        py-20
      ">

        <div className="
          grid
          gap-14
          xl:grid-cols-[1fr_520px]
        ">

          {/* GAUCHE */}
          <div>

            <div className="
              overflow-hidden
              rounded-[36px]
              bg-white
              shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            ">

              <img
                src={room.images[1]}
                alt={room.name}
                className="
                  h-[420px]
                  w-full
                  object-cover
                "
              />

              <div className="p-10">

                <h2 className="
                  mb-6
                  font-serif
                  text-4xl
                  font-bold
                ">
                  {room.name}
                </h2>

                <p className="
                  text-lg
                  leading-relaxed
                  text-[#5a4c42]
                ">
                  {room.description}
                </p>

                {/* INFOS */}
                <div className="
                  mt-10
                  grid
                  gap-4
                  md:grid-cols-2
                ">

                  <div className="
                    rounded-2xl
                    bg-[#faf7f2]
                    p-5
                  ">
                    <p className="text-sm text-[#7a6a5d]">
                      Surface
                    </p>

                    <p className="mt-2 text-xl font-bold">
                      {room.size}
                    </p>
                  </div>

                  <div className="
                    rounded-2xl
                    bg-[#faf7f2]
                    p-5
                  ">
                    <p className="text-sm text-[#7a6a5d]">
                      Wi-Fi
                    </p>

                    <p className="mt-2 text-xl font-bold">
                      Inclus
                    </p>
                  </div>

                  <div className="
                    rounded-2xl
                    bg-[#faf7f2]
                    p-5
                  ">
                    <p className="text-sm text-[#7a6a5d]">
                      Parking
                    </p>

                    <p className="mt-2 text-xl font-bold">
                      Gratuit
                    </p>
                  </div>

                  <div className="
                    rounded-2xl
                    bg-[#faf7f2]
                    p-5
                  ">
                    <p className="text-sm text-[#7a6a5d]">
                      Salle de bain
                    </p>

                    <p className="mt-2 text-xl font-bold">
                      Privative
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* DROITE */}
          <div className="sticky top-28 h-fit">

            <BookingCalendar
              price={HOTEL_CONFIG.roomPrices.onePerson}
            />

          </div>

        </div>

      </section>

    </main>
  )
}