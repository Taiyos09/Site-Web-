"use client"

import { useEffect, useMemo, useState } from "react"
import { HOTEL_CONFIG } from "@/data/hotel"

export default function HotelPage() {
  const [hotelConfig, setHotelConfig] = useState(HOTEL_CONFIG)

  const [currentImages, setCurrentImages] = useState<number[]>([])

  const [breakfast, setBreakfast] = useState(false)
  const [lunch, setLunch] = useState(false)
  const [dinner, setDinner] = useState(false)
  const [petCount, setPetCount] = useState(0)
const [babyCount, setBabyCount] = useState(0)
  const [babyBed, setBabyBed] = useState(false)
  const [highChair, setHighChair] = useState(false)

  const [acceptTerms, setAcceptTerms] = useState(false)

  const [people, setPeople] = useState(0)

  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")

  const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [email, setEmail] = useState("")
const [phone, setPhone] = useState("")
const [message, setMessage] = useState("")
const [loading, setLoading] = useState(false)

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

  let roomsNeeded = 0
let roomTotal = 0
let bookingPossible = true

if (people === 1) {

  roomsNeeded = 1

  roomTotal =
    hotelConfig.roomPrices.onePerson *
    nights
}

else if (people === 2) {

  roomsNeeded = 1

  roomTotal =
    hotelConfig.roomPrices.twoPeople *
    nights
}

else if (people === 3) {

  roomsNeeded = 1

  roomTotal =
    hotelConfig.roomPrices.doubleRoom *
    nights
}

else if (people === 4) {

  roomsNeeded = 2

  roomTotal =
    hotelConfig.roomPrices.twoPeople *
    2 *
    nights
}

else if (people === 5) {

  roomsNeeded = 2

  roomTotal =
    (
      hotelConfig.roomPrices.doubleRoom +
      hotelConfig.roomPrices.twoPeople
    ) * nights
}

else if (people === 6) {

  roomsNeeded = 3

  roomTotal =
    (
      hotelConfig.roomPrices.twoPeople *
      2 +
      hotelConfig.roomPrices.doubleRoom
    ) * nights
}

else if (people === 7) {

  roomsNeeded = 3

  roomTotal =
    (
      hotelConfig.roomPrices.twoPeople *
      2 +
      hotelConfig.roomPrices.doubleRoom
    ) * nights
}

else if (people > 7) {

  bookingPossible = false

  roomsNeeded = 3

  roomTotal =
    (
      hotelConfig.roomPrices.twoPeople *
      2 +
      hotelConfig.roomPrices.doubleRoom
    ) * nights
}

const breakfastTotal =
  breakfast
    ? hotelConfig.options.breakfast *
      people *
      nights
    : 0

const lunchTotal =
  lunch
    ? hotelConfig.options.lunch *
      people *
      nights
    : 0

const dinnerTotal =
  dinner
    ? hotelConfig.options.dinner *
      people *
      nights
    : 0

const petTotal =
  petCount *
  hotelConfig.options.pet *
  nights

  const touristTaxTotal = hotelConfig.options.touristTax * people * nights

  const totalPrice = roomTotal + breakfastTotal + lunchTotal + dinnerTotal + petTotal + touristTaxTotal

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#2f241d]">
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
  className="relative snap-start bg-cover bg-center py-24"
        style={{
          backgroundImage: "url('/images/campagne.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative mx-auto max-w-[1800px] px-8 py-10">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Réserver votre séjour
            </h2>

            <p className="text-lg text-white">
              Sélectionnez vos dates et personnalisez votre réservation.
            </p>
          </div>

          <div className="items-start gap-8 lg:grid lg:grid-cols-[1.2fr_0.55fr]">
            {/* FORMULAIRE */}
            <form
  onSubmit={async (e) => {
    e.preventDefault()

    const response = await fetch(
      "/api/reservation",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
  firstName,
  lastName,
  email,
  phone,
  message,

  checkIn,
  checkOut,
  nights,

  people,
  roomsNeeded,

  breakfast,
  lunch,
  dinner,

  petCount,
  babyCount,

  babyBed,
  highChair,

  roomTotal,

  breakfastTotal,
  lunchTotal,
  dinnerTotal,
  petTotal,

  touristTaxTotal,
  totalPrice,
}),
      }
    )

    const data = await response.json()

if (response.ok) {
  alert("Demande envoyée")
} else {
  console.error(data)
  alert(data.error || "Erreur serveur")
}
  }}
  className="space-y-6 rounded-[32px] bg-[#faf7f2] p-12 shadow-xl"
