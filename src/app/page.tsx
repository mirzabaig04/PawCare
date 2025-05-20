'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white text-gray-800 p-4">
      <h1 className="text-4xl font-bold mb-4">🐾 Welcome to PawCare</h1>
      <p className="text-lg text-center max-w-lg mb-6">
        Your AI-powered pet management app. Sign in to manage your pets, chat with our AI, and identify breeds with a photo.
      </p>

      <SignedOut>
        <div className="flex space-x-4">
          <Link href="/sign-in">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <p className="mb-2">You're signed in!</p>
        <UserButton afterSignOutUrl="/" />
        <Link href="/dashboard" className="text-blue-600 underline mt-4">Go to Dashboard</Link>
      </SignedIn>
    </main>
  )
}
