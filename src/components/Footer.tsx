"use client"

import Image from "next/image"
import Link from "next/link"

export default function Footer() {

  return (

    <footer
      className="
        bg-[#2f241d]
        text-white
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          py-16
        "
      >

        <div
          className="
            grid
            gap-12
            lg:grid-cols-4
          "
        >

          {/* LOGO */}

          <div>

            <Image
              src="/logo/logo1.webp"
              alt="Auberge de St Aubin"
              width={180}
              height={180}
              className="mb-4"
            />

            <p
              className="
                text-sm
                text-white/80
              "
            >
              Bar • Restaurant • Hôtel
            </p>

          </div>

          {/* CONTACT */}

          <div>

            <h3
              className="
                mb-5
                text-lg
                font-bold
              "
            >
             <u> Nous contacter</u>
            </h3>

            <div
              className="
                space-y-3
                text-white/80
              "
            >

              <p>
                📞 04 70 66 50 97
              </p>

              <p>
                ✉ contact@auberge-st-aubin.fr
              </p>

              <p>
                L'Auberge de St Aubin
                <br />
                21 Rue Saint-Barnabé
                <br />
                03160 Saint Aubin le Monial
              </p>

            </div>

          </div>

          {/* HORAIRES */}

          <div>

            <h3
              className="
                mb-5
                text-lg
                font-bold
              "
            >
              <u>Horaires</u>
            </h3>

            <div
              className="
                space-y-4
                text-white/80
              "
            >

              <div>

                <p className="font-semibold">
                  🍽 Restaurant
                </p>

                <p>
                  12h - 14h
                </p>

                <p>
                  Vendredi & Samedi
                </p>

                <p>
                  12h - 14h / 19h - 22h
                </p>

              </div>

              <div>

                <p className="font-semibold">
                  🍺 Bar
                </p>

                <p>
                  8h - 20h
                </p>

              </div>

            </div>

          </div>

          {/* LIENS */}

          <div>

            <h3
              className="
                mb-5
                text-lg
                font-bold
              "
            >
              <u>Navigation</u>
            </h3>

            <div
              className="
                flex
                flex-col
                gap-3
              "
            >

              <Link href="/">
                Accueil
              </Link>

              <Link href="/hotel">
                Hôtel
              </Link>

              <Link href="/restaurant">
                Restaurant
              </Link>

              <Link href="/events">
                Événements
              </Link>

              <Link href="/contact">
                Contact
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* BAS FOOTER */}

      <div
        className="
          border-t
          border-white/10
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-4
            px-6
            py-6
            text-sm
            text-white/60
            md:flex-row
          "
        >

          <p
  onDoubleClick={() =>
    window.location.href =
      "/admin"
  }
  className="
    cursor-default
    select-none
  "
>
  © {new Date().getFullYear()} Auberge de St Aubin
</p>

          <div
            className="
              flex
              gap-6
            "
          >

            <Link href="/mentions-legales">
              Mentions légales
            </Link>

            <Link href="/confidentialite">
              Politique de confidentialité
            </Link>

          </div>

        </div>

      </div>

    </footer>

  )
}