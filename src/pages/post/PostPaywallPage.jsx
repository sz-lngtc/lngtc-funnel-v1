import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PostPaywallPage.module.css'

const PLANS = [
  { id: '1m', label: '1 month', price: '$19.99', period: '/ month', note: 'Cancel anytime', save: null },
  { id: '3m', label: '3 months', price: '$15.99', period: '/ month', total: 'Billed $47.97 every 3 months', save: 'Save 20%' },
  { id: '12m', label: '12 months', price: '$11.99', period: '/ month', total: 'Billed $143.88 every 12 months', save: 'Save 40%' },
]

const BENEFITS = [
  { text: 'A clear view of your longevity profile and trajectory.', icon: 'target' },
  { text: 'A personalized journey to improvement, designed for your unique needs.', icon: 'journey' },
  { text: 'Clear focus areas — not overwhelm, so you know exactly where to put your attention.', icon: 'focus' },
  { text: 'Support for long-term consistency, with a guided journey that fits real life.', icon: 'heart' },
]

export function PostPaywallPage() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState('3m')

  const handleUnlock = () => {
    // TODO: open checkout (Stripe) with selectedPlan
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
        <h1 className={styles.title}>Unlock your personalized Longevity Journey</h1>
        <p className={styles.description}>
          The Longetic program delivers daily clarity, guided support, and long-term consistency in one simple app.
        </p>

        <ul className={styles.benefits}>
          {BENEFITS.map((b, i) => (
            <li key={i} className={styles.benefit}>
              <span className={styles.benefitIcon} aria-hidden>
                {b.icon === 'target' && <TargetIcon />}
                {b.icon === 'journey' && <JourneyIcon />}
                {b.icon === 'focus' && <FocusIcon />}
                {b.icon === 'heart' && <HeartIcon />}
              </span>
              <span>{b.text}</span>
            </li>
          ))}
        </ul>

        <div className={styles.heroImage} aria-hidden>
          <div className={styles.heroPlaceholder} />
        </div>

        <h2 className={styles.plansTitle}>Your Path to Great Health Daily. Choose one for yourself!</h2>

        <div className={styles.plans}>
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              type="button"
              className={selectedPlan === plan.id ? styles.planSelected : styles.plan}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {selectedPlan === plan.id && (
                <span className={styles.planCheck} aria-hidden>
                  <CheckIcon />
                </span>
              )}
              {plan.save && (
                <span className={styles.planSave}>{plan.save}</span>
              )}
              <span className={styles.planLabel}>{plan.label}</span>
              <span className={styles.planPrice}>
                {plan.price}{plan.period}
              </span>
              {plan.total && (
                <span className={styles.planTotal}>{plan.total}</span>
              )}
              {plan.note && !plan.total && (
                <span className={styles.planNote}>{plan.note}</span>
              )}
            </button>
          ))}
        </div>

        <button type="button" className={styles.ctaPrimary} onClick={handleUnlock}>
          Unlock my Longevity Journey
        </button>

        <p className={styles.postCta}>
          You can cancel your subscription at any time within your account settings.
        </p>
        <p className={styles.postCta}>
          Payment will be charged to your iTunes/Google Play Account at confirmation of purchase.
        </p>

        <footer className={styles.footer}>
          <span>
            <a href="/terms" className={styles.footerLink}>Terms of Use</a>
            <span className={styles.footerDot}> • </span>
            <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
            <span className={styles.footerDot}> • </span>
            <button type="button" className={styles.footerLinkBtn}>Restore Purchase</button>
          </span>
          <p className={styles.copyright}>2024 Longetic. All rights reserved.</p>
        </footer>
      </div>
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

function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function JourneyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function FocusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
