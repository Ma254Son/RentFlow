'use client';

import { useState } from 'react';
import { Filter, Download, Calendar } from 'lucide-react';
import { DataTable, Column } from '@/components/common/data-table';
import { generateAllMockData } from '@/lib/mock-data';
import { AuditLog } from '@/lib/types';
import { auditActions, userRoles } from '@/lib/constants';

function formatTimestamp(date: Date) {
  return new Date(date).toLocaleString();
}

function StatusIndicator({ status }: { status: string }) {
  if (status === 'success') {
    return <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>;
  }
  return <span className="inline-block h-2 w-2 rounded-full bg-red-500 mr-2"></span>;
}

export default function AuditLogsPage() {
  const { auditLogs } = generateAllMockData();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<'all' | '24h' | '7d' | '30d'>('all');

  let filteredLogs = auditLogs;

  if (selectedAction) {
    filteredLogs = filteredLogs.filter((log) => log.action === selectedAction);
  }

  if (selectedUserType) {
    filteredLogs = filteredLogs.filter((log) => log.userType === selectedUserType);
  }

  if (dateRange !== 'all') {
    const now = new Date();
    const cutoff = new Date(
      now.getTime() -
        (dateRange === '24h' ? 24 * 60 * 60 * 1000 : dateRange === '7d' ? 7 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000)
    );
    filteredLogs = filteredLogs.filter((log) => new Date(log.timestamp) >= cutoff);
  }

  const columns: Column<AuditLog>[] = [
    {
      key: 'timestamp',
      label: 'Timestamp',
      sortable: true,
      render: (value) => formatTimestamp(value),
    },
    {
      key: 'action',
      label: 'Action',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
          {String(value).replace(/_/g, '.')}
        </span>
      ),
    },
    {
      key: 'userType',
      label: 'User Type',
      render: (value) => (
        <span className="capitalize px-2 py-1 bg-muted rounded text-sm font-medium">
          {value}
        </span>
      ),
    },
    {
      key: 'entityType',
      label: 'Entity',
      render: (value) => (
        <span className="capitalize px-2 py-1 bg-muted/50 rounded text-sm">
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <div className="flex items-center">
          <StatusIndicator status={value} />
          <span className="capitalize">{value}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="mt-1 text-muted-foreground">System-wide activity and compliance logs</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-4">
        {/* Date Range */}
        <div className="flex items-center gap-4">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div className="flex gap-2">
            {(
              [
                { label: 'All Time', value: 'all' },
                { label: 'Last 24h', value: '24h' },
                { label: 'Last 7 days', value: '7d' },
                { label: 'Last 30 days', value: '30d' },
              ] as const
            ).map((range) => (
              <button
                key={range.value}
                onClick={() => setDateRange(range.value)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === range.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Filter */}
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Action:</span>
            <button
              onClick={() => setSelectedAction(null)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedAction === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {auditActions.slice(0, 5).map((action) => (
              <button
                key={action.value}
                onClick={() => setSelectedAction(action.value)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedAction === action.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* User Type Filter */}
        <div className="flex items-center gap-4">
          <div className="w-5"></div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">User Type:</span>
            <button
              onClick={() => setSelectedUserType(null)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedUserType === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {userRoles.map((role) => (
              <button
                key={role.value}
                onClick={() => setSelectedUserType(role.value)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedUserType === role.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredLogs.length} of {auditLogs.length} entries
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredLogs} />
    </div>
  );
}
