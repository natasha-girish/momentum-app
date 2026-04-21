import { computeRecommendation } from '../../lib/engines/recommendation-engine';
import { CheckIn, UserProfile } from '../../lib/types';
import { getTodayISO, getDaysAgo } from '../../lib/utils/date';

const mockProfile: UserProfile = {
  id: 'test-user',
  goal: 'general_fitness',
  weeklyWorkoutFrequency: 3,
  sleepBaseline: 7,
  weightUnit: 'lbs',
  notificationTime: '08:00',
  notificationEnabled: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

function createCheckIn(
  daysAgo: number,
  overrides: Partial<CheckIn> = {}
): CheckIn {
  const date = getDaysAgo(daysAgo);
  return {
    id: `checkin-${daysAgo}`,
    date,
    weight: 180 + Math.random() * 5,
    sleepHours: 7 + Math.random() * 2,
    energy: 3,
    soreness: 'none',
    workoutStatus: 'rest_day',
    createdAt: new Date(date),
    updatedAt: new Date(date),
    ...overrides,
  };
}

describe('Recommendation Engine', () => {
  test('returns maintain when insufficient data', () => {
    const checkIns = [createCheckIn(0)];
    const rec = computeRecommendation(checkIns, mockProfile);

    expect(rec.state).toBe('maintain');
    expect(rec.confidence).toBeLessThan(0.6);
    expect(rec.primaryFactors).toContain('insufficient_data');
  });

  test('respects manual override', () => {
    const checkIns = [
      createCheckIn(0, { recommendationOverride: 'recover' }),
      createCheckIn(1),
      createCheckIn(2),
      createCheckIn(3),
      createCheckIn(4),
    ];

    const rec = computeRecommendation(checkIns, mockProfile);

    expect(rec.state).toBe('recover');
    expect(rec.confidence).toBe(1.0);
    expect(rec.primaryFactors).toContain('manual_override');
  });

  test('recommends recover after consecutive training days', () => {
    const checkIns = [
      createCheckIn(0, { workoutStatus: 'completed_workout' }),
      createCheckIn(1, { workoutStatus: 'completed_workout' }),
      createCheckIn(2, { workoutStatus: 'completed_workout' }),
      createCheckIn(3, { workoutStatus: 'completed_workout' }),
      createCheckIn(4, { workoutStatus: 'rest_day' }),
    ];

    const rec = computeRecommendation(checkIns, mockProfile);

    expect(rec.state).toBe('recover');
    expect(rec.primaryFactors).toContain('high_training_streak');
  });

  test('penalizes low sleep', () => {
    const checkIns = [
      createCheckIn(0, { sleepHours: 5 }),
      createCheckIn(1, { sleepHours: 5.5 }),
      createCheckIn(2, { sleepHours: 5 }),
      createCheckIn(3, { sleepHours: 8 }),
      createCheckIn(4, { sleepHours: 7 }),
    ];

    const rec = computeRecommendation(checkIns, mockProfile);

    expect(rec.primaryFactors).toContain('low_sleep');
  });

  test('boosts push with high energy and good sleep', () => {
    const checkIns = [
      createCheckIn(0, { sleepHours: 8.5, energy: 5 }),
      createCheckIn(1, { sleepHours: 8, energy: 5 }),
      createCheckIn(2, { sleepHours: 8.2, energy: 4 }),
      createCheckIn(3, { sleepHours: 7.9, energy: 5 }),
      createCheckIn(4, { sleepHours: 8.1, energy: 4, workoutStatus: 'rest_day' }),
    ];

    const rec = computeRecommendation(checkIns, mockProfile);

    expect(rec.state).toBe('push');
    expect(rec.primaryFactors).toContain('good_sleep');
    expect(rec.primaryFactors).toContain('high_energy');
  });

  test('handles high soreness', () => {
    const checkIns = [
      createCheckIn(0, { soreness: 'high' }),
      createCheckIn(1, { soreness: 'high' }),
      createCheckIn(2, { soreness: 'moderate' }),
      createCheckIn(3, { soreness: 'none' }),
      createCheckIn(4, { soreness: 'none' }),
    ];

    const rec = computeRecommendation(checkIns, mockProfile);

    expect(rec.state).toBe('recover');
    expect(rec.primaryFactors).toContain('high_soreness');
  });

  test('detects insufficient rest days', () => {
    const checkIns = [
      createCheckIn(0, { workoutStatus: 'completed_workout' }),
      createCheckIn(1, { workoutStatus: 'completed_workout' }),
      createCheckIn(2, { workoutStatus: 'completed_workout' }),
      createCheckIn(3, { workoutStatus: 'completed_workout' }),
      createCheckIn(4, { workoutStatus: 'completed_workout' }),
      createCheckIn(5, { workoutStatus: 'rest_day' }),
      createCheckIn(6, { workoutStatus: 'rest_day' }),
    ];

    const rec = computeRecommendation(checkIns, mockProfile);

    expect(rec.primaryFactors).toContain('insufficient_rest_days');
  });

  test('generates valid explanation', () => {
    const checkIns = [
      createCheckIn(0),
      createCheckIn(1),
      createCheckIn(2),
      createCheckIn(3),
      createCheckIn(4),
    ];

    const rec = computeRecommendation(checkIns, mockProfile);

    expect(rec.explanation).toBeTruthy();
    expect(rec.explanation.length).toBeGreaterThan(10);
  });

  test('maintains reasonable confidence scores', () => {
    const checkIns = [
      createCheckIn(0),
      createCheckIn(1),
      createCheckIn(2),
      createCheckIn(3),
      createCheckIn(4),
    ];

    const rec = computeRecommendation(checkIns, mockProfile);

    expect(rec.confidence).toBeGreaterThanOrEqual(0);
    expect(rec.confidence).toBeLessThanOrEqual(1);
  });
});
