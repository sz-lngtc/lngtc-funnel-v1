import { useNavigate } from 'react-router-dom'
import { useAnswers } from '../context/AnswersContext'
import { calculateLongevityScore, getScoreLevel } from '../utils/score'
import styles from './ResultPage.module.css'

export function ResultPage() {
  const navigate = useNavigate()
  const { answers, clearAnswers } = useAnswers()
  const score = calculateLongevityScore(answers)
  const level = getScoreLevel(score)

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Ваш Longevity Score</h1>
        <div className={styles.scoreWrap} style={{ ['--score-color']: level.color }}>
          <span className={styles.score}>{score ?? '—'}</span>
          {score != null && <span className={styles.max}>/ 100</span>}
        </div>
        <p className={styles.level} style={{ color: level.color }}>
          {level.label}
        </p>
        <p className={styles.desc}>
          Цей показник відображає ваш поточний рівень енергії та звичок, пов’язаних з довголіттям. Longetic допоможе покращити результати за допомогою персональних рекомендацій з превентивної медицини.
        </p>
        <button
          type="button"
          className={styles.cta}
          onClick={() => {
            clearAnswers()
            navigate('/', { replace: true })
          }}
        >
          Пройти ще раз
        </button>
      </div>
    </div>
  )
}
