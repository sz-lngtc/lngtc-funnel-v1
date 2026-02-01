import { useParams, useLocation } from 'react-router-dom'
import {
  FIRST_QUESTION_STEP,
  LAST_QUESTION_STEP,
  BLOCK_LAST_STEP,
} from '../data/questions'
import styles from './ProgressBar.module.css'

const TOTAL_QUESTION_STEPS = LAST_QUESTION_STEP - FIRST_QUESTION_STEP + 1

export function ProgressBar() {
  const location = useLocation()
  const { stepIndex, blockIndex } = useParams()
  const isQuestion = location.pathname.startsWith('/q/')
  const isSectionBreak = location.pathname.startsWith('/section-break/')
  const isDob = location.pathname === '/dob'

  let completed = 0
  if (location.pathname === '/') {
    completed = 0
  } else if (isDob) {
    completed = 0
  } else if (isQuestion && stepIndex != null) {
    const step = parseInt(stepIndex, 10)
    if (!Number.isNaN(step) && step >= FIRST_QUESTION_STEP && step <= LAST_QUESTION_STEP) {
      completed = step - FIRST_QUESTION_STEP + 1
    }
  } else if (isSectionBreak && blockIndex != null) {
    const bIdx = parseInt(blockIndex, 10)
    if (!Number.isNaN(bIdx) && bIdx >= 1 && bIdx <= BLOCK_LAST_STEP.length) {
      completed = BLOCK_LAST_STEP[bIdx - 1] - FIRST_QUESTION_STEP + 1
    }
  }

  const percent = Math.min(100, (completed / TOTAL_QUESTION_STEPS) * 100)

  return (
    <div
      className={styles.wrapper}
      role="progressbar"
      aria-valuenow={completed}
      aria-valuemin={0}
      aria-valuemax={TOTAL_QUESTION_STEPS}
    >
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
      <span className={styles.label}>
        {completed}/{TOTAL_QUESTION_STEPS}
      </span>
    </div>
  )
}
