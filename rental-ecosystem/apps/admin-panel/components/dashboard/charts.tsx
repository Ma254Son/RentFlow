'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserGrowthData, PropertyGrowthData, VerificationTrendData } from '@/lib/types';

interface DashboardChartsProps {
  userGrowth: UserGrowthData[];
  propertyGrowth: PropertyGrowthData[];
  verificationTrend: VerificationTrendData[];
}

export function DashboardCharts({ userGrowth, propertyGrowth, verificationTrend }: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* User Growth Chart */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">User Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <XAxis dataKey="month" stroke="hsl(var(--color-muted-foreground))" />
            <YAxis stroke="hsl(var(--color-muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--color-card))',
                border: '1px solid hsl(var(--color-border))',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'hsl(var(--color-foreground))' }}
            />
            <Legend />
            <Line type="monotone" dataKey="tenants" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="landlords" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="agents" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Property Growth Chart */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Property Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={propertyGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <XAxis dataKey="month" stroke="hsl(var(--color-muted-foreground))" />
            <YAxis stroke="hsl(var(--color-muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--color-card))',
                border: '1px solid hsl(var(--color-border))',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'hsl(var(--color-foreground))' }}
            />
            <Legend />
            <Bar dataKey="properties" fill="#8b5cf6" />
            <Bar dataKey="units" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Verification Trend Chart */}
      <div className="rounded-lg border border-border bg-card p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-foreground mb-4">Verification Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={verificationTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <XAxis dataKey="month" stroke="hsl(var(--color-muted-foreground))" />
            <YAxis stroke="hsl(var(--color-muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--color-card))',
                border: '1px solid hsl(var(--color-border))',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'hsl(var(--color-foreground))' }}
            />
            <Legend />
            <Bar dataKey="submitted" fill="#3b82f6" />
            <Bar dataKey="approved" fill="#10b981" />
            <Bar dataKey="rejected" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
