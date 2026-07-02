import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      path: string[]
    }>
  }
) {

  const resolved =
    await params

  const filePath =
    path.join(
      process.cwd(),
      "storage",
      "uploads",
      ...resolved.path
    )

  if (
    !fs.existsSync(
      filePath
    )
  ) {
    return new NextResponse(
      "Not found",
      {
        status: 404,
      }
    )
  }

  const buffer =
    fs.readFileSync(
      filePath
    )

  const ext =
    path.extname(
      filePath
    )

  const types: Record<
    string,
    string
  > = {
    ".webp":
      "image/webp",
    ".jpg":
      "image/jpeg",
    ".jpeg":
      "image/jpeg",
    ".png":
      "image/png",
  }

  return new NextResponse(
    buffer,
    {
      headers: {
        "Content-Type":
          types[ext] ??
          "application/octet-stream",

        "Cache-Control":
          "public, max-age=31536000",
      },
    }
  )
}