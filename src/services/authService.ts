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

interface RegisterResponse {
  message: string;
  user?: User;
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

  async register(
    name: string,
    email: string,
    password: string,
    githubUsername: string
  ): Promise<RegisterResponse> {
    try {
      const data = { name, email, password, githubUsername };
      const response = await axios.post<RegisterResponse>(`${API_URL}/register`, data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Error during registration');
      }
      throw error;
    }
  },

  
};
