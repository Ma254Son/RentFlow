'use client';

import React, { useState } from 'react';
import { Plus, Wrench, AlertCircle, Clock, CheckCircle2, Pause } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockMaintenanceRequests, getPropertiesForUser, mockUnits } from '@/lib/mock-data';
import { statusColors, statusLabels } from '@/lib/constants';
import { cn } from '@/lib/utils';

type MaintenanceStatus = 'open' | 'in-progress' | 'completed' | 'on-hold';

export default function MaintenancePage() {
  const { currentUser } = useAuth();

  // Get maintenance requests for user's properties
  const userProperties = getPropertiesForUser(currentUser.id, currentUser.role);
  const userPropertyIds = userProperties.map((p) => p.id);
  const requests = mockMaintenanceRequests.filter((r) => userPropertyIds.includes(r.propertyId));

  // Group by status for kanban
  const kanbanColumns: Record<MaintenanceStatus, typeof requests> = {
    open: requests.filter((r) => r.status === 'open'),
    'in-progress': requests.filter((r) => r.status === 'in-progress'),
    completed: requests.filter((r) => r.status === 'completed'),
    'on-hold': requests.filter((r) => r.status === 'on-hold'),
  };

  const getUnitInfo = (unitId?: string) => {
    if (!unitId) return null;
    return mockUnits.find((u) => u.id === unitId);
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'high':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'low':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      default:
        return null;
    }
  };

  const MaintenanceCard = ({ request }: { request: (typeof requests)[0] }) => {
    const unit = request.unitId ? getUnitInfo(request.unitId) : null;
    return (
      <div className="bg-background rounded-lg border border-border p-4 space-y-3 cursor-move hover:shadow-md transition-shadow">
        {/* Priority Badge */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium',
              statusColors[request.priority]
            )}
          >
            {getPriorityIcon(request.priority)}
            {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
          </span>
          <span className="text-xs text-muted-foreground">ID: {request.id.slice(0, 6)}</span>
        </div>

        {/* Title */}
        <div>
          <h4 className="font-semibold text-foreground">{request.title}</h4>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{request.description}</p>
        </div>

        {/* Unit Info */}
        {unit && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Unit {unit.unitNumber} • KES {unit.rentAmount.toLocaleString()}
            </p>
          </div>
        )}

        {/* Assigned To */}
        {request.assignedTo && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs font-medium text-foreground">
              Assigned to: {request.assignedTo === 'user-agent-1' ? 'Sarah Omondi' : 'You'}
            </p>
          </div>
        )}
      </div>
    );
  };

  const ColumnHeader = ({ status, count }: { status: MaintenanceStatus; count: number }) => {
    const icons: Record<MaintenanceStatus, React.ReactNode> = {
      open: <AlertCircle className="w-5 h-5" />,
      'in-progress': <Clock className="w-5 h-5" />,
      completed: <CheckCircle2 className="w-5 h-5" />,
      'on-hold': <Pause className="w-5 h-5" />,
    };

    const colors: Record<MaintenanceStatus, string> = {
      open: 'text-red-600',
      'in-progress': 'text-blue-600',
      completed: 'text-green-600',
      'on-hold': 'text-gray-600',
    };

    return (
      <div className="flex items-center gap-2 mb-4">
        <div className={cn('flex items-center gap-2', colors[status])}>
          {icons[status]}
          <span className="font-semibold capitalize">{status.replace('-', ' ')}</span>
        </div>
        <span className="ml-auto bg-primary/20 text-primary px-2.5 py-1 rounded-full text-xs font-semibold">
          {count}
        </span>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Maintenance Requests</h1>
            <p className="text-muted-foreground mt-2">Track and manage property maintenance</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            <Plus className="w-5 h-5" />
            New Request
          </button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
          {(Object.keys(kanbanColumns) as MaintenanceStatus[]).map((status) => (
            <div key={status} className="bg-accent/30 rounded-lg p-4 min-h-96">
              <ColumnHeader status={status} count={kanbanColumns[status].length} />

              {/* Cards */}
              <div className="space-y-3">
                {kanbanColumns[status].map((request) => (
                  <MaintenanceCard key={request.id} request={request} />
                ))}
              </div>

              {/* Empty State */}
              {kanbanColumns[status].length === 0 && (
                <div className="text-center py-8">
                  <Wrench className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-xs text-muted-foreground">No requests</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-semibold text-lg mb-4">Priority Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['urgent', 'high', 'medium', 'low'].map((priority) => {
              const count = requests.filter((r) => r.priority === priority).length;
              return (
                <div key={priority} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                  <span className="text-sm font-medium capitalize">{priority}</span>
                  <span className="text-xl font-bold">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
