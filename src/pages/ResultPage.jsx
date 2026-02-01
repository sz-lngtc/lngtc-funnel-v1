import { useNavigate } from 'react-router-dom'
import { useAnswers } from '../context/AnswersContext'
import { calculateLongevityScore } from '../utils/score'
import {
  SCORE_BANDS,
  getScoreBand,
  getScoreExplanation,
  getFocusAreas,
} from '../data/postFunnel'
import styles from './ResultPage.module.css'

export function ResultPage() {
  const navigate = useNavigate()
  const { answers } = useAnswers()
  const score = calculateLongevityScore(answers)
  const band = getScoreBand(score)
  const explanation = getScoreExplanation(score)
  const focusAreas = getFocusAreas()

  // Position marker on scale: 0–100 → 0–100% (Low 0–25%, Average 25–50%, Medium 50–75%, Strong 75–100%)
  const scalePercent = score != null ? Math.min(100, Math.max(0, score)) : 50

  return (
    <div className={styles.page}>
      {/* Header: back arrow + title */}
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate('/')}
          aria-label="Back"
        >
          <BackIcon />
        </button>
        <h1 className={styles.headerTitle}>Your Longevity Score</h1>
        <span className={styles.headerSpacer} aria-hidden />
      </header>

      <div className={styles.card}>
        <h2 className={styles.title}>Your Longevity Score</h2>

        {/* X / 100 */}
        <div className={styles.scoreWrap} style={{ ['--score-color']: band?.color ?? 'var(--text-muted)' }}>
          <span className={styles.score}>{score ?? '—'}</span>
          {score != null && <span className={styles.max}>/ 100</span>}
        </div>

        {/* Visual scale: track + marker + bubble with band label */}
        <div className={styles.scaleBlock} role="img" aria-label={`Score band: ${band?.label ?? '—'}`}>
          <div className={styles.scaleTrack}>
            <div className={styles.scaleSegments}>
              {SCORE_BANDS.map((b) => (
                <span key={b.key} className={styles.scaleSegmentLabel}>
                  {b.label}
                </span>
              ))}
            </div>
            <div className={styles.scaleBar}>
              <div
                className={styles.scaleMarker}
                style={{ left: `${scalePercent}%` }}
              >
                {band && (
                  <span className={styles.scaleBubble}>{band.label}</span>
                )}
                <span className={styles.scaleDot} />
              </div>
            </div>
          </div>
        </div>

        {/* Score explanation block (card) */}
        <section className={styles.explanationCard}>
          <p className={styles.explanationText}>{explanation}</p>
        </section>

        {/* Focus areas: title + bullet list */}
        <section className={styles.focusSection}>
          <h3 className={styles.focusTitle}>FOCUS AREAS</h3>
          <ul className={styles.focusList}>
            {focusAreas.map((label) => (
              <li key={label} className={styles.focusItem}>
                {label}
              </li>
            ))}
          </ul>
        </section>

        <button
          type="button"
          className={styles.ctaPrimary}
          onClick={() => navigate('/post/tools', { replace: true })}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}
