import React, { createContext, useContext, useState } from 'react';

interface CheckInFormData {
  weight?: number;
  sleepHours: number;
  energy: 1 | 2 | 3 | 4 | 5;
  soreness: 'none' | 'mild' | 'moderate' | 'high';
  workoutStatus: 'rest_day' | 'completed_workout' | 'planned_workout';
  workoutType?: 'strength' | 'run' | 'cycling' | 'hiit' | 'yoga' | 'swim' | 'pilates' | 'walk' | 'other';
  workoutDuration?: number;
  workoutIntensity?: 'easy' | 'steady' | 'moderate' | 'hard' | 'all_out';
  workoutNotes?: string;
  workoutImportedFromAppleWatch?: boolean;
}

interface CheckInContextType {
  formData: CheckInFormData;
  updateFormData: (updates: Partial<CheckInFormData>) => void;
  reset: () => void;
}

const defaultFormData: CheckInFormData = {
  sleepHours: 7,
  energy: 3,
  soreness: 'none',
  workoutStatus: 'rest_day',
};

const CheckInContext = createContext<CheckInContextType | undefined>(undefined);

export function CheckInProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<CheckInFormData>(defaultFormData);

  const updateFormData = (updates: Partial<CheckInFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const reset = () => {
    setFormData(defaultFormData);
  };

  return (
    <CheckInContext.Provider value={{ formData, updateFormData, reset }}>
      {children}
    </CheckInContext.Provider>
  );
}

export function useCheckInForm() {
  const context = useContext(CheckInContext);
  if (!context) {
    throw new Error('useCheckInForm must be used within CheckInProvider');
  }
  return context;
}
