import Link from "next/link"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Hôtel", href: "/hotel" },
  { name: "Restaurant", href: "/restaurant" },
  { name: "Événements", href: "/evenements" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  return (
    <header
      className="
        fixed
        top-0
        z-50
        w-full
        border-b
        border-white/10
        bg-[#1f1712]/75
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-1
          text-white
        "
      >
        {/* LOGO / TITRE */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div
            className="
              h-3
              w-3
              rounded-full
              bg-[#c89b5f]
            "
          />

          <div className="flex flex-col">
            <span
              className="
                font-serif
                text-2xl
                tracking-wide
              "
            >
              Auberge de St Aubin
            </span>

            <span
              className="
                text-[11px]
                uppercase
                tracking-[0.35em]
                text-[#d6b98c]
              "
            >
              Bourbonnais
            </span>
          </div>
        </Link>

        {/* MENU */}

        <nav
          className="
            hidden
            items-center
            gap-8
            md:flex
          "
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="
                text-sm
                font-medium
                text-white/90
                transition-colors
                duration-300
                hover:text-[#d6b98c]
              "
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}

        <Link
          href="/hotel"
          className="
            hidden
            rounded-full
            border
            border-[#c89b5f]
            px-5
            py-2.5
            text-sm
            font-medium
            text-white
            transition-all
            duration-300
            hover:bg-[#c89b5f]
            hover:text-[#2f241d]
            md:block
          "
        >
          Réserver
        </Link>
      </div>
    </header>
  )
}