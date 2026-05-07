import { create } from 'zustand';

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  assignee?: string;
};

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  toggleTask: (id: string) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
