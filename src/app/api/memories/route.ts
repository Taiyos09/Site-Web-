import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { deleteImage }
  from "@/lib/delete-image"

export async function GET() {

  console.log(
    "MEMORIES API"
  )

  const memories =
    await prisma["memories"].findMany()

  console.log(
    memories
  )

  return NextResponse.json(
    memories
  )
}

export async function POST(
  request: Request
) {

  const memories =
    await request.json()

const oldMemories =
  await prisma["memories"].findMany()

for (
  const memory
  of oldMemories
) {

  const images =
    JSON.parse(
      memory.images
    )

  for (
    const image
    of images
  ) {

    deleteImage(
      image
    )
  }
}

  await prisma["memories"].deleteMany()

  for (
    const memory
    of memories
  ) {

    await prisma["memories"].create({

      data: {

        title:
          memory.title,

        images:
          JSON.stringify(
            memory.images
          ),

        featured:
          memory.featured,
      },
    })
  }

  return NextResponse.json({
    success: true,
  })
}