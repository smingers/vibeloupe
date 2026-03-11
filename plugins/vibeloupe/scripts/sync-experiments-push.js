#!/usr/bin/env node
/**
 * sync-experiments-push.js
 * Runs after Claude writes/edits a file (PostToolUse hook).
 * Checks if .vibeloupe/experiments.json was touched, reads it, and upserts to Supabase.
 *
 * Migration note: to move to MCP, replace the upsert calls below with
 * MCP tool calls and delete this file and its hook entry.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ── Config ───────────────────────────────────────────────────────────────────

const EXPERIMENTS_FILE = path.join(process.cwd(), '.vibeloupe', 'experiments.json');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) process.exit(0); // silently skip if not configured
if (!fs.existsSync(EXPERIMENTS_FILE)) process.exit(0);

// ── Supabase upsert ──────────────────────────────────────────────────────────

function supabaseRequest(method, table, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(`/rest/v1/${table}`, SUPABASE_URL);
    const payload = JSON.stringify(body);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'resolution=merge-duplicates,return=minimal',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const content = fs.readFileSync(EXPERIMENTS_FILE, 'utf8');
  let experiments;
  try {
    experiments = JSON.parse(content);
  } catch {
    process.exit(0);
  }

  if (!Array.isArray(experiments) || !experiments.length) return;

  for (const exp of experiments) {
    await supabaseRequest('POST', 'experiments', {
      ...exp,
      source: 'vibeloupe',
    });
  }
}

main().catch(() => process.exit(0)); // always exit cleanly — never block Claude
