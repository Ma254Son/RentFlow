import {
  LayoutDashboard,
  Building2,
  DoorOpen,
  Users,
  Calendar,
  Wrench,
  MessageSquare,
  UserCheck,
  TrendingUp,
  Settings,
  LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: Array<'landlord' | 'agent'>;
  children?: NavItem[];
}

export const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['landlord', 'agent'],
  },
  {
    label: 'Properties',
    href: '/properties',
    icon: Building2,
    roles: ['landlord', 'agent'],
  },
  {
    label: 'Units',
    href: '/units',
    icon: DoorOpen,
    roles: ['landlord', 'agent'],
  },
  {
    label: 'Tenants',
    href: '/tenants',
    icon: Users,
    roles: ['landlord', 'agent'],
  },
  {
    label: 'Operations',
    href: '#',
    icon: Wrench,
    roles: ['landlord', 'agent'],
    children: [
      {
        label: 'Viewings',
        href: '/operations/viewings',
        icon: Calendar,
        roles: ['landlord', 'agent'],
      },
      {
        label: 'Maintenance',
        href: '/operations/maintenance',
        icon: Wrench,
        roles: ['landlord', 'agent'],
      },
      {
        label: 'Messaging',
        href: '/operations/messaging',
        icon: MessageSquare,
        roles: ['landlord', 'agent'],
      },
    ],
  },
  {
    label: 'Management',
    href: '#',
    icon: UserCheck,
    roles: ['landlord', 'agent'],
    children: [
      {
        label: 'Agents',
        href: '/management/agents',
        icon: UserCheck,
        roles: ['landlord'],
      },
      {
        label: 'Occupancy Timeline',
        href: '/management/occupancy',
        icon: TrendingUp,
        roles: ['landlord', 'agent'],
      },
    ],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['landlord'],
  },
];

export const statusColors: Record<string, string> = {
  // Unit status
  available: 'bg-green-100 text-green-800',
  occupied: 'bg-blue-100 text-blue-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  // Tenant status
  pending: 'bg-purple-100 text-purple-800',
  approved: 'bg-green-100 text-green-800',
  active: 'bg-blue-100 text-blue-800',
  inactive: 'bg-gray-100 text-gray-800',
  // Maintenance priority
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
  // Maintenance status
  open: 'bg-red-100 text-red-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  'on-hold': 'bg-gray-100 text-gray-800',
  scheduled: 'bg-purple-100 text-purple-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

export const statusLabels: Record<string, string> = {
  available: 'Available',
  occupied: 'Occupied',
  maintenance: 'Maintenance',
  pending: 'Pending Approval',
  approved: 'Approved',
  active: 'Active',
  inactive: 'Inactive',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
  open: 'Open',
  'in-progress': 'In Progress',
  completed: 'Completed',
  'on-hold': 'On Hold',
  scheduled: 'Scheduled',
  cancelled: 'Cancelled',
};
