'use client';

import { useState } from 'react';
import { useContacts } from '@/hooks/useContacts';
import { useProperties } from '@/hooks/useProperties';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
};

export default function AddLeadModal({ isOpen, onClose, onSubmit, isLoading }: Props) {
  const { data: contacts = [] } = useContacts();
  const { data: properties = [] } = useProperties();

  const [formData, setFormData] = useState({
    contact: '',
    property: '',
    source: 'OTHER',
    expectedCloseDate: '',
    notes: '',
  });

  const handleChange = (e: any) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    ...formData,
    expectedCloseDate: formData.expectedCloseDate 
      ? `${formData.expectedCloseDate}T00:00:00Z` 
      : undefined,
  };

  onSubmit(payload);
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Create New Lead</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Contact *</label>
            <select name="contact" required onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900">
              <option value="">Select Contact</option>
              {contacts.map((c: any) => (
                <option key={c._id} value={c._id}>
                  {c.name} - {c.phone}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Property (Optional)</label>
            <select name="property" onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900">
              <option value="">No Property</option>
              {properties.map((p: any) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Source</label>
            <select name="source" onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900">
              <option value="OTHER">Other</option>
              <option value="WEBSITE">Website</option>
              <option value="REFERRAL">Referral</option>
              <option value="FACEBOOK">Facebook</option>
              <option value="INSTAGRAM">Instagram</option>
              <option value="WALK_IN">Walk In</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Expected Close Date</label>
            <input 
              name="expectedCloseDate" 
              type="date" 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg dark:bg-gray-900" 
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Notes</label>
            <textarea name="notes" rows={3} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900" />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 border rounded-xl">Cancel</button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}