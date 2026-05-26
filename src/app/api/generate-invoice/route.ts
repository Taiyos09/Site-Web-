export const runtime = "nodejs"

import { NextResponse } from "next/server"
import PDFDocument from "pdfkit"
import { Buffer } from "buffer"
import path from "path"
import fs from "fs"

import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {

  try {

    const reservation =
      await req.json()

      console.log("RESERVATION DATA:", JSON.stringify(reservation, null, 2))
console.log("ROOMS:", reservation.rooms)

    /* =========================
   SETTINGS MYSQL
========================= */

const settings =
  await prisma.hotel_settings.findFirst()

    /* =========================
       DATES
    ========================= */

    const nights =
      Math.ceil(
        (
          new Date(
            reservation.departure
          ).getTime()
          -
          new Date(
            reservation.arrival
          ).getTime()
        ) /
        (
          1000 *
          60 *
          60 *
          24
        )
      )

    /* =========================
       SETTINGS
    ========================= */

    const lunchPrice =
      Number(
        settings?.lunch || 15
      )

    const dinnerPrice =
      Number(
        settings?.dinner || 20
      )

    const petPrice =
      Number(
        settings?.pet || 5
      )

    const touristTaxPrice =
      Number(
        settings?.tourist_tax || 1.30
      )

    /* =========================
       PDF
    ========================= */

    const doc =
      new PDFDocument({
        margin: 40,
        size: "A4",
      })

    const buffers:
      Uint8Array[] = []

    doc.on(
      "data",
      buffers.push.bind(buffers)
    )

    const endPromise =
      new Promise<Buffer>(
        (resolve) => {

          doc.on(
            "end",
            () => {

              resolve(
                Buffer.concat(buffers)
              )
            }
          )
        }
      )

    /* =========================
       COLORS
    ========================= */

    const brown =
      "#2f241d"

    const lightGray =
      "#f5f5f5"

    const border =
      "#dddddd"

    
    /* =========================
       HEADER
    ========================= */

    doc
      .rect(
        0,
        0,
        595,
        120
      )
      .fill(brown)

    doc
      .fillColor("white")
      .fontSize(28)
      .font("Helvetica-Bold")

    doc.text(
      "Auberge de Saint Aubin",
      230,
      40
    )

    doc
      .fontSize(12)
      .font("Helvetica")

    doc.text(
      "Bar • Restaurant • Chambre d'hôte",
      350,
      75
    )

    /* =========================
       LOGO
    ========================= */

    const logoPath =
      path.join(
        process.cwd(),
        "public",
        "logo2.png"
      )

      console.log(logoPath)
      console.log(
     fs.existsSync(logoPath)
    )

    if (
      fs.existsSync(logoPath)
    ) {

      try {

        doc.image(
          logoPath,
          10,
          5,
          {
            width: 180,
          }
        )

      } catch (e) {

        console.log(
          "Logo error"
        )
      }
    }

    /* =========================
       FACTURE
    ========================= */

    doc
      .fillColor("#000")
      .fontSize(28)
      .font("Helvetica-Bold")

    doc.text(
      "FACTURE",
      380,
      145
    )

    const today =
      new Date()

    const invoiceNumber =
      `FA-${today.getFullYear()}-${reservation.id}`

    doc
      .font("Helvetica")
      .fontSize(11)

    doc.text(
      `Facture n° : ${invoiceNumber}`,
      350,
      185
    )

    doc.text(
      `Date : ${today.toLocaleDateString("fr-FR")}`,
      350,
      203
    )

    /* =========================
       COMPANY
    ========================= */

    doc
      .rect(
        40,
        240,
        230,
        115
      )
      .fill(lightGray)

    doc
      .fillColor("#000")
      .fontSize(15)
      .font("Helvetica-Bold")

    doc.text(
      "Émetteur",
      55,
      255
    )

    doc
      .fontSize(10)
      .font("Helvetica")

    doc.text(
      "Auberge de Saint Aubin",
      55,
      285
    )

    doc.text(
      "21 Rue Saint-Barnabé",
      55,
      302
    )

    doc.text(
      "03160 Saint Aubin le Monial",
      55,
      319
    )

    doc.text(
      "Téléphone : 04 70 66 50 97",
      55,
      336
    )

    /* =========================
       CLIENT
    ========================= */

    doc
      .rect(
        325,
        240,
        230,
        115
      )
      .fill(lightGray)

    doc
      .fillColor("#000")
      .fontSize(15)
      .font("Helvetica-Bold")

    doc.text(
      "Client",
      340,
      255
    )

    doc
      .fontSize(10)
      .font("Helvetica")

    doc.text(
      `${reservation.first_name || ""} ${reservation.last_name || ""}`,
      340,
      285
    )

    doc.text(
      reservation.email || "-",
      340,
      302
    )

    doc.text(
      reservation.phone || "-",
      340,
      319
    )

    /* =========================
       TABLE
    ========================= */

    const tableTop = 390

    const columns = {
  description: 55,
  persons: 255,
  nights: 300,
  unit: 335,
  ht: 400,
  tva: 460,
  ttc: 500,
}

    /* HEADER */

    doc
      .rect(
        40,
        tableTop,
        520,
        32
      )
      .fill(brown)

    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(10)

    doc.text(
      "Description",
      columns.description,
      tableTop + 10
    )

    doc.text(
      "Pers.",
      columns.persons,
      tableTop + 10,
      {
        width: 35,
        align: "center",
      }
    )

    doc.text(
      "Nuits",
      columns.nights,
      tableTop + 10,
      {
        width: 40,
        align: "center",
      }
    )

    doc.text(
      "PU TTC",
      columns.unit,
      tableTop + 10,
      {
        width: 55,
        align: "right",
      }
    )

    doc.text(
      "HT",
      columns.ht,
      tableTop + 10,
      {
        width: 40,
        align: "right",
      }
    )

    doc.text(
      "TVA",
      columns.tva,
      tableTop + 10,
      {
        width: 35,
        align: "right",
      }
    )

    doc.text(
      "TTC",
      columns.ttc,
      tableTop + 10,
      {
        width: 45,
        align: "right",
      }
    )

    let currentY =
      tableTop + 32

    /* =========================
       TOTALS
    ========================= */

    let totalHT = 0
    let totalTVA = 0
    let totalTTC = 0

    /* =========================
       CHAMBRES
    ========================= */

    ;(
      reservation.rooms || []
    ).forEach(
      (room: any) => {

                // Récupérer le prix depuis les settings ou calculer
        const roomPricePerNight = 85 // Prix par défaut à ajuster selon vos settings
        
        const roomTTC = roomPricePerNight * nights
        
        const roomHT = Number((roomTTC / 1.1).toFixed(2))
        
        const roomTVA = Number((roomTTC - roomHT).toFixed(2))
        
        const unitPrice = roomPricePerNight / reservation.people

        totalHT += roomHT
        totalTVA += roomTVA
        totalTTC += roomTTC

        doc
          .rect(
            40,
            currentY,
            520,
            38
          )
          .stroke(border)

        doc
          .fillColor("#000")
          .font("Helvetica")
          .fontSize(10)

        doc.text(
          room.room_name,
          columns.description,
          currentY + 12,
          {
            width: 190,
          }
        )

        doc.text(
          `${reservation.people}`,
          columns.persons,
          currentY + 12,
          {
            width: 35,
            align: "center",
          }
        )

        doc.text(
          `${nights}`,
          columns.nights,
          currentY + 12,
          {
            width: 40,
            align: "center",
          }
        )

        doc.text(
          `${unitPrice.toFixed(2)} €`,
          columns.unit,
          currentY + 12,
          {
            width: 55,
            align: "right",
          }
        )

        doc.text(
          `${roomHT.toFixed(2)} €`,
          columns.ht,
          currentY + 12,
          {
            width: 50,
            align: "right",
          }
        )

        doc.text(
          `${roomTVA.toFixed(2)} €`,
          columns.tva,
          currentY + 12,
          {
            width: 35,
            align: "right",
          }
        )

        doc.text(
          `${roomTTC.toFixed(2)} €`,
          columns.ttc,
          currentY + 12,
          {
            width: 45,
            align: "right",
          }
        )

        currentY += 38
      }
    )

    /* =========================
       OPTIONS
    ========================= */

    const invoiceOptions = [

      {
        label:
          "Petit déjeuner compris",

        enabled: true,

        included: true,
      },

      {
        label:
          "Repas midi",

        enabled:
          reservation.lunch,

        unitPrice:
          lunchPrice,

        total:
          lunchPrice *
          reservation.people *
          nights,
      },

      {
        label:
          "Repas soir",

        enabled:
          reservation.dinner,

        unitPrice:
          dinnerPrice,

        total:
          dinnerPrice *
          reservation.people *
          nights,
      },

      {
        label:
          "Animal",

        enabled:
          reservation.pets,

        unitPrice:
          petPrice,

        total:
          petPrice *
          nights,
      },

      {
        label:
          "Taxe de séjour",

        enabled: true,

        unitPrice:
          touristTaxPrice,

        total:
          touristTaxPrice *
          reservation.people *
          nights,

        noTVA: true,
      },
    ]

    invoiceOptions.forEach(
      (option: any) => {

        if (
          !option.enabled
        ) {
          return
        }

        const optionTTC =
          Number(
            option.total || 0
          )

        const optionHT =
          option.noTVA
            ? optionTTC
            : Number(
                (
                  optionTTC / 1.1
                ).toFixed(2)
              )

        const optionTVA =
          option.noTVA
            ? 0
            : Number(
                (
                  optionTTC -
                  optionHT
                ).toFixed(2)
              )

        totalHT += optionHT
        totalTVA += optionTVA
        totalTTC += optionTTC

        doc
          .rect(
            40,
            currentY,
            520,
            38
          )
          .stroke(border)

        doc.text(
          option.label,
          columns.description,
          currentY + 12,
          {
            width: 190,
          }
        )

        doc.text(
          `${reservation.people}`,
          columns.persons,
          currentY + 12,
          {
            width: 35,
            align: "center",
          }
        )

        doc.text(
          `${nights}`,
          columns.nights,
          currentY + 12,
          {
            width: 40,
            align: "center",
          }
        )

        if (
          option.included
        ) {

          doc.text(
            "-",
            columns.unit,
            currentY + 12,
            {
              width: 55,
              align: "right",
            }
          )

          doc.text(
            "Inclus",
            columns.ttc,
            currentY + 12,
            {
              width: 45,
              align: "right",
            }
          )

        } else {

          doc.text(
            `${option.unitPrice.toFixed(2)} €`,
            columns.unit,
            currentY + 12,
            {
              width: 55,
              align: "right",
            }
          )

          doc.text(
            `${optionHT.toFixed(2)} €`,
            columns.ht,
            currentY + 12,
            {
              width: 50,
              align: "right",
            }
          )

          doc.text(
            `${optionTVA.toFixed(2)} €`,
            columns.tva,
            currentY + 12,
            {
              width: 35,
              align: "right",
            }
          )

          doc.text(
            `${optionTTC.toFixed(2)} €`,
            columns.ttc,
            currentY + 12,
            {
              width: 45,
              align: "right",
            }
          )
        }

        currentY += 38
      }
    )

    /* =========================
       TOTALS
    ========================= */

    currentY += 30

    doc
      .moveTo(
        330,
        currentY
      )
      .lineTo(
        545,
        currentY
      )
      .stroke()

    currentY += 20

    doc
      .font("Helvetica")
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

    currentY += 20

    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor(brown)

    doc.text(
      "TOTAL TTC :",
      340,
      currentY
    )

    doc.text(
      `${totalTTC.toFixed(2)} €`,
      450,
      currentY
    )

    /* =========================
       FOOTER
    ========================= */

    doc
      .font("Helvetica")
      .fontSize(7)
      .fillColor("#666")

    doc.text(
      "SARL Auberge de Saint Aubin - Capital social : 5 000 € - SIRET : XXXXXXXX - TVA Intracom : FRXXXXXXXX",
      10,
      782,
      {
        width: 520,
        align: "center",
      }
    )

    doc.text(
      "En cas de retard de paiement, des pénalités au taux légal seront appliquées ainsi qu’une indemnité forfaitaire de 40 € pour frais de recouvrement.",
      10,
      790,
      {
        width: 520,
        align: "center",
      }
    )

    /* =========================
       END
    ========================= */

    doc.end()

    const pdfBuffer =
      await endPromise

    return new NextResponse(
      new Uint8Array(
        pdfBuffer
      ),
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