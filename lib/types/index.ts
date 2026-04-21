// User Profile
export interface UserProfile {
  id: string;
  goal: 'fat_loss' | 'muscle_gain' | 'maintenance' | 'endurance' | 'general_fitness';
  weeklyWorkoutFrequency: number; // 1-7
  sleepBaseline: number; // hours
  weightUnit: 'lbs' | 'kg';
  notificationTime: string; // HH:mm
  notificationEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Check-in Entry
export interface CheckIn {
  id: string;
  date: string; // YYYY-MM-DD
  weight?: number; // nullable
  sleepHours: number; // 0-12
  energy: 1 | 2 | 3 | 4 | 5;
  soreness: 'none' | 'mild' | 'moderate' | 'high';
  workoutStatus: 'rest_day' | 'completed_workout' | 'planned_workout';
  workoutType?: 'strength' | 'run' | 'cycling' | 'hiit' | 'yoga' | 'swim' | 'pilates' | 'walk' | 'other';
  workoutDuration?: number; // minutes
  workoutIntensity?: 'easy' | 'steady' | 'moderate' | 'hard' | 'all_out';
  workoutNotes?: string;
  recommendationOverride?: 'push' | 'maintain' | 'recover'; // manual override
  createdAt: Date;
  updatedAt: Date;
}

// Recommendation (computed, not stored)
export interface DailyRecommendation {
  state: 'push' | 'maintain' | 'recover';
  confidence: number; // 0-1
  primaryFactors: string[]; // e.g., ["high_soreness", "low_sleep"]
  explanation: string;
  timestamp: Date;
}

// Insight (weekly summary)
export interface WeeklyInsight {
  id: string;
  weekStart: string; // YYYY-MM-DD (Sunday)
  insightType: 'on_track' | 'plateau_detected' | 'recovery_gap' | 'sleep_deficit' | 'overtraining_risk';
  summaryText: string;
  actionText: string;
  adherenceValue?: string; // "3/4" format
  avgSleep?: number;
  weightTrendDirection?: 'up' | 'down' | 'stable';
  weightTrendDelta?: number; // kg change for the week
  createdAt: Date;
}

// Weight Trend Analysis (computed)
export interface WeightTrend {
  smoothedValue: number;
  direction: 'up' | 'down' | 'stable';
  plateauDetected: boolean;
  deltaFrom4Weeks: number;
  lastUpdated: Date;
}

// Notification Settings
export interface NotificationSchedule {
  enabled: boolean;
  timeHHmm: string;
  snoozeDuration: number; // minutes
}

// Database row types (match schema exactly)
export interface UserProfileRow {
  id: string;
  goal: string;
  weekly_workout_frequency: number;
  sleep_baseline: number;
  weight_unit: string;
  notification_time: string;
  notification_enabled: number; // 0 or 1
  created_at: string;
  updated_at: string;
}

export interface CheckInRow {
  id: string;
  date: string;
  weight: number | null;
  sleep_hours: number;
  energy: number;
  soreness: string;
  workout_status: string;
  workout_type: string | null;
  workout_duration: number | null;
  workout_intensity: string | null;
  workout_notes: string | null;
  recommendation_override: string | null;
  created_at: string;
  updated_at: string;
}

export interface WeeklyInsightRow {
  id: string;
  week_start: string;
  insight_type: string;
  summary_text: string;
  action_text: string;
  adherence_value: string | null;
  avg_sleep: number | null;
  weight_trend_direction: string | null;
  weight_trend_delta: number | null;
  created_at: string;
}
