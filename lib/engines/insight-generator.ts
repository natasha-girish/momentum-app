import { CheckIn, UserProfile, WeeklyInsight } from '../types';
import { getWeekStart } from '../utils/date';
import { analyzeWeightTrend, getWeightTrendDelta } from './weight-analyzer';
import { generateUUID } from '../utils/uuid';

export type InsightType =
  | 'on_track'
  | 'plateau_detected'
  | 'recovery_gap'
  | 'sleep_deficit'
  | 'overtraining_risk';

export interface InsightAnalysis {
  type: InsightType;
  priority: number; // Higher = more important
  summary: string;
  action: string;
}

export function generateWeeklyInsight(
  weekCheckIns: CheckIn[],
  _userProfile: UserProfile,
  weekStart: string
): WeeklyInsight | null {
  if (weekCheckIns.length === 0) {
    return null;
  }

  const insight = analyzeWeek(weekCheckIns);
  if (!insight) {
    return null;
  }

  return {
    id: generateUUID(),
    weekStart,
    insightType: insight.type,
    summaryText: insight.summary,
    actionText: insight.action,
    adherenceValue: calculateAdherence(weekCheckIns),
    avgSleep: calculateAverageSleep(weekCheckIns),
    weightTrendDirection: calculateWeightTrend(weekCheckIns),
    weightTrendDelta: calculateWeightDelta(weekCheckIns),
    createdAt: new Date(),
  };
}

function analyzeWeek(checkIns: CheckIn[]): InsightAnalysis | null {
  const analyses: InsightAnalysis[] = [];

  // Check for sleep deficit
  const avgSleep = calculateAverageSleep(checkIns);
  if (avgSleep < 6.5) {
    analyses.push({
      type: 'sleep_deficit',
      priority: 4,
      summary: `Average sleep was ${avgSleep.toFixed(1)} hours. Better sleep may improve recovery.`,
      action: 'Aim for 7-8 hours of sleep per night this week.',
    });
  }

  // Check for overtraining
  const workoutDays = checkIns.filter(
    (c) => c.workoutStatus !== 'rest_day'
  ).length;
  const restDays = checkIns.filter((c) => c.workoutStatus === 'rest_day').length;

  if (workoutDays >= 6 && restDays <= 1) {
    analyses.push({
      type: 'overtraining_risk',
      priority: 5,
      summary: `You trained ${workoutDays} out of 7 days. Recovery is important.`,
      action: 'Consider taking more full rest days next week.',
    });
  }

  // Check for recovery gap
  const avgSoreness = calculateAverageSoreness(checkIns);
  if (avgSoreness > 0.15) {
    analyses.push({
      type: 'recovery_gap',
      priority: 3,
      summary:
        'Your soreness levels suggest you might benefit from more recovery.',
      action:
        'Try adding an extra rest day or lighter activity day next week.',
    });
  }

  // Check for weight plateau
  const trend = analyzeWeightTrend(checkIns);
  if (trend?.plateauDetected) {
    analyses.push({
      type: 'plateau_detected',
      priority: 2,
      summary: 'Your weight has been stable for the last 2 weeks.',
      action: 'If you\'re aiming for change, consider adjusting your routine.',
    });
  }

  // Default: on track
  if (analyses.length === 0) {
    analyses.push({
      type: 'on_track',
      priority: 1,
      summary: 'You\'re staying consistent with your routine.',
      action: 'Keep up the regular check-ins and consistency.',
    });
  }

  // Return highest priority insight
  analyses.sort((a, b) => b.priority - a.priority);
  return analyses[0];
}

function calculateAdherence(checkIns: CheckIn[]): string {
  const workoutDays = checkIns.filter(
    (c) => c.workoutStatus !== 'rest_day'
  ).length;
  const totalDays = checkIns.length;
  return `${workoutDays}/${totalDays}`;
}

function calculateAverageSleep(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return 0;
  const total = checkIns.reduce((sum, c) => sum + c.sleepHours, 0);
  return total / checkIns.length;
}

function calculateAverageSoreness(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return 0;

  const weights: Record<string, number> = {
    none: 0,
    mild: 0.1,
    moderate: 0.2,
    high: 0.3,
  };

  const total = checkIns.reduce((sum, c) => sum + (weights[c.soreness] || 0), 0);
  return total / checkIns.length;
}

function calculateWeightTrend(checkIns: CheckIn[]): 'up' | 'down' | 'stable' | undefined {
  const withWeight = checkIns.filter((c) => c.weight !== undefined);
  if (withWeight.length < 2) {
    return undefined;
  }

  const first = withWeight[withWeight.length - 1].weight!;
  const last = withWeight[0].weight!;
  const delta = last - first;
  const threshold = 0.5;

  if (delta > threshold) {
    return 'up';
  }
  if (delta < -threshold) {
    return 'down';
  }
  return 'stable';
}

function calculateWeightDelta(checkIns: CheckIn[]): number | undefined {
  const withWeight = checkIns.filter((c) => c.weight !== undefined);
  if (withWeight.length < 2) {
    return undefined;
  }

  const first = withWeight[withWeight.length - 1].weight!;
  const last = withWeight[0].weight!;
  return Number((last - first).toFixed(1));
}
