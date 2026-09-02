import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { LinksPage } from './pages/LinksPage'
import { OperatorPage } from './pages/OperatorPage'
import { OverviewPage } from './pages/OverviewPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/operators/:id" element={<OperatorPage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
