'use client';

import React from 'react';
import { usePropertyWizard } from '@/contexts/PropertyWizardContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function Step1PropertyInfo() {
  const { data, updateData, nextStep, canProceedToNext } = usePropertyWizard();

  const handlePropertyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ propertyName: e.target.value });
  };

  const handlePropertyTypeChange = (value: string) => {
    updateData({ propertyType: value as any });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ location: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ description: e.target.value });
  };

  const handleTotalUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    updateData({ totalUnits: Math.max(1, value) });
  };

  const isComplete = canProceedToNext();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Property Information</h3>
        <p className="text-sm text-foreground/60 mt-1">
          Start by providing basic details about your property.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="property-name" className="text-sm font-medium text-foreground">
            Property Name *
          </Label>
          <Input
            id="property-name"
            placeholder="e.g., Riverside Apartments"
            value={data.propertyName}
            onChange={handlePropertyNameChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="property-type" className="text-sm font-medium text-foreground">
              Property Type *
            </Label>
            <select
              id="property-type"
              value={data.propertyType}
              onChange={(e) => handlePropertyTypeChange(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Villa">Villa</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="total-units" className="text-sm font-medium text-foreground">
              Total Units *
            </Label>
            <Input
              id="total-units"
              type="number"
              min="1"
              placeholder="e.g., 12"
              value={data.totalUnits}
              onChange={handleTotalUnitsChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium text-foreground">
            Location *
          </Label>
          <Input
            id="location"
            placeholder="e.g., Nairobi, Westlands"
            value={data.location}
            onChange={handleLocationChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Add details about your property..."
            value={data.description}
            onChange={handleDescriptionChange}
            className="min-h-24 resize-none"
          />
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button onClick={nextStep} disabled={!isComplete} size="lg">
          Continue to Agent Assignment
        </Button>
      </div>
    </div>
  );
}
