// User and Auth Types
export type UserRole = 'landlord' | 'agent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  assignedProperties?: string[]; // Property IDs assigned to agent
}

// Property Types
export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  county: string;
  type: 'residential' | 'commercial' | 'mixed';
  totalUnits: number;
  occupiedUnits: number;
  unitsCount: number;
  landlordId: string;
  agentId?: string;
  image?: string;
  createdAt: Date;
}

// Unit Types
export interface Unit {
  id: string;
  homeId: string;
  propertyId: string;
  unitNumber: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  rentAmount: number;
  status: 'available' | 'occupied' | 'maintenance';
  tenant?: string; // Tenant ID
  createdAt: Date;
}

// Tenant Types
export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'active' | 'inactive';
  unitId?: string;
  propertyId: string;
  moveInDate?: Date;
  moveOutDate?: Date;
  rentAmount?: number;
  idNumber?: string;
  createdAt: Date;
}

// Viewing Types
export interface Viewing {
  id: string;
  unitId: string;
  propertyId: string;
  tenantId?: string;
  scheduledDate: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

// Maintenance Types
export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  unitId?: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'completed' | 'on-hold';
  assignedTo?: string;
  createdAt: Date;
  completedAt?: Date;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  conversationId: string;
  createdAt: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  participantNames: string[];
  subject: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
}

// Agent Management Types
export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertiesManaged: string[];
  commissionsEarned: number;
  status: 'active' | 'inactive';
  joinDate: Date;
}

// Occupancy Timeline Types
export interface OccupancyRecord {
  id: string;
  unitId: string;
  propertyId: string;
  tenantId: string;
  tenantName: string;
  moveInDate: Date;
  moveOutDate?: Date;
  rentAmount: number;
}

// Dashboard Stats
export interface DashboardStats {
  totalProperties: number;
  occupancyRate: number;
  monthlyRevenue: number;
  pendingRequests: number;
  activeAgents?: number;
}
