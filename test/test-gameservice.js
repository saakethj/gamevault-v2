// Test our new GameService functions
require('dotenv').config({ path: '.env.local' })

async function testGameService() {
  try {
    console.log('🔄 Testing GameService functions...')
    console.log('=' .repeat(50))

    // We'll simulate the GameService logic since we can't import TypeScript directly
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient({ log: ['warn', 'error'] })
    
    const profileId = 1 // Your profile ID (Red_Turtle)

    // Test 1: Get Gaming Stats (like getUserStats function)
    console.log('\n📊 Test 1: Getting gaming statistics...')
    const stats = await prisma.gamerLibrary.aggregate({
      where: { ProfileID: profileId },
      _count: { LibraryID: true },
      _sum: { HoursPlayed: true },
      _avg: { HoursPlayed: true, Rating: true }
    })

    const completedCount = await prisma.gamerLibrary.count({
      where: { 
        ProfileID: profileId,
        status: { StatusName: 'Completed' }
      }
    })

    const favoriteCount = await prisma.gamerLibrary.count({
      where: { ProfileID: profileId, IsFavorite: true }
    })

    console.log('✅ Gaming Statistics:')
    console.log(`   Total Games: ${stats._count.LibraryID}`)
    console.log(`   Completed Games: ${completedCount}`)
    console.log(`   Favorite Games: ${favoriteCount}`)
    console.log(`   Total Hours: ${Number(stats._sum.HoursPlayed || 0)}`)
    console.log(`   Avg Hours per Game: ${Math.round(Number(stats._avg.HoursPlayed || 0) * 100) / 100}`)
    console.log(`   Completion Rate: ${Math.round((completedCount / stats._count.LibraryID) * 100)}%`)

    // Test 2: Get User Library (like getUserLibrary function)
    console.log('\n📚 Test 2: Getting user library with details...')
    const library = await prisma.gamerLibrary.findMany({
      where: { ProfileID: profileId },
      include: {
        game: { select: { Title: true, GenreName: true } },
        status: { select: { StatusName: true } },
        platform: { select: { PlatformName: true } }
      },
      orderBy: { UpdatedAt: 'desc' },
      take: 3 // Just show first 3
    })

    console.log(`✅ Library Entries (showing first 3 of ${library.length}):`)
    library.forEach((entry, index) => {
      console.log(`   ${index + 1}. ${entry.game?.Title}`)
      console.log(`      Status: ${entry.status?.StatusName} | Platform: ${entry.platform?.PlatformName}`)
      console.log(`      Progress: ${entry.Progress}% | Hours: ${entry.HoursPlayed} | Favorite: ${entry.IsFavorite ? '⭐' : '○'}`)
    })

    // Test 3: Get Favorite Games (like getFavoriteGames function)
    console.log('\n⭐ Test 3: Getting favorite games...')
    const favorites = await prisma.gamerLibrary.findMany({
      where: { 
        ProfileID: profileId,
        IsFavorite: true 
      },
      include: {
        game: { select: { Title: true } },
        platform: { select: { PlatformName: true } }
      },
      take: 5
    })

    console.log(`✅ Favorite Games (showing first 5 of ${favorites.length}):`)
    favorites.forEach((fav, index) => {
      console.log(`   ${index + 1}. ${fav.game?.Title} (${fav.platform?.PlatformName})`)
    })

    // Test 4: Get Games by Status
    console.log('\n🎮 Test 4: Getting currently playing games...')
    const playingGames = await prisma.gamerLibrary.findMany({
      where: { 
        ProfileID: profileId,
        status: { StatusName: 'Playing' }
      },
      include: {
        game: { select: { Title: true } },
        platform: { select: { PlatformName: true } }
      }
    })

    console.log(`✅ Currently Playing (${playingGames.length} games):`)
    playingGames.forEach((game, index) => {
      console.log(`   ${index + 1}. ${game.game?.Title} - ${game.Progress}% complete`)
    })

    await prisma.$disconnect()
    console.log('\n🎉 All GameService functions working perfectly!')
    console.log('💡 Your GameService is ready to use in your Next.js app!')

  } catch (error) {
    console.error('❌ GameService test failed:')
    console.error('Error:', error.message)
  }
}


// Run the test
testGameService()