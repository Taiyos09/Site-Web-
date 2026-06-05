import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

// Schéma de validation Zod
const contactSchema = z.object({
  name: z.string().min(1, "Nom requis").max(100),
  email: z.string().email("Email invalide").max(255),
  message: z.string().min(1, "Message requis").max(5000),
})

export async function POST(req: Request) {

  try {

    const body = await req.json()

    // Validation des inputs avec Zod
    const validationResult = contactSchema.safeParse(body)
    
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

    const { name, email, message } = validationResult.data

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
  from: process.env.EMAIL_USER,

  to: process.env.EMAIL_TO,

  subject: `Nouveau message - ${name}`,

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

      <!-- HEADER -->
      <div
        style="
          background:#2f241d;
          padding:45px 30px;
          text-align:center;
        "
      >

        <img
          src="https://image.noelshack.com/fichiers/2026/19/6/1778339311-logo2.jpg"
          alt="Logo Auberge"
          style="
            width:110px;
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
          Nouveau message
        </h1>

        <p
          style="
            color:#d8cbbb;
            margin-top:12px;
            font-size:18px;
          "
        >
          Auberge de St Aubin
        </p>

      </div>

      <!-- CONTENU -->
      <div style="padding:35px;">

        <!-- INFOS -->
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
            Informations client
          </h2>

          <p style="font-size:16px;">
            <strong>Nom :</strong>
            ${name}
          </p>

          <p style="font-size:16px;">
            <strong>Email :</strong>
            ${email}
          </p>

        </div>

        <!-- MESSAGE -->
        <div
          style="
            background:#f5f1ea;
            border-radius:24px;
            padding:28px;
          "
        >

          <h2
            style="
              margin-top:0;
              color:#2f241d;
              font-size:32px;
            "
          >
            Message
          </h2>

          <p
            style="
              font-size:16px;
              line-height:1.8;
              color:#4b3d33;
              white-space:pre-line;
            "
          >
            ${message}
          </p>

        </div>

      </div>

      <!-- FOOTER -->
      <div
        style="
          background:#f5f1ea;
          padding:20px;
          text-align:center;
          font-size:13px;
          color:#7a6a5d;
        "
      >
        Message envoyé depuis le formulaire de contact
        du site de l'Auberge de St Aubin.
      </div>

    </div>

  </div>
  `,
    });

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