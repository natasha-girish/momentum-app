// Web stub for database - no SQLite on web
let isWebMode = true;

export async function initializeDatabase(): Promise<any> {
  return Promise.resolve({});
}

async function runMigrations(database: any): Promise<void> {
  return;
}

export function getDatabase(): any {
  return {};
}

export async function queryAll<T>(
  query: string,
  params?: any[]
): Promise<T[]> {
  return [];
}

export async function queryOne<T>(
  query: string,
  params?: any[]
): Promise<T | null> {
  return null;
}

export async function execute(
  query: string,
  params?: any[]
): Promise<void> {
  return;
}

export async function executeWithLastId(
  query: string,
  params?: any[]
): Promise<number> {
  return 0;
}

export async function transaction<T>(
  callback: (db: any) => Promise<T>
): Promise<T> {
  return callback({}) as Promise<T>;
}

export async function closeDatabase(): Promise<void> {
  return;
}

export async function clearDatabase(): Promise<void> {
  return;
}
