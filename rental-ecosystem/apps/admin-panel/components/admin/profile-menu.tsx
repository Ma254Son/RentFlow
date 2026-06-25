'use client';

import { useState } from 'react';
import { LogOut, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProfileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-muted"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
          <span className="text-xs font-bold text-white">AD</span>
        </div>
        <div className="hidden flex-col gap-0.5 text-left text-xs sm:flex">
          <span className="font-medium text-foreground">Admin User</span>
          <span className="text-muted-foreground">admin@rentflow.com</span>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg py-1 z-50">
          <button className={cn('w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-muted')}>
            <User className="h-4 w-4" />
            <span>Profile Settings</span>
          </button>
          <button className={cn('w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-muted')}>
            <Settings className="h-4 w-4" />
            <span>Preferences</span>
          </button>
          <div className="my-1 border-t border-border"></div>
          <button className={cn('w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-red-500/10 hover:text-red-600')}>
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
