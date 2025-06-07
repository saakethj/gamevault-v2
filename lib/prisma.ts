// Database Client Singleton
// This creates ONE shared database connection for the entire app

import { PrismaClient } from '@prisma/client'

// This is a TypeScript trick to store the client globally during development
// It prevents creating multiple connections when Next.js hot-reloads
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create the database client
// In development: reuse existing connection if available
// In production: always create new connection
export const prisma = 
  globalForPrisma.prisma ?? 
  new PrismaClient({
    log: ['warn', 'error'], // Only show warnings and errors, not every query
  })

// In development, store the client globally so it's reused
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Export a function to safely disconnect when needed
export async function disconnectDatabase() {
  await prisma.$disconnect()
}