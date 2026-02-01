import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BLOCKS, BLOCK_FIRST_STEP, LAST_QUESTION_STEP } from '../data/questions'
import styles from './SectionBreakPage.module.css'

export function SectionBreakPage() {
  const { blockIndex: blockParam } = useParams()
  const navigate = useNavigate()

  const blockIndex = parseInt(blockParam, 10)
  const isInvalid =
    Number.isNaN(blockIndex) || blockIndex < 1 || blockIndex > BLOCKS.length

  useEffect(() => {
    if (isInvalid) navigate('/', { replace: true })
  }, [isInvalid, navigate])

  if (isInvalid) return null

  const block = BLOCKS[blockIndex - 1]
  if (!block) return null

  const nextStepIndex = BLOCK_FIRST_STEP[blockIndex]
  const isLastBlock = blockIndex >= BLOCKS.length
  // blockIndex from URL is 1-based (section-break/1, /2, ...)

  const handleNext = () => {
    if (isLastBlock) {
      navigate('/result', { replace: true })
    } else {
      navigate(`/q/${nextStepIndex}`, { replace: true })
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Block complete: {block.title}</h2>
        {block.summaryTitle && (
          <p className={styles.summaryTitle}>{block.summaryTitle}</p>
        )}
        {block.summaryBody && (
          <p className={styles.desc}>{block.summaryBody}</p>
        )}
        <button type="button" className={styles.cta} onClick={handleNext}>
          Continue
        </button>
      </div>
    </div>
  )
}
