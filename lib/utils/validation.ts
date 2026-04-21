/**
 * Validate weight input
 */
export function validateWeight(weight: any): boolean {
  if (weight === null || weight === undefined) return true; // Optional field
  const num = parseFloat(weight);
  return !isNaN(num) && num > 0 && num < 1000;
}

/**
 * Validate sleep hours
 */
export function validateSleepHours(sleep: any): boolean {
  const num = parseFloat(sleep);
  return !isNaN(num) && num >= 0 && num <= 12;
}

/**
 * Validate energy level (1-5)
 */
export function validateEnergy(energy: any): boolean {
  const num = parseInt(energy, 10);
  return !isNaN(num) && num >= 1 && num <= 5;
}

/**
 * Validate soreness level
 */
export function validateSoreness(soreness: any): boolean {
  return ['none', 'mild', 'moderate', 'high'].includes(soreness);
}

/**
 * Validate workout status
 */
export function validateWorkoutStatus(status: any): boolean {
  return ['rest_day', 'completed_workout', 'planned_workout'].includes(status);
}

/**
 * Validate recommendation state
 */
export function validateRecommendation(rec: any): boolean {
  return ['push', 'maintain', 'recover'].includes(rec);
}

/**
 * Validate ISO date string (YYYY-MM-DD)
 */
export function validateISODate(date: any): boolean {
  if (typeof date !== 'string') return false;
  const iso8601 = /^\d{4}-\d{2}-\d{2}$/;
  if (!iso8601.test(date)) return false;

  const parsed = new Date(date + 'T00:00:00Z');
  return !isNaN(parsed.getTime());
}

/**
 * Validate goal
 */
export function validateGoal(goal: any): boolean {
  return [
    'fat_loss',
    'muscle_gain',
    'maintenance',
    'endurance',
    'general_fitness',
  ].includes(goal);
}

/**
 * Validate weekly workout frequency (1-7)
 */
export function validateWeeklyFrequency(freq: any): boolean {
  const num = parseInt(freq, 10);
  return !isNaN(num) && num >= 1 && num <= 7;
}

/**
 * Validate sleep baseline (4-10 hours)
 */
export function validateSleepBaseline(sleep: any): boolean {
  const num = parseInt(sleep, 10);
  return !isNaN(num) && num >= 4 && num <= 10;
}

/**
 * Validate weight unit
 */
export function validateWeightUnit(unit: any): boolean {
  return ['lbs', 'kg'].includes(unit);
}

/**
 * Validate time string (HH:mm format)
 */
export function validateTimeString(time: any): boolean {
  if (typeof time !== 'string') return false;
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

/**
 * Validate email
 */
export function validateEmail(email: any): boolean {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if a check-in is editable (within 24 hours)
 */
export function isCheckInEditable(createdAtISO: string): boolean {
  const created = new Date(createdAtISO);
  const now = new Date();
  const hoursElapsed = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
  return hoursElapsed < 24;
}
