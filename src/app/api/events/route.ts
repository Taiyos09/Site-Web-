import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { deleteImage }
  from "@/lib/delete-image"

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
      JSON.stringify(
        events,
        null,
        2
      )
    )

    // Supprime les anciennes images
    const oldEvents =
      await prisma.events.findMany()

    for (
      const event
      of oldEvents
    ) {

      deleteImage(
        event.image
      )

      const gallery =
        JSON.parse(
          event.gallery
          || "[]"
        )

      for (
        const image
        of gallery
      ) {

        deleteImage(
          image
        )
      }
    }

    // Supprime les anciens événements
    await prisma.events.deleteMany()

    // Recréation
    for (
      const event
      of events
    ) {

      console.log(
        "DATE RECUE =",
        event.date
      )

      const formattedDate =
        new Date(
          event.date
        )

      console.log(
        "DATE FORMATTEE =",
        formattedDate
      )

      await prisma.events.create({

        data: {

          title:
            event.title,

          slug:
            event.title
              .toLowerCase()
              .replaceAll(
                " ",
                "-"
              )
              .replaceAll(
                "'",
                ""
              )
              .replaceAll(
                "é",
                "e"
              )
              .replaceAll(
                "è",
                "e"
              )
              .replaceAll(
                "ê",
                "e"
              )
              .replaceAll(
                "à",
                "a"
              )
              .replaceAll(
                "ç",
                "c"
              ),

          date:
            formattedDate,

          description:
            event.description,

          image:
            event.image,

          showWarning:
            event.showWarning ?? false,

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

  } catch (
    error
  ) {

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