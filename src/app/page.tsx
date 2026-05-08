"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Hôtel", href: "/hotel" },
  { name: "Restaurant", href: "/restaurant" },
  { name: "Événements", href: "/evenements" },
  { name: "Contact", href: "/contact" },
]

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
]

export default function AubergeSaintAubinHomepage() {
  const [currentImage, setCurrentImage] = useState(0)

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    )
  }, 4000)

  return () => clearInterval(interval)
}, [])
  return (
  <div
    className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-[#f5f1ea] text-[#2f241d] font-serif"
    style={{ scrollPaddingTop: "100px" }}
  >
      {/* NAVBAR */}
      <Navbar />
      {/* HERO */}
      <section
        className="relative snap-start h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/auberge-de-saint-aubin.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <div className=" p-8 rounded-lg ">
            <div className="flex flex-col items-center gap-1">
  <img
    src="/images/logo2.png"
    alt="Logo Auberge St Aubin"
    className="h-150 w-auto drop-shadow-2xl"
  />
            <p className="mt-1 mb-8 max-w-3xl text-lg md:text-xl text-white/90">
              Une auberge chaleureuse entre authenticité, convivialité et
              traditionnelle.
            </p>
</div>
          </div>
       <div className="flex flex-wrap justify-center gap-4">
            <button
              disabled
              className="rounded-2xl bg-[#c89b5f] px-8 py-4 text-lg font-semibold text-white shadow-xl transition cursor-not-allowed opacity-50"
          >
              Réserver une chambre
            </button>

            <button
              disabled
              className="rounded-2xl border border-white/70 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition cursor-not-allowed opacity-50"
            >
              Découvrir le restaurant
            </button>
          </div>
        </div>
      </section>

      {/* PRESENTATION */}
<section
  id="restaurant"
  className="relative snap-center min-h-screen border-t border-[#e5ddd2] bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage: "url('/images/test.png')",
  }}
