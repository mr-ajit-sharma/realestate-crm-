'use client';

import { useState } from 'react';
import StatusBadge from '@/components/common/StatusBadge';
import { formatDate } from '@/lib/utils';
import { CheckCircle, Circle, Plus } from 'lucide-react';
import { useTasks, useCreateTask } from '@/hooks/useTasks';
import AddTaskModal from '@/components/common/AddTaskModal';

export default function TasksPage() {
  const { data: tasks = [], isLoading, isError } = useTasks();
  const createTaskMutation = useCreateTask();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTask = async (formData: any) => {
    try {
      await createTaskMutation.mutateAsync(formData);
      setIsModalOpen(false);
      alert('Task created successfully!');
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to create task');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your to-do list.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
        isLoading={createTaskMutation.isPending}
      />

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-24 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
          Failed to load tasks. Please refresh the page.
        </div>
      ) : tasks && tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map((task: any) => (
            <div
              key={task._id}
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
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
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
          No tasks assigned yet. Create a task to stay on top of your pipeline.
        </div>
      )}
    </div>
  );
}