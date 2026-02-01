import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FunnelLayout } from './layout/FunnelLayout'
import { PostFunnelLayout } from './layout/PostFunnelLayout'
import { IntroPage } from './pages/IntroPage'
import { DOBPage } from './pages/DOBPage'
import { QuestionPage } from './pages/QuestionPage'
import { SectionBreakPage } from './pages/SectionBreakPage'
import { ResultPage } from './pages/ResultPage'
import { PostToolsPage } from './pages/post/PostToolsPage'
import { PostTimePage } from './pages/post/PostTimePage'
import { PostValuePage } from './pages/post/PostValuePage'
import { PostReadyPage } from './pages/post/PostReadyPage'
import { PostLoaderPage } from './pages/post/PostLoaderPage'
import { PostReflectionPage } from './pages/post/PostReflectionPage'
import { PostEmailPage } from './pages/post/PostEmailPage'
import { PostNamePage } from './pages/post/PostNamePage'
import { PostPreviewPage } from './pages/post/PostPreviewPage'
import { PostPaywallPage } from './pages/post/PostPaywallPage'
import { PostCheckoutPage } from './pages/post/PostCheckoutPage'
import { JourneyLmsPage } from './pages/post/JourneyLmsPage'
import { LegalPage } from './pages/LegalPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FunnelLayout />}>
          <Route index element={<IntroPage />} />
          <Route path="terms" element={<LegalPage />} />
          <Route path="privacy" element={<LegalPage />} />
          <Route path="restore" element={<LegalPage />} />
          <Route path="money-back" element={<LegalPage />} />
          <Route path="dob" element={<DOBPage />} />
          <Route path="section-break/:blockIndex" element={<SectionBreakPage />} />
          <Route path="q/:stepIndex" element={<QuestionPage />} />
          <Route path="result" element={<ResultPage />} />
          <Route path="post" element={<PostFunnelLayout />}>
            <Route path="tools" element={<PostToolsPage />} />
            <Route path="time" element={<PostTimePage />} />
            <Route path="value" element={<PostValuePage />} />
            <Route path="ready" element={<PostReadyPage />} />
            <Route path="loader" element={<PostLoaderPage />} />
            <Route path="reflection" element={<PostReflectionPage />} />
            <Route path="email" element={<PostEmailPage />} />
            <Route path="name" element={<PostNamePage />} />
            <Route path="preview" element={<PostPreviewPage />} />
            <Route path="paywall" element={<PostPaywallPage />} />
            <Route path="checkout" element={<PostCheckoutPage />} />
            <Route path="journey" element={<JourneyLmsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
