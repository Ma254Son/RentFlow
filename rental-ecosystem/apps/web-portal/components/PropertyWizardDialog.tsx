'use client';

import React, { useState } from 'react';
import { PropertyWizardProvider } from '@/contexts/PropertyWizardContext';
import { PropertyWizard } from '@/components/wizard/PropertyWizard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PropertyWizardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublish?: (wizardData: any) => void;
}

export function PropertyWizardDialog({
  open,
  onOpenChange,
  onPublish,
}: PropertyWizardDialogProps) {
  const handlePublish = () => {
    onPublish?.({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <PropertyWizardProvider>
          <PropertyWizard
            onClose={() => onOpenChange(false)}
            onPublish={handlePublish}
          />
        </PropertyWizardProvider>
      </DialogContent>
    </Dialog>
  );
}
