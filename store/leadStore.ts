import { create } from 'zustand';
import { Lead } from '@/types';

type LeadStore = {
  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
};

export const useLeadStore = create<LeadStore>((set) => ({
  leads: [],
  setLeads: (leads) => set({ leads }),
  updateLeadStatus: (id, status) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id ? { ...lead, status } : lead
      ),
    })),
}));