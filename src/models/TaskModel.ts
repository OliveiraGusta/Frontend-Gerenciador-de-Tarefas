import axios from 'axios';

const API_URL = "http://localhost:8000/api";

interface Task {
  id: number;
  title: string;
  description: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export const TaskModel = {
  async createTask(userId: number, token: string, taskData: { title: string; description: string; status: number }): Promise<Task> {
    try {
      const response = await axios.post(`${API_URL}/users/${userId}/tasks`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  },

  async getTasks(userId: number, token: string): Promise<Task[]> {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  async updateTask(userId: number, taskId: number, token: string, taskData: { title: string; description: string; status: number }): Promise<Task> {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}/tasks/${taskId}`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  },

  async deleteTask(userId: number, taskId: number, token: string): Promise<void> {
    try {
      const response = await axios.delete(`${API_URL}/users/${userId}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      throw error;
    }
  },


};
