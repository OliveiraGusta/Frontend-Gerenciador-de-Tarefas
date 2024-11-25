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

</script>

<template>
<div class="flex flex-col h-[95vh] mx-40 items-center xl:justify-center my-5 xl:flex-row gap-6 ">
  <!-- Left -->
  <div class="w-2/6 self-start">
      <Card>
        <CardContent class="py-5 flex flex-col gap-5">
          <UserProfile />
          <CreateTask />
          <FilterTaks />
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>

  <!-- Right -->
  <div class="w-4/6">
    <Card>
      <CardContent>
        <ListTasks />
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  </div>
</div>
</template>

<style scoped>

</style>
