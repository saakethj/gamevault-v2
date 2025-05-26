// src/components/GameCard.tsx
'use client'
import { motion } from 'framer-motion'
import { Star, Play, Check } from 'lucide-react'

export function GameCard({ game }: { game: Game }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="bg-card rounded-lg overflow-hidden shadow-lg"
    >
      {/* Game card content with animations */}
    </motion.div>
  )
}