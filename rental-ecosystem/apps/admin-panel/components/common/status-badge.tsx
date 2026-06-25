import { statusColors } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colors = statusColors[status] || statusColors.inactive;
  
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', colors.badge, className)}>
      {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
    </span>
  );
}
