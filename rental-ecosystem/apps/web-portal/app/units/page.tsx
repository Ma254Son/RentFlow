'use client';

import React, { useState } from 'react';
import { Plus, Filter, DoorOpen } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockUnits, getPropertiesForUser, getTenantById } from '@/lib/mock-data';
import { statusColors, statusLabels } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function UnitsPage() {
  const { currentUser } = useAuth();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Get units for user's properties
  const userProperties = getPropertiesForUser(currentUser.id, currentUser.role);
  const userPropertyIds = userProperties.map((p) => p.id);
  let units = mockUnits.filter((u) => userPropertyIds.includes(u.propertyId));

  // Apply status filter
  if (filterStatus !== 'all') {
    units = units.filter((u) => u.status === filterStatus);
  }

  const stats = {
    total: mockUnits.filter((u) => userPropertyIds.includes(u.propertyId)).length,
    available: mockUnits.filter(
      (u) => userPropertyIds.includes(u.propertyId) && u.status === 'available'
    ).length,
    occupied: mockUnits.filter(
      (u) => userPropertyIds.includes(u.propertyId) && u.status === 'occupied'
    ).length,
    maintenance: mockUnits.filter(
      (u) => userPropertyIds.includes(u.propertyId) && u.status === 'maintenance'
    ).length,
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Units</h1>
            <p className="text-muted-foreground mt-2">Manage all rental units across your properties</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            <Plus className="w-5 h-5" />
            Add Unit
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: stats.total, color: 'bg-blue-100 text-blue-700' },
            { label: 'Available', value: stats.available, color: 'bg-green-100 text-green-700' },
            { label: 'Occupied', value: stats.occupied, color: 'bg-purple-100 text-purple-700' },
            { label: 'Maintenance', value: stats.maintenance, color: 'bg-yellow-100 text-yellow-700' },
          ].map((stat) => (
            <div key={stat.label} className={cn('p-4 rounded-lg', stat.color)}>
              <p className="text-sm font-medium opacity-80">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <div className="flex gap-2 flex-wrap">
            {['all', 'available', 'occupied', 'maintenance'].map((status) => (
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

        {/* Units Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-accent/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Home ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Unit</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Rent Amount</th>
                  <th className="px-4 py-3 text-left font-semibold">Tenant</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {units.map((unit) => {
                  const tenant = unit.tenant ? getTenantById(unit.tenant) : null;
                  return (
                    <tr
                      key={unit.id}
                      className="hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 font-mono font-semibold text-primary">
                        {unit.homeId}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <DoorOpen className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{unit.unitNumber}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-muted-foreground">
                          {unit.bedrooms}BR / {unit.bathrooms}BA
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold">KES {unit.rentAmount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        {tenant ? (
                          <div>
                            <p className="font-medium">{tenant.name}</p>
                            <p className="text-xs text-muted-foreground">{tenant.email}</p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'inline-flex px-2.5 py-1 rounded-full text-xs font-medium',
                            statusColors[unit.status]
                          )}
                        >
                          {statusLabels[unit.status]}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {units.length === 0 && (
            <div className="text-center py-12">
              <DoorOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No units found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
