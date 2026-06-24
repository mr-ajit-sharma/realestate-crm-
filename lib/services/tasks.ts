// lib/services/tasks.ts
import { api } from '@/lib/api';
import {CreateTaskInput} from '@/types/index'


export const tasksApi = {
  getTasks: (params?: any) => api.get('/tasks', { params }),
  createTask: (data: CreateTaskInput) => api.post('/tasks', data),
  completeTask: (id: string) => api.patch(`/tasks/${id}/complete`),
  updateTask: (id: string, data: any) => api.put(`/tasks/${id}`, data),
  deleteTask: (id: string) => api.delete(`/tasks/${id}`),
};