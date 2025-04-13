import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const ACCOUNTS = [
  {
    email: 'user@test.com',
    password: '123456',
    is_email_verified: true,
    is_active: true,
    is_admin: true,
    is_moderator: true,
    name: 'User Test',
    first_name: 'User',
    last_name: 'Test',
    lead_origin: 'generated-on-seed',
    photo_url: 'https://example.com/photo.jpg',
    birth_date: '2025-01-01T00:00:00.000Z'
  }
]

export default class AccountsSeed {
  async seed() {
    try {
      for (const account of ACCOUNTS) {
        const accountExists = await prisma.account.findFirst({
          where: { email: account.email }
        })
        if (!accountExists) {
          console.log(`Creating administration route: ${account.name}`)
          await prisma.account.create({ data: account })
        }
      }

      console.log('AccountsSeed executed successfully')
    } catch (error) {
      console.error('Error in AccountsSeed:', error)
    } finally {
      await prisma.$disconnect()
    }
  }
}
