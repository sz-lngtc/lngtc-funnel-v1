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

// Serve frontend (Railway: one service = API + static)
const DIST_DIR = path.join(__dirname, '..', 'dist')
app.use(express.static(DIST_DIR))
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Funnel listening on http://localhost:${PORT}`)
})
