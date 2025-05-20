'use client'

import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-600">🐾 Join PawCare</h1>
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </div>
    </div>
  )
}
