import Link from 'next/link';
import { ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { Tenant, Landlord, Dispute, ActivityEvent } from '@/lib/types';
import { statusColors } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface DashboardWidgetsProps {
  tenants: Tenant[];
  landlords: Landlord[];
  disputes: Dispute[];
  activityFeed: ActivityEvent[];
}

function formatDate(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export function DashboardWidgets({
  tenants,
  landlords,
  disputes,
  activityFeed,
}: DashboardWidgetsProps) {
  const recentTenants = tenants.slice(0, 5);
  const openDisputes = disputes.filter((d) => d.status === 'open').slice(0, 5);
  const recentActivity = activityFeed.slice(0, 8);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Recent Registrations */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Registrations</h3>
          <Link href="/users" className="text-sm text-primary hover:text-primary/80">
            View All
          </Link>
        </div>

        <div className="space-y-3">
          {recentTenants.map((tenant) => (
            <div key={tenant.id} className="flex items-center justify-between gap-2 rounded-lg border border-border/50 p-3 hover:bg-muted/50 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{tenant.name}</p>
                <p className="text-xs text-muted-foreground">{tenant.email}</p>
              </div>
              <div className={cn('text-xs font-medium px-2 py-1 rounded', statusColors[tenant.accountStatus].badge)}>
                {tenant.accountStatus}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Disputes */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Open Disputes</h3>
          <Link href="/compliance/disputes" className="text-sm text-primary hover:text-primary/80">
            View All
          </Link>
        </div>

        <div className="space-y-3">
          {openDisputes.length > 0 ? (
            openDisputes.map((dispute) => (
              <div key={dispute.id} className="flex items-start gap-3 rounded-lg border border-border/50 p-3 hover:bg-muted/50 transition-colors">
                <AlertCircle className={cn('h-4 w-4 mt-0.5 flex-shrink-0', dispute.severity === 'high' ? 'text-red-500' : dispute.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500')} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{dispute.title}</p>
                  <p className="text-xs text-muted-foreground">ID: {dispute.id}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No open disputes</p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Link href="/monitoring/activity" className="text-sm text-primary hover:text-primary/80">
            View All
          </Link>
        </div>

        <div className="space-y-3">
          {recentActivity.map((event) => (
            <div key={event.id} className="flex items-start gap-2 rounded-lg border border-border/50 p-3 hover:bg-muted/50 transition-colors">
              <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{event.title}</p>
                <p className="text-xs text-muted-foreground">{formatDate(event.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