>
              <div>
                <h3 className="mb-6 text-2xl font-semibold text-center">
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

              {/* PERSONNES */}
<div>
  <label className="mb-2 block font-medium">
    Nombre de personnes
  </label>

  <select
    value={people}
    onChange={(e) =>
      setPeople(Number(e.target.value))
    }
    className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4"
  >
    <option value={0}>
      Nombre de personnes
    </option>

    {[...Array(10)].map((_, i) => (
      <option
        key={i + 1}
        value={i + 1}
      >
        {i + 1} personne{i > 0 ? "s" : ""}
      </option>
    ))}
  </select>

  {people > 0 && bookingPossible && (
  <div className="mt-4 rounded-2xl bg-[#f3ede3] p-4 text-[#5a4c42]">
    <p className="font-semibold">
      {roomsNeeded} chambre(s)
      nécessaire(s)
    </p>

    <p className="mt-1 text-sm">
      Configuration automatique selon
      les capacités des chambres.
    </p>
  </div>
)}

{people > 7 && (
  <div className="mt-4 rounded-2xl bg-red-100 p-4 text-red-700">
    Merci de contacter directement
    l’auberge pour les groupes de
    plus de 7 personnes ou pour
    ajouter des lits supplémentaires.
  </div>
)}
</div>
              
              {/* CLIENT */}
<div>
  <h3 className="mb-6 text-2xl font-semibold">
    Informations client
  </h3>

  <div className="grid gap-6 md:grid-cols-2">

    <input
      type="text"
      placeholder="Prénom"
      value={firstName}
      onChange={(e) =>
        setFirstName(e.target.value)
      }
      className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4"
    />

    <input
      type="text"
      placeholder="Nom"
      value={lastName}
      onChange={(e) =>
        setLastName(e.target.value)
      }
      className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4"
    />

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
      className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4"
    />

    <input
      type="tel"
      placeholder="Téléphone"
      value={phone}
      onChange={(e) =>
        setPhone(e.target.value)
      }
      className="w-full rounded-2xl border border-[#d9d1c7] bg-white p-4"
    />
  </div>

  <textarea
    placeholder="Message complémentaire"
    value={message}
    onChange={(e) =>
      setMessage(e.target.value)
    }
    className="mt-6 min-h-[140px] w-full rounded-2xl border border-[#d9d1c7] bg-white p-4"
  />
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

  {/* ANIMAUX */}
  <div className="rounded-2xl bg-white p-5 shadow-sm">
    <label className="mb-3 block font-semibold">
      Nombre d'animaux
    </label>

    <select
      value={petCount}
      onChange={(e) =>
        setPetCount(Number(e.target.value))
      }
      className="w-full rounded-xl border border-[#d9d1c7] p-3"
    >
      <option value={0}>Aucun animal</option>
      <option value={1}>1 animal</option>
      <option value={2}>2 animaux</option>
      <option value={3}>3 animaux</option>
    </select>

    <p className="mt-2 text-sm text-[#6b5b4f]">
      +{hotelConfig.options.pet}€ par animal / nuit
    </p>
  </div>

  {/* ENFANTS */}
  <div className="rounded-2xl bg-white p-5 shadow-sm">
    <label className="mb-3 block font-semibold">
      Enfants bas âge
    </label>

    <select
      value={babyCount}
      onChange={(e) =>
        setBabyCount(Number(e.target.value))
      }
      className="w-full rounded-xl border border-[#d9d1c7] p-3"
    >
      <option value={0}>Aucun enfant</option>
      <option value={1}>1 enfant</option>
      <option value={2}>2 enfants</option>
      <option value={3}>3 enfants</option>
    </select>
  </div>
