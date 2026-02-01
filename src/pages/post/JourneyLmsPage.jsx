import { useNavigate } from 'react-router-dom'
import styles from './JourneyLmsPage.module.css'

export function JourneyLmsPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Back">
          <BackIcon />
        </button>
        <span className={styles.headerTitle}>Longetic</span>
        <span className={styles.headerSpacer} aria-hidden />
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Journey LMS</h1>
        <p className={styles.subtitle}>mockup</p>
      </main>
    </div>
  )
}

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}
