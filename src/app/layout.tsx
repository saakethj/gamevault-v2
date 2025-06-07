import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GameVault - Red_Turtle\'s Gaming Portfolio',
  description: 'Track your gaming journey, progress, and achievements',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation */}
        <nav className="nav-bar">
          <div className="nav-content">
            <div className="nav-brand">
              <span style={{ fontSize: '1.75rem' }}>🎮</span>
              <div>
                <h1 className="nav-title">GameVault</h1>
                <p className="nav-subtitle">Red_Turtle's Portfolio</p>
              </div>
            </div>
            <div className="nav-links">
              <a href="/" className="active">Dashboard</a>
              <a href="#" style={{ opacity: 0.6, cursor: 'not-allowed' }}>Library</a>
              <a href="#" style={{ opacity: 0.6, cursor: 'not-allowed' }}>Statistics</a>
              <a href="#" style={{ opacity: 0.6, cursor: 'not-allowed' }}>Wishlist</a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p>&copy; 2025 GameVault - Red_Turtle's Gaming Portfolio</p>
            <p className="footer-extra">Built with Next.js & Modern CSS</p>
          </div>
        </footer>
      </body>
    </html>
  )
}