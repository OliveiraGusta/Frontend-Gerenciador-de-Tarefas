import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

interface LoginResponse {
  access_token: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  githubUsername: string;
}

export const authService = {
  
  async login(email: string, password: string): Promise<LoginResponse> {
    const data = { email, password };
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, data);
    return response.data;
  },

  async validateToken(): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.get<User>(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
