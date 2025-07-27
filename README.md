# 🎮 GameVault

A personal gaming library showcase website to track your game collection, stats, and favorites with beautiful dark theme and interactive animations.

## ✨ Features

- **Gaming Library Management** - Track all your games across platforms
- **Progress Tracking** - Monitor completion percentage and hours played
- **Statistics Dashboard** - Comprehensive gaming analytics
- **Favorites Collection** - Curate your top games
- **Multi-Platform Support** - Steam, PlayStation, Xbox, Nintendo Switch, Epic Games
- **Dark Theme** - Gaming-focused dark interface
- **Interactive Animations** - Smooth transitions and hover effects

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **SQL Server** - Database management
- **MSSQL** - SQL Server driver for Node.js

### Database
- **Microsoft SQL Server** - Primary database
- **SQL Server Management Studio (SSMS)** - Database administration

## 📁 Project Structure

```
gamevault-project/
├── gamevault-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/              # Application pages
│   │   ├── styles/             # CSS and styling
│   │   └── utils/              # Helper functions
│   ├── public/                 # Static assets
│   └── package.json
│
├── gamevault-backend/           # Node.js backend API
│   ├── routes/                 # API route handlers
│   ├── models/                 # Database models
│   ├── middleware/             # Custom middleware
│   ├── config/                 # Configuration files
│   └── server.js               # Main server file
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **SQL Server** (Express or higher)
- **SQL Server Management Studio (SSMS)**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gamevault.git
   cd gamevault-project
   ```

2. **Setup Backend**
   ```bash
   cd gamevault-backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../gamevault-frontend
   npm install
   ```

4. **Database Setup**
   - Open SQL Server Management Studio (SSMS)
   - Create a new database named `GameVault`
   - Run the SQL scripts from `/database/schema.sql`

5. **Environment Configuration**
   
   Create `gamevault-backend/.env`:
   ```env
   PORT=5000
   DB_SERVER=your_server_name
   DB_DATABASE=GameVault
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_ENCRYPT=false
   DB_TRUST_CERT=true
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd gamevault-backend
   npm run dev
   ```
   Backend will run on: http://localhost:5000

2. **Start Frontend Application**
   ```bash
   cd gamevault-frontend
   npm run dev
   ```
   Frontend will run on: http://localhost:5173

## 📊 Database Schema

### Core Tables
- **Games** - Game information and metadata
- **Platforms** - Gaming platforms (Steam, PlayStation, etc.)
- **Genres** - Game genres and categories
- **GameStats** - Personal gaming statistics and progress
- **GamePlatforms** - Many-to-many relationship for games and platforms
- **GameGenres** - Many-to-many relationship for games and genres

## 🎯 Development Roadmap

### Phase 1: Foundation ✅
- [x] Project setup and configuration
- [x] Database schema design
- [x] Basic API structure
- [x] Frontend routing and layout

### Phase 2: Core Features (In Progress)
- [ ] Gaming library CRUD operations
- [ ] Game statistics tracking
- [ ] Search and filter functionality
- [ ] Responsive design implementation

### Phase 3: Advanced Features
- [ ] Dashboard with analytics
- [ ] Favorites management
- [ ] Interactive animations
- [ ] Image upload and management

### Phase 4: Enhancement
- [ ] API integrations (Steam, etc.)
- [ ] Export/Import functionality
- [ ] Performance optimization
- [ ] Testing and documentation

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for personal use and portfolio demonstration.

## 🎮 Screenshots

*Screenshots will be added as features are completed*

## 📞 Contact

**Developer**: [Your Name]
**Email**: your.email@example.com
**Portfolio**: [Your Portfolio URL]
**LinkedIn**: [Your LinkedIn URL]

---

⭐ **Star this repository if you find it helpful!**