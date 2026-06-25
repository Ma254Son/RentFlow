'use client';

import { Clock, User, CheckCircle2, Building2, AlertCircle, UserX } from 'lucide-react';
import { generateAllMockData } from '@/lib/mock-data';
import { ActivityEvent } from '@/lib/types';

function getEventIcon(type: string) {
  switch (type) {
    case 'user_registered':
      return <User className="h-5 w-5" />;
    case 'verification_approved':
      return <CheckCircle2 className="h-5 w-5" />;
    case 'property_created':
      return <Building2 className="h-5 w-5" />;
    case 'tenancy_activated':
      return <CheckCircle2 className="h-5 w-5" />;
    case 'dispute_opened':
      return <AlertCircle className="h-5 w-5" />;
    case 'user_suspended':
      return <UserX className="h-5 w-5" />;
    case 'property_flagged':
      return <AlertCircle className="h-5 w-5" />;
    default:
      return <Clock className="h-5 w-5" />;
  }
}

function getEventColor(type: string) {
  switch (type) {
    case 'user_registered':
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
    case 'verification_approved':
      return 'bg-green-500/10 text-green-600 dark:text-green-400';
    case 'property_created':
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
    case 'tenancy_activated':
      return 'bg-green-500/10 text-green-600 dark:text-green-400';
    case 'dispute_opened':
      return 'bg-red-500/10 text-red-600 dark:text-red-400';
    case 'user_suspended':
      return 'bg-red-500/10 text-red-600 dark:text-red-400';
    case 'property_flagged':
      return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
    default:
      return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
  }
}

function formatTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

export default function ActivityPage() {
  const { activityFeed } = generateAllMockData();

  // Group events by date
  const groupedEvents: Record<string, ActivityEvent[]> = {};
  activityFeed.forEach((event) => {
    const dateKey = new Date(event.timestamp).toLocaleDateString();
    if (!groupedEvents[dateKey]) {
      groupedEvents[dateKey] = [];
    }
    groupedEvents[dateKey].push(event);
  });

  const dateGroups = Object.entries(groupedEvents).sort(
    ([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Activity Feed</h1>
        <p className="mt-1 text-muted-foreground">Real-time system activity and events</p>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {dateGroups.map(([dateKey, events]) => (
          <div key={dateKey}>
            {/* Date Separator */}
            <div className="mb-4 flex items-center gap-4">
              <h3 className="text-sm font-semibold text-foreground">{dateKey}</h3>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Events for this date */}
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-4 rounded-lg border border-border bg-card p-4 hover:shadow-md transition-all cursor-pointer hover:border-primary/50"
                >
                  {/* Icon */}
                  <div className={`rounded-lg p-2.5 flex-shrink-0 ${getEventColor(event.type)}`}>
                    {getEventIcon(event.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{event.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                        {formatTime(event.timestamp)}
                      </span>
                    </div>

                    {/* Metadata */}
                    {event.relatedEntityId && (
                      <div className="mt-2 text-xs">
                        <span className="inline-block px-2 py-1 rounded bg-muted text-muted-foreground">
                          ID: {event.relatedEntityId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
