import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Schéma de validation
const deletionSchema = z.object({
  email: z.string().email("Email invalide"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation
    const validationResult = deletionSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { email } = validationResult.data

    // Vérifier si des données existent pour cet email
    const reservations = await prisma.reservations.findMany({
      where: { email: email.toLowerCase() }
    })

    if (reservations.length === 0) {
      return NextResponse.json(
        { message: "Aucune donnée trouvée pour cet email" },
        { status: 404 }
      )
    }

    // Supprimer les réservations (cascade supprimera aussi les liaisons)
    await prisma.reservations.deleteMany({
      where: { email: email.toLowerCase() }
    })

    return NextResponse.json({
      success: true,
      message: `${reservations.length} réservation(s) supprimée(s) pour l'email ${email}`
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression des données" },
      { status: 500 }
    )
  }
}
