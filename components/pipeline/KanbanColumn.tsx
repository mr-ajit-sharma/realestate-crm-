'use client';

import { Deal } from '@/types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  title: string;
  status: Deal['status'];
  deals: Deal[];
  onCardClick?: (deal: Deal) => void;
}

export default function KanbanColumn({
  title,
  status,
  deals,
  onCardClick,
}: KanbanColumnProps) {
  const columnDeals = deals.filter((deal) => deal.status === status);

  return (
    <div className="flex flex-col rounded-lg bg-gray-50 p-4 dark:bg-gray-800 min-h-96 w-80">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {columnDeals.length} deal{columnDeals.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex-1 space-y-3 overflow-auto">
        {columnDeals.map((deal) => (
          <KanbanCard
            key={deal.id}
            deal={deal}
            onClick={() => onCardClick?.(deal)}
          />
        ))}
      </div>
    </div>
  );
}
