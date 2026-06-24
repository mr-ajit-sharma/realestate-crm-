'use client';

import { useState } from 'react';
import { useTasks, useCreateTask } from '@/hooks/useTasks';
import { formatDate, formatMonthYear } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import AddTaskModal from '@/components/common/AddTaskModal';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tasks = [], isLoading } = useTasks();
  const createTaskMutation = useCreateTask();

  // Filter tasks for current month
  const currentMonthTasks = tasks.filter((task: any) => {
    const taskDate = new Date(task.dueDate);
    return taskDate.getMonth() === currentDate.getMonth() &&
           taskDate.getFullYear() === currentDate.getFullYear();
  });

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (dateStr: string) => {
    setSelectedDate(dateStr);
    setIsModalOpen(true);
  };

  const handleCreateTask = async (formData: any) => {
    try {
      await createTaskMutation.mutateAsync(formData);
      setIsModalOpen(false);
      setSelectedDate(null);
      alert('Task added successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create task');
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    // Previous month empty slots
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 dark:bg-gray-900" />);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayTasks = currentMonthTasks.filter((task: any) => 
        task.dueDate?.startsWith(dateStr)
      );

      const isToday = dateStr === new Date().toISOString().split('T')[0];

      days.push(
        <div 
          key={day}
          onClick={() => handleDateClick(dateStr)}
          className={`h-24 border border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors relative ${isToday ? 'bg-blue-50 dark:bg-blue-900/30 ring-1 ring-blue-500' : ''}`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-blue-600 font-semibold' : ''}`}>
            {day}
          </div>
          
          {dayTasks.length > 0 && (
            <div className="mt-1 space-y-1">
              {dayTasks.slice(0, 3).map((task: any) => (
                <div key={task._id} className="text-[10px] bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-200 px-1.5 py-0.5 rounded truncate">
                  {task.title}
                </div>
              ))}
              {dayTasks.length > 3 && (
                <div className="text-[10px] text-gray-500 dark:text-gray-400">+{dayTasks.length - 3} more</div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage your meetings, site visits and follow-ups
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <Plus className="h-5 w-5" />
          New Task
        </button>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <button 
          onClick={goToPreviousMonth} 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {formatMonthYear(currentDate)}
        </h2>

        <button 
          onClick={goToNextMonth} 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {generateCalendarDays()}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-semibold mb-4">Upcoming This Month</h3>
        {currentMonthTasks.length > 0 ? (
          <div className="space-y-3">
            {currentMonthTasks.slice(0, 6).map((task: any) => (
              <div key={task._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-500">{formatDate(task.dueDate)}</p>
                </div>
                <div className="text-sm px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                  {task.taskType}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">No tasks scheduled for this month</p>
        )}
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDate(null);
        }}
        onSubmit={handleCreateTask}
        isLoading={createTaskMutation.isPending}
        defaultDate={selectedDate || undefined}
      />
    </div>
  );
}