import { EnergyBarSelector } from '@/components/ui/energy-bar-selector';
import { CheckInStepWrapper } from '@/components/check-in/step-wrapper';
import { useRouter } from 'expo-router';
import { useCheckInForm } from '@/lib/context/check-in-context';

export default function EnergyStep() {
  const router = useRouter();
  const { formData, updateFormData } = useCheckInForm();

  return (
    <CheckInStepWrapper
      step={3}
      totalSteps={6}
      stepLabel="STEP 3"
      title="How's your energy today?"
      subtitle="Rate your energy level from 1 (low) to 5 (high)."
      children={
        <EnergyBarSelector
          value={formData.energy}
          onValueChange={(v) => updateFormData({ energy: v as 1 | 2 | 3 | 4 | 5 })}
        />
      }
      onContinue={() => router.push('/(app)/check-in/soreness')}
      continueLabel="Continue"
    />
  );
}
