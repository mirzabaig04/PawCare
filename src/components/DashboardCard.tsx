interface DashboardCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

export default function DashboardCard({ title, description, icon, href }: DashboardCardProps) {
  return (
    <a
      href={href}
      className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300"
    >
      <div className="text-4xl mb-4 text-blue-500">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </a>
  )
}
