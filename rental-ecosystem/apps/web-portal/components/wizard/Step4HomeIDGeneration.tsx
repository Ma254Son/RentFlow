'use client';

import React, { useEffect, useState } from 'react';
import { usePropertyWizard } from '@/contexts/PropertyWizardContext';
import { Button } from '@/components/ui/button';
import { Copy, Download, Printer, RefreshCw } from 'lucide-react';

export function Step4HomeIDGeneration() {
  const { data, generateHomeIds, nextStep, previousStep, canProceedToNext } =
    usePropertyWizard();
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    if (data.homeIds && Object.keys(data.homeIds).length === 0) {
      generateHomeIds();
    }
  }, []);

  const homeIdList = data.units.map((unit) => ({
    unit,
    homeId: data.homeIds[unit.id],
  }));

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 2000);
  };

  const handleCopyAll = () => {
    const text = homeIdList.map((item) => `${item.unit.unitNumber}: ${item.homeId}`).join('\n');
    navigator.clipboard.writeText(text);
    showNotification('Home IDs copied to clipboard!');
  };

  const handleCopyOne = (homeId: string) => {
    navigator.clipboard.writeText(homeId);
    showNotification('Home ID copied!');
  };

  const handleRegenerateIds = () => {
    generateHomeIds();
    showNotification('Home IDs regenerated!');
  };

  const handleDownload = () => {
    const csvContent = [
      ['Unit Number', 'Unit Type', 'Bedrooms', 'Bathrooms', 'Rent (KES)', 'Home ID'],
      ...homeIdList.map((item) => [
        item.unit.unitNumber,
        item.unit.type,
        item.unit.bedrooms,
        item.unit.bathrooms,
        item.unit.rentAmount,
        item.homeId,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${data.propertyName}-units-${Date.now()}.csv`);
    link.click();
    showNotification('Units downloaded as CSV!');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=400,width=600');
    if (printWindow) {
      const htmlContent = `
        <html>
          <head>
            <title>${data.propertyName} - Home IDs</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #333; }
              table { border-collapse: collapse; width: 100%; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f5f5f5; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>${data.propertyName}</h1>
            <p><strong>Location:</strong> ${data.location}</p>
            <table>
              <tr>
                <th>Unit #</th>
                <th>Type</th>
                <th>BR</th>
                <th>BA</th>
                <th>Rent (KES)</th>
                <th>Home ID</th>
              </tr>
              ${homeIdList
                .map(
                  (item) => `
                <tr>
                  <td>${item.unit.unitNumber}</td>
                  <td>${item.unit.type}</td>
                  <td>${item.unit.bedrooms}</td>
                  <td>${item.unit.bathrooms}</td>
                  <td>${item.unit.rentAmount.toLocaleString()}</td>
                  <td><strong>${item.homeId}</strong></td>
                </tr>
              `
                )
                .join('')}
            </table>
          </body>
        </html>
      `;
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const isComplete = canProceedToNext();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Home ID Generation</h3>
        <p className="text-sm text-foreground/60">
          Unique identifiers for each unit. These can be used for tracking and tenant
          identification.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={handleCopyAll}>
          <Copy className="w-4 h-4 mr-2" />
          Copy All
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="w-4 h-4 mr-2" />
          Download CSV
        </Button>
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="w-4 h-4 mr-2" />
          Print
        </Button>
        <Button variant="outline" size="sm" onClick={handleRegenerateIds}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Regenerate
        </Button>
      </div>

      {notification && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-900">
          {notification}
        </div>
      )}

      <div className="space-y-3 max-h-72 overflow-y-auto">
        {homeIdList.map((item) => (
          <div
            key={item.unit.id}
            className="p-4 bg-accent/30 rounded-lg border border-border flex items-center justify-between hover:bg-accent/50 transition-all"
          >
            <div>
              <p className="font-medium text-foreground">Unit {item.unit.unitNumber}</p>
              <p className="text-xs text-foreground/60">
                {item.unit.type} • {item.unit.bedrooms}BR • {item.unit.bathrooms}BA •{' '}
                {item.unit.area}sqm
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-mono font-semibold text-foreground text-lg">
                  {item.homeId}
                </p>
              </div>
              <button
                onClick={() => handleCopyOne(item.homeId)}
                className="p-2 hover:bg-primary/10 rounded transition-all"
                title="Copy Home ID"
              >
                <Copy className="w-4 h-4 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>💡 Tip:</strong> Home IDs are unique identifiers for tenant tracking and
          property management. Keep these safe!
        </p>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={previousStep}>
          Back
        </Button>
        <Button onClick={nextStep} disabled={!isComplete}>
          Review & Publish
        </Button>
      </div>
    </div>
  );
}
