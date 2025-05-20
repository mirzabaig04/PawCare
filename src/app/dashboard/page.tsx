'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import DashboardCard from '@/components/DashboardCard'
import { FaPaw, FaComments, FaImage } from 'react-icons/fa'

export default function Dashboard() {
  const { user } = useUser()

  if (!user) return <p>Loading...</p>

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.firstName || user.fullName}!</h1>
        <UserButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Pet Profiles"
          description="Manage your pets' profiles."
          icon={<FaPaw />}
          href="/dashboard/pets"
        />
        <DashboardCard
          title="Chatbot"
          description="Get AI guidance and support."
          icon={<FaComments />}
          href="/dashboard/chatbot"
        />
        <DashboardCard
          title="Breed Identification"
          description="Upload pet images to identify breeds."
          icon={<FaImage />}
          href="/dashboard/identify"
        />
      </div>
    </div>
  )
}
