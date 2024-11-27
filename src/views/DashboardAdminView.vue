<template>
  <div class="flex flex-col h-[95vh] mx-40 items-center xl:justify-center my-5 xl:flex-row gap-6 ">
    <!-- LEFT -->
    <div class="w-2/6 self-start">
      <Card>
        
        <CardContent class="py-5 flex flex-col gap-5">
          <h1 class="text-xl pt-2 font-bold flex items-center gap-3"><img src="@/assets/icons/SettingsIcon.svg" class="h-6" />Painel Administrativo</h1>
          <UserProfile />
          <FilterTaks @filterChanged="updateFilters" />
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>

    <!-- RIGHT -->
    <div class="w-4/6">
      <Card>
        <CardContent>
          <ListAllTasks :key="listTasksKey" :filters="filters"  />
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  </div>

</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

import ListAllTasks from '@/components/layout/Admin/ListAllTasks.vue';
import UserProfile from '@/components/layout/User/UserProfile.vue';
import FilterTaks from '@/components/layout/Task/FilterTaks.vue';
import { ref } from 'vue';

const listTasksKey = ref(0);

const updateFilters = ({ type, value }) => {
  filters.value[type] = value;
};

const filters = ref({
  status: "-", 
  sort: 'created_at', 
  order: 'asc', 
  user: '-', 
});

</script>
