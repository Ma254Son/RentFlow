'use client';

import React from 'react';
import { usePropertyWizard } from '@/contexts/PropertyWizardContext';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

interface Step5ReviewPublishProps {
  onPublish?: () => void;
}

export function Step5ReviewPublish({ onPublish }: Step5ReviewPublishProps) {
  const { data, previousStep, updateData, reset } = usePropertyWizard();

  const handlePublish = () => {
    updateData({ isPublished: true });
    onPublish?.();
  };

  const totalRevenue = data.units.reduce((sum, unit) => sum + unit.rentAmount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Review & Publish</h3>
        <p className="text-sm text-foreground/60">
          Review your property details before publishing. You can edit this later.
        </p>
      </div>

      <div className="space-y-4">
        {/* Property Section */}
        <div className="p-4 bg-accent/30 rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-3">Property Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-foreground/60">Property Name</p>
              <p className="font-medium text-foreground mt-1">{data.propertyName}</p>
            </div>
            <div>
              <p className="text-foreground/60">Type</p>
              <p className="font-medium text-foreground mt-1">{data.propertyType}</p>
            </div>
            <div>
              <p className="text-foreground/60">Location</p>
              <p className="font-medium text-foreground mt-1">{data.location}</p>
            </div>
            <div>
              <p className="text-foreground/60">Total Units</p>
              <p className="font-medium text-foreground mt-1">{data.totalUnits}</p>
            </div>
            {data.description && (
              <div className="col-span-2">
                <p className="text-foreground/60">Description</p>
                <p className="font-medium text-foreground mt-1">{data.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Agent Section */}
        <div className="p-4 bg-accent/30 rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-3">Assigned Agent</h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
              {data.assignedAgentName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-foreground">{data.assignedAgentName}</p>
              <p className="text-sm text-foreground/60">Will manage this property</p>
            </div>
          </div>
        </div>

        {/* Units Summary */}
        <div className="p-4 bg-accent/30 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">Units Summary</h4>
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
              {data.units.length} units
            </span>
          </div>

          <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
            {data.units.map((unit) => (
              <div key={unit.id} className="flex items-center justify-between p-2 bg-background rounded">
                <div>
                  <p className="font-medium text-foreground">
                    Unit {unit.unitNumber}
                    <span className="text-foreground/60 ml-2">({unit.type})</span>
                  </p>
                  <p className="text-xs text-foreground/60">
                    {unit.bedrooms}BR • {unit.bathrooms}BA • {unit.area}sqm •{' '}
                    <strong>KES {unit.rentAmount.toLocaleString()}</strong>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-semibold text-primary text-sm">
                    {data.homeIds[unit.id]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-sm font-medium">
            <span>Total Monthly Revenue</span>
            <span className="text-primary text-lg">KES {totalRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Checklist */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
            <Check className="w-4 h-4" />
            All Steps Complete
          </h4>
          <ul className="space-y-1 text-sm text-green-800">
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3" /> Property information verified
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3" /> Agent assigned
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3" /> {data.units.length} units configured
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3" /> Home IDs generated
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Ready to go!</strong> Once published, this property will appear in your properties
          list and your agent will receive notifications.
        </p>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={previousStep}>
          Back
        </Button>
        <Button onClick={handlePublish} size="lg">
          <Check className="w-4 h-4 mr-2" />
          Publish Property
        </Button>
      </div>
    </div>
  );
}
