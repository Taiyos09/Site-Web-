import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
  request: Request,
  context: any
) {

  const body =
    await request.json()

  const params =
    await context.params

  const place =
    await prisma.tourism_places.update({

      where: {
        id: Number(params.id),
      },

      data: body,
    })

  return NextResponse.json(
    place
  )
}

export async function DELETE(
  request: Request,
  context: any
) {

  const params =
    await context.params

  await prisma.tourism_places.delete({

    where: {
      id: Number(params.id),
    },
  })

  return NextResponse.json({
    success: true,
  })
}