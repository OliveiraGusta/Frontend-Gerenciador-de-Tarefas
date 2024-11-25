import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
const API_URL = 'http://localhost:8000/api';

export const fetchUserData = async () => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    throw new Error('Token não encontrado');
  }

  try {
    const response = await axios.get(`${API_URL}/user`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;  
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    router.push('/login');
    throw error;
  }
};
