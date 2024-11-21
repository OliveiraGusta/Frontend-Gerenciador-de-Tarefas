<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    await authStore.fetchUser();
    if (router.currentRoute.value.name === 'login') {
      router.push('/home');
    }
  } catch {
    // Token  invalid -> redireciona para login
    if (router.currentRoute.value.name !== 'login') {
      router.push('/login');
    }
  }
});
</script>
