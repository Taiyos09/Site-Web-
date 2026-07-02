import fs from "fs"
import path from "path"

export function deleteImage(
  image?: string | null
) {

  if (
    !image ||
    !image.startsWith("/uploads/")
  ) {
    return
  }

  try {

    const filePath =
      path.join(
        process.cwd(),
        "public",
        image
      )

    if (
      fs.existsSync(
        filePath
      )
    ) {

      fs.unlinkSync(
        filePath
      )

      console.log(
        "IMAGE SUPPRIMEE :",
        image
      )
    }

  } catch (
    error
  ) {

    console.error(
      "ERREUR SUPPRESSION",
      image,
      error
    )
  }
}