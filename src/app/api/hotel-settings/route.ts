import { prisma }
from "@/lib/prisma"

import {
  NextRequest,
  NextResponse,
} from "next/server"

/* ========================= */
/* GET */
/* ========================= */

export async function GET() {

  const settings =
    await prisma.hotel_settings.findMany()

  return NextResponse.json({

    iban:
  settings.find(
    (s) =>
      s.key ===
      "hotel_iban"
  )?.value || "",

bic:
  settings.find(
    (s) =>
      s.key ===
      "hotel_bic"
  )?.value || "",

account_name:
  settings.find(
    (s) =>
      s.key ===
      "hotel_account_name"
  )?.value ||
  "SARL Auberge Saint Aubin",

deposit_percent:
  Number(
    settings.find(
      (s) =>
        s.key ===
        "hotel_deposit_percent"
    )?.value || 20
  ),
  
  lunch: Number(
      settings.find(
        (s) =>
          s.key === "option_lunch"
      )?.value || 0
    ),

    breakfast: Number(
  settings.find(
    (s) =>
      s.key ===
      "option_breakfast"
  )?.value || 12
),

    dinner: Number(
      settings.find(
        (s) =>
          s.key === "option_dinner"
      )?.value || 0
    ),

    pet: Number(
      settings.find(
        (s) =>
          s.key === "option_pet"
      )?.value || 0
    ),

    tourist_tax: Number(
      settings.find(
        (s) =>
          s.key ===
          "option_tourist_tax"
      )?.value || 0
    ),

    lit_parapluie: Number(
  settings.find(
    (s) =>
      s.key ===
      "option_lit_parapluie"
  )?.value || 5
),

    extra_bed: Number(
      settings.find(
        (s) =>
          s.key ===
          "option_extra_bed"
      )?.value || 0
    ),
  })
}

/* ========================= */
/* PUT */
/* ========================= */

export async function PUT(
  request: NextRequest
) {

  const body =
    await request.json()

  
  await prisma.hotel_settings.update({

    where: {
      id: 10,
    },

    data: {
      value: String(body.breakfast),
    },
  })

    await prisma.hotel_settings.update({

    where: {
      id: 4,
    },

    data: {
      value: String(body.lunch),
    },
  })

  await prisma.hotel_settings.update({

    where: {
      id: 5,
    },

    data: {
      value: String(body.dinner),
    },
  })

  await prisma.hotel_settings.update({

    where: {
      id: 6,
    },

    data: {
      value: String(body.pet),
    },
  })

  await prisma.hotel_settings.update({

  where: {
    id: 9,
  },

  data: {
    value: String(
      body.lit_parapluie
    ),
  },
})

  await prisma.hotel_settings.update({

    where: {
      id: 7,
    },

    data: {
      value: String(
        body.tourist_tax
      ),
    },
  })

  await prisma.hotel_settings.update({

    where: {
      id: 8,
    },

    data: {
      value: String(
        body.extra_bed
      ),
    },
  })

  await prisma.hotel_settings.update({

  where: {
    id: 11,
  },

  data: {
    value: String(body.iban),
  },
})

await prisma.hotel_settings.update({

  where: {
    id: 12,
  },

  data: {
    value: String(body.bic),
  },
})

await prisma.hotel_settings.update({

  where: {
    id: 13,
  },

  data: {
    value: String(
      body.account_name
    ),
  },
})

await prisma.hotel_settings.update({

  where: {
    id: 14,
  },

  data: {
    value: String(
      body.deposit_percent
    ),
  },
})

  return NextResponse.json({
    success: true,
  })
}