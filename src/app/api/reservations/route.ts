import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

import {
  NextRequest,
  NextResponse,
} from "next/server"
import { z } from "zod"
import { requireAuth, unauthorizedResponse } from "@/lib/auth"

// Schéma de validation Zod
const reservationSchema = z.object({
  arrival: z.string().min(1, "Date d'arrivée requise"),
  departure: z.string().min(1, "Date de départ requise"),
  roomSlug: z.string().min(1, "Slug de chambre requis"),
  roomName: z.string().min(1, "Nom de chambre requis"),
  roomIds: z.array(z.number()).min(1, "Au moins une chambre requise"),
  first_name: z.string().min(1, "Prénom requis").max(100),
  last_name: z.string().min(1, "Nom requis").max(100),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().min(1, "Téléphone requis").max(20),
  adults: z.number().min(1, "Au moins un adulte requis").max(20),
  children: z.number().min(0).max(20),
  babies: z.number().min(0).max(10),
  litParapluie: z.boolean().optional(),
  message: z.string().optional(),
  pets: z.boolean().optional(),
  breakfast: z.boolean().optional(),
  lunch: z.boolean().optional(),
  dinner: z.boolean().optional(),
  total: z.number().min(0, "Total invalide"),
  status: z.string().optional(),
})

/* =========================
   GET RESERVATIONS
========================= */

export async function GET(request: NextRequest) {

  // Vérifier l'authentification
  const auth = await requireAuth(request)
  
  if (!auth) {
    return unauthorizedResponse()
  }

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
    reservation.pets,

  breakfast:
    reservation.breakfast,

  lunch:
    reservation.lunch,

  dinner:
    reservation.dinner,

  adults:
    reservation.adults,

  children:
    reservation.children,

  babies:
    reservation.babies,

  litParapluie:
    reservation.litParapluie,

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

    // Validation des inputs avec Zod
    const validationResult = reservationSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Données invalides",
          details: validationResult.error.issues,
        },
        {
          status: 400,
        }
      )
    }

    const data = validationResult.data

    const arrival = data.arrival
    const departure = data.departure
    const roomSlug = data.roomSlug
    const roomName = data.roomName
    const roomIds = data.roomIds
    const first_name = data.first_name
    const last_name = data.last_name
    const email = data.email
    const phone = data.phone
    const adults = data.adults
    const children = data.children
    const babies = data.babies
    const litParapluie = data.litParapluie
    const message = data.message
    const pets = data.pets
    const breakfast = data.breakfast
    const lunch = data.lunch
    const dinner = data.dinner
    const total = data.total
    const status = data.status

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

          adults: Number(adults),

children: Number(children),

babies: Number(babies),

litParapluie: Boolean(
  litParapluie
),

pets:
  Boolean(pets),

breakfast:
  Boolean(breakfast),

lunch:
  Boolean(lunch),

dinner:
  Boolean(dinner),

          total:
            Number(total),

          status:
            status || "pending",
        },
      })

   //Réservation crée avec succès

    /* =========================
   BLOQUER LES DATES
========================= */

