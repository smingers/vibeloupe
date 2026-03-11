#!/usr/bin/env node
/**
 * sync-experiments-pull.js
 * Runs at SessionStart. Fetches experiments from Supabase and merges any
 * records that are newer than the local .vibeloupe/experiments.json into the file.
 *
 * Strategy: Supabase is the source of truth for records created outside Claude
 * (e.g. web app). If an experiment exists in Supabase but not locally (by id),
 * it is appended. If it already exists locally, the record with the newer
 * updated_at wins.
 *
 * Migration note: to move to MCP, delete this file and its hook entry.
 * The MCP server's list_experiments() tool replaces this pull entirely.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ── Config ───────────────────────────────────────────────────────────────────

const VIBELOUPE_DIR = path.join(process.cwd(), '.vibeloupe');
const EXPERIMENTS_FILE = path.join(VIBELOUPE_DIR, 'experiments.json');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) process.exit(0);

// ── Supabase fetch ───────────────────────────────────────────────────────────

function supabaseFetch(table, params = '') {
  return new Promise((resolve, reject) => {
    const url = new URL(`/rest/v1/${table}?${params}`, SUPABASE_URL);

    const options = {
      hostname: url.hostname,
      path: `${url.pathname}?${url.search.slice(1)}`,
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Accept': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve([]); }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const remote = await supabaseFetch('experiments', 'order=created_at.asc');
  if (!Array.isArray(remote) || !remote.length) return;

  // Read local file or start fresh
  let local = [];
  if (fs.existsSync(EXPERIMENTS_FILE)) {
    try {
      local = JSON.parse(fs.readFileSync(EXPERIMENTS_FILE, 'utf8'));
    } catch {
      local = [];
    }
  }

  const localById = new Map(local.map(e => [e.id, e]));

  let changed = false;
  for (const remoteExp of remote) {
    if (!remoteExp.id) continue;
    const localExp = localById.get(remoteExp.id);

    if (!localExp) {
      // New record from remote — append
      local.push(remoteExp);
      changed = true;
    } else if (remoteExp.updated_at > localExp.updated_at) {
      // Remote is newer — merge
      localById.set(remoteExp.id, { ...localExp, ...remoteExp });
      changed = true;
    }
  }

  if (!changed) return;

  // Rebuild array preserving insertion order
  const merged = Array.from(localById.values());

  if (!fs.existsSync(VIBELOUPE_DIR)) fs.mkdirSync(VIBELOUPE_DIR, { recursive: true });
  fs.writeFileSync(EXPERIMENTS_FILE, JSON.stringify(merged, null, 2), 'utf8');
}

main().catch(() => process.exit(0)); // always exit cleanly — never block Claude
