import Link from "next/link"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Hôtel", href: "/hotel" },
  { name: "Restaurant", href: "/restaurant" },
  { name: "Événements", href: "/evenements" },
  { name: "Contact", href: "/contact" },
  { name: "Login", href: "/login" },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 z-20 w-full border-b border-white/20 bg-black/40 backdrop-blur-xl shadow-lg">
      <div className="flex items-center justify-between px-8 py-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-[#c89b5f] rounded-full animate-pulse"></div>
          <h1 className="text-2xl font-light tracking-wide font-serif">
            Auberge de St Aubin
          </h1>
        </div>

        <nav className="hidden gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-base font-medium transition-all duration-300 hover:text-[#c89b5f] after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[2px] after:bg-[#c89b5f] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}