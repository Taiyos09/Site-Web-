import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {

    const {
      arrival,
      departure,
    } = await req.json();

    const events =
      await prisma.events.findMany({
        where: {
          showWarning: true,
          date: {
            gte: new Date(arrival),
            lte: new Date(departure),
          },
        },

        orderBy: {
          date: "asc",
        },
      });

    return NextResponse.json(events);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      [],
      { status: 500 }
    );
  }
}