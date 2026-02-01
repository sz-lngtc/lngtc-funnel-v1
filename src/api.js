/**
 * Submit funnel data to backend. Backend URL is proxied in dev (Vite) via /api.
 * In production, set VITE_API_BASE or deploy API at same origin /api.
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? ''

export async function submitFunnelPayload({ answers, score }) {
  const res = await fetch(`${API_BASE}/api/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers: answers ?? {}, score: score ?? null }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Submit failed: ${res.status}`)
  }
  return res.json()
}
