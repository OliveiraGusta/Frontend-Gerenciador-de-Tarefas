<template>
  <div v-if="isAdmin" >
    <Button v-if="isLoading" variant="link">
      <img src="@/assets/icons/AwaitIcon.svg" class="h-6 animate-spin" /> 
    </Button>
    <Button variant="link" @click="AdminUpdate" v-else-if="props.statusTask == 0">
      <img src="@/assets/icons/CheckOffIcon.svg" class="h-6 transition-transform duration-200 hover:scale-110" />
    </Button>
    <Button variant="link" @click="AdminUpdate" v-else-if="props.statusTask == 1">
      <img src="@/assets/icons/CheckPointsIcon.svg" class="h-6 transition-transform duration-200 hover:scale-110" />
    </Button>
    <Button variant="link" @click="AdminUpdate" v-else>
      <img src="@/assets/icons/CheckIcon.svg" class="h-6 transition-transform duration-200 hover:scale-110" />
    </Button>
  </div>

  <div v-else>
    <Button v-if="isLoading" variant="link">
      <img src="@/assets/icons/AwaitIcon.svg" class="h-6 animate-spin" />
    </Button>
    <Button variant="link" @click="update" v-else-if="props.statusTask == 0">
      <img src="@/assets/icons/CheckOffIcon.svg" class="h-6 transition-transform duration-200 hover:scale-110" />
    </Button>
    <Button variant="link" @click="update" v-else-if="props.statusTask == 1">
      <img src="@/assets/icons/CheckPointsIcon.svg" class="h-6 transition-transform duration-200 hover:scale-110" />
    </Button>
    <Button variant="link" @click="update" v-else>
      <img src="@/assets/icons/CheckIcon.svg" class="h-6 transition-transform duration-200 hover:scale-110" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { Button } from '@/components/ui/button';
import { TaskModel } from '@/models/TaskModel';

import { defineEmits } from 'vue';
const emit = defineEmits(['taskUpdated']);

import { useUserStore } from '@/stores/userStore';
const { userState } = useUserStore();

const props = defineProps({
  idTask: Number,
  statusTask: Number,
});

const isLoading = ref(false);

import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore();
const isAdmin = authStore.user?.is_admin

async function update() {
  isLoading.value = true;
  const token = localStorage.getItem('token');
  if (!token || !userState.user) {
    alert('Usuário não autenticado');
    return;
  }

  const localStatus = ref(0);

  if (props.statusTask === 0) {
    localStatus.value = 1;
  } else if (props.statusTask === 1) {
    localStatus.value = 2;
  } else {
    localStatus.value = 0;
  }

  try {
    const taskData = {
      status: localStatus.value,
    };
    await TaskModel.updateTask(userState.user.id, props.idTask, token, taskData);
    isLoading.value = false;
    emit('taskUpdated');

  } catch (error) {
    isLoading.value = false;
    console.error('Erro ao atualizar tarefa:', error);
  }
}

async function AdminUpdate() {
  isLoading.value = true;
  const token = localStorage.getItem('token');
  if (!token || !userState.user) {
    alert('Usuário não autenticado');
    return;
  }

  const localStatus = ref(0);

  if (props.statusTask === 0) {
    localStatus.value = 1;
  } else if (props.statusTask === 1) {
    localStatus.value = 2;
  } else {
    localStatus.value = 0;
  }

  try {
    const taskData = {
      status: localStatus.value,
    };
    await TaskModel.AdminUpdateTask(props.idTask, token, taskData);
    isLoading.value = false;
    emit('taskUpdated');

  } catch (error) {
    isLoading.value = false;
    console.error('Erro ao atualizar tarefa:', error);
  }
}

</script>