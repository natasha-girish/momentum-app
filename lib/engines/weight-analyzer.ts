import { CheckIn, WeightTrend } from '../types';
import { ENGINE_CONSTANTS } from './constants';
import { getDaysAgo, getTodayISO } from '../utils/date';

export function analyzeWeightTrend(checkIns: CheckIn[]): WeightTrend | null {
  // Filter to weight entries only
  const withWeight = checkIns.filter((c) => c.weight !== undefined);

  if (withWeight.length < 5) {
    return null; // Need minimum 5 data points
  }

  // Calculate 7-day rolling average
  const smoothed = calculateRollingAverage(withWeight, 7);
  if (smoothed.length === 0) {
    return null;
  }

  const currentSmoothed = smoothed[0];
  const direction = calculateDirection(smoothed);
  const plateauDetected = checkPlateau(smoothed);

  // Calculate delta from 4 weeks ago
  const fourWeeksAgo = getDaysAgo(28);
  const oldCheckIn = withWeight.find((c) => c.date <= fourWeeksAgo);
  const deltaFrom4Weeks = oldCheckIn ? currentSmoothed - oldCheckIn.weight! : 0;

  return {
    smoothedValue: currentSmoothed,
    direction,
    plateauDetected,
    deltaFrom4Weeks,
    lastUpdated: new Date(),
  };
}

export function calculateRollingAverage(
  checkIns: CheckIn[],
  windowSize: number
): number[] {
  if (checkIns.length < windowSize) {
    return [];
  }

  const averages: number[] = [];

  for (let i = 0; i <= checkIns.length - windowSize; i++) {
    let sum = 0;
    let count = 0;

    for (let j = i; j < i + windowSize; j++) {
      if (checkIns[j].weight !== undefined) {
        sum += checkIns[j].weight!;
        count++;
      }
    }

    if (count > 0) {
      averages.push(sum / count);
    }
  }

  return averages;
}

function calculateDirection(
  smoothedValues: number[]
): 'up' | 'down' | 'stable' {
  if (smoothedValues.length < 2) {
    return 'stable';
  }

  const current = smoothedValues[0];
  const past = smoothedValues[Math.min(smoothedValues.length - 1, 10)];
  const delta = current - past;
  const threshold = 0.2;

  if (delta > threshold) {
    return 'up';
  }
  if (delta < -threshold) {
    return 'down';
  }
  return 'stable';
}

function checkPlateau(smoothedValues: number[]): boolean {
  if (smoothedValues.length < ENGINE_CONSTANTS.WEIGHT_PLATEAU_DAYS) {
    return false;
  }

  // Check if movement over last 14 days is less than threshold
  const recent = smoothedValues.slice(0, ENGINE_CONSTANTS.WEIGHT_PLATEAU_DAYS);
  const maxRecent = Math.max(...recent);
  const minRecent = Math.min(...recent);
  const movement = maxRecent - minRecent;

  return movement <= ENGINE_CONSTANTS.WEIGHT_PLATEAU_THRESHOLD_LBS;
}

// Get weight trend for display (comparing to 4 weeks ago)
export function getWeightTrendDelta(checkIns: CheckIn[]): number | null {
  const withWeight = checkIns.filter((c) => c.weight !== undefined);
  if (withWeight.length === 0) {
    return null;
  }

  const today = getTodayISO();
  const fourWeeksAgo = getDaysAgo(28);

  const currentWeight = withWeight[0].weight;
  const oldCheckIn = withWeight.find((c) => c.date <= fourWeeksAgo);

  if (!oldCheckIn || !currentWeight) {
    return null;
  }

  return currentWeight - oldCheckIn.weight!;
}

// Get latest weight
export function getLatestWeight(checkIns: CheckIn[]): number | null {
  const withWeight = checkIns.filter((c) => c.weight !== undefined);
  return withWeight.length > 0 ? withWeight[0].weight! : null;
}

// Prepare chart data
export interface ChartDataPoint {
  date: string;
  weight: number;
  smoothed?: number;
}

export function prepareChartData(checkIns: CheckIn[]): ChartDataPoint[] {
  const withWeight = checkIns.filter((c) => c.weight !== undefined);

  if (withWeight.length < 5) {
    return [];
  }

  // Calculate 7-day rolling average
  const windowSize = 7;
  const smoothed = calculateRollingAverage(withWeight, windowSize);

  // Build data points, only including entries with smoothed values
  const data: ChartDataPoint[] = [];
  const startIndex = windowSize - 1; // First entry with a complete smoothed window

  for (let i = startIndex; i < withWeight.length; i++) {
    const smoothedIndex = i - startIndex;
    data.push({
      date: withWeight[i].date,
      weight: withWeight[i].weight!,
      smoothed: smoothed[smoothedIndex],
    });
  }

  return data;
}
