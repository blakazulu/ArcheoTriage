import { Routes, Route } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Layout from './components/Layout'
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
        <Route index element={<Home />} />
        <Route path="guide" element={<Guide />} />
        <Route path="guide/:artifactId" element={<ArtifactDetail />} />
        <Route path="findings" element={<Findings />} />
        <Route path="findings/add" element={<AddFinding />} />
        <Route path="findings/:findingId" element={<FindingDetail />} />
        <Route path="education" element={<Education />} />
        <Route path="education/:lessonId" element={<LessonDetail />} />
        <Route path="education/:lessonId/quiz" element={<Quiz />} />
        <Route path="identify" element={<Identify />} />
      </Route>
    </Routes>
  )
}

export default App
