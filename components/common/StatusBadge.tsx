'use client';

import { STATUS_COLORS, PRIORITY_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'status' | 'priority';
}

export default function StatusBadge({
  status,
  variant = 'status',
}: StatusBadgeProps) {
  const colors =
    variant === 'priority' ? PRIORITY_COLORS : STATUS_COLORS;
  const colorClass = colors[status] || 'bg-gray-100 text-gray-800';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        colorClass
      )}
    >
      {status}
    </span>
  );
}
