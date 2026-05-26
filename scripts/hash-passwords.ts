import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function hashPasswords() {
  try {
    console.log('Récupération des admins...')
    const admins = await prisma.admins.findMany()
    
    for (const admin of admins) {
      // Vérifier si le mot de passe est déjà haché (bcrypt hash commence par $2b$ ou $2a$)
      if (admin.password.startsWith('$2b$') || admin.password.startsWith('$2a$')) {
        console.log(`Admin ${admin.username}: mot de passe déjà haché, skip`)
        continue
      }
      
      console.log(`Hachage du mot de passe pour ${admin.username}...`)
      const hashedPassword = await bcrypt.hash(admin.password, 10)
      
      await prisma.admins.update({
        where: { id: admin.id },
        data: { password: hashedPassword }
      })
      
      console.log(`✓ Admin ${admin.username}: mot de passe haché avec succès`)
    }
    
    console.log('\n✓ Tous les mots de passe ont été hachés!')
  } catch (error) {
    console.error('Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

hashPasswords()
