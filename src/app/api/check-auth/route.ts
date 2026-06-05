import {
  NextRequest,
  NextResponse,
} from "next/server"
import { verifyToken } from "@/lib/jwt"

export async function GET(
  request: NextRequest
) {

  const token =
    request.cookies.get("token")?.value

  if (!token) {

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
      }
    )
  }

  // Vérifier le JWT
  const payload = verifyToken(token)
  
  if (!payload) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
      }
    )
  }

  return NextResponse.json({
    success: true,
    admin: {
      id: payload.adminId,
      username: payload.username,
    }
  })
}