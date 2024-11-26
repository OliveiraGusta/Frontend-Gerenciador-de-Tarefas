<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="link"><img src="@/assets/icons/EditIcon.svg"
          class="h-5 transition-transform duration-200 hover:scale-110" /></Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="flex items-center justify-between">
          Editar tarefa
          <span :class="getStatusClass(props.statusTask)" class="py-2 px-5 rounded-full text-xs font-semibold">
            {{ props.statusTitleTask.toUpperCase() }}
          </span>
        </DialogTitle>
        <DialogDescription class="flex flex-col gap-3">
          <div class="my-2">Edite os campos da tarefa e depois salve as alterações.</div>
          <Input type="text" id="title" v-model="localTitle" />
          <Input type="text" id="description" v-model="localDescription" />
          <Select v-model="localStatus">
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status da tarefa" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Pendente</SelectItem>
                <SelectItem value="1">Em andamento</SelectItem>
                <SelectItem value="2">Concluída</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p>Caso não selecione nenhuma opção de Status, será escolhido automaticamente Pendente</p>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="mt-10">
        <Button v-if="isLoading" disabled>
          <img src="@/assets/icons/AwaitIcon.svg" class="h-6 animate-spin" />Aguarde</Button>
        <Button variant="outline" V-else @click="update">
          <img src="@/assets/icons/EditIcon.svg" class="h-6" />Salvar edição</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { defineProps, ref, onMounted } from 'vue';
import { TaskModel } from '@/models/TaskModel';
import { defineEmits } from 'vue';
const emit = defineEmits(['taskUpdated']);

const props = defineProps({
  id: Number,
  title: String,
  description: String,
  statusTitleTask: String,
  statusTask: Number,
});

import { useUserStore } from '@/stores/userStore';
const { userState } = useUserStore();

const isLoading = ref(false);
const localTitle = ref('');
const localDescription = ref('');
const localStatus = ref(props.statusTask);

onMounted(() => {
  localTitle.value = props.title;
  localDescription.value = props.description;
});


async function update() {
  isLoading.value = true;
  const token = localStorage.getItem('token');
  if (!token || !userState.user) {
    alert('Usuário não autenticado');
    isLoading.value = false;
    return;
  }

  try {
    const taskData = {
      title: localTitle.value,
      description: localDescription.value,
      status: localStatus.value,
    };

    console.log(taskData);
    await TaskModel.updateTask(userState.user.id, props.id, token, taskData);
    emit('taskUpdated');

  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
  } finally {
    isLoading.value = false;
  }
}

const getStatusClass = (statusTask: number) => {
  switch (statusTask) {
    case 0:
      return 'text-red-700';
    case 1:
      return 'text-blue-700';
    case 2:
      return 'text-green-700';
    default:
      return 'text-gray-700';
  }
};
</script>
