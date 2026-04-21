import { CheckIn, DailyRecommendation, UserProfile } from '../types';
import {
  ENGINE_CONSTANTS,
  RECOMMENDATION_COPY,
  FACTOR_DESCRIPTIONS,
} from './constants';
import { getTodayISO } from '../utils/date';

export function computeRecommendation(
  recentCheckIns: CheckIn[],
  _userProfile: UserProfile
): DailyRecommendation {
  const today = getTodayISO();

  // Check for manual override first
  const todayCheckIn = recentCheckIns.find((c) => c.date === today);
  if (todayCheckIn?.recommendationOverride) {
    return {
      state: todayCheckIn.recommendationOverride,
      confidence: 1.0,
      primaryFactors: ['manual_override'],
      explanation: getExplanation(todayCheckIn.recommendationOverride, [
        'manual_override',
      ]),
      timestamp: new Date(),
    };
  }

  // Require minimum 3 data points
  if (recentCheckIns.length < ENGINE_CONSTANTS.DATA_REQUIREMENT_DAYS) {
    return {
      state: 'maintain',
      confidence: 0.5,
      primaryFactors: ['insufficient_data'],
      explanation: getExplanation('maintain', ['insufficient_data']),
      timestamp: new Date(),
    };
  }

  // Analyze the last 7 days of data
  const last7Days = recentCheckIns.slice(
    0,
    Math.min(ENGINE_CONSTANTS.LOOKBACK_DAYS, recentCheckIns.length)
  );

  // Calculate factors
  const consecutiveTraining = calculateConsecutiveTrainingDays(last7Days);
  const sorenessFactor = calculateSorenessFactor(last7Days);
  const sleepFactor = calculateSleepFactor(last7Days);
  const energyFactor = calculateEnergyFactor(last7Days);
  const restDays = calculateRestDays(last7Days);

  // Build decision score (push > 0, recover < 0, maintain ≈ 0)
  let score = 0;
  const factors: string[] = [];

  // Soreness: high soreness → Recover
  if (sorenessFactor > 0.2) {
    score -= ENGINE_CONSTANTS.SORENESS_WEIGHT;
    factors.push('high_soreness');
  } else if (sorenessFactor > 0.05) {
    score -= 0.1;
    factors.push('mild_soreness');
  }

  // Training streak: 4+ consecutive days → Recover
  if (
    consecutiveTraining >=
    ENGINE_CONSTANTS.CONSECUTIVE_TRAINING_THRESHOLD
  ) {
    score -= ENGINE_CONSTANTS.TRAINING_STREAK_WEIGHT;
    factors.push('high_training_streak');
  }

  // Sleep: low sleep penalizes Push
  if (sleepFactor < ENGINE_CONSTANTS.CRITICAL_SLEEP_HOURS) {
    score -= ENGINE_CONSTANTS.SLEEP_WEIGHT;
    factors.push('low_sleep');
  } else if (sleepFactor > ENGINE_CONSTANTS.GOOD_SLEEP_HOURS) {
    score += ENGINE_CONSTANTS.SLEEP_WEIGHT * 0.5;
    factors.push('good_sleep');
  }

  // Energy: high energy supports Push
  if (energyFactor > 3.5) {
    score += ENGINE_CONSTANTS.ENERGY_WEIGHT;
    factors.push('high_energy');
  }

  // Rest days: fewer than 2 → nudge Recover
  if (restDays < ENGINE_CONSTANTS.MIN_REST_DAYS_PER_WEEK) {
    score -= ENGINE_CONSTANTS.TRAINING_STREAK_WEIGHT * 0.5;
    factors.push('insufficient_rest_days');
  }

  // Convert score to recommendation state
  const state = scoreToState(score);
  const confidence = calculateConfidence(factors);

  return {
    state,
    confidence,
    primaryFactors: factors,
    explanation: getExplanation(state, factors),
    timestamp: new Date(),
  };
}

// Helper functions

function scoreToState(
  score: number
): 'push' | 'maintain' | 'recover' {
  if (score > ENGINE_CONSTANTS.PUSH_THRESHOLD) {
    return 'push';
  }
  if (score < ENGINE_CONSTANTS.RECOVER_THRESHOLD) {
    return 'recover';
  }
  return 'maintain';
}

function calculateConsecutiveTrainingDays(checkIns: CheckIn[]): number {
  let streak = 0;
  for (const checkIn of checkIns) {
    if (checkIn.workoutStatus !== 'rest_day') {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function calculateSorenessFactor(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return 0;

  const weights: Record<string, number> = {
    none: 0,
    mild: 0.1,
    moderate: 0.2,
    high: 0.3,
  };

  let total = 0;
  for (const checkIn of checkIns.slice(0, 3)) {
    total += weights[checkIn.soreness] || 0;
  }

  return total / Math.min(3, checkIns.length);
}

function calculateSleepFactor(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return ENGINE_CONSTANTS.GOOD_SLEEP_HOURS;

  let total = 0;
  const window = Math.min(
    ENGINE_CONSTANTS.SLEEP_AVERAGE_WINDOW,
    checkIns.length
  );

  for (let i = 0; i < window; i++) {
    total += checkIns[i].sleepHours;
  }

  return total / window;
}

function calculateEnergyFactor(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return 3;

  let total = 0;
  for (const checkIn of checkIns.slice(0, 3)) {
    total += checkIn.energy;
  }

  return total / Math.min(3, checkIns.length);
}

function calculateRestDays(checkIns: CheckIn[]): number {
  let restCount = 0;
  for (const checkIn of checkIns) {
    if (checkIn.workoutStatus === 'rest_day') {
      restCount++;
    }
  }
  return restCount;
}

function calculateConfidence(factors: string[]): number {
  const count = factors.length;
  if (count < ENGINE_CONSTANTS.MIN_FACTORS_FOR_HIGH_CONFIDENCE) {
    return 0.6;
  }
  if (count > ENGINE_CONSTANTS.MAX_FACTORS_FOR_HIGH_CONFIDENCE) {
    return 0.8;
  }
  return 0.7;
}

function getExplanation(state: 'push' | 'maintain' | 'recover', factors: string[]): string {
  const copy = RECOMMENDATION_COPY[state];
  return `${copy.primary} ${copy.secondary}`;
}

// Utility function to get factor display names
export function getFactorDescriptions(factors: string[]): string[] {
  return factors
    .map((f) => FACTOR_DESCRIPTIONS[f] || f)
    .filter((d) => d !== undefined);
}
