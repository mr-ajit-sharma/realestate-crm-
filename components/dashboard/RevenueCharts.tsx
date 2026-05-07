'use client';

export default function RevenueCharts() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Revenue Overview
      </h2>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Q1
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              $45,000
            </span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-800">
            <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Q2
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              $62,000
            </span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-800">
            <div className="h-2 bg-blue-500 rounded-full" style={{ width: '62%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Q3
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              $38,000
            </span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-800">
            <div className="h-2 bg-blue-500 rounded-full" style={{ width: '38%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
