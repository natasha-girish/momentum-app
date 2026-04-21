// All magic numbers centralized here for easy tuning

export const ENGINE_CONSTANTS = {
  // Training/rest patterns
  CONSECUTIVE_TRAINING_THRESHOLD: 4, // 4+ consecutive days without rest → Recover
  MIN_REST_DAYS_PER_WEEK: 2,

  // Scoring weights (must sum to ~1.0 for proportional scaling)
  SORENESS_WEIGHT: 0.3,
  SLEEP_WEIGHT: 0.25,
  ENERGY_WEIGHT: 0.25,
  TRAINING_STREAK_WEIGHT: 0.2,

  // Sleep thresholds
  CRITICAL_SLEEP_HOURS: 6, // Below this severely penalizes Push
  GOOD_SLEEP_HOURS: 7.5, // Above this supports Push
  SLEEP_AVERAGE_WINDOW: 3, // Days to average for sleep analysis

  // Data requirements
  DATA_REQUIREMENT_DAYS: 3, // Minimum check-ins before making recommendations
  LOOKBACK_DAYS: 7, // Days to look back when computing recommendation

  // Weight analysis
  WEIGHT_PLATEAU_THRESHOLD_LBS: 0.5,
  WEIGHT_PLATEAU_THRESHOLD_KG: 0.25,
  WEIGHT_PLATEAU_DAYS: 14, // Require this many days of minimal movement to call it a plateau

  // Confidence scoring
  MIN_FACTORS_FOR_HIGH_CONFIDENCE: 2,
  MAX_FACTORS_FOR_HIGH_CONFIDENCE: 4,

  // Thresholds for state conversion (score-based)
  PUSH_THRESHOLD: 0.15, // If score > this, recommend Push
  RECOVER_THRESHOLD: -0.15, // If score < this, recommend Recover
  // Otherwise: Maintain
} as const;

// Recommendation state explanations
export const RECOMMENDATION_COPY = {
  push: {
    primary: 'Signals look good today.',
    secondary: 'Your recovery markers are stable, so this is a good day to train with more intensity or volume.',
  },
  maintain: {
    primary: 'Your signals are mixed today.',
    secondary: 'Stay active, but keep the effort moderate rather than pushing too hard.',
  },
  recover: {
    primary: 'Your body looks like it needs recovery today.',
    secondary: 'A full rest day or light movement would likely support better performance tomorrow.',
  },
} as const;

// Insight type descriptions
export const INSIGHT_COPY = {
  on_track: 'You\'re tracking well',
  plateau_detected: 'Your weight seems stable',
  recovery_gap: 'You might need more recovery',
  sleep_deficit: 'Sleep could be affecting your performance',
  overtraining_risk: 'You might be pushing too hard',
} as const;

// Soreness levels and their impact
export const SORENESS_LEVELS = {
  none: { displayName: 'None', weight: 0 },
  mild: { displayName: 'Mild', weight: 0.1 },
  moderate: { displayName: 'Moderate', weight: 0.2 },
  high: { displayName: 'High', weight: 0.3 },
} as const;

// Energy levels and their impact
export const ENERGY_LEVELS = {
  1: { displayName: 'Very low', impact: -0.25 },
  2: { displayName: 'Low', impact: -0.1 },
  3: { displayName: 'Neutral', impact: 0 },
  4: { displayName: 'High', impact: 0.1 },
  5: { displayName: 'Very high', impact: 0.2 },
} as const;

// Factor descriptions for user display
export const FACTOR_DESCRIPTIONS: Record<string, string> = {
  high_soreness: 'High muscle soreness',
  mild_soreness: 'Mild muscle soreness',
  high_training_streak: 'High training streak (little rest)',
  low_sleep: 'Below-average sleep',
  good_sleep: 'Good sleep quality',
  high_energy: 'High energy levels',
  insufficient_rest_days: 'Fewer than 2 rest days this week',
  insufficient_data: 'Not enough data yet',
  manual_override: 'You manually set today\'s recommendation',
} as const;
