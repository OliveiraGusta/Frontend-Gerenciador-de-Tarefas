<template>
  <div class="p-10">
    <ScrollArea class="w-auto h-[80vh]">
      <div 
        v-for="(task, index) in tasks" 
        :key="task.id" 
        class="bg-white border mb-3 p-4 rounded-lg hover:bg-gray-50"
      >
        <div class="flex justify-between items-center">
          <div>
            <p :class="{
              'font-semibold text-lg': task.status !== 'completed',
              'font-semibold text-lg line-through text-gray-500': task.status === 'completed'
            }">
              {{ task.title }}
              <EditTask 
                :id="task.id"  
                :title="task.title" 
                :description="task.description" 
                :statusTask="task.status" 
                :created_Task="task.created_at"
              />
            </p>
            <p :class="{
              'text-red-700': task.status === 'pending',
              'text-blue-700': task.status === 'in progress',
              'text-green-700': task.status === 'completed'
            }" class="py-2 rounded-full text-xs font-semibold">
              {{ task.status.toUpperCase() }}
            </p>
            <p class="break-words w-[50vh] text-gray-600">{{ task.description }}</p>
          </div>
          <div class="flex space-x-1 items-center">
            <p class="text-sm text-gray-500">
              Criação: 
              {{ new Date(task.created_at).toLocaleString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
            </p>
            <div class="flex space-x-2">
              <Button variant="link" v-if="task.status === 'em andamento'">
                <img src="@/assets/icons/CheckIcon.svg" class="h-6" />
              </Button>
              <Button variant="link" v-if="task.status === 'pendente'">
                <img src="@/assets/icons/CheckPointsIcon.svg" class="h-6" />
              </Button>
              <Button variant="link" v-if="task.status === 'concluída'">
                <img src="@/assets/icons/CheckOffIcon.svg" class="h-6" />
              </Button>
            </div>
            <DeleteTask :id="task.id" :title="task.title" />
          </div>
        </div>
        <p class="text-sm text-end text-gray-500">
          Última alteração: 
          {{ new Date(task.updated_at).toLocaleString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}
        </p>
      </div>
    </ScrollArea>
  </div>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { TaskModel } from '@/models/TaskModel';

import EditTask from '@/components/layout/Task/EditTask.vue';
import DeleteTask from '@/components/layout/Task/DeleteTask.vue';
import { useUserStore } from '@/stores/userStore'; 

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default {
  name: 'ListTasks',
  components: {
    ScrollArea,
    Button,
    EditTask,
    DeleteTask
  },
  setup() {
    const userStore = useUserStore();
    const tasks = ref<Task[]>([]);
    const token = localStorage.getItem('token')

    const fetchTasks = async () => {
      if (userStore.userState.user && token) {
        
        try {
          tasks.value = await TaskModel.getTasks(userStore.userState.user.id, token); 
        } catch (error) {
          console.error('Erro ao buscar tarefas:', error);
        }
      } else {
        console.error('Usuário não autenticado');
      }
    };

    onMounted(async () => {
      if (!userStore.userState.user) {
        await userStore.fetchUser();
      }
      await fetchTasks();
    });

    return {
      tasks,
      userStore
    };
  }
};
</script>