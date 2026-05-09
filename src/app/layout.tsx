import type { Metadata } from "next"
import "./globals.css"

import Navbar from "@/components/Navbar"

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
  description: "Hôtel - Restaurant - Bar",
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
        <Navbar />
        {children}
      </body>
    </html>
  )
}