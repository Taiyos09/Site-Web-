import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {

  const places =
    await prisma.tourism_places.findMany({

      where: {
        is_active: true,
      },

      orderBy: [
        {
          featured: "desc",
        },
        {
          sort_order: "asc",
        },
      ],
    })

  return NextResponse.json(
    places
  )
}

export async function POST(
  request: Request
) {

  const body =
    await request.json()

  const place =
    await prisma.tourism_places.create({

      data: body,
    })

  return NextResponse.json(
    place
  )
}