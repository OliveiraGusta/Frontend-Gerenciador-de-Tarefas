<template>
  <div class="gap-5 flex items-center border-b pt-4 pb-7">
    <UserPhoto class="h-32" :githubUsername="githubUsername" :hasGithub="hasGithubUsername" />
    <div v-if="userState.isLoading">
      <div class="flex flex-col gap-2">
        <Skeleton class="h-7 w-[150px]" />
        <Skeleton class="h-4 w-[230px]" />
        <Skeleton class="h-4 w-[200px]" />
        <div class="flex gap-3">
          <Skeleton class="h-5 w-[50px]" />
          <Skeleton class="h-5 w-[50px]" />
        </div>
      </div>
    </div>
    <div v-else-if="userState.error">{{ userState.error }}</div>
    <div v-else>
      <p class="text-2xl font-bold">{{ userState.user?.name }}</p>
      <p>{{ userState.user?.email }}</p>
      <p v-if="githubUsername.length > 3">
        <a :href="`https://github.com/${userState.user?.githubUsername}`" target="_blank" class="underline" rel="noopener noreferrer">
          github.com/{{ userState.user?.githubUsername }}
        </a>
      </p>
        <DeleteUser/>
        <LogoutUser/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { UserPhoto } from '@/components/ui/userPhoto';
import { Skeleton } from '@/components/ui/skeleton'

import DeleteUser from '@/components/layout/User/DeleteUser.vue';
import LogoutUser from '@/components/layout/User/LogoutUser.vue';

const { userState, fetchUser } = useUserStore();
const githubUsername = computed(() => userState.user?.githubUsername ?? '');
const hasGithubUsername = computed(() => githubUsername.value.length > 2);

onMounted(() => {
  fetchUser();
});

</script>
