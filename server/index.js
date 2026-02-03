/**
 * Backend API for Longetic funnel — stores submissions.
 * Use .env for PORT; never commit .env or server/data/ to GitHub.
 */

import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json')

const app = express()
app.use(express.json({ limit: '512kb' }))

const PORT = process.env.PORT || 3001
const API_KEY = process.env.API_KEY || null

// Middleware для захисту GET /api/submissions
function requireApiKey(req, res, next) {
  if (!API_KEY) {
    // Якщо API_KEY не встановлено, ендпоінт недоступний
    return res.status(403).json({ ok: false, error: 'Access denied' })
  }
  
  const providedKey = req.headers['x-api-key'] || req.query.key
  if (providedKey !== API_KEY) {
    return res.status(401).json({ ok: false, error: 'Invalid API key' })
  }
  
  next()
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

async function readSubmissions() {
  try {
    const raw = await fs.readFile(SUBMISSIONS_FILE, 'utf8')
    return JSON.parse(raw)
  } catch (e) {
    if (e.code === 'ENOENT') return []
    throw e
  }
}

async function appendSubmission(payload) {
  const list = await readSubmissions()
  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...payload,
  }
  list.push(entry)
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), 'utf8')
  return entry
}

app.post('/api/submit', async (req, res) => {
  try {
    await ensureDataDir()
    const { answers = {}, score = null } = req.body
    const saved = await appendSubmission({ answers, score })
    res.status(201).json({ ok: true, id: saved.id })
  } catch (err) {
    console.error('POST /api/submit', err)
    res.status(500).json({ ok: false, error: 'Failed to save submission' })
  }
})

app.get('/api/submissions', requireApiKey, async (req, res) => {
  try {
    const list = await readSubmissions()
    res.json({ ok: true, count: list.length, data: list })
  } catch (err) {
    console.error('GET /api/submissions', err)
    res.status(500).json({ ok: false, error: 'Failed to read submissions' })
  }
})

// Serve frontend (Railway: one service = API + static)
const DIST_DIR = path.join(__dirname, '..', 'dist')
app.use(express.static(DIST_DIR))
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Funnel listening on http://localhost:${PORT}`)
})
