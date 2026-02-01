/**
 * Longetic Funnel: Block 0 (Intro) + Blocks 1–6 with 26 questions.
 * Step 0 = Intro (gender), Step 1 = Age group, Steps 2–27 = questions (step 15 = Q14 conditional on Q13=Yes).
 */

export const QUESTION_TYPES = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
  INPUT_HEIGHT: 'input_height',
  INPUT_WEIGHT: 'input_weight',
  INPUT_DATE: 'input_date',
}

// ——— Block 0: Intro ———
export const INTRO = {
  headline: 'A PERSONALIZED LONGEVITY PLAN',
  subheadline: 'Improve your energy, strength, sleep, and long-term well-being — through small daily actions in a personalized longevity journey.',
  quizLabel: '5-MINUTE QUIZ',
  genderOptions: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ],
  legalLine: 'By continuing, you agree to the Terms of Use, Privacy Policy, Subscription Policy, and Cookie Policy.',
  disclaimer: 'Longetic provides educational wellness insights and is not a substitute for medical advice.',
}

export const AGE_GROUP_PAGE = {
  headline: 'Please choose your age group',
  trustBlock: 'Over 140,000 people have already started feeling stronger and more energized.',
  options: [
    { value: '18-29', label: '18-29' },
    { value: '30-39', label: '30-39' },
    { value: '40-49', label: '40-49' },
    { value: '50+', label: '50+' },
  ],
}

// ——— Blocks 1–6 (thematic sections) ———
export const BLOCKS = [
  {
    id: 1,
    title: 'Movement & Physical Safety',
    summaryTitle: 'Unlock the strength and stability that keep you independent longer.',
    summaryBody: "We'll help you move well, stay safe, and support your body for the long run.",
  },
  {
    id: 2,
    title: 'Sleep & Recovery',
    summaryTitle: 'Feel what real recovery actually feels like.',
    summaryBody: 'Our journey helps you understand and support this process.',
  },
  {
    id: 3,
    title: 'Mental, Social & Life Context',
    summaryTitle: 'Optimize stress and social balance through simple daily steps.',
    summaryBody: 'These patterns quietly shape long-term energy and resilience.',
  },
  {
    id: 4,
    title: 'Habits & Substances',
    summaryTitle: 'Shift habits that influence your energy over time.',
    summaryBody: "Certain habits place a steady load on your body's recovery systems.",
  },
  {
    id: 5,
    title: 'Body & Metabolic Signals',
    summaryTitle: "Longevity isn't luck. It's built on understanding your body's signals.",
    summaryBody: "We'll help you turn insight into action.",
  },
  {
    id: 6,
    title: 'Genetics, History & Environment',
    summaryTitle: null,
    summaryBody: null,
  },
]

// Step index → block index (for section breaks). Steps 0=intro, 1=dob, 2–6=block1, 7–10=block2, 11–15=block3, 16–18=block4, 19–22=block5, 23–27=block6
export const STEP_TO_BLOCK = [
  null, null, // 0 intro, 1 dob
  ...Array(5).fill(0),   // 2–6 block 1
  ...Array(4).fill(1),   // 7–10 block 2
  ...Array(5).fill(2),   // 11–15 block 3
  ...Array(3).fill(3),   // 16–18 block 4
  ...Array(4).fill(4),   // 19–22 block 5
  ...Array(5).fill(5),   // 23–27 block 6
]

// First step index of each block (for section break "next" link)
export const BLOCK_FIRST_STEP = [2, 7, 11, 16, 19, 23]
export const BLOCK_LAST_STEP = [6, 10, 15, 18, 22, 27]

export const TOTAL_STEPS = 28 // 0–27: intro, dob, 26 question steps
export const INTRO_STEPS = 2
export const FIRST_QUESTION_STEP = 2
export const LAST_QUESTION_STEP = 27

// Conditional: step 15 (Q14 relationship quality) only if step 14 (Q13) answer is 'yes'
export const CONDITIONAL_STEP = 15
export const CONDITIONAL_DEPENDS_ON_STEP = 14
export const CONDITIONAL_DEPENDS_ON_VALUE = 'yes'

