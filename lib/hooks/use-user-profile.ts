import { useEffect, useState } from 'react';
import { UserProfile } from '../types';
import * as userRepo from '../db/user-repo';

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load profile on mount
  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      const loaded = await userRepo.getUserProfile();
      setProfile(loaded);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }

  async function createProfile(data: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const created = await userRepo.createUserProfile(data);
      setProfile(created);
      return created;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    }
  }

  async function updateProfile(updates: Partial<Omit<UserProfile, 'id' | 'createdAt'>>) {
    try {
      const updated = await userRepo.updateUserProfile(updates);
      setProfile(updated);
      return updated;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    }
  }

  return {
    profile,
    loading,
    error,
    createProfile,
    updateProfile,
    refetch: loadProfile,
  };
}
