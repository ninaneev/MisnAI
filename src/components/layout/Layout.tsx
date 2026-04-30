import { Navigate, Outlet } from 'react-router-dom'
import { useUserStore } from '../../stores/userStore'
import { Nav } from './Nav'

export default function Layout() {
  const { profile } = useUserStore()

  if (!profile.onboardingComplete) {
    return <Navigate to="/onboarding" replace />
  }

  return (
    <div className="flex min-h-dvh flex-col bg-transparent md:flex-row">
      <Nav />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-6 md:px-8 md:pb-10">
        <Outlet />
      </main>
    </div>
  )
}
