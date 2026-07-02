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

      console.log("UPLOAD", {
  name: file.name,
  type: file.type,
  size: file.size,
})

    const uploadDir =
      path.join(
        process.cwd(),
        "storage",
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

    const metadata =
  await sharp(buffer).metadata()

console.log(
  "SHARP METADATA",
  metadata
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
        `/api/uploads/${fileName}`,
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