import { createCheckIn } from './checkin-repo';
import { createNewAccount, setCurrentAccountId, createUserProfile } from './user-repo';
import { CheckIn } from '../types';

const DEMO_ACCOUNT_ID = 'demo-account';

export async function createDemoAccount(): Promise<string> {
  try {
    // Create demo profile (this automatically switches to it)
    const profile = await createNewAccount({
      goal: 'muscle_gain',
      weeklyWorkoutFrequency: 5,
      sleepBaseline: 7.5,
      weightUnit: 'lbs',
      notificationTime: '07:00',
      notificationEnabled: true,
    });

    // Seed 14 days of check-ins (will be for current account which is now demo)
    await seedDemoAccountCheckIns();

    return profile.id;
  } catch (err) {
    console.error('Error creating demo account:', err);
    throw err;
  }
}

export async function seedDemoAccountCheckIns(): Promise<void> {
  const today = new Date();

  const demoCheckIns: Omit<CheckIn, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      date: getDateString(today, -13),
      weight: 180.5,
      sleepHours: 7.5,
      energy: 4,
      soreness: 'none',
      workoutStatus: 'completed_workout',
      workoutType: 'strength',
      workoutDuration: 60,
      workoutIntensity: 'hard',
    },
    {
      date: getDateString(today, -12),
      weight: 180.3,
      sleepHours: 8,
      energy: 5,
      soreness: 'mild',
      workoutStatus: 'rest_day',
    },
    {
      date: getDateString(today, -11),
      weight: 180.1,
      sleepHours: 7,
      energy: 4,
      soreness: 'none',
      workoutStatus: 'completed_workout',
      workoutType: 'run',
      workoutDuration: 45,
      workoutIntensity: 'moderate',
    },
    {
      date: getDateString(today, -10),
      weight: 180.0,
      sleepHours: 7.5,
      energy: 5,
      soreness: 'none',
      workoutStatus: 'completed_workout',
      workoutType: 'strength',
      workoutDuration: 65,
      workoutIntensity: 'hard',
    },
    {
      date: getDateString(today, -9),
      weight: 179.8,
      sleepHours: 6.5,
      energy: 3,
      soreness: 'moderate',
      workoutStatus: 'completed_workout',
      workoutType: 'cycling',
      workoutDuration: 50,
      workoutIntensity: 'steady',
    },
    {
      date: getDateString(today, -8),
      weight: 179.5,
      sleepHours: 8,
      energy: 5,
      soreness: 'none',
      workoutStatus: 'rest_day',
    },
    {
      date: getDateString(today, -7),
      weight: 179.3,
      sleepHours: 7.5,
      energy: 4,
      soreness: 'none',
      workoutStatus: 'completed_workout',
      workoutType: 'hiit',
      workoutDuration: 40,
      workoutIntensity: 'all_out',
    },
    {
      date: getDateString(today, -6),
      weight: 179.1,
      sleepHours: 8.5,
      energy: 5,
      soreness: 'high',
      workoutStatus: 'rest_day',
    },
    {
      date: getDateString(today, -5),
      weight: 179.0,
      sleepHours: 9,
      energy: 5,
      soreness: 'mild',
      workoutStatus: 'completed_workout',
      workoutType: 'yoga',
      workoutDuration: 30,
      workoutIntensity: 'easy',
    },
    {
      date: getDateString(today, -4),
      weight: 178.8,
      sleepHours: 7,
      energy: 4,
      soreness: 'none',
      workoutStatus: 'completed_workout',
      workoutType: 'strength',
      workoutDuration: 60,
      workoutIntensity: 'hard',
    },
    {
      date: getDateString(today, -3),
      weight: 178.5,
      sleepHours: 7.5,
      energy: 3,
      soreness: 'mild',
      workoutStatus: 'completed_workout',
      workoutType: 'run',
      workoutDuration: 50,
      workoutIntensity: 'moderate',
    },
    {
      date: getDateString(today, -2),
      weight: 178.2,
      sleepHours: 6.5,
      energy: 2,
      soreness: 'moderate',
      workoutStatus: 'rest_day',
    },
    {
      date: getDateString(today, -1),
      weight: 178.0,
      sleepHours: 8,
      energy: 5,
      soreness: 'none',
      workoutStatus: 'completed_workout',
      workoutType: 'strength',
      workoutDuration: 70,
      workoutIntensity: 'hard',
    },
    {
      date: getDateString(today, 0),
      weight: 177.8,
      sleepHours: 7.5,
      energy: 4,
      soreness: 'mild',
      workoutStatus: 'rest_day',
    },
  ];

  for (const checkIn of demoCheckIns) {
    try {
      await createCheckIn(checkIn);
    } catch (err) {
      console.log('Check-in already exists:', err);
    }
  }
}

