import axios from 'axios';
import { Task } from '../models/Task';

const BASE_URL = 'http://localhost:4000/tasks';

export const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  getById: async (id: number): Promise<Task> => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  create: async (task: Omit<Task, 'id' | 'createdDate'>): Promise<Task> => {
    const response = await axios.post(BASE_URL, task);
    return response.data;
  },

  updateStatus: async (id: number, status: string): Promise<Task> => {
    const response = await axios.patch(`${BASE_URL}/${id}/status`, { status });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  }
};


