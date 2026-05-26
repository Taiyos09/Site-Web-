import nodemailer from "nodemailer"
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
        status: body.status,
      },
    })

    if (
  reservation.status ===
  "confirmed"
) {

  const transporter =
    nodemailer.createTransport({

      service: "gmail",

      auth: {

        user:
          process.env.EMAIL_USER,

        pass:
          process.env.EMAIL_PASS,
      },
    })

  await transporter.sendMail({

  from:
    process.env.EMAIL_USER,

  to:
    reservation.email,

  subject:
    `Réservation confirmée - Auberge de St Aubin`,

  html: `

  <div
    style="
      margin:0;
      padding:40px 0;
      background:#f5f1ea;
      font-family:Arial,sans-serif;
    "
  >

    <div
      style="
        max-width:700px;
        margin:auto;
        background:white;
        border-radius:32px;
        overflow:hidden;
        box-shadow:0 10px 30px rgba(0,0,0,0.08);
      "
    >

      <div
        style="
          background:#4f7c5f;
          padding:45px 30px;
          text-align:center;
        "
      >

        <img
          src="https://image.noelshack.com/fichiers/2026/19/6/1778339311-logo2.jpg"
          alt="Logo Auberge"
          style="
            width:190px;
            margin-bottom:20px;
          "
        />

        <h1
          style="
            color:white;
            margin:0;
            font-size:40px;
            font-weight:bold;
          "
        >
          Réservation confirmée
        </h1>

      </div>

      <div style="padding:35px;">

        <div
          style="
            background:#f5f1ea;
            border-radius:24px;
            padding:28px;
            margin-bottom:30px;
          "
        >

          <h2
            style="
              margin-top:0;
              color:#2f241d;
              font-size:32px;
            "
          >
            Votre séjour
          </h2>

          <p>
            Bonjour ${reservation.name},
          </p>

          <p>
            Votre réservation a bien été
            <strong>confirmée</strong>.
          </p>

          <p>
            <strong>Arrivée :</strong>
            ${new Date(
              reservation.arrival
            ).toLocaleDateString("fr-FR")}
          </p>

          <p>
            <strong>Départ :</strong>
            ${new Date(
              reservation.departure
            ).toLocaleDateString("fr-FR")}
          </p>

          <p>
            <strong>Personnes :</strong>
            ${reservation.people}
          </p>

          <p>
            <strong>Total :</strong>
            ${reservation.total}€
          </p>

        </div>

      </div>

      <div
        style="
          background:#f5f1ea;
          padding:20px;
          text-align:center;
          font-size:13px;
          color:#7a6a5d;
        "
      >
        Nous avons hâte de vous accueillir 🙂
      </div>

    </div>

  </div>
  `,
})

await transporter.sendMail({

  from:
    process.env.EMAIL_USER,

  to:
    reservation.email,

  subject:
    `Réservation refusée - Auberge de St Aubin`,

  html: `

  <div
    style="
      margin:0;
      padding:40px 0;
      background:#f5f1ea;
      font-family:Arial,sans-serif;
    "
  >

    <div
      style="
        max-width:700px;
        margin:auto;
        background:white;
        border-radius:32px;
        overflow:hidden;
        box-shadow:0 10px 30px rgba(0,0,0,0.08);
      "
    >

      <div
        style="
          background:#8b2e2e;
          padding:45px 30px;
          text-align:center;
        "
      >

        <img
          src="https://image.noelshack.com/fichiers/2026/19/6/1778339311-logo2.jpg"
          alt="Logo Auberge"
          style="
            width:190px;
            margin-bottom:20px;
          "
        />

        <h1
          style="
            color:white;
            margin:0;
            font-size:40px;
            font-weight:bold;
          "
        >
          Réservation refusée
        </h1>

      </div>

      <div style="padding:35px;">

        <div
          style="
            background:#f5f1ea;
            border-radius:24px;
            padding:28px;
          "
        >

          <p>
            Bonjour ${reservation.name},
          </p>

          <p>
            Nous sommes désolés,
            mais nous ne pouvons pas
            accepter votre réservation
            pour les dates demandées.
          </p>

          <p>
            N’hésitez pas à nous contacter
            pour trouver une autre solution.
          </p>

        </div>

      </div>

      <div
        style="
          background:#f5f1ea;
          padding:20px;
          text-align:center;
          font-size:13px;
          color:#7a6a5d;
        "
      >
        Auberge de St Aubin
      </div>

    </div>

  </div>
  `,
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

  await prisma.reservation_rooms.deleteMany({

    where: {
      id:
        Number(params.id),
    },
  })

  await prisma.blocked_dates.deleteMany({

    where: {
      id:
        Number(params.id),
    },
  })

  await prisma.reservations.delete({

    where: {
      id: Number(params.id),
    },
  })

  return NextResponse.json({
    success: true,
  })
}