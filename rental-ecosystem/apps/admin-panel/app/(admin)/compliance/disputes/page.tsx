'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';
import { DataTable, Column } from '@/components/common/data-table';
import { StatusBadge } from '@/components/common/status-badge';
import { generateAllMockData } from '@/lib/mock-data';
import { Dispute } from '@/lib/types';
import { disputeStatuses } from '@/lib/constants';

function SeverityBadge({ severity }: { severity: string }) {
  const colors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colors[severity as keyof typeof colors]}`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
}

function ActionMenu({ dispute }: { dispute: Dispute }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 transition-colors hover:bg-muted"
      >
        <span className="text-muted-foreground">⋯</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-40">
          <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted">
            View Details
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-muted">
            Investigate
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-muted">
            Mark Resolved
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted">
            Escalate
          </button>
        </div>
      )}
    </div>
  );
}

export default function DisputesPage() {
  const { disputes } = generateAllMockData();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  let filteredDisputes = disputes;

  if (selectedStatus) {
    filteredDisputes = filteredDisputes.filter((d) => d.status === selectedStatus);
  }

  if (selectedSeverity) {
    filteredDisputes = filteredDisputes.filter((d) => d.severity === selectedSeverity);
  }

  const columns: Column<Dispute>[] = [
    {
      key: 'id',
      label: 'Dispute ID',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm font-medium">{value}</span>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      width: 'w-1/4',
    },
    {
      key: 'reportedDate',
      label: 'Reported',
      sortable: true,
      render: (value: Date) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'severity',
      label: 'Severity',
      render: (value) => <SeverityBadge severity={value} />,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />,
    },
  ];

  const openCount = disputes.filter((d) => d.status === 'open').length;
  const highSeverityCount = disputes.filter((d) => d.severity === 'high').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Disputes</h1>
        <p className="mt-1 text-muted-foreground">Manage tenant-landlord and property disputes</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Disputes</p>
          <p className="text-2xl font-bold text-foreground mt-2">{disputes.length}</p>
        </div>
        <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
          <p className="text-sm text-orange-700 dark:text-orange-300">Open Disputes</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-2">{openCount}</p>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm text-red-700 dark:text-red-300">High Severity</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">{highSeverityCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Status:</span>
            <button
              onClick={() => setSelectedStatus(null)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {disputeStatuses.map((status) => (
              <button
                key={status.value}
                onClick={() => setSelectedStatus(status.value)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === status.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-5"></div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Severity:</span>
            <button
              onClick={() => setSelectedSeverity(null)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedSeverity === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {['low', 'medium', 'high'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedSeverity === sev
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {sev.charAt(0).toUpperCase() + sev.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredDisputes}
        actions={(dispute) => <ActionMenu dispute={dispute} />}
      />
    </div>
  );
}
