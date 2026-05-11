import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import nodemailer from "nodemailer"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(
  req: Request
) {

  try {

    const body = await req.json()

    const { data: room, error: roomFetchError } =
  await supabase
    .from("rooms")
    .select("*")
    .eq("slug", body.roomSlug)
    .single()

if (roomFetchError || !room) {

  return NextResponse.json(
    {
      error: "Chambre introuvable",
    },
    {
      status: 404,
    }
  )
}

/* ---------------- VÉRIFICATION DISPONIBILITÉ ---------------- */

const {
  data: existingReservations,
  error: availabilityError,
} = await supabase
  .from("reservation_rooms")
  .select(`
    reservation_id,
    room_slug,
    reservations (
      arrival,
      departure,
      status
    )
  `)
  .eq("room_slug", room.slug)

if (availabilityError) {

  console.error(availabilityError)

  return NextResponse.json(
    {
      error:
        "Erreur vérification disponibilité",
    },
    {
      status: 500,
    }
  )
}

const hasConflict =
  existingReservations?.some(
    (reservation: any) => {

      const existing =
        reservation.reservations

      if (!existing) return false

      // ignorer refusées / annulées
      if (
        existing.status === "refused" ||
        existing.status === "cancelled"
      ) {
        return false
      }

      return (
        body.arrival <
          existing.departure &&
        body.departure >
          existing.arrival
      )
    }
  )

if (hasConflict) {

  return NextResponse.json(
    {
      error:
        "Cette chambre est déjà réservée sur ces dates",
    },
    {
      status: 409,
    }
  )
}

/* ---------------- SETTINGS ---------------- */

const {
  data: settings,
  error: settingsError,
} = await supabase
  .from("hotel_settings")
  .select("*")
  .single()

if (settingsError || !settings) {

  return NextResponse.json(
    {
      error:
        "Impossible de charger les paramètres hôtel",
    },
    {
      status: 500,
    }
  )
}

/* ---------------- RECALCUL TOTAL ---------------- */

const arrival =
  new Date(body.arrival)

const departure =
  new Date(body.departure)

const nights =
  Math.ceil(
    (
      departure.getTime() -
      arrival.getTime()
    ) /
      (1000 * 60 * 60 * 24)
  )

if (nights <= 0) {

  return NextResponse.json(
    {
      error:
        "Dates invalides",
    },
    {
      status: 400,
    }
  )
}

if (
  body.people < 1 ||
  body.people > room.capacity
) {

  return NextResponse.json(
    {
      error:
        "Nombre de personnes invalide",
    },
    {
      status: 400,
    }
  )
}

/* ---------- PRIX CHAMBRE ---------- */

const roomPrice =
  body.people <= 1
    ? Number(
        room.one_person_price
      )
    : Number(
        room.two_people_price
      )

const roomTotal =
  roomPrice * nights

/* ---------- LITS SUP ---------- */

const extraPeople =
  body.people > 2
    ? body.people - 2
    : 0

const extraBedTotal =
  extraPeople *
  Number(settings.extra_bed) *
  nights

/* ---------- OPTIONS ---------- */

const breakfastTotal =
  body.breakfast
    ? body.people *
      Number(
        settings.breakfast
      ) *
      nights
    : 0

const lunchTotal =
  body.lunch
    ? body.people *
      Number(settings.lunch) *
      nights
    : 0

const dinnerTotal =
  body.dinner
    ? body.people *
      Number(
        settings.dinner
      ) *
      nights
    : 0

const petTotal =
  body.pets
    ? Number(settings.pet) *
      nights
    : 0

/* ---------- TAXE ---------- */

const touristTaxTotal =
  body.people *
  Number(
    settings.tourist_tax
  ) *
  nights

/* ---------- TOTAL FINAL ---------- */

const total =
  roomTotal +
  extraBedTotal +
  breakfastTotal +
  lunchTotal +
  dinnerTotal +
  petTotal +
  touristTaxTotal

    /* ---------------- RESERVATION PRINCIPALE ---------------- */

    const {
      data: reservationData,
      error,
    } = await supabase
      .from("reservations")
      .insert([
        {

          first_name:
            body.first_name,

          last_name:
            body.last_name,

          email:
            body.email,

          phone:
            body.phone,

          arrival:
            body.arrival,

          departure:
            body.departure,

          people:
            body.people,

          pets:
            body.pets,

          breakfast:
            body.breakfast,

          lunch:
            body.lunch,

          dinner:
            body.dinner,

          baby:
            body.baby,

          message:
            body.message,

          total:
            total,

          status:
            "pending",
        },
      ])
      .select()
      .single()

    if (error) {

      console.error(error)

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      )
    }

    /* ---------------- CHAMBRE ---------------- */

    const {
      error: roomError,
    } = await supabase
      .from("reservation_rooms")
      .insert({

        reservation_id:
          reservationData.id,

        room_name: room.name,
room_slug: room.slug,

        people:
          body.people,

        room_total:
          roomTotal,
      })

    if (roomError) {

  console.error(roomError)

  /* ---------------- ROLLBACK ---------------- */

  await supabase
    .from("reservations")
    .delete()
    .eq("id", reservationData.id)

  return NextResponse.json(
    {
      error:
        roomError.message,
    },
    {
      status: 500,
    }
  )
}

    /* ---------------- EMAIL ADMIN ---------------- */

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to:
        process.env.EMAIL_TO,

      subject:
        "Nouvelle réservation - Auberge St Aubin",

html: `
<div style="
  background:#f5f1ea;
  padding:40px;
  font-family:Arial,sans-serif;
  color:#2f241d;
">

  <div style="
    max-width:700px;
    margin:auto;
    background:white;
    border-radius:30px;
    overflow:hidden;
    box-shadow:0 15px 40px rgba(0,0,0,0.08);
  ">

    <!-- HEADER -->

    <div style="
      background:#2f241d;
      padding:40px;
      text-align:center;
    ">

      <h1 style="
        color:white;
        margin:0;
        font-size:38px;
      ">
        Auberge Saint Aubin
      </h1>

      <p style="
        color:#d6c3aa;
        margin-top:12px;
        font-size:16px;
      ">
        Nouvelle demande de réservation
      </p>

    </div>

    <!-- CONTENT -->

    <div style="padding:40px;">

      <h2 style="
        margin-top:0;
        font-size:28px;
      ">
        ${body.first_name} ${body.last_name}
      </h2>

      <div style="
        background:#faf7f2;
        border-radius:20px;
        padding:25px;
        margin-top:25px;
      ">

        <h3 style="
          margin-top:0;
          margin-bottom:20px;
          font-size:22px;
        ">
          Informations client
        </h3>

        <p>
          <strong>Email :</strong>
          ${body.email}
        </p>

        <p>
          <strong>Téléphone :</strong>
          ${body.phone}
        </p>

      </div>

      <div style="
        background:#faf7f2;
        border-radius:20px;
        padding:25px;
        margin-top:25px;
      ">

        <h3 style="
          margin-top:0;
          margin-bottom:20px;
          font-size:22px;
        ">
          Séjour
        </h3>

        <p>
          <strong>Chambre :</strong>
          ${body.roomName}
        </p>

        <p>
          <strong>Arrivée :</strong>
          ${body.arrival}
        </p>

        <p>
          <strong>Départ :</strong>
          ${body.departure}
        </p>

        <p>
          <strong>Nuits :</strong>
          ${body.nights}
        </p>

        <p>
          <strong>Personnes :</strong>
          ${body.people}
        </p>

      </div>

      <div style="
        background:#faf7f2;
        border-radius:20px;
        padding:25px;
        margin-top:25px;
      ">

        <h3 style="
          margin-top:0;
          margin-bottom:20px;
          font-size:22px;
        ">
          Options
        </h3>

        <p>
          Petit déjeuner :
          <strong>
            ${body.breakfast ? "Oui" : "Non"}
          </strong>
        </p>

        <p>
          Repas midi :
          <strong>
            ${body.lunch ? "Oui" : "Non"}
          </strong>
        </p>

        <p>
          Repas soir :
          <strong>
            ${body.dinner ? "Oui" : "Non"}
          </strong>
        </p>

        <p>
          Animal :
          <strong>
            ${body.pets ? "Oui" : "Non"}
          </strong>
        </p>

        <p>
          Lit bébé :
          <strong>
            ${body.baby ? "Oui" : "Non"}
          </strong>
        </p>

      </div>

      <div style="
        background:#2f241d;
        color:white;
        border-radius:24px;
        padding:30px;
        margin-top:30px;
        text-align:center;
      ">

        <p style="
          margin:0;
          font-size:18px;
          opacity:0.9;
        ">
          Total réservation
        </p>

        <h2 style="
          margin:10px 0 0;
          font-size:42px;
          color:#d6b17a;
        ">
          ${total}€
        </h2>

      </div>

      ${
        body.message
          ? `
        <div style="
          margin-top:30px;
          background:#faf7f2;
          border-radius:20px;
          padding:25px;
        ">

          <h3 style="
            margin-top:0;
          ">
            Message client
          </h3>

          <p style="
            line-height:1.7;
          ">
            ${body.message}
          </p>

        </div>
      `
          : ""
      }

    </div>

    <!-- FOOTER -->

    <div style="
      padding:30px;
      text-align:center;
      background:#faf7f2;
      color:#7d6d60;
      font-size:14px;
    ">

      Auberge Saint Aubin<br />
      Demande envoyée depuis le site internet

    </div>

  </div>

</div>
`,
    })

    return NextResponse.json({
      success: true,
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error: "Erreur serveur",
      },
      {
        status: 500,
      }
    )
  }
}