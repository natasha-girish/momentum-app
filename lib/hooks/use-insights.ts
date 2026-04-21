import { useEffect, useState } from 'react';
import { WeeklyInsight } from '../types';
import * as insightRepo from '../db/insight-repo';
import * as checkinRepo from '../db/checkin-repo';
import * as userRepo from '../db/user-repo';
import { generateWeeklyInsight } from '../engines/insight-generator';
import { getWeekStart } from '../utils/date';

export function useInsights(weeks: number = 8) {
  const [insights, setInsights] = useState<WeeklyInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadInsights();
  }, [weeks]);

  async function loadInsights() {
    try {
      setLoading(true);
      let loaded = await insightRepo.getRecentInsights(weeks);
      // Generate insights from check-ins if none exist
      if (loaded.length === 0) {
        const allCheckIns = await checkinRepo.getAllCheckIns();
        const profile = await userRepo.getUserProfile();

        if (allCheckIns.length > 0 && profile) {
          // Group by week and generate insights
          const weekMap = new Map<string, typeof allCheckIns>();
          allCheckIns.forEach(checkIn => {
            const weekStart = getWeekStart(new Date(checkIn.date + 'T00:00:00'));
            if (!weekMap.has(weekStart)) {
              weekMap.set(weekStart, []);
            }
            weekMap.get(weekStart)!.push(checkIn);
          });

          // Generate and save insights for each week
          for (const [weekStart, weekCheckIns] of weekMap) {
            const insight = generateWeeklyInsight(weekCheckIns, profile, weekStart);
            if (insight) {
              const { id, createdAt, ...insightData } = insight;
              await insightRepo.createInsight(insightData as any);
            }
          }

          loaded = await insightRepo.getRecentInsights(weeks);
        }
      }

      setInsights(loaded);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }

  async function getInsightForWeek(weekStart: string) {
    try {
      return await insightRepo.getInsightForWeek(weekStart);
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  }

  async function createInsight(data: Omit<WeeklyInsight, 'id' | 'createdAt'>) {
    try {
      const created = await insightRepo.createInsight(data);
      await loadInsights();
      return created;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    }
  }

  return {
    insights,
    loading,
    error,
    getInsightForWeek,
    createInsight,
    refetch: loadInsights,
  };
}
