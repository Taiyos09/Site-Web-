import { prisma }
from "@/lib/prisma"

import {
  NextRequest,
  NextResponse,
} from "next/server"

export async function PUT(
  request: NextRequest,
  context: any
) {

  const params =
    await context.params

  const body =
    await request.json()

  const reservation =
    await prisma.reservations.update({

      where: {
        id: Number(params.id),
      },

      data: {
        status: body.status,
      },
    })

  return NextResponse.json(
    reservation
  )
}