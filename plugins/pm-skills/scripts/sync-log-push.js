#!/usr/bin/env node
/**
 * sync-log-push.js
 * Runs after Claude writes/edits a file (PostToolUse hook).
 * Checks if LEARNING_LOG.md was touched, parses it, and upserts to Supabase.
 *
 * Migration note: to move to MCP, replace the upsert calls below with
 * MCP tool calls and delete this file and its hook entry.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ── Config ───────────────────────────────────────────────────────────────────

const LOG_FILE = path.join(process.cwd(), 'LEARNING_LOG.md');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) process.exit(0); // silently skip if not configured
if (!fs.existsSync(LOG_FILE)) process.exit(0);

// ── Parser ───────────────────────────────────────────────────────────────────

function parseLog(content) {
  const weeks = [];
  // Split on week headers
  const weekBlocks = content.split(/^## Week of /m).slice(1);

  for (const block of weekBlocks) {
    const lines = block.split('\n');
    const weekStart = lines[0].trim(); // e.g. "2024-01-08"

    const experiments = [];
    // Match plan experiments
    const experimentBlocks = block.split(/^\*\*Experiment \d+:/m).slice(1);

    for (let i = 0; i < experimentBlocks.length; i++) {
      const eb = experimentBlocks[i];
      const nameLine = eb.split('\n')[0].replace(/\*\*$/, '').trim();

      const get = (label) => {
        const match = eb.match(new RegExp(`^- ${label}: (.+)$`, 'm'));
        return match ? match[1].trim() : null;
      };

      // Determine if this is a plan block or results block by presence of Hypothesis
      const hypothesis = get('Hypothesis');
      if (hypothesis) {
        experiments.push({
          index: i,
          name: nameLine,
          hypothesis,
          minimum_test: get('Minimum test'),
          pass_criteria: get('Pass'),
          fail_criteria: get('Fail'),
          time_estimate: get('Time estimate'),
        });
      } else {
        // Results block — match by index to corresponding experiment
        const exp = experiments[i - experimentBlocks.length / 2] || experiments[i];
        if (exp) {
          exp.ran = get('Ran');
          exp.observed = get('Observed');
          exp.verdict = get('Verdict');
          exp.updated_belief = get('Updated belief');
          exp.next_step = get('Next step');
        }
      }
    }

    const upstreamMatch = block.match(/^\*\*Upstream assumption to watch:\*\* (.+)$/m);
    const keyLearningMatch = block.match(/^\*\*Key learning this week:\*\* (.+)$/m);

    weeks.push({
      week_start: weekStart,
      upstream_assumption: upstreamMatch ? upstreamMatch[1].trim() : null,
      key_learning: keyLearningMatch ? keyLearningMatch[1].trim() : null,
      experiments,
    });
  }

  return weeks;
}

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
  const content = fs.readFileSync(LOG_FILE, 'utf8');
  const weeks = parseLog(content);

  for (const week of weeks) {
    // Upsert week-level record
    await supabaseRequest('POST', 'learning_weeks', {
      week_start: week.week_start,
      upstream_assumption: week.upstream_assumption,
      key_learning: week.key_learning,
      source: 'learning_log',
      updated_at: new Date().toISOString(),
    });

    // Upsert each experiment
    for (let i = 0; i < week.experiments.length; i++) {
      const exp = week.experiments[i];
      await supabaseRequest('POST', 'experiments', {
        week_start: week.week_start,
        experiment_index: i + 1,
        name: exp.name,
        hypothesis: exp.hypothesis,
        minimum_test: exp.minimum_test,
        pass_criteria: exp.pass_criteria,
        fail_criteria: exp.fail_criteria,
        time_estimate: exp.time_estimate,
        ran: exp.ran,
        observed: exp.observed,
        verdict: exp.verdict,
        updated_belief: exp.updated_belief,
        next_step: exp.next_step,
        source: 'learning_log',
        updated_at: new Date().toISOString(),
      });
    }
  }
}

main().catch(() => process.exit(0)); // always exit cleanly — never block Claude
