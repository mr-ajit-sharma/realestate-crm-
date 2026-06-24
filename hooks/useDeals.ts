// hooks/useDeals.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dealsApi, UpdateDealStatusInput } from '@/lib/services/deals';

export const useDeals = (params?: any) => {
  return useQuery({
    queryKey: ['deals', params],
    queryFn: async () => {
      const res = await dealsApi.getDeals(params);
      console.log(res,'              10')
      return res.data.data || res.data;   // Backend response ke hisab se adjust
    },
    staleTime: 1000 * 60 * 2,
  });
};

export const useCreateDeal = () => {
  const queryClient = useQueryClient();

  console.log(queryClient,'              20')
  return useMutation({
    mutationFn: dealsApi.createDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
    },
  });
};

export const useUpdateDealStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDealStatusInput }) =>
      dealsApi.updateDealStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
    },
  });
};