import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function verifyPasswords() {
  try {
    console.log('=== Vérification des mots de passe ===\n')
    
    const admins = await prisma.admins.findMany()
    
    if (admins.length === 0) {
      console.log('❌ Aucun admin trouvé dans la base de données')
      return
    }
    
    let allHashed = true
    
    for (const admin of admins) {
      const isHashed = admin.password.startsWith('$2b$') || admin.password.startsWith('$2a$')
      
      if (isHashed) {
        console.log(`✅ ${admin.username}: mot de passe haché (${admin.password.substring(0, 7)}...)`)
      } else {
        console.log(`❌ ${admin.username}: mot de passe en clair (NON SÉCURISÉ)`)
        allHashed = false
      }
    }
    
    console.log('\n=== Résultat ===')
    if (allHashed) {
      console.log('✅ TOUS les mots de passe sont hachés avec bcrypt')
    } else {
      console.log('❌ CERTAINS mots de passe sont en clair - Exécutez: npm run hash-passwords')
    }
  } catch (error) {
    console.error('Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyPasswords()
