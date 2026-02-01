import { useNavigate } from 'react-router-dom'
import { useAnswers } from '../../context/AnswersContext'
import styles from './PostPreviewPage.module.css'

const ANSWER_ID = 'post_name'

export function PostPreviewPage() {
  const navigate = useNavigate()
  const { answers } = useAnswers()
  const name = answers[ANSWER_ID] || 'there'

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{name}, start feeling first results in just 4 weeks!</h1>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Longevity Progress</h2>
        <div className={styles.chartPlaceholder} aria-hidden>
          <div className={styles.chartBar} style={{ height: '30%' }} />
          <div className={styles.chartBar} style={{ height: '50%' }} />
          <div className={styles.chartBar} style={{ height: '70%' }} />
          <div className={styles.chartBar} style={{ height: '85%' }} />
        </div>
        <p className={styles.caption}>This chart is for illustrative purposes only</p>
      </section>
      <button
        type="button"
        className={styles.ctaPrimary}
        onClick={() => navigate('/post/paywall', { replace: true })}
      >
        Continue
      </button>
    </div>
  )
}
