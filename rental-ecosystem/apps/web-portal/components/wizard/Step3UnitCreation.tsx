'use client';

import React, { useState } from 'react';
import { usePropertyWizard, WizardUnit } from '@/contexts/PropertyWizardContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Plus, Copy } from 'lucide-react';

export function Step3UnitCreation() {
  const { data, addUnit, removeUnit, nextStep, previousStep, canProceedToNext } =
    usePropertyWizard();
  const [mode, setMode] = useState<'add' | 'duplicate'>('add');
  const [selectedUnitToDuplicate, setSelectedUnitToDuplicate] = useState<string>('');

  const [formData, setFormData] = useState<Omit<WizardUnit, 'id'>>({
    unitNumber: '',
    type: '1BR',
    bedrooms: 1,
    bathrooms: 1,
    rentAmount: 0,
    area: 0,
    furnishing: 'Unfurnished',
    amenities: [],
  });

  const handleAddUnit = () => {
    if (data.units.length < data.totalUnits && formData.unitNumber) {
      const newUnit: WizardUnit = {
        ...formData,
        id: `unit-${Date.now()}`,
      };
      addUnit(newUnit);
      setFormData({
        unitNumber: '',
        type: '1BR',
        bedrooms: 1,
        bathrooms: 1,
        rentAmount: 0,
        area: 0,
        furnishing: 'Unfurnished',
        amenities: [],
      });
    }
  };

  const handleDuplicate = () => {
    if (selectedUnitToDuplicate && data.units.length < data.totalUnits) {
      const unitToDuplicate = data.units.find((u) => u.id === selectedUnitToDuplicate);
      if (unitToDuplicate) {
        const newUnit: WizardUnit = {
          ...unitToDuplicate,
          id: `unit-${Date.now()}`,
          unitNumber: formData.unitNumber || `Unit ${data.units.length + 1}`,
        };
        addUnit(newUnit);
        setFormData({
          ...unitToDuplicate,
          unitNumber: '',
        });
        setSelectedUnitToDuplicate('');
      }
    }
  };

  const isComplete = canProceedToNext();
  const canAddMore = data.units.length < data.totalUnits;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Create Units</h3>
        <p className="text-sm text-foreground/60">
          Add {data.totalUnits} unit{data.totalUnits > 1 ? 's' : ''} to your property. You&apos;ve added{' '}
          <span className="font-medium">{data.units.length}</span> of{' '}
          <span className="font-medium">{data.totalUnits}</span>.
        </p>
      </div>

      {canAddMore && (
        <div className="space-y-4 p-4 bg-accent/30 rounded-lg border border-border">
          <div className="flex gap-2">
            <button
              onClick={() => setMode('add')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                mode === 'add'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground/70 hover:bg-accent'
              }`}
            >
              Add Unit
            </button>
            <button
              onClick={() => setMode('duplicate')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                mode === 'duplicate'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground/70 hover:bg-accent'
              }`}
              disabled={data.units.length === 0}
            >
              Duplicate
            </button>
          </div>

          {mode === 'add' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="unit-number" className="text-xs font-medium">
                    Unit Number *
                  </Label>
                  <Input
                    id="unit-number"
                    placeholder="e.g., 101"
                    value={formData.unitNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, unitNumber: e.target.value })
                    }
                    className="mt-1 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="unit-type" className="text-xs font-medium">
                    Unit Type *
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        type: value as any,
                        bedrooms: parseInt(value.match(/\d+/)?.[0] || '1'),
                      })
                    }
                  >
                    <SelectTrigger id="unit-type" className="mt-1 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Studio">Studio</SelectItem>
                      <SelectItem value="1BR">1 Bedroom</SelectItem>
                      <SelectItem value="2BR">2 Bedrooms</SelectItem>
                      <SelectItem value="3BR">3 Bedrooms</SelectItem>
                      <SelectItem value="4BR+">4+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bedrooms" className="text-xs font-medium">
                    Bedrooms
                  </Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="0"
                    value={formData.bedrooms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bedrooms: parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="bathrooms" className="text-xs font-medium">
                    Bathrooms
                  </Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="0"
                    value={formData.bathrooms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bathrooms: parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="area" className="text-xs font-medium">
                    Area (sqm)
                  </Label>
                  <Input
                    id="area"
                    type="number"
                    min="0"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        area: parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="rent" className="text-xs font-medium">
                    Rent (KES)
                  </Label>
                  <Input
                    id="rent"
                    type="number"
                    min="0"
                    value={formData.rentAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rentAmount: parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1 text-sm"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="furnishing" className="text-xs font-medium">
                  Furnishing
                </Label>
                <Select
                  value={formData.furnishing}
                  onValueChange={(value) =>
                    setFormData({ ...formData, furnishing: value as any })
                  }
                >
                  <SelectTrigger id="furnishing" className="mt-1 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                    <SelectItem value="Furnished">Furnished</SelectItem>
                    <SelectItem value="Semi-Furnished">Semi-Furnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleAddUnit} size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Unit
              </Button>
            </div>
          )}

          {mode === 'duplicate' && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="duplicate-select" className="text-xs font-medium">
                  Select Unit to Duplicate
                </Label>
                <Select value={selectedUnitToDuplicate} onValueChange={setSelectedUnitToDuplicate}>
                  <SelectTrigger id="duplicate-select" className="mt-1 text-sm">
                    <SelectValue placeholder="Choose a unit..." />
                  </SelectTrigger>
                  <SelectContent>
                    {data.units.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id}>
                        {unit.unitNumber} - {unit.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="new-unit-number" className="text-xs font-medium">
                  New Unit Number *
                </Label>
                <Input
                  id="new-unit-number"
                  placeholder="e.g., 102"
                  value={formData.unitNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, unitNumber: e.target.value })
                  }
                  className="mt-1 text-sm"
                />
              </div>

              <Button onClick={handleDuplicate} size="sm" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate Unit
              </Button>
            </div>
          )}
        </div>
      )}

      {data.units.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Units Added</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {data.units.map((unit) => (
              <div
                key={unit.id}
                className="p-3 bg-background border border-border rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">
                    Unit {unit.unitNumber} - {unit.type}
                  </p>
                  <p className="text-xs text-foreground/60">
                    {unit.bedrooms}BR • {unit.bathrooms}BA • {unit.area}sqm • KES {unit.rentAmount.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => removeUnit(unit.id)}
                  className="p-1 hover:bg-destructive/10 rounded text-destructive transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={previousStep}>
          Back
        </Button>
        <Button onClick={nextStep} disabled={!isComplete}>
          Continue to Home IDs
        </Button>
      </div>
    </div>
  );
}
