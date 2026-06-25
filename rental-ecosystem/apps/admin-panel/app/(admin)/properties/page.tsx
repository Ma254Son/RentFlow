'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Filter } from 'lucide-react';
import { DataTable, Column } from '@/components/common/data-table';
import { StatusBadge } from '@/components/common/status-badge';
import { generateAllMockData } from '@/lib/mock-data';
import { Property } from '@/lib/types';
import { propertyStatuses } from '@/lib/constants';

function ActionMenu({ property }: { property: Property }) {
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
            href={`/properties/${property.id}`}
            className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
          >
            View Details
          </Link>
          <button className="w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-muted">
            Flag Property
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted">
            Suspend
          </button>
        </div>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  const { properties } = generateAllMockData();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredProperties = selectedStatus
    ? properties.filter((p) => p.status === selectedStatus)
    : properties;

  const columns: Column<Property>[] = [
    {
      key: 'name',
      label: 'Property Name',
      sortable: true,
      width: 'w-1/4',
    },
    {
      key: 'address',
      label: 'Address',
      width: 'w-1/4',
      render: (value, item: Property) => `${item.address}, ${item.city}`,
    },
    {
      key: 'totalUnits',
      label: 'Units',
      render: (value, item: Property) => `${item.occupiedUnits}/${item.totalUnits}`,
    },
    {
      key: 'occupancyPercentage',
      label: 'Occupancy',
      render: (value) => `${value}%`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Properties</h1>
          <p className="mt-1 text-muted-foreground">Manage all rental properties</p>
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
          {propertyStatuses.map((status) => (
            <button
              key={status.value}
              onClick={() => setSelectedStatus(status.value)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === status.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {status.label} ({filteredProperties.filter((p) => p.status === status.value).length})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredProperties}
        actions={(property) => <ActionMenu property={property} />}
      />
    </div>
  );
}
