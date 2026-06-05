import { NextResponse } from "next/server"
import { generateCSRFToken, setCSRFCookie } from "@/lib/csrf"

export async function GET() {
  const token = generateCSRFToken()
  await setCSRFCookie(token)
  
  return NextResponse.json({ csrf_token: token })
}
