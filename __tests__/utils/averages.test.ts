import {
  average,
  weightedAverage,
  rollingAverage,
  standardDeviation,
  median,
  percentile,
} from '../../lib/utils/averages';

describe('Averages Utility', () => {
  describe('average', () => {
    test('calculates simple average', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
      expect(average([10, 20, 30])).toBe(20);
    });

    test('returns 0 for empty array', () => {
      expect(average([])).toBe(0);
    });

    test('handles single value', () => {
      expect(average([5])).toBe(5);
    });
  });

  describe('weightedAverage', () => {
    test('calculates weighted average', () => {
      // Values: [10, 20], Weights: [1, 2] → (10*1 + 20*2) / (1 + 2) = 50 / 3 = 16.67
      expect(weightedAverage([10, 20], [1, 2])).toBeCloseTo(16.67, 1);
    });

    test('throws on mismatched lengths', () => {
      expect(() => weightedAverage([1, 2, 3], [1, 2])).toThrow();
    });

    test('handles equal weights', () => {
      expect(weightedAverage([1, 2, 3], [1, 1, 1])).toBe(2);
    });
  });

  describe('rollingAverage', () => {
    test('calculates rolling average', () => {
      const result = rollingAverage([1, 2, 3, 4, 5], 2);
      expect(result).toEqual([1.5, 2.5, 3.5, 4.5]);
    });

    test('returns empty for insufficient data', () => {
      const result = rollingAverage([1, 2], 3);
      expect(result).toEqual([]);
    });

    test('handles window size 1', () => {
      const result = rollingAverage([1, 2, 3], 1);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('standardDeviation', () => {
    test('calculates standard deviation', () => {
      const result = standardDeviation([1, 2, 3, 4, 5]);
      expect(result).toBeCloseTo(1.414, 2); // sqrt(2)
    });

    test('returns 0 for constant values', () => {
      expect(standardDeviation([5, 5, 5, 5])).toBeCloseTo(0, 5);
    });

    test('returns 0 for empty array', () => {
      expect(standardDeviation([])).toBe(0);
    });
  });

  describe('median', () => {
    test('calculates median for odd-length arrays', () => {
      expect(median([1, 2, 3, 4, 5])).toBe(3);
      expect(median([3, 1, 2])).toBe(2);
    });

    test('calculates median for even-length arrays', () => {
      expect(median([1, 2, 3, 4])).toBe(2.5);
      expect(median([10, 20, 30, 40])).toBe(25);
    });

    test('returns 0 for empty array', () => {
      expect(median([])).toBe(0);
    });

    test('handles single value', () => {
      expect(median([42])).toBe(42);
    });
  });

  describe('percentile', () => {
    test('calculates percentile', () => {
      const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(percentile(values, 50)).toBe(5.5); // Median
      expect(percentile(values, 25)).toBe(3.25); // Q1
      expect(percentile(values, 75)).toBe(7.75); // Q3
    });

    test('throws on invalid percentile', () => {
      expect(() => percentile([1, 2, 3], -1)).toThrow();
      expect(() => percentile([1, 2, 3], 101)).toThrow();
    });

    test('returns 0 for empty array', () => {
      expect(percentile([], 50)).toBe(0);
    });
  });
});
