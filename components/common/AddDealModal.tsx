'use client';

import { useState, useEffect } from 'react';
import { useContacts } from '@/hooks/useContacts';
import { useLeads } from '@/hooks/useLeads';           // Naya hook
import { useProperties } from '@/hooks/useProperties'; // Naya hook

export default function AddDealModal({ isOpen, onClose, onSubmit, isLoading }: any) {
  const { data: contacts = [] } = useContacts();
  const { data: leads = [] } = useLeads();
  const { data: properties = [] } = useProperties();

  const [formData, setFormData] = useState({
    lead: '',
    contact: '',
    property: '',
    amount: '',
    commissionRate: '2',
    notes: '',
  });

  const handleChange = (e: any) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lead || !formData.contact || !formData.property) {
      alert("Please select Lead, Contact and Property");
      return;
    }
    onSubmit({
      ...formData,
      amount: Number(formData.amount),
      commissionRate: Number(formData.commissionRate),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-6">Create New Deal</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Lead *</label>
            <select name="lead" required onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900">
              <option value="">Select Lead</option>
              {leads.map((lead: any) => {
                const contactName = lead.contact?.name || lead.name || 'No Name';
                const contactEmail = lead.contact?.email || '';
                return (
                  <option key={lead._id} value={lead._id}>
                    {contactName} {contactEmail && `(${contactEmail})`}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Contact *</label>
            <select name="contact" required onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900">
              <option value="">Select Contact</option>
              {contacts.map((contact: any) => (
                <option key={contact._id} value={contact._id}>
                  {contact.name} - {contact.phone}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Property *</label>
            <select name="property" required onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900">
              <option value="">Select Property</option>
              {properties.map((prop: any) => (
                <option key={prop._id} value={prop._id}>
                  {prop.title} - ₹{prop.price}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Amount (₹) *</label>
              <input name="amount" type="number" required onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900" />
            </div>
            <div>
              <label>Commission Rate (%)</label>
              <input name="commissionRate" type="number" step="0.1" value={formData.commissionRate} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900" />
            </div>
          </div>

          <div>
            <label>Notes</label>
            <textarea name="notes" rows={3} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900" />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 border rounded-xl">Cancel</button>
            <button type="submit" disabled={isLoading} className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50">
              {isLoading ? 'Creating...' : 'Create Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}