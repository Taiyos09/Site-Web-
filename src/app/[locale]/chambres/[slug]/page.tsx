import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import RoomGallery from "@/components/RoomGallery";
import { prisma } from "@/lib/prisma"
import {
  getTranslations,
  getLocale,
} from "next-intl/server";

import {
  Wifi,
  Tv,
  Bath,
  ParkingCircle,
  Croissant,
  Toilet,
  Briefcase,
  Ruler,
} from "lucide-react"
import Footer from "@/components/Footer"

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function RoomPage({
  params,
}: Props) {

  const {
  slug,
  locale
} = await params;

  const t = await getTranslations({
  locale,
  namespace: "room"
});

console.log("Param locale :", locale);
console.log("t(info) =", t("info"));
console.log("t(Wifi1) =", t("Wifi1"));

  
  const breakfast =
  Number(
    (
      await prisma.hotel_settings.findUnique({
        where: {
          key: "option_breakfast",
        },
      })
    )?.value ?? 12
  )

  const rooms = await prisma.rooms.findMany({
  include: {
    reservations: {
      include: {
        reservation: true
      }
    }
  },
  orderBy: {
    nameFr: "asc"
  }
});

const room =
  rooms.find(
    (room: any) =>
      room.slug === slug
  )

if (!room) {

  notFound()
}

const images =
  typeof room.images === "string"
    ? JSON.parse(room.images)
    : Array.isArray(room.images)
      ? room.images
      : [];

const cleanImages = images.map((img: string) =>
  img.trim().replace(/\\/g, "/")
);

  const roomName =
  locale === "en"
    ? room.nameEn ?? room.nameFr ?? ""
    : locale === "nl"
    ? room.nameNl ?? room.nameFr ?? ""
    : room.nameFr ?? "";

  const roomDescription =
  locale === "en"
    ? room.descriptionEn ?? room.descriptionFr ?? ""
    : locale === "nl"
    ? room.descriptionNl ?? room.descriptionFr ?? ""
    : room.descriptionFr ?? "";

  console.log("Locale:", locale);
console.log("Room EN:", room.nameEn);
console.log("Room Name:", roomName);
console.log({
  roomImages: room.images,
  parsedImages: images
});

  return (

    <main className="min-h-screen bg-[#f5f1ea] text-[#2f241d]">

      {/* NAVBAR */}
            
                  <Navbar />
            
      {/* HERO */}

      <section
  className="
    relative
    h-[500px]
    md:h-[80px]
    overflow-hidden
  "
>

        <Image
          src={cleanImages[0]}
          alt={roomName}
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">

  <h1 className="font-serif text-6xl font-bold">
    {roomName}
  </h1>

  <p className="mt-4 text-xl text-white/90">
    À partir de {room.priceOnePerson}€ / nuit
  </p>

</div>

      </section>

      {/* CONTENU */}

      <section className="mx-auto max-w-[1400px] px-6 py-10">

        <div className="grid gap-20 xl:grid-cols-[1.4fr_500px]">

          {/* GAUCHE */}

          <div>

            {/* GALERIE */}

            <RoomGallery
  title={roomName}
  images={cleanImages}
  roomName={roomName}
/>

            {/* DESCRIPTION */}

            <div className="mt-20">

              <h2 className="mb-8 font-serif text-5xl font-bold">
                {roomName}
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">

  <span className="rounded-full bg-[#c89b5f]/20 px-4 py-2">
    {room.capacity} {t("pers")}
  </span>

  <span className="rounded-full bg-[#2f241d]/10 px-4 py-2">
    {room.size}
  </span>

</div>

              <div className="space-y-6 text-lg leading-relaxed text-[#5a4c42]">

                <p>
                  {roomDescription}
                </p>

              </div>

            </div>

          </div>

          {/* DROITE */}

          <div>

            <div className="sticky top-32 overflow-hidden rounded-[36px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

              

              {/* INFOS */}

              <div className="space-y-5 p-6">

                <div>

                  <h3 className="mb-4 text-2xl font-bold">
                    {t("info")}
                  </h3>

                  <div className="space-y-4 text-[#5a4c42]">

                    <div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Ruler
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      {t("surface")}
    </span>

  </div>

  <span className="font-medium">
    {room.size}
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Wifi
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      {t("Wifi")}
    </span>

  </div>

  <span> {t("Wifi1")}
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Croissant
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      {t("PetitDej")}
    </span>

  </div>

  <span> {breakfast}€ {t("PetitDej1")}
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Bath
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      {t("SDB")}
    </span>

  </div>

  <span> {t("SDB1")}
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Toilet
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      {t("Toilette")}
    </span>

  </div>

  <span> {t("Toilette1")}
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Briefcase
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      {t("Range")}
    </span>

  </div>

  <span> {t("Range1")}
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <Tv
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      {t("Tele")}
    </span>

  </div>

  <span> {t("Tele1")}
  </span>

</div>

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-[#ece4da]
    pb-3
  "
>

  <div className="flex items-center gap-3">

    <ParkingCircle
      size={18}
      className="text-[#8a7768]"
    />

    <span>
      {t("parking")}
    </span>

  </div>

  <span> {t("parking1")}
  </span>

</div>

                  </div>

                </div>

                {/* CTA */}

                <Link
                  href={`/reservation/${room.slug}`}
                  className="
                    flex items-center justify-center
                    rounded-2xl
                    bg-[#c89b5f]
                    px-8 py-5
                    text-lg font-bold text-white
                    shadow-xl
                    transition-all duration-300
                    hover:scale-[1.02]
                    hover:bg-[#d6aa70]
                  "
                >
                  {t("boutoninfo")}
                </Link>

              </div>

            </div>

          </div>

          </div>

      </section>

      {/* AUTRES CHAMBRES */}

<section className="mx-auto mt-24 max-w-[1400px] px-6">

  <h2
    className="
      mb-10
      text-center
      font-serif
      text-5xl
      font-bold
    "
  >
    {t("Autre")}
  </h2>

  <div
    className="
      grid
      gap-8
      md:grid-cols-2
      xl:grid-cols-3
    "
  >

    {rooms
  .filter(
    (r: any) =>
      r.slug !== room.slug
  )
  .slice(0, 3)
  .map((otherRoom: any) => {

    const otherRoomName =
  locale === "en"
    ? otherRoom.nameEn ?? otherRoom.nameFr ?? ""
    : locale === "nl"
    ? otherRoom.nameNl ?? otherRoom.nameFr ?? ""
    : otherRoom.nameFr ?? "";

    const otherRoomImages =
  typeof otherRoom.images === "string"
    ? JSON.parse(otherRoom.images)
    : Array.isArray(otherRoom.images)
      ? otherRoom.images
      : [];

const firstImage =
  otherRoomImages.length > 0
    ? otherRoomImages[0].trim().replace(/\\/g, "/")
    : "/placeholder-room.jpg";

    return (
      <Link
        key={otherRoom.id}
        href={`/chambres/${otherRoom.slug}`}
        className="
          overflow-hidden
          rounded-[32px]
          bg-white
          shadow-xl
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-2xl
        "
      >
        <div className="relative h-64">
          <Image
  src={firstImage}
  alt={otherRoomName}
  fill
  className="object-cover"
/>
        </div>

        <div className="p-6">
          <h3
            className="
              mb-3
              font-serif
              text-3xl
              font-bold
            "
          >
            {otherRoomName}
          </h3>

          <p className="text-[#6b5b4f]">
            {t("partir")} {otherRoom.priceOnePerson}€ {t("nuit")}
          </p>
        </div>
      </Link>
    );
  })}

  </div>

</section>

      {/* FOOTER */}
            
            <Footer />
    </main>
  )
}