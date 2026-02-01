import { useNavigate, useLocation } from 'react-router-dom'
import styles from './LegalPage.module.css'

const LEGAL_PAGES = {
  terms: { title: 'Terms of Use' },
  privacy: { title: 'Privacy Policy' },
  restore: { title: 'Restore Purchase' },
  'money-back': { title: 'Money-back policy' },
}

export function LegalPage() {
  const navigate = useNavigate()
  const slug = useLocation().pathname.replace(/^\//, '') || 'terms'
  const page = LEGAL_PAGES[slug] || { title: 'Page' }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Back">
          <BackIcon />
        </button>
        <h1 className={styles.headerTitle}>{page.title}</h1>
        <span className={styles.headerSpacer} aria-hidden />
      </header>
      <main className={styles.main}>
        <p className={styles.body}>test</p>
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
