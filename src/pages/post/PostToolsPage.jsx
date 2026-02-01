import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnswers } from '../../context/AnswersContext'
import { TOOLS_OPTIONS } from '../../data/postFunnel'
import styles from './PostShared.module.css'

const ANSWER_ID = 'post_tools'

export function PostToolsPage() {
  const navigate = useNavigate()
  const { answers, setAnswer } = useAnswers()
  const [selected, setSelected] = useState(Array.isArray(answers[ANSWER_ID]) ? answers[ANSWER_ID] : [])

  const toggle = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const handleContinue = () => {
    setAnswer(ANSWER_ID, selected)
    navigate('/post/time', { replace: true })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Which tools are currently part of your health routine?</h1>
      <p className={styles.hint}>Select all that apply</p>
      <div className={styles.options}>
        {TOOLS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={selected.includes(opt.value) ? styles.optionActive : styles.option}
            onClick={() => toggle(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <button type="button" className={styles.ctaPrimary} onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}
