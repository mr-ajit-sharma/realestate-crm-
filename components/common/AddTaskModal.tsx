'use client';

import { useState } from 'react';
import { useContacts } from '@/hooks/useContacts';
import { useLeads } from '@/hooks/useLeads';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  defaultDate?: string;
};

export default function AddTaskModal({ isOpen, onClose, onSubmit, isLoading,defaultDate  }: Props) {
  const { data: contacts = [] } = useContacts();
  const { data: leads = [] } = useLeads();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: defaultDate || '',
    priority: 'MEDIUM',
    taskType: 'FOLLOW_UP',
    contact: '',
    lead: '',
    notes: '',
  });

  const handleChange = (e: any) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    ...formData,
    dueDate: formData.dueDate ? `${formData.dueDate}T00:00:00Z` : undefined,   // ← Ye line important hai
  };

  onSubmit(payload);
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Create New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Title *</label>
            <input name="title" required onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900" />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea name="description" rows={3} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Due Date *</label>
  <input 
    name="dueDate" 
    type="date"
    value={formData.dueDate}  
    required 
    onChange={handleChange} 
    className="w-full p-3 border rounded-lg dark:bg-gray-900" 
  />            </div>
            <div>
              <label className="block text-sm mb-1">Priority</label>
              <select name="priority" onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Task Type</label>
            <select name="taskType" onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900">
              <option value="FOLLOW_UP">Follow Up</option>
              <option value="CALL">Call</option>
              <option value="MEETING">Meeting</option>
              <option value="SITE_VISIT">Site Visit</option>
              <option value="NEGOTIATION">Negotiation</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Related Lead</label>
              <select name="lead" onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900">
                <option value="">Select Lead</option>
                {leads.map((l: any) => (
                  <option key={l._id} value={l._id}>
                    {l.contact?.name || 'Lead'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Related Contact</label>
              <select name="contact" onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-900">
                <option value="">Select Contact</option>
                {contacts.map((c: any) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 border rounded-xl">Cancel</button>
            <button type="submit" disabled={isLoading} className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50">
              {isLoading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}