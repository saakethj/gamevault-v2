// GameService - Clean functions for all game-related operations
import { prisma } from '../prisma'

// Types for better code completion and error catching
export interface GameWithDetails {
  id: number
  title: string
  releaseYear?: number
  developer?: string
  publisher?: string
  genreName?: string
  coverImagePath?: string
  status: string
  platform: string
  progress: number
  isFavorite: boolean
  hoursPlayed: number
  rating?: number
  lastPlayed?: Date
  addedDate: Date
}

export interface GamingStats {
  totalGames: number
  gamesPlaying: number
  gamesCompleted: number
  favoriteGames: number
  totalHoursPlayed: number
  avgHoursPerGame: number
  avgRating: number
  completionRate: number
}

// Types for better code completion and error catching
export interface GameWithDetails {
  id: number
  title: string
  releaseYear?: number
  developer?: string
  publisher?: string
  genreName?: string
  coverImagePath?: string
  status: string
  platform: string
  progress: number
  isFavorite: boolean
  hoursPlayed: number
  rating?: number
  lastPlayed?: Date
  addedDate: Date
}

export interface GamingStats {
  totalGames: number
  gamesPlaying: number
  gamesCompleted: number
  favoriteGames: number
  totalHoursPlayed: number
  avgHoursPerGame: number
  avgRating: number
  completionRate: number
}

export class GameService {
  
  // Get user's complete game library with all details
  static async getUserLibrary(profileId: number): Promise<GameWithDetails[]> {
    try {
      const library = await prisma.gamerLibrary.findMany({
        where: { ProfileID: profileId },
        include: {
          game: true,
          status: true,
          platform: true
        },
        orderBy: { UpdatedAt: 'desc' }
      })

      // Transform the data into a clean format
      return library.map((entry: typeof library[number]) => ({
        id: entry.LibraryID,
        title: entry.game?.Title || 'Unknown Game',
        releaseYear: entry.game?.ReleaseYear || undefined,
        developer: entry.game?.Developer || undefined,
        publisher: entry.game?.Publisher || undefined,
        genreName: entry.game?.GenreName || undefined,
        coverImagePath: entry.game?.CoverImagePath || undefined,
        status: entry.status?.StatusName || 'Unknown',
        platform: entry.platform?.PlatformName || 'Unknown',
        progress: entry.Progress,
        isFavorite: entry.IsFavorite,
        hoursPlayed: Number(entry.HoursPlayed),
        rating: entry.Rating || undefined,
        lastPlayed: entry.LastPlayed || undefined,
        addedDate: entry.AddedDate
      }))
      
    } catch (error) {
      console.error('Error getting user library:', error)
      throw new Error('Failed to get user library')
    }
  }

  // Get gaming statistics for a user
  static async getGamingStats(profileId: number): Promise<GamingStats> {
    try {
      // Get basic counts and aggregations
      const [
        totalStats,
        statusCounts,
        favoriteCount,
        playingCount,
        completedCount
      ] = await Promise.all([
        // Total games and hours
        prisma.gamerLibrary.aggregate({
          where: { ProfileID: profileId },
          _count: { LibraryID: true },
          _sum: { HoursPlayed: true },
          _avg: { HoursPlayed: true, Rating: true }
        }),
        
        // Count by status
        prisma.gamerLibrary.groupBy({
          by: ['StatusID'],
          where: { ProfileID: profileId },
          _count: { LibraryID: true }
        }),
        
        // Favorite games count
        prisma.gamerLibrary.count({
          where: { ProfileID: profileId, IsFavorite: true }
        }),
        
        // Playing games count
        prisma.gamerLibrary.count({
          where: { 
            ProfileID: profileId,
            status: { StatusName: 'Playing' }
          }
        }),
        
        // Completed games count
        prisma.gamerLibrary.count({
          where: { 
            ProfileID: profileId,
            status: { StatusName: 'Completed' }
          }
        })
      ])

      const totalGames = totalStats._count.LibraryID
      
      return {
        totalGames,
        gamesPlaying: playingCount,
        gamesCompleted: completedCount,
        favoriteGames: favoriteCount,
        totalHoursPlayed: Number(totalStats._sum.HoursPlayed || 0),
        avgHoursPerGame: Number(totalStats._avg.HoursPlayed || 0),
        avgRating: Number(totalStats._avg.Rating || 0),
        completionRate: totalGames > 0 ? Math.round((completedCount / totalGames) * 100) : 0
      }
      
    } catch (error) {
      console.error('Error getting gaming stats:', error)
      throw new Error('Failed to get gaming statistics')
    }
  }

