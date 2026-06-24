'use client';

import { useState } from 'react';
import KanbanBoard from '@/components/pipeline/KanbanBoard';
import { useDeals, useCreateDeal } from '@/hooks/useDeals';
import AddDealModal from '@/components/common/AddDealModal';

export default function DealsPage() {
  const { data: deals = [], isLoading, isError } = useDeals();
  const createDealMutation = useCreateDeal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateDeal = async (formData: any) => {
    try {
      await createDealMutation.mutateAsync(formData);
      setIsModalOpen(false);
      alert('Deal created successfully!');
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to create deal');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Deals Pipeline</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your deals through the pipeline.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          + New Deal
        </button>
      </div>

      <AddDealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateDeal}
        isLoading={createDealMutation.isPending}
      />

      {isLoading ? (
        <div className="rounded-lg border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-900">
          Loading pipeline...
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700 dark:border-gray-800 dark:bg-red-900/20 dark:text-red-200">
          Failed to load deals. Please try again.
        </div>
      ) : deals.length > 0 ? (
        <KanbanBoard 
          deals={deals} 
          onStatusChange={async (dealId, newStatus) => {
            // Agar KanbanBoard drag-drop support karta hai to yahan call hoga
            // Implementation niche di hai
          }}
        />
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-16 text-center dark:border-gray-700 dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400">No deals yet. Create your first deal!</p>
        </div>
      )}
    </div>
  );
}