import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const UserModel = {
  async deleteAccount(token: string): Promise<void> {
    await axios.delete(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  
};
