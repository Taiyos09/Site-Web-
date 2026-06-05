import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Schéma de validation
const accessSchema = z.object({
  email: z.string().email("Email invalide"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation
    const validationResult = accessSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { email } = validationResult.data

    // Récupérer toutes les données pour cet email
    const reservations = await prisma.reservations.findMany({
      where: { email: email.toLowerCase() },
      include: {
        rooms: {
          include: {
            room: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (reservations.length === 0) {
      return NextResponse.json(
        { message: "Aucune donnée trouvée pour cet email" },
        { status: 404 }
      )
    }

    // Formater les données pour l'utilisateur
    const userData = {
      email: email,
      reservations: reservations.map((res: any) => ({
        id: res.id,
        name: res.name,
        arrival: res.arrival,
        departure: res.departure,
        adults: res.adults,
        children: res.children,
        babies: res.babies,
        pets: res.pets,
        lunch: res.lunch,
        dinner: res.dinner,
        litParapluie: res.litParapluie,
        total: res.total,
        status: res.status,
        createdAt: res.createdAt,
        rooms: res.rooms.map((r: any) => ({
          roomName: r.room?.name,
          roomId: r.roomId
        }))
      }))
    }

    return NextResponse.json({
      success: true,
      data: userData
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données" },
      { status: 500 }
    )
  }
}