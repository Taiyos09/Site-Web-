"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

  if (error) {
    alert(error.message)
    return
  }

  localStorage.setItem(
    "adminLogged",
    "true"
  )

  router.push("/admin")
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f1ea]">

      <div className="w-full max-w-md rounded-[32px] bg-white p-10 shadow-2xl">

        <h1 className="mb-8 text-center text-4xl font-bold font-serif text-[#2f241d]">
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
            className="w-full text-black rounded-2xl border p-4"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full text-black rounded-2xl border p-4"
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-[#2f241d] py-4 text-lg font-bold text-white"
          >
            Se connecter
          </button>

        </div>
      </div>
    </div>
  )
}