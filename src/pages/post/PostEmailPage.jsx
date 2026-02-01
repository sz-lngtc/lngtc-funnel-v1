import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnswers } from '../../context/AnswersContext'
import styles from './PostShared.module.css'

const ANSWER_ID = 'post_email'

export function PostEmailPage() {
  const navigate = useNavigate()
  const { setAnswer } = useAnswers()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) {
      setError('Please enter your email.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setAnswer(ANSWER_ID, trimmed)
    navigate('/post/name', { replace: true })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Enter your email to get your personalised longevity journey</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Email"
        />
        <p className={styles.privacy}>
          We respect your privacy and are committed to protecting your personal data. Your data will be processed according to our Privacy Policy.
        </p>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.ctaPrimary}>
          Continue
        </button>
      </form>
    </div>
  )
}
