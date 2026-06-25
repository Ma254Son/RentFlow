'use client';

import React from 'react';
import { Bell, LogOut, User, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export function Header() {
  const { currentUser, switchToLandlord, switchToAgent, isLandlord } = useAuth();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-card border-b border-border flex items-center justify-between px-6 z-30">
      {/* Left - Page Title Placeholder */}
      <div className="flex items-center gap-2">
        <Home className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        {/* Role Switcher (Demo) */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent border border-border">
          <span className="text-xs font-medium text-muted-foreground">Demo:</span>
          {isLandlord ? (
            <button
              onClick={switchToAgent}
              className="text-xs font-medium text-foreground hover:text-primary transition-colors"
            >
              Switch to Agent
            </button>
          ) : (
            <button
              onClick={switchToLandlord}
              className="text-xs font-medium text-foreground hover:text-primary transition-colors"
            >
              Switch to Landlord
            </button>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
          <Bell className="w-5 h-5 text-foreground/70" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
            <span className="text-sm font-bold text-primary">{currentUser.name.charAt(0)}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
