import Link from "next/link"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Hôtel", href: "/hotel" },
  { name: "Restaurant", href: "/restaurant" },
  { name: "Événements", href: "/evenements" },
  { name: "Contact", href: "/contact" },
  { name: "Admin", href: "/admin" },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 z-20 w-full border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4 text-white">
        <h1 className="text-lg font-semibold tracking-wide font-serif">
          L&apos;Auberge de St Aubin
        </h1>

        <nav className="hidden gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition hover:text-[#c89b5f]"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}