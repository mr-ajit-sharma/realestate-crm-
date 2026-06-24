import { api } from '@/lib/api';
import { AuthUser, LoginPayload, RegisterPayload } from '@/types';

export const authApi = {
  login: (credentials: LoginPayload) => api.post<AuthUser>('/auth/login', credentials),
  register: (payload: RegisterPayload) => api.post<AuthUser>('/auth/register', payload),
};
