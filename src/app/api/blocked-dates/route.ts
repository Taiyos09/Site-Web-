import { prisma } from "@/lib/prisma"

import {
  NextRequest,
  NextResponse,
} from "next/server"

export async function GET(
  request: NextRequest
) {

  try {

    const room_slug =
      request.nextUrl.searchParams.get(
        "room_slug"
      )

    if (!room_slug) {

      return NextResponse.json(
        [],
        { status: 200 }
      )
    }

    const blockedDates =
      await prisma.blocked_dates.findMany({

        where: {
          room_slug,
        },

        orderBy: {
          date: "asc",
        },
      })

    return NextResponse.json(
      blockedDates
    )

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      [],
      { status: 500 }
    )
  }
}