import { useNavigate } from 'react-router-dom'
import styles from './PostPaywallPage.module.css'

export function PostPaywallPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Unlock your longevity journey</h1>
      <p className={styles.desc}>
        Get a guided journey, daily clarity, and long-term consistency. No medical promises — just small steps that fit real life.
      </p>
      <button
        type="button"
        className={styles.ctaPrimary}
        onClick={() => {}}
      >
        Unlock my longevity journey
      </button>
      <button
        type="button"
        className={styles.ctaSecondary}
        onClick={() => navigate('/', { replace: true })}
      >
        Maybe later
      </button>
    </div>
  )
}
