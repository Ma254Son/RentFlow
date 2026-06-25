'use client';

import React, { useState } from 'react';
import { usePropertyWizard } from '@/contexts/PropertyWizardContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockAgents } from '@/lib/mock-data';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Step2AgentAssignment() {
  const { data, updateData, nextStep, previousStep, canProceedToNext } = usePropertyWizard();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = mockAgents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAgent = (agentId: string, agentName: string) => {
    updateData({
      assignedAgentId: agentId,
      assignedAgentName: agentName,
    });
  };

  const isComplete = canProceedToNext();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Assign an Agent</h3>
        <p className="text-sm text-foreground/60">
          Select an agent to manage this property.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="agent-search" className="text-sm font-medium">
            Search Agents
          </Label>
          <Input
            id="agent-search"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => handleSelectAgent(agent.id, agent.name)}
                className={cn(
                  'w-full p-4 rounded-lg border-2 transition-all text-left',
                  data.assignedAgentId === agent.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                    {agent.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{agent.name}</p>
                    <p className="text-sm text-foreground/60 truncate">{agent.email}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-foreground/50">
                      <span>📞 {agent.phone}</span>
                      <span>•</span>
                      <span>{agent.propertiesManaged} properties</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {data.assignedAgentId === agent.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-8 text-foreground/60">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No agents found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={previousStep}>
          Back
        </Button>
        <Button onClick={nextStep} disabled={!isComplete}>
          Continue to Units
        </Button>
      </div>
    </div>
  );
}
