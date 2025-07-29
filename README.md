# GameVault

A personal gaming portfolio website to track your gaming favorites, progress, and statistics.

## 🎮 Project Overview

GameVault helps gamers organize their gaming library in one place. Track what you're currently playing, what you've completed, games on your wishlist, and view your gaming statistics - all with a clean, responsive interface.

## ✨ Features (MVP)

- **User Authentication** - Secure login/register system
- **Game Library Management** - Add, edit, and delete games from your collection
- **Progress Tracking** - Mark games as Playing, Completed, Wishlist, or Dropped
- **Rating System** - Rate your games from 1-5 stars
- **Search & Filter** - Find games quickly by title or filter by status
- **Statistics Dashboard** - View your gaming stats and completion rates
- **Responsive Design** - Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS v4
- **Backend:** Firebase
- **Database:** Cloud Firestore
- **Authentication:** Firebase Auth
- **Hosting:** Vercel/Netlify (planned)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gamevault.git
cd gamevault
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📁 Project Structure

```
gamevault/
├── public/                 # Static assets
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── firebase.js       # Firebase configuration
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Entry point
├── .env                  # Environment variables
└── README.md            # Project documentation
```

## 🎯 Development Roadmap

### Week 1: Foundation (Current)
- [x] Project setup with Vite + React + Tailwind v4
- [x] Firebase integration
- [ ] Basic authentication (login/register)
- [ ] Simple dashboard layout
- [ ] Basic routing setup

### Week 2: Core Features
- [ ] Game CRUD operations (Create, Read, Update, Delete)
- [ ] Game status management
- [ ] Search and filtering functionality
- [ ] Basic statistics dashboard

### Week 3: Polish & Launch
- [ ] UI/UX improvements
- [ ] Error handling and loading states
- [ ] Responsive design refinement
- [ ] Deployment setup
- [ ] Testing and bug fixes

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Design Philosophy

This project prioritizes functionality over aesthetics for the MVP. The focus is on:
- Clean, readable code
- Responsive design with Tailwind CSS
- Fast development iteration
- User-friendly interface with minimal learning curve

## 🤝 Contributing

This is a personal learning project, but feedback and suggestions are welcome! Feel free to:
- Report bugs or issues
- Suggest new features
- Share improvement ideas

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 Future Enhancements

- Social features (share achievements, friend system)
- Game cover images and screenshots
- Advanced statistics and analytics
- Mobile app version
- Integration with gaming platforms (Steam, Epic Games, etc.)
- Export/import functionality
- Dark/light theme toggle

---

**Built with ❤️ for gamers, by a gamer**