  // Get user's favorite games
  static async getFavoriteGames(profileId: number): Promise<GameWithDetails[]> {
    try {
      const favorites = await prisma.gamerLibrary.findMany({
        where: { 
          ProfileID: profileId,
          IsFavorite: true 
        },
        include: {
          game: true,
          status: true,
          platform: true
        },
        orderBy: { UpdatedAt: 'desc' }
      })

      return favorites.map((entry: typeof favorites[number]) => ({
        id: entry.LibraryID,
        title: entry.game?.Title || 'Unknown Game',
        releaseYear: entry.game?.ReleaseYear || undefined,
        developer: entry.game?.Developer || undefined,
        publisher: entry.game?.Publisher || undefined,
        genreName: entry.game?.GenreName || undefined,
        coverImagePath: entry.game?.CoverImagePath || undefined,
        status: entry.status?.StatusName || 'Unknown',
        platform: entry.platform?.PlatformName || 'Unknown',
        progress: entry.Progress,
        isFavorite: entry.IsFavorite,
        hoursPlayed: Number(entry.HoursPlayed),
        rating: entry.Rating || undefined,
        lastPlayed: entry.LastPlayed || undefined,
        addedDate: entry.AddedDate
      }))
      
    } catch (error) {
      console.error('Error getting favorite games:', error)
      throw new Error('Failed to get favorite games')
    }
  }

  // Get games by status (Playing, Completed, etc.)
  static async getGamesByStatus(profileId: number, statusName: string): Promise<GameWithDetails[]> {
    try {
      const games = await prisma.gamerLibrary.findMany({
        where: { 
          ProfileID: profileId,
          status: { StatusName: statusName }
        },
        include: {
          game: true,
          status: true,
          platform: true
        },
        orderBy: { UpdatedAt: 'desc' }
      })

      return games.map((entry: typeof games[number]) => ({
        id: entry.LibraryID,
        title: entry.game?.Title || 'Unknown Game',
        releaseYear: entry.game?.ReleaseYear || undefined,
        developer: entry.game?.Developer || undefined,
        publisher: entry.game?.Publisher || undefined,
        genreName: entry.game?.GenreName || undefined,
        coverImagePath: entry.game?.CoverImagePath || undefined,
        status: entry.status?.StatusName || 'Unknown',
        platform: entry.platform?.PlatformName || 'Unknown',
        progress: entry.Progress,
        isFavorite: entry.IsFavorite,
        hoursPlayed: Number(entry.HoursPlayed),
        rating: entry.Rating || undefined,
        lastPlayed: entry.LastPlayed || undefined,
        addedDate: entry.AddedDate
      }))
      
    } catch (error) {
      console.error(`Error getting games with status ${statusName}:`, error)
      throw new Error(`Failed to get ${statusName} games`)
    }
  }
  // Toggle favorite status for a game
  static async toggleFavorite(profileId: number, libraryId: number): Promise<boolean> {
    try {
      const entry = await prisma.gamerLibrary.findFirst({
        where: { 
          LibraryID: libraryId,
          ProfileID: profileId 
        }
      })

      if (!entry) {
        throw new Error('Game not found in your library')
      }

      const updatedEntry = await prisma.gamerLibrary.update({
        where: { LibraryID: libraryId },
        data: {
          IsFavorite: !entry.IsFavorite,
          UpdatedAt: new Date()
        }
      })

      // Log the activity
      await prisma.activityLog.create({
        data: {
          ProfileID: profileId,
          GameID: entry.GameID,
          ActivityType: updatedEntry.IsFavorite ? 'Added to Favorites' : 'Removed from Favorites',
          Details: updatedEntry.IsFavorite ? 'Game added to favorites' : 'Game removed from favorites'
        }
      })

      return updatedEntry.IsFavorite
      
    } catch (error) {
      console.error('Error toggling favorite:', error)
      throw new Error('Failed to toggle favorite status')
    }
  }

  // Update game progress and hours
  static async updateGameProgress(
    profileId: number, 
    libraryId: number, 
    progress: number, 
    hoursPlayed: number,
    statusName?: string
  ): Promise<void> {
    try {
      const entry = await prisma.gamerLibrary.findFirst({
        where: { 
          LibraryID: libraryId,
          ProfileID: profileId 
        }
      })

      if (!entry) {
        throw new Error('Game not found in your library')
      }

      // Determine status based on progress if not provided
      let statusId = entry.StatusID
      if (statusName) {
        const status = await prisma.gameStatus.findFirst({
          where: { StatusName: statusName }
        })
        statusId = status?.StatusID || entry.StatusID
      } else if (progress === 100) {
        const completedStatus = await prisma.gameStatus.findFirst({
          where: { StatusName: 'Completed' }
        })
        statusId = completedStatus?.StatusID || entry.StatusID
      } else if (progress > 0) {
        const playingStatus = await prisma.gameStatus.findFirst({
          where: { StatusName: 'Playing' }
        })
        statusId = playingStatus?.StatusID || entry.StatusID
      }

      await prisma.gamerLibrary.update({
        where: { LibraryID: libraryId },
        data: {
          Progress: progress,
          HoursPlayed: hoursPlayed,
          StatusID: statusId,
          LastPlayed: new Date(),
          UpdatedAt: new Date()
        }
      })

      // Log the activity
      await prisma.activityLog.create({
        data: {
          ProfileID: profileId,
          GameID: entry.GameID,
          ActivityType: progress === 100 ? 'Completed' : 'Updated Progress',
          Details: `Progress updated to ${progress}%, Hours: ${hoursPlayed}`
        }
      })
      
    } catch (error) {
      console.error('Error updating game progress:', error)
      throw new Error('Failed to update game progress')
    }
  }

  // Add rating to a game
  static async rateGame(profileId: number, libraryId: number, rating: number): Promise<void> {
    try {
      if (rating < 0 || rating > 10) {
        throw new Error('Rating must be between 0 and 10')
      }

      const entry = await prisma.gamerLibrary.findFirst({
        where: { 
          LibraryID: libraryId,
          ProfileID: profileId 
        }
      })

      if (!entry) {
        throw new Error('Game not found in your library')
      }

      await prisma.gamerLibrary.update({
        where: { LibraryID: libraryId },
        data: {
          Rating: rating,
          UpdatedAt: new Date()
        }
      })

      // Log the activity
      await prisma.activityLog.create({
        data: {
          ProfileID: profileId,
          GameID: entry.GameID,
          ActivityType: 'Rated Game',
          Details: `Game rated ${rating}/10`
        }
      })
      
    } catch (error) {
      console.error('Error rating game:', error)
      throw new Error('Failed to rate game')
    }
  }

  // Remove game from library
  static async removeGameFromLibrary(profileId: number, libraryId: number): Promise<void> {
    try {
      const entry = await prisma.gamerLibrary.findFirst({
        where: { 
          LibraryID: libraryId,
          ProfileID: profileId 
        },
        include: {
          game: { select: { Title: true } }
        }
      })

      if (!entry) {
        throw new Error('Game not found in your library')
      }

      await prisma.gamerLibrary.delete({
        where: { LibraryID: libraryId }
      })

      // Log the activity
      await prisma.activityLog.create({
        data: {
          ProfileID: profileId,
          GameID: entry.GameID,
          ActivityType: 'Removed from Library',
          Details: `${entry.game?.Title} removed from library`
        }
      })
      
    } catch (error) {
      console.error('Error removing game from library:', error)
      throw new Error('Failed to remove game from library')
    }
  }
}