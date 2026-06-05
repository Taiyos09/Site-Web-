import { NextRequest } from "next/server"
import { verifyToken } from "@/lib/jwt"
import { NextResponse } from "next/server"

// Middleware pour vérifier l'authentification
export async function requireAuth(request: NextRequest): Promise<{ adminId: number; username: string } | null> {
  const token = request.cookies.get('token')?.value
  
  if (!token) {
    return null
  }
  
  const payload = verifyToken(token)
  return payload
}

// Fonction helper pour les routes protégées
export function unauthorizedResponse() {
  return NextResponse.json(
    { error: "Non autorisé" },
    { status: 401 }
  )
}
