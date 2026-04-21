import { computeRecoveryScore } from '../../lib/engines/recovery-analyzer';
import { CheckIn, UserProfile } from '../../lib/types';
import { getDaysAgo } from '../../lib/utils/date';

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
    weight: 180,
    sleepHours: 7,
    energy: 3,
    soreness: 'none',
    workoutStatus: 'rest_day',
    workoutDuration: 45,
    createdAt: new Date(date),
    updatedAt: new Date(date),
    ...overrides,
  };
}

describe('Recovery Analyzer', () => {
  test('returns fair score with no data', () => {
    const score = computeRecoveryScore([], mockProfile);
    expect(score.score).toBe(50);
    expect(score.status).toBe('fair');
  });

  test('excellent recovery with optimal sleep, high energy, no soreness', () => {
    const checkIns = [
      createCheckIn(0, { sleepHours: 7.5, energy: 5, soreness: 'none', workoutStatus: 'rest_day' }),
      createCheckIn(1, { sleepHours: 7, energy: 5, soreness: 'none', workoutStatus: 'rest_day' }),
      createCheckIn(2, { sleepHours: 7.5, energy: 4, soreness: 'none', workoutStatus: 'rest_day' }),
    ];
    const score = computeRecoveryScore(checkIns, mockProfile);
    expect(score.score).toBeGreaterThanOrEqual(70);
    expect(score.status).toMatch(/excellent|good/);
  });

  test('poor recovery with low sleep and high soreness', () => {
    const checkIns = [
      createCheckIn(0, { sleepHours: 5, energy: 1, soreness: 'high', workoutStatus: 'completed_workout', workoutIntensity: 'all_out' }),
      createCheckIn(1, { sleepHours: 5.5, energy: 2, soreness: 'high', workoutStatus: 'completed_workout', workoutIntensity: 'hard' }),
      createCheckIn(2, { sleepHours: 5, energy: 1, soreness: 'moderate', workoutStatus: 'completed_workout', workoutIntensity: 'hard' }),
    ];
    const score = computeRecoveryScore(checkIns, mockProfile);
    expect(score.score).toBeLessThan(50);
    expect(score.status).toMatch(/poor|fair/);
  });

  test('components range 0-100', () => {
    const checkIns = [
      createCheckIn(0, { sleepHours: 3, energy: 5, soreness: 'high', workoutStatus: 'completed_workout', workoutIntensity: 'all_out', workoutDuration: 120 }),
      createCheckIn(1, { sleepHours: 9, energy: 1, soreness: 'none', workoutStatus: 'rest_day' }),
    ];
    const score = computeRecoveryScore(checkIns, mockProfile);

    expect(score.components.sleep).toBeGreaterThanOrEqual(0);
    expect(score.components.sleep).toBeLessThanOrEqual(100);
    expect(score.components.energy).toBeGreaterThanOrEqual(0);
    expect(score.components.energy).toBeLessThanOrEqual(100);
    expect(score.components.soreness).toBeGreaterThanOrEqual(0);
    expect(score.components.soreness).toBeLessThanOrEqual(100);
    expect(score.components.workoutStress).toBeGreaterThanOrEqual(0);
    expect(score.components.workoutStress).toBeLessThanOrEqual(100);
    expect(score.components.restDays).toBeGreaterThanOrEqual(0);
    expect(score.components.restDays).toBeLessThanOrEqual(100);
  });

  test('overall score ranges 0-100', () => {
    const scenarios = [
      [], // No data
      [createCheckIn(0)],
      Array.from({ length: 7 }, (_, i) =>
        createCheckIn(i, {
          sleepHours: Math.random() * 10,
          energy: Math.floor(Math.random() * 5) + 1,
          soreness: ['none', 'mild', 'moderate', 'high'][Math.floor(Math.random() * 4)] as any,
          workoutStatus: Math.random() > 0.3 ? 'completed_workout' : 'rest_day',
        })
      ),
    ];

    scenarios.forEach((checkIns) => {
      const score = computeRecoveryScore(checkIns, mockProfile);
      expect(score.score).toBeGreaterThanOrEqual(0);
      expect(score.score).toBeLessThanOrEqual(100);
    });
  });

  test('recent days weighted more heavily', () => {
    // Old good recovery + recent poor recovery should lean poor
    const checkIns = [
      createCheckIn(0, { sleepHours: 5, energy: 1, soreness: 'high' }),
      createCheckIn(1, { sleepHours: 5.5, energy: 1, soreness: 'high' }),
      createCheckIn(6, { sleepHours: 8, energy: 5, soreness: 'none' }),
      createCheckIn(7, { sleepHours: 8, energy: 5, soreness: 'none' }),
    ];
    const score = computeRecoveryScore(checkIns, mockProfile);
    expect(score.score).toBeLessThan(65);
  });

  test('rest days improve recovery score', () => {
    const noRestCheckIns = [
      createCheckIn(0, { workoutStatus: 'completed_workout', workoutIntensity: 'hard' }),
      createCheckIn(1, { workoutStatus: 'completed_workout', workoutIntensity: 'hard' }),
      createCheckIn(2, { workoutStatus: 'completed_workout', workoutIntensity: 'hard' }),
      createCheckIn(3, { workoutStatus: 'completed_workout', workoutIntensity: 'hard' }),
    ];

    const withRestCheckIns = [
      createCheckIn(0, { workoutStatus: 'rest_day' }),
      createCheckIn(1, { workoutStatus: 'completed_workout', workoutIntensity: 'hard' }),
      createCheckIn(2, { workoutStatus: 'rest_day' }),
      createCheckIn(3, { workoutStatus: 'completed_workout', workoutIntensity: 'hard' }),
    ];

    const scoreNoRest = computeRecoveryScore(noRestCheckIns, mockProfile);
    const scoreWithRest = computeRecoveryScore(withRestCheckIns, mockProfile);

    expect(scoreWithRest.score).toBeGreaterThan(scoreNoRest.score);
  });
});