for (const roomId of roomIds) {

  const room =
    await prisma.rooms.findUnique({
      where: {
        id: roomId,
      },
    })

  if (!room) continue

  const start =
    new Date(arrival)

  const end =
    new Date(departure)

  const current =
    new Date(start)

  while (current < end) {

    await prisma.blocked_dates.create({

      data: {

        room_slug:
          room.slug,

        date:
          new Date(current),

        reason:
          "reservation",

        reservation_id: reservation.id,

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

      <div style="margin:0;padding:40px 20px;background:#f5f1ea;font-family:Arial,sans-serif;">

  <div style="max-width:700px;margin:auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.08);">



<div style="
  background-color:#2f241d;
  padding:35px;
  text-align:center;
">

  <img
    src="https://image.noelshack.com/fichiers/2026/29/7/1784468781-test5.png"
    alt="Logo Auberge de Saint Aubin"
    width="180"
    style="
      display:block;
      margin:0 auto 20px;
      border:0;
    "
  >
  <h1 style="color:white;margin:0;">
    Réservation reçue
  </h1>
  <p style="color:#e8dfd4;margin-top:10px;">
    Auberge de Saint Aubin
  </p>
</div>

<div style="padding:35px;">

  <p>
    Bonjour <strong>${first_name}</strong>,
  </p>

  <p>
    Nous vous remercions pour votre réservation à l'Auberge de Saint Aubin. Nous avons bien reçu votre demande et la traitons actuellement. Vous recevrez une confirmation par email une fois que nous aurons examiné les détails de votre réservation et la disponibilité de la chambre.
  </p>

  <div style="background:#f8f6f2;padding:20px;border-radius:12px;margin:25px 0;">

    <h3 style="margin-top:0;color:#2f241d;">
      📋 Récapitulatif du séjour
    </h3>

    <p><strong>📅 Arrivée :</strong> ${arrival}</p>
    <p><strong>📅 Départ :</strong> ${departure}</p>
    <p><strong>🛏 Chambre :</strong> ${roomName}</p>

    <hr style="border:none;border-top:1px solid #ddd;margin:15px 0;">

    <p><strong>👨 Adultes :</strong> ${adults}</p>
    <p><strong>🧒 Enfants :</strong> ${children}</p>

    ${
      babies > 0
        ? `<p><strong>👶 Bébés :</strong> ${babies}</p>`
        : ""
    }

    <hr style="border:none;border-top:1px solid #ddd;margin:15px 0;">

    <p>Taxe de Séjour : 1.30€ par majeur par nuit | A régler sur place à l'arrivée </p>
    <p><strong>🍽 Petit Déjeuner :</strong> ${breakfast ? "Oui" : "Non"}</p>
    <p><strong>🍽 Repas midi :</strong> ${lunch ? "Oui" : "Non"}</p>
    <p><strong>🌙 Repas soir :</strong> ${dinner ? "Oui" : "Non"}</p>
    <p><strong>🐶 Animal :</strong> ${pets ? "Oui" : "Non"}</p>
    <p><strong>🍼 Lit parapluie :</strong> ${litParapluie ? "Oui" : "Non"}</p>

  </div>

  <div style="background:#2f241d;color:white;padding:20px;border-radius:12px;text-align:center;">
    <div style="font-size:14px;">
      Total du séjour
    </div>

    <div style="font-size:32px;font-weight:bold;">
      ${Number(total).toFixed(2)} €
    </div>
  </div>

  <p style="margin-top:30px;">
    Nous restons à votre disposition pour toute question.
  </p>

  <p>
    Cordialement,<br>
    <strong>L'équipe de l'Auberge de Saint Aubin</strong><br>
    📞 04 70 66 50 97
  </p>

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

      <div style="background:#f5f1ea;padding:40px;font-family:Arial,sans-serif;">

  <div style="max-width:700px;margin:auto;background:white;border-radius:20px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.08);">

<div style="background:#2f241d;padding:35px;text-align:center;">
  <h1 style="color:white;margin:0;">
    🔔 Nouvelle réservation
  </h1>
</div>

<div style="padding:35px;">

  <h3 style="color:#2f241d;">
    Informations client
  </h3>

  <p><strong>Nom :</strong> ${first_name} ${last_name}</p>
  <p><strong>Email :</strong> ${email}</p>
  <p><strong>Téléphone :</strong> ${phone}</p>

  <hr>

  <h3 style="color:#2f241d;">
    Séjour
  </h3>

  <p><strong>📅 Arrivée :</strong> ${arrival}</p>
  <p><strong>📅 Départ :</strong> ${departure}</p>
  <p><strong>🛏 Chambre :</strong> ${roomName}</p>

  <hr>

  <h3 style="color:#2f241d;">
    Occupants
  </h3>

  <p><strong>👨 Adultes :</strong> ${adults}</p>
  <p><strong>🧒 Enfants :</strong> ${children}</p>
  <p><strong>👶 Bébés :</strong> ${babies}</p>

  <hr>

  <h3 style="color:#2f241d;">
    Options
  </h3>

  <p>
  Petit déjeuner :
  <strong>${body.breakfastPrice ? "Oui" : "Non"}
    </strong></p>
    <p><strong>🍽 Midi :</strong> ${lunch ? "Oui" : "Non"}</p>
  <p><strong>🌙 Soir :</strong> ${dinner ? "Oui" : "Non"}</p>
  <p><strong>🐶 Animal :</strong> ${pets ? "Oui" : "Non"}</p>
  <p><strong>🍼 Lit parapluie :</strong> ${litParapluie ? "Oui" : "Non"}</p>

  <div style="margin-top:25px;background:#f8f6f2;padding:20px;border-radius:12px;text-align:center;">

    <div style="font-size:14px;">
      Montant de la réservation
    </div>

    <div style="font-size:32px;font-weight:bold;color:#2f241d;">
      ${Number(total).toFixed(2)} €
    </div>

  </div>

</div>


  </div>

</div>

    `
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