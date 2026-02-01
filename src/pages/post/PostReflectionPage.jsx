import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { REFLECTION_QUESTIONS } from '../../data/postFunnel'
import styles from './PostShared.module.css'

export function PostReflectionPage() {
  const navigate = useNavigate()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])

  const question = REFLECTION_QUESTIONS[questionIndex]
  const isLast = questionIndex >= REFLECTION_QUESTIONS.length - 1

  const handleAnswer = (value) => {
    const next = [...answers, value]
    setAnswers(next)
    if (isLast) {
      navigate('/post/email', { replace: true })
    } else {
      setQuestionIndex((i) => i + 1)
    }
  }

  if (!question) return null

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{question}</h1>
      <div className={styles.buttonRow}>
        <button
          type="button"
          className={styles.ctaSecondary}
          onClick={() => handleAnswer('no')}
        >
          No
        </button>
        <button
          type="button"
          className={styles.ctaPrimary}
          onClick={() => handleAnswer('yes')}
        >
          Yes
        </button>
      </div>
    </div>
  )
}
