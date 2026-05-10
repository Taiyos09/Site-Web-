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
            body.total,

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

        room_name:
          body.roomName,

        people:
          body.people,

        room_total:
          body.total,
      })

    if (roomError) {

      console.error(roomError)

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

    /* ---------------- BLOQUER DATES ---------------- */

    const {
      error: blockedError,
    } = await supabase
      .from("blocked_dates")
      .insert({

        reservation_id:
          reservationData.id,

        room_name:
          body.roomName,

        from_date:
          body.arrival,

        to_date:
          body.departure,
      })

    if (blockedError) {

      console.error(blockedError)

      return NextResponse.json(
        {
          error:
            blockedError.message,
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
          ${body.total}€
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