<template>
  <div class="p-10">
    <ScrollArea class="w-auto h-[80vh]">
      <div v-if="isLoading">
        <div v-for="n in 5" :key="n" class="bg-white border mb-3 p-4 rounded-lg hover:bg-gray-50">
          <div class="flex justify-between items-center">
            <div>
              <Skeleton class="h-7 w-[150px] mb-2" />
              <Skeleton class="h-5 w-[300px]" />
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div v-for="task in filteredTasks" :key="task.id" class="bg-white border mb-3 p-4 rounded-lg hover:bg-gray-50">
        
          <div class="flex items-center gap-3">
            <UserPhoto :githubUsername="task.user.githubUsername" :size="80" />

            <div class="flex flex-col">
              <p class="text-sm">{{ task.user.name }}</p>
              <p class="text-sm">{{ task.user.email }}</p>
            </div>
        
          </div>
          <div class="flex justify-between items-center">
            <div>
              <p :class="{
                'font-semibold text-lg': task.status !== 2,
                'font-semibold text-lg line-through text-gray-500': task.status === 2
              }">
                {{ task.title }}
                <UpdateTask 
                  :id="task.id" 
                  :title="task.title" 
                  :description="task.description" 
                  :statusTask="task.status"
                  :statusTitleTask="getStatusText(task.status)" 
                  @taskUpdated="fetchTasks" 
                />
              </p>
              <p :class="getStatusClass(task.status)" class="py-2 rounded-full text-xs font-semibold">
                {{ getStatusText(task.status).toUpperCase() }}
              </p>
              <p class="break-words w-[50vh] text-gray-600">{{ task.description }}</p>
            </div>
            <div class="flex space-x-2 items-center">
              <p class="text-sm text-gray-500">
                Criação: {{ formatDate(task.created_at) }}
              </p>
              <div class="flex space-x-2">
                <CheckStatusTask :idTask="task.id" :statusTask="task.status" @taskUpdated="fetchTasks" />
              </div>
              <DeleteTask :idTask="task.id" :title="task.title" @taskDelete="fetchTasks" />
            </div>
          </div>
          <p class="text-sm text-end text-gray-500">
            Última alteração: {{ formatDate(task.updated_at) }}
          </p>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStore } from '@/stores/userStore';
import { TaskModel } from '@/models/TaskModel';
import { UserPhoto } from '@/components/ui/userPhoto';

import UpdateTask from '@/components/layout/Task/UpdateTask.vue';
import CheckStatusTask from "@/components/layout/Task/CheckStatusTask.vue";
import DeleteTask from '@/components/layout/Task/DeleteTask.vue';


export default {
  components: {
    Skeleton,
    ScrollArea,
    UpdateTask,
    CheckStatusTask,
    DeleteTask,
    UserPhoto,
  },
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const tasks = ref([]);
    const isLoading = ref(true);
    const userStore = useUserStore();
    const token = localStorage.getItem("token");

    const fetchTasks = async () => {
      if (userStore.userState.user && token) {
        isLoading.value = true;
        try {
          tasks.value = await TaskModel.AdminGetAllTasks(token);
        } catch (error) {
          console.error("Erro ao buscar tarefas:", error);
        } finally {
          isLoading.value = false;
        }
      } else {
        console.error("Usuário não autenticado");
      }
    };

    onMounted(async () => {
      if (!userStore.userState.user) {
        await userStore.fetchUser();
      }
      await fetchTasks();
    });

    const getStatusClass = (status) => {
      switch (status) {
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

    const getStatusText = (status) => {
      switch (status) {
        case 0:
          return "Pendente";
        case 1:
          return "Em andamento";
        case 2:
          return "Concluída";
        default:
          return "Desconhecido";
      }
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString('pt-BR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const filteredTasks = computed(() => {
      let result = tasks.value;
      if (props.filters.status !== "-") {
        result = result.filter(task => task.status == props.filters.status);
      }

      if (props.filters.user !== "-") {
        result = result.filter(task => task.user.id == props.filters.user);
      }

      const { sort, order } = props.filters;
      result = result.sort((a, b) => {
        const fieldA = new Date(a[sort]);
        const fieldB = new Date(b[sort]);
        return order === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      });

      return result;
    });

    return {
      tasks,
      isLoading,
      fetchTasks,
      getStatusText,
      getStatusClass,
      formatDate,
      filteredTasks,
    };
  },
};
</script>
