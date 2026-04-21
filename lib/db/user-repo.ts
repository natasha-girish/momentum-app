import { queryOne, queryAll, execute } from './database';
import { UserProfile, UserProfileRow } from '../types';
import { generateUUID } from '../utils/uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_USER_ID = 'default-user';
const CURRENT_ACCOUNT_KEY = 'momentum_current_account_id';

export async function getCurrentAccountId(): Promise<string> {
  const stored = await AsyncStorage.getItem(CURRENT_ACCOUNT_KEY);
  return stored || DEFAULT_USER_ID;
}

export async function setCurrentAccountId(accountId: string): Promise<void> {
  await AsyncStorage.setItem(CURRENT_ACCOUNT_KEY, accountId);
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const accountId = await getCurrentAccountId();
  const row = await queryOne<UserProfileRow>(
    'SELECT * FROM user_profile WHERE id = ?',
    [accountId]
  );

  if (!row) {
    return null;
  }

  return mapRowToProfile(row);
}

export async function createUserProfile(
  profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>
): Promise<UserProfile> {
  const now = new Date().toISOString();
  const accountId = await getCurrentAccountId();

  const newProfile: UserProfile = {
    id: accountId,
    ...profile,
    createdAt: new Date(now),
    updatedAt: new Date(now),
  };

  await execute(
    `INSERT OR REPLACE INTO user_profile
      (id, goal, weekly_workout_frequency, sleep_baseline, weight_unit, notification_time, notification_enabled, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      newProfile.id,
      newProfile.goal,
      newProfile.weeklyWorkoutFrequency,
      newProfile.sleepBaseline,
      newProfile.weightUnit,
      newProfile.notificationTime,
      newProfile.notificationEnabled ? 1 : 0,
      now,
      now,
    ]
  );

  return newProfile;
}

export async function createNewAccount(
  profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>
): Promise<UserProfile> {
  const now = new Date().toISOString();
  const newId = generateUUID();

  const newProfile: UserProfile = {
    id: newId,
    ...profile,
    createdAt: new Date(now),
    updatedAt: new Date(now),
  };

  await execute(
    `INSERT INTO user_profile
      (id, goal, weekly_workout_frequency, sleep_baseline, weight_unit, notification_time, notification_enabled, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      newProfile.id,
      newProfile.goal,
      newProfile.weeklyWorkoutFrequency,
      newProfile.sleepBaseline,
      newProfile.weightUnit,
      newProfile.notificationTime,
      newProfile.notificationEnabled ? 1 : 0,
      now,
      now,
    ]
  );

  // Switch to the new account
  await setCurrentAccountId(newId);

  return newProfile;
}

export async function getAllAccounts(): Promise<UserProfile[]> {
  const rows = await queryAll<UserProfileRow>(
    'SELECT * FROM user_profile ORDER BY created_at DESC'
  );
  return rows.map(mapRowToProfile);
}

export async function switchAccount(accountId: string): Promise<UserProfile | null> {
  const row = await queryOne<UserProfileRow>(
    'SELECT * FROM user_profile WHERE id = ?',
    [accountId]
  );

  if (!row) return null;

  await setCurrentAccountId(accountId);
  return mapRowToProfile(row);
}

export async function updateUserProfile(
  updates: Partial<Omit<UserProfile, 'id' | 'createdAt'>>
): Promise<UserProfile> {
  const now = new Date().toISOString();
  const existing = await getUserProfile();

  if (!existing) {
    throw new Error('User profile does not exist');
  }

  const updated: UserProfile = {
    ...existing,
    ...updates,
    updatedAt: new Date(now),
  };

  await execute(
    `UPDATE user_profile SET
      goal = ?,
      weekly_workout_frequency = ?,
      sleep_baseline = ?,
      weight_unit = ?,
      notification_time = ?,
      notification_enabled = ?,
      updated_at = ?
     WHERE id = ?`,
    [
      updated.goal,
      updated.weeklyWorkoutFrequency,
      updated.sleepBaseline,
      updated.weightUnit,
      updated.notificationTime,
      updated.notificationEnabled ? 1 : 0,
      now,
      existing.id,
    ]
  );

  return updated;
}

export async function deleteUserProfile(): Promise<void> {
  const accountId = await getCurrentAccountId();
  await execute('DELETE FROM user_profile WHERE id = ?', [accountId]);
  // Switch to default account if deleting current one
  if (accountId !== DEFAULT_USER_ID) {
    await setCurrentAccountId(DEFAULT_USER_ID);
  }
}

export async function deleteAccount(accountId: string): Promise<void> {
  // Delete profile and all associated check-ins
  await execute('DELETE FROM user_profile WHERE id = ?', [accountId]);
  await execute('DELETE FROM checkins WHERE id IN (SELECT id FROM checkins WHERE date >= ?)', [new Date(0).toISOString()]);

  const current = await getCurrentAccountId();
  if (current === accountId) {
    await setCurrentAccountId(DEFAULT_USER_ID);
  }
}

function mapRowToProfile(row: UserProfileRow): UserProfile {
  return {
    id: row.id,
    goal: row.goal as any,
    weeklyWorkoutFrequency: row.weekly_workout_frequency,
    sleepBaseline: row.sleep_baseline,
    weightUnit: row.weight_unit as 'lbs' | 'kg',
    notificationTime: row.notification_time,
    notificationEnabled: row.notification_enabled === 1,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}
