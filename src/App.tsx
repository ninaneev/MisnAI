import { Routes, Route } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import DailyPage from './pages/DailyPage'
import StrategyPage from './pages/StrategyPage'
import MilestonesPage from './pages/MilestonesPage'
import HistoryPage from './pages/HistoryPage'
import VisionPage from './pages/VisionPage'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DailyPage />} />
        <Route path="/strategy" element={<StrategyPage />} />
        <Route path="/milestones" element={<MilestonesPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/vision" element={<VisionPage />} />
      </Routes>
    </AppShell>
  )
}
