'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, X, Clock } from 'lucide-react';
import { StatusBadge } from '@/components/common/status-badge';
import { generateAllMockData } from '@/lib/mock-data';
import { Landlord, Agent } from '@/lib/types';

interface ReviewPageProps {
  params: {
    id: string;
  };
}

export default function VerificationReviewPage({ params }: ReviewPageProps) {
  const { landlords, agents } = generateAllMockData();
  const user = [...landlords, ...agents].find((u) => u.id === params.id) as Landlord | Agent | undefined;
  const [adminNotes, setAdminNotes] = useState('');

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">User not found</p>
        <Link href="/verification/landlords" className="mt-4 text-primary hover:text-primary/80">
          Back to Verification
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href={user.role === 'landlord' ? '/verification/landlords' : '/verification/agents'}
          className="rounded-lg p-2 transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
          <p className="mt-1 text-muted-foreground capitalize">{user.role} Verification</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content - Left & Center */}
        <div className="col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="text-foreground font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-foreground font-medium">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID Type</p>
                  <p className="text-foreground font-medium capitalize">{user.idType.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID Number</p>
                  <p className="text-foreground font-mono">{user.idNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Registration Date</p>
                  <p className="text-foreground font-medium">{user.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {user.role === 'landlord' && 'companyName' in user && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Company Information</h2>
              <div>
                <p className="text-sm text-muted-foreground">Company Name</p>
                <p className="text-foreground font-medium">{(user as Landlord).companyName || 'N/A'}</p>
              </div>
            </div>
          )}

          {user.role === 'agent' && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Agency Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Agency Name</p>
                  <p className="text-foreground font-medium">{(user as Agent).agencyName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">License Number</p>
                  <p className="text-foreground font-mono">{(user as Agent).licenseNumber}</p>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Verification Documents</h2>
            <div className="space-y-2">
              {user.verificationDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                  <div className="flex-1">
                    <p className="font-medium text-foreground capitalize">{doc.type.replace('_', ' ')}</p>
                    <p className="text-sm text-muted-foreground">Uploaded {doc.uploadedAt.toLocaleDateString()}</p>
                  </div>
                  <StatusBadge status={doc.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Verification History */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Verification History</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-lg border border-border/50 p-4">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Documents Submitted</p>
                  <p className="text-sm text-muted-foreground">{user.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Right */}
        <div className="space-y-6">
          {/* Status */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase">Verification Status</h3>
            <StatusBadge status={user.verificationStatus} className="w-full" />
          </div>

          {/* Admin Notes */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Admin Notes</h3>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add notes about this verification..."
              className="w-full h-32 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700">
              <CheckCircle2 className="h-4 w-4" />
              Approve
            </button>
            <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">
              <X className="h-4 w-4" />
              Reject
            </button>
            <button className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              Request More Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
