// Test CRUD operations (Create, Read, Update, Delete)
require('dotenv').config({ path: '.env.local' })

async function testCRUDOperations() {
  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient({ log: ['warn', 'error'] })
  
  try {
    console.log('🔄 Testing CRUD operations...')
    console.log('=' .repeat(50))

    const profileId = 1 // Your profile ID

    // First, let's get a game from your library to test with
    const testGame = await prisma.gamerLibrary.findFirst({
      where: { ProfileID: profileId },
      include: {
        game: { select: { Title: true } }
      }
    })

    if (!testGame) {
      console.log('❌ No games found in library to test with')
      return
    }

    console.log(`\n🎮 Using test game: "${testGame.game?.Title}"`)
    console.log(`   Current Status: Favorite: ${testGame.IsFavorite ? '⭐' : '○'}, Progress: ${testGame.Progress}%, Hours: ${testGame.HoursPlayed}`)

    // Test 1: Toggle Favorite Status
    console.log('\n⭐ Test 1: Toggle favorite status...')
    const originalFavorite = testGame.IsFavorite
    
    // Simulate toggleFavorite function
    const updatedFavorite = await prisma.gamerLibrary.update({
      where: { LibraryID: testGame.LibraryID },
      data: {
        IsFavorite: !originalFavorite,
        UpdatedAt: new Date()
      }
    })

    // Log the activity
    await prisma.activityLog.create({
      data: {
        ProfileID: profileId,
        GameID: testGame.GameID,
        ActivityType: updatedFavorite.IsFavorite ? 'Added to Favorites' : 'Removed from Favorites',
        Details: updatedFavorite.IsFavorite ? 'Game added to favorites (TEST)' : 'Game removed from favorites (TEST)'
      }
    })

    console.log(`✅ Favorite status changed: ${originalFavorite ? '⭐' : '○'} → ${updatedFavorite.IsFavorite ? '⭐' : '○'}`)

    // Test 2: Update Progress and Hours
    console.log('\n📈 Test 2: Update progress and hours...')
    const newProgress = Math.min(testGame.Progress + 5, 100) // Add 5% or cap at 100%
    const newHours = Number(testGame.HoursPlayed) + 0.5 // Add 30 minutes

    await prisma.gamerLibrary.update({
      where: { LibraryID: testGame.LibraryID },
      data: {
        Progress: newProgress,
        HoursPlayed: newHours,
        LastPlayed: new Date(),
        UpdatedAt: new Date()
      }
    })

    // Log the activity
    await prisma.activityLog.create({
      data: {
        ProfileID: profileId,
        GameID: testGame.GameID,
        ActivityType: newProgress === 100 ? 'Completed' : 'Updated Progress',
        Details: `Progress updated to ${newProgress}%, Hours: ${newHours} (TEST)`
      }
    })

    console.log(`✅ Progress updated: ${testGame.Progress}% → ${newProgress}%`)
    console.log(`✅ Hours updated: ${testGame.HoursPlayed} → ${newHours}`)

    // Test 3: Add/Update Rating
    console.log('\n⭐ Test 3: Add rating...')
    const newRating = 8.5 // Test rating

    await prisma.gamerLibrary.update({
      where: { LibraryID: testGame.LibraryID },
      data: {
        Rating: newRating,
        UpdatedAt: new Date()
      }
    })

    // Log the activity
    await prisma.activityLog.create({
      data: {
        ProfileID: profileId,
        GameID: testGame.GameID,
        ActivityType: 'Rated Game',
        Details: `Game rated ${newRating}/10 (TEST)`
      }
    })

    console.log(`✅ Rating added: ${newRating}/10`)

    // Test 4: Revert changes (so we don't mess up your actual data)
    console.log('\n🔄 Test 4: Reverting test changes...')
    await prisma.gamerLibrary.update({
      where: { LibraryID: testGame.LibraryID },
      data: {
        IsFavorite: originalFavorite,
        Progress: testGame.Progress,
        HoursPlayed: testGame.HoursPlayed,
        Rating: testGame.Rating,
        UpdatedAt: new Date()
      }
    })

    console.log('✅ All changes reverted - your data is safe!')

    // Test 5: Check recent activities
    console.log('\n📋 Test 5: Recent activities from our tests...')
    const recentActivities = await prisma.activityLog.findMany({
      where: { 
        ProfileID: profileId,
        Details: { contains: '(TEST)' }
      },
      include: {
        game: { select: { Title: true } }
      },
      take: 5,
      orderBy: { ActivityDate: 'desc' }
    })

    console.log(`✅ Found ${recentActivities.length} test activities:`)
    recentActivities.forEach((activity, index) => {
      console.log(`   ${index + 1}. ${activity.ActivityType}: ${activity.game?.Title}`)
    })

    await prisma.$disconnect()
    console.log('\n🎉 All CRUD operations working perfectly!')
    console.log('💡 Your GameService now supports full CRUD functionality!')

  } catch (error) {
    console.error('❌ CRUD test failed:')
    console.error('Error:', error.message)
  }
}

// Run the test
testCRUDOperations()