import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {

  const reservations =
    await prisma.reservations.count()

  const pendingReservations =
    await prisma.reservations.count({
      where: {
        status: "pending",
      },
    })

  const rooms =
    await prisma.rooms.count()

  const events =
    await prisma.events.count()

  const latestReservations =
    await prisma.reservations.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    })

  const upcomingEvents =
    await prisma.events.findMany({
      orderBy: {
        date: "asc",
      },
      take: 5,
    })

  const revenue =
  await prisma.reservations.aggregate({
    _sum: {
      total: true,
    },
  })

  return NextResponse.json({
    reservations,
    revenue: Number(
  revenue._sum.total || 0
).toFixed(2),
    pendingReservations,
    rooms,
    events,
    latestReservations,
    upcomingEvents,
  })
}