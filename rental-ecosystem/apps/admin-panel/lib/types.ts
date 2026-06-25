// User Types
export type UserRole = 'tenant' | 'landlord' | 'agent';
export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'review';
export type AccountStatus = 'active' | 'suspended' | 'inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  verificationStatus: VerificationStatus;
  accountStatus: AccountStatus;
  createdAt: Date;
  idType: 'national_id' | 'passport' | 'driver_license';
  idNumber: string;
  profileImage?: string;
}

export interface Landlord extends User {
  role: 'landlord';
  companyName?: string;
  properties: string[]; // Property IDs
  verificationDocuments: VerificationDocument[];
}

export interface Agent extends User {
  role: 'agent';
  agencyName: string;
  licenseNumber: string;
  properties: string[]; // Property IDs
  verificationDocuments: VerificationDocument[];
}

export interface Tenant extends User {
  role: 'tenant';
  tenancies: string[]; // Tenancy IDs
}

// Property Types
export type PropertyStatus = 'active' | 'suspended' | 'flagged' | 'inactive';

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  county: string;
  landmarkNumber: string;
  landlordId: string;
  agentId?: string;
  units: Unit[];
  totalUnits: number;
  occupiedUnits: number;
  occupancyPercentage: number;
  status: PropertyStatus;
  createdAt: Date;
  amenities: string[];
  images: string[];
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  type: 'studio' | 'one_bedroom' | 'two_bedroom' | 'three_bedroom';
  monthlyRent: number;
  status: 'available' | 'occupied' | 'maintenance';
  tenantId?: string;
}

// Tenancy Types
export type TenancyStatus = 'active' | 'ended' | 'terminated' | 'dispute';

export interface Tenancy {
  id: string;
  tenantId: string;
  propertyId: string;
  unitId: string;
  startDate: Date;
  endDate?: Date;
  monthlyRent: number;
  depositAmount: number;
  status: TenancyStatus;
  createdAt: Date;
}

// Verification Types
export interface VerificationDocument {
  id: string;
  type: 'id' | 'kyc' | 'utility_bill' | 'business_license';
  url: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  notes?: string;
}

export interface VerificationReview {
  id: string;
  userId: string;
  documents: VerificationDocument[];
  status: VerificationStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  adminNotes?: string;
  rejectionReason?: string;
  verificationHistory: VerificationHistory[];
}

export interface VerificationHistory {
  id: string;
  timestamp: Date;
  action: 'submitted' | 'approved' | 'rejected' | 'requested_docs' | 'under_review';
  performedBy?: string;
  notes?: string;
}

// Compliance Types
export type AuditAction =
  | 'user_created'
  | 'user_updated'
  | 'user_suspended'
  | 'user_reactivated'
  | 'property_created'
  | 'property_updated'
  | 'property_suspended'
  | 'verification_submitted'
  | 'verification_approved'
  | 'verification_rejected'
  | 'tenancy_created'
  | 'tenancy_ended'
  | 'dispute_opened'
  | 'dispute_resolved'
  | 'login'
  | 'logout';

export interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  userType: UserRole;
  action: AuditAction;
  entityType: 'user' | 'property' | 'tenancy' | 'verification' | 'dispute';
  entityId: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  status: 'success' | 'failure';
}

// Dispute Types
export type DisputeStatus = 'open' | 'in_review' | 'resolved' | 'escalated';

export interface Dispute {
  id: string;
  tenantId: string;
  propertyId: string;
  unitId: string;
  title: string;
  description: string;
  reportedDate: Date;
  status: DisputeStatus;
  severity: 'low' | 'medium' | 'high';
  resolution?: string;
  resolvedAt?: Date;
  resolvedBy?: string;
  updates: DisputeUpdate[];
}

export interface DisputeUpdate {
  id: string;
  timestamp: Date;
  updatedBy: string;
  message: string;
  status: DisputeStatus;
}

// Activity Feed Types
export type ActivityEventType =
  | 'user_registered'
  | 'verification_approved'
  | 'property_created'
  | 'tenancy_activated'
  | 'dispute_opened'
  | 'user_suspended'
  | 'property_flagged';

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  title: string;
  description: string;
  timestamp: Date;
  relatedUserId?: string;
  relatedPropertyId?: string;
  relatedEntityId?: string;
  icon?: string;
}

// Dashboard Types
export interface DashboardKPIs {
  totalUsers: number;
  totalProperties: number;
  totalUnits: number;
  activeTenancies: number;
  pendingVerifications: number;
  openDisputes: number;
}

export interface UserGrowthData {
  month: string;
  tenants: number;
  landlords: number;
  agents: number;
}

export interface PropertyGrowthData {
  month: string;
  properties: number;
  units: number;
}

export interface VerificationTrendData {
  month: string;
  submitted: number;
  approved: number;
  rejected: number;
}
