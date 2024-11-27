<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="link"><img src="@/assets/icons/TrashIcon.svg" class="h-6 transition-transform duration-200 hover:scale-110"  /></Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Deletar tarefa {{ props.title }}</DialogTitle>
        <DialogDescription>
          Você realmente quer deletar essa tarefa, todos os dados serão perdidos
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="mt-10 text-red-700">

        <Button v-if="isLoading" disabled>
          <img src="@/assets/icons/AwaitIcon.svg" class="h-6 animate-spin" />Aguarde
        </Button>

        <Button v-else-if="isAdmin" variant="outline" @click="AdminDeleteTask">
          <img src="@/assets/icons/TrashIcon.svg" class="h-6" />Confirmar
        </Button>

        <Button v-else variant="outline" @click="deleteTask">
          <img src="@/assets/icons/TrashIcon.svg" class="h-6" />Confirmar
        </Button>


      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TaskModel } from '@/models/TaskModel';

import { defineEmits } from 'vue';
const emit = defineEmits(['taskDelete']);

const isLoading = ref(false);
const router = useRouter();
const { userState } = useUserStore();

import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore();
const isAdmin = authStore.user?.is_admin


const props = defineProps({
  idTask: Number,
  title: String,
});

async function deleteTask() {
  isLoading.value = true;
  try {
    const token = localStorage.getItem('token');
    if (!token || !userState.user) {
      throw new Error('Usuário não autenticado.');
    }
    await TaskModel.deleteTask(userState.user.id, props.idTask, token);
    emit('taskDelete');
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    alert('Erro ao excluir a tarefa. Tente novamente.');
  } finally {
    isLoading.value = false;
  }
}

async function AdminDeleteTask() {
  isLoading.value = true;
  try {
    const token = localStorage.getItem('token');
    if (!token || !userState.user) {
      throw new Error('Usuário não autenticado.');
    }
    await TaskModel.AdminDeleteTask(props.idTask, token);
    emit('taskDelete');
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    alert('Erro ao excluir a tarefa. Tente novamente.');
  } finally {
    isLoading.value = false;
  }
}
  

</script>
