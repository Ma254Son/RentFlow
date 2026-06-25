'use client';

import { useEffect } from 'react';
import { Command } from 'cmdk';
import { Search, Users, Building2, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchCommandProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SearchCommand({ open, setOpen }: SearchCommandProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      ></div>
      <div className="relative w-full max-w-2xl rounded-lg border border-border bg-card shadow-lg">
        <Command className="[&_[cmdk-input]]:border-0 [&_[cmdk-input]]:bg-transparent">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              autoFocus
              placeholder="Search users, properties, tenancies..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 transition-colors hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <div className="px-4 py-3">
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase">Users</p>
              <div className="space-y-1">
                {['Ahmed Hassan (tenant-5)', 'Faith Kipchoge (landlord-12)', 'John Omondi (agent-3)'].map(
                  (user, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-colors hover:bg-muted"
                    >
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{user}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="border-t border-border px-4 py-3">
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase">Properties</p>
              <div className="space-y-1">
                {['Westlands Plaza', 'Gigiri Towers', 'Parklands Estate'].map((prop, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-colors hover:bg-muted"
                  >
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{prop}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border px-4 py-3">
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase">Quick Actions</p>
              <div className="space-y-1">
                {['New Verification Request', 'Pending Disputes', 'Audit Logs'].map((action, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-colors hover:bg-muted"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-border px-4 py-3 text-xs text-muted-foreground">
            <span>Press</span>
            <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">ESC</kbd>
            <span>to close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
