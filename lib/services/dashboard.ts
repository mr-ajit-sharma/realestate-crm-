// lib/services/dashboard.ts
import { api } from '@/lib/api';
import {DashboardMetrics} from '@/types/index'


export const dashboardService = {
  getMetrics: async () => {
    const { data } = await api.get<{ success: boolean; data: DashboardMetrics }>(
      '/dashboard/metrics'
    );

    // Expected backend shape: { success: true, data: { ..., recentActivities: [...] } }
    return data?.data;
  },
};
