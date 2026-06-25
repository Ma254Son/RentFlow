'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/lib/types';
import { mockLandlord, mockAgent } from '@/lib/mock-data';

interface AuthContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchToLandlord: () => void;
  switchToAgent: () => void;
  isLandlord: boolean;
  isAgent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(mockLandlord);

  const switchToLandlord = () => {
    setCurrentUser(mockLandlord);
  };

  const switchToAgent = () => {
    setCurrentUser(mockAgent);
  };

  const value: AuthContextType = {
    currentUser,
    setCurrentUser,
    switchToLandlord,
    switchToAgent,
    isLandlord: currentUser.role === 'landlord',
    isAgent: currentUser.role === 'agent',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
