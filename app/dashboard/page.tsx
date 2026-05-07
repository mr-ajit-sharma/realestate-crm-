'use client';

import KPICards from '@/components/dashboard/KPICards';
import RecentActivity from '@/components/dashboard/RecentActivity';
import RevenueCharts from '@/components/dashboard/RevenueCharts';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here's your CRM overview.
        </p>
      </div>

      <KPICards
        data={{
          totalLeads: 154,
          activeDeals: 23,
          closedDeals: 12,
          revenue: 350000,
        }}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <RevenueCharts />
        <RecentActivity />
      </div>
    </div>
  );
}
