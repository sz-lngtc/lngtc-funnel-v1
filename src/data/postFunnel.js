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

// ——— Paywall ———

/** Block 3 & 9 — Bundles */
export const PAYWALL_BUNDLES = [
  {
    id: 'weekly',
    label: 'Weekly plan',
    subtitle: '1-Week Trial',
    originalPrice: '$12.49',
    introPrice: '$6.49',
    introPerDay: '$0.93 / day',
    legal:
      "By tapping \"Get my plan\" you agree that if you don't cancel at least 24 hours prior to the end of the 1 month introductory period, you will automatically be charged the full price of $40.99 every 1 month until you cancel by contacting support@goduomo.com. Learn more about cancellation and refund policy in Subscription Terms.",
  },
  {
    id: '4week',
    label: '4-week plan',
    subtitle: 'MOST POPULAR',
    originalPrice: '$40.99',
    introPrice: '$19.99',
    introPerDay: '$0.71 / day',
    legal:
      "By tapping \"Get my plan\" you agree that if you don't cancel at least 24 hours prior to the end of the 1 month introductory period, you will automatically be charged the full price of $40.99 every 1 month until you cancel by contacting support@goduomo.com. Learn more about cancellation and refund policy in Subscription Terms.",
  },
  {
    id: '12week',
    label: '12-week plan',
    subtitle: 'Best value',
    originalPrice: '$68.99',
    introPrice: '$34.49',
    introPerDay: '$0.41 / day',
    legal:
      "By tapping \"Get my plan\" you agree that if you don't cancel at least 24 hours prior to the end of the 1 month introductory period, you will automatically be charged the full price of $81.99 every 3 months until you cancel by contacting support@goduomo.com. Learn more about cancellation and refund policy in Subscription Terms.",
  },
]

/** Block 5 — Results stats */
export const PAYWALL_RESULTS_STATS = [
  { percent: 72, text: 'feel more stable energy in daily life' },
  { percent: 61, text: 'stay consistent with small daily actions' },
  { percent: 54, text: 'see a positive shift in their longevity score and trajectory' },
]

/** Block 6 — Discover benefits */
export const PAYWALL_BENEFITS = [
  'Read your body\'s signals with clarity',
  'Feel stronger and more capable physically',
  'Align daily actions with long-term health',
  'Focus on what truly moves the needle',
  'Build resilience instead of chasing quick fixes',
  'Turn awareness into consistent action',
  'Watch your longevity score improve over time',
  'Trust your direction — not trends',
]

/** Block 7 — FAQ (placeholder items) */
export const PAYWALL_FAQ = [
  { q: 'What if I struggle with consistency?', a: 'Longetic is designed precisely for that. You don\'t need discipline or willpower to start. The journey is built around small, realistic daily actions that fit into real life. Consistency grows naturally — one simple step at a time.' },
  { q: 'What if I feel overwhelmed about my health?', a: 'You\'re not alone — that\'s where most people start. Longetic helps you focus only on what matters right now, instead of everything at once. Clear structure replaces overwhelm, so caring for your health feels calm and manageable.' },
  { q: 'Do I need any special tools or equipment?', a: 'No. Longetic works with what you already have. The journey focuses on simple daily habits, awareness, and small lifestyle shifts — nothing complicated or complex to maintain.' },
  { q: 'What if I\'ve tried many wellness apps before and nothing worked?', a: 'Longetic is different because it doesn\'t overload you with information or force significant lifestyle changes. It helps you understand your current state and guides you with small, practical steps. This makes progress feel realistic — and sustainable.' },
  { q: 'How much time does this take each day?', a: 'Most days take around 10 minutes. Longetic is designed to fit into busy lives, not compete with them. If you have more time, you can explore more — but you never have to.' },
  { q: 'Is Longetic about treating health problems?', a: 'Longetic focuses on prevention, awareness, and daily habits that support long-term well-being. It\'s not a medical service and doesn\'t replace doctors — it helps you take better care of yourself before problems appear.' },
  { q: 'Who is Longetic for?', a: 'Longetic is for people who want to feel better, stay strong, and take care of their health before problems appear. It\'s for those who value clarity over chaos and prefer small, consistent steps instead of extreme changes.' },
  { q: 'What if I miss a day?', a: 'Nothing breaks. You simply continue the next day. Longetic is built around progress, not streak anxiety. Your health journey belongs to you — not to a perfect schedule.' },
]

/** Block 8 — User reviews (placeholder) */
export const PAYWALL_REVIEWS = [
  { text: 'For the first time, my health feels structured — not overwhelming.', name: '— Jesica, 41' },
  { text: 'Through small daily steps, I started feeling more like myself again — calm, present, and in control.', name: '— Michael, 42' },
  { text: 'My energy is more stable, and my mind feels clearer every day.', name: '— Julia, 38' },
]
