import { createContext, useContext, useState, useCallback } from 'react'

const AnswersContext = createContext(null)

export function AnswersProvider({ children }) {
  const [answers, setAnswers] = useState({})

  const setAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }, [])

  const clearAnswers = useCallback(() => setAnswers({}), [])

  return (
    <AnswersContext.Provider value={{ answers, setAnswer, clearAnswers }}>
      {children}
    </AnswersContext.Provider>
  )
}

export function useAnswers() {
  const ctx = useContext(AnswersContext)
  if (!ctx) throw new Error('useAnswers must be used within AnswersProvider')
  return ctx
}
