'use client'

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">🐾 Sign in to PawCare</h1>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  )
}
