import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsApi, Lead } from '@/lib/services/leads';

export const leadKeys = {
  all: ['leads'] as const,
  lists: () => [...leadKeys.all, 'list'] as const,
  list: (params?: Record<string, string | number | boolean>) =>
    [...leadKeys.lists(), params] as const,
  detail: (id: string) => [...leadKeys.all, 'detail', id] as const,
};

export const useLeads = (params?: Record<string, string | number | boolean>) => {
  return useQuery<Lead[]>({
    queryKey: leadKeys.list(params),
    queryFn: async () => {
      const res = await leadsApi.getLeads(params);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Lead>) => leadsApi.createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
    },
  });
};

export const useUpdateLead = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Lead>) => leadsApi.updateLead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leadKeys.detail(id) });
    },
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => leadsApi.deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
    },
  });
};