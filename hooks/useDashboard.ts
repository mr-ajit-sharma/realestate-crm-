// hooks/useDashboard.ts
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/lib/services/dashboard';

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: dashboardService.getMetrics,
    staleTime: 1000 * 30,        // 30 seconds
    refetchInterval: 30000,      // Auto refresh
    refetchOnWindowFocus: true,
    retry: 2,
  });
};