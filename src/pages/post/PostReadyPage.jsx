import { useNavigate } from 'react-router-dom'
import styles from './PostShared.module.css'

export function PostReadyPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Are you ready to take the first step toward boosting your longevity?</h1>
      <div className={styles.buttonRow}>
        <button
          type="button"
          className={styles.ctaSecondary}
          onClick={() => navigate('/post/tools', { replace: true })}
        >
          No
        </button>
        <button
          type="button"
          className={styles.ctaPrimary}
          onClick={() => navigate('/post/loader', { replace: true })}
        >
          Yes
        </button>
      </div>
    </div>
  )
}