/** All 26 questions in order (step 2 → question 0, …, step 27 → question 25). */
export const QUESTIONS = [
  // Block 1: Movement & Physical Safety (steps 2–6)
  {
    id: 'b1q1',
    text: 'How often do you intentionally exercise?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'rarely', label: 'Rarely or never', score: 1 },
      { value: '1-2', label: '1–2 times per week', score: 2 },
      { value: '3-4', label: '3–4 times per week', score: 3 },
      { value: '5+', label: '5+ times per week', score: 5 },
    ],
  },
  {
    id: 'b1q2',
    text: 'On an average day, how much do you walk?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'lt3k', label: 'Less than 3,000 steps', score: 1 },
      { value: '3k-6k', label: '3,000–6,000 steps', score: 2 },
      { value: '6k-10k', label: '6,000–10,000 steps', score: 3 },
      { value: '10k+', label: 'More than 10,000 steps', score: 5 },
    ],
  },
  {
    id: 'b1q3',
    text: 'Do you usually wear a seat belt when driving or riding in a car?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'rarely', label: 'Rarely or never', score: 1 },
      { value: 'most', label: 'Most of the time', score: 3 },
      { value: 'always', label: 'Always', score: 5 },
    ],
  },
  {
    id: 'b1q4',
    text: 'Do you use your phone while driving?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'never', label: 'Never', score: 5 },
      { value: 'sometimes', label: 'Sometimes', score: 2 },
      { value: 'often', label: 'Often', score: 1 },
    ],
  },
  {
    id: 'b1q5',
    text: 'Do you ride a motorcycle?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'no', label: 'No', score: 5 },
      { value: 'occasionally', label: 'Occasionally', score: 3 },
      { value: 'often', label: 'Yes, often', score: 1 },
    ],
  },
  // Block 2: Sleep & Recovery (steps 7–10)
  {
    id: 'b2q6',
    text: 'How would you describe your sleep most nights?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'tired', label: 'Tired and not really restored', score: 1 },
      { value: 'okay', label: 'Okay, but it varies a lot', score: 2 },
      { value: 'rested', label: 'Mostly rested and refreshed', score: 5 },
    ],
  },
  {
    id: 'b2q7',
    text: 'How many hours do you usually sleep per night?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'lt6', label: 'Less than 6', score: 1 },
      { value: '6-7', label: '6–7', score: 2 },
      { value: '7-8', label: '7–8', score: 5 },
      { value: '8+', label: 'More than 8', score: 4 },
    ],
  },
  {
    id: 'b2q8',
    text: 'Have you ever been told that your blood pressure is outside the normal range?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'no', label: "No, it's usually normal", score: 5 },
      { value: 'high', label: "Yes, it's usually high", score: 1 },
      { value: 'low', label: "Yes, it's usually low", score: 2 },
      { value: 'unsure', label: "I'm not sure", score: 2 },
    ],
  },
  {
    id: 'b2q9',
    text: 'How would you describe your resting heart rate?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'lower', label: 'Lower than average', score: 4 },
      { value: 'average', label: 'About average', score: 5 },
      { value: 'higher', label: 'Higher than average', score: 2 },
      { value: 'unsure', label: "I'm not sure", score: 2 },
    ],
  },
  // Block 3: Mental, Social & Life Context (steps 11–15)
  {
    id: 'b3q10',
    text: 'How does stress show up in your daily life?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'rarely', label: 'I rarely feel stressed — I generally feel calm', score: 5 },
      { value: 'manageable', label: 'I feel some stress, but it\'s manageable', score: 3 },
      { value: 'often', label: 'Stress is often present and hard to ignore', score: 1 },
    ],
  },
  {
    id: 'b3q11',
    text: 'When you think about your life overall, what feels closest to the truth right now?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'dissatisfied', label: 'I often feel dissatisfied or stuck', score: 1 },
      { value: 'okay', label: 'It feels okay, but not truly fulfilling', score: 2 },
      { value: 'satisfied', label: 'I feel mostly satisfied with my life', score: 4 },
      { value: 'fulfilled', label: 'I feel genuinely fulfilled and content', score: 5 },
    ],
  },
  {
    id: 'b3q12',
    text: 'How connected do you feel to other people in your life?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'disconnected', label: 'I often feel disconnected or lonely', score: 1 },
      { value: 'some', label: 'I have some connection, but it could be deeper', score: 2 },
      { value: 'supported', label: 'I feel supported and connected to people around me', score: 5 },
    ],
  },
  {
    id: 'b3q13',
    text: 'Are you currently in a close relationship?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'no', label: 'No', score: 3 },
      { value: 'yes', label: 'Yes', score: 5 },
    ],
  },
  {
    id: 'b3q14',
    text: 'If yes, how would you rate the quality of this relationship?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'deeply', label: 'It feels deeply supportive and nourishing', score: 5 },
      { value: 'mostly', label: 'It feels mostly supportive and positive', score: 4 },
      { value: 'okay', label: "It's okay, but not always supportive", score: 2 },
      { value: 'difficult', label: 'It often feels difficult or draining', score: 1 },
    ],
    conditionalOn: { step: 14, value: 'yes' },
  },
  // Block 4: Habits & Substances (steps 16–18)
  {
    id: 'b4q15',
    text: 'Which statement best describes your relationship with smoking?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'no', label: "I don't smoke", score: 5 },
      { value: 'used', label: 'I used to smoke, but I don\'t anymore', score: 4 },
      { value: 'occasionally', label: 'I smoke occasionally', score: 2 },
      { value: 'regularly', label: 'I smoke regularly', score: 1 },
    ],
  },
  {
    id: 'b4q16',
    text: 'How does alcohol usually show up in your life?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'no', label: "I don't drink", score: 5 },
      { value: 'occasionally', label: 'I drink occasionally', score: 4 },
      { value: 'few', label: 'I drink a few times per month', score: 3 },
      { value: 'regular', label: 'Drinking is a regular habit for me', score: 1 },
    ],
  },
  {
    id: 'b4q17',
    text: 'How often do foods like sausages, bacon, or deli meats appear in your diet?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'rarely', label: 'Rarely or almost never', score: 5 },
      { value: 'sometimes', label: 'Sometimes', score: 3 },
      { value: 'often', label: 'Quite often', score: 1 },
    ],
  },
  // Block 5: Body & Metabolic Signals (steps 19–22)
  {
    id: 'b5q18',
    text: 'What is your height?',
    type: QUESTION_TYPES.INPUT_HEIGHT,
    placeholder: 'Height (cm or ft-in)',
  },
  {
    id: 'b5q19',
    text: 'What is your current weight?',
    type: QUESTION_TYPES.INPUT_WEIGHT,
    placeholder: 'Weight (kg or lbs)',
  },
  {
    id: 'b5q20',
    text: 'Have you ever been told anything about your blood sugar level?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'no', label: "No, it's always been within a normal range", score: 5 },
      { value: 'past', label: 'Yes, it was slightly off in the past', score: 3 },
      { value: 'recurring', label: "Yes, it's been a recurring topic for me", score: 1 },
      { value: 'unsure', label: "I'm not sure", score: 2 },
    ],
  },
  {
    id: 'b5q21',
    text: 'Have you ever been told anything about your cholesterol level?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'no', label: "No, it's always been within a normal range", score: 5 },
      { value: 'past', label: 'Yes, it was slightly off in the past', score: 3 },
      { value: 'recurring', label: "Yes, it's been a recurring topic for me", score: 1 },
      { value: 'unsure', label: "I'm not sure / I don't remember", score: 2 },
    ],
  },
  // Block 6: Genetics, History & Environment (steps 23–27)
  {
    id: 'b6q22',
    text: 'Did any of your relatives live to age 90 or older?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'most', label: 'Yes, most of them did', score: 5 },
      { value: 'one', label: 'Yes, at least one of them did', score: 4 },
      { value: 'no', label: 'No', score: 2 },
      { value: 'unsure', label: "I'm not sure", score: 2 },
    ],
  },
  {
    id: 'b6q23',
    text: 'Have you ever personally dealt with any of the following?',
    type: QUESTION_TYPES.MULTIPLE,
    options: [
      { value: 'heart', label: 'Heart disease', score: 1 },
      { value: 'cancer', label: 'Cancer', score: 1 },
      { value: 'diabetes', label: 'Diabetes', score: 1 },
      { value: 'none', label: 'None of the above', score: 5 },
    ],
    selectAllThatApply: true,
  },
  {
    id: 'b6q24',
    text: 'Do any of these conditions appear in your close family?',
    type: QUESTION_TYPES.MULTIPLE,
    options: [
      { value: 'heart', label: 'Heart disease', score: 2 },
      { value: 'cancer', label: 'Cancer', score: 2 },
      { value: 'diabetes', label: 'Diabetes', score: 2 },
      { value: 'unsure_none', label: "I'm not sure / none", score: 3 },
    ],
    selectAllThatApply: true,
  },
  {
    id: 'b6q25',
    text: 'Where have you spent most of the last 10 years living?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'high', label: 'Mostly in high-income countries', score: 4 },
      { value: 'middle', label: 'Mostly in middle-income countries', score: 2 },
      { value: 'mix', label: 'A mix of both', score: 3 },
    ],
  },
  {
    id: 'b6q26',
    text: 'Where do you expect to live in the coming years?',
    type: QUESTION_TYPES.SINGLE,
    options: [
      { value: 'similar', label: 'In a similar environment', score: 4 },
      { value: 'different', label: 'In a very different environment', score: 2 },
      { value: 'unsure', label: "I'm not sure yet", score: 2 },
    ],
  },
]

