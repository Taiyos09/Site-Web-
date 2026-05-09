"use client"

import { useEffect, useMemo, useState } from "react"
import { HOTEL_CONFIG } from "@/data/hotel"

export default function HotelPage() {
  const [hotelConfig, setHotelConfig] = useState(HOTEL_CONFIG)
  const [selectedRoom, setSelectedRoom] = useState("")

  const [currentImages, setCurrentImages] = useState<number[]>([])

  const [breakfast, setBreakfast] = useState(false)
  const [lunch, setLunch] = useState(false)
  const [dinner, setDinner] = useState(false)
  const [extraBed, setExtraBed] = useState(false)
  const [pet, setPet] = useState(false)
  const [baby, setBaby] = useState(false)
  const [babyBed, setBabyBed] = useState(false)
  const [highChair, setHighChair] = useState(false)

  const [roomConfiguration, setRoomConfiguration] = useState("single")

  const [people, setPeople] = useState(0)

  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1

    const start = new Date(checkIn)
    const end = new Date(checkOut)

    const diff = end.getTime() - start.getTime()

    const total = Math.ceil(diff / (1000 * 60 * 60 * 24))

    return total > 0 ? total : 1
  }, [checkIn, checkOut])

  useEffect(() => {
  const readHotelConfig = () => {
    const savedHotel = localStorage.getItem("hotelData")

    if (!savedHotel) {
      // initialise le slideshow avec HOTEL_CONFIG
      setCurrentImages(
        (HOTEL_CONFIG.rooms || []).map(() => 0)
      )

      return
    }

    const parsedHotel = JSON.parse(savedHotel)

    setHotelConfig(parsedHotel)

    // Sécurisation rooms
    const rooms = parsedHotel?.rooms || []

    setCurrentImages(
      rooms.map(() => 0)
    )
  }

  readHotelConfig()

  window.addEventListener(
    "pricesUpdated",
    readHotelConfig
  )

  // DIAPORAMA AUTO
  const interval = setInterval(() => {
    setCurrentImages((prev) => {
      return prev.map((value, index) => {
        const totalImages =
          hotelConfig?.rooms?.[index]?.images?.length || 1

        return (value + 1) % totalImages
      })
    })
  }, 3500)

  return () => {
    window.removeEventListener(
      "pricesUpdated",
      readHotelConfig
    )

    clearInterval(interval)
  }
}, [])


  let baseRoomPrice = hotelConfig.roomPrices.onePerson

  if (people >= 1) {
    baseRoomPrice = hotelConfig.roomPrices.onePerson
  }

  if (people >= 2) {
    baseRoomPrice = hotelConfig.roomPrices.twoPeople
  }

  if (people >= 3 && roomConfiguration === "double") {
    baseRoomPrice = hotelConfig.roomPrices.doubleRoom
  }

  const roomTotal = baseRoomPrice * nights

  const breakfastTotal = breakfast ? hotelConfig.options.breakfast * people * nights : 0

  const lunchTotal = lunch ? hotelConfig.options.lunch * people * nights : 0

  const dinnerTotal = dinner ? hotelConfig.options.dinner * people * nights : 0

  const hasExtraBed = extraBed || (people >= 3 && roomConfiguration === "single")

  const extraBedTotal = hasExtraBed ? hotelConfig.options.extraBed * nights : 0

  const petTotal = pet ? hotelConfig.options.pet * nights : 0

  const touristTaxTotal = hotelConfig.options.touristTax * people * nights

  const totalPrice = roomTotal + breakfastTotal + lunchTotal + dinnerTotal + extraBedTotal + petTotal + touristTaxTotal

  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-[#f5f1ea] text-[#2f241d]">
      {/* HERO */}
      <section
        className="relative  snap-start min-h-screen flex h-[60vh] items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hotel/HERO.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 px-6 text-center text-white">
          <h1 className="mb-4 text-5xl font-bold md:text-7xl">
            Hôtel
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/90 md:text-xl">
            Découvrez nos chambres chaleureuses et profitez d'un séjour confortable à L'auberge de St Aubin.
          </p>
        </div>
      </section>

     {/* PRESENTATION */}
<section
  id="presentation"
  className="relative snap-start min-h-screen bg-cover bg-center"
  style={{
    backgroundImage: "url('/images/hotel/fd1.png')",
  }}
>
  {/* voile sombre léger */}
  <div className="absolute inset-0 bg-black/40"></div>

  <div className="relative z-10 mx-auto flex min-h-screen max-w-[1800px] items-center px-10">
    <div className="grid items-center gap-16 md:grid-cols-2">
      
      {/* TEXTE */}
      <div className="rounded-3xl bg-white/55 p-8 backdrop-blur-sm">
        <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl text-[rgba(46, 21, 14, 0.9)]">
          Un séjour au calme au cœur de la campagne bourbonnaise
        </h2>

        <p className="mb-5 text-base leading-relaxed md:text-lg text-[rgba(46, 21, 14, 0.9)]">
          Nos chambres vous accueillent dans une ambiance simple,
          chaleureuse et authentique, idéale pour se reposer loin
          de l’agitation.
        </p>

        <p className="mb-5 text-base leading-relaxed md:text-lg text-[rgba(46, 21, 14, 0.9)]">
          Que vous soyez de passage dans l’Allier, en déplacement
          ou en séjour dans la région, l’auberge vous propose
          différentes formules avec possibilité de petit déjeuner
          et de restauration sur place selon vos envies.
        </p>

        <p className="text-base leading-relaxed md:text-lg text-[rgba(46, 21, 14, 0.9)]">
          Lors de votre réservation, vous pourrez ajouter
          différentes options comme le petit déjeuner ou les
          repas du midi et du soir.
        </p>
      </div>

      {/* IMAGE */}
      <div className="flex justify-center">
        <img
          src="/images/gab.png"
          alt="Chambre"
          className="max-h-[950px] w-full max-w-[750px] rounded-3xl object-cover shadow-2xl"
        />
      </div>
    </div>
  </div>
</section>

{/* CHAMBRES */}
<section
  className="bg-cover snap-start min-h-screen bg-center py-24"
  style={{
    backgroundImage: "url('/images/hotel/bois.jpg')",
  }}
>
  <div className="mx-auto max-w-[1800px] px-10">
    <div className="mb-14 text-center">
      <h2 className="mb-4 text-4xl font-bold">
        Nos chambres
      </h2>

      <p className="text-lg text-[rgba(46, 21, 14, 0.9)]">
        Trois chambres avec différentes surfaces.
      </p>
    </div>

    <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-14 md:grid-cols-2 2xl:grid-cols-3">
      {(hotelConfig?.rooms ?? []).map((room, roomIndex) => (
        <div
          key={room.id}
          className="mx-auto w-full max-w-[650px] overflow-hidden rounded-3xl bg-[#f3ede3]/95 shadow-2xl backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
        >
          {/* DIAPORAMA */}
          <div className="relative h-[420px] overflow-hidden">
            {(room.images ?? []).map((img, imgIndex) => (
              <img
                key={imgIndex}
                src={img}
                alt={room.name}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                  imgIndex === (currentImages[roomIndex] ?? 0)
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            ))}

            {/* BADGE SURFACE */}
            <div className="absolute right-4 top-4 rounded-full bg-[#f3ede3]/90 px-4 py-2 text-sm font-bold text-[#8a6330] backdrop-blur">
              {room.size}
            </div>
          </div>

          {/* CONTENU */}
          <div className="p-6">
            <h3 className="mb-4 text-2xl font-bold font-serif text-[#2f241d]">
              {room.name}
            </h3>

            <p className="mb-4 text-[#5a4c42] font-sans leading-relaxed">
              {room.description}
            </p>

            <div className="flex items-center justify-between border-t border-[#d8cbbb] pt-4">
              <span className="text-3xl font-bold text-[#2f241d]">
                {hotelConfig.roomPrices.onePerson}€
              </span>

              <span className="text-sm text-[#7a6a5d]">
                par nuit
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
      </section>

      {/* RESERVATION */}
      <section
        className="relative  snap-start min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/campagne.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Réserver votre séjour
            </h2>

            <p className="text-lg text-white">
              Sélectionnez vos dates et personnalisez votre réservation.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            {/* FORMULAIRE */}
            <form className="space-y-6 rounded-[32px] bg-[#faf7f2] p-10 shadow-xl">
              <div>
                <h3 className="mb-6 text-2xl font-semibold">
                  Informations séjour
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-medium">
                      Arrivée
                    </label>

                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium">
                      Départ
                    </label>

                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4"
                    />
                  </div>
                </div>
              </div>

              {/* CHAMBRE + PERSONNES */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium">
                    Chambre
                  </label>

                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4"
                  >
                    <option value="">
                      Sélectionner une chambre
                    </option>
                    <option>Chambre 1</option>
                    <option>Chambre 2</option>
                    <option>Chambre 3</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Nombre de personnes
                  </label>

                  <select
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                    className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4"
                  >
                    <option value={0}>
                      Nombre de personnes
                    </option>
                    <option value={1}>
                      1 personne
                    </option>

                    <option value={2}>
                      2 personnes
                    </option>

                    <option value={3}>
                      3 personnes
                    </option>

                    <option value={4}>
                      4 personnes
                    </option>
                  </select>
                </div>

                {/* CONFIGURATION */}
                {people >= 3 && (
                  <div className="md:col-span-2">
                    <label className="mb-2 block font-medium">
                      Configuration des chambres
                    </label>

                    <select
                      value={roomConfiguration}
                      onChange={(e) => setRoomConfiguration(e.target.value)}
                      className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4"
                    >
                      <option value="single">
                        1 chambre avec lit supplémentaire
                      </option>

                      <option value="double">
                        2 chambres de 2 personnes
                      </option>
                    </select>
                  </div>
                )}
              </div>

              {/* OPTIONS */}
              <div>
                <h3 className="mb-5 text-2xl font-semibold">
                  Options repas
                </h3>

                <div className="grid gap-4 md:grid-cols-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
                    <input
                      type="checkbox"
                      checked={breakfast}
                      onChange={(e) => setBreakfast(e.target.checked)}
                      className="h-5 w-5"
                    />

                    <div>
                      <p className="font-semibold">
                        Petit déjeuner
                      </p>

                      <p className="text-sm text-[#6b5b4f]">
                        +{hotelConfig.options.breakfast}€
                      </p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
                    <input
                      type="checkbox"
                      checked={lunch}
                      onChange={(e) => setLunch(e.target.checked)}
                      className="h-5 w-5"
                    />

                    <div>
                      <p className="font-semibold">
                        Repas midi
                      </p>

                      <p className="text-sm text-[#6b5b4f]">
                        +{hotelConfig.options.lunch}€
                      </p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
                    <input
                      type="checkbox"
                      checked={dinner}
                      onChange={(e) => setDinner(e.target.checked)}
                      className="h-5 w-5"
                    />

                    <div>
                      <p className="font-semibold">
                        Repas soir
                      </p>

                      <p className="text-sm text-[#6b5b4f]">
                        +{hotelConfig.options.dinner}€
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* OPTIONS SUPP */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
                  <input
                    type="checkbox"
                    checked={hasExtraBed}
                    onChange={(e) => setExtraBed(e.target.checked)}
                    className="h-5 w-5"
                    disabled={people >= 3 && roomConfiguration === "single"}
                  />

                  <div>
                    <p className="font-semibold">
                      Lit supplémentaire
                    </p>

                    <p className="text-sm text-[#6b5b4f]">
                      +{hotelConfig.options.extraBed}€
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
                  <input
                    type="checkbox"
                    checked={pet}
                    onChange={(e) => setPet(e.target.checked)}
                    className="h-5 w-5"
                  />

                  <div>
                    <p className="font-semibold">
                      Supplément animal
                    </p>

                    <p className="text-sm text-[#6b5b4f]">
                      +{hotelConfig.options.pet}€
                    </p>
                  </div>
                </label>
              </div>

              {/* ENFANT BAS AGE */}
              <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
                <label className="flex cursor-pointer items-start gap-4">
                  <input
                    type="checkbox"
                    checked={baby}
                    onChange={(e) => setBaby(e.target.checked)}
                    className="mt-1 h-5 w-5"
                  />

                  <div>
                    <p className="text-lg font-semibold">
                      Enfant bas âge
                    </p>

                    <p className="text-sm text-[#6b5b4f]">
                      Lit parapluie et chaise haute disponibles
                    </p>
                  </div>
                </label>

                {baby && (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#e5ddd2] p-4">
                      <input
                        type="checkbox"
                        checked={babyBed}
                        onChange={(e) =>
                          setBabyBed(e.target.checked)
                        }
                        className="h-5 w-5"
                      />

                      <div>
                        <p className="font-semibold">
                          Lit parapluie
                        </p>

                        <p className="text-sm text-[#6b5b4f]">
                          Gratuit
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#e5ddd2] p-4">
                      <input
                        type="checkbox"
                        checked={highChair}
                        onChange={(e) =>
                          setHighChair(e.target.checked)
                        }
                        className="h-5 w-5"
                      />

                      <div>
                        <p className="font-semibold">
                          Chaise haute
                        </p>

                        <p className="text-sm text-[#6b5b4f]">
                          Gratuit
                        </p>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              <button className="w-full rounded-2xl bg-[#c89b5f] py-5 text-lg font-semibold text-white transition hover:scale-[1.01]">
                Continuer vers le paiement
              </button>
            </form>

            {/* RECAP */}
            <div className="h-fit rounded-[32px] bg-[#2f241d] p-8 text-white shadow-2xl">
              <h3 className="mb-6 text-3xl font-bold">
                Récapitulatif
              </h3>

              <div className="space-y-5 border-b border-white/10 pb-6 text-white/90">
                <div className="flex items-center justify-between">
                  <span>{nights} nuit(s)</span>
                  <span>{roomTotal}€</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Taxe de séjour</span>

                  <span>
                    {touristTaxTotal.toFixed(2)}€
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Petit déjeuner</span>
                  <span>{breakfastTotal}€</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Repas midi</span>
                  <span>{lunchTotal}€</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Repas soir</span>
                  <span>{dinnerTotal}€</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Lit supplémentaire</span>
                  <span>
  {hasExtraBed ? extraBedTotal : 0}€
</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Supplément animal</span>
                  <span>{petTotal}€</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-2xl font-bold">
                <span>Total</span>

                <span>
                  {totalPrice.toFixed(2)}€
                </span>
              </div>

              <div className="mt-10 rounded-3xl bg-white/10 p-6 backdrop-blur">
                <h4 className="mb-3 text-xl font-semibold">
                  Paiement sécurisé
                </h4>

                <p className="text-white/80">
                  Le paiement en ligne via Stripe sera
                  connecté prochainement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}