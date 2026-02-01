/**
 * Post-questionnaire funnel: Screen 1 (result) → … → Screen 11 (paywall).
 * Tone: calm, motivating, science-backed, non-medical.
 */

// Score bands for Screen 1 (Low / Average / Medium / Strong)
export const SCORE_BANDS = [
  { key: 'low', label: 'Low', min: 0, max: 39, color: '#94a3b8' },
  { key: 'average', label: 'Average', min: 40, max: 59, color: '#fbbf24' },
  { key: 'medium', label: 'Medium', min: 60, max: 79, color: '#0ea5e9' },
  { key: 'strong', label: 'Strong', min: 80, max: 100, color: '#10b981' },
]

export const SCORE_EXPLANATIONS = {
  low: 'Your score reflects where you are today. Small daily steps can make a real difference — Longetic helps you focus on what matters most.',
  average: 'You have a solid base to build on. With a bit more clarity and focus, you can strengthen the habits that support your longevity.',
  medium: 'You’re already doing a lot right. Longetic can help you keep momentum and refine the areas that matter most.',
  strong: 'Your habits are already aligned with longevity. Longetic can help you stay consistent and keep building on this foundation.',
}

// Focus area labels (map from block index or key); we pick 3–4
export const FOCUS_AREA_LABELS = {
  movement: 'Movement',
  sleep: 'Sleep',
  stress: 'Stress',
  happiness: 'Happiness',
  energy: 'Energy level',
  habits: 'Habits',
}

// Screen 2 — Tools (multi-select)
export const TOOLS_OPTIONS = [
  { value: 'fitness', label: 'Fitness or activity apps' },
  { value: 'sleep', label: 'Sleep or recovery tools' },
  { value: 'nutrition', label: 'Nutrition tracking' },
  { value: 'habit', label: 'Habit tracking' },
  { value: 'other', label: 'Other' },
  { value: 'none', label: "I haven't explored this yet" },
]

// Screen 3 — Time commitment (single-select)
export const TIME_OPTIONS = [
  { value: '10', label: 'Up to 10 minutes' },
  { value: '20', label: 'Up to 20 minutes' },
  { value: '30', label: 'Up to 30 minutes' },
  { value: '30+', label: 'More than 30 minutes' },
]

// Screen 4 — With Longetic You Get (4 blocks)
export const VALUE_BLOCKS = [
  {
    title: 'A clear view of your longevity profile and trajectory',
    description: 'Understand where you are today — and where your current path is heading.',
  },
  {
    title: 'A personalized journey to improvement',
    description: 'Focus on the few daily steps that can make the biggest difference.',
  },
  {
    title: 'Clear focus areas — not overwhelm',
    description: 'Know exactly where to put your attention instead of trying to change everything at once.',
  },
  {
    title: 'Support for long-term consistency',
    description: 'A guided journey designed to fit real life, not perfect routines.',
  },
]

// Screen 7 — Mid-loader reflection (3 questions)
export const REFLECTION_QUESTIONS = [
  "Do you want to understand what's actually shaping your longevity right now?",
  'Are you willing to focus on the factors you can realistically change?',
  'Are you ready to start taking small daily steps to boost longevity?',
]

// Loader steps (Screen 6)
export const LOADER_STEPS = [
  { label: 'Analyzing your longevity signals', percent: 45 },
  { label: 'Identifying key leverage points', percent: 75 },
  { label: 'Building your longevity journey', percent: 95 },
]

export function getScoreBand(score) {
  if (score == null) return null
  return SCORE_BANDS.find((b) => score >= b.min && score <= b.max) || SCORE_BANDS[0]
}

export function getScoreExplanation(score) {
  const band = getScoreBand(score)
  return band ? SCORE_EXPLANATIONS[band.key] : SCORE_EXPLANATIONS.low
}

/** Return 3–4 focus area labels (dynamic; for now based on blocks). */
export function getFocusAreas() {
  return ['Sleep', 'Energy level', 'Stress', 'Movement']
}
