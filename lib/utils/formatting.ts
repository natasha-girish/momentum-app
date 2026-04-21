/**
 * Format weight with unit
 */
export function formatWeight(weight: number, unit: 'lbs' | 'kg' = 'lbs'): string {
  return `${weight.toFixed(1)} ${unit}`;
}

/**
 * Format weight delta with direction
 */
export function formatWeightDelta(delta: number, unit: 'lbs' | 'kg' = 'lbs'): string {
  const sign = delta > 0 ? '+' : '';
  return `${sign}${delta.toFixed(1)} ${unit}`;
}

/**
 * Format sleep hours
 */
export function formatSleep(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)}m`;
  }

  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);

  if (minutes === 0) {
    return `${wholeHours}h`;
  }

  return `${wholeHours}h ${minutes}m`;
}

/**
 * Format energy level as text
 */
export function formatEnergy(level: 1 | 2 | 3 | 4 | 5): string {
  const labels = {
    1: 'Very low',
    2: 'Low',
    3: 'Neutral',
    4: 'High',
    5: 'Very high',
  };
  return labels[level];
}

/**
 * Format soreness as text
 */
export function formatSoreness(level: 'none' | 'mild' | 'moderate' | 'high'): string {
  const labels = {
    none: 'None',
    mild: 'Mild',
    moderate: 'Moderate',
    high: 'High',
  };
  return labels[level];
}

/**
 * Format workout status as text
 */
export function formatWorkoutStatus(
  status: 'rest_day' | 'completed_workout' | 'planned_workout'
): string {
  const labels = {
    rest_day: 'Rest day',
    completed_workout: 'Completed workout',
    planned_workout: 'Planned workout',
  };
  return labels[status];
}

/**
 * Format recommendation state with emoji
 */
export function formatRecommendation(state: 'push' | 'maintain' | 'recover'): string {
  const labels = {
    push: '💪 Push',
    maintain: '⚖️ Maintain',
    recover: '😴 Recover',
  };
  return labels[state];
}

/**
 * Get emoji for recommendation state
 */
export function getRecommendationEmoji(state: 'push' | 'maintain' | 'recover'): string {
  const emojis = {
    push: '💪',
    maintain: '⚖️',
    recover: '😴',
  };
  return emojis[state];
}

/**
 * Get emoji for soreness level
 */
export function getSorenessEmoji(level: 'none' | 'mild' | 'moderate' | 'high'): string {
  const emojis = {
    none: '✨',
    mild: '😐',
    moderate: '😕',
    high: '😩',
  };
  return emojis[level];
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`;
}

/**
 * Format number to 1 decimal place
 */
export function formatDecimal(value: number, places: number = 1): string {
  return value.toFixed(places);
}

/**
 * Format goal text
 */
export function formatGoal(goal: string): string {
  const labels: Record<string, string> = {
    fat_loss: 'Fat loss',
    muscle_gain: 'Muscle gain',
    maintenance: 'Maintenance',
    endurance: 'Endurance',
    general_fitness: 'General fitness',
  };
  return labels[goal] || goal;
}

/**
 * Format adherence as text
 */
export function formatAdherence(completed: number, total: number): string {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return `${completed}/${total} (${percentage}%)`;
}

/**
 * Format time string as readable
 */
export function formatTime(timeHHmm: string): string {
  const [hours, minutes] = timeHHmm.split(':');
  const hour = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);

  const date = new Date();
  date.setHours(hour, minute);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: 'short',
  });
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number = 50): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
