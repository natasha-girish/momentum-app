import { queryAll, queryOne, execute } from './database';
import { CheckIn, CheckInRow } from '../types';
import { getTodayISO, getDaysAgo } from '../utils/date';
import { generateUUID } from '../utils/uuid';

export async function getCheckInForDate(date: string): Promise<CheckIn | null> {
  const row = await queryOne<CheckInRow>(
    'SELECT * FROM checkins WHERE date = ?',
    [date]
  );

  return row ? mapRowToCheckIn(row) : null;
}

export async function getTodayCheckIn(): Promise<CheckIn | null> {
  return getCheckInForDate(getTodayISO());
}

export async function getRecentCheckIns(days: number = 7): Promise<CheckIn[]> {
  const rows = await queryAll<CheckInRow>(
    `SELECT * FROM checkins
     WHERE date >= ?
     ORDER BY date DESC
     LIMIT ?`,
    [getDaysAgo(days), days]
  );

  return rows.map(mapRowToCheckIn);
}

export async function getCheckInsForDateRange(
  startDate: string,
  endDate: string
): Promise<CheckIn[]> {
  const rows = await queryAll<CheckInRow>(
    `SELECT * FROM checkins
     WHERE date >= ? AND date <= ?
     ORDER BY date DESC`,
    [startDate, endDate]
  );

  return rows.map(mapRowToCheckIn);
}

export async function getAllCheckIns(): Promise<CheckIn[]> {
  const rows = await queryAll<CheckInRow>(
    'SELECT * FROM checkins ORDER BY date DESC'
  );

  return rows.map(mapRowToCheckIn);
}

export async function createCheckIn(
  checkIn: Omit<CheckIn, 'id' | 'createdAt' | 'updatedAt'>
): Promise<CheckIn> {
  const now = new Date().toISOString();
  const id = generateUUID();

  const newCheckIn: CheckIn = {
    id,
    ...checkIn,
    createdAt: new Date(now),
    updatedAt: new Date(now),
  };

  await execute(
    `INSERT INTO checkins
      (id, date, weight, sleep_hours, energy, soreness, workout_status, workout_type, workout_duration, workout_intensity, workout_notes, recommendation_override, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      newCheckIn.id,
      newCheckIn.date,
      newCheckIn.weight ?? null,
      newCheckIn.sleepHours,
      newCheckIn.energy,
      newCheckIn.soreness,
      newCheckIn.workoutStatus,
      newCheckIn.workoutType ?? null,
      newCheckIn.workoutDuration ?? null,
      newCheckIn.workoutIntensity ?? null,
      newCheckIn.workoutNotes ?? null,
      newCheckIn.recommendationOverride ?? null,
      now,
      now,
    ]
  );

  return newCheckIn;
}

export async function updateCheckIn(
  date: string,
  updates: Partial<Omit<CheckIn, 'id' | 'date' | 'createdAt'>>
): Promise<CheckIn> {
  const now = new Date().toISOString();
  const existing = await getCheckInForDate(date);

  if (!existing) {
    throw new Error(`Check-in for date ${date} does not exist`);
  }

  const updated: CheckIn = {
    ...existing,
    ...updates,
    updatedAt: new Date(now),
  };

  await execute(
    `UPDATE checkins SET
      weight = ?,
      sleep_hours = ?,
      energy = ?,
      soreness = ?,
      workout_status = ?,
      workout_type = ?,
      workout_duration = ?,
      workout_intensity = ?,
      workout_notes = ?,
      recommendation_override = ?,
      updated_at = ?
     WHERE date = ?`,
    [
      updated.weight ?? null,
      updated.sleepHours,
      updated.energy,
      updated.soreness,
      updated.workoutStatus,
      updated.workoutType ?? null,
      updated.workoutDuration ?? null,
      updated.workoutIntensity ?? null,
      updated.workoutNotes ?? null,
      updated.recommendationOverride ?? null,
      now,
      date,
    ]
  );

  return updated;
}

export async function upsertCheckIn(
  checkIn: Omit<CheckIn, 'id' | 'createdAt' | 'updatedAt'>
): Promise<CheckIn> {
  const existing = await getCheckInForDate(checkIn.date);

  if (existing) {
    return updateCheckIn(checkIn.date, checkIn);
  } else {
    return createCheckIn(checkIn);
  }
}

export async function deleteCheckIn(date: string): Promise<void> {
  await execute('DELETE FROM checkins WHERE date = ?', [date]);
}

export async function deleteAllCheckIns(): Promise<void> {
  await execute('DELETE FROM checkins');
}

// Get check-ins that can still be edited (within 24 hours of creation)
export async function getEditableCheckIns(): Promise<CheckIn[]> {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

  const rows = await queryAll<CheckInRow>(
    `SELECT * FROM checkins
     WHERE updated_at >= ?
     ORDER BY date DESC`,
    [oneDayAgo]
  );

  return rows.map(mapRowToCheckIn);
}

function mapRowToCheckIn(row: CheckInRow): CheckIn {
  return {
    id: row.id,
    date: row.date,
    weight: row.weight,
    sleepHours: row.sleep_hours,
    energy: row.energy as 1 | 2 | 3 | 4 | 5,
    soreness: row.soreness as 'none' | 'mild' | 'moderate' | 'high',
    workoutStatus: row.workout_status as 'rest_day' | 'completed_workout' | 'planned_workout',
    workoutType: row.workout_type as any,
    workoutDuration: row.workout_duration ?? undefined,
    workoutIntensity: row.workout_intensity as any,
    workoutNotes: row.workout_notes ?? undefined,
    recommendationOverride: row.recommendation_override as any,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}
