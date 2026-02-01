import { QUESTION_TYPES } from '../data/questions'
import styles from './QuestionCard.module.css'

export function QuestionCard({ question, value, onSelect, onInputChange, onContinue }) {
  if (question.type === QUESTION_TYPES.SINGLE) {
    return (
      <div className={styles.card}>
        <h2 className={styles.text}>{question.text}</h2>
        <div className={styles.options}>
          {question.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={value === opt.value ? styles.optionActive : styles.option}
              onClick={() => onSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (question.type === QUESTION_TYPES.MULTIPLE) {
    const selected = Array.isArray(value) ? value : value ? [value] : []
    const toggle = (optValue) => {
      if (optValue === 'none' || optValue === 'unsure_none') {
        onSelect([optValue])
        return
      }
      const hasNone = selected.includes('none') || selected.includes('unsure_none')
      let next
      if (selected.includes(optValue)) {
        next = selected.filter((v) => v !== optValue)
      } else {
        if (hasNone) next = selected.filter((v) => v !== 'none' && v !== 'unsure_none').concat(optValue)
        else next = selected.concat(optValue)
      }
      if (next.length === 0) next = selected.includes('unsure_none') ? ['unsure_none'] : ['none']
      onSelect(next)
    }
    const canContinue = selected.length > 0
    return (
      <div className={styles.card}>
        <h2 className={styles.text}>{question.text}</h2>
        <p className={styles.multiHint}>Select all that apply</p>
        <div className={styles.options}>
          {question.options.map((opt) => {
            const isChecked = selected.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                className={isChecked ? styles.optionActive : styles.option}
                onClick={() => toggle(opt.value)}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
        {onContinue && (
          <button
            type="button"
            className={styles.continueBtn}
            onClick={onContinue}
            disabled={!canContinue}
          >
            Continue
          </button>
        )}
      </div>
    )
  }

  if (question.type === QUESTION_TYPES.INPUT_HEIGHT || question.type === QUESTION_TYPES.INPUT_WEIGHT) {
    const raw = value != null ? String(value) : ''
    const handleChange = (e) => {
      const v = e.target.value
      onInputChange ? onInputChange(v) : onSelect(v)
    }
    const handleSubmit = () => {
      if (raw.trim()) onSelect(raw.trim())
    }
    return (
      <div className={styles.card}>
        <h2 className={styles.text}>{question.text}</h2>
        <input
          type="text"
          inputMode={question.type === QUESTION_TYPES.INPUT_HEIGHT ? 'decimal' : 'decimal'}
          className={styles.textInput}
          placeholder={question.placeholder || ''}
          value={raw}
          onChange={handleChange}
          aria-label={question.text}
        />
        <button type="button" className={styles.continueBtn} onClick={handleSubmit} disabled={!raw.trim()}>
          Continue
        </button>
      </div>
    )
  }

  return null
}
