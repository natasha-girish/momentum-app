// Web stub for database - uses demo data
import { initializeDemoData, getDemoProfile, getDemoCheckins } from './seed-data.web';

let initialized = false;

export async function initializeDatabase(): Promise<any> {
  if (!initialized) {
    initializeDemoData();
    initialized = true;

    // Auto-login for web demo
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('auth_user', 'alex');
      localStorage.setItem('momentum_current_account_id', 'alex');
    }
  }
  return Promise.resolve({});
}

export function getDatabase(): any {
  return {};
}

export async function queryAll<T>(
  query: string,
  params?: any[]
): Promise<T[]> {
  console.log('[Web DB] queryAll:', query);

  // Return profile for any profile query
  if (query.toLowerCase().includes('user_profile') || query.toLowerCase().includes('SELECT')) {
    const profile = getDemoProfile();
    if (profile && !query.toLowerCase().includes('checkins')) {
      return [profile as any];
    }
  }

  // Return checkins for any checkins query
  if (query.toLowerCase().includes('checkins')) {
    return getDemoCheckins() as any[];
  }

  // Default: return checkins as fallback
  return getDemoCheckins() as any[];
}

export async function queryOne<T>(
  query: string,
  params?: any[]
): Promise<T | null> {
  console.log('[Web DB] queryOne:', query);

  // Return profile for profile query
  if (query.toLowerCase().includes('user_profile')) {
    return getDemoProfile() as any;
  }

  // Return first checkin for checkins query
  if (query.toLowerCase().includes('checkins')) {
    const checkins = getDemoCheckins();
    return checkins.length > 0 ? (checkins[checkins.length - 1] as any) : null;
  }

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
  return 1;
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