/** Step index (2–27) → question index (0–25). Step 15 is Q14 (conditional). */
export function getQuestionIndexForStep(stepIndex) {
  if (stepIndex < FIRST_QUESTION_STEP || stepIndex > LAST_QUESTION_STEP) return null
  return stepIndex - FIRST_QUESTION_STEP
}

/** Question index (0–25) → step index. Q14 (index 13) is step 15; we don't skip in array. */
export function getStepForQuestionIndex(questionIndex) {
  if (questionIndex < 0 || questionIndex >= QUESTIONS.length) return null
  return questionIndex + FIRST_QUESTION_STEP
}

/** Whether step 15 (Q14) should be shown: only if step 14 answer is 'yes'. */
export function shouldShowConditionalStep(answers) {
  const q13 = QUESTIONS[13]
  const answer = answers[q13?.id]
  return answer === 'yes'
}

/** Next step after current step, given answers (for conditional skip). */
export function getNextStep(currentStepIndex, answers) {
  if (currentStepIndex < CONDITIONAL_DEPENDS_ON_STEP || currentStepIndex > CONDITIONAL_DEPENDS_ON_STEP)
    return currentStepIndex + 1
  const showQ14 = shouldShowConditionalStep(answers)
  if (showQ14) return currentStepIndex + 1
  return currentStepIndex + 2
}

export const TOTAL_QUESTIONS = QUESTIONS.length
export const TOTAL_BLOCKS = BLOCKS.length
