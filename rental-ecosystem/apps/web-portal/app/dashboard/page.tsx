'use client';

import React from 'react';
import { Building2, Users, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { KPICard } from '@/components/KPICard';
import { useAuth } from '@/contexts/AuthContext';
import { mockProperties, mockUnits, mockMaintenanceRequests, mockTenants } from '@/lib/mock-data';
import { getPropertiesForUser } from '@/lib/mock-data';

export default function DashboardPage() {
  const { currentUser, isLandlord } = useAuth();

  // Calculate stats based on user role
  const userProperties = getPropertiesForUser(currentUser.id, currentUser.role);
  const userUnits = userProperties.length
    ? mockUnits.filter((u) => userProperties.some((p) => p.id === u.propertyId))
    : [];
  
  const occupiedUnits = userUnits.filter((u) => u.status === 'occupied').length;
  const totalUnits = userUnits.length;
  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;

  // Calculate monthly revenue
  const monthlyRevenue = userUnits
    .filter((u) => u.status === 'occupied')
    .reduce((sum, u) => sum + u.rentAmount, 0);

  // Count maintenance requests
  const maintenanceCount = mockMaintenanceRequests.filter((m) =>
    userProperties.some((p) => p.id === m.propertyId)
  ).length;

  // Count pending tenant approvals
  const pendingTenants = mockTenants.filter((t) => t.status === 'pending').length;

  // Active agents count
  const activeAgents = isLandlord ? 2 : 1;

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {currentUser.name}</h1>
          <p className="text-muted-foreground mt-2">
            Here&apos;s your property management overview
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Properties"
            value={userProperties.length}
            icon={Building2}
            trend={{ value: 0, direction: 'up' }}
          />
          <KPICard
            title="Occupancy Rate"
            value={occupancyRate}
            unit="%"
            icon={Users}
            trend={{ value: 5, direction: 'up' }}
          />
          <KPICard
            title="Monthly Revenue"
            value={monthlyRevenue.toLocaleString()}
            unit="KES"
            icon={TrendingUp}
            trend={{ value: 8, direction: 'up' }}
          />
          <KPICard
            title="Pending Requests"
            value={maintenanceCount + pendingTenants}
            icon={AlertCircle}
            trend={{ value: 2, direction: 'down' }}
          />
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Maintenance Overview */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">Maintenance Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm">Urgent</span>
                </div>
                <span className="font-semibold">
                  {mockMaintenanceRequests.filter((m) => m.priority === 'urgent').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="text-sm">In Progress</span>
                </div>
                <span className="font-semibold">
                  {mockMaintenanceRequests.filter((m) => m.status === 'in-progress').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Completed</span>
                </div>
                <span className="font-semibold">
                  {mockMaintenanceRequests.filter((m) => m.status === 'completed').length}
                </span>
              </div>
            </div>
          </div>

          {/* Tenant Overview */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">Tenant Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Tenants</span>
                <span className="font-semibold">{mockTenants.filter((t) => t.status === 'active').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Approval</span>
                <span className="font-semibold text-orange-600">{pendingTenants}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Inactive</span>
                <span className="font-semibold">{mockTenants.filter((t) => t.status === 'inactive').length}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Units</span>
                <span className="font-semibold">{totalUnits}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Occupied Units</span>
                <span className="font-semibold text-green-600">{occupiedUnits}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Available Units</span>
                <span className="font-semibold text-blue-600">{totalUnits - occupiedUnits}</span>
              </div>
              {isLandlord && (
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm">Active Agents</span>
                  <span className="font-semibold">{activeAgents}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
