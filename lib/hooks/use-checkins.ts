import { useEffect, useState, useCallback } from 'react';
import { CheckIn } from '../types';
import * as checkinRepo from '../db/checkin-repo';
import { getTodayISO, getDaysAgo } from '../utils/date';

const testWeightCheckIns: CheckIn[] = [
  { date: getDaysAgo(0), weight: 76.1, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '0', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(1), weight: 76.3, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '1', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(2), weight: 76.2, energy: 3, soreness: 'mild', workoutStatus: 'rest_day', id: '2', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(3), weight: 76.4, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '3', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(4), weight: 76.3, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '4', createdAt: new Date(), updatedAt: new Date(), sleepHours: 8 },
  { date: getDaysAgo(5), weight: 76.1, energy: 3, soreness: 'mild', workoutStatus: 'rest_day', id: '5', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(6), weight: 76.5, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '6', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(7), weight: 76.0, energy: 5, soreness: 'none', workoutStatus: 'completed_workout', id: '7', createdAt: new Date(), updatedAt: new Date(), sleepHours: 8 },
  { date: getDaysAgo(8), weight: 76.2, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '8', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(9), weight: 76.3, energy: 3, soreness: 'mild', workoutStatus: 'rest_day', id: '9', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(10), weight: 76.4, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '10', createdAt: new Date(), updatedAt: new Date(), sleepHours: 8 },
  { date: getDaysAgo(11), weight: 76.1, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '11', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(12), weight: 76.5, energy: 3, soreness: 'mild', workoutStatus: 'rest_day', id: '12', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(13), weight: 76.2, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '13', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(14), weight: 76.3, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '14', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(15), weight: 76.8, energy: 3, soreness: 'mild', workoutStatus: 'rest_day', id: '15', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(16), weight: 76.5, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '16', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(17), weight: 76.0, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '17', createdAt: new Date(), updatedAt: new Date(), sleepHours: 8 },
  { date: getDaysAgo(18), weight: 77.0, energy: 3, soreness: 'mild', workoutStatus: 'rest_day', id: '18', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(19), weight: 77.5, energy: 4, soreness: 'none', workoutStatus: 'completed_workout', id: '19', createdAt: new Date(), updatedAt: new Date(), sleepHours: 7 },
  { date: getDaysAgo(20), weight: 78.0, energy: 5, soreness: 'none', workoutStatus: 'completed_workout', id: '20', createdAt: new Date(), updatedAt: new Date(), sleepHours: 8 },
];

export function useCheckins(days: number = 7) {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load check-ins on mount and when days changes
  useEffect(() => {
    loadCheckIns();
  }, [days]);

  async function loadCheckIns() {
    try {
      setLoading(true);
      // Fetch from database
      const dbCheckIns = await checkinRepo.getRecentCheckIns(days);
      setCheckIns(dbCheckIns);
      setError(null);
    } catch (err) {
      setCheckIns([]);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }

  async function getTodayCheckIn() {
    try {
      return await checkinRepo.getTodayCheckIn();
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  }

  async function saveCheckIn(data: Omit<CheckIn, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const saved = await checkinRepo.upsertCheckIn(data);
      // Refresh list
      await loadCheckIns();
      return saved;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    }
  }

  async function updateCheckIn(date: string, updates: Partial<Omit<CheckIn, 'id' | 'date' | 'createdAt'>>) {
    try {
      const updated = await checkinRepo.updateCheckIn(date, updates);
      await loadCheckIns();
      return updated;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    }
  }

  async function deleteCheckIn(date: string) {
    try {
      await checkinRepo.deleteCheckIn(date);
      await loadCheckIns();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    }
  }

  return {
    checkIns,
    loading,
    error,
    saveCheckIn,
    updateCheckIn,
    deleteCheckIn,
    getTodayCheckIn,
    refetch: loadCheckIns,
  };
}
