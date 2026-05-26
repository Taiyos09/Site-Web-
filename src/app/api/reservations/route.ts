import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

import {
  NextRequest,
  NextResponse,
} from "next/server"

/* =========================
   GET RESERVATIONS
========================= */

export async function GET() {

  try {

    const reservations =
      await prisma.reservations.findMany({

        include: {

          rooms: {

            include: {
              room: true,
            },
          },
        },

        orderBy: {
          id: "desc",
        },
      })

    const formattedReservations =
      reservations.map((reservation) => {

        const options =
          reservation.options
            ? JSON.parse(
                reservation.options
              )
            : {}

        const names =
          reservation.name?.split(" ") || []

        return {

          ...reservation,

          first_name:
            names[0] || "",

          last_name:
            names
              .slice(1)
              .join(" "),

          pets:
            options.pets || false,

          lunch:
            options.lunch || false,

          dinner:
            options.dinner || false,

          baby:
            options.baby || false,

          reservation_rooms:
            reservation.rooms.map(
              (link) => ({

                id: link.id,

                room_name:
                  link.room?.name || "",

                roomId:
                  link.roomId,
              })
            ),
        }
      })

    return NextResponse.json(
      formattedReservations
    )

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error:
          "Erreur chargement réservations",
      },
      {
        status: 500,
      }
    )
  }
}

/* =========================
   POST RESERVATION
========================= */

export async function POST(
  request: NextRequest
) {

  try {

    const body =
      await request.json()

    console.log(
      "BODY:",
      body
    )

    const arrival =
      body.arrival

    const departure =
      body.departure

    const roomSlug =
      body.roomSlug

    const roomName =
      body.roomName

    const roomIds =
      body.roomIds

    const first_name =
      body.first_name

    const last_name =
      body.last_name

    const email =
      body.email

    const phone =
      body.phone

    const message =
      body.message

    const people =
      body.people

    const pets =
      body.pets

    const lunch =
      body.lunch

    const dinner =
      body.dinner

    const baby =
      body.baby

    const total =
      body.total

    const status =
      body.status

    /* =========================
       CRÉATION RÉSERVATION
    ========================= */

    const reservation =
      await prisma.reservations.create({

        data: {

          name:
            `${first_name} ${last_name}`,

          email,

          phone,

          arrival:
            new Date(arrival),

          departure:
            new Date(departure),

          people:
            Number(people),

          total:
            Number(total),

          status:
            status || "pending",

          options:
            JSON.stringify({

              pets,
              lunch,
              dinner,
              baby,
            }),
        },
      })

    console.log(
      "RESERVATION CREATED:",
      reservation.id
    )

    /* =========================
       BLOQUER LES DATES
    ========================= */

    const start =
      new Date(arrival)

    const end =
      new Date(departure)

    const current =
      new Date(start)

    while (current < end) {

      console.log({

        room_slug:
          roomSlug,

        date:
          new Date(current),

        reason:
          "reservation",

        from_date:
          new Date(arrival),

        to_date:
          new Date(departure),
      })

      await prisma.blocked_dates.create({

        data: {

          room_slug:
            roomSlug,

          date:
            new Date(current),

          reason:
            "reservation",

          from_date:
            new Date(arrival),

          to_date:
            new Date(departure),
        },
      })

      current.setDate(
        current.getDate() + 1
      )
    }

    /* =========================
       LIAISON CHAMBRES
    ========================= */

    for (
      const roomId of
      roomIds || []
    ) {

      await prisma.reservation_rooms.create({

        data: {

          reservation: {

            connect: {
              id:
                reservation.id,
            },
          },

          room: {

            connect: {
              id:
                roomId,
            },
          },
        },
      })
    }

    /* =========================
       EMAILS
    ========================= */

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

    /* CLIENT */

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to:
        email,

      subject:
        `Réservation - ${first_name} ${last_name}`,

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
              background:#2f241d;
              padding:45px 30px;
              text-align:center;
            "
          >

            <h1
              style="
                color:white;
                margin:0;
                font-size:40px;
              "
            >
              Réservation reçue
            </h1>

          </div>

          <div style="padding:35px;">

            <p>
              Bonjour
              ${first_name},
            </p>

            <p>
              Votre réservation a bien été reçue.
            </p>

            <p>
              <strong>Arrivée :</strong>
              ${arrival}
            </p>

            <p>
              <strong>Départ :</strong>
              ${departure}
            </p>

            <p>
              <strong>Chambre :</strong>
              ${roomName}
            </p>

            <p>
              <strong>Total :</strong>
              ${total}€
            </p>

          </div>

        </div>

      </div>
      `,
    })

    /* ADMIN */

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to:
        process.env.EMAIL_TO,

      subject:
        "Nouvelle réservation",

      html: `

      <div
        style="
          background:#f5f1ea;
          padding:40px;
          font-family:Arial;
        "
      >

        <div
          style="
            max-width:700px;
            margin:auto;
            background:white;
            border-radius:30px;
            overflow:hidden;
          "
        >

          <div
            style="
              background:#2f241d;
              padding:40px;
              text-align:center;
              color:white;
            "
          >

            <h1>
              Nouvelle réservation
            </h1>

          </div>

          <div style="padding:40px;">

            <p>
              <strong>Client :</strong>
              ${first_name}
              ${last_name}
            </p>

            <p>
              <strong>Email :</strong>
              ${email}
            </p>

            <p>
              <strong>Téléphone :</strong>
              ${phone}
            </p>

            <p>
              <strong>Arrivée :</strong>
              ${arrival}
            </p>

            <p>
              <strong>Départ :</strong>
              ${departure}
            </p>

            <p>
              <strong>Total :</strong>
              ${total}€
            </p>

          </div>

        </div>

      </div>
      `,
    })

    return NextResponse.json(
      reservation
    )

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error:
          "Erreur création réservation",
      },
      {
        status: 500,
      }
    )
  }
}