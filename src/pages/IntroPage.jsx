import { useNavigate } from 'react-router-dom'
import { useAnswers } from '../context/AnswersContext'
import { INTRO } from '../data/questions'
import styles from './IntroPage.module.css'

const GENDER_ANSWER_ID = 'gender'

export function IntroPage() {
  const navigate = useNavigate()
  const { setAnswer } = useAnswers()

  const handleSelect = (value) => {
    setAnswer(GENDER_ANSWER_ID, value)
    navigate('/dob', { replace: true })
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <p className={styles.quizLabel}>{INTRO.quizLabel}</p>
        <h1 className={styles.headline}>{INTRO.headline}</h1>
        <h2 className={styles.subheadline}>{INTRO.subheadline}</h2>
        <div className={styles.ctaRow}>
          {INTRO.genderOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={styles.ctaCard}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className={styles.legal}>{INTRO.legalLine}</p>
        <p className={styles.disclaimer}>{INTRO.disclaimer}</p>
      </div>
    </div>
  )
}
