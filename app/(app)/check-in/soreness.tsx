import { SorenessSelector } from '@/components/ui/soreness-selector';
import { CheckInStepWrapper } from '@/components/check-in/step-wrapper';
import { useRouter } from 'expo-router';
import { useCheckInForm } from '@/lib/context/check-in-context';

export default function SorenessStep() {
  const router = useRouter();
  const { formData, updateFormData } = useCheckInForm();

  return (
    <CheckInStepWrapper
      step={4}
      totalSteps={6}
      stepLabel="STEP 4"
      title="How sore are you?"
      subtitle="Soreness helps us recommend recovery when needed."
      children={
        <SorenessSelector
          value={formData.soreness}
          onValueChange={(v) => updateFormData({ soreness: v })}
        />
      }
      onContinue={() => router.push('/(app)/check-in/workout')}
      continueLabel="Continue"
    />
  );
}
