import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAnswers } from '../context/AnswersContext'
import {
  QUESTIONS,
  BLOCKS,
  STEP_TO_BLOCK,
  BLOCK_LAST_STEP,
  BLOCK_FIRST_STEP,
  FIRST_QUESTION_STEP,
  LAST_QUESTION_STEP,
  CONDITIONAL_STEP,
  CONDITIONAL_DEPENDS_ON_STEP,
  shouldShowConditionalStep,
  getQuestionIndexForStep,
  QUESTION_TYPES,
} from '../data/questions'
import { QuestionCard } from '../components/QuestionCard'
import styles from './QuestionPage.module.css'

export function QuestionPage() {
  const { stepIndex: stepParam } = useParams()
  const navigate = useNavigate()
  const { answers, setAnswer } = useAnswers()

  const stepIndex = parseInt(stepParam, 10)
  const isInvalid =
    Number.isNaN(stepIndex) || stepIndex < FIRST_QUESTION_STEP || stepIndex > LAST_QUESTION_STEP

  const questionIndex = getQuestionIndexForStep(stepIndex)
  const question = questionIndex != null ? QUESTIONS[questionIndex] : null
  const blockIndex = stepIndex != null ? STEP_TO_BLOCK[stepIndex] : null
  const block = blockIndex != null ? BLOCKS[blockIndex] : null

  // Redirect from conditional step (Q14) if user didn't answer Yes to Q13
  const isConditionalStep = stepIndex === CONDITIONAL_STEP
  const shouldShowQ14 = questionIndex != null && shouldShowConditionalStep(answers)
  useEffect(() => {
    if (isConditionalStep && !shouldShowQ14) {
      navigate('/section-break/3', { replace: true })
    }
  }, [isConditionalStep, shouldShowQ14, navigate])

  useEffect(() => {
    if (isInvalid) navigate('/', { replace: true })
  }, [isInvalid, navigate])

  if (isInvalid || !question || !block) return null
  if (isConditionalStep && !shouldShowQ14) return null

  const currentAnswer = answers[question.id]
  const isLastInBlock = stepIndex === BLOCK_LAST_STEP[blockIndex]
  const isLastQuestion = stepIndex === LAST_QUESTION_STEP

  const goNext = (nextStep) => {
    if (nextStep > LAST_QUESTION_STEP) {
      navigate('/result', { replace: true })
      return
    }
    navigate(`/q/${nextStep}`, { replace: true })
  }

  const handleAnswer = (value) => {
    if (question.type === QUESTION_TYPES.INPUT_HEIGHT || question.type === QUESTION_TYPES.INPUT_WEIGHT) {
      setAnswer(question.id, value)
      const nextStep = stepIndex + 1
      if (isLastQuestion) navigate('/result', { replace: true })
      else if (isLastInBlock) navigate(`/section-break/${blockIndex + 1}`, { replace: true })
      else goNext(nextStep)
      return
    }

    if (question.type === QUESTION_TYPES.MULTIPLE) {
      setAnswer(question.id, value)
      return
    }

    setAnswer(question.id, value)

    if (stepIndex === CONDITIONAL_DEPENDS_ON_STEP) {
      if (value === 'yes') goNext(CONDITIONAL_STEP)
      else navigate('/section-break/3', { replace: true })
      return
    }

    if (isLastQuestion) {
      navigate('/result', { replace: true })
      return
    }
    if (isLastInBlock) {
      navigate(`/section-break/${blockIndex + 1}`, { replace: true })
      return
    }
    goNext(stepIndex + 1)
  }

  const handleContinueMultiple = () => {
    const value = answers[question.id]
    if (stepIndex === LAST_QUESTION_STEP) navigate('/result', { replace: true })
    else if (isLastInBlock) navigate(`/section-break/${blockIndex + 1}`, { replace: true })
    else goNext(stepIndex + 1)
  }

  const questionNumberInBlock = stepIndex - BLOCK_FIRST_STEP[blockIndex] + 1
  const countInBlock = BLOCK_LAST_STEP[blockIndex] - BLOCK_FIRST_STEP[blockIndex] + 1

  return (
    <div className={styles.page}>
      <p className={styles.sectionLabel}>{block.title}</p>
      <p className={styles.counter}>
        Question {questionNumberInBlock} of {countInBlock}
      </p>
      <QuestionCard
        question={question}
        value={currentAnswer}
        onSelect={handleAnswer}
        onInputChange={
          question.type === QUESTION_TYPES.INPUT_HEIGHT || question.type === QUESTION_TYPES.INPUT_WEIGHT
            ? (v) => setAnswer(question.id, v)
            : undefined
        }
        onContinue={
          question.type === QUESTION_TYPES.MULTIPLE ? handleContinueMultiple : undefined
        }
      />
    </div>
  )
}
