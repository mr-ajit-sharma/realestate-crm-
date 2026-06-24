// lib/services/deals.ts
import { api } from '@/lib/api';
import {CreateDealInput,UpdateDealStatusInput} from '@/types/index'

export const dealsApi = {
  getDeals: (params?: any) => 
    api.get('/deals', { params }),
  
  createDeal: (data: CreateDealInput) => 
    api.post('/deals', data),

  updateDealStatus: (id: string, data: UpdateDealStatusInput) => 
    api.patch(`/deals/${id}/status`, data),

  getDealById: (id: string) => 
    api.get(`/deals/${id}`),

  getCommissionSummary: () => 
    api.get('/deals/commission'),
};
