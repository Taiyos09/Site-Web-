export const HOTEL_CONFIG = {
  roomPrices: {
    onePerson: 88,
    twoPeople: 98,
    doubleRoom: 176,
  },

  options: {
    breakfast: 8,
    lunch: 18,
    dinner: 20,
    extraBed: 15,
    pet: 5,
    touristTax: 0.8,
  },

  rooms: [
    {
      id: 1,
      name: "Chambre Familiale",
      size: "19m²",
      description: "Grande chambre familiale chaleureuse et confortable...",
      images: [
        "/images/hotel/chambre1.jpg",
        "/images/hotel/sdb1.jpg",
        "images/hotel/placard1.jpg",
      ],
    },

    {
      id: 2,
      name: "Chambre Couple",
      size: "16m²",
      description: "Chambre double élégante et romantique, parfaite pour les couples...",
      images: [
        "/images/hotel/chambre2.jpg",
        "/images/hotel/sdb2.jpg",
        "images/hotel/placard2.jpg",
      ],
    },

    {
      id: 3,
      name: "Chambre double standard",
      size: "14m²",
      description: "Petite chambre double confortable et fonctionnelle, idéale pour les voyageurs à petit budget...",
      images: [
        "/images/hotel/chambre3.jpg",
        "/images/hotel/sdb3.jpg",
        "images/hotel/placard3.jpg",
      ],
    },
  ],
}