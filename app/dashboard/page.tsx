'use client';

import KPICards from '@/components/dashboard/KPICards';
import RecentActivity from '@/components/dashboard/RecentActivity';
import RevenueCharts from '@/components/dashboard/RevenueCharts';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Real-time overview of your real estate business
        </p>
      </div>

      <KPICards />

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueCharts />
        <RecentActivity />
      </div>
    </div>
  );
}