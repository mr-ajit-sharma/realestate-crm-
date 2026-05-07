'use client';

export default function RecentActivity() {
  const activities = [
    { id: 1, action: 'New lead created', user: 'John Doe', time: '2 hours ago' },
    { id: 2, action: 'Deal updated', user: 'Jane Smith', time: '4 hours ago' },
    { id: 3, action: 'Property listed', user: 'Mike Johnson', time: '1 day ago' },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800 last:border-0">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.action}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activity.user}
              </p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
