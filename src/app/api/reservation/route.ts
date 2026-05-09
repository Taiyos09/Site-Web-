import nodemailer from "nodemailer"

export async function POST(req: Request) {

  const body = await req.json()

  const transporter =
    nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const formatDateFR = (date: string) => {
  return new Date(date).toLocaleDateString(
    "fr-FR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  )
}

  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: "ateyoGaming@gmail.com",

    subject:
      "Nouvelle réservation hôtel",

    html: `
<div style="
  background:#f5f1ea;
  padding:40px 20px;
  font-family:Arial,sans-serif;
  color:#2f241d;
">

  <div style="
    max-width:700px;
    margin:auto;
    background:white;
    border-radius:24px;
    overflow:hidden;
    box-shadow:0 10px 30px rgba(0,0,0,0.08);
  ">

    <!-- HEADER -->
    <div
  style="
    background:#2f241d;
    padding:40px 20px;
    text-align:center;
    border-radius:32px 32px 0 0;
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
      font-size:42px;
      font-weight:bold;
    "
  >
    Nouvelle réservation
  </h1>

  <p
    style="
      color:#d6c7b8;
      margin-top:12px;
      font-size:18px;
    "
  >
    Auberge de St Aubin
  </p>

</div>

    <div style="padding:35px;">

      <!-- CLIENT -->
      <div style="
        background:#faf7f2;
        border-radius:18px;
        padding:25px;
        margin-bottom:25px;
      ">

        <h2 style="
          margin-top:0;
          font-size:24px;
        ">
          Informations client
        </h2>

        <p><b>Nom :</b> ${body.firstName} ${body.lastName}</p>

        <p><b>Email :</b> ${body.email}</p>

        <p><b>Téléphone :</b> ${body.phone}</p>

      </div>

      <!-- SEJOUR -->
      <div style="
        background:#faf7f2;
        border-radius:18px;
        padding:25px;
        margin-bottom:25px;
      ">

        <h2 style="
          margin-top:0;
          font-size:24px;
        ">
          Séjour
        </h2>

        <p><b>Arrivée :</b> ${body.checkIn}</p>

        <p><b>Départ :</b> ${body.checkOut}</p>

        <p><b>Nuits :</b> ${body.nights}</p>

        <p><b>Personnes :</b> ${body.people}</p>

        <p><b>Chambres :</b> ${body.roomsNeeded}</p>

      </div>

      <!-- OPTIONS -->
      <div style="
        background:#faf7f2;
        border-radius:18px;
        padding:25px;
        margin-bottom:25px;
      ">

        <h2 style="
          margin-top:0;
          font-size:24px;
        ">
          Options
        </h2>

        <p>
          ☕ Petit déjeuner :
          <b>${body.breakfast ? "Oui" : "Non"}</b>
        </p>

        <p>
          🍽️ Repas midi :
          <b>${body.lunch ? "Oui" : "Non"}</b>
        </p>

        <p>
          🌙 Repas soir :
          <b>${body.dinner ? "Oui" : "Non"}</b>
        </p>

        <p>
          🐾 Animaux :
          <b>${body.petCount}</b>
        </p>

        <p>
          👶 Enfants bas âge :
          <b>${body.babyCount}</b>
        </p>

        <p>
          🛏️ Lit parapluie :
          <b>${body.babyBed ? "Oui" : "Non"}</b>
        </p>

        <p>
          🪑 Chaise haute :
          <b>${body.highChair ? "Oui" : "Non"}</b>
        </p>

      </div>

      <!-- TARIFS -->
      <div style="
        background:#faf7f2;
        border-radius:18px;
        padding:25px;
        margin-bottom:25px;
      ">

        <h2 style="
          margin-top:0;
          font-size:24px;
        ">
          Détail des tarifs
        </h2>

        <table width="100%" cellspacing="0" cellpadding="10">

          <tr>
            <td>Chambres</td>
            <td align="right">${body.roomTotal}€</td>
          </tr>

          <tr>
            <td>Petit déjeuner</td>
            <td align="right">${body.breakfastTotal}€</td>
          </tr>

          <tr>
            <td>Repas midi</td>
            <td align="right">${body.lunchTotal}€</td>
          </tr>

          <tr>
            <td>Repas soir</td>
            <td align="right">${body.dinnerTotal}€</td>
          </tr>

          <tr>
            <td>Supplément animal</td>
            <td align="right">${body.petTotal}€</td>
          </tr>

          <tr>
            <td>Taxe de séjour</td>
            <td align="right">${body.touristTaxTotal}€</td>
          </tr>

        </table>

      </div>

      <!-- TOTAL -->
      <div style="
        background:#2f241d;
        color:white;
        border-radius:20px;
        padding:30px;
        text-align:center;
        margin-bottom:25px;
      ">

        <p style="
          margin:0;
          font-size:18px;
          opacity:0.8;
        ">
          Total réservation
        </p>

        <h2 style="
          margin:10px 0 0 0;
          font-size:42px;
        ">
          ${body.totalPrice}€
        </h2>

      </div>

      <!-- MESSAGE -->
      <div style="
        background:#faf7f2;
        border-radius:18px;
        padding:25px;
      ">

        <h2 style="
          margin-top:0;
          font-size:24px;
        ">
          Message client
        </h2>

        <p style="
          white-space:pre-line;
          line-height:1.7;
        ">
          ${body.message || "Aucun message"}
        </p>

      </div>

    </div>

  </div>

</div>
`,
  })

  return Response.json({
    success: true,
  })
}