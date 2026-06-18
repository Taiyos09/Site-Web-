import { prisma }
from "@/lib/prisma"

import {
  NextRequest,
  NextResponse,
} from "next/server"

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {

  const params =
    await context.params

  const body =
    await request.json()

  const room =
  await prisma.rooms.update({

    where: {
      id: Number(params.id),
    },

    data: {

      name: body.name,

      description:
        body.description,

      size: body.size,
      
      capacity: Number(body.capacity),


      priceOnePerson:
        body.one_person_price,

      priceTwoPeople:
        body.two_people_price,

      images: JSON.stringify([
  body.image_1,
  body.image_2,
  body.image_3,
]),
    },
  })

  return NextResponse.json(room)
}