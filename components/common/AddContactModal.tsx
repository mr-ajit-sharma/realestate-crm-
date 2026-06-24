'use client';

import { useState } from 'react';

type AddContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
};

export default function AddContactModal({ isOpen, onClose, onSubmit, isLoading }: AddContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'BUYER' as const,
    budget: '',
    preferences: '',
    notes: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      budget: formData.budget ? Number(formData.budget) : undefined,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : undefined,
    };

    onSubmit(payload);
    
    // Reset form
    setFormData({
      name: '', email: '', phone: '', type: 'BUYER', budget: '', preferences: '', notes: '', tags: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Contact</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name *</label>
            <input name="name" required value={formData.name} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-900" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Phone *</label>
              <input name="phone" required value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-900" />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-900" />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Type *</label>
            <select name="type" required value={formData.type} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-900">
              <option value="BUYER">Buyer</option>
              <option value="SELLER">Seller</option>
              <option value="TENANT">Tenant</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Budget</label>
            <input name="budget" type="number" value={formData.budget} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-900" />
          </div>

          <div>
            <label className="block text-sm mb-1">Preferences</label>
            <textarea name="preferences" value={formData.preferences} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-900" rows={2} />
          </div>

          <div>
            <label className="block text-sm mb-1">Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-900" rows={3} />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-2 border rounded-lg">Cancel</button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}