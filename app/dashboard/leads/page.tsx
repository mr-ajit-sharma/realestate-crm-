'use client';

import { useState } from 'react';
import DataTable from '@/components/common/DataTable';
import { useLeads, useCreateLead } from '@/hooks/useLeads';
import AddLeadModal from '@/components/common/AddLeadModal';

export default function LeadsPage() {
  const { data: leads = [], isLoading, isError } = useLeads();
  const createLeadMutation = useCreateLead();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateLead = async (formData: any) => {
    try {
      // Helpful for debugging 400s
      console.log('[createLead] payload', formData);

      await createLeadMutation.mutateAsync(formData);
      setIsModalOpen(false);
      alert('Lead created successfully!');
    } catch (error: any) {
      console.error('[createLead] error', error?.response?.data || error);
      alert(
        error?.response?.data?.message ||
          error?.response?.data?.errors?.[0]?.message ||
          'Failed to create lead'
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leads</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your real estate leads and pipeline.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + New Lead
        </button>
      </div>

      <AddLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateLead}
        isLoading={createLeadMutation.isPending}
      />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : isError ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
          Failed to load leads. Please refresh.
        </div>
      ) : (
        <DataTable
          columns={[
            { header: 'Name', accessor: 'contact.name' },
            { header: 'Phone', accessor: 'contact.phone' },
            { header: 'Email', accessor: 'contact.email' },
            { header: 'Stage', accessor: 'stage' },
            { header: 'Source', accessor: 'source' },
            { header: 'Expected Close', accessor: 'expectedCloseDate' },
          ]}
          data={leads as any[]}
        />
      )}
    </div>
  );
}