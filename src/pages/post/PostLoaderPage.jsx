import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOADER_STEPS } from '../../data/postFunnel'
import styles from './PostLoaderPage.module.css'

const STEP_DURATION_MS = 1800

export function PostLoaderPage() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (stepIndex >= LOADER_STEPS.length) {
      navigate('/post/reflection', { replace: true })
      return
    }
    const step = LOADER_STEPS[stepIndex]
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(1, elapsed / STEP_DURATION_MS)
      setPercent(Math.round(step.percent * progress))
    }, 100)
    const timeout = setTimeout(() => {
      clearInterval(interval)
      setPercent(step.percent)
      setStepIndex((i) => i + 1)
    }, STEP_DURATION_MS)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [stepIndex, navigate])

  if (stepIndex >= LOADER_STEPS.length) {
    return null
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>We are creating your personalised longevity journey…</h1>
      <div className={styles.steps}>
        {LOADER_STEPS.map((s, i) => (
          <div key={i} className={styles.stepRow}>
            <span className={styles.stepLabel}>{s.label}</span>
            <span className={styles.stepPercent}>
              {i < stepIndex ? s.percent : i === stepIndex ? percent : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
