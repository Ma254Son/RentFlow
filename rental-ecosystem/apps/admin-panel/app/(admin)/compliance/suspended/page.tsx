'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DataTable, Column } from '@/components/common/data-table';
import { generateAllMockData } from '@/lib/mock-data';
import { User } from '@/lib/types';

function ActionMenu({ user }: { user: User }) {
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
          <button className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-muted">
            Reactivate Account
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted">
            View Activity
          </button>
        </div>
      )}
    </div>
  );
}

export default function SuspendedAccountsPage() {
  const { tenants, landlords, agents, properties } = generateAllMockData();
  const allUsers = [...tenants, ...landlords, ...agents];

  const suspendedUsers = allUsers.filter((u) => u.accountStatus === 'suspended');
  const suspendedProperties = properties.filter((p) => p.status === 'suspended');

  const userColumns: Column<User>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      width: 'w-1/4',
    },
    {
      key: 'role',
      label: 'Role',
      width: 'w-1/6',
      render: (value) => (
        <span className="capitalize px-2 py-1 bg-muted rounded text-sm font-medium">
          {value}
        </span>
      ),
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
      render: (value) => <span className="text-muted-foreground text-sm">{value}</span>,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Suspended Accounts</h1>
        <p className="mt-1 text-muted-foreground">Manage suspended users and properties</p>
      </div>

      {/* Suspended Users Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Suspended Users ({suspendedUsers.length})</h2>
          <p className="text-sm text-muted-foreground mt-1">Users with suspended accounts</p>
        </div>
        <DataTable
          columns={userColumns}
          data={suspendedUsers}
          actions={(user) => <ActionMenu user={user} />}
          emptyState={<div className="text-center py-8 text-muted-foreground">No suspended users</div>}
        />
      </div>

      {/* Suspended Properties Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Suspended Properties ({suspendedProperties.length})</h2>
          <p className="text-sm text-muted-foreground mt-1">Properties suspended for compliance reasons</p>
        </div>
        <DataTable
          columns={[
            {
              key: 'name',
              label: 'Property Name',
              sortable: true,
              width: 'w-1/4',
            },
            {
              key: 'address',
              label: 'Address',
              width: 'w-1/3',
              render: (value, item: any) => `${item.address}, ${item.city}`,
            },
            {
              key: 'totalUnits',
              label: 'Units',
              render: (value, item: any) => item.totalUnits,
            },
          ]}
          data={suspendedProperties}
          actions={(property) => (
            <div className="relative">
              <button className="rounded-lg p-2 transition-colors hover:bg-muted">
                <span className="text-muted-foreground">⋯</span>
              </button>
            </div>
          )}
          emptyState={<div className="text-center py-8 text-muted-foreground">No suspended properties</div>}
        />
      </div>
    </div>
  );
}
