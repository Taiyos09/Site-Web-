export const HOTEL_CONFIG = {
  roomPrices: {
    onePerson: 88,
    twoPeople: 98,
    doubleRoom: 176,
  },

  options: {
  breakfast: 8,
  lunch: 15,
  dinner: 20,
  pet: 5,
  touristTax: 1.3,
  extraBed: 15,
},

  rooms: [
    {
      id: 1,
      name: "Chambre Familiale",
      slug: "familiale",
      size: "19m²",
      description: "Grande chambre familiale chaleureuse et confortable...",
      images: [
        "/images/hotel/chambre1.jpg",
        "/images/hotel/sdb1.jpg",
        "/images/hotel/placard1.jpg",
      ],
    },

    {
      id: 2,
      name: "Chambre Confort",
      slug: "confort",
      size: "16m²",
      description: "Chambre élégante et romantique, parfaite pour les couples...",
      images: [
        "/images/hotel/chambre2.jpg",
        "/images/hotel/sdb2.jpg",
        "/images/hotel/placard2.jpg",
      ],
    },

    {
      id: 3,
      name: "Chambre Double Standard",
      slug: "standard",
      size: "14m²",
      description: "Petite chambre double confortable et fonctionnelle, idéale pour les voyageurs à petit budget...",
      images: [
        "/images/hotel/chambre3.jpg",
        "/images/hotel/sdb3.jpg",
        "/images/hotel/placard3.jpg",
      ],
    },
  ],
}