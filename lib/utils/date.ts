/**
 * Get today's date as ISO string (YYYY-MM-DD)
 */
export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get a date N days ago as ISO string
 */
export function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

/**
 * Get a specific date as ISO string from a Date object
 */
export function dateToISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Parse an ISO date string to a Date object
 */
export function parseISODate(isoString: string): Date {
  return new Date(isoString + 'T00:00:00Z');
}

/**
 * Get the start of the current week (Sunday)
 */
export function getWeekStart(date?: Date): string {
  const d = date ? new Date(date) : new Date();
  const day = d.getDay();
  const diff = d.getDate() - day;
  const sunday = new Date(d.setDate(diff));
  return dateToISO(sunday);
}

/**
 * Get the end of the current week (Saturday)
 */
export function getWeekEnd(date?: Date): string {
  const weekStart = getWeekStart(date);
  const sunday = parseISODate(weekStart);
  const saturday = new Date(sunday);
  saturday.setDate(saturday.getDate() + 6);
  return dateToISO(saturday);
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return dateToISO(date1) === dateToISO(date2);
}

/**
 * Get formatted date string (e.g., "Apr 16")
 */
export function formatShortDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = parseISODate(date);
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Get formatted date string with day name (e.g., "Wed, Apr 16")
 */
export function formatLongDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = parseISODate(date);
  }
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

/**
 * Get the day name from a date
 */
export function getDayName(date: Date | string): string {
  if (typeof date === 'string') {
    date = parseISODate(date);
  }
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

/**
 * Calculate days between two dates
 */
export function daysBetween(date1: Date | string, date2: Date | string): number {
  if (typeof date1 === 'string') date1 = parseISODate(date1);
  if (typeof date2 === 'string') date2 = parseISODate(date2);

  const time1 = date1.getTime();
  const time2 = date2.getTime();
  return Math.floor((time2 - time1) / (1000 * 60 * 60 * 24));
}

/**
 * Get N days of ISO date strings, ending today
 */
export function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    days.push(getDaysAgo(i));
  }
  return days;
}

/**
 * Get N days of ISO date strings, ending today
 */
export function getLastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    days.push(getDaysAgo(i));
  }
  return days;
}

/**
 * Check if a date is in the past
 */
export function isPastDate(isoString: string): boolean {
  return isoString < getTodayISO();
}

/**
 * Check if a date is today
 */
export function isToday(isoString: string): boolean {
  return isoString === getTodayISO();
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(isoString: string): boolean {
  return isoString > getTodayISO();
}
