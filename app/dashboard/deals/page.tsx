'use client';

import KanbanBoard from '@/components/pipeline/KanbanBoard';
import { Deal } from '@/types';

const dummyDeals: Deal[] = [
  {
    id: '1',
    leadId: '1',
    propertyId: '1',
    amount: 450000,
    commission: 13500,
    status: 'In Progress',
    progress: 60,
  },
  {
    id: '2',
    leadId: '2',
    propertyId: '2',
    amount: 850000,
    commission: 25500,
    status: 'Pending',
    progress: 20,
  },
  {
    id: '3',
    leadId: '3',
    propertyId: '3',
    amount: 350000,
    commission: 10500,
    status: 'Closed Won',
    progress: 100,
  },
];

export default function DealsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Deals
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Track your deals through the pipeline.
        </p>
      </div>

      <KanbanBoard deals={dummyDeals} />
    </div>
  );
}
