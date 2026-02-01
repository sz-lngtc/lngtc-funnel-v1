/**
 * Avatar illustrations per age group (Duomo-style).
 * 18-29: younger, long hair. 30-39: shoulder-length. 40-49: shorter. 50+: glasses, shorter hair.
 */
export function AgeGroupIllustration({ variant, className }) {
  const stroke = 1.8
  const color = 'currentColor'

  const common = { fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' }

  // 18-29 — younger, long flowing hair
  const Young = () => (
    <svg viewBox="0 0 100 120" className={className} aria-hidden>
      <ellipse cx="50" cy="40" rx="20" ry="22" {...common} />
      <path d="M30 40 Q32 18 50 14 Q68 18 70 40 Q72 55 50 58 Q28 55 30 40" {...common} />
      <path d="M50 62 v28 M44 78 h12 M50 90 l-10 14 M50 90 l10 14" {...common} />
    </svg>
  )

  // 30-39 — shoulder-length, wavy suggestion
  const Mid = () => (
    <svg viewBox="0 0 100 120" className={className} aria-hidden>
      <ellipse cx="50" cy="40" rx="20" ry="22" {...common} />
      <path d="M30 38 Q35 22 50 20 Q65 22 70 38 L72 52 Q50 56 28 52 Z" {...common} />
      <path d="M50 62 v28 M44 78 h12 M50 90 l-10 14 M50 90 l10 14" {...common} />
    </svg>
  )

  // 40-49 — shorter hair
  const Mature = () => (
    <svg viewBox="0 0 100 120" className={className} aria-hidden>
      <ellipse cx="50" cy="40" rx="20" ry="22" {...common} />
      <path d="M32 36 Q38 26 50 24 Q62 26 68 36 Q66 46 50 48 Q34 46 32 36" {...common} />
      <path d="M50 62 v28 M44 78 h12 M50 90 l-10 14 M50 90 l10 14" {...common} />
    </svg>
  )

  // 50+ — glasses, shorter hair
  const Senior = () => (
    <svg viewBox="0 0 100 120" className={className} aria-hidden>
      <ellipse cx="50" cy="40" rx="20" ry="22" {...common} />
      <path d="M34 38 Q40 28 50 26 Q60 28 66 38 Q64 46 50 48 Q36 46 34 38" {...common} />
      <path d="M34 38 L38 38 M62 38 L66 38" stroke={color} strokeWidth={stroke * 0.6} />
      <ellipse cx="40" cy="39" rx="6" ry="5" {...common} />
      <ellipse cx="60" cy="39" rx="6" ry="5" {...common} />
      <path d="M50 62 v28 M44 78 h12 M50 90 l-10 14 M50 90 l10 14" {...common} />
    </svg>
  )

  switch (variant) {
    case '18-29':
      return <Young />
    case '30-39':
      return <Mid />
    case '40-49':
      return <Mature />
    case '50+':
      return <Senior />
    default:
      return <Young />
  }
}
