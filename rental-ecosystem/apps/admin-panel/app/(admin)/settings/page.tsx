'use client';

import { useState } from 'react';
import { Save, Bell, Lock, Database, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    appName: 'RentFlow Admin',
    timeZone: 'UTC+3 (EAT)',
    notifications: {
      emailAlerts: true,
      verificationReminders: true,
      disputeNotifications: true,
      auditLogEmails: false,
    },
    verification: {
      autoApprovalThreshold: 95,
      requireIdProof: true,
      requireKycproof: true,
      documentExpiryDays: 365,
    },
  });

  const tabs = [
    { label: 'General', id: 'general' },
    { label: 'Notifications', id: 'notifications' },
    { label: 'Verification Rules', id: 'verification' },
    { label: 'Security', id: 'security' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage system configuration and preferences</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="col-span-1">
          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="col-span-3">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-foreground">General Settings</h2>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Application Name</label>
                <input
                  type="text"
                  value={settings.appName}
                  onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
                  className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Time Zone</label>
                <select className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground">
                  <option>{settings.timeZone}</option>
                  <option>UTC (GMT)</option>
                  <option>UTC+1</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button className="px-4 py-2 rounded-lg border border-border text-foreground font-medium transition-colors hover:bg-muted">
                  Cancel
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90">
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
              
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50">
                    <label className="text-sm font-medium text-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [key]: e.target.checked,
                          },
                        })
                      }
                      className="h-4 w-4 rounded border-border"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button className="px-4 py-2 rounded-lg border border-border text-foreground font-medium transition-colors hover:bg-muted">
                  Cancel
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90">
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Verification Rules */}
          {activeTab === 'verification' && (
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Verification Rules</h2>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Auto-Approval Threshold (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.verification.autoApprovalThreshold}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      verification: {
                        ...settings.verification,
                        autoApprovalThreshold: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Document Expiry Period (Days)</label>
                <input
                  type="number"
                  value={settings.verification.documentExpiryDays}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      verification: {
                        ...settings.verification,
                        documentExpiryDays: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50">
                  <label className="text-sm font-medium text-foreground">Require ID Proof</label>
                  <input
                    type="checkbox"
                    checked={settings.verification.requireIdProof}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        verification: {
                          ...settings.verification,
                          requireIdProof: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-border"
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50">
                  <label className="text-sm font-medium text-foreground">Require KYC Proof</label>
                  <input
                    type="checkbox"
                    checked={settings.verification.requireKycproof}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        verification: {
                          ...settings.verification,
                          requireKycproof: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-border"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button className="px-4 py-2 rounded-lg border border-border text-foreground font-medium transition-colors hover:bg-muted">
                  Cancel
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90">
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Security</h2>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">Change Password</p>
                      <p className="text-xs text-muted-foreground">Update your account password</p>
                    </div>
                  </div>
                  <span className="text-muted-foreground">&rarr;</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-muted-foreground" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">Data Privacy</p>
                      <p className="text-xs text-muted-foreground">Manage your data preferences</p>
                    </div>
                  </div>
                  <span className="text-muted-foreground">&rarr;</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-red-500/10 hover:border-red-500/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <LogOut className="h-5 w-5 text-red-500" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-red-600 dark:text-red-400">Logout All Sessions</p>
                      <p className="text-xs text-muted-foreground">Sign out all active sessions</p>
                    </div>
                  </div>
                  <span className="text-muted-foreground">&rarr;</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
