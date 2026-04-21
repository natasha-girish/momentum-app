import { useEffect, useState, useMemo } from 'react';
import { DailyRecommendation, CheckIn, UserProfile } from '../types';
import { computeRecommendation } from '../engines/recommendation-engine';
import { useCheckins } from './use-checkins';
import { useUserProfile } from './use-user-profile';

export function useRecommendation() {
  const { checkIns, loading: checkInsLoading } = useCheckins(7);
  const { profile, loading: profileLoading } = useUserProfile();
  const [recommendation, setRecommendation] = useState<DailyRecommendation | null>(null);

  // Compute recommendation whenever check-ins or profile change
  useEffect(() => {
    if (!profileLoading && profile && !checkInsLoading) {
      const rec = computeRecommendation(checkIns, profile);
      setRecommendation(rec);
    }
  }, [checkIns, profile, profileLoading, checkInsLoading]);

  return {
    recommendation,
    loading: checkInsLoading || profileLoading,
  };
}

// Alternative: Manually compute recommendation given data
export function computeRecommendationManually(
  checkIns: CheckIn[],
  profile: UserProfile
): DailyRecommendation {
  return computeRecommendation(checkIns, profile);
}
