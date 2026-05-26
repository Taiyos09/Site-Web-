import { PrismaClient } from '@prisma/client'
import { HOTEL_CONFIG } from '../src/data/hotel'
import { RESTAURANT_CONFIG } from '../src/data/restaurant'
import { EVENTS } from '../src/data/events'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seed...')

  // Nettoyer les tables existantes
  await prisma.reservation_rooms.deleteMany()
  await prisma.reservations.deleteMany()
  await prisma.rooms.deleteMany()
  await prisma.events.deleteMany()
  await prisma.blocked_dates.deleteMany()
  await prisma.admins.deleteMany()
  await prisma.hotel_settings.deleteMany()

  console.log('✅ Tables nettoyées')

  // Créer les chambres
  for (const room of HOTEL_CONFIG.rooms) {
    await prisma.rooms.create({
      data: {
        name: room.name,
        slug: room.slug,
        size: room.size,
        description: room.description,
        images: JSON.stringify(room.images),
        priceOnePerson: HOTEL_CONFIG.roomPrices.onePerson,
        priceTwoPeople: HOTEL_CONFIG.roomPrices.twoPeople,
        priceDoubleRoom: HOTEL_CONFIG.roomPrices.doubleRoom,
      },
    })
  }
  console.log('✅ Chambres créées')

  // Créer les événements
  for (const event of EVENTS) {
    await prisma.events.create({
      data: {
        title: event.title,
        date: event.date,
        description: event.description,
        image: event.image,
        gallery: JSON.stringify(event.gallery),
      },
    })
  }
  console.log('✅ Événements créés')

  // Créer les paramètres hôtel (prix, options)
  await prisma.hotel_settings.createMany({
    data: [
      { key: 'price_one_person', value: HOTEL_CONFIG.roomPrices.onePerson.toString() },
      { key: 'price_two_people', value: HOTEL_CONFIG.roomPrices.twoPeople.toString() },
      { key: 'price_double_room', value: HOTEL_CONFIG.roomPrices.doubleRoom.toString() },
      { key: 'option_lunch', value: HOTEL_CONFIG.options.lunch.toString() },
      { key: 'option_dinner', value: HOTEL_CONFIG.options.dinner.toString() },
      { key: 'option_pet', value: HOTEL_CONFIG.options.pet.toString() },
      { key: 'option_tourist_tax', value: HOTEL_CONFIG.options.touristTax.toString() },
      { key: 'option_extra_bed', value: HOTEL_CONFIG.options.extraBed.toString() },
    ],
  })
  console.log('✅ Paramètres hôtel créés')

  // Créer un admin par défaut (mot de passe: admin123 - à changer !)
  await prisma.admins.create({
    data: {
      username: 'admin',
      password: 'admin123', // TODO: hasher avec bcrypt
      email: 'admin@auberge-saint-aubin.com',
    },
  })
  console.log('✅ Admin créé (username: admin, password: admin123)')

  console.log('🎉 Seed terminé avec succès !')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
