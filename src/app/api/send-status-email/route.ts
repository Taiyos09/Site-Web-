import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

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

    const isConfirmed =
      body.status === "confirmed"

    const title =
      isConfirmed
        ? "Réservation confirmée"
        : "Réservation refusée"

    const color =
      isConfirmed
        ? "#2e7d32"
        : "#c62828"

    const message =
      isConfirmed
        ? `
          Votre réservation a bien été confirmée.
          Nous avons le plaisir de vous accueillir
          prochainement à l'Auberge Saint Aubin.
        `
        : `
          Nous sommes désolés,
          votre réservation n'a pas pu être acceptée.
        `

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to:
        body.email,

      subject:
        title +
        " - Auberge Saint Aubin",

      html: `
        <div style="
          background:#f5f1ea;
          padding:40px;
          font-family:Arial,sans-serif;
        ">

          <div style="
            max-width:700px;
            margin:auto;
            background:white;
            border-radius:30px;
            overflow:hidden;
            box-shadow:0 15px 40px rgba(0,0,0,0.08);
          ">

            <div style="
              background:${color};
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
                color:white;
                margin-top:15px;
                font-size:20px;
              ">
                ${title}
              </p>

            </div>

            <div style="
              padding:40px;
              color:#2f241d;
            ">

              <h2>
                Bonjour
                ${body.first_name}
                ${body.last_name},
              </h2>

              <p style="
                line-height:1.8;
                font-size:17px;
              ">
                ${message}
              </p>

              
<div style="
  margin-top:30px;
  background:#faf7f2;
  border-radius:20px;
  padding:25px;
">

  <h3 style="
    margin-top:0;
    font-size:24px;
  ">
    Détails du séjour
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
    <strong>Personnes :</strong>
    ${body.people}
  </p>

  <hr style="
    margin:20px 0;
    border:none;
    border-top:1px solid #ddd;
  " />

  <h3 style="
    margin-top:0;
    font-size:22px;
  ">
    Options choisies
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

  <div style="
    margin-top:25px;
    background:#2f241d;
    color:white;
    border-radius:20px;
    padding:20px;
    text-align:center;
  ">

    <p style="
      margin:0;
      opacity:0.8;
    ">
      Total réservation
    </p>

    <h2 style="
      margin:10px 0 0;
      font-size:38px;
      color:#d6b17a;
    ">
      ${body.total}€
    </h2>

  </div>

</div>

<div style="
  margin-top:30px;
">

  <h2 style="
    font-size:28px;
    margin-bottom:20px;
  ">
    Informations
  </h2>

  <div style="
    background:#faf7f2;
    border-radius:20px;
    padding:20px;
    margin-bottom:15px;
  ">

    <h3 style="
      margin-top:0;
    ">
      📍 Adresse
    </h3>

    <p style="
      line-height:1.7;
      margin:0;
    ">
      L'Auberge de St Aubin<br />
      21 Rue Saint-Barnabé<br />
      03160 Saint Aubin le Monial
    </p>

  </div>

  <div style="
    background:#faf7f2;
    border-radius:20px;
    padding:20px;
    margin-bottom:15px;
  ">

    <h3 style="
      margin-top:0;
    ">
      📞 Téléphone
    </h3>

    <p style="margin:0;">
      04 70 66 50 97
    </p>

  </div>

  <div style="
    background:#faf7f2;
    border-radius:20px;
    padding:20px;
    margin-bottom:15px;
  ">

    <h3 style="
      margin-top:0;
    ">
      ✉️ Email
    </h3>

    <p style="margin:0;">
      contact@auberge-st-aubin.fr
    </p>

  </div>

  <div style="
    background:#faf7f2;
    border-radius:20px;
    padding:20px;
  ">

    <h3 style="
      margin-top:0;
    ">
      🕒 Horaires
    </h3>

    <p style="
      line-height:1.8;
      margin:0;
    ">
      Lundi au Vendredi :<br />
      08h30 – 22h00<br /><br />

      Vendredi & Samedi soir :<br />
      08h30 – 22h00
    </p>

  </div>

</div>


            </div>

            <div style="
              background:#faf7f2;
              padding:25px;
              text-align:center;
              font-size:14px;
              color:#7d6d60;
            ">

              Auberge Saint Aubin

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
        error:
          "Erreur email",
      },
      {
        status: 500,
      }
    )
  }
}
