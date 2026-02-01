import { Outlet, useLocation } from 'react-router-dom'
import { AnswersProvider } from '../context/AnswersContext'
import { ProgressBar } from '../components/ProgressBar'
import styles from './FunnelLayout.module.css'

function FunnelLayoutInner() {
  const location = useLocation()
  const isQuestion = location.pathname.startsWith('/q/')
  const isSectionBreak = location.pathname.startsWith('/section-break/')
  const isIntro = location.pathname === '/'
  const isDob = location.pathname === '/dob'
  const showProgress = isIntro || isDob || isQuestion || isSectionBreak

  return (
    <div className={styles.layout}>
      {showProgress && <ProgressBar />}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export function FunnelLayout() {
  return (
    <AnswersProvider>
      <FunnelLayoutInner />
    </AnswersProvider>
  )
}
