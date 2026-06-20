import type { Metadata } from "next"
import "./globals.css"
import Script from "next/script"

import Navbar from "@/components/Navbar"
import CookieBanner from "@/components/CookieBanner"

import {
  Libre_Baskerville,
  Poppins,
} from "next/font/google"

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-title",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "L'Auberge de St Aubin",
  description: "Bar - Restaurant - Chambres d'hôtes",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${libre.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen bg-[#f5f1ea] text-[#2f241d] font-sans">
        {children}
        <CookieBanner />
        <Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({

      "@context":
        "https://schema.org",

      "@type":
        "Hotel",

      name:
        "Auberge de St Aubin",

      description:
        "Hôtel restaurant convivial au cœur du Bourbonnais.",

      telephone:
        "+33470665097",

      email:
        "contact@auberge-st-aubin.fr",

      address: {

        "@type":
          "PostalAddress",

        streetAddress:
          "21 Rue Saint-Barnabé",

        addressLocality:
          "Saint-Aubin-le-Monial",

        postalCode:
          "03160",

        addressCountry:
          "FR",
      },

      url:
        "https://auberge-st-aubin.fr",

      image:
        "https://auberge-st-aubin.fr/images/auberge-de-saint-aubin.jpg",

      servesCuisine: [
        "Cuisine française",
        "Cuisine traditionnelle",
      ],

      priceRange:
        "€€",

    }),
  }}
/>
      </body>
    </html>
  )
}