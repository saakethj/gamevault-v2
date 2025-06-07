import { GameService } from '../../lib/services/gameService'

export default async function DashboardPage() {
  const profileId = 1

  try {
    const [stats, recentGames, favoriteGames] = await Promise.all([
      GameService.getGamingStats(profileId),
      GameService.getUserLibrary(profileId).then(games => games.slice(0, 5)),
      GameService.getFavoriteGames(profileId).then(games => games.slice(0, 4))
    ])

    return (
      <div>
        {/* Hero Section */}
        <div className="hero-gradient">
          <div className="container">
            <h1 className="hero-title">Welcome back, Red_Turtle! 🎮</h1>
            <p className="hero-subtitle">Your gaming journey continues</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">{stats.totalHoursPlayed}</div>
                <div className="hero-stat-label">Hours Played</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">{stats.completionRate}%</div>
                <div className="hero-stat-label">Completion Rate</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">{stats.favoriteGames}</div>
                <div className="hero-stat-label">Favorites</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-content">
                <div className="stat-info">
                  <h3>Total Games</h3>
                  <p className="stat-number blue">{stats.totalGames}</p>
                  <p className="stat-extra">In your library</p>
                </div>
                <div className="stat-icon blue">🎮</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-content">
                <div className="stat-info">
                  <h3>Completed</h3>
                  <p className="stat-number green">{stats.gamesCompleted}</p>
                  <p className="stat-extra">{stats.completionRate}% completion</p>
                </div>
                <div className="stat-icon green">✅</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-content">
                <div className="stat-info">
                  <h3>Hours Played</h3>
                  <p className="stat-number purple">{stats.totalHoursPlayed}</p>
                  <p className="stat-extra">{stats.avgHoursPerGame.toFixed(1)} avg/game</p>
                </div>
                <div className="stat-icon purple">⏰</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-content">
                <div className="stat-info">
                  <h3>Favorites</h3>
                  <p className="stat-number red">{stats.favoriteGames}</p>
                  <p className="stat-extra">Special games</p>
                </div>
                <div className="stat-icon red">⭐</div>
              </div>
            </div>
          </div>

          {/* Recent Games */}
          <div className="games-section">
            <h2 className="section-title">Recent Games</h2>
            <div>
              {recentGames.map((game) => (
                <div key={game.id} className="game-card">
                  <div className="game-icon">
                    {game.title.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <div className="game-details">
                      <span>💻 {game.platform}</span>
                      <span>📊 {game.progress}%</span>
                      <span>⏰ {game.hoursPlayed}h</span>
                    </div>
                    {game.progress > 0 && (
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${game.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="game-actions">
                    <span className={`status-badge status-${game.status.toLowerCase().replace(' ', '-')}`}>
                      {game.status}
                    </span>
                    {game.isFavorite && <span className="favorite-star">⭐</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="achievement-badge">
            <span className="achievement-icon">🏆</span>
            <h3 className="achievement-title">Gaming Completionist</h3>
            <p className="achievement-desc">{stats.completionRate}% completion rate!</p>
            <p className="achievement-extra">You finish what you start! 🎮</p>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading dashboard:', error)
    return (
      <div className="container" style={{ padding: '2rem' }}>
        <div style={{ 
          background: '#fef2f2', 
          border: '1px solid #fca5a5', 
          color: '#dc2626', 
          padding: '1rem', 
          borderRadius: '0.5rem' 
        }}>
          <h2 style={{ fontWeight: 'bold' }}>Error Loading Dashboard</h2>
          <p>There was an issue loading your gaming data. Please check your database connection.</p>
        </div>
      </div>
    )
  }
}