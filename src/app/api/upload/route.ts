import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import sharp from "sharp"

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
          error: "Aucun fichier",
        },
        {
          status: 400,
        }
      )
    }

    const buffer =
      Buffer.from(
        await file.arrayBuffer()
      )

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

    // On force le format webp
    const fileName =
      `${Date.now()}.webp`

    const filePath =
      path.join(
        uploadDir,
        fileName
      )

    await sharp(buffer)

      .resize({
        width: 1920,
        height: 1080,
        fit: "inside",
        withoutEnlargement: true,
      })

      .webp({
        quality: 82,
      })

      .toFile(filePath)

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