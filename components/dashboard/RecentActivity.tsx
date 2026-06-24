'use client';

import { Clock, RefreshCw, User } from 'lucide-react';
import { useMemo } from 'react';
import { useDashboardMetrics } from '@/hooks/useDashboard';
import { formatRelativeTime } from '@/lib/utils';
import type { RecentActivityItem } from '@/types';

function SkeletonRow() {
  return (
    <div className="flex items-start gap-4 border-b border-gray-100 pb-5 dark:border-gray-800 last:border-0 last:pb-0 animate-pulse">
      <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-20" />
    </div>
  );
}

export default function RecentActivity() {
  const { data, isLoading, isError, refetch, isRefetching } = useDashboardMetrics();

  const activities = useMemo<RecentActivityItem[]>(() => {
    if (!data) return [];

    // Exact structure from your console
    return Array.isArray(data.recentActivities) ? data.recentActivities : [];
  }, [data]);

  console.log('📊 Raw data:', data);
  console.log('📋 Activities count:', activities.length);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          aria-label="Refresh recent activity"
        >
          <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {isLoading ? (
        <div className="flex-1 overflow-auto">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonRow key={idx} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex-1 flex items-center justify-center text-red-500">
          Failed to load activity
        </div>
      ) : activities.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No Recent Activities Found</p>
          <p className="text-sm text-gray-400 mt-2">Create some leads, deals or tasks</p>
          
          {/* Temporary Debug Info */}
          <div className="mt-6 text-left text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded">
            <p><strong>Debug:</strong> Recent Activities is empty in backend</p>
            <p>Total Leads: {data?.totalLeads || 0}</p>
            <p>Total Deals: {data?.totalDeals || 0}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-5 flex-1 overflow-auto pr-1">
          {activities.map((act: any) => {
            const initials = act?.user?.trim()?.charAt(0)?.toUpperCase() || 'U';
            const createdAt = act?.createdAt;

            return (
              <div
                key={act?._id ?? Math.random()}
                className="flex items-start gap-4 border-b border-gray-100 pb-5 dark:border-gray-800 last:border-0 last:pb-0"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                  {act?.user ? (
                    <span className="text-blue-600 font-semibold">{initials}</span>
                  ) : (
                    <User className="h-4 w-4 text-blue-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white break-words">
                    {act?.action ?? 'Unknown action'}
                  </p>

                  {act?.details && (
                    <p className="text-xs text-gray-500 mt-0.5 break-words">{act.details}</p>
                  )}

                  <p className="text-xs text-gray-500 mt-1">{act?.user ?? 'System'}</p>
                </div>

                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {createdAt ? formatRelativeTime(createdAt) : '—'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}