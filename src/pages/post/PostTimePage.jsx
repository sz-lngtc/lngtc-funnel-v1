import { useNavigate } from 'react-router-dom'
import { useAnswers } from '../../context/AnswersContext'
import { TIME_OPTIONS } from '../../data/postFunnel'
import styles from './PostShared.module.css'

const ANSWER_ID = 'post_time'

export function PostTimePage() {
  const navigate = useNavigate()
  const { answers, setAnswer } = useAnswers()
  const selected = answers[ANSWER_ID]

  const handleSelect = (value) => {
    setAnswer(ANSWER_ID, value)
    navigate('/post/value', { replace: true })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>How much time can you dedicate to your longevity daily?</h1>
      <div className={styles.options}>
        {TIME_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={selected === opt.value ? styles.optionActive : styles.option}
            onClick={() => handleSelect(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
