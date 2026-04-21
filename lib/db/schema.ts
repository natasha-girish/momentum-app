export const SCHEMA_VERSION = 2;

export const CREATE_USER_PROFILE_TABLE = `
  CREATE TABLE IF NOT EXISTS user_profile (
    id TEXT PRIMARY KEY,
    goal TEXT NOT NULL DEFAULT 'general_fitness',
    weekly_workout_frequency INTEGER NOT NULL DEFAULT 3,
    sleep_baseline INTEGER NOT NULL DEFAULT 7,
    weight_unit TEXT NOT NULL DEFAULT 'lbs',
    notification_time TEXT NOT NULL DEFAULT '08:00',
    notification_enabled INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`;

export const CREATE_CHECKINS_TABLE = `
  CREATE TABLE IF NOT EXISTS checkins (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL UNIQUE,
    weight REAL,
    sleep_hours REAL NOT NULL,
    energy INTEGER NOT NULL CHECK (energy BETWEEN 1 AND 5),
    soreness TEXT NOT NULL CHECK (soreness IN ('none', 'mild', 'moderate', 'high')),
    workout_status TEXT NOT NULL CHECK (workout_status IN ('rest_day', 'completed_workout', 'planned_workout')),
    workout_type TEXT CHECK (workout_type IN ('strength', 'run', 'cycling', 'hiit', 'yoga', 'swim', 'pilates', 'walk', 'other', NULL)),
    workout_duration INTEGER,
    workout_intensity TEXT CHECK (workout_intensity IN ('easy', 'steady', 'moderate', 'hard', 'all_out', NULL)),
    workout_notes TEXT,
    recommendation_override TEXT CHECK (recommendation_override IN ('push', 'maintain', 'recover', NULL)),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`;

export const CREATE_INSIGHTS_TABLE = `
  CREATE TABLE IF NOT EXISTS insights (
    id TEXT PRIMARY KEY,
    week_start TEXT NOT NULL UNIQUE,
    insight_type TEXT NOT NULL CHECK (insight_type IN ('on_track', 'plateau_detected', 'recovery_gap', 'sleep_deficit', 'overtraining_risk')),
    summary_text TEXT NOT NULL,
    action_text TEXT NOT NULL,
    adherence_value TEXT,
    avg_sleep REAL,
    weight_trend_direction TEXT CHECK (weight_trend_direction IN ('up', 'down', 'stable')),
    weight_trend_delta REAL,
    created_at TEXT NOT NULL
  );
`;

export const CREATE_CHECKINS_DATE_INDEX = `
  CREATE INDEX IF NOT EXISTS idx_checkins_date ON checkins(date);
`;

export const CREATE_INSIGHTS_WEEK_INDEX = `
  CREATE INDEX IF NOT EXISTS idx_insights_week_start ON insights(week_start);
`;

export const ALL_TABLES = [
  CREATE_USER_PROFILE_TABLE,
  CREATE_CHECKINS_TABLE,
  CREATE_INSIGHTS_TABLE,
  CREATE_CHECKINS_DATE_INDEX,
  CREATE_INSIGHTS_WEEK_INDEX,
];
