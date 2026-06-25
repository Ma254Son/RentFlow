'use client';

import React, { useMemo } from 'react';
import { TrendingUp, Calendar } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockOccupancyRecords, getPropertiesForUser, mockUnits } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function OccupancyTimelinePage() {
  const { currentUser } = useAuth();

  // Get occupancy records for user's properties
  const userProperties = getPropertiesForUser(currentUser.id, currentUser.role);
  const userPropertyIds = userProperties.map((p) => p.id);
  const records = mockOccupancyRecords.filter((r) => userPropertyIds.includes(r.propertyId));

  // Sort by move-in date (most recent first)
  const sortedRecords = useMemo(
    () => [...records].sort((a, b) => new Date(b.moveInDate).getTime() - new Date(a.moveInDate).getTime()),
    [records]
  );

  // Calculate timeline statistics
  const stats = useMemo(
    () => ({
      totalRecords: records.length,
      currentOccupants: records.filter((r) => !r.moveOutDate).length,
      averageTenancy: records.length
        ? Math.round(
            records
              .filter((r) => r.moveOutDate)
              .reduce((sum, r) => {
                const days =
                  (new Date(r.moveOutDate!).getTime() - new Date(r.moveInDate).getTime()) /
                  (1000 * 60 * 60 * 24);
                return sum + days;
              }, 0) / records.filter((r) => r.moveOutDate).length
          )
        : 0,
      totalRevenue: records.reduce((sum, r) => sum + r.rentAmount, 0),
    }),
    [records]
  );

  const getMonthsDifference = (startDate: Date, endDate?: Date) => {
    const end = endDate || new Date();
    const start = new Date(startDate);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return Math.max(0, months);
  };

  const getUnitInfo = (unitId: string) => {
    return mockUnits.find((u) => u.id === unitId);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Occupancy Timeline</h1>
          <p className="text-muted-foreground mt-2">View tenant occupancy history and patterns</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground">Total Records</p>
            <p className="text-3xl font-bold mt-2">{stats.totalRecords}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground">Current Occupants</p>
            <p className="text-3xl font-bold mt-2 text-green-600">{stats.currentOccupants}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground">Average Tenancy</p>
            <p className="text-3xl font-bold mt-2">{stats.averageTenancy} months</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold mt-2 text-primary">
              KES {(stats.totalRevenue / 1000).toFixed(0)}K
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {sortedRecords.length > 0 ? (
            sortedRecords.map((record, index) => {
              const unit = getUnitInfo(record.unitId);
              const months = getMonthsDifference(record.moveInDate, record.moveOutDate);
              const isActive = !record.moveOutDate;

              return (
                <div
                  key={record.id}
                  className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    {/* Timeline Dot */}
                    <div className="flex items-center justify-center md:justify-start">
                      <div className="relative flex items-center">
                        <div
                          className={cn(
                            'w-4 h-4 rounded-full border-2 border-border',
                            isActive ? 'bg-green-500 border-green-500' : 'bg-gray-500 border-gray-500'
                          )}
                        />
                        {index < sortedRecords.length - 1 && (
                          <div className="hidden md:block absolute top-4 left-2 w-0.5 h-12 bg-border" />
                        )}
                      </div>
                    </div>

                    {/* Tenant Info */}
                    <div>
                      <h3 className="font-semibold">{record.tenantName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {unit ? `Unit ${unit.unitNumber}` : 'Unit TBA'}
                      </p>
                    </div>

                    {/* Duration */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Duration</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{months} months</span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Dates</p>
                      <p className="font-medium">
                        {new Date(record.moveInDate).toLocaleDateString('en-KE', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      {record.moveOutDate && (
                        <p className="text-xs text-muted-foreground">
                          to{' '}
                          {new Date(record.moveOutDate).toLocaleDateString('en-KE', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </div>

                    {/* Revenue */}
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Monthly Rent</p>
                        <p className="font-semibold text-primary">
                          KES {record.rentAmount.toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'inline-flex px-3 py-1 rounded-full text-xs font-semibold',
                          isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        )}
                      >
                        {isActive ? 'Active' : 'Ended'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No occupancy records found</h3>
              <p className="text-muted-foreground mt-2">Start tracking tenant occupancy</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