</div>

                {babyCount > 0 && (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#e5ddd2] p-4">
                      <input
                        type="checkbox"
                        checked={babyBed}
                        disabled={babyCount === 0}
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
                        disabled={babyCount === 0}
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

              {/* INFORMATIONS LEGALES */}
<div className="mx-auto w-[70%] scale-[0.85] origin-top space-y-5 rounded-[28px] bg-[#faf7f2] p-8 shadow-xl">

  <h3 className="mb-3 text-base font-semibold text-[#2f241d]">
    Informations importantes
  </h3>

  <div className="space-y-5">

    <label className="flex items-start gap-4">
      <input
        type="checkbox"
        checked={acceptTerms}
        onChange={(e) =>
          setAcceptTerms(e.target.checked)
        }
        className="mt-1 h-5 w-5"
      />

      <span className="text-[12px] leading-relaxed text-[#5a4c42]">
        J’accepte les conditions générales
        de réservation ainsi que la
        politique d’annulation de
        l’auberge.
      </span>
    </label>

    <div className="rounded-xl bg-[#f5f1ea] p-3 text-[12px] leading-relaxed text-[#6b5b4f]">

      <p className="mb-4">
        Les informations collectées via
        ce formulaire sont utilisées
        uniquement dans le cadre de votre
        demande de réservation.
      </p>

      <p className="mb-4">
        Conformément au RGPD, vous pouvez
        demander la modification ou la
        suppression de vos données
        personnelles.
      </p>

      <p className="mb-4">
        Toute réservation effectuée via
        ce formulaire constitue une
        demande de réservation et devra
        être confirmée par l’auberge
        selon les disponibilités.
      </p>

      <p>
        Les tarifs affichés incluent les
        prestations sélectionnées ainsi
        que la taxe de séjour applicable.
      </p>

    </div>

  </div>
</div>

{/* BOUTON */}
<div className="flex justify-center pt-6">

  <button
    type="submit"
    disabled={
      !bookingPossible ||
      !acceptTerms
    }
    className="
      rounded-2xl
      bg-[#c89b5f]
      px-14
      py-5
      text-lg
      font-bold
      text-white
      shadow-xl
      transition-all
      duration-300
      hover:scale-[1.03]
      hover:bg-[#b88b4f]
      disabled:cursor-not-allowed
      disabled:opacity-40
    "
  >
    Envoyer la demande de réservation
  </button>

</div>
            </form>

{/* RECAP */}
<div className="sticky top-24 h-fit rounded-[32px] bg-[#2f241d] p-6 text-white shadow-2xl">

  <h3 className="mb-6 text-3xl font-bold">
    Récapitulatif
  </h3>


  <div className="space-y-3 border-b border-white/10 pb-6 text-white/90">

  <div className="flex items-center justify-between">
    <span>Nuits</span>
    <span>{nights}</span>
  </div>

  <div className="flex items-center justify-between">
    <span>Prix chambres</span>
    <span>{roomTotal}€</span>
  </div>

  <div className="flex items-center justify-between">
    <span>Personnes</span>
    <span>{people}</span>
  </div>

  <div className="flex items-center justify-between">
    <span>Animaux</span>
    <span>{petCount}</span>
  </div>

  <div className="flex items-center justify-between">
    <span>Enfants bas âge</span>
    <span>{babyCount}</span>
  </div>

  <div className="flex items-center justify-between">
    <span>Taxe de séjour</span>
    <span>{touristTaxTotal.toFixed(2)}€</span>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}