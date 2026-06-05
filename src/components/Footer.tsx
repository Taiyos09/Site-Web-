import Link from "next/link"

export default function Footer() {
  return (
<footer
  className="
    bg-[#1f1712]
    px-6
    py-12
    text-center
    text-white/70
  "
>

  <p className="mb-6">
    © 2026 L&apos;Auberge de Saint Aubin
  </p>

  <div
    className="
      mb-6
      flex
      flex-wrap
      justify-center
      gap-6
      text-sm
    "
  >

    <Link
      href="/mentions-legales"
      className="hover:text-white"
    >
      Mentions légales
    </Link>

    <Link
      href="/confidentialite"
      className="hover:text-white"
    >
      Confidentialité
    </Link>

    <Link
      href="/cgv"
      className="hover:text-white"
    >
      CGV
    </Link>

    <Link
      href="/cookies"
      className="hover:text-white"
    >
      Cookies
    </Link>

  </div>

  <Link
    href="/login"
    className="
      text-[11px]
      text-white/20
      transition
      hover:text-white/50
    "
  >
    administration
  </Link>

</footer>
    )
}   