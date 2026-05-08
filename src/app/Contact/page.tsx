"use client"

import Navbar from "@/components/Navbar"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#2f241d]">
      <Navbar />
      <section
        className="relative h-[55vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/contact-hero.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <img
            src="/images/logo.png"
            alt="Logo Auberge"
            className="mb-4 h-70 w-auto drop-shadow-2xl"
          />

          <h1 className="mb-4 text-5xl font-bold md:text-6xl">
            Contact
          </h1>

          <p className="max-w-3xl text-lg text-white/90 md:text-2xl">
            Une question ? Une réservation ? Contactez-nous.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* INFOS */}
          <div>
            <h2 className="mb-8 text-4xl font-bold">
              Informations
            </h2>

            <div className="space-y-6 text-lg text-[#5a4c42]">
              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <p className="mb-2 text-2xl font-semibold">
                  📍 Adresse
                </p>

                <p>
                  L&apos;Auberge de St Aubin
                  <br />
                  21 Rue Saint-Barnabé
                  <br />
                  03160 Saint Aubin le Monial
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <p className="mb-2 text-2xl font-semibold">
                  📞 Téléphone
                </p>

                <p>04 70 66 50 97</p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <p className="mb-2 text-2xl font-semibold">
                  ✉️ Email
                </p>

                <p>contact@auberge-st-aubin.fr</p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <p className="mb-2 text-2xl font-semibold">
                  🕒 Horaires
                </p>

                <p>
                  Lundi au Vendredi :
                  <br />
                  08h30 - 22h00
                </p>

                <p className="mt-3">
                  Vendredi & Samedi soir :
                  <br />
                  08h30 - 22h00
                </p>
              </div>
            </div>
          </div>

          {/* FORMULAIRE */}
          <div>
            <div className="rounded-[40px] bg-white p-10 shadow-2xl">
              <h2 className="mb-8 text-4xl font-bold">
                Nous écrire
              </h2>

              <form className="space-y-6">
                <div>
                  <label className="mb-2 block font-medium">
                    Nom
                  </label>

                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4 text-[#2f241d]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4 text-[#2f241d]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Téléphone
                  </label>

                  <input
                    type="tel"
                    placeholder="Votre téléphone"
                    className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4 text-[#2f241d]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Message
                  </label>

                  <textarea
                    rows={6}
                    placeholder="Votre message..."
                    className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4 text-[#2f241d]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#2f241d] py-5 text-lg font-semibold text-white transition hover:bg-[#43352c]"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              Nous trouver
            </h2>

            <p className="text-lg text-[#6b5b4f]">
              Situé au cœur de la campagne bourbonnaise.
            </p>
          </div>

          <div className="overflow-hidden rounded-[40px] shadow-2xl">
            <iframe
              src="https://www.google.com/maps?q=Auberge+de+St+Aubin&output=embed"
              width="100%"
              height="500"
              loading="lazy"
              className="border-0"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1f1712] px-6 py-10 text-center text-white/70">
        <p>
          © 2026 L&apos;Auberge de St Aubin —
          Tous droits réservés
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="text-[#c89b5f] transition hover:text-white"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </footer>
    </div>
  )
}