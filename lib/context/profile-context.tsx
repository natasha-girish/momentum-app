import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '@/lib/db/user-repo';
import type { UserProfile } from '@/lib/types';
import { useAuth } from './auth-context';

type ProfileContextType = {
  profile: UserProfile | null;
  loading: boolean;
  refetch: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Refetch profile when user changes
    refetch();
  }, [user?.username]);

  async function refetch() {
    try {
      setLoading(true);
      const p = await getUserProfile();
      console.log('Profile fetched:', p);
      setProfile(p);
    } catch (err) {
      console.error('Profile fetch error:', err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, loading, refetch }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext must be used within ProfileProvider');
  }
  return context;
}
