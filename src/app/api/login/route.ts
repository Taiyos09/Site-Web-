import { prisma }
from "@/lib/prisma"

import {
  NextRequest,
  NextResponse,
} from "next/server"
import bcrypt from "bcryptjs"

export async function POST(
  request: NextRequest
) {

  try {

    const body =
      await request.json()

    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Username and password required",
        },
        {
          status: 400,
        }
      )
    }

    const admin =
      await prisma.admins.findFirst({

        where: {
          username:
            String(username)
              .trim(),
        },
      })

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

    const passwordMatch = await bcrypt.compare(
      String(password).trim(),
      admin.password
    )

    if (!passwordMatch) {
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