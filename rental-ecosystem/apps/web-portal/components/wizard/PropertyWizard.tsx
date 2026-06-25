'use client';

import React, { useState } from 'react';
import { usePropertyWizard } from '@/contexts/PropertyWizardContext';
import { Step1PropertyInfo } from './Step1PropertyInfo';
import { Step2AgentAssignment } from './Step2AgentAssignment';
import { Step3UnitCreation } from './Step3UnitCreation';
import { Step4HomeIDGeneration } from './Step4HomeIDGeneration';
import { Step5ReviewPublish } from './Step5ReviewPublish';
import { X } from 'lucide-react';

interface PropertyWizardProps {
  onClose?: () => void;
  onPublish?: () => void;
}

const STEPS = [
  { number: 1, label: 'Property Info' },
  { number: 2, label: 'Agent' },
  { number: 3, label: 'Units' },
  { number: 4, label: 'Home IDs' },
  { number: 5, label: 'Review' },
];

export function PropertyWizard({ onClose, onPublish }: PropertyWizardProps) {
  const { currentStep } = usePropertyWizard();
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = () => {
    setIsPublished(true);
    onPublish?.();
    setTimeout(() => {
      onClose?.();
    }, 2000);
  };

  if (isPublished) {
    return (
      <div className="text-center py-12">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Property Published!</h3>
        <p className="text-foreground/60 mb-6">
          Your property is now live and your agent has been notified.
        </p>
        <p className="text-sm text-foreground/50">Closing in a moment...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Add New Property</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-accent rounded transition-all text-foreground/60 hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="py-4">
        <div className="flex items-center gap-2 mb-4">
          {STEPS.map((step) => (
            <React.Fragment key={step.number}>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm transition-all ${
                  currentStep >= step.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-foreground/60'
                }`}
              >
                {step.number}
              </div>
              {step.number < STEPS.length && (
                <div
                  className={`flex-1 h-1 rounded-full transition-all ${
                    currentStep > step.number ? 'bg-primary' : 'bg-accent'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="text-xs text-foreground/60 font-medium">
          Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].label}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {currentStep === 1 && <Step1PropertyInfo />}
        {currentStep === 2 && <Step2AgentAssignment />}
        {currentStep === 3 && <Step3UnitCreation />}
        {currentStep === 4 && <Step4HomeIDGeneration />}
        {currentStep === 5 && <Step5ReviewPublish onPublish={handlePublish} />}
      </div>
    </div>
  );
}
