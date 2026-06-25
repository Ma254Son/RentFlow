'use client';

import React, { useState } from 'react';
import { Plus, Calendar, MapPin, User, FileText } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockViewings, getPropertiesForUser, mockUnits } from '@/lib/mock-data';
import { statusColors, statusLabels } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function ViewingsPage() {
  const { currentUser } = useAuth();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Get viewings for user's properties
  const userProperties = getPropertiesForUser(currentUser.id, currentUser.role);
  const userPropertyIds = userProperties.map((p) => p.id);
  let viewings = mockViewings.filter((v) => userPropertyIds.includes(v.propertyId));

  // Apply status filter
  if (filterStatus !== 'all') {
    viewings = viewings.filter((v) => v.status === filterStatus);
  }

  const stats = {
    total: mockViewings.filter((v) => userPropertyIds.includes(v.propertyId)).length,
    scheduled: mockViewings.filter(
      (v) => userPropertyIds.includes(v.propertyId) && v.status === 'scheduled'
    ).length,
    completed: mockViewings.filter(
      (v) => userPropertyIds.includes(v.propertyId) && v.status === 'completed'
    ).length,
    cancelled: mockViewings.filter(
      (v) => userPropertyIds.includes(v.propertyId) && v.status === 'cancelled'
    ).length,
  };

  const getUnitInfo = (unitId: string) => {
    return mockUnits.find((u) => u.id === unitId);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Viewings</h1>
            <p className="text-muted-foreground mt-2">Schedule and manage property viewings</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            <Plus className="w-5 h-5" />
            Schedule Viewing
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: stats.total, color: 'bg-blue-100 text-blue-700' },
            { label: 'Scheduled', value: stats.scheduled, color: 'bg-purple-100 text-purple-700' },
            { label: 'Completed', value: stats.completed, color: 'bg-green-100 text-green-700' },
            { label: 'Cancelled', value: stats.cancelled, color: 'bg-gray-100 text-gray-700' },
          ].map((stat) => (
            <div key={stat.label} className={cn('p-4 rounded-lg', stat.color)}>
              <p className="text-sm font-medium opacity-80">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <div className="flex gap-2 flex-wrap">
            {['all', 'scheduled', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm transition-all',
                  filterStatus === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-foreground hover:bg-accent/80'
                )}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Viewings List */}
        <div className="space-y-4">
          {viewings.map((viewing) => {
            const unit = getUnitInfo(viewing.unitId);
            return (
              <div key={viewing.id} className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-all cursor-pointer">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Unit Info */}
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {unit?.unitNumber || 'Unit TBA'}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {unit?.bedrooms}BR / {unit?.bathrooms}BA
                    </p>
                    <p className="text-sm font-medium text-primary mt-2">
                      KES {unit?.rentAmount.toLocaleString()}
                    </p>
                  </div>

                  {/* Schedule Info */}
                  <div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">
                          {new Date(viewing.scheduledDate).toLocaleDateString('en-KE', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(viewing.scheduledDate).toLocaleTimeString('en-KE', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between md:justify-end gap-4">
                    {viewing.notes && (
                      <div className="flex items-start gap-2">
                        <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{viewing.notes}</p>
                      </div>
                    )}
                    <span
                      className={cn(
                        'inline-flex px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap',
                        statusColors[viewing.status]
                      )}
                    >
                      {statusLabels[viewing.status]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {viewings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold">No viewings found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
