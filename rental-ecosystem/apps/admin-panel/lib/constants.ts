import {
  LayoutDashboard,
  CheckCircle2,
  Building2,
  Users,
  Shield,
  Activity,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  AlertCircle,
  Scale,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  children?: NavItem[];
  badge?: number;
}

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Verification',
    href: '#',
    icon: CheckCircle2,
    children: [
      {
        title: 'Landlords',
        href: '/verification/landlords',
      },
      {
        title: 'Agents',
        href: '/verification/agents',
      },
    ],
    badge: 12,
  },
  {
    title: 'Properties',
    href: '/properties',
    icon: Building2,
  },
  {
    title: 'Users',
    href: '/users',
    icon: Users,
  },
  {
    title: 'Compliance',
    href: '#',
    icon: Shield,
    children: [
      {
        title: 'Audit Logs',
        href: '/compliance/audit-logs',
      },
      {
        title: 'Suspended Accounts',
        href: '/compliance/suspended',
      },
      {
        title: 'Disputes',
        href: '/compliance/disputes',
      },
    ],
  },
  {
    title: 'Monitoring',
    href: '#',
    icon: Activity,
    children: [
      {
        title: 'Activity Feed',
        href: '/monitoring/activity',
      },
      {
        title: 'Reports',
        href: '/monitoring/reports',
      },
    ],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export const statusColors: Record<string, { bg: string; text: string; badge: string }> = {
  pending: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-700 dark:text-yellow-300',
    badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  },
  approved: {
    bg: 'bg-green-500/10',
    text: 'text-green-700 dark:text-green-300',
    badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  },
  rejected: {
    bg: 'bg-red-500/10',
    text: 'text-red-700 dark:text-red-300',
    badge: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  },
  review: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-700 dark:text-blue-300',
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  },
  active: {
    bg: 'bg-green-500/10',
    text: 'text-green-700 dark:text-green-300',
    badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  },
  suspended: {
    bg: 'bg-red-500/10',
    text: 'text-red-700 dark:text-red-300',
    badge: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  },
  inactive: {
    bg: 'bg-gray-500/10',
    text: 'text-gray-700 dark:text-gray-300',
    badge: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100',
  },
  open: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-700 dark:text-orange-300',
    badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
  },
  'in_review': {
    bg: 'bg-blue-500/10',
    text: 'text-blue-700 dark:text-blue-300',
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  },
  resolved: {
    bg: 'bg-green-500/10',
    text: 'text-green-700 dark:text-green-300',
    badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  },
  escalated: {
    bg: 'bg-red-500/10',
    text: 'text-red-700 dark:text-red-300',
    badge: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  },
};

export const verificationStatuses = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Under Review', value: 'review' },
];

export const userRoles = [
  { label: 'Tenant', value: 'tenant' },
  { label: 'Landlord', value: 'landlord' },
  { label: 'Agent', value: 'agent' },
];

export const propertyStatuses = [
  { label: 'Active', value: 'active' },
  { label: 'Flagged', value: 'flagged' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Inactive', value: 'inactive' },
];

export const disputeStatuses = [
  { label: 'Open', value: 'open' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Escalated', value: 'escalated' },
];

export const auditActions = [
  { label: 'User Created', value: 'user_created' },
  { label: 'User Updated', value: 'user_updated' },
  { label: 'User Suspended', value: 'user_suspended' },
  { label: 'Property Created', value: 'property_created' },
  { label: 'Verification Approved', value: 'verification_approved' },
  { label: 'Verification Rejected', value: 'verification_rejected' },
  { label: 'Login', value: 'login' },
  { label: 'Dispute Opened', value: 'dispute_opened' },
];
