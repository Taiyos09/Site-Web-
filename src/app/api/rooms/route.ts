import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// API ROUTE
export async function GET() {

  const rooms =
    await prisma.rooms.findMany({
      orderBy: {
        name: "asc",
      },
    })

  const formattedRooms =
    rooms.map((room) => {

      let images: string[] = []

      if (room.images) {

        images = room.images
          .replace("[", "")
          .replace("]", "")
          .replace(/"/g, "")
          .split(",")

          .map((img) =>
            img
              .trim()
              .replace(/\\/g, "/")
          )
      }

      return {
        ...room,
        images,
      }
    })

  return NextResponse.json(
    formattedRooms
  )
}

// AUTRE FONCTION
export async function getHotelData() {

  const roomsResponse =
    await fetch(
      "http://localhost:3000/api/rooms",
      {
        cache: "no-store",
      }
    )

  const rooms =
    await roomsResponse.json()

  const settingsResponse =
    await fetch(
      "http://localhost:3000/api/hotel-settings",
      {
        cache: "no-store",
      }
    )

  const settings =
    await settingsResponse.json()

  return {
    rooms,
    settings,
  }
}