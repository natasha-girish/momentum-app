import { WorkoutStatusSelector } from '@/components/ui/workout-status-selector';
import { CheckInStepWrapper } from '@/components/check-in/step-wrapper';
import { useRouter } from 'expo-router';
import { useCheckInForm } from '@/lib/context/check-in-context';

export default function WorkoutStep() {
  const router = useRouter();
  const { formData, updateFormData } = useCheckInForm();

  return (
    <CheckInStepWrapper
      step={5}
      totalSteps={7}
      stepLabel="STEP 5"
      title="Today's plan?"
      children={
        <WorkoutStatusSelector
          value={formData.workoutStatus}
          onValueChange={(v) =>
            updateFormData({ workoutStatus: v as any })
          }
        />
      }
      onContinue={() => {
        if (formData.workoutStatus === 'completed_workout') {
          router.push('/(app)/check-in/workout-details');
        } else {
          router.push('/(app)/check-in/review');
        }
      }}
      continueLabel="Continue"
    />
  );
}