export async function seedAlexProfile(): Promise<void> {
  // Set current account to 'alex'
  await setCurrentAccountId('alex');

  try {
    await createUserProfile({
      goal: 'muscle_gain',
      weeklyWorkoutFrequency: 5,
      sleepBaseline: 7.5,
      weightUnit: 'lbs',
      notificationTime: '07:00',
      notificationEnabled: true,
    });
  } catch (err) {
    console.log('Alex profile may already exist:', err);
  }
}

export async function seedDummyCheckIns(): Promise<void> {
  const today = new Date();

  const dummyCheckIns: Omit<CheckIn, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      date: getDateString(today, -30),
      weight: 78.5,
      sleepHours: 7,
      energy: 3,
      soreness: 'none',
      workoutStatus: 'completed_workout',
      workoutType: 'run',
      workoutDuration: 45,
      workoutIntensity: 'moderate',
    },
    {
      date: getDateString(today, -29),
      weight: 78.2,
      sleepHours: 7.5,
      energy: 4,
      soreness: 'mild',
      workoutStatus: 'rest_day',
    },
    {
      date: getDateString(today, -28),
      weight: 78.0,
      sleepHours: 6.5,
      energy: 2,
      soreness: 'none',
      workoutStatus: 'completed_workout',
      workoutType: 'strength',
      workoutDuration: 60,
      workoutIntensity: 'hard',
    },
    {
      date: getDateString(today, -27),
      weight: 77.8,
      sleepHours: 8,
      energy: 5,
      soreness: 'moderate',
      workoutStatus: 'completed_workout',
      workoutType: 'yoga',
      workoutDuration: 30,
      workoutIntensity: 'easy',
    },
    {
      date: getDateString(today, -26),
      weight: 77.5,
      sleepHours: 7.2,
      energy: 4,
      soreness: 'none',
      workoutStatus: 'completed_workout',
      workoutType: 'cycling',
      workoutDuration: 50,
      workoutIntensity: 'steady',
    },
    {
      date: getDateString(today, -25),
      weight: 77.2,
      sleepHours: 5.5,
      energy: 2,
      soreness: 'mild',
      workoutStatus: 'rest_day',
    },
    {
      date: getDateString(today, -24),
      weight: 76.9,
      sleepHours: 8.5,
      energy: 5,
      soreness: 'none',
      workoutStatus: 'completed_workout',
      workoutType: 'run',
      workoutDuration: 55,
      workoutIntensity: 'moderate',
    },
    {
      date: getDateString(today, -23),
      weight: 76.6,
      sleepHours: 7.3,
      energy: 3,
      soreness: 'mild',
      workoutStatus: 'completed_workout',
      workoutType: 'strength',
      workoutDuration: 65,
      workoutIntensity: 'hard',
    },
    {
      date: getDateString(today, -22),
      weight: 76.3,
      sleepHours: 7,
      energy: 4,
      soreness: 'moderate',
      workoutStatus: 'rest_day',
    },
    {
      date: getDateString(today, -21),
      weight: 76.0,
      sleepHours: 8,
      energy: 5,
      soreness: 'none',
      workoutStatus: 'completed_workout',
      workoutType: 'hiit',
      workoutDuration: 40,
      workoutIntensity: 'all_out',
    },
    {
      date: getDateString(today, -20),
      weight: 75.7,
      sleepHours: 7.5,
      energy: 4,
      soreness: 'high',
      workoutStatus: 'rest_day',
    },
    {
      date: getDateString(today, -19),
      weight: 75.5,
      sleepHours: 9,
      energy: 5,
      soreness: 'mild',
      workoutStatus: 'completed_workout',
      workoutType: 'walk',
      workoutDuration: 30,
      workoutIntensity: 'easy',
    },
    {
      date: getDateString(today, -18),
      weight: 75.2,
      sleepHours: 7,
      energy: 3,
      soreness: 'none',
      workoutStatus: 'completed_workout',
      workoutType: 'cycling',
      workoutDuration: 60,
      workoutIntensity: 'moderate',
    },
    {
      date: getDateString(today, -17),
      weight: 74.9,
      sleepHours: 7.5,
      energy: 4,
      soreness: 'mild',
      workoutStatus: 'completed_workout',
      workoutType: 'swim',
      workoutDuration: 45,
      workoutIntensity: 'steady',
    },
    {
      date: getDateString(today, -16),
      weight: 74.6,
      sleepHours: 6,
      energy: 2,
      soreness: 'none',
      workoutStatus: 'rest_day',
    },
    {
      date: getDateString(today, -15),
      weight: 74.3,
      sleepHours: 8,
      energy: 5,
      soreness: 'none',
      workoutStatus: 'completed_workout',
      workoutType: 'strength',
      workoutDuration: 70,
      workoutIntensity: 'hard',
    },
  ];

  for (const checkIn of dummyCheckIns) {
    try {
      await createCheckIn(checkIn);
    } catch (err) {
      console.log('Check-in already exists:', err);
    }
  }
}

function getDateString(date: Date, daysOffset: number): string {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + daysOffset);
  return newDate.toISOString().split('T')[0];
}
