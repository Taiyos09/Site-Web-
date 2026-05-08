"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Hôtel", href: "/hotel" },
  { name: "Restaurant", href: "#restaurant" },
  { name: "Événements", href: "#evenements" },
  { name: "Contact", href: "#contact" },
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
    <div className="min-h-screen bg-[#f5f1ea] text-[#2f241d] font-serif">
      {/* NAVBAR */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-md">
        <div className="flex items-center justify-between px-3 py-4 text-white">
          <div>
            <h1 className="text-lg font-semibold tracking-wide">L&apos;Auberge de St Aubin</h1>
          </div>

          <nav className="hidden gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="transition hover:text-[#c89b5f]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button className="rounded-2xl bg-[#c89b5f] px-5 py-3 font-semibold text-white transition hover:scale-105">
            Réserver
          </button>
        </div>
      </header>
      {/* HERO */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/auberge-de-saint-aubin.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <div className="flex flex-col items-center gap-1">
  <img
    src="/images/logo.png"
    alt="Logo Auberge St Aubin"
    className="h-150 w-auto drop-shadow-2xl"
  />
            <p className="mt-1 mb-8 max-w-3xl text-lg md:text-xl text-white/90">
              Une auberge chaleureuse entre authenticité, convivialité et
              traditionnelle.
            </p>
</div>
       <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/hotel"
              className="rounded-2xl bg-[#c89b5f] px-8 py-4 text-lg font-semibold text-white shadow-xl transition hover:scale-105"
          >
              Réserver une chambre
            </Link>

            <button className="rounded-2xl border border-white/70 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition hover:bg-white/20">
              Découvrir le restaurant
            </button>
          </div>
        </div>
      </section>

      {/* PRESENTATION */}
<section
  id="restaurant"
  className="mx-auto max-w-7xl px-6 py-24"
>
  <div className="grid items-center gap-12 md:grid-cols-2">
    <div>
      <h2 className="mb-6 text-4xl font-bold">
        Une auberge authentique
      </h2>

      <p className="mb-4 text-lg leading-relaxed text-[#5a4c42]">
        Située au cœur de la campagne bourbonnaise, dans un cadre calme et
        authentique, l’Auberge de St Aubin vous accueille pour partager un
        moment convivial autour d’une cuisine généreuse et traditionnelle.
        Que ce soit pour une pause au bar, un repas en famille ou un séjour
        au calme dans l’Allier, l’auberge vous ouvre ses portes dans une
        ambiance chaleureuse et familiale.
      </p>

      <p className="text-lg leading-relaxed text-[#5a4c42]">
        Entre chambres confortables, cuisine maison et événements du vendredi
        soir, découvrez une ambiance rustique moderne pensée pour tous.
      </p>
    </div>

    <div className="overflow-hidden rounded-3xl shadow-2xl bg-[#f5f1ea]">
  <img
    src={images[currentImage]}
    alt="Auberge"
    className="w-full h-auto rounded-3xl"
  />
</div>
  </div>
</section>
      {/* HORAIRES */}
<section id="horaires" className="bg-white py-24">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mb-14 text-center">
      <h2 className="mb-4 text-4xl font-bold">
        Nos horaires
      </h2>

      <p className="text-lg text-[#6b5b4f]">
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
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1974&auto=format&fit=crop"
            alt="Restaurant"
            className="rounded-3xl shadow-2xl"
          />

          <div>
            <h2 className="mb-6 text-4xl font-bold">Restaurant & bar</h2>

            <p className="mb-4 text-lg leading-relaxed text-[#5a4c42]">
              Découvrez une cuisine conviviale avec carte fixe et menu du jour
              du lundi au vendredi.
            </p>

            <p className="mb-8 text-lg leading-relaxed text-[#5a4c42]">
              Le bar accueille également des soirées événements et concerts
              occasionnels.
            </p>

            <button className="rounded-2xl bg-[#c89b5f] px-8 py-4 text-lg font-semibold text-white shadow-xl transition hover:scale-105">
              Voir la carte
            </button>
          </div>
        </div>
      </section>

      {/* EVENEMENTS */}
      <section id="evenements" className="bg-[#2f241d] py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-bold">Événements</h2>
            <p className="text-lg text-white/80">
              Concerts, soirées du vendredi et animations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((event) => (
              <div
                key={event}
                className="rounded-3xl bg-white/10 p-6 backdrop-blur"
              >
                <div className="mb-4 rounded-2xl bg-[#c89b5f] px-4 py-2 inline-block">
                  Vendredi soir
                </div>

                <h3 className="mb-3 text-2xl font-semibold">
                  Concert live
                </h3>

                <p className="text-white/80">
                  Soirée musicale conviviale dans une ambiance chaleureuse.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-bold">Contact</h2>

            <div className="space-y-4 text-lg text-[#5a4c42]">
              <p>📍 Adresse de l&apos;auberge</p>
              <p>📞 Téléphone</p>
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
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1f1712] px-6 py-10 text-center text-white/70">
        <p>© 2026 L&apos;auberge de St Aubin — Tous droits réservés</p>
      </footer>
    </div>
  )
}
