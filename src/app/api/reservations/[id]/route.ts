import { prisma }
from "@/lib/prisma"

import {
  NextRequest,
  NextResponse,
} from "next/server"

export async function PUT(
  request: NextRequest,
  context: any
) {

  const params =
    await context.params

  const body =
    await request.json()

  const reservation =
    await prisma.reservations.update({

      where: {
        id: Number(params.id),
      },

      data: {

        ...(body.status !== undefined && {
          status: body.status,
        }),

        ...(body.depositRequired !== undefined && {
          depositRequired:
            body.depositRequired,
        }),

        ...(body.depositAmount !== undefined && {
          depositAmount:
            body.depositAmount,
        }),

        ...(body.depositPaid !== undefined && {
          depositPaid:
            body.depositPaid,
        }),

        ...(body.depositPaidAt && {
          depositPaidAt:
            new Date(
              body.depositPaidAt
            ),
        }),
      },
    })

    if (body.status === "rejected") {

  await prisma.blocked_dates.deleteMany({

    where: {
      reservation_id:
        Number(params.id),
    },

  })
}

  return NextResponse.json(
    reservation
  )
}

export async function DELETE(
  request: NextRequest,
  context: any
) {

  const params =
    await context.params

  const reservationId =
    Number(params.id)

  await prisma.blocked_dates.deleteMany({

  where: {
    reservation_id:
      reservationId,
  },

})

  await prisma.reservation_rooms.deleteMany({

    where: {
      reservationId,
    },

  })

  await prisma.reservations.delete({

    where: {
      id: reservationId,
    },

  })

  return NextResponse.json({
    success: true,
  })

}