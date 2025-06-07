// Simple connection test script
// Run this to verify your database connection works

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const { PrismaClient } = require('@prisma/client')

async function testConnection() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

  try {
    console.log('🔄 Testing database connection...')
    console.log('Server: SAAKI\\STARBASE')
    console.log('Database: GameVault')
    console.log('Auth: Windows Authentication')
    console.log('------------------------')

    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connected successfully!')

    // Test if we can read from existing tables
    console.log('\n🔍 Testing table access...')
    
    try {
      const gameCount = await prisma.$queryRaw`SELECT COUNT(*) as count FROM Game`
      console.log(`✅ Games table accessible - Found ${gameCount[0].count} games`)
    } catch (error) {
      console.log('⚠️  Games table access issue:', error.message)
    }

    try {
      const profileCount = await prisma.$queryRaw`SELECT COUNT(*) as count FROM Profile`
      console.log(`✅ Profile table accessible - Found ${profileCount[0].count} profiles`)
    } catch (error) {
      console.log('⚠️  Profile table access issue:', error.message)
    }

    try {
      const statusCount = await prisma.$queryRaw`SELECT COUNT(*) as count FROM GameStatus`
      console.log(`✅ GameStatus table accessible - Found ${statusCount[0].count} statuses`)
    } catch (error) {
      console.log('⚠️  GameStatus table access issue:', error.message)
    }

    try {
      const platformCount = await prisma.$queryRaw`SELECT COUNT(*) as count FROM Platform`
      console.log(`✅ Platform table accessible - Found ${platformCount[0].count} platforms`)
    } catch (error) {
      console.log('⚠️  Platform table access issue:', error.message)
    }

    console.log('\n🎉 Connection test completed!')

  } catch (error) {
    console.error('❌ Database connection failed:')
    console.error('Error:', error.message)
    console.error('\n💡 Troubleshooting tips:')
    console.error('1. Check if SQL Server is running')
    console.error('2. Verify server name: SAAKI\\STARBASE')
    console.error('3. Check if Windows Authentication is enabled')
    console.error('4. Ensure GameVault database exists')
    console.error('5. Check firewall settings')
  } finally {
    await prisma.$disconnect()
    console.log('\n👋 Disconnected from database')
  }
}

// Run the test
testConnection()
  .catch(error => {
    console.error('Script error:', error)
    process.exit(1)
  })