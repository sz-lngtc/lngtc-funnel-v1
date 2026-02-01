import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnswers } from '../../context/AnswersContext'
import { calculateLongevityScore } from '../../utils/score'
import { submitFunnelPayload } from '../../api'
import styles from './PostShared.module.css'

const ANSWER_ID = 'post_name'

export function PostNamePage() {
  const navigate = useNavigate()
  const { answers, setAnswer } = useAnswers()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) {
      setError('Please enter your name.')
      return
    }
    setError('')
    setAnswer(ANSWER_ID, trimmed)
    const payload = { ...answers, [ANSWER_ID]: trimmed }
    const score = calculateLongevityScore(payload)
    setSaving(true)
    try {
      await submitFunnelPayload({ answers: payload, score })
      navigate('/post/preview', { replace: true })
    } catch (err) {
      setError('Could not save. Please try again.')
      setSaving(false)
    }
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
        <button type="submit" className={styles.ctaPrimary} disabled={saving}>
          {saving ? 'Saving…' : 'Continue'}
        </button>
      </form>
    </div>
  )
}
