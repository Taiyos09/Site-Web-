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

    /* ---------------- SAVE SUPABASE ---------------- */

    const { error } = await supabase
      .from("reservations")
      .insert([body])

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

    /* ---------------- EMAIL ADMIN ---------------- */

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_TO,

      subject:
        "Nouvelle réservation - Auberge St Aubin",

      html: `
        <h2>Nouvelle demande de réservation</h2>

        <p>
          <strong>Nom :</strong>
          ${body.first_name}
          ${body.last_name}
        </p>

        <p>
          <strong>Email :</strong>
          ${body.email}
        </p>

        <p>
          <strong>Téléphone :</strong>
          ${body.phone}
        </p>

        <hr />

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

        <p>
          <strong>Petit déjeuner :</strong>
          ${body.breakfast ? "Oui" : "Non"}
        </p>

        <p>
          <strong>Repas midi :</strong>
          ${body.lunch ? "Oui" : "Non"}
        </p>

        <p>
          <strong>Repas soir :</strong>
          ${body.dinner ? "Oui" : "Non"}
        </p>

        <p>
          <strong>Animal :</strong>
          ${body.pets ? "Oui" : "Non"}
        </p>

        <p>
          <strong>Bébé :</strong>
          ${body.baby ? "Oui" : "Non"}
        </p>

        <hr />

        <p>
          <strong>Total :</strong>
          ${body.total}€
        </p>

        <p>
          <strong>Message :</strong><br />
          ${body.message || "Aucun"}
        </p>
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