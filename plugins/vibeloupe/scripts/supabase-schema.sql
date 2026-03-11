-- learning_weeks: one row per weekly cycle
create table if not exists learning_weeks (
  week_start          date primary key,
  upstream_assumption text,
  key_learning        text,
  source              text default 'learning_log', -- 'learning_log' | 'web_app' | 'notion'
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- experiments: up to 3 per week
create table if not exists experiments (
  id                uuid primary key default gen_random_uuid(),
  week_start        date not null references learning_weeks(week_start),
  experiment_index  int not null check (experiment_index between 1 and 3),
  name              text not null,
  -- Plan fields
  hypothesis        text,
  minimum_test      text,
  pass_criteria     text,
  fail_criteria     text,
  time_estimate     text,
  -- Results fields (filled during reflection)
  ran               text,   -- 'Yes' | 'No — <reason>'
  observed          text,
  verdict           text,   -- 'Confirm' | 'Challenge' | 'Complicate'
  updated_belief    text,
  next_step         text,   -- 'Carry forward' | 'Pivot to X' | 'Abandon'
  -- Metadata
  source            text default 'learning_log',
  created_at        timestamptz default now(),
  updated_at        timestamptz default now(),
  unique (week_start, experiment_index)
);

-- Auto-update updated_at on any row change
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger learning_weeks_updated_at
  before update on learning_weeks
  for each row execute procedure touch_updated_at();

create trigger experiments_updated_at
  before update on experiments
  for each row execute procedure touch_updated_at();
