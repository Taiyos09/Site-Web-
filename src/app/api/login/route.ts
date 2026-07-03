import { prisma } from "@/lib/prisma"

import {
  NextRequest,
  NextResponse,
} from "next/server"
import bcrypt from "bcryptjs"
import { ratelimit } from "@/lib/rate-limit"
import { z } from "zod"
import { validateCSRFToken } from "@/lib/csrf"
import { generateToken } from "@/lib/jwt"

// Schéma de validation Zod
const loginSchema = z.object({
  username: z.string().min(1, "Username requis").max(100),
  password: z.string().min(1, "Password requis").max(255),
  csrf_token: z.string().min(1, "Token CSRF requis"),
})

export async function POST(
  request: NextRequest
) {

  try {

    const body =
      await request.json()

    // Validation des inputs avec Zod
    const validationResult = loginSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Données invalides",
          details: validationResult.error.issues,
        },
        {
          status: 400,
        }
      )
    }

    const { username, password, csrf_token } = validationResult.data

    // Validation du token CSRF
    const isValidCSRF = await validateCSRFToken(csrf_token)
    
    if (!isValidCSRF) {
      return NextResponse.json(
        {
          success: false,
          error: "Token CSRF invalide",
        },
        {
          status: 403,
        }
      )
    }

    // Rate limiting pour prévenir les attaques par force brute
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const { success } = await ratelimit.limit(ip)
    
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: "Trop de tentatives de connexion. Réessayez plus tard.",
        },
        {
          status: 429,
        }
      )
    }

    const admin =
      await prisma.admins.findFirst({

        where: {
          username:
            String(username)
              .trim(),
        },
      })

    if (!admin) {

      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      )
    }

    const passwordMatch = await bcrypt.compare(
      String(password).trim(),
      admin.password
    )

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      )
    }

    // Générer un JWT
    const token = generateToken({
      adminId: admin.id,
      username: admin.username,
    })

    const response =
      NextResponse.json({
        success: true,
      })

    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: "/",
        maxAge: 60 * 60 * 24, // 24 heures
      }
    )

    return response

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    )
  }
}
