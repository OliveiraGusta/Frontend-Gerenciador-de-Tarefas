<template>
  <div class="flex flex-col h-[95vh] mx-40 items-center xl:justify-center my-5 xl:flex-row gap-6 ">
    <!-- Left -->
    <div class="w-2/6 self-start">
      <Card>
        <CardContent class="py-5 flex flex-col gap-5">
          <UserProfile />
          <CreateTask @taskCreated="reloadListTasks" />
          <FilterTaks @filterChanged="updateFilters" />
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>

    <!-- Right -->
    <div class="w-4/6">
      <Card>
        <CardContent>
          <ListTasks :key="listTasksKey" :filters="filters"  />
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

import ListTasks from '@/components/layout/Task/ListTasks.vue';
import UserProfile from '@/components/layout/User/UserProfile.vue';
import CreateTask from '@/components/layout/Task/CreateTask.vue';
import FilterTaks from '@/components/layout/Task/FilterTaks.vue';
import { ref } from 'vue';

const listTasksKey = ref(0);

const reloadListTasks = () => {
  listTasksKey.value += 1;
};

const updateFilters = ({ type, value }) => {
  filters.value[type] = value;
};

const filters = ref({
  status: "-", 
  sort: 'created_at', 
  order: 'asc', 
});

</script>
