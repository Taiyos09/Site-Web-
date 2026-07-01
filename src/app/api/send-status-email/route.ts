import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { prisma } from "@/lib/prisma"

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const hotelSettings =
  await prisma.hotel_settings.findMany()

const settings = {

  iban:
    hotelSettings.find(
      s => s.key === "hotel_iban"
    )?.value || "",

  bic:
    hotelSettings.find(
      s => s.key === "hotel_bic"
    )?.value || "",

  account_name:
    hotelSettings.find(
      s =>
        s.key ===
        "hotel_account_name"
    )?.value ||
    "SARL Auberge Saint Aubin",

  deposit_percent:
    Number(
      hotelSettings.find(
        s =>
          s.key ===
          "hotel_deposit_percent"
      )?.value || 20
    ),
}

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
    console.log(
  "depositRequired =",
  body.depositRequired
)

console.log(
  "depositAmount =",
  body.depositAmount
)
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
              padding:35px;
              text-align:center;
            ">

           <div style="
  width:190px;
  height:150px;
  margin:0 auto 1px;
  border-radius:12px;
  background-image:url('https://image.noelshack.com/fichiers/2026/23/6/1780702412-logo1.jpg');
  background-size:contain;
  background-repeat:no-repeat;
  background-position:center;
  position:relative;
">
  <div style="
    position:absolute;
    inset:0;
    background:transparent;
  "></div>
</div>



              <h1 style="
                color:white;
                margin:0;
                font-size:38px;
              ">
                L'Auberge de Saint Aubin
              </h1>

              <p style="
                color:white;
                margin-top:1px;
                font-size:20px;
              ">
                ${title}
              </p>

            </div>

            <div style="
              padding:20px;
              color:#2f241d;
            ">

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
  text-align:center;
">

  <h3 style="
    margin-top:0;
    font-size:24px;
  ">
    Détails du séjour
  </h3>

  <p>
    <strong>Chambre :</strong>
    ${body.reservation_rooms?.[0]?.room_name || "Non renseignée"}
  </p>

  <p>
    <strong>Arrivée :</strong>
    ${new Date(body.arrival).toLocaleDateString("fr-FR")}
  </p>

  <p>
    <strong>Départ :</strong>
    ${new Date(body.departure).toLocaleDateString("fr-FR")}
  </p>

  <p>
  <strong>👨 Adultes :</strong>
  ${body.adults}
</p>

${
  body.children > 0
    ? `<p>
  <strong>🧒 Enfants :</strong>
  ${body.children}
</p>
`
    : ""
}

${
  body.babies > 0
    ? `
      <p>
        <strong>👶 Bébés :</strong>
        ${body.babies}
      </p>
    `
    : ""
}

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
  <strong>${body.breakfast ? "Oui" : "Non"}
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

  ${
  body.babies > 0
  ? `
  <p>
    Lit parapluie :
    <strong>
      ${body.litParapluie ? "Oui" : "Non"}
    </strong>
  </p>
  `
    : ""
}

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
      ${body.total.toFixed(2)}€
    </h2>

  </div>

</div>

${
  body.depositRequired
    ? `

<div style="
  margin-top:30px;
  background:#fff7e6;
  border:2px solid #d6b17a;
  border-radius:20px;
  padding:25px;
">

  <h3 style="
    margin-top:0;
    color:#8a6330;
    font-size:24px;
  ">
    Demande d'acompte
  </h3>

  <p style="
    line-height:1.8;
  ">
  Afin de garantir votre réservation,
  nous vous remercions de bien vouloir
  effectuer un acompte de
  <strong>
    ${settings.deposit_percent}%, soit
    (${body.depositAmount.toFixed(2)}€) TTC
  </strong>.
</p>

  <p style="
    line-height:1.8;
  ">
    Merci d'effectuer votre règlement
    par virement bancaire :
  </p>

  <div style="
    background:white;
    border-radius:12px;
    padding:15px;
    border:1px solid #ddd;
  ">

    <p>
      <strong>IBAN :</strong>
      ${settings.iban}
    </p>

    <p>
      <strong>BIC :</strong>
      ${settings.bic}
    </p>

    <p>
      <strong>Titulaire :</strong>
      ${settings.account_name}
    </p>

  </div>

  <p style="
    margin-top:20px;
    font-size:14px;
    color:#666;
  ">
    Votre réservation sera définitivement
    garantie à réception de cet acompte.
  </p>

</div>

`
    : ""
}

<hr style="
  margin:40px 0;
  border:none;
  border-top:1px solid #ddd;
">

<p style="
  line-height:1.8;
  text-align:center;
">
  Nous restons à votre disposition pour toute question.
</p>

<p style="
  margin-top:25px;
  line-height:1.8;
  text-align:center;
">
  Cordialement,<br>

  <strong>

    L'équipe de l'Auberge de Saint Aubin
  </strong><br>

  📞 04 70 66 50 97
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
        error:
          "Erreur email",
      },
      {
        status: 500,
      }
    )
  }
}
