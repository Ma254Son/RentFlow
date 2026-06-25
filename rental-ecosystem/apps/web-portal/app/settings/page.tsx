'use client';

import React, { useState } from 'react';
import { Save, Settings as SettingsIcon, Bell, Lock, Eye } from 'lucide-react';
import { MainLayout } from '@/components/MainLayout';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security'>('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account and preferences</p>
        </div>

        {/* Settings Container */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-border flex">
            {[
              { id: 'general' as const, label: 'General', icon: SettingsIcon },
              { id: 'notifications' as const, label: 'Notifications', icon: Bell },
              { id: 'security' as const, label: 'Security', icon: Lock },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser.name}
                    className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue={currentUser.email}
                    className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={currentUser.phone || ''}
                    className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Account Role</label>
                  <div className="px-4 py-2 bg-accent rounded-lg border border-border text-muted-foreground">
                    {currentUser.role === 'landlord' ? 'Property Owner (Landlord)' : 'Property Agent'}
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                  {saved && (
                    <p className="text-sm text-green-600 mt-2">✓ Changes saved successfully</p>
                  )}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'New Maintenance Requests', description: 'Get notified when a maintenance request is submitted' },
                      { label: 'Tenant Applications', description: 'Receive alerts for new tenant applications' },
                      { label: 'Rent Payments', description: 'Notifications about rent payment status' },
                      { label: 'Property Updates', description: 'Updates about your property listings' },
                      { label: 'Agent Communications', description: 'Messages from your agents' },
                    ].map((item) => (
                      <label key={item.label} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer">
                        <input type="checkbox" defaultChecked className="mt-1" />
                        <div>
                          <p className="font-medium text-sm">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <Save className="w-5 h-5" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Password & Security</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Current Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
                  <div className="space-y-2">
                    <div className="p-4 bg-accent rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Eye className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-xs text-muted-foreground">Last active: just now</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-green-600">Active</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <Save className="w-5 h-5" />
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
