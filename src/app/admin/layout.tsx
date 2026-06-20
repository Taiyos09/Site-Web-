"use client"

import {
  useEffect,
  useState,
} from "react"

import { useRouter } from "next/navigation"
import AdminNavbar from "@/components/AdminNavbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()

  const [loading, setLoading] =
    useState(true)

  /* ====================================== */
  /* CHECK AUTH */
  /* ====================================== */

  useEffect(() => {

  const checkAuth =
    async () => {

      try {

        const response =
          await fetch(
            "/api/check-auth"
          )

        if (!response.ok) {

          router.push("/login")
          return
        }

        setLoading(false)

      } catch (error) {

        router.push("/login")

      }
    }

  checkAuth()

}, [router])

  /* ====================================== */
  /* LOADING */
  /* ====================================== */

  if (loading) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#f5f1eb]
        "
      >

        <div
          className="
            text-2xl
            font-semibold
            text-[#2f241d]
          "
        >
          Chargement...
        </div>

      </div>
    )
  }

  /* ====================================== */
  /* LAYOUT */
  /* ====================================== */

  return (

    <div
      className="
        min-h-screen
        bg-[#f5f1eb]
      "
    >

      {/* NAVBAR */}

      <AdminNavbar />

      {/* CONTENT */}

      <main
  className="
    lg:ml-[288px]
    min-h-screen
    px-4
    md:px-8
    py-8
  "
>

        {children}

      </main>

    </div>
  )
}