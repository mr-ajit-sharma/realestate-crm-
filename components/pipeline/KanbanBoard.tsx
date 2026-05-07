'use client';

import { Deal } from '@/types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  deals?: Deal[];
  onCardClick?: (deal: Deal) => void;
}

const statusOrder: Deal['status'][] = [
  'Pending',
  'In Progress',
  'Closed Won',
  'Closed Lost',
];

const statusLabels: Record<Deal['status'], string> = {
  Pending: 'Pending',
  'In Progress': 'In Progress',
  'Closed Won': 'Won',
  'Closed Lost': 'Lost',
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
