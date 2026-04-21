import { CheckIn, UserProfile } from '../types';
import { ENGINE_CONSTANTS } from './constants';

export interface RecoveryScore {
  score: number; // 0-100
  components: {
    sleep: number; // 0-100
    energy: number; // 0-100
    soreness: number; // 0-100 (inverse: high soreness = low score)
    workoutStress: number; // 0-100 (inverse: high stress = low score)
    restDays: number; // 0-100
  };
  status: 'critical' | 'poor' | 'fair' | 'good' | 'excellent';
}

export function computeRecoveryScore(
  recentCheckIns: CheckIn[],
  userProfile: UserProfile
): RecoveryScore {
  // Require minimum data
  if (recentCheckIns.length === 0) {
    return {
      score: 50,
      components: {
        sleep: 50,
        energy: 50,
        soreness: 50,
        workoutStress: 50,
        restDays: 50,
      },
      status: 'fair',
    };
  }

  // Analyze last 7 days
  const last7Days = recentCheckIns.slice(
    0,
    Math.min(7, recentCheckIns.length)
  );

  // Compute individual components (each 0-100)
  const sleepScore = computeSleepScore(last7Days, userProfile.sleepBaseline);
  const energyScore = computeEnergyScore(last7Days);
  const sorenessScore = computeSorenessScore(last7Days);
  const workoutStressScore = computeWorkoutStressScore(last7Days);
  const restDaysScore = computeRestDaysScore(last7Days);

  // Weighted average (can tune these weights)
  const weights = {
    sleep: 0.25,
    energy: 0.25,
    soreness: 0.2,
    workoutStress: 0.15,
    restDays: 0.15,
  };

  const score = Math.round(
    sleepScore * weights.sleep +
      energyScore * weights.energy +
      sorenessScore * weights.soreness +
      workoutStressScore * weights.workoutStress +
      restDaysScore * weights.restDays
  );

  return {
    score,
    components: {
      sleep: sleepScore,
      energy: energyScore,
      soreness: sorenessScore,
      workoutStress: workoutStressScore,
      restDays: restDaysScore,
    },
    status: scoreToStatus(score),
  };
}

function computeSleepScore(checkIns: CheckIn[], baseline: number): number {
  if (checkIns.length === 0) return 50;

  // Average sleep over last 7 days
  const avgSleep = checkIns.reduce((sum, c) => sum + c.sleepHours, 0) / checkIns.length;

  // Score based on deviation from baseline
  // Baseline is optimal, ±1.5 hours is acceptable
  const diff = Math.abs(avgSleep - baseline);

  if (diff <= 0.5) return 100; // Spot on
  if (diff <= 1) return 85;
  if (diff <= 1.5) return 70;
  if (diff <= 2) return 55;
  return Math.max(30, 100 - diff * 20); // Floor at 30
}

function computeEnergyScore(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return 50;

  // Average energy, weight more recent days
  let total = 0;
  let weight = 0;
  for (let i = 0; i < checkIns.length; i++) {
    const dayWeight = (checkIns.length - i) / checkIns.length; // Recent days weighted higher
    total += checkIns[i].energy * dayWeight;
    weight += dayWeight;
  }

  const avgEnergy = total / weight;

  // Convert 1-5 scale to 0-100
  // 5 = 100, 3 = 50, 1 = 0
  return Math.round(((avgEnergy - 1) / 4) * 100);
}

function computeSorenessScore(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return 50;

  const weights: Record<string, number> = {
    none: 100,
    mild: 75,
    moderate: 50,
    high: 20,
  };

  // Average soreness, weight more recent days higher (they matter more for recovery)
  let total = 0;
  let weight = 0;
  for (let i = 0; i < checkIns.length; i++) {
    const dayWeight = (checkIns.length - i) / checkIns.length;
    total += (weights[checkIns[i].soreness] || 50) * dayWeight;
    weight += dayWeight;
  }

  return Math.round(total / weight);
}

function computeWorkoutStressScore(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return 50;

  // High stress = recent intense workouts reduce recovery
  // No workout = rest day = positive for recovery
  let stressLoad = 0;

  for (let i = 0; i < checkIns.length; i++) {
    const checkIn = checkIns[i];
    const dayWeight = (checkIns.length - i) / checkIns.length;

    if (checkIn.workoutStatus === 'rest_day') {
      stressLoad -= 15 * dayWeight; // Rest reduces stress load
    } else if (checkIn.workoutStatus === 'completed_workout') {
      let intensity = 5; // Default intensity
      if (checkIn.workoutIntensity === 'easy') intensity = 2;
      else if (checkIn.workoutIntensity === 'steady') intensity = 4;
      else if (checkIn.workoutIntensity === 'moderate') intensity = 5;
      else if (checkIn.workoutIntensity === 'hard') intensity = 7;
      else if (checkIn.workoutIntensity === 'all_out') intensity = 10;

      const duration = checkIn.workoutDuration || 45; // Default 45 min
      const stressFromWorkout = (intensity * duration) / 100; // Normalize

      stressLoad += stressFromWorkout * dayWeight;
    }
  }

  // Convert stress load (-15 to 50+) to 0-100 score (inverse)
  // High stress = low score
  const score = Math.max(0, 100 - stressLoad * 3);
  return Math.round(Math.min(100, score));
}

function computeRestDaysScore(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return 50;

  const restDays = checkIns.filter(c => c.workoutStatus === 'rest_day').length;
  const restDayRatio = restDays / checkIns.length;

  // Optimal: 25-40% rest days (2-3 per week)
  if (restDayRatio >= 0.25 && restDayRatio <= 0.4) return 100;
  if (restDayRatio >= 0.15) return 85; // Still good
  if (restDayRatio >= 0.1) return 60; // Not enough rest
  return 40; // Very low rest
}

function scoreToStatus(score: number): 'critical' | 'poor' | 'fair' | 'good' | 'excellent' {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'fair';
  if (score >= 20) return 'poor';
  return 'critical';
}

export function getRecoveryStatusColor(status: string): string {
  switch (status) {
    case 'excellent':
      return '#6B9E7F'; // Muted green
    case 'good':
      return '#6B8CB4'; // Muted blue
    case 'fair':
      return '#F59E0B'; // Amber
    case 'poor':
      return '#EF4444'; // Red
    case 'critical':
      return '#991B1B'; // Dark red
    default:
      return '#6B7280'; // Gray
  }
}
