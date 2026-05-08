import Link from "next/link"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Hôtel", href: "/hotel" },
  { name: "Restaurant", href: "#restaurant" },
  { name: "Événements", href: "#evenements" },
  { name: "Contact", href: "#contact" },
]

export default function AubergeSaintAubinHomepage() {
  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#2f241d]">
      {/* NAVBAR */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
          <div>
            <h1 className="text-2xl font-bold">L&apos;auberge de St Aubin</h1>
          </div>

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

          <button className="rounded-2xl bg-[#c89b5f] px-5 py-3 font-semibold text-white transition hover:scale-105">
            Réserver
          </button>
        </div>
      </header>
      {/* HERO */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <div className="flex items-center gap-3">
  <img
    src="/images/logo.png"
    alt="Logo Auberge St Aubin"
    className="h-150 w-auto drop-shadow-2xl"
  />
</div>

          <p className="mb-8 max-w-2xl text-lg md:text-2xl">
            Bar • Restaurant •  Hôtel
          </p>

          <p className="mb-10 max-w-3xl text-base md:text-lg text-white/90">
            Une auberge chaleureuse entre authenticité, convivialité et
            gastronomie.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/hotel"
              className="rounded-2xl bg-[#c89b5f] px-8 py-4 text-lg font-semibold text-white shadow-xl transition hover:scale-105"
          >
              Réserver une chambre
            </Link>

            <button className="rounded-2xl border border-white/70 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition hover:bg-white/20">
              Découvrir le restaurant
            </button>
          </div>
        </div>
      </section>

      {/* PRESENTATION */}
      <section id="restaurant" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="mb-6 text-4xl font-bold">
              Une auberge authentique
            </h2>

            <p className="mb-4 text-lg leading-relaxed text-[#5a4c42]">
              Située dans un cadre chaleureux et convivial, L&apos;auberge de St
              Aubin vous accueille pour un séjour reposant, un repas gourmand
              ou une soirée animée.
            </p>

            <p className="text-lg leading-relaxed text-[#5a4c42]">
              Entre chambres confortables, cuisine maison et événements du
              vendredi soir, découvrez une ambiance rustique moderne pensée
              pour tous.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
              alt="Auberge"
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* HOTEL */}
      <section id="hotel" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-bold">Nos chambres</h2>
            <p className="text-lg text-[#6b5b4f]">
              Trois chambres confortables dans une ambiance chaleureuse.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((room) => (
              <div
                key={room}
                className="overflow-hidden rounded-3xl bg-[#faf7f2] shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1974&auto=format&fit=crop"
                  alt="Chambre"
                  className="h-64 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="mb-3 text-2xl font-semibold">
                    Chambre {room}
                  </h3>

                  <p className="mb-5 text-[#6b5b4f]">
                    Chambre confortable avec ambiance chaleureuse et vue sur les
                    alentours.
                  </p>

                  <button className="w-full rounded-2xl bg-[#2f241d] py-3 text-white transition hover:bg-[#43352c]">
                    Réserver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESTAURANT */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1974&auto=format&fit=crop"
            alt="Restaurant"
            className="rounded-3xl shadow-2xl"
          />

          <div>
            <h2 className="mb-6 text-4xl font-bold">Restaurant & bar</h2>

            <p className="mb-4 text-lg leading-relaxed text-[#5a4c42]">
              Découvrez une cuisine conviviale avec carte fixe et menu du jour
              du lundi au vendredi.
            </p>

            <p className="mb-8 text-lg leading-relaxed text-[#5a4c42]">
              Le bar accueille également des soirées événements et concerts
              occasionnels.
            </p>

            <button className="rounded-2xl bg-[#c89b5f] px-8 py-4 text-lg font-semibold text-white shadow-xl transition hover:scale-105">
              Voir la carte
            </button>
          </div>
        </div>
      </section>

      {/* EVENEMENTS */}
      <section id="evenements" className="bg-[#2f241d] py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-bold">Événements</h2>
            <p className="text-lg text-white/80">
              Concerts, soirées du vendredi et animations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((event) => (
              <div
                key={event}
                className="rounded-3xl bg-white/10 p-6 backdrop-blur"
              >
                <div className="mb-4 rounded-2xl bg-[#c89b5f] px-4 py-2 inline-block">
                  Vendredi soir
                </div>

                <h3 className="mb-3 text-2xl font-semibold">
                  Concert live
                </h3>

                <p className="text-white/80">
                  Soirée musicale conviviale dans une ambiance chaleureuse.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-bold">Contact</h2>

            <div className="space-y-4 text-lg text-[#5a4c42]">
              <p>📍 Adresse de l&apos;auberge</p>
              <p>📞 Téléphone</p>
              <p>✉️ contact@auberge-st-aubin.fr</p>
            </div>
          </div>

          <form className="space-y-4 rounded-3xl bg-white p-8 shadow-xl">
            <input
              type="text"
              placeholder="Nom"
              className="w-full rounded-2xl border p-4"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-2xl border p-4"
            />

            <textarea
              placeholder="Votre message"
              rows={5}
              className="w-full rounded-2xl border p-4"
            />

            <button className="w-full rounded-2xl bg-[#2f241d] py-4 text-white transition hover:bg-[#43352c]">
              Envoyer
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1f1712] px-6 py-10 text-center text-white/70">
        <p>© 2026 L&apos;auberge de St Aubin — Tous droits réservés</p>
      </footer>
    </div>
  )
}
