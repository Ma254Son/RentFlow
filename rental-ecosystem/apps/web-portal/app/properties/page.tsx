'use client';

import React, { useState } from 'react';
import { Plus, MapPin, Home, Users, TrendingUp } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { PropertyWizardDialog } from '@/components/PropertyWizardDialog';
import { useAuth } from '@/contexts/AuthContext';
import { getPropertiesForUser, mockUnits } from '@/lib/mock-data';
import { statusColors } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function PropertiesPage() {
  const { currentUser, isAgent } = useAuth();
  const [properties, setProperties] = useState(getPropertiesForUser(currentUser.id, currentUser.role));
  const [wizardOpen, setWizardOpen] = useState(false);

  const getPropertyStats = (propertyId: string) => {
    const units = mockUnits.filter((u) => u.propertyId === propertyId);
    const occupied = units.filter((u) => u.status === 'occupied').length;
    const available = units.filter((u) => u.status === 'available').length;
    return { total: units.length, occupied, available };
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Properties</h1>
            <p className="text-muted-foreground mt-2">
              {isAgent ? 'Manage your assigned properties' : 'Manage all your properties'}
            </p>
          </div>
          <button 
            onClick={() => setWizardOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Property
          </button>
        </div>

        {/* Wizard Dialog */}
        <PropertyWizardDialog 
          open={wizardOpen} 
          onOpenChange={setWizardOpen}
          onPublish={() => {
            // Optionally refresh properties or add the new property
          }}
        />

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => {
            const stats = getPropertyStats(property.id);
            const occupancyRate = Math.round((stats.occupied / stats.total) * 100);

            return (
              <div
                key={property.id}
                className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-all cursor-pointer group"
              >
                {/* Image */}
                <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-1">{property.name}</h3>

                  {/* Location */}
                  <div className="flex items-start gap-2 mt-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div className="line-clamp-1">
                      {property.address}, {property.city}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Units</p>
                      <p className="text-sm font-semibold mt-1">{stats.total}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Occupied</p>
                      <p className="text-sm font-semibold mt-1 text-green-600">{stats.occupied}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Available</p>
                      <p className="text-sm font-semibold mt-1 text-blue-600">{stats.available}</p>
                    </div>
                  </div>

                  {/* Occupancy Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium">Occupancy</p>
                      <p className="text-xs font-semibold">{occupancyRate}%</p>
                    </div>
                    <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${occupancyRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="mt-4">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        property.type === 'residential'
                          ? 'bg-blue-100 text-blue-800'
                          : property.type === 'commercial'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      )}
                    >
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {properties.length === 0 && (
          <div className="text-center py-12">
            <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold">No properties found</h3>
            <p className="text-muted-foreground mt-2">Get started by adding your first property</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
