/**
 * Calculate simple average of numbers
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

/**
 * Calculate weighted average
 */
export function weightedAverage(
  values: number[],
  weights: number[]
): number {
  if (values.length === 0 || weights.length === 0) return 0;
  if (values.length !== weights.length) {
    throw new Error('Values and weights must have the same length');
  }

  let sumWeighted = 0;
  let sumWeights = 0;

  for (let i = 0; i < values.length; i++) {
    sumWeighted += values[i] * weights[i];
    sumWeights += weights[i];
  }

  return sumWeights === 0 ? 0 : sumWeighted / sumWeights;
}

/**
 * Calculate rolling average over a window
 */
export function rollingAverage(values: number[], windowSize: number): number[] {
  const result: number[] = [];

  for (let i = 0; i <= values.length - windowSize; i++) {
    const window = values.slice(i, i + windowSize);
    result.push(average(window));
  }

  return result;
}

/**
 * Calculate exponential weighted average (more recent values weighted higher)
 */
export function exponentialAverage(values: number[], smoothing: number = 0.3): number[] {
  if (values.length === 0) return [];

  const result: number[] = [];
  result[0] = values[0];

  for (let i = 1; i < values.length; i++) {
    result[i] = values[i] * smoothing + result[i - 1] * (1 - smoothing);
  }

  return result;
}

/**
 * Get min and max from array
 */
export function minMax(numbers: number[]): [number, number] | null {
  if (numbers.length === 0) return null;
  return [Math.min(...numbers), Math.max(...numbers)];
}

/**
 * Calculate standard deviation
 */
export function standardDeviation(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const avg = average(numbers);
  const squaredDiffs = numbers.map((n) => Math.pow(n - avg, 2));
  const variance = average(squaredDiffs);

  return Math.sqrt(variance);
}

/**
 * Calculate median
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }

  return (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Calculate percentile (e.g., 95th percentile)
 */
export function percentile(numbers: number[], p: number): number {
  if (numbers.length === 0) return 0;
  if (p < 0 || p > 100) throw new Error('Percentile must be between 0 and 100');

  const sorted = [...numbers].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index % 1;

  if (lower === upper) {
    return sorted[lower];
  }

  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}
