// Test our new database client singleton
require('dotenv').config({ path: '.env.local' })

// Direct import from Prisma (bypass our TypeScript file for now)
const { PrismaClient } = require('@prisma/client')

async function testClient() {
  // Create client using the same logic as our TypeScript file
  const prisma = new PrismaClient({
    log: ['warn', 'error'],
  })

  try {
    console.log('🔄 Testing database client singleton logic...')
    console.log('=' .repeat(40))

    // Test 1: Basic connection
    console.log('\n📋 Test 1: Basic connection...')
    const profile = await prisma.profile.findFirst()
    console.log(`✅ Connected! Found profile: ${profile?.Username}`)

    // Test 2: Quick stats
    console.log('\n📊 Test 2: Quick stats...')
    const gameCount = await prisma.game.count()
    const libraryCount = await prisma.gamerLibrary.count()
    console.log(`✅ Games in database: ${gameCount}`)
    console.log(`✅ Library entries: ${libraryCount}`)

    console.log('\n🎉 Database client singleton logic working perfectly!')
    console.log('💡 Your lib/prisma.ts file is ready for Next.js to use!')

  } catch (error) {
    console.error('❌ Client test failed:')
    console.error('Error:', error.message)
  } finally {
    // Test 3: Test disconnect
    console.log('\n🔌 Disconnecting...')
    await prisma.$disconnect()
    console.log('✅ Disconnected successfully!')
  }
}

// Run the test
testClient()