import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAnswers } from '../../context/AnswersContext'
import styles from './PostCheckoutPage.module.css'

const BUNDLE_LABELS = { weekly: '1-week Plan', '4week': '4-Week Plan', '12week': '12-Week Plan' }

export function PostCheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { answers } = useAnswers()
  const email = answers.post_email || ''
  const bundleId = location.state?.bundleId || '4week'
  const bundleLabel = BUNDLE_LABELS[bundleId] || '4-Week Plan'

  const [step, setStep] = useState(0)
  const [emailValue, setEmailValue] = useState(email)
  const [emailError, setEmailError] = useState('')

  const handleContinue = () => {
    if (step === 0) setStep(1)
    else if (step === 1) setStep(2)
    else if (step === 2) {
      setEmailError('')
      setStep(3)
    }
    else if (step === 3) setStep(4)
  }

  const handleCreateAccount = () => setStep(2)
  const handleStartJourney = () => { navigate('/post/journey') }

  const showProgress = step >= 2 && step <= 4
  const progressSteps = [
    { key: 'create', label: 'Create account', labelShort: 'Account', done: step >= 2 },
    { key: 'offer', label: 'Sign up offer', labelShort: 'Offer', done: step >= 4 },
    { key: 'started', label: 'Get started!', labelShort: 'Start', done: false },
  ]
  if (step === 4) progressSteps[1].done = true

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backBtn} onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)} aria-label="Back">
          <BackIcon />
        </button>
        <span className={styles.headerTitle}>Longetic</span>
        <span className={styles.headerSpacer} aria-hidden />
      </header>

      <div className={styles.scroll}>
        {step === 0 && (
          <>
            <h1 className={styles.title}>Payment page mockup</h1>
            <button type="button" className={styles.cta} onClick={handleContinue}>
              Continue <ArrowIcon />
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <div className={styles.placeholderCircle} aria-hidden />
            <h1 className={styles.title}>Almost there</h1>
            <p className={styles.body}>
              Please proceed to the next page to create your account and gain access to your Longetic Journey
            </p>
            <div className={styles.infoBox}>
              <EnvelopeIcon />
              <span>You will also receive an email with login link after setting up your account.</span>
            </div>
            <button type="button" className={styles.cta} onClick={handleCreateAccount}>
              Create account <ArrowIcon />
            </button>
          </>
        )}

        {showProgress && (
          <div className={styles.progress}>
            {progressSteps.map((s, i) => (
              <div key={s.key} className={styles.progressStep}>
                <span className={s.done ? styles.progressDone : styles.progressDot} aria-hidden>
                  {s.done ? <CheckIcon /> : null}
                </span>
                <span className={styles.progressLabel} title={s.label}>
                  <span className={styles.progressLabelLong}>{s.label}</span>
                  <span className={styles.progressLabelShort}>{s.labelShort}</span>
                </span>
                {i < progressSteps.length - 1 && <span className={styles.progressLine} aria-hidden />}
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <>
            <h1 className={styles.title}>Is this email correct?</h1>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={`${styles.input} ${emailError ? styles.inputError : ''}`}
              value={emailValue}
              onChange={(e) => { setEmailValue(e.target.value); setEmailError('') }}
              placeholder="Email"
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
            <div className={styles.infoBoxYellow}>
              <LockIcon />
              <span>Please notice that… access to your journey will be linked to this address</span>
            </div>
            <button type="button" className={styles.cta} onClick={handleContinue}>
              Continue <ArrowIcon />
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <div className={styles.placeholderCircle} aria-hidden />
            <h1 className={styles.title}>Your account is created</h1>
            <div className={styles.createdBox}>
              <CogIcon />
              <span>{emailValue || email || 'user@gmail.com'}</span>
            </div>
            <div className={styles.createdBox}>
              <CogIcon />
              <span>**********</span>
            </div>
            <div className={styles.createdBox}>
              <CogIcon />
              <span>{bundleLabel}</span>
            </div>
            <button type="button" className={styles.cta} onClick={handleContinue}>
              Continue <ArrowIcon />
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <div className={styles.placeholderRect} aria-hidden />
            <h1 className={styles.title}>Activate your account</h1>
            <p className={styles.body}>
              Tap the button below to download the Longetic app. Once it opens, you'll be signed in right away — no extra steps needed.
            </p>
            <button type="button" className={styles.cta} onClick={handleStartJourney}>
              Start Journey <ArrowIcon />
            </button>
            <div className={styles.supportBox}>
              <LockIcon />
              <span>Need help? If you have any trouble downloading or accessing your account, we're here for you at <a href="mailto:support@longetic.com" className={styles.supportLink}>support@longetic.com</a></span>
            </div>
          </>
        )}
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
function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
function EnvelopeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  )
}
function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
function CogIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}
