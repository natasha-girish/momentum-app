// Demo data for web version - stored in memory/localStorage
import { UserProfile, CheckIn } from '../types';

const DEMO_PROFILE_KEY = 'demo_profile';
const DEMO_CHECKINS_KEY = 'demo_checkins';

export const DEMO_PROFILE: UserProfile = {
  id: 'demo-user',
  accountId: 'alex',
  goal: 'general_fitness',
  weeklyWorkoutFrequency: 4,
  sleepBaseline: 7.5,
  weightUnit: 'lbs',
  notificationTime: '08:00',
  notificationEnabled: true,
  createdAt: new Date('2025-04-01'),
  updatedAt: new Date(),
};

export const DEMO_CHECKINS: CheckIn[] = [
  {
    id: '1',
    accountId: 'alex',
    date: '2025-04-14',
    weight: 182.5,
    sleepHours: 8.5,
    energy: 5,
    soreness: 'none',
    workoutStatus: 'completed_workout',
    workoutType: 'strength',
    workoutDuration: 60,
    workoutIntensity: 'hard',
    workoutNotes: 'Heavy leg day',
    recommendationOverride: undefined,
    createdAt: new Date('2025-04-14'),
    updatedAt: new Date('2025-04-14'),
  },
  {
    id: '2',
    accountId: 'alex',
    date: '2025-04-15',
    weight: 182.3,
    sleepHours: 7,
    energy: 3,
    soreness: 'moderate',
    workoutStatus: 'rest_day',
    workoutType: undefined,
    workoutDuration: undefined,
    workoutIntensity: undefined,
    workoutNotes: undefined,
    recommendationOverride: undefined,
    createdAt: new Date('2025-04-15'),
    updatedAt: new Date('2025-04-15'),
  },
  {
    id: '3',
    accountId: 'alex',
    date: '2025-04-16',
    weight: 181.8,
    sleepHours: 8,
    energy: 4,
    soreness: 'mild',
    workoutStatus: 'completed_workout',
    workoutType: 'run',
    workoutDuration: 45,
    workoutIntensity: 'steady',
    workoutNotes: '5k steady pace',
    recommendationOverride: undefined,
    createdAt: new Date('2025-04-16'),
    updatedAt: new Date('2025-04-16'),
  },
  {
    id: '4',
    accountId: 'alex',
    date: '2025-04-17',
    weight: 181.5,
    sleepHours: 6.5,
    energy: 2,
    soreness: 'high',
    workoutStatus: 'rest_day',
    workoutType: undefined,
    workoutDuration: undefined,
    workoutIntensity: undefined,
    workoutNotes: undefined,
    recommendationOverride: undefined,
    createdAt: new Date('2025-04-17'),
    updatedAt: new Date('2025-04-17'),
  },
  {
    id: '5',
    accountId: 'alex',
    date: '2025-04-18',
    weight: 181.2,
    sleepHours: 9,
    energy: 5,
    soreness: 'none',
    workoutStatus: 'completed_workout',
    workoutType: 'yoga',
    workoutDuration: 30,
    workoutIntensity: 'easy',
    workoutNotes: 'Recovery yoga',
    recommendationOverride: undefined,
    createdAt: new Date('2025-04-18'),
    updatedAt: new Date('2025-04-18'),
  },
  {
    id: '6',
    accountId: 'alex',
    date: '2025-04-19',
    weight: 180.8,
    sleepHours: 7.5,
    energy: 4,
    soreness: 'mild',
    workoutStatus: 'completed_workout',
    workoutType: 'cycling',
    workoutDuration: 50,
    workoutIntensity: 'moderate',
    workoutNotes: 'Bike commute',
    recommendationOverride: undefined,
    createdAt: new Date('2025-04-19'),
    updatedAt: new Date('2025-04-19'),
  },
  {
    id: '7',
    accountId: 'alex',
    date: '2025-04-20',
    weight: 180.5,
    sleepHours: 8,
    energy: 5,
    soreness: 'none',
    workoutStatus: 'completed_workout',
    workoutType: 'strength',
    workoutDuration: 55,
    workoutIntensity: 'moderate',
    workoutNotes: 'Push day',
    recommendationOverride: undefined,
    createdAt: new Date('2025-04-20'),
    updatedAt: new Date('2025-04-20'),
  },
];

export function initializeDemoData(): void {
  if (typeof localStorage === 'undefined') return;

  const existingProfile = localStorage.getItem(DEMO_PROFILE_KEY);
  if (!existingProfile) {
    localStorage.setItem(DEMO_PROFILE_KEY, JSON.stringify(DEMO_PROFILE));
  }

  const existingCheckins = localStorage.getItem(DEMO_CHECKINS_KEY);
  if (!existingCheckins) {
    localStorage.setItem(DEMO_CHECKINS_KEY, JSON.stringify(DEMO_CHECKINS));
  }
}

export function getDemoProfile(): UserProfile | null {
  if (typeof localStorage === 'undefined') return null;
  const data = localStorage.getItem(DEMO_PROFILE_KEY);
  return data ? JSON.parse(data) : null;
}

export function getDemoCheckins(): CheckIn[] {
  if (typeof localStorage === 'undefined') return [];
  const data = localStorage.getItem(DEMO_CHECKINS_KEY);
  return data ? JSON.parse(data) : [];
}

export function clearDemoData(): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(DEMO_PROFILE_KEY);
  localStorage.removeItem(DEMO_CHECKINS_KEY);
}
