"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const [csrfToken, setCsrfToken] =
    useState("")

  // Récupérer le token CSRF au chargement
  useEffect(() => {
    fetch("/api/csrf")
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrf_token))
      .catch(() => setError("Erreur de chargement"))
  }, [])

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    if (!csrfToken) {
      setError("Token CSRF non disponible")
      return
    }

    setLoading(true)
    setError("")

    const response =
  await fetch("/api/login", {

    method: "POST",

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({
      username,
      password,
      csrf_token: csrfToken,
    }),
  })

if (!response.ok) {

  const data = await response.json()
  setError(data.error || "Nom d'utilisateur ou mot de passe incorrect")
  setLoading(false)
  return
}

router.push("/admin")

    setLoading(false)
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
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
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
            disabled={loading || !csrfToken}
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
              : !csrfToken
              ? "Chargement..."
              : "Se connecter"}

          </button>

        </div>

      </form>

    </div>
  )
}