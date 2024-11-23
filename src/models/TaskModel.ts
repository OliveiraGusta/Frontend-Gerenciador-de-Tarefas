import axios from 'axios';

const API_URL = "http://localhost:8000/api";


interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const TaskModel = {
  async getTasks(userId: number, token: string): Promise<Task[]> {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}/tasks`,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
};
