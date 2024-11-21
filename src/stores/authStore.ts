import { defineStore } from 'pinia';
import { authService } from '@/services/authService';

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
      const { access_token } = await authService.login(email, password);
      this.token = access_token;
      localStorage.setItem('token', access_token);
      await this.fetchUser();
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
