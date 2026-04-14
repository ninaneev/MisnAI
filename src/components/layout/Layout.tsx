import { Navigate, Outlet } from 'react-router-dom'
import { useUserStore } from '../../stores/userStore'
import { Nav } from './Nav'

export default function Layout() {
  const { profile } = useUserStore()

  if (!profile.onboardingComplete) {
    return <Navigate to="/onboarding" replace />
  }

  return (
    <div className="flex flex-col min-h-dvh bg-bg-base">
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-6 max-w-4xl mx-auto w-full">
        <Outlet />
      </main>
      <Nav />
    </div>
  )
}
