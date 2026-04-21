import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as userRepo from '../db/user-repo';

type AuthContextType = {
  user: { username: string } | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const VALID_CREDENTIALS = [
  { username: 'alex', password: 'password' },
  { username: 'mia', password: 'password' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  async function checkAuthentication() {
    try {
      const username = await AsyncStorage.getItem('auth_user');
      if (username) {
        await userRepo.setCurrentAccountId(username);
        setUser({ username });
      }
    } catch (err) {
      console.error('Auth check error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function login(username: string, password: string) {
    const isValid = VALID_CREDENTIALS.some(
      (cred) => cred.username === username && cred.password === password
    );

    if (!isValid) {
      throw new Error('Invalid username or password');
    }

    // Set the current account to the username
    await userRepo.setCurrentAccountId(username);
    await AsyncStorage.setItem('auth_user', username);
    setUser({ username });
  }

  async function logout() {
    await AsyncStorage.removeItem('auth_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
