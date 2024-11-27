import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import DashboardView from '@/views/DashboardView.vue'
import DashboardAdminView from '@/views/DashboardAdminView.vue'

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signUp',
      component: SignUpView,
    },
    {
      path: '/home',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: DashboardAdminView,
      meta: { requiresAuth: true,  requiresAdminAcess: true},
    },
  ],
})
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    if (!authStore.token) {
      return next({ name: 'login' });
    }

    if (!authStore.user) {
      await authStore.fetchUser();
    }

    if (to.meta.requiresAdminAcess && !authStore.user?.is_admin) {
      return next({ name: 'dashboard' });
    }
  }

  next();
});

export default router;
