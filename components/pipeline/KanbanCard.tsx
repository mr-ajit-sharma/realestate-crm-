'use client';

import { Deal } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface KanbanCardProps {
  deal: Deal;
  onClick?: () => void;
}

export default function KanbanCard({ deal, onClick }: KanbanCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
    >
      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
        Deal #{deal.id.slice(0, 8)}
      </h4>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
        {formatCurrency(deal.amount)}
      </p>
      <div className="mt-3 space-y-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Commission: {formatCurrency(deal.commission)}
        </div>
        <div className="w-full h-1 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="h-1 bg-blue-500 rounded-full"
            style={{ width: `${deal.progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
          {deal.progress}%
        </div>
      </div>
    </div>
  );
}
