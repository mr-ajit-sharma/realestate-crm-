'use client';

import { Deal } from '@/types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  deals?: Deal[];
  onCardClick?: (deal: Deal) => void;
  onStatusChange?: (dealId: any, newStatus: any) => Promise<void>;
}

const statusOrder: Deal['status'][] = [
  'PENDING',
  'IN_PROGRESS',
  'CLOSED_WON',
  'CLOSED_LOST',
];

const statusLabels: Record<Deal['status'], string> = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  CLOSED_WON: 'Won',
  CLOSED_LOST: 'Lost',
};

export default function KanbanBoard({ deals = [], onCardClick }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 rounded-lg bg-white dark:bg-gray-900 p-4">
      {statusOrder.map((status) => (
        <KanbanColumn
          key={status}
          title={statusLabels[status]}
          status={status}
          deals={deals}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}
