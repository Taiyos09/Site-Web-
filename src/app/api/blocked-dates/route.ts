import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  req: Request
) {

  const { searchParams } =
    new URL(req.url)

  const roomSlug =
    searchParams.get("roomSlug")

  if (!roomSlug) {

    return NextResponse.json(
      {
        error:
          "roomSlug manquant",
      },
      {
        status: 400,
      }
    )
  }

  const {
    data,
    error,
  } = await supabase
    .from("reservation_rooms")
    .select(`
      room_slug,
      reservations (
        arrival,
        departure,
        status
      )
    `)
    .eq("room_slug", roomSlug)

  if (error) {

    console.error(error)

    return NextResponse.json(
      {
        error:
          "Erreur chargement",
      },
      {
        status: 500,
      }
    )
  }

  return NextResponse.json(data)
}