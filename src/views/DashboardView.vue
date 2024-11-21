<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

import ListTasks from '@/components/layout/ListTasks.vue';
import UserProfile from '@/components/layout/UserProfile.vue';

</script>

<template>
<div class="flex flex-col h-[100vh] items-start my-5 md:flex-row gap-6 mx-40">

  <!-- User profile  -->
  <div class="w-2/6">
      <Card>
        <CardContent>
          <UserProfile />
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>

  <!-- List tasks -->
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
