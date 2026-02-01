import { QUESTIONS, QUESTION_TYPES } from '../data/questions'

/**
 * Compute Longevity / Energy Score (0–100) from answers.
 * SINGLE: use option.score; MULTIPLE: use average of selected option scores (or "none" score);
 * INPUT_*: skip or treat as neutral.
 */
export function calculateLongevityScore(answers) {
  if (!answers || Object.keys(answers).length === 0) return null

  let sum = 0
  let count = 0

  QUESTIONS.forEach((q) => {
    const raw = answers[q.id]
    if (raw == null) return

    let normalized
    if (q.type === QUESTION_TYPES.SINGLE) {
      const opt = q.options?.find((o) => o.value === raw)
      const score = opt ? opt.score : raw
      if (typeof score !== 'number') return
      normalized = (score - 1) / 4
    } else if (q.type === QUESTION_TYPES.MULTIPLE) {
      const selected = Array.isArray(raw) ? raw : [raw]
      if (selected.length === 0) return
      const scores = selected
        .map((v) => q.options?.find((o) => o.value === v)?.score)
        .filter((s) => typeof s === 'number')
      if (scores.length === 0) return
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length
      normalized = (avg - 1) / 4
    } else if (q.type === QUESTION_TYPES.INPUT_HEIGHT || q.type === QUESTION_TYPES.INPUT_WEIGHT) {
      return
    } else {
      return
    }

    sum += Math.max(0, Math.min(1, normalized))
    count += 1
  })

  if (count === 0) return null
  return Math.round((sum / count) * 100)
}

export function getScoreLevel(score) {
  if (score == null) return { label: '—', color: 'var(--text-muted)', short: '—' }
  if (score >= 80) return { label: 'Excellent', color: 'var(--success)', short: 'Excellent' }
  if (score >= 60) return { label: 'Good', color: 'var(--accent)', short: 'Good' }
  if (score >= 40) return { label: 'Moderate', color: '#fbbf24', short: 'Moderate' }
  return { label: 'Room to improve', color: '#f87171', short: 'Improve' }
}
