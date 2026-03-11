#!/usr/bin/env node
/**
 * sync-log-pull.js
 * Runs at SessionStart. Fetches experiments from Supabase and merges any
 * rows that are newer than the local LEARNING_LOG.md into the file.
 *
 * Strategy: Supabase is the source of truth for rows created outside Claude
 * (e.g. web app, Notion sync). If a week/experiment exists in Supabase but
 * not in the local file, it is appended. If it already exists locally,
 * it is left alone (Claude's last write wins for local edits).
 *
 * Migration note: to move to MCP, delete this file and its hook entry.
 * The MCP server's list_experiments() tool replaces this pull entirely.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ── Config ───────────────────────────────────────────────────────────────────

const LOG_FILE = path.join(process.cwd(), 'LEARNING_LOG.md');
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

// ── Renderer ─────────────────────────────────────────────────────────────────
// Renders a week record + its experiments back into LEARNING_LOG.md format.

function renderWeek(week, experiments) {
  const plan = experiments.map((exp, i) => `
**Experiment ${i + 1}: ${exp.name}**
- Hypothesis: ${exp.hypothesis || ''}
- Minimum test: ${exp.minimum_test || ''}
- Pass: ${exp.pass_criteria || ''}
- Fail: ${exp.fail_criteria || ''}
- Time estimate: ${exp.time_estimate || ''}`).join('\n');

  const hasResults = experiments.some(e => e.ran !== null && e.ran !== undefined);
  let results = '';
  if (hasResults) {
    results = `\n### Results\n` + experiments.map((exp, i) => `
**Experiment ${i + 1}: ${exp.name}**
- Ran: ${exp.ran || ''}
- Observed: ${exp.observed || ''}
- Verdict: ${exp.verdict || ''}
- Updated belief: ${exp.updated_belief || ''}
- Next step: ${exp.next_step || ''}`).join('\n');

    if (week.key_learning) {
      results += `\n\n**Key learning this week:** ${week.key_learning}`;
    }
  }

  return `## Week of ${week.week_start}

### Plan
${plan}

**Upstream assumption to watch:** ${week.upstream_assumption || ''}

---
${results}${hasResults ? '\n\n---' : ''}
`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Fetch all weeks from Supabase ordered by week_start
  const weeks = await supabaseFetch('learning_weeks', 'order=week_start.asc&source=neq.learning_log_deleted');
  if (!weeks.length) return;

  // Read existing log (or create it)
  const LOG_HEADER = `# Learning Log\n\nA running record of weekly Build-Measure-Learn cycles.\n\n---\n`;
  let existing = '';
  if (fs.existsSync(LOG_FILE)) {
    existing = fs.readFileSync(LOG_FILE, 'utf8');
  } else {
    existing = LOG_HEADER;
  }

  // Find which weeks are already in the file
  const presentWeeks = new Set();
  for (const match of existing.matchAll(/^## Week of (\d{4}-\d{2}-\d{2})/gm)) {
    presentWeeks.add(match[1]);
  }

  // Append any weeks from Supabase that are not yet in the file
  let additions = '';
  for (const week of weeks) {
    if (presentWeeks.has(week.week_start)) continue;

    const experiments = await supabaseFetch(
      'experiments',
      `week_start=eq.${week.week_start}&order=experiment_index.asc`
    );

    if (!experiments.length) continue;

    additions += '\n' + renderWeek(week, experiments);
  }

  if (!additions) return;

  const newContent = existing.trimEnd() + '\n' + additions;
  fs.writeFileSync(LOG_FILE, newContent, 'utf8');
}

main().catch(() => process.exit(0)); // always exit cleanly — never block Claude