>
  <div className="absolute inset-0 bg-white/0" />
  <div className="relative mx-auto max-w-7xl px-6 w-full">
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div className=" p-8 ">
        <h2 className="mb-6 text-4xl text-white font-bold"
        style={{
    textShadow: `
      0 0 3px rgba(0,0,0,0.95),
    2px 2px 4px rgba(0,0,0,0.9),
    4px 4px 8px rgba(0,0,0,0.85),
    6px 6px 12px rgba(0,0,0,0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '1'
  }}>
          Une auberge authentique
        </h2>

        <p className="mb-4 text-lg leading-relaxed text-white">
          <span
  className="inline-block"
  style={{
    textShadow: `
      0 0 3px rgba(0,0,0,0.95),
    2px 2px 4px rgba(0,0,0,0.9),
    4px 4px 8px rgba(0,0,0,0.85),
    6px 6px 12px rgba(0,0,0,0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '1'
  }}
>
            Située au cœur de la campagne bourbonnaise, dans un cadre calme et
            authentique, l'Auberge de St Aubin vous accueille pour partager un
            moment convivial autour d'une cuisine généreuse et traditionnelle.
            Que ce soit pour une pause au bar, un repas en famille ou un séjour
            au calme dans l'Allier, l'auberge vous ouvre ses portes dans une
            ambiance chaleureuse et familiale.
          </span>
        </p>

        <p className="text-lg leading-relaxed text-white">
          <span
  className="inline-block"
  style={{
    textShadow: `
      0 0 3px rgba(0,0,0,0.95),
    2px 2px 4px rgba(0,0,0,0.9),
    4px 4px 8px rgba(0,0,0,0.85),
    6px 6px 12px rgba(0,0,0,0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '0.95'
  }}
>
            Entre chambres confortables, cuisine maison et événements du vendredi
            soir, découvrez une ambiance rustique moderne pensée pour tous.
          </span>
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl shadow-2xl bg-[#f5f1ea] h-[280px] sm:h-[360px] md:h-[420px]">
        <img
          src={images[currentImage]}
          alt="Auberge"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </div>
  </div>
</section>

      {/* HORAIRES */}
<section
  id="horaires"
  className="relative snap-center min-h-screen border-t border-[#e5ddd2] bg-cover bg-center bg-no-repeat flex items-center justify-center"
  style={{ backgroundImage: "url('/images/horaires-bg.png')" }}
>
  <div className="absolute inset-0 bg-white/0"></div>
  <div className="relative mx-auto max-w-7xl px-6 w-full">
    <div className="mb-14 text-center">
      <h2 className="mb-4 text-4xl text-white font-bold"
      style={{
    textShadow: `
      0 0 3px rgba(0,0,0,0.95),
    2px 2px 4px rgba(0,0,0,0.9),
    4px 4px 8px rgba(0,0,0,0.85),
    6px 6px 12px rgba(0,0,0,0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '1'
  }}>
        Nos horaires
      </h2>

      <p className="text-lg text-white"
      style={{
    textShadow: `
      0 0 3px rgba(0,0,0,0.95),
    2px 2px 4px rgba(0,0,0,0.9),
    4px 4px 8px rgba(0,0,0,0.85),
    6px 6px 12px rgba(0,0,0,0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '1'
  }}>
        Retrouvez les horaires du bar et du restaurant.
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-2">
      {/* BAR */}
      <div className="rounded-3xl bg-[#faf7f2] p-8 shadow-xl">
        <h3 className="mb-6 text-3xl font-bold text-[#2f241d]">
          🍷 Bar
        </h3>

        <div className="space-y-4 text-lg">
          <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
            <span>Lundi</span>
            <span>7h00 - 22h00</span>
          </div>

          <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
            <span>Mardi</span>
            <span>7h00 - 22h00</span>
          </div>

          <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
            <span>Mercredi</span>
            <span>7h00 - 22h00</span>
          </div>

          <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
            <span>Jeudi</span>
            <span>7h00 - 22h00</span>
          </div>

          <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
            <span>Vendredi</span>
            <span>7h00 - 01h00</span>
          </div>

          <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
            <span>Samedi</span>
            <span>8h00 - 01h00</span>
          </div>

          <div className="flex justify-between">
            <span>Dimanche</span>
            <span>8h00 - 20h00</span>
          </div>
        </div>
      </div>

      {/* RESTAURANT */}
      <div className="rounded-3xl bg-[#faf7f2] p-8 shadow-xl">
        <h3 className="mb-6 text-3xl font-bold text-[#2f241d]">
          🍽️ Restaurant
        </h3>

        <div className="space-y-4 text-lg">
          <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
            <span>Lundi</span>
            <span>12h00 - 14h00</span>
          </div>

          <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
            <span>Mardi</span>
            <span>12h00 - 14h00</span>
          </div>

          <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
            <span>Mercredi</span>
            <span>12h00 - 14h00</span>
          </div>

          <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
            <span>Jeudi</span>
            <span>12h00 - 14h00</span>
          </div>

          <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
            <span>Vendredi</span>
            <span>12h00 - 14h00 / 19h00 - 22h00</span>
          </div>

          <div className="flex justify-between border-b border-[#e5ddd2] pb-3">
            <span>Samedi</span>
            <span>12h00 - 14h00 /19h00 - 22h00</span>
          </div>

          <div className="flex justify-between">
            <span>Dimanche</span>
            <span>Fermé</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* RESTAURANT */}
      <section
        id="restaurantbar"
        className="relative border-t snap-center min-h-screen border-[#e5ddd2] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/table.png')",
        }}
      >
        <div className="absolute inset-0 bg-[#f5f1ea]/10 backdrop-blur-[1px]" />
        <div className="relative mx-auto max-w-7xl px-6 w-full">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <img
              src="/images/bar.jpeg"
              alt="Restaurant"
              className="rounded-3xl shadow-2xl"
            />

            <div>
              <h2 className="mb-6 text-4xl font-bold"
              style={{
    textShadow: `
      0 0 3px rgba(255, 255, 255, 0.95),
    2px 2px 4px rgba(255, 255, 255, 0.9),
    4px 4px 8px rgba(255, 255, 255, 0.85),
    6px 6px 12px rgba(255, 255, 255, 0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '1'
  }}>Restaurant & bar</h2>

              <p className="mb-4 text-lg leading-relaxed font-bold text-[rgb(0, 0, 0)]"
              style={{
    textShadow: `
      0 0 3px rgba(255, 255, 255, 0.95),
    2px 2px 4px rgba(255, 255, 255, 0.9),
    4px 4px 8px rgba(255, 255, 255, 0.85),
    6px 6px 12px rgba(255, 255, 255, 0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '1'
  }}>
                Découvrez une cuisine conviviale avec carte fixe et menu du jour
                du lundi au vendredi.
              </p>

              <p className="mb-8 text-lg leading-relaxed font-bold text-[rgb(0, 0, 0)]"
              style={{
    textShadow: `
      0 0 3px rgba(255, 255, 255, 0.95),
    2px 2px 4px rgba(255, 255, 255, 0.9),
    4px 4px 8px rgba(255, 255, 255, 0.85),
    6px 6px 12px rgba(255, 255, 255, 0.75)
    `,
    transform: 'translateY(2px)',
    opacity: '1'
  }}>
                Le bar accueille également des soirées événements et concerts
                occasionnels.
              </p>

              <Link
                href="/restaurant"
                className="inline-block rounded-2xl bg-[#c89b5f] px-8 py-4 text-lg font-semibold text-[rgb(0, 0, 0)] shadow-xl transition hover:scale-105"
              >
                Voir la carte
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EVENEMENTS */}
      <section
        id="evenements"
        className="relative snap-center min-h-screen border-t border-white/10 text-white bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/festif.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-bold">Événements</h2>
            <p className="text-lg text-white/80">
              Concerts, soirées du vendredi et animations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            
              <div
                
                className="rounded-3xl text-center bg-white/10 p-6 backdrop-blur"
              >
                <div className="mb-4 rounded-2xl bg-[#c89b5f] text-center text-[rgb(255, 255, 255)] px-4 py-2 inline-block">
                  Vendredi 8 Décembre
                </div>

                <h3 className="mb-3 text-2xl text-center font-semibold">
                  Final coupe du monde Football
                </h3>

                {/* IMAGE */}
    <img
      src="/images/football.jpg"
      alt="football"
      className="h-24 w-full rounded-2xl object-cover shadow-xl md:w-24 mx-auto"
    />

                <p className="text-center text-lg text-white/90">
                  Soirée spéciale pour la finale de la coupe du monde de football avec
                  retransmission sur grand écran, ambiance festive et menu spécial.
                </p>
              </div>

              <div
                
                className="rounded-3xl text-center bg-white/10 p-6 backdrop-blur"
              >
                <div className="mb-4 rounded-2xl bg-[#c89b5f] text-center text-[rgb(255, 255, 255)] px-4 py-2 inline-block">
                  Vendredi 15 Décembre
                </div>

                <h3 className="mb-3 text-2xl text-center font-semibold">
                  Soirée Karaoké
                </h3>

                {/* IMAGE */}
    <img
      src="/images/karaoké.jpg"
      alt="Soirée Karaoké"
      className="h-24 w-full rounded-2xl object-cover shadow-xl md:w-24 mx-auto"
    />

                <p className="text-center text-lg text-white/90">
                  Soirée karaoké tous les vendredis avec une sélection de chansons variées pour tous les goûts, ambiance conviviale garantie.
                </p>
              </div>

              <div
                
                className="rounded-3xl text-center bg-white/10 p-6 backdrop-blur"
              >
                <div className="mb-4 rounded-2xl bg-[#c89b5f] text-center text-[rgb(255, 255, 255)] px-4 py-2 inline-block">
                  Vendredi 15 Décembre
                </div>

                <h3 className="mb-3 text-2xl text-center font-semibold">
                  Soirée Loto
                </h3>

                {/* IMAGE */}
    <img
      src="/images/loto.webp"
      alt="Soirée Loto"
      className="h-24 w-full rounded-2xl object-cover shadow-xl md:w-24 mx-auto"
    />

                <p className="text-center text-lg text-white/90">
                  Soirée loto avec des lots à gagner, ambiance conviviale garantie.
                </p>
              </div>
            
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t snap-center min-h-screen border-[#e5ddd2] flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-bold">Contact</h2>

            <div className="space-y-4 text-lg text-[#5a4c42]">
              <p>📍 L&apos;Auberge de St Aubin
                  <br />
                  21 Rue Saint-Barnabé
                  <br />
                  03160 Saint Aubin le Monial</p>
              <p>📞 04 70 66 50 97</p>
              <p>✉️ contact@auberge-st-aubin.fr</p>
            </div>
          </div>

          <form className="space-y-4 rounded-3xl bg-white p-8 shadow-xl">
            <input
              type="text"
              placeholder="Nom"
              className="w-full rounded-2xl border p-4"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-2xl border p-4"
            />

            <textarea
              placeholder="Votre message"
              rows={5}
              className="w-full rounded-2xl border p-4"
            />

            <button className="w-full rounded-2xl bg-[#2f241d] py-4 text-white transition hover:bg-[#43352c]">
              Envoyer
            </button>
          </form>
        </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1f1712] px-6 py-10 text-center text-white/70">
        <p>© 2026 L&apos;auberge de St Aubin — Tous droits réservés</p>
      </footer>
    </div>
  )
}
