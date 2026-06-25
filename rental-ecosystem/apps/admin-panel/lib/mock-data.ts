import {
  User,
  Landlord,
  Agent,
  Tenant,
  Property,
  Unit,
  Tenancy,
  VerificationDocument,
  VerificationReview,
  AuditLog,
  Dispute,
  ActivityEvent,
  DashboardKPIs,
  UserGrowthData,
  PropertyGrowthData,
  VerificationTrendData,
} from './types';

// Kenyan names and data
const kenyaNamesF = [
  'Amara', 'Zainab', 'Njeri', 'Fatuma', 'Leah', 'Priya', 'Kamau',
  'Aisha', 'Mwangi', 'Wanjiru', 'Ayesha', 'Chepkemoi', 'Owuor',
  'Faith', 'Grace', 'Hope', 'Joy', 'Charity', 'Mercy', 'Blessing'
];

const kenyaNamesM = [
  'Ahmed', 'Oduor', 'Kipchoge', 'Adeyemi', 'Ibrahim', 'Kariuki',
  'Musyoka', 'Kimani', 'Kiplagat', 'Mwangi', 'Otieno', 'Kipchoge',
  'Nyambura', 'Koech', 'Muturi', 'Kipchoge', 'Omondi', 'Kiplagat',
  'Kariuki', 'Omari'
];

const lastNames = [
  'Okonkwo', 'Kipchoge', 'Owuor', 'Kariuki', 'Mwangi', 'Kiplagat',
  'Koech', 'Mwangi', 'Otieno', 'Kipchoge', 'Wanjiru', 'Hassan',
  'Nyambura', 'Kiplagat', 'Koech', 'Mwangi', 'Karim', 'Kipchoge'
];

const propertyNames = [
  'Westlands Plaza', 'Gigiri Towers', 'Parklands Estate', 'Kilimani Heights',
  'Lavington Court', 'Muthaiga Manor', 'Karen Villa', 'Nairobi View',
  'Riverside Estate', 'Upper Hill Heights', 'Langata Luxury', 'Runda Residences',
  'Kenyatta Avenue', 'Mombasa Gardens', 'Nairobi Heights', 'Estate 47',
  'Spring Valley', 'Fourways Junction', 'Embakasi Plaza', 'Mayfair Estate'
];

const agencies = [
  'Nyumba Kwa Haraka', 'Century Real Estate', 'Sunbeam Properties',
  'Elite Homes Kenya', 'Prime Real Estate', 'Modern Living', 'Ideal Homes'
];

const cities = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];
const counties = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Uasin Gishu'];

function generatePhone() {
  const prefix = '+254';
  const operator = ['7', '1'][Math.floor(Math.random() * 2)];
  const number = Math.floor(Math.random() * 900000000) + 100000000;
  return `${prefix}${operator}${number}`;
}

function generateEmail(firstName: string, lastName: string) {
  const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'rentflow.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
}

function getRandomName(gender: 'M' | 'F' = 'M') {
  const firstNames = gender === 'M' ? kenyaNamesM : kenyaNamesF;
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return { firstName, lastName };
}

