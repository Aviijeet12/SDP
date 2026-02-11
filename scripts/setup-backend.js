const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function setup() {
  console.log('🚀 Setting up backend...')

  try {
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connected')

    // Create demo user
    const hashedPassword = await bcrypt.hash('demo123', 10)
    
    try {
      const user = await prisma.user.create({
        data: {
          id: 'demo-user',
          email: 'demo@example.com',
          password: hashedPassword,
          name: 'Demo User'
        }
      })
      console.log('✅ Demo user created:', user.email)
    } catch (e) {
      console.log('ℹ️  Demo user already exists')
    }

    console.log('\n✅ Backend setup complete!')
    console.log('\nDemo credentials:')
    console.log('Email: demo@example.com')
    console.log('Password: demo123')
    
  } catch (error) {
    console.error('❌ Setup error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

setup()
