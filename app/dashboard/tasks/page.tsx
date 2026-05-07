'use client';

import { useTaskStore, Task } from '@/store/taskStore';
import StatusBadge from '@/components/common/StatusBadge';
import { formatDate } from '@/lib/utils';
import { CheckCircle, Circle } from 'lucide-react';

export default function TasksPage() {
  const { tasks } = useTaskStore();

  const dummyTasks: Task[] = [
    {
      id: '1',
      title: 'Follow up with John Smith',
      description: 'Call about apartment showing',
      dueDate: '2024-05-10',
      priority: 'high',
      completed: false,
    },
    {
      id: '2',
      title: 'Prepare property brochure',
      description: 'For downtown villa',
      dueDate: '2024-05-12',
      priority: 'medium',
      completed: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tasks
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your to-do list.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
          Add Task
        </button>
      </div>

      <div className="space-y-3">
        {dummyTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            {task.completed ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400" />
            )}
            <div className="flex-1">
              <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {task.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={task.priority} variant="priority" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {formatDate(task.dueDate)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
