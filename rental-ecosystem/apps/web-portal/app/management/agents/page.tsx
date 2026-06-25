'use client';

import React from 'react';
import { Plus, UserCheck, TrendingUp, Building2, Calendar } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { mockAgents } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AgentsPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Agents</h1>
            <p className="text-muted-foreground mt-2">Manage your property management agents</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            <Plus className="w-5 h-5" />
            Add Agent
          </button>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground">{agent.email}</p>
                </div>
                <span
                  className={cn(
                    'inline-flex px-2.5 py-1 rounded-full text-xs font-medium',
                    agent.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  )}
                >
                  {agent.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Contact */}
              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground">{agent.phone}</p>
              </div>

              {/* Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Properties Managed</span>
                  </div>
                  <span className="font-semibold">{agent.propertiesManaged.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Commissions Earned</span>
                  </div>
                  <span className="font-semibold text-green-600">
                    KES {agent.commissionsEarned.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Joined</span>
                  </div>
                  <span className="text-sm">
                    {new Date(agent.joinDate).toLocaleDateString('en-KE', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg font-medium text-sm transition-colors">
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium text-sm transition-colors">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold mb-6">Agent Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-bold">{mockAgents.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Properties Managed</p>
                <p className="text-2xl font-bold">
                  {mockAgents.reduce((sum, a) => sum + a.propertiesManaged.length, 0)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Commissions</p>
                <p className="text-2xl font-bold">
                  KES {mockAgents.reduce((sum, a) => sum + a.commissionsEarned, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
