import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole } from '@/types';

type AuthState = {
  user: { id: string; name: string; role: UserRole } | null;
  token: string | null;
  login: (user: { id: string; name: string; role: UserRole }, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
);