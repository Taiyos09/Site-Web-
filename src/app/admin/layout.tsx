"use client"

import {
  useEffect,
  useState,
} from "react"

import { useRouter } from "next/navigation"

import { supabase } from "@/lib/supabase"

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

    const checkAuth = async () => {

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {

        router.push("/login")
        return
      }

      setLoading(false)
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
          mx-auto
          w-full
          max-w-[1900px]
          px-4
          py-8
          md:px-6
          md:py-10
        "
      >

        {children}

      </main>

    </div>
  )
}