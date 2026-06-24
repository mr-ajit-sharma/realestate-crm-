import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertiesApi } from '@/lib/services/properties';
import type { Property, CreatePropertyPayload, UpdatePropertyPayload } from '@/types';

// ─── Query Keys ───────────────────────────────────────────────────────────────
export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (params?: Record<string, string | number | boolean>) =>
    [...propertyKeys.lists(), params] as const,
  detail: (id: string) => [...propertyKeys.all, 'detail', id] as const,
  favorites: () => [...propertyKeys.all, 'favorites'] as const,
};

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useProperties = (params?: Record<string, string | number | boolean>) => {
  return useQuery<Property[]>({
    queryKey: propertyKeys.list(params),
    queryFn: async () => {
      const response = await propertiesApi.getProperties(params);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useProperty = (id: string) => {
  return useQuery<Property>({
    queryKey: propertyKeys.detail(id),
    queryFn: async () => {
      const response = await propertiesApi.getPropertyById(id);
      return response.data.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useFavorites = () => {
  return useQuery<Property[]>({
    queryKey: propertyKeys.favorites(),
    queryFn: async () => {
      const response = await propertiesApi.getFavorites();
      return response.data.data;
    },
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

// ─── Mutations ────────────────────────────────────────────────────────────────

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePropertyPayload) => propertiesApi.createProperty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
    },
  });
};

export const useUpdateProperty = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePropertyPayload) => propertiesApi.updateProperty(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
      queryClient.invalidateQueries({ queryKey: propertyKeys.detail(id) });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => propertiesApi.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
    },
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => propertiesApi.addFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.favorites() });
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => propertiesApi.removeFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.favorites() });
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
    },
  });
};