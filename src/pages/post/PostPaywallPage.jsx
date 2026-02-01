import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAnswers } from '../../context/AnswersContext'
import { calculateLongevityScore } from '../../utils/score'
import {
  getScoreBand,
  getFocusAreas,
  PAYWALL_BUNDLES,
  PAYWALL_RESULTS_STATS,
  PAYWALL_BENEFITS,
  PAYWALL_FAQ,
  PAYWALL_REVIEWS,
} from '../../data/postFunnel'
import styles from './PostPaywallPage.module.css'

const YEAR = 2026

export function PostPaywallPage() {
  const navigate = useNavigate()
  const { answers } = useAnswers()
  const score = calculateLongevityScore(answers)
  const band = getScoreBand(score)
  const focusAreas = getFocusAreas()
  const name = answers.post_name || 'there'
  const promoCode = `${name}${YEAR}`

  const [selectedBundle, setSelectedBundle] = useState('4week')
  const [expandedFaq, setExpandedFaq] = useState(null)

  const handleGetPlan = () => {
    navigate('/post/checkout', { state: { bundleId: selectedBundle } })
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Back">
          <BackIcon />
        </button>
        <span className={styles.headerTitle}>Longetic</span>
        <span className={styles.headerSpacer} aria-hidden />
      </header>

      <div className={styles.scroll}>
        {/* Block 1 — Now vs Goal */}
        <section className={styles.block} aria-labelledby="block1-title">
          <h2 id="block1-title" className={styles.blockTitle}>Now vs Goal</h2>
          <div className={styles.nowVsGoal}>
            <div className={styles.nowVsGoalSide}>
              <p className={styles.nowVsGoalLabel}>Physical resilience</p>
              <p className={styles.nowVsGoalValue}>Weak</p>
              <div className={styles.nowVsGoalBar} role="img" aria-label="1 of 4">
                <span className={styles.nowVsGoalSegmentFilled} />
                <span className={styles.nowVsGoalSegment} />
                <span className={styles.nowVsGoalSegment} />
                <span className={styles.nowVsGoalSegment} />
              </div>
              <div className={styles.nowVsGoalDivider} aria-hidden />
            </div>
            <div className={styles.nowVsGoalSide}>
              <p className={styles.nowVsGoalLabel}>Physical resilience</p>
              <p className={styles.nowVsGoalValueStrong}>Strong</p>
              <div className={styles.nowVsGoalBar} role="img" aria-label="3 of 4">
                <span className={styles.nowVsGoalSegmentFilled} />
                <span className={styles.nowVsGoalSegmentFilled} />
                <span className={styles.nowVsGoalSegmentFilled} />
                <span className={styles.nowVsGoalSegment} />
              </div>
              <div className={styles.nowVsGoalDivider} aria-hidden />
            </div>
          </div>
        </section>

        {/* Block 2 — Unlock your personalized Longetic Journey */}
        <section className={styles.block} aria-labelledby="block2-title">
          <h2 id="block2-title" className={styles.blockTitle}>Unlock your personalized Longetic Journey</h2>
          <p className={styles.block2Desc}>
            Personalised Longetic Journey built from your longevity score, focus areas, and strengths, and designed to improve your longevity score through consistent daily actions.
          </p>
          <div className={styles.block2Visuals}>
            {score != null && (
              <div className={styles.block2Score} style={{ ['--score-color']: band?.color }}>
                <span className={styles.block2ScoreLabel}>Longevity Score</span>
                <span className={styles.block2ScoreValue}>{score}/100</span>
              </div>
            )}
            <div className={styles.block2Focus} aria-label="Focus Areas diagram">
              <div className={styles.focusDiagram}>
                <div className={styles.focusDiagramCenter}>
                  <span className={styles.focusDiagramCenterLabel}>Focus Areas</span>
                </div>
                {focusAreas.slice(0, 4).map((area, i) => {
                  const posClass = styles[`focusSegmentPos${i}`]
                  const catClass = styles[`focusSegmentCat${[2, 1, 2, 0][i]}`]
                  return (
                    <div key={i} className={`${styles.focusDiagramSegment} ${posClass} ${catClass}`}>
                      <span className={styles.focusDiagramSegmentLabel}>{area}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Block 3 — Your personalized plan is ready */}
        <section className={styles.block} aria-labelledby="block3-title">
          <h2 id="block3-title" className={styles.blockTitle}>Your personalized Longevity Journey is ready</h2>
          <p className={styles.promoLine}>Your promo code is applied!</p>
          <p className={styles.promoCode}>{promoCode}</p>
          <p className={styles.bundlesInfo}>People using the plan for 4 weeks achieve twice as much as those using it for 1 week.</p>
          <p className={styles.bundlesDisclaimer}>*According to the research by Longetic Team</p>

          <div className={styles.bundles}>
            {PAYWALL_BUNDLES.map((b) => (
              <button
                key={b.id}
                type="button"
                className={selectedBundle === b.id ? styles.bundleSelected : styles.bundle}
                onClick={() => setSelectedBundle(b.id)}
              >
                {selectedBundle === b.id && <span className={styles.bundleCheck}><CheckIcon /></span>}
                {b.subtitle && <span className={styles.bundleBadge}>{b.subtitle}</span>}
                <span className={styles.bundleLabel}>{b.label}</span>
                <span className={styles.bundlePrice}>
                  <span className={styles.bundlePriceIntro}>Intro price</span>
                  <span className={styles.bundleDiscountBadge} aria-hidden><DiscountIcon /></span>
                  <span className={styles.bundlePriceOriginal}>{b.originalPrice}</span>
                  <span className={styles.bundlePriceArrow}>→</span>
                  <span className={styles.bundlePriceValue}>{b.introPrice}</span>
                  <span className={styles.bundlePricePerDay}>{b.introPerDay}</span>
                </span>
              </button>
            ))}
          </div>

          <p className={styles.bundleLegalSingle}>
            {PAYWALL_BUNDLES.find((b) => b.id === selectedBundle)?.legal}
          </p>

          <button type="button" className={styles.ctaPrimary} onClick={handleGetPlan}>
            Get my plan
          </button>
        </section>

        {/* Block 4 — Inspirational / Longevity trajectory */}
        <section className={styles.block} aria-labelledby="block4-title">
          <h2 id="block4-title" className={styles.blockTitle}>What this journey is designed to</h2>
          <ul className={styles.block4List}>
            <li>Improve your longevity score over time</li>
            <li>Stabilize energy and recovery</li>
            <li>Build habits that support long-term health</li>
          </ul>
          <div className={styles.block4Trajectory}>
            <p className={styles.block4TrajectoryTitle}>Longevity trajectory</p>
            <p className={styles.block4TrajectoryText}>
              Current score vs potential with daily actions — consistent daily actions can lead to the first meaningful changes within ~4 weeks.
            </p>
            {score != null && (
              <div className={styles.block4TrajectoryVisual}>
                <span>Now: {score}</span>
                <span className={styles.trajectoryArrow}>→</span>
                <span>Potential: higher with daily actions</span>
              </div>
            )}
          </div>
        </section>

        {/* Block 5 — People like you are seeing results */}
        <section className={styles.block} aria-labelledby="block5-title">
          <h2 id="block5-title" className={styles.blockTitle}>People like you are seeing results</h2>
          <p className={styles.block5Sub}>People just like you achieved great results using personalised Longetic Journey</p>
          <div className={styles.resultsGraph} aria-hidden>
            <div className={styles.resultsGraphBar} style={{ height: '72%' }} />
            <div className={styles.resultsGraphBar} style={{ height: '61%' }} />
            <div className={styles.resultsGraphBar} style={{ height: '54%' }} />
          </div>
          <ul className={styles.resultsStats}>
            {PAYWALL_RESULTS_STATS.map((s, i) => (
              <li key={i} className={styles.resultStat}>
                <strong>{s.percent}%</strong> {s.text}
              </li>
            ))}
          </ul>
        </section>

        {/* Block 6 — Discover the benefits */}
        <section className={styles.block} aria-labelledby="block6-title">
          <h2 id="block6-title" className={styles.blockTitle}>Discover the benefits with Longetic Journey</h2>
          <p className={styles.block6Sub}>Discover benefits with the Longetic Journey</p>
          <ul className={styles.benefitsList}>
            {PAYWALL_BENEFITS.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        </section>

        {/* Block 7 — FAQ */}
        <section className={styles.block} aria-labelledby="block7-title">
          <h2 id="block7-title" className={styles.blockTitle}>People often ask</h2>
          <div className={styles.faq}>
            {PAYWALL_FAQ.map((item, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  aria-expanded={expandedFaq === i}
                >
                  {item.q}
                  <span className={styles.faqIcon}>{expandedFaq === i ? '−' : '+'}</span>
                </button>
                {expandedFaq === i && <p className={styles.faqAnswer}>{item.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Block 8 — User reviews */}
        <section className={styles.block} aria-labelledby="block8-title">
          <h2 id="block8-title" className={styles.blockTitle}>Users love Longetic</h2>
          <ul className={styles.reviews}>
            {PAYWALL_REVIEWS.map((r, i) => (
              <li key={i} className={styles.review}>
                <p className={styles.reviewText}>"{r.text}"</p>
                <p className={styles.reviewName}>{r.name}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Block 9 — Your personalized plan is ready (same as Block 3) */}
        <section className={styles.block} aria-labelledby="block9-title">
          <h2 id="block9-title" className={styles.blockTitle}>Your personalized Longevity Journey is ready</h2>
          <p className={styles.promoLine}>Your promo code is applied!</p>
          <p className={styles.promoCode}>{promoCode}</p>
          <div className={styles.bundles}>
            {PAYWALL_BUNDLES.map((b) => (
              <button
                key={b.id}
                type="button"
                className={selectedBundle === b.id ? styles.bundleSelected : styles.bundle}
                onClick={() => setSelectedBundle(b.id)}
              >
                {selectedBundle === b.id && <span className={styles.bundleCheck}><CheckIcon /></span>}
                {b.subtitle && <span className={styles.bundleBadge}>{b.subtitle}</span>}
                <span className={styles.bundleLabel}>{b.label}</span>
                <span className={styles.bundlePrice}>
                  <span className={styles.bundlePriceIntro}>Intro price</span>
                  <span className={styles.bundleDiscountBadge} aria-hidden><DiscountIcon /></span>
                  <span className={styles.bundlePriceOriginal}>{b.originalPrice}</span>
                  <span className={styles.bundlePriceArrow}>→</span>
                  <span className={styles.bundlePriceValue}>{b.introPrice}</span>
                  <span className={styles.bundlePricePerDay}>{b.introPerDay}</span>
                </span>
              </button>
            ))}
          </div>
          <p className={styles.bundleLegalSingle}>
            {PAYWALL_BUNDLES.find((b) => b.id === selectedBundle)?.legal}
          </p>
          <button type="button" className={styles.ctaPrimary} onClick={handleGetPlan}>
            Get my plan
          </button>
        </section>

        {/* Block 10 — 30-day money-back guarantee */}
        <section className={styles.block} aria-labelledby="block10-title">
          <h2 id="block10-title" className={styles.blockTitle}>30-day money-back guarantee</h2>
          <p className={styles.guaranteeText}>
            We believe that Longetic Journey may work for you and you'll feel positive changes in just 4 weeks! We even are ready to return your money back if you don't see results and can demonstrate that you followed our plan.
          </p>
          <p className={styles.guaranteeLink}>
            Find more about applicable limitations in our <Link to="/money-back" className={styles.inlineLink}>money-back policy</Link>.
          </p>
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerRow}>
          <Link to="/terms" className={styles.footerLink}>Terms of Use</Link>
          <span className={styles.footerDot}> • </span>
          <Link to="/privacy" className={styles.footerLink}>Privacy Policy</Link>
          <span className={styles.footerDot}> • </span>
          <Link to="/restore" className={styles.footerLink}>Restore Purchase</Link>
        </div>
        <p className={styles.copyright}>2026 Longetic. All rights reserved.</p>
      </footer>
    </div>
  )
}

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function DiscountIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  )
}
