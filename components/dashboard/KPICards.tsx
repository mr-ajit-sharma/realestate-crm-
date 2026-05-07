'use client';

import { TrendingUp } from 'lucide-react';

interface KPICardsProps {
  data?: {
    totalLeads: number;
    activeDeals: number;
    closedDeals: number;
    revenue: number;
  };
}

export default function KPICards({ data }: KPICardsProps) {
  const defaultData = {
    totalLeads: 0,
    activeDeals: 0,
    closedDeals: 0,
    revenue: 0,
  };

  const stats = data || defaultData;

  const cards = [
    { label: 'Total Leads', value: stats.totalLeads, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Deals', value: stats.activeDeals, color: 'bg-purple-50 text-purple-600' },
    { label: 'Closed Deals', value: stats.closedDeals, color: 'bg-green-50 text-green-600' },
    {
      label: 'Revenue',
      value: `$${(stats.revenue / 1000).toFixed(0)}K`,
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`${card.color} rounded-lg p-6 shadow-sm`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {card.label}
              </p>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </div>
            <TrendingUp className="h-8 w-8 opacity-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
