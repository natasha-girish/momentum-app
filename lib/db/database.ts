import * as SQLite from 'expo-sqlite';
import { ALL_TABLES, SCHEMA_VERSION } from './schema';

let db: SQLite.Database | null = null;

export async function initializeDatabase(): Promise<SQLite.Database> {
  if (db) {
    return db;
  }

  db = await SQLite.openDatabaseAsync('momentum.db');

  // Run migrations
  for (const sql of ALL_TABLES) {
    await db.execAsync(sql);
  }

  // Handle schema migrations
  await runMigrations(db);

  return db;
}

async function runMigrations(database: SQLite.Database): Promise<void> {
  // Add workout columns if they don't exist (migration from v1 to v2)
  const migrations = [
    `ALTER TABLE checkins ADD COLUMN workout_type TEXT CHECK (workout_type IN ('strength', 'run', 'cycling', 'hiit', 'yoga', 'swim', 'pilates', 'walk', 'other', NULL))`,
    `ALTER TABLE checkins ADD COLUMN workout_duration INTEGER`,
    `ALTER TABLE checkins ADD COLUMN workout_intensity TEXT CHECK (workout_intensity IN ('easy', 'steady', 'moderate', 'hard', 'all_out', NULL))`,
    `ALTER TABLE checkins ADD COLUMN workout_notes TEXT`,
  ];

  for (const migration of migrations) {
    try {
      await database.execAsync(migration);
    } catch (err: any) {
      // Ignore "duplicate column" errors - column already exists
      if (err?.message?.includes('duplicate column')) {
        continue;
      }
      console.warn('Migration warning:', err?.message);
    }
  }
}

export function getDatabase(): SQLite.Database {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
}

// Helper for running SELECT queries that return rows
export async function queryAll<T>(
  query: string,
  params?: any[]
): Promise<T[]> {
  const database = getDatabase();
  const result = await database.getAllAsync<T>(query, params);
  return result;
}

// Helper for running SELECT query that returns a single row
export async function queryOne<T>(
  query: string,
  params?: any[]
): Promise<T | null> {
  const database = getDatabase();
  const result = await database.getFirstAsync<T>(query, params);
  return result || null;
}

// Helper for INSERT/UPDATE/DELETE operations
export async function execute(
  query: string,
  params?: any[]
): Promise<void> {
  const database = getDatabase();
  await database.runAsync(query, params);
}

// Helper for getting ID of last inserted row
export async function executeWithLastId(
  query: string,
  params?: any[]
): Promise<number> {
  const database = getDatabase();
  const result = await database.runAsync(query, params);
  return result.lastInsertRowid;
}

// Transaction helper
export async function transaction<T>(
  callback: (db: SQLite.Database) => Promise<T>
): Promise<T> {
  const database = getDatabase();
  try {
    await database.execAsync('BEGIN TRANSACTION');
    const result = await callback(database);
    await database.execAsync('COMMIT');
    return result;
  } catch (error) {
    await database.execAsync('ROLLBACK');
    throw error;
  }
}

// Close database (rarely used, but available)
export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}

// Clear all data (useful for testing/dev)
export async function clearDatabase(): Promise<void> {
  const database = getDatabase();
  await database.execAsync('DELETE FROM checkins');
  await database.execAsync('DELETE FROM insights');
  await database.execAsync('DELETE FROM user_profile');
}
