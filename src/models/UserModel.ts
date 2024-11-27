import axios from "axios";

const API_URL = "http://localhost:8000/api";

interface User {
  name: string;
  email: string;
  githubUsername: string;
}

export const UserModel = {
  async deleteAccount(token: string): Promise<void> {
    await axios.delete(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  
 // Admin
 async getAllUsers(token: string): Promise<User[]> {
  try {
    const response = await axios.get(`${API_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
},
  
};
