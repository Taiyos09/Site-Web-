export const runtime = "nodejs"

import { NextResponse } from "next/server"
import PDFDocument from "pdfkit"
import { Buffer } from "buffer"
import path from "path"

export async function POST(req: Request) {

  try {

    const regularFont =
  path.join(
    process.cwd(),
    "public",
    "fonts",
    "Roboto-Regular.ttf"
  )

const boldFont =
  path.join(
    process.cwd(),
    "public",
    "fonts",
    "Roboto-Bold.ttf"
  )

    const reservation =
      await req.json()

    const doc =
      new PDFDocument({
        margin: 50,
        size: "A4",
      })

      doc.registerFont(
  "Regular",
  regularFont
)

doc.registerFont(
  "Bold",
  boldFont
)

doc.font("Regular")

    const buffers: Uint8Array[] = []

    doc.on(
      "data",
      buffers.push.bind(buffers)
    )

    const endPromise =
      new Promise<Buffer>((resolve) => {

        doc.on("end", () => {

          resolve(
            Buffer.concat(buffers)
          )
        })
      })

    const today =
      new Date()

    const invoiceNumber =
      `FA-${today.getFullYear()}-${reservation.id}`

    const formatDate = (
      date: string
    ) => {

      return new Date(date)
        .toLocaleDateString("fr-FR")
    }

    const nights =
      Math.ceil(
        (
          new Date(reservation.departure).getTime() -
          new Date(reservation.arrival).getTime()
        ) /
        (
          1000 *
          60 *
          60 *
          24
        )
      )

    /* ---------------- HEADER ---------------- */

    doc
      .rect(0, 0, 595, 120)
      .fill("#2f241d")

      const logoPath =
  path.join(
    process.cwd(),
    "public",
    "logo2.png"
  )

doc.image(
  logoPath,
  20,
  10,
  {
    width: 150,
  }
)

    doc
      .fillColor("white")
      .fontSize(28)
      .text(
        "Auberge de Saint Aubin",
        250,
        40
      )

    doc
      .fontSize(12)
      .text(
        "Bar • Restaurant • Hôtel",
        400,
        75
      )

    /* ---------------- FACTURE ---------------- */

    doc
      .fillColor("#000")
      .fontSize(26)
      .text(
        "FACTURE",
        400,
        140
      )

    doc
      .fontSize(11)
      .text(
        `Facture n° : ${invoiceNumber}`,
        350,
        180
      )

    doc.text(
      `Date : ${today.toLocaleDateString("fr-FR")}`,
      350,
      200
    )

    /* ---------------- ENTREPRISE ---------------- */

    doc
      .fontSize(12)
      .font("Regular")
      .text(
        "Émetteur",
        50,
        150
      )

    doc
      .font("Regular")
      .fontSize(10)
      .text(
        "Auberge de Saint Aubin",
        50,
        175
      )

    doc.text(
      "21 Rue Saint-Barnabé",
      50,
      190
    )

    doc.text(
      "03160 Saint Aubin le Monial",
      50,
      205
    )

    doc.text(
      "Téléphone : 04 70 66 50 97",
      50,
      220
    )

    doc.text(
      "Email : contact@auberge-saint-aubin.fr",
      50,
      235
    )

    doc.text(
      "SIRET : 000 000 000 00000",
      50,
      250
    )

    /* ---------------- CLIENT ---------------- */

    doc
      .font("Bold")
      .fontSize(12)
      .text(
        "Client",
        350,
        240
      )

    doc
      .font("Regular")
      .fontSize(10)
      .text(
        `${reservation.first_name} ${reservation.last_name}`,
        350,
        260
      )

    doc.text(
      reservation.email,
      350,
      275
    )

    doc.text(
      reservation.phone,
      350,
      290
    )

    /* ---------------- TABLEAU ---------------- */

    const tableTop = 340

    doc
      .rect(
        50,
        tableTop,
        495,
        30
      )
      .fill("#2f241d")

    doc
      .fillColor("white")
      .fontSize(10)
      .font("Bold")

    doc.text(
      "Description",
      60,
      tableTop + 10
    )

    doc.text(
  "Pers.",
  250,
  tableTop + 10
)

doc.text(
  "Nuits",
  300,
  tableTop + 10
)

doc.text(
  "HT",
  360,
  tableTop + 10
)

doc.text(
  "TVA",
  430,
  tableTop + 10
)

doc.text(
  "TTC",
  500,
  tableTop + 10
)

    let currentY =
      tableTop + 40

    doc
      .font("Regular")
      .fillColor("#000")

    /* ---------------- CHAMBRES ---------------- */

    reservation.rooms?.forEach(
      (room: any) => {

        const roomTTC =
          Number(room.room_total)

        const roomHT =
          Number(
            (roomTTC / 1.1)
            .toFixed(2)
          )

        const roomTVA =
          Number(
            (roomTTC - roomHT)
            .toFixed(2)
          )

        doc
          .rect(
            50,
            currentY - 5,
            495,
            28
          )
          .stroke("#e5e5e5")

        doc.text(
          room.room_name,
          60,
          currentY + 4
        )

        doc.text(
  `${reservation.people}`,
  260,
  currentY + 4
)

doc.text(
  `${nights}`,
  310,
  currentY + 4
)

doc.text(
  `${roomHT.toFixed(2)} €`,
  350,
  currentY + 4
)

doc.text(
  `${roomTVA.toFixed(2)} €`,
  425,
  currentY + 4
)

doc.text(
  `${roomTTC.toFixed(2)} €`,
  495,
  currentY + 4
)

        currentY += 28
      }
    )

    /* ---------------- OPTIONS ---------------- */

    const breakfastPrice = 4
    const lunchPrice = 15
    const dinnerPrice = 20
    const petPrice = 8
    const touristTaxPrice = 1.30

    const invoiceOptions: {
  label: string
  enabled: boolean
  price: number
  noVat?: boolean
}[] = [

  {
    label: "Petit déjeuner",
    enabled: reservation.breakfast,
    price:
      reservation.breakfast
        ? reservation.people *
          breakfastPrice *
          nights
        : 0,
  },

  {
    label: "Repas midi",
    enabled: reservation.lunch,
    price:
      reservation.lunch
        ? reservation.people *
          lunchPrice *
          nights
        : 0,
  },

  {
    label: "Repas soir",
    enabled: reservation.dinner,
    price:
      reservation.dinner
        ? reservation.people *
          dinnerPrice *
          nights
        : 0,
  },

  {
    label: "Animal",
    enabled: reservation.pets,
    price:
      reservation.pets
        ? petPrice * nights
        : 0,
  },

  {
    label: "Taxe de séjour",
    enabled: true,
    price:
      reservation.people *
      touristTaxPrice *
      nights,
    noVat: true,
  },
]

    invoiceOptions.forEach((option) => {

  if (option.enabled) {

    const optionTTC =
      Number(option.price)

    const optionHT =
      option.noVat
        ? optionTTC
        : Number(
            (optionTTC / 1.1)
            .toFixed(2)
          )

    const optionTVA =
      option.noVat
        ? 0
        : Number(
            (optionTTC - optionHT)
            .toFixed(2)
          )

    doc
      .rect(
        50,
        currentY - 5,
        495,
        28
      )
      .stroke("#e5e5e5")

    doc.text(
      option.label,
      60,
      currentY + 4
    )

    doc.text(
  `${reservation.people}`,
  260,
  currentY + 4
)

doc.text(
  `${nights}`,
  310,
  currentY + 4
)

doc.text(
  `${optionHT.toFixed(2)} €`,
  350,
  currentY + 4
)

doc.text(
  `${optionTVA.toFixed(2)} €`,
  425,
  currentY + 4
)

doc.text(
  `${optionTTC.toFixed(2)} €`,
  495,
  currentY + 4
)

    currentY += 28
  }
})

    /* ---------------- TOTAUX ---------------- */

    const totalTTC =
  Number(reservation.total)

const touristTaxTotal =
  reservation.people *
  touristTaxPrice *
  nights

const totalWithoutTouristTax =
  totalTTC - touristTaxTotal

const totalHT =
  Number(
    (
      (totalWithoutTouristTax / 1.1) +
      touristTaxTotal
    ).toFixed(2)
  )

const totalTVA =
  Number(
    (
      totalTTC - totalHT
    ).toFixed(2)
  )

    currentY += 35

    doc
      .moveTo(330, currentY)
      .lineTo(545, currentY)
      .stroke()

    currentY += 20

    doc
      .font("Regular")
      .fontSize(12)

    doc.text(
      "Total HT :",
      360,
      currentY
    )

    doc.text(
      `${totalHT.toFixed(2)} €`,
      470,
      currentY
    )

    currentY += 25

    doc.text(
      "TVA (10%) :",
      360,
      currentY
    )

    doc.text(
      `${totalTVA.toFixed(2)} €`,
      470,
      currentY
    )

    currentY += 35

    doc
      .font("Bold")
      .fontSize(18)
      .fillColor("#2f241d")

    doc.text(
      "TOTAL TTC :",
      330,
      currentY
    )

    doc.text(
      `${totalTTC.toFixed(2)} €`,
      460,
      currentY
    )

    /* ---------------- INFOS SÉJOUR ---------------- */

currentY += 70

doc
  .font("Bold")
  .fontSize(12)
  .fillColor("#000")

doc.text(
  "Informations séjour",
  50,
  currentY
)

currentY += 25

doc
  .font("Regular")
  .fontSize(10)

doc.text(
  `Séjour du ${formatDate(reservation.arrival)} au ${formatDate(reservation.departure)}`,
  50,
  currentY,
  {
    width: 250,
    lineBreak: false,
  }
)

currentY += 18

doc.text(
  `Nombre de personnes : ${reservation.people}`,
  50,
  currentY,
  {
    width: 250,
    lineBreak: false,
  }
)
    /* ---------------- FOOTER ---------------- */

    currentY += 5

    doc
      .fontSize(9)
      .fillColor("#777")

    doc.text(
      "",
      50,
      760,
      {
        align: "center",
        width: 500,
      }
    )

    doc.end()

    const pdfBuffer =
      await endPromise

    return new NextResponse(
      pdfBuffer,
      {

        headers: {

          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename=facture-${reservation.id}.pdf`,
        },
      }
    )

  } catch (error) {

    console.error(
      "PDF ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Erreur génération facture",
      },
      {
        status: 500,
      }
    )
  }
}