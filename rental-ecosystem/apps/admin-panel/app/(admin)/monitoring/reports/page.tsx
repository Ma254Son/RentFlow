'use client';

import { Download, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateAllMockData } from '@/lib/mock-data';

export default function ReportsPage() {
  const { userGrowth, propertyGrowth, verificationTrend } = generateAllMockData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="mt-1 text-muted-foreground">Analytics and performance metrics</p>
      </div>

      {/* Reports Grid */}
      <div className="space-y-6">
        {/* User Growth Report */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-foreground">User Growth</h2>
            </div>
            <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted text-sm font-medium transition-colors hover:bg-muted/80">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
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

        {/* Property Growth Report */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <h2 className="text-lg font-semibold text-foreground">Property Growth</h2>
            </div>
            <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted text-sm font-medium transition-colors hover:bg-muted/80">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
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

        {/* Verification Trends Report */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-foreground">Verification Trends</h2>
            </div>
            <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted text-sm font-medium transition-colors hover:bg-muted/80">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
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
    </div>
  );
}