// Generate Users
export function generateTenants(count: number): Tenant[] {
  const tenants: Tenant[] = [];
  for (let i = 0; i < count; i++) {
    const gender = Math.random() > 0.5 ? 'M' : 'F';
    const { firstName, lastName } = getRandomName(gender as 'M' | 'F');
    tenants.push({
      id: `tenant-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: generateEmail(firstName, lastName),
      phone: generatePhone(),
      role: 'tenant',
      verificationStatus: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)] as any,
      accountStatus: Math.random() > 0.1 ? 'active' : 'suspended',
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
      idType: ['national_id', 'passport', 'driver_license'][Math.floor(Math.random() * 3)] as any,
      idNumber: `ID${Math.floor(Math.random() * 9000000) + 1000000}`,
      tenancies: [],
    });
  }
  return tenants;
}

export function generateLandlords(count: number): Landlord[] {
  const landlords: Landlord[] = [];
  for (let i = 0; i < count; i++) {
    const { firstName, lastName } = getRandomName('M');
    const id = `landlord-${i + 1}`;
    landlords.push({
      id,
      name: `${firstName} ${lastName}`,
      email: generateEmail(firstName, lastName),
      phone: generatePhone(),
      role: 'landlord',
      verificationStatus: ['pending', 'approved', 'review'][Math.floor(Math.random() * 3)] as any,
      accountStatus: 'active',
      createdAt: new Date(Date.now() - Math.random() * 200 * 24 * 60 * 60 * 1000),
      idType: ['national_id', 'passport'][Math.floor(Math.random() * 2)] as any,
      idNumber: `ID${Math.floor(Math.random() * 9000000) + 1000000}`,
      companyName: Math.random() > 0.6 ? `${lastName} Properties` : undefined,
      properties: [],
      verificationDocuments: generateVerificationDocuments(),
    });
  }
  return landlords;
}

export function generateAgents(count: number): Agent[] {
  const agents: Agent[] = [];
  for (let i = 0; i < count; i++) {
    const { firstName, lastName } = getRandomName('M');
    const id = `agent-${i + 1}`;
    agents.push({
      id,
      name: `${firstName} ${lastName}`,
      email: generateEmail(firstName, lastName),
      phone: generatePhone(),
      role: 'agent',
      verificationStatus: ['pending', 'approved', 'review'][Math.floor(Math.random() * 3)] as any,
      accountStatus: 'active',
      createdAt: new Date(Date.now() - Math.random() * 250 * 24 * 60 * 60 * 1000),
      idType: 'national_id',
      idNumber: `ID${Math.floor(Math.random() * 9000000) + 1000000}`,
      agencyName: agencies[Math.floor(Math.random() * agencies.length)],
      licenseNumber: `LICENSE${Math.floor(Math.random() * 100000)}`,
      properties: [],
      verificationDocuments: generateVerificationDocuments(),
    });
  }
  return agents;
}

function generateVerificationDocuments(): VerificationDocument[] {
  return [
    {
      id: `doc-${Math.random()}`,
      type: 'id',
      url: '/documents/id.pdf',
      status: 'approved',
      uploadedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      reviewedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
      reviewedBy: 'admin-001',
    },
  ];
}

export function generateProperties(landlords: Landlord[], agents: Agent[], count: number): Property[] {
  const properties: Property[] = [];
  for (let i = 0; i < count; i++) {
    const landlord = landlords[i % landlords.length];
    const agent = Math.random() > 0.5 ? agents[Math.floor(Math.random() * agents.length)] : undefined;
    const units = Math.floor(Math.random() * 10) + 1;
    const occupied = Math.floor(Math.random() * units);
    const id = `property-${i + 1}`;

    properties.push({
      id,
      name: propertyNames[i % propertyNames.length],
      address: `${Math.floor(Math.random() * 1000)} Estate Road`,
      city: cities[Math.floor(Math.random() * cities.length)],
      county: counties[Math.floor(Math.random() * counties.length)],
      landmarkNumber: `LM${Math.floor(Math.random() * 9000) + 1000}`,
      landlordId: landlord.id,
      agentId: agent?.id,
      units: [],
      totalUnits: units,
      occupiedUnits: occupied,
      occupancyPercentage: Math.round((occupied / units) * 100),
      status: ['active', 'flagged', 'suspended'][Math.floor(Math.random() * 3)] as any,
      createdAt: new Date(Date.now() - Math.random() * 300 * 24 * 60 * 60 * 1000),
      amenities: ['WiFi', 'Parking', 'Security', 'Water Tank', 'Generator'],
      images: [],
    });

    landlord.properties.push(id);
    if (agent) agent.properties.push(id);
  }
  return properties;
}

export function generateUnits(properties: Property[]): Unit[] {
  const units: Unit[] = [];
  let unitId = 0;
  for (const property of properties) {
    for (let i = 0; i < property.totalUnits; i++) {
      const unit: Unit = {
        id: `unit-${++unitId}`,
        propertyId: property.id,
        unitNumber: `${i + 1}${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}`,
        type: ['studio', 'one_bedroom', 'two_bedroom', 'three_bedroom'][
          Math.floor(Math.random() * 4)
        ] as any,
        monthlyRent: Math.floor(Math.random() * 50000) + 15000,
        status: i < property.occupiedUnits ? 'occupied' : 'available',
        tenantId: i < property.occupiedUnits ? `tenant-${Math.floor(Math.random() * 50) + 1}` : undefined,
      };
      units.push(unit);
      property.units.push(unit);
    }
  }
  return units;
}

export function generateTenancies(tenants: Tenant[], units: Unit[], count: number): Tenancy[] {
  const tenancies: Tenancy[] = [];
  for (let i = 0; i < count; i++) {
    const tenant = tenants[i % tenants.length];
    const unit = units[Math.floor(Math.random() * units.length)];
    const startDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
    const tenancy: Tenancy = {
      id: `tenancy-${i + 1}`,
      tenantId: tenant.id,
      propertyId: unit.propertyId,
      unitId: unit.id,
      startDate,
      endDate: Math.random() > 0.7 ? new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000) : undefined,
      monthlyRent: unit.monthlyRent,
      depositAmount: unit.monthlyRent * 2,
      status: Math.random() > 0.8 ? 'terminated' : 'active',
      createdAt: startDate,
    };
    tenancies.push(tenancy);
    tenant.tenancies.push(tenancy.id);
  }
  return tenancies;
}

export function generateAuditLogs(count: number): AuditLog[] {
  const logs: AuditLog[] = [];
  const actions = [
    'user_created', 'user_updated', 'user_suspended', 'property_created',
    'verification_approved', 'verification_rejected', 'login', 'dispute_opened'
  ];
  const entities = ['user', 'property', 'tenancy', 'verification'];

  for (let i = 0; i < count; i++) {
    logs.push({
      id: `log-${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      userId: `user-${Math.floor(Math.random() * 100) + 1}`,
      userType: ['tenant', 'landlord', 'agent'][Math.floor(Math.random() * 3)] as any,
      action: actions[Math.floor(Math.random() * actions.length)] as any,
      entityType: entities[Math.floor(Math.random() * entities.length)] as any,
      entityId: `entity-${Math.floor(Math.random() * 1000) + 1}`,
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      status: Math.random() > 0.95 ? 'failure' : 'success',
    });
  }
  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function generateDisputes(tenancies: Tenancy[], count: number): Dispute[] {
  const disputes: Dispute[] = [];
  const titles = [
    'Water Supply Issues', 'Maintenance Request', 'Rent Dispute',
    'Property Damage', 'Noise Complaint', 'Security Concern', 'Deposit Refund'
  ];

  for (let i = 0; i < count; i++) {
    const tenancy = tenancies[Math.floor(Math.random() * tenancies.length)];
    disputes.push({
      id: `dispute-${i + 1}`,
      tenantId: tenancy.tenantId,
      propertyId: tenancy.propertyId,
      unitId: tenancy.unitId,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: 'Description of the dispute...',
      reportedDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
      status: ['open', 'in_review', 'resolved'][Math.floor(Math.random() * 3)] as any,
      severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
      updates: [],
    });
  }
  return disputes;
}

export function generateActivityFeed(): ActivityEvent[] {
  const events: ActivityEvent[] = [];
  const titles = [
    'New Landlord Registered',
    'Verification Approved',
    'Property Created',
    'Tenancy Activated',
    'Dispute Opened',
    'User Account Suspended',
    'Property Flagged'
  ];

  for (let i = 0; i < 100; i++) {
    events.push({
      id: `event-${i + 1}`,
      type: ['user_registered', 'verification_approved', 'property_created', 'tenancy_activated'][
        Math.floor(Math.random() * 4)
      ] as any,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: 'Event description',
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    });
  }
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function getDashboardKPIs(
  tenants: Tenant[],
  properties: Property[],
  units: Unit[],
  tenancies: Tenancy[],
  landlords: Landlord[],
  disputes: Dispute[]
): DashboardKPIs {
  return {
    totalUsers: tenants.length + landlords.length,
    totalProperties: properties.length,
    totalUnits: units.length,
    activeTenancies: tenancies.filter(t => t.status === 'active').length,
    pendingVerifications: landlords.filter(l => l.verificationStatus === 'pending').length,
    openDisputes: disputes.filter(d => d.status === 'open').length,
  };
}

export function getUserGrowthData(): UserGrowthData[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, i) => ({
    month,
    tenants: Math.floor(Math.random() * 100) + 50,
    landlords: Math.floor(Math.random() * 50) + 20,
    agents: Math.floor(Math.random() * 30) + 10,
  }));
}

export function getPropertyGrowthData(): PropertyGrowthData[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month) => ({
    month,
    properties: Math.floor(Math.random() * 20) + 5,
    units: Math.floor(Math.random() * 100) + 30,
  }));
}

export function getVerificationTrendData(): VerificationTrendData[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month) => ({
    month,
    submitted: Math.floor(Math.random() * 50) + 20,
    approved: Math.floor(Math.random() * 40) + 15,
    rejected: Math.floor(Math.random() * 10) + 2,
  }));
}

// Generate all mock data
export function generateAllMockData() {
  const tenants = generateTenants(50);
  const landlords = generateLandlords(30);
  const agents = generateAgents(15);
  const properties = generateProperties(landlords, agents, 60);
  const units = generateUnits(properties);
  const tenancies = generateTenancies(tenants, units, 150);
  const auditLogs = generateAuditLogs(500);
  const disputes = generateDisputes(tenancies, 30);
  const activityFeed = generateActivityFeed();
  const kpis = getDashboardKPIs(tenants, properties, units, tenancies, landlords, disputes);
  const userGrowth = getUserGrowthData();
  const propertyGrowth = getPropertyGrowthData();
  const verificationTrend = getVerificationTrendData();

  return {
    tenants,
    landlords,
    agents,
    properties,
    units,
    tenancies,
    auditLogs,
    disputes,
    activityFeed,
    kpis,
    userGrowth,
    propertyGrowth,
    verificationTrend,
  };
}
