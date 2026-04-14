import { Outlet } from 'react-router-dom'
import { Nav } from './Nav'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-dvh bg-bg-base">
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-6 max-w-4xl mx-auto w-full">
        <Outlet />
      </main>
      <Nav />
    </div>
  )
}
