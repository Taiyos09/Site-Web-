import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Image from "next/image"
import { tourismCategories } from "@/lib/tourism-categories"

export default async function NotreRegionPage() {

  const response =
    await fetch(
      "http://localhost:3000/api/tourism",
      {
        cache: "no-store",
      }
    )

  const places =
  (await response.json())
    .sort(
      (a: any, b: any) =>
        Number(b.featured) -
        Number(a.featured)
    )

  const featuredPlaces =
  places.filter(
    (place: any) =>
      place.featured
  )

const regularPlaces =
  places.filter(
    (place: any) =>
      !place.featured
  )

  const categoryColors = {

  loisirs:
    "bg-blue-100 text-blue-700",

  nature:
    "bg-green-100 text-green-700",

  patrimoine:
    "bg-amber-100 text-amber-700",

  bien_etre:
    "bg-pink-100 text-pink-700",

  gastronomie:
    "bg-orange-100 text-orange-700",

  attraction:
    "bg-purple-100 text-purple-700",
}

const renderCard = (place: any) => (

  <div
    key={place.id}
    className="
      relative
      overflow-hidden
      rounded-[32px]
      bg-white
      shadow-xl
      text-center
    "
  >

    {place.featured && (

      <div
        className="
          absolute
          top-4
          right-4
          z-20
          rounded-full
          bg-yellow-500
          px-3
          py-1
          text-xs
          font-bold
          text-white
          shadow-lg
        "
      >
        ⭐ Coup de cœur
      </div>

    )}

    {place.image && (
  <div className="relative h-64 overflow-hidden">
    <Image
      src={place.image}
      alt={place.name}
      fill
      className="object-cover"
    />
  </div>
)}

    <div className="p-6">

      <span
        className={`
          inline-block
          rounded-full
          px-3
          py-1
          text-sm
          font-medium
          ${
            categoryColors[
              place.category as keyof typeof categoryColors
            ] ||
            "bg-gray-100 text-gray-700"
          }
        `}
      >
        {
          tourismCategories.find(
            (c) =>
              c.value === place.category
          )?.label
        }
      </span>

      {place.travel_time && (

        <p
          className="
            mt-1
            text-sm
            font-medium
            text-[#c89b5f]
          "
        >
          🚗 {place.travel_time} depuis l'auberge
        </p>

      )}

      {place.address && (

        <p
          className="
            mt-2
            text-sm
            text-[#7a6a5f]
          "
        >
          📍 {place.address}
        </p>

      )}

      <h2
        className="
          mt-4
          font-serif
          text-3xl
          font-bold
          text-[#2f241d]
        "
      >
        {place.name}
      </h2>

      <p
        className="
          mt-4
          text-[#5a4c42]
        "
      >
        {place.description}
      </p>

      <div
        className="
          mt-6
          flex
          flex-wrap
          justify-center
          gap-3
        "
      >

        {place.website && (

          <a
            href={place.website}
            target="_blank"
            rel="noreferrer"
            className="
              rounded-xl
              bg-[#2f241d]
              px-4
              py-2
              text-white
            "
          >
            Site web
          </a>

        )}

        {place.maps_url && (

          <a
            href={place.maps_url}
            target="_blank"
            rel="noreferrer"
            className="
              rounded-xl
              bg-[#c89b5f]
              px-4
              py-2
              text-white
            "
          >
            Voir sur Google Maps
          </a>

        )}

      </div>

    </div>

  </div>

)


  return (

    <main className="min-h-screen bg-[#f5f1ea]">

      <Navbar />

      <section className="pt-32 pb-16">

        <div className="mx-auto max-w-7xl px-6">

          <h1
            className="
              mb-12
              text-center
              font-serif
              text-6xl
              font-bold
              text-[#2f241d]
            "
          >
            Découvrir notre région
          </h1>

          <p
  className="
    mx-auto
    mb-16
    max-w-3xl
    text-center
    text-lg
    text-[#6b5b4f]
  "
>
  Découvrez les incontournables du Bourbonnais :
  nature, patrimoine, loisirs, gastronomie et
  activités à proximité de l'Auberge de Saint-Aubin.
</p>

<p
  className="
    mb-12
    text-center
    text-lg
    font-medium
    text-[#8a7a6f]
  "
>
  {places.length} activités à découvrir
  autour de l'Auberge de Saint-Aubin
</p>

  {featuredPlaces.length > 0 && (

  <section className="mb-20">

    <h2
      className="
        mb-8
        text-3xl
        font-serif
        font-bold
        text-[#2f241d]
      "
    >
      ⭐ Incontournables de la région
    </h2>

    <div
      className="
        grid
        gap-8
        md:grid-cols-2
        xl:grid-cols-3
      "
    >

      {featuredPlaces.map(
        (place: any) =>
          renderCard(place)
      )}

    </div>

  </section>

)}

<h2
  className="
    mb-8
    text-4xl
    font-serif
    font-bold
    text-[#2f241d]
  "
>
  Toutes les activités
</h2>

<div
  className="
    grid
    gap-8
    md:grid-cols-2
    xl:grid-cols-3
  "
>

  {regularPlaces.map(
    (place: any) =>
      renderCard(place)

    
  )}

</div>

        </div>

      </section>

      <Footer />

    </main>
  )
}