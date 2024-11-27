import { defineStore } from 'pinia';
import { authService } from '@/services/authService';

interface User {
  name: string;
  email: string;
  githubUsername: string;
  is_admin: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async login(email: string, password: string) {
      const { access_token, user } = await authService.login(email, password);
      this.token = access_token;
      localStorage.setItem('token', access_token);

      this.user = user;
    },

    async fetchUser() {
      try {
        const user = await authService.validateToken();
        this.user = user;
      } catch {
        this.logout();
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});
