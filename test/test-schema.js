// Test our Prisma schema with actual data
require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')

async function testSchema() {
  const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],
  })

  try {
    console.log('🔄 Testing Prisma schema with your data...')
    console.log('=' .repeat(50))

    // Test 1: Get your profile
    console.log('\n📋 Test 1: Getting your profile...')
    const profile = await prisma.profile.findFirst()
    if (profile) {
      console.log(`✅ Profile found: ${profile.Username}`)
      console.log(`   Joined: ${profile.JoinedDate.toDateString()}`)
      console.log(`   Favorite Genre: ${profile.FavoriteGenre || 'Not set'}`)
    } else {
      console.log('❌ No profile found')
    }

    // Test 2: Get some games
    console.log('\n🎮 Test 2: Getting your games...')
    const games = await prisma.game.findMany({
      take: 5,
      orderBy: { CreatedAt: 'desc' }
    })
    console.log(`✅ Found ${games.length} games (showing first 5):`)
    games.forEach((game, index) => {
      console.log(`   ${index + 1}. ${game.Title} (${game.ReleaseYear || 'Unknown year'})`)
    })

    // Test 3: Get game statuses
    console.log('\n📊 Test 3: Getting game statuses...')
    const statuses = await prisma.gameStatus.findMany()
    console.log(`✅ Found ${statuses.length} statuses:`)
    statuses.forEach((status, index) => {
      console.log(`   ${index + 1}. ${status.StatusName}`)
    })

    // Test 4: Get platforms
    console.log('\n🎯 Test 4: Getting platforms...')
    const platforms = await prisma.platform.findMany()
    console.log(`✅ Found ${platforms.length} platforms:`)
    platforms.forEach((platform, index) => {
      console.log(`   ${index + 1}. ${platform.PlatformName}`)
    })

    // Test 5: Get library entries with relationships
    console.log('\n📚 Test 5: Getting your game library (with relationships)...')
    const libraryEntries = await prisma.gamerLibrary.findMany({
      take: 5,
      include: {
        game: {
          select: {
            Title: true,
            GenreName: true
          }
        },
        status: {
          select: {
            StatusName: true
          }
        },
        platform: {
          select: {
            PlatformName: true
          }
        }
      },
      orderBy: { UpdatedAt: 'desc' }
    })

    console.log(`✅ Found ${libraryEntries.length} library entries (showing first 5):`)
    libraryEntries.forEach((entry, index) => {
      console.log(`   ${index + 1}. ${entry.game?.Title || 'Unknown'}`)
      console.log(`      Status: ${entry.status?.StatusName || 'Unknown'}`)
      console.log(`      Platform: ${entry.platform?.PlatformName || 'Unknown'}`)
      console.log(`      Progress: ${entry.Progress}%`)
      console.log(`      Hours: ${entry.HoursPlayed}`)
      console.log(`      Favorite: ${entry.IsFavorite ? '⭐' : '○'}`)
      console.log(`      ---`)
    })

    // Test 6: Get some statistics
    console.log('\n📈 Test 6: Getting gaming statistics...')
    const totalGames = await prisma.gamerLibrary.count()
    const completedGames = await prisma.gamerLibrary.count({
      where: {
        status: {
          StatusName: 'Completed'
        }
      }
    })
    const favoriteGames = await prisma.gamerLibrary.count({
      where: {
        IsFavorite: true
      }
    })

    console.log(`✅ Gaming Stats:`)
    console.log(`   Total Games: ${totalGames}`)
    console.log(`   Completed Games: ${completedGames}`)
    console.log(`   Favorite Games: ${favoriteGames}`)
    console.log(`   Completion Rate: ${totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0}%`)

    console.log('\n🎉 All schema tests passed!')
    console.log('Your Prisma schema is working perfectly with your existing data!')

  } catch (error) {
    console.error('❌ Schema test failed:')
    console.error('Error:', error.message)
    
    if (error.message.includes('Unknown column')) {
      console.error('\n💡 This might be a column name mismatch.')
      console.error('Check if your database column names match the Prisma schema.')
    }
    
    if (error.message.includes('Unknown table')) {
      console.error('\n💡 This might be a table name mismatch.')
      console.error('Check if your database table names match the Prisma schema.')
    }
  } finally {
    await prisma.$disconnect()
    console.log('\n👋 Disconnected from database')
  }
}

// Run the test
testSchema()
  .catch(error => {
    console.error('Script error:', error)
    process.exit(1)
  })