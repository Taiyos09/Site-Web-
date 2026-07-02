import { deleteImage } from "@/lib/delete-image"
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

const place =
  await prisma.tourism_places.findUnique({
    where: { id }
  })

if (
  place?.image
) {

  deleteImage(
    place.image
  )
}

await prisma.tourism_places.delete({
  where: { id }
})

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