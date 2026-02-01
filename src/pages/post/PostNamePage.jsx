import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnswers } from '../../context/AnswersContext'
import styles from './PostShared.module.css'

const ANSWER_ID = 'post_name'

export function PostNamePage() {
  const navigate = useNavigate()
  const { setAnswer } = useAnswers()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) {
      setError('Please enter your name.')
      return
    }
    setError('')
    setAnswer(ANSWER_ID, trimmed)
    navigate('/post/preview', { replace: true })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>What's your name?</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          className={styles.input}
          placeholder="Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Name"
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.ctaPrimary}>
          Continue
        </button>
      </form>
    </div>
  )
}
