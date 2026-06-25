'use client';

import { Bell, Search } from 'lucide-react';
import { useState } from 'react';
import { ProfileMenu } from './profile-menu';
import { NotificationCenter } from './notification-center';
import { SearchCommand } from './search-command';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <div className="fixed left-60 right-0 top-0 z-30 border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <button
              onClick={() => setShowSearch(true)}
              className={cn(
                'flex w-full max-w-sm items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2',
                'text-sm text-muted-foreground transition-all hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary'
              )}
            >
              <Search className="h-4 w-4" />
              <span>Search users, properties... (Cmd+K)</span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-lg border border-border bg-card shadow-lg">
                  <NotificationCenter onClose={() => setShowNotifications(false)} />
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <ProfileMenu />
          </div>
        </div>
      </div>

      {/* Search Command Dialog */}
      {showSearch && <SearchCommand open={showSearch} setOpen={setShowSearch} />}
    </>
  );
}
