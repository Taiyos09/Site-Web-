"use client"

import Image from "next/image"
import { Link } from "@/i18n/navigation";
import {useTranslations} from "next-intl";

export default function Footer() {

const t = useTranslations("home");


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
              src="/logo/test5.png"
              alt="Auberge de St Aubin"
              width={220}
              height={220}
              className="mb-4"
            />

            <p
              className="
                text-sm
                text-white/80
              "
            >
              
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
             <u> {t("NousContacter")}</u>
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
              <u>{t("Horaire")}</u>
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
                  {t("LauJ")}
                </p>
                
                <p>
                  12h - 14h
                </p>

                <p>
                  {t("VetS")}
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
                  {t("LauS")}
                </p>
                <p>
                  8h - 22h
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
              <u>{t("Navigation")}</u>
            </h3>

            <div
              className="
                flex
                flex-col
                gap-3
              "
            >

              <Link href="/">
                {t("home")}
              </Link>

              <Link href="/hotel">
                {t("hotel")}
              </Link>

              <Link href="/restaurant">
                {t("restaurant")}
              </Link>

              <Link href="/events">
                {t("events")}
              </Link>

              <Link href="/contact">
                {t("contact")}
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
              {t("Mention")}
            </Link>

            <Link href="/confidentialite">
              {t("politique")}
            </Link>

          </div>

        </div>

      </div>

    </footer>

  )
}