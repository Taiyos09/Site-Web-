"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    setLoading(true)
    setError("")

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password,

      })

    if (error) {

      setError(error.message)
      setLoading(false)

      return
    }

    setLoading(false)

    router.push("/admin")
  }

  return (

    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#f5f1ea]
        px-6
      "
    >

      <form
        onSubmit={handleLogin}
        className="
          w-full
          max-w-md
          rounded-[32px]
          bg-white
          p-10
          shadow-2xl
        "
      >

        <h1
          className="
            mb-8
            text-center
            font-serif
            text-4xl
            font-bold
            text-[#2f241d]
          "
        >
          Connexion admin
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-[#ddd]
              p-4
              text-black
              outline-none
            "
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-[#ddd]
              p-4
              text-black
              outline-none
            "
            required
          />

          {error && (

            <p className="text-red-500">
              {error}
            </p>

          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-2xl
              bg-[#2f241d]
              py-4
              text-lg
              font-bold
              text-white
              transition
              hover:bg-[#43352c]
              disabled:opacity-50
            "
          >

            {loading
              ? "Connexion..."
              : "Se connecter"}

          </button>

        </div>

      </form>

    </div>
  )
}