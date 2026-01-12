import { Routes, Route } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Guide from './pages/Guide'
import ArtifactDetail from './pages/ArtifactDetail'
import Findings from './pages/Findings'
import AddFinding from './pages/AddFinding'
import FindingDetail from './pages/FindingDetail'
import Education from './pages/Education'
import LessonDetail from './pages/LessonDetail'
import Quiz from './pages/Quiz'
import Identify from './pages/Identify'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ErrorBoundary level="page"><Home /></ErrorBoundary>} />
        <Route path="guide" element={<ErrorBoundary level="page"><Guide /></ErrorBoundary>} />
        <Route path="guide/:artifactId" element={<ErrorBoundary level="page"><ArtifactDetail /></ErrorBoundary>} />
        <Route path="findings" element={<ErrorBoundary level="page"><Findings /></ErrorBoundary>} />
        <Route path="findings/add" element={<ErrorBoundary level="page"><AddFinding /></ErrorBoundary>} />
        <Route path="findings/:findingId" element={<ErrorBoundary level="page"><FindingDetail /></ErrorBoundary>} />
        <Route path="education" element={<ErrorBoundary level="page"><Education /></ErrorBoundary>} />
        <Route path="education/:lessonId" element={<ErrorBoundary level="page"><LessonDetail /></ErrorBoundary>} />
        <Route path="education/:lessonId/quiz" element={<ErrorBoundary level="page"><Quiz /></ErrorBoundary>} />
        <Route path="identify" element={<ErrorBoundary level="page"><Identify /></ErrorBoundary>} />
      </Route>
    </Routes>
  )
}

export default App
