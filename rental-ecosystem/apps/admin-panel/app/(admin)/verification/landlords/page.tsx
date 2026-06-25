'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Filter } from 'lucide-react';
import { DataTable, Column } from '@/components/common/data-table';
import { StatusBadge } from '@/components/common/status-badge';
import { generateAllMockData } from '@/lib/mock-data';
import { Landlord } from '@/lib/types';
import { verificationStatuses } from '@/lib/constants';

function ActionMenu({ landlord }: { landlord: Landlord }) {
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
          <Link
            href={`/verification/review/${landlord.id}`}
            className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
          >
            Review Documents
          </Link>
          <button className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-muted">
            Approve
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted">
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default function LandlordsVerificationPage() {
  const { landlords } = generateAllMockData();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredLandlords = selectedStatus
    ? landlords.filter((l) => l.verificationStatus === selectedStatus)
    : landlords;

  const columns: Column<Landlord>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      width: 'w-1/4',
    },
    {
      key: 'phone',
      label: 'Phone',
      width: 'w-1/5',
    },
    {
      key: 'email',
      label: 'Email',
      width: 'w-1/4',
      render: (value) => <span className="text-sm text-muted-foreground">{value}</span>,
    },
    {
      key: 'createdAt',
      label: 'Registered',
      sortable: true,
      render: (value: Date) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'verificationStatus',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Landlord Verification</h1>
          <p className="mt-1 text-muted-foreground">Manage and review landlord verification requests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <div className="flex gap-2 flex-wrap">
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
          {verificationStatuses.map((status) => (
            <button
              key={status.value}
              onClick={() => setSelectedStatus(status.value)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === status.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {status.label} ({filteredLandlords.filter((l) => l.verificationStatus === status.value).length})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredLandlords}
        actions={(landlord) => <ActionMenu landlord={landlord} />}
      />
    </div>
  );
}
