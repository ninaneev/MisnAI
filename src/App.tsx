import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/layout/Layout'
import DailyPage from './pages/DailyPage'
import StrategyPage from './pages/StrategyPage'
import MilestonesPage from './pages/MilestonesPage'
import HistoryPage from './pages/HistoryPage'
import VisionPage from './pages/VisionPage'
import DecisionsPage from './pages/DecisionsPage'
import SettingsPage from './pages/SettingsPage'
import OnboardingPage from './pages/OnboardingPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 1000 * 60 * 5 },
  },
})

const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,          element: <DailyPage /> },
      { path: 'strategy',     element: <StrategyPage /> },
      { path: 'milestones',   element: <MilestonesPage /> },
      { path: 'vision',       element: <VisionPage /> },
      { path: 'decisions',    element: <DecisionsPage /> },
      { path: 'history',      element: <HistoryPage /> },
      { path: 'settings',     element: <SettingsPage /> },
    ],
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
