import EvenementsClient from "./EvenementsClient"

export const metadata = {
  title: "Événements | Auberge de St Aubin",
  description:
    "Découvrez les événements de l'Auberge de St Aubin.",
}

export default function EvenementsPage() {
  return <EvenementsClient />
}