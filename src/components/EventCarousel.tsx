"use client"

import Image from "next/image"
import {
  useEffect,
  useState,
} from "react"

export default function EventCarousel({
  images,
}: {
  images: string[]
}) {

  const [
    current,
    setCurrent,
  ] = useState(0)

  // Défilement automatique
  useEffect(() => {

    if (images.length <= 1)
      return

    const interval =
      setInterval(() => {

        setCurrent(
          (prev) =>
            (prev + 1)
            % images.length
        )

      }, 5000)

    return () =>
      clearInterval(
        interval
      )

  }, [images.length])

  if (!images.length)
    return null

  const prev =
    current === 0
      ? images.length - 1
      : current - 1

  const next =
    (current + 1)
      % images.length

  return (

    <div className="relative py-10">

      {/* FLECHE GAUCHE */}

      <button
        onClick={() =>
          setCurrent(prev)
        }
        className="
          absolute
          left-0
          top-1/2
          z-30
          -translate-y-1/2
          rounded-full
          bg-black/40
          px-5
          py-4
          text-2xl
          text-white
          transition
          hover:bg-black/60
        "
      >
        ←
      </button>

      {/* CAROUSEL */}

      <div className="
        flex
        items-center
        justify-center
        gap-8
        perspective-[2000px]
      ">

        {/* IMAGE GAUCHE */}

        <div
          className="
            relative
            h-[300px]
            w-[300px]
            overflow-hidden
            rounded-[28px]
            shadow-2xl
            opacity-70
            transition-all
            duration-500
          "
          style={{
            transform:
              "rotateY(25deg) scale(.85)",
          }}
        >
          <Image
            src={images[prev]}
            alt=""
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>

        {/* IMAGE CENTRALE */}

        <div
          className="
            relative
            z-20
            h-[420px]
            w-[620px]
            overflow-hidden
            rounded-[32px]
            shadow-2xl
          "
        >
          <Image
            src={images[current]}
            alt=""
            fill
            priority
            sizes="620px"
            className="
              object-cover
              transition-all
              duration-500
            "
          />
        </div>

        {/* IMAGE DROITE */}

        <div
          className="
            relative
            h-[300px]
            w-[300px]
            overflow-hidden
            rounded-[28px]
            shadow-2xl
            opacity-70
            transition-all
            duration-500
          "
          style={{
            transform:
              "rotateY(-25deg) scale(.85)",
          }}
        >
          <Image
            src={images[next]}
            alt=""
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>

      </div>

      {/* FLECHE DROITE */}

      <button
        onClick={() =>
          setCurrent(next)
        }
        className="
          absolute
          right-0
          top-1/2
          z-30
          -translate-y-1/2
          rounded-full
          bg-black/40
          px-5
          py-4
          text-2xl
          text-white
          transition
          hover:bg-black/60
        "
      >
        →
      </button>

      {/* POINTS */}

      <div className="
        mt-8
        flex
        justify-center
        gap-3
      ">

        {images.map(
          (_, index) => (

            <button
              key={index}
              onClick={() =>
                setCurrent(index)
              }
              className={`
                h-3
                w-3
                rounded-full
                transition-all
                ${
                  index === current
                    ? "bg-[#2f241d] scale-125"
                    : "bg-[#d6b98c]"
                }
              `}
            />

          )
        )}

      </div>

    </div>
  )
}