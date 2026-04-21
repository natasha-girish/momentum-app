import { queryAll, queryOne, execute } from './database';
import { WeeklyInsight, WeeklyInsightRow } from '../types';
import { generateUUID } from '../utils/uuid';

export async function getInsightForWeek(weekStart: string): Promise<WeeklyInsight | null> {
  const row = await queryOne<WeeklyInsightRow>(
    'SELECT * FROM insights WHERE week_start = ?',
    [weekStart]
  );

  return row ? mapRowToInsight(row) : null;
}

export async function getRecentInsights(weeks: number = 8): Promise<WeeklyInsight[]> {
  const rows = await queryAll<WeeklyInsightRow>(
    `SELECT * FROM insights
     ORDER BY week_start DESC
     LIMIT ?`,
    [weeks]
  );

  return rows.map(mapRowToInsight);
}

export async function getAllInsights(): Promise<WeeklyInsight[]> {
  const rows = await queryAll<WeeklyInsightRow>(
    'SELECT * FROM insights ORDER BY week_start DESC'
  );

  return rows.map(mapRowToInsight);
}

export async function createInsight(
  insight: Omit<WeeklyInsight, 'id' | 'createdAt'>
): Promise<WeeklyInsight> {
  const now = new Date().toISOString();
  const id = generateUUID();

  const newInsight: WeeklyInsight = {
    id,
    ...insight,
    createdAt: new Date(now),
  };

  await execute(
    `INSERT INTO insights
      (id, week_start, insight_type, summary_text, action_text, adherence_value, avg_sleep, weight_trend_direction, weight_trend_delta, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      newInsight.id,
      newInsight.weekStart,
      newInsight.insightType,
      newInsight.summaryText,
      newInsight.actionText,
      newInsight.adherenceValue ?? null,
      newInsight.avgSleep ?? null,
      newInsight.weightTrendDirection ?? null,
      newInsight.weightTrendDelta ?? null,
      now,
    ]
  );

  return newInsight;
}

export async function updateInsight(
  weekStart: string,
  updates: Partial<Omit<WeeklyInsight, 'id' | 'weekStart' | 'createdAt'>>
): Promise<WeeklyInsight> {
  const existing = await getInsightForWeek(weekStart);

  if (!existing) {
    throw new Error(`Insight for week ${weekStart} does not exist`);
  }

  const updated: WeeklyInsight = {
    ...existing,
    ...updates,
  };

  await execute(
    `UPDATE insights SET
      insight_type = ?,
      summary_text = ?,
      action_text = ?,
      adherence_value = ?,
      avg_sleep = ?,
      weight_trend_direction = ?,
      weight_trend_delta = ?
     WHERE week_start = ?`,
    [
      updated.insightType,
      updated.summaryText,
      updated.actionText,
      updated.adherenceValue ?? null,
      updated.avgSleep ?? null,
      updated.weightTrendDirection ?? null,
      updated.weightTrendDelta ?? null,
      weekStart,
    ]
  );

  return updated;
}

export async function deleteInsight(weekStart: string): Promise<void> {
  await execute('DELETE FROM insights WHERE week_start = ?', [weekStart]);
}

export async function deleteAllInsights(): Promise<void> {
  await execute('DELETE FROM insights');
}

function mapRowToInsight(row: WeeklyInsightRow): WeeklyInsight {
  return {
    id: row.id,
    weekStart: row.week_start,
    insightType: row.insight_type as any,
    summaryText: row.summary_text,
    actionText: row.action_text,
    adherenceValue: row.adherence_value ?? undefined,
    avgSleep: row.avg_sleep ?? undefined,
    weightTrendDirection: row.weight_trend_direction as any,
    weightTrendDelta: row.weight_trend_delta ?? undefined,
    createdAt: new Date(row.created_at),
  };
}
