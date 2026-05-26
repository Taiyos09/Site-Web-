import { prisma }
from "@/lib/prisma"

import {
  NextRequest,
  NextResponse,
} from "next/server"

export async function POST(
  request: NextRequest
) {

  try {

    const body =
      await request.json()

    console.log(body)

    const admin =
      await prisma.admins.findFirst({

        where: {
          username:
            String(body.username)
              .trim(),

          password:
            String(body.password)
              .trim(),
        },
      })

    console.log(admin)

    if (!admin) {

      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      )
    }

    const response =
      NextResponse.json({
        success: true,
      })

    response.cookies.set(
      "token",
      String(admin.id),
      {
        httpOnly: true,
        path: "/",
      }
    )

    return response

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    )
  }
}