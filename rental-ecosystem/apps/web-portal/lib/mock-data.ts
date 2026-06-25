import {
  User,
  Property,
  Unit,
  Tenant,
  Viewing,
  MaintenanceRequest,
  Conversation,
  Message,
  Agent,
  OccupancyRecord,
} from './types';

// Mock Users
export const mockLandlord: User = {
  id: 'user-landlord-1',
  name: 'James Kipchoge',
  email: 'james@rentflow.co.ke',
  role: 'landlord',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
  phone: '+254 701 234 567',
};

export const mockAgent: User = {
  id: 'user-agent-1',
  name: 'Sarah Omondi',
  email: 'sarah@rentflow.co.ke',
  role: 'agent',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  phone: '+254 722 987 654',
  assignedProperties: ['prop-1', 'prop-2'],
};

// Mock Properties
export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    name: 'Westlands Apartment Complex',
    address: '123 Limuru Road',
    city: 'Nairobi',
    county: 'Nairobi',
    type: 'residential',
    totalUnits: 12,
    occupiedUnits: 10,
    unitsCount: 12,
    landlordId: 'user-landlord-1',
    agentId: 'user-agent-1',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a9f4648e5?w=500&h=300&fit=crop',
    createdAt: new Date('2023-01-15'),
  },
  {
    id: 'prop-2',
    name: 'Karen Townhouses',
    address: '456 Karen Road',
    city: 'Nairobi',
    county: 'Nairobi',
    type: 'residential',
    totalUnits: 8,
    occupiedUnits: 7,
    unitsCount: 8,
    landlordId: 'user-landlord-1',
    agentId: 'user-agent-1',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
    createdAt: new Date('2023-02-20'),
  },
  {
    id: 'prop-3',
    name: 'Upper Hill Commercial Space',
    address: '789 Upper Hill Road',
    city: 'Nairobi',
    county: 'Nairobi',
    type: 'commercial',
    totalUnits: 5,
    occupiedUnits: 4,
    unitsCount: 5,
    landlordId: 'user-landlord-1',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop',
    createdAt: new Date('2023-03-10'),
  },
  {
    id: 'prop-4',
    name: 'Kilimani Residential Units',
    address: '321 Kilimani Avenue',
    city: 'Nairobi',
    county: 'Nairobi',
    type: 'residential',
    totalUnits: 15,
    occupiedUnits: 13,
    unitsCount: 15,
    landlordId: 'user-landlord-1',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=300&fit=crop',
    createdAt: new Date('2023-04-05'),
  },
];

// Mock Units
export const mockUnits: Unit[] = [
  {
    id: 'unit-1',
    homeId: 'HOME-001',
    propertyId: 'prop-1',
    unitNumber: '101',
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['WiFi', 'Parking', 'Security'],
    rentAmount: 45000,
    status: 'occupied',
    tenant: 'tenant-1',
    createdAt: new Date('2023-01-20'),
  },
  {
    id: 'unit-2',
    homeId: 'HOME-002',
    propertyId: 'prop-1',
    unitNumber: '102',
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['WiFi', 'Parking', 'Gym', 'Security'],
    rentAmount: 65000,
    status: 'occupied',
    tenant: 'tenant-2',
    createdAt: new Date('2023-01-20'),
  },
  {
    id: 'unit-3',
    homeId: 'HOME-003',
    propertyId: 'prop-1',
    unitNumber: '103',
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['Parking', 'Security'],
    rentAmount: 35000,
    status: 'available',
    createdAt: new Date('2023-01-20'),
  },
  {
    id: 'unit-4',
    homeId: 'HOME-004',
    propertyId: 'prop-2',
    unitNumber: 'A1',
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['Garden', 'Parking', 'Security'],
    rentAmount: 75000,
    status: 'occupied',
    tenant: 'tenant-3',
    createdAt: new Date('2023-02-25'),
  },
  {
    id: 'unit-5',
    homeId: 'HOME-005',
    propertyId: 'prop-2',
    unitNumber: 'A2',
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['Parking', 'Security'],
    rentAmount: 50000,
    status: 'maintenance',
    createdAt: new Date('2023-02-25'),
  },
  {
    id: 'unit-6',
    homeId: 'HOME-006',
    propertyId: 'prop-3',
    unitNumber: 'Office-1',
    bedrooms: 0,
    bathrooms: 1,
    amenities: ['WiFi', 'Parking', 'Security'],
    rentAmount: 150000,
    status: 'occupied',
    tenant: 'tenant-4',
    createdAt: new Date('2023-03-15'),
  },
];

// Mock Tenants
export const mockTenants: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'Alice Mwangi',
    email: 'alice@email.com',
    phone: '+254 712 345 678',
    status: 'active',
    unitId: 'unit-1',
    propertyId: 'prop-1',
    moveInDate: new Date('2023-05-01'),
    rentAmount: 45000,
    idNumber: '123456789',
    createdAt: new Date('2023-04-25'),
  },
  {
    id: 'tenant-2',
    name: 'David Kamau',
    email: 'david@email.com',
    phone: '+254 723 456 789',
    status: 'active',
    unitId: 'unit-2',
    propertyId: 'prop-1',
    moveInDate: new Date('2023-06-15'),
    rentAmount: 65000,
    idNumber: '987654321',
    createdAt: new Date('2023-06-10'),
  },
  {
    id: 'tenant-3',
    name: 'Grace Kipchoge',
    email: 'grace@email.com',
    phone: '+254 734 567 890',
    status: 'pending',
    unitId: 'unit-4',
    propertyId: 'prop-2',
    moveInDate: new Date('2024-07-01'),
    rentAmount: 75000,
    createdAt: new Date('2024-06-20'),
  },
  {
    id: 'tenant-4',
    name: 'Michael Kimani',
    email: 'michael@email.com',
    phone: '+254 745 678 901',
    status: 'active',
    unitId: 'unit-6',
    propertyId: 'prop-3',
    moveInDate: new Date('2024-01-01'),
    rentAmount: 150000,
    idNumber: '456789123',
    createdAt: new Date('2023-12-15'),
  },
];

// Mock Viewings
export const mockViewings: Viewing[] = [
  {
    id: 'viewing-1',
    unitId: 'unit-3',
    propertyId: 'prop-1',
    tenantId: 'tenant-5',
    scheduledDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    status: 'scheduled',
    notes: 'Potential tenant interested in 2-bed unit',
    createdAt: new Date(),
  },
  {
    id: 'viewing-2',
    unitId: 'unit-5',
    propertyId: 'prop-2',
    scheduledDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    status: 'scheduled',
    notes: 'Unit maintenance viewing after repair completion',
    createdAt: new Date(),
  },
];

// Mock Maintenance Requests
export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: 'maint-1',
    propertyId: 'prop-1',
    unitId: 'unit-1',
    title: 'Leaky Kitchen Faucet',
    description: 'Kitchen sink faucet is leaking water',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'user-agent-1',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  {
    id: 'maint-2',
    propertyId: 'prop-1',
    unitId: 'unit-2',
    title: 'AC Unit Not Cooling',
    description: 'Air conditioning not reaching desired temperature',
    priority: 'high',
    status: 'open',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: 'maint-3',
    propertyId: 'prop-2',
    unitId: 'unit-5',
    title: 'Bathroom Tile Repair',
    description: 'Multiple tiles cracked in bathroom',
    priority: 'medium',
    status: 'completed',
    assignedTo: 'user-agent-1',
    completedAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
  },
  {
    id: 'maint-4',
    propertyId: 'prop-1',
    title: 'Building Entrance Door Lock',
    description: 'Main building entrance lock needs replacement',
    priority: 'urgent',
    status: 'open',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: 'maint-5',
    propertyId: 'prop-3',
    unitId: 'unit-6',
    title: 'Light Fixture Replacement',
    description: 'Office lighting fixture not working',
    priority: 'low',
    status: 'on-hold',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
  },
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: ['user-landlord-1', 'user-agent-1'],
    participantNames: ['James Kipchoge', 'Sarah Omondi'],
    subject: 'Westlands Property Updates',
    unreadCount: 2,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
  },
  {
    id: 'conv-2',
    participants: ['user-landlord-1', 'tenant-1'],
    participantNames: ['James Kipchoge', 'Alice Mwangi'],
    subject: 'Unit 101 Maintenance Request',
    unreadCount: 0,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
  },
  {
    id: 'conv-3',
    participants: ['user-agent-1', 'tenant-3'],
    participantNames: ['Sarah Omondi', 'Grace Kipchoge'],
    subject: 'Move-in Arrangement - Unit A1',
    unreadCount: 1,
    createdAt: new Date(),
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'user-agent-1',
    senderName: 'Sarah Omondi',
    content: 'Hi James, the kitchen faucet repair is progressing well. Should be done by end of week.',
    conversationId: 'conv-1',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    read: true,
  },
  {
    id: 'msg-2',
    senderId: 'user-landlord-1',
    senderName: 'James Kipchoge',
    content: 'Thanks Sarah, please keep me updated on the AC unit as well.',
    conversationId: 'conv-1',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    read: true,
  },
  {
    id: 'msg-3',
    senderId: 'user-agent-1',
    senderName: 'Sarah Omondi',
    content: 'Will do! I\'ve already contacted the technician.',
    conversationId: 'conv-1',
    createdAt: new Date(),
    read: false,
  },
  {
    id: 'msg-4',
    senderId: 'tenant-1',
    senderName: 'Alice Mwangi',
    content: 'Good morning, the kitchen faucet is still dripping. Can someone look at it?',
    conversationId: 'conv-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 8)),
    read: true,
  },
  {
    id: 'msg-5',
    senderId: 'user-agent-1',
    senderName: 'Sarah Omondi',
    content: 'Hi Grace, welcome! Let\'s arrange your move-in for July 1st. What time works best for you?',
    conversationId: 'conv-3',
    createdAt: new Date(),
    read: false,
  },
];

// Mock Agents
export const mockAgents: Agent[] = [
  {
    id: 'user-agent-1',
    name: 'Sarah Omondi',
    email: 'sarah@rentflow.co.ke',
    phone: '+254 722 987 654',
    propertiesManaged: ['prop-1', 'prop-2'],
    commissionsEarned: 125000,
    status: 'active',
    joinDate: new Date('2023-01-01'),
  },
  {
    id: 'agent-2',
    name: 'Peter Otieno',
    email: 'peter@rentflow.co.ke',
    phone: '+254 700 111 222',
    propertiesManaged: ['prop-3', 'prop-4'],
    commissionsEarned: 85000,
    status: 'active',
    joinDate: new Date('2023-06-15'),
  },
  {
    id: 'agent-3',
    name: 'Monica Kariuki',
    email: 'monica@rentflow.co.ke',
    phone: '+254 711 333 444',
    propertiesManaged: [],
    commissionsEarned: 0,
    status: 'inactive',
    joinDate: new Date('2024-01-10'),
  },
];

// Mock Occupancy Records
export const mockOccupancyRecords: OccupancyRecord[] = [
  {
    id: 'occ-1',
    unitId: 'unit-1',
    propertyId: 'prop-1',
    tenantId: 'tenant-1',
    tenantName: 'Alice Mwangi',
    moveInDate: new Date('2023-05-01'),
    rentAmount: 45000,
  },
  {
    id: 'occ-2',
    unitId: 'unit-2',
    propertyId: 'prop-1',
    tenantId: 'tenant-2',
    tenantName: 'David Kamau',
    moveInDate: new Date('2023-06-15'),
    rentAmount: 65000,
  },
  {
    id: 'occ-3',
    unitId: 'unit-4',
    propertyId: 'prop-2',
    tenantId: 'tenant-3',
    tenantName: 'Grace Kipchoge',
    moveInDate: new Date('2024-07-01'),
    rentAmount: 75000,
  },
];

// Helper Functions
export function getPropertiesForUser(userId: string, userRole: string): Property[] {
  if (userRole === 'landlord') {
    return mockProperties.filter((p) => p.landlordId === userId);
  } else if (userRole === 'agent') {
    const agent = mockAgents.find((a) => a.id === userId);
    return mockProperties.filter((p) => agent?.propertiesManaged.includes(p.id));
  }
  return [];
}

export function getUnitsForProperty(propertyId: string): Unit[] {
  return mockUnits.filter((u) => u.propertyId === propertyId);
}

export function getTenantById(tenantId: string): Tenant | undefined {
  return mockTenants.find((t) => t.id === tenantId);
}

export function getMaintenanceForProperty(propertyId: string): MaintenanceRequest[] {
  return mockMaintenanceRequests.filter((m) => m.propertyId === propertyId);
}

export function getConversationMessages(conversationId: string): Message[] {
  return mockMessages.filter((m) => m.conversationId === conversationId);
}
