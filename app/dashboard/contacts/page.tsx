'use client';

import DataTable from '@/components/common/DataTable';
import { Lead } from '@/types';

const dummyContacts: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1-555-0101',
    status: 'Contacted',
    value: 250000,
    tags: ['VIP'],
    lastContact: '2024-05-01',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+1-555-0102',
    status: 'New',
    value: 150000,
    tags: ['Apartment'],
    lastContact: '2024-05-02',
  },
];

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Contacts
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your leads and contacts.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
          Add Contact
        </button>
      </div>

      <DataTable
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Email', accessor: 'email' },
          { header: 'Phone', accessor: 'phone' },
          { header: 'Status', accessor: 'status' },
          { header: 'Value', accessor: 'value' },
        ]}
        data={dummyContacts}
      />
    </div>
  );
}
