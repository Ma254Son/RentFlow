'use client';

import { X, CheckCircle2, AlertCircle, Users, Clock } from 'lucide-react';

interface NotificationCenterProps {
  onClose: () => void;
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const notifications = [
    {
      id: 1,
      type: 'verification',
      title: 'New Landlord Verification',
      message: '5 pending landlord verifications waiting for review',
      icon: CheckCircle2,
      time: '5 minutes ago',
      unread: true,
    },
    {
      id: 2,
      type: 'alert',
      title: 'Dispute Alert',
      message: 'High severity dispute opened at Westlands Plaza',
      icon: AlertCircle,
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance completed successfully',
      icon: Clock,
      time: '3 hours ago',
      unread: false,
    },
    {
      id: 4,
      type: 'users',
      title: 'New User Registration',
      message: '12 new users registered in the last 24 hours',
      icon: Users,
      time: '1 day ago',
      unread: false,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="font-semibold text-foreground">Notifications</h3>
        <button
          onClick={onClose}
          className="rounded-lg p-1 transition-colors hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="max-h-96 divide-y divide-border overflow-y-auto">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`flex gap-3 px-4 py-3 transition-colors hover:bg-muted/50 cursor-pointer ${
                notification.unread ? 'bg-primary/5' : ''
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{notification.title}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
              </div>
              {notification.unread && (
                <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-border px-4 py-3 text-center">
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          View All Notifications
        </button>
      </div>
    </div>
  );
}
