import { reactive } from 'vue';
import { fetchUserData } from '@/services/userService.ts';

interface User {
  name: string;
  email: string;
  githubUsername: string;
}

const userState = reactive({
  user: null as User | null,
  isLoading: false,
  error: null as string | null,
});

export const useUserStore = () => ({
  userState,
  async fetchUser() {
    userState.isLoading = true;
    try {
      const userData = await fetchUserData();
      userState.user = userData;
      userState.error = null;
    } catch (error) {
      userState.error = 'Erro ao carregar os dados do usuário.';
    } finally {
      userState.isLoading = false;
    }
  },
});
