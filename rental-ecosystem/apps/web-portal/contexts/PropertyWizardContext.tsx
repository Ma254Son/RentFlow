'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface WizardUnit {
  id: string;
  unitNumber: string;
  type: 'Studio' | '1BR' | '2BR' | '3BR' | '4BR+';
  bedrooms: number;
  bathrooms: number;
  rentAmount: number;
  area: number;
  furnishing: 'Furnished' | 'Unfurnished' | 'Semi-Furnished';
  amenities: string[];
}

export interface WizardData {
  // Step 1: Property Info
  propertyName: string;
  propertyType: 'Apartment' | 'House' | 'Townhouse' | 'Villa' | 'Commercial';
  location: string;
  description: string;
  totalUnits: number;
  
  // Step 2: Agent Assignment
  assignedAgentId: string;
  assignedAgentName: string;
  
  // Step 3: Units
  units: WizardUnit[];
  
  // Step 4: Home IDs (auto-generated)
  homeIds: Record<string, string>;
  
  // Step 5: Review
  isPublished: boolean;
}

interface PropertyWizardContextType {
  data: WizardData;
  currentStep: number;
  updateData: (updates: Partial<WizardData>) => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  addUnit: (unit: WizardUnit) => void;
  removeUnit: (unitId: string) => void;
  updateUnit: (unitId: string, updates: Partial<WizardUnit>) => void;
  generateHomeIds: () => void;
  reset: () => void;
  canProceedToNext: () => boolean;
}

const defaultData: WizardData = {
  propertyName: '',
  propertyType: 'Apartment',
  location: '',
  description: '',
  totalUnits: 0,
  assignedAgentId: '',
  assignedAgentName: '',
  units: [],
  homeIds: {},
  isPublished: false,
};

const PropertyWizardContext = createContext<PropertyWizardContextType | undefined>(undefined);

export function PropertyWizardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<WizardData>(defaultData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateData = useCallback((updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 5) {
      setCurrentStep(step);
    }
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const addUnit = useCallback((unit: WizardUnit) => {
    setData((prev) => ({
      ...prev,
      units: [...prev.units, unit],
    }));
  }, []);

  const removeUnit = useCallback((unitId: string) => {
    setData((prev) => ({
      ...prev,
      units: prev.units.filter((u) => u.id !== unitId),
    }));
  }, []);

  const updateUnit = useCallback((unitId: string, updates: Partial<WizardUnit>) => {
    setData((prev) => ({
      ...prev,
      units: prev.units.map((u) => (u.id === unitId ? { ...u, ...updates } : u)),
    }));
  }, []);

  const generateHomeIds = useCallback(() => {
    const homeIds: Record<string, string> = {};
    const prefix = data.propertyName.slice(0, 3).toUpperCase();
    
    data.units.forEach((unit, index) => {
      const homeId = `${prefix}-${String(index + 1).padStart(3, '0')}`;
      homeIds[unit.id] = homeId;
    });

    setData((prev) => ({
      ...prev,
      homeIds,
    }));
  }, [data.propertyName, data.units]);

  const canProceedToNext = useCallback((): boolean => {
    switch (currentStep) {
      case 1:
        return !!(data.propertyName && data.location && data.totalUnits > 0);
      case 2:
        return !!(data.assignedAgentId);
      case 3:
        return data.units.length > 0 && data.units.length <= data.totalUnits;
      case 4:
        return Object.keys(data.homeIds).length === data.units.length;
      case 5:
        return true;
      default:
        return false;
    }
  }, [currentStep, data]);

  const reset = useCallback(() => {
    setData(defaultData);
    setCurrentStep(1);
  }, []);

  const value: PropertyWizardContextType = {
    data,
    currentStep,
    updateData,
    goToStep,
    nextStep,
    previousStep,
    addUnit,
    removeUnit,
    updateUnit,
    generateHomeIds,
    reset,
    canProceedToNext,
  };

  return (
    <PropertyWizardContext.Provider value={value}>
      {children}
    </PropertyWizardContext.Provider>
  );
}

export function usePropertyWizard() {
  const context = useContext(PropertyWizardContext);
  if (!context) {
    throw new Error('usePropertyWizard must be used within PropertyWizardProvider');
  }
  return context;
}
