'use client';

import React, { useState } from 'react';
import { Plus, Filter, Users, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockTenants, getPropertiesForUser } from '@/lib/mock-data';
import { statusColors, statusLabels } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function TenantsPage() {
  const { currentUser } = useAuth();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Get tenants for user's properties
  const userProperties = getPropertiesForUser(currentUser.id, currentUser.role);
  const userPropertyIds = userProperties.map((p) => p.id);
  let tenants = mockTenants.filter((t) => userPropertyIds.includes(t.propertyId));

  // Apply status filter
  if (filterStatus !== 'all') {
    tenants = tenants.filter((t) => t.status === filterStatus);
  }

  const stats = {
    total: mockTenants.filter((t) => userPropertyIds.includes(t.propertyId)).length,
    active: mockTenants.filter((t) => userPropertyIds.includes(t.propertyId) && t.status === 'active')
      .length,
    pending: mockTenants.filter((t) => userPropertyIds.includes(t.propertyId) && t.status === 'pending')
      .length,
    inactive: mockTenants.filter((t) => userPropertyIds.includes(t.propertyId) && t.status === 'inactive')
      .length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tenants</h1>
            <p className="text-muted-foreground mt-2">Manage tenant applications and accounts</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            <Plus className="w-5 h-5" />
            Add Tenant
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: stats.total, color: 'bg-blue-100 text-blue-700' },
            { label: 'Active', value: stats.active, color: 'bg-green-100 text-green-700' },
            { label: 'Pending', value: stats.pending, color: 'bg-orange-100 text-orange-700' },
            { label: 'Inactive', value: stats.inactive, color: 'bg-gray-100 text-gray-700' },
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
            {['all', 'active', 'pending', 'inactive'].map((status) => (
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

        {/* Tenants Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-accent/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Email</th>
                  <th className="px-4 py-3 text-left font-semibold">Phone</th>
                  <th className="px-4 py-3 text-left font-semibold">Rent Amount</th>
                  <th className="px-4 py-3 text-left font-semibold">Move In</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tenants.map((tenant) => (
                  <tr
                    key={tenant.id}
                    className="hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium">{tenant.name}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{tenant.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{tenant.phone}</td>
                    <td className="px-4 py-3 font-semibold">
                      {tenant.rentAmount ? `KES ${tenant.rentAmount.toLocaleString()}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {tenant.moveInDate
                        ? new Date(tenant.moveInDate).toLocaleDateString('en-KE', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium',
                          statusColors[tenant.status]
                        )}
                      >
                        {getStatusIcon(tenant.status)}
                        {statusLabels[tenant.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {tenants.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No tenants found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
