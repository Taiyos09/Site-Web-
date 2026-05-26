import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  const username = process.argv[2]
  const password = process.argv[3]
  const email = process.argv[4]

  if (!username || !password || !email) {
    console.log('Usage: npm run create-admin <username> <password> <email>')
    process.exit(1)
  }

  try {
    // Vérifier si l'admin existe déjà
    const existingAdmin = await prisma.admins.findFirst({
      where: { username }
    })

    if (existingAdmin) {
      console.log(`L'admin ${username} existe déjà`)
      process.exit(1)
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Créer l'admin
    const admin = await prisma.admins.create({
      data: {
        username,
        password: hashedPassword,
        email
      }
    })

    console.log(`✓ Admin ${username} créé avec succès (ID: ${admin.id})`)
  } catch (error) {
    console.error('Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
