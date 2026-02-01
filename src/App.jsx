import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FunnelLayout } from './layout/FunnelLayout'
import { IntroPage } from './pages/IntroPage'
import { DOBPage } from './pages/DOBPage'
import { QuestionPage } from './pages/QuestionPage'
import { SectionBreakPage } from './pages/SectionBreakPage'
import { ResultPage } from './pages/ResultPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FunnelLayout />}>
          <Route index element={<IntroPage />} />
          <Route path="dob" element={<DOBPage />} />
          <Route path="section-break/:blockIndex" element={<SectionBreakPage />} />
          <Route path="q/:stepIndex" element={<QuestionPage />} />
          <Route path="result" element={<ResultPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
