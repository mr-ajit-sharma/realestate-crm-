'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuth = () => {
  const { user, token, login, logout } = useAuthStore();
  const router = useRouter();

  const isAuthenticated = !!token && !!user;

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout: handleLogout,
  };
};
