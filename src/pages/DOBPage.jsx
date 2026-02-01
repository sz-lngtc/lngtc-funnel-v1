import { useNavigate } from 'react-router-dom'
import { useAnswers } from '../context/AnswersContext'
import { AgeGroupIllustration } from '../components/AgeGroupIllustration'
import { AGE_GROUP_PAGE } from '../data/questions'
import styles from './DOBPage.module.css'

const AGE_GROUP_ANSWER_ID = 'ageGroup'

export function DOBPage() {
  const navigate = useNavigate()
  const { setAnswer } = useAnswers()

  const handleSelect = (value) => {
    setAnswer(AGE_GROUP_ANSWER_ID, value)
    navigate('/q/2', { replace: true })
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.headline}>{AGE_GROUP_PAGE.headline}</h1>
        <div className={styles.grid}>
          {AGE_GROUP_PAGE.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={styles.ageCard}
              onClick={() => handleSelect(opt.value)}
            >
              <span className={styles.illustration}>
                <AgeGroupIllustration variant={opt.value} />
              </span>
              <span className={styles.label}>{opt.label}</span>
              <span className={styles.icon} aria-hidden>
                <ArrowIcon />
              </span>
            </button>
          ))}
        </div>
        <p className={styles.trust}>{AGE_GROUP_PAGE.trustBlock}</p>
      </div>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
