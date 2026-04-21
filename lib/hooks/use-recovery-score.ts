import { useEffect, useState } from 'react';
import { computeRecoveryScore, RecoveryScore } from '../engines/recovery-analyzer';
import { useCheckins } from './use-checkins';
import { useUserProfile } from './use-user-profile';

export function useRecoveryScore() {
  const { checkIns, loading: checkInsLoading } = useCheckins(7);
  const { profile, loading: profileLoading } = useUserProfile();
  const [recoveryScore, setRecoveryScore] = useState<RecoveryScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (checkInsLoading || profileLoading) {
      setLoading(true);
      return;
    }

    if (profile && checkIns.length > 0) {
      const score = computeRecoveryScore(checkIns, profile);
      setRecoveryScore(score);
    } else {
      // Default if no data
      setRecoveryScore({
        score: 50,
        components: {
          sleep: 50,
          energy: 50,
          soreness: 50,
          workoutStress: 50,
          restDays: 50,
        },
        status: 'fair',
      });
    }

    setLoading(false);
  }, [checkIns, profile, checkInsLoading, profileLoading]);

  return { recoveryScore, loading };
}
