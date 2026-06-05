import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

/* =========================
   GET EVENTS
========================= */

export async function GET() {

  const events =
  await prisma.events.findMany()

return NextResponse.json(

  events.map((event) => ({

    ...event,

    gallery:
      typeof event.gallery ===
      "string"

        ? JSON.parse(
            event.gallery
          )

        : event.gallery,

  }))
)
}

/* =========================
   SAVE EVENTS
========================= */

export async function POST(
  request: Request
) {

  try {

    const events =
      await request.json()

    console.log(
      "EVENTS RECUS :",
      JSON.stringify(events, null, 2)
    )

    await prisma.events.deleteMany()

    for (const event of events) {

      console.log(
        "CREATION EVENT :",
        event
      )

      await prisma.events.create({

        data: {

          title:
            event.title,

          date:
            event.date,

          description:
            event.description,

          image:
            event.image,

          gallery:
  JSON.stringify(
    event.gallery
  ),
        },
      })
    }

    return NextResponse.json({
      success: true,
    })

  } catch (error) {

    console.error(
      "ERREUR EVENTS :",
      error
    )

    return NextResponse.json(
      {
        error:
          "Erreur sauvegarde",
      },
      {
        status: 500,
      }
    )
  }
}