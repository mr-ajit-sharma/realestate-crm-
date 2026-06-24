import { api } from '@/lib/api';

import {Lead,LeadsResponse} from '@/types/index'

export const leadsApi = {
  getLeads: (params?: Record<string, string | number | boolean>) =>
    api.get<LeadsResponse>('/leads', { params }),

  getLeadById: (id: string) =>
    api.get<{ success: boolean; data: Lead }>(`/leads/${id}`),

  createLead: (data: Partial<Lead>) =>
    api.post<{ success: boolean; data: Lead }>('/leads', data),

  updateLead: (id: string, data: Partial<Lead>) =>
    api.put<{ success: boolean; data: Lead }>(`/leads/${id}`, data),

  deleteLead: (id: string) =>
    api.delete<{ success: boolean }>(`/leads/${id}`),
};