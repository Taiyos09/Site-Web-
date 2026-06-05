import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(
  request: Request
) {

  try {

    const formData =
      await request.formData()

    const file =
      formData.get("file") as File

    if (!file) {

      return NextResponse.json(
        {
          error:
            "Aucun fichier",
        },
        {
          status: 400,
        }
      )
    }

    const bytes =
      await file.arrayBuffer()

    const buffer =
      Buffer.from(bytes)

    const fileName =
      `${Date.now()}-${file.name}`

    const uploadDir =
      path.join(
        process.cwd(),
        "public",
        "uploads"
      )

    if (
      !fs.existsSync(
        uploadDir
      )
    ) {

      fs.mkdirSync(
        uploadDir,
        {
          recursive: true,
        }
      )
    }

    const filePath =
      path.join(
        uploadDir,
        fileName
      )

    fs.writeFileSync(
      filePath,
      buffer
    )

    return NextResponse.json({

      success: true,

      url:
        `/uploads/${fileName}`,
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error:
          "Erreur upload",
      },
      {
        status: 500,
      }
    )
  }
}