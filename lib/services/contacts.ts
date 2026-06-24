import { api } from '@/lib/api';
import { Contact ,CreateContactInput} from '@/types';


export const contactsApi = {
  getContacts: (params?: Record<string, string | number | boolean>) =>
    api.get<Contact[]>('/contacts', { params }),
  createContact: async (data: CreateContactInput) => {
    const { data: response } = await api.post<Contact>('/contacts', data);
    return response;
  },
};
