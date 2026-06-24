import { useQuery } from '@tanstack/react-query';
import { contactsApi } from '@/lib/services/contacts';
import type { Contact,CreateContactInput } from '@/types';
import {  useMutation, useQueryClient } from '@tanstack/react-query';


export const useContacts = (params?: Record<string, string | number | boolean>) => {
  return useQuery<Contact[]>({
    queryKey: ['contacts', params],
    queryFn: async () => {
      const response = await contactsApi.getContacts(params);
      return response.data;
    },

    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactsApi.createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};