'use client';

import { STATUS_COLORS, STATUS_LABELS, PRIORITY_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  readonly status: string;
  readonly variant?: 'status' | 'priority';
}

export default function StatusBadge({
  status,
  variant = 'status',
}: StatusBadgeProps) {
  const colors =
    variant === 'priority' ? PRIORITY_COLORS : STATUS_COLORS;
  const colorClass = colors[status] || 'bg-gray-100 text-gray-800';
  const label = variant === 'status' ? STATUS_LABELS[status] ?? status : status;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        colorClass
      )}
    >
      {label}
    </span>
  );
}
