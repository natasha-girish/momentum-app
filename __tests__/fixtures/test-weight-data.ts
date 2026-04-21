import { CheckIn } from '@/lib/types';
import { getDaysAgo } from '@/lib/utils/date';

export const testWeightCheckIns: CheckIn[] = [
  { date: getDaysAgo(7), weight: 78.0, energy: 5, soreness: 'none', workoutStatus: 'completed_workout', id: '8', createdAt: new Date(), updatedAt: new Date(), sleepHours: 8 },
  { date: getDaysAgo(6), weight: 77.5, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '7', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(5), weight: 77.0, energy: 3, soreness: 'mild', workoutStatus: 'rest_day', id: '6', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(4), weight: 76.0, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '5', createdAt: new Date(), updatedAt: new Date(), sleepHours: 8 },
  { date: getDaysAgo(3), weight: 76.5, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '4', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(2), weight: 76.8, energy: 3, soreness: 'mild', workoutStatus: 'rest_day', id: '3', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(1), weight: 77.5, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '2', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(0), weight: 75.8, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '1', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
];
