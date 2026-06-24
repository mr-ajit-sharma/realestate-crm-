'use client';

import { Users, Target, Home, IndianRupee, RefreshCw } from 'lucide-react';
import { useDashboardMetrics } from '@/hooks/useDashboard';

export default function KPICards() {
  const { data, isLoading, isRefetching, refetch } = useDashboardMetrics();

  const cards = [
    { title: "Total Leads", value: data?.totalLeads ?? 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950" },
    { title: "Active Deals", value: data?.totalDeals ?? 0, icon: Target, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950" },
    { title: "Properties", value: data?.totalProperties ?? 0, icon: Home, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950" },
    { 
      title: "Revenue This Month", 
      value: `₹${(data?.financials?.totalRevenue ?? 0).toLocaleString('en-IN')}`, 
      icon: IndianRupee, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50 dark:bg-emerald-950" 
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
                <p className="text-4xl font-bold mt-3 text-gray-900 dark:text-white">
                  {isLoading ? '—' : card.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${card.bg}`}>
                <card.icon className={`h-8 w-8 ${card.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}