'use client';

import { useState } from 'react';
import DataTable from '@/components/common/DataTable';
import { useContacts, useCreateContact } from '@/hooks/useContacts';
import AddContactModal from '@/components/common/AddContactModal';  

export default function ContactsPage() {
  const { data: contacts, isLoading, isError } = useContacts();
  const createContactMutation = useCreateContact();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddContact = async (formData: any) => {
    try {
      await createContactMutation.mutateAsync(formData);
      setIsModalOpen(false);
      // Success message (toast use kar sakte ho)
      alert('Contact added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add contact');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contacts</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your leads and contacts.
          </p>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Add Contact
        </button>
      </div>

      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddContact}
        isLoading={createContactMutation.isPending}
      />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-16 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
          Failed to load contacts. Please refresh the page.
        </div>
      ) : (
        <DataTable
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Email', accessor: 'email' },
            { header: 'Phone', accessor: 'phone' },
            { header: 'Type', accessor: 'type' },
            { header: 'Budget', accessor: 'budget' },
          ]}
          data={(Array.isArray(contacts) ? contacts : []) as any[]}
        />
      )}
    </div>
  );
}