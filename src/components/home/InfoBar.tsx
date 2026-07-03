"use client"

import {
  Beer,
  UtensilsCrossed,
  BedDouble,
  CalendarDays,
} from "lucide-react"

export default function InfoBar() {
  return (
    <section className="relative z-20">
      <div
        className="
          mx-auto
          -mt-16 sm:-mt-20 md:-mt-28
          max-w-6xl
          rounded-[28px]
          bg-white
          px-8
          py-8
          shadow-xl
        "
      >
        <div
          className="
            grid
            gap-8
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4
          "
        >
          <div className="flex items-start gap-3">
  <Beer
    size={24}
    className="mt-1 text-[#c89b5f]"
  />

  <div>
    <h3 className="font-semibold text-[#2f241d]">
      Bar
    </h3>

    <p className="mt-1 text-sm text-[#5a4c42]">
      Bar convivial et ambiance chaleureuse
    </p>
  </div>
</div>

          <div className="flex items-start gap-3">
  <UtensilsCrossed
    size={24}
    className="mt-1 text-[#c89b5f]"
  />

  <div>
    <h3 className="font-semibold text-[#2f241d]">
      Restaurant
    </h3>

    <p className="mt-1 text-sm text-[#5a4c42]">
      Cuisine traditionnelle et produits locaux
    </p>
  </div>
</div>

          <div className="flex items-start gap-3">
  <BedDouble
    size={24}
    className="mt-1 text-[#c89b5f]"
  />

  <div>
    <h3 className="font-semibold text-[#2f241d]">
      Hôtel
    </h3>

    <p className="mt-1 text-sm text-[#5a4c42]">
      Chambres confortables pour vos séjours
    </p>
  </div>
</div>

          <div className="flex items-start gap-3">
  <CalendarDays
    size={24}
    className="mt-1 text-[#c89b5f]"
  />

  <div>
    <h3 className="font-semibold text-[#2f241d]">
      Événements
    </h3>

    <p className="mt-1 text-sm text-[#5a4c42]">
      Karaokés, repas à thème et animations
    </p>
  </div>
</div>
        </div>
      </div>
    </section>
  )
}
