'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Filter } from 'lucide-react';
import { DataTable, Column } from '@/components/common/data-table';
import { StatusBadge } from '@/components/common/status-badge';
import { generateAllMockData } from '@/lib/mock-data';
import { User } from '@/lib/types';
import { userRoles, verificationStatuses } from '@/lib/constants';

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
          <Link
            href={`/users/${user.id}`}
            className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
          >
            View Profile
          </Link>
          {user.accountStatus === 'active' && (
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted">
              Suspend Account
            </button>
          )}
          {user.accountStatus === 'suspended' && (
            <button className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-muted">
              Reactivate
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function UsersPage() {
  const { tenants, landlords, agents } = generateAllMockData();
  const allUsers: User[] = [...tenants, ...landlords, ...agents];
  
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  let filteredUsers = allUsers;
  if (selectedRole) {
    filteredUsers = filteredUsers.filter((u) => u.role === selectedRole);
  }
  if (selectedStatus) {
    filteredUsers = filteredUsers.filter((u) => u.verificationStatus === selectedStatus);
  }

  const columns: Column<User>[] = [
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
      key: 'verificationStatus',
      label: 'Verification',
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'accountStatus',
      label: 'Account Status',
      render: (value) => <StatusBadge status={value} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="mt-1 text-muted-foreground">Manage all users across the platform</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Role:</span>
            <button
              onClick={() => setSelectedRole(null)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedRole === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {userRoles.map((role) => (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedRole === role.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-5"></div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Verification:</span>
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
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        actions={(user) => <ActionMenu user={user} />}
      />
    </div>
  );
}
