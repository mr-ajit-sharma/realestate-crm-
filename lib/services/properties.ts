import { api } from '@/lib/api';
import { PropertyResponse,CreatePropertyPayload,UpdatePropertyPayload,PropertiesResponse} from '@/types';

export const propertiesApi = {
  getProperties: (params?: Record<string, string | number | boolean>) =>
    api.get<PropertiesResponse>('/properties', { params }),

  getPropertyById: (id: string) =>
    api.get<PropertyResponse>(`/properties/${id}`),

  createProperty: (data: CreatePropertyPayload) =>
    api.post<PropertyResponse>('/properties', data),

  updateProperty: (id: string, data: UpdatePropertyPayload) =>
    api.put<PropertyResponse>(`/properties/${id}`, data),

  deleteProperty: (id: string) =>
    api.delete<{ success: boolean }>(`/properties/${id}`),

  getFavorites: () =>
    api.get<PropertiesResponse>('/properties/favorites'),

  addFavorite: (id: string) =>
    api.post<{ success: boolean }>(`/properties/${id}/favorite`),

  removeFavorite: (id: string) =>
    api.delete<{ success: boolean }>(`/properties/${id}/favorite`),
};