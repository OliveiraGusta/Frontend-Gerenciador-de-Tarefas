<template>
  <div class="flex flex-col gap-4">
    <h3 class="font-bold text-lg">Filtro e Ordenação</h3>

    <div v-if="isAdmin" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      <div class="flex gap-2">
        <Select v-model="selectedStatus" @update:modelValue="updateStatus">
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="-">Todos</SelectItem>
              <SelectItem value="0">Pendente</SelectItem>
              <SelectItem value="1">Em andamento</SelectItem>
              <SelectItem value="2">Concluída</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>  

      <div class="flex gap-2">
        <Select v-model="selectedUser" @update:modelValue="updateUser">
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por usuário" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="-">Todos</SelectItem>
              <template v-for="user in users" :key="user.id">
                <SelectItem :value="user.id">
                  {{ user.name }} ({{ user.email }})
                </SelectItem>
              </template>
            </SelectGroup>
          </SelectContent>
        </Select>
  </div>

    </div> 
    
    <div v-else class="flex gap-2">
        <Select v-model="selectedStatus" @update:modelValue="updateStatus">
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="-">Todos</SelectItem>
              <SelectItem value="0">Pendente</SelectItem>
              <SelectItem value="1">Em andamento</SelectItem>
              <SelectItem value="2">Concluída</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>  

    
    
    

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <!-- Ordenação -->
    <div class="flex gap-2">
        <Select v-model="selectedSort" @update:modelValue="updateSort">
          <SelectTrigger>
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at">Data de Criação</SelectItem>
            <SelectItem value="updated_at">Data de Atualização</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Button @click="toggleOrder" variant="outline"> <img src="@/assets/icons/FilterIcon.svg" class="h-6" />
          {{ selectedOrder === 'asc' ? 'Crescente' : 'Decrescente' }}
        </Button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/userStore';
import { UserModel } from '@/models/UserModel';


const userStore = useUserStore(); 
const selectedStatus = ref('-'); 
const selectedSort = ref('created_at'); 
const selectedOrder = ref('asc');
const selectedUser = ref('-'); 
const users = ref([]); 
const isLoading = ref(false);

import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore();
const isAdmin = authStore.user?.is_admin

const emit = defineEmits(['filterChanged']);

const updateStatus = () => emit('filterChanged', { type: 'status', value: selectedStatus.value });
const updateSort = () => emit('filterChanged', { type: 'sort', value: selectedSort.value });
const toggleOrder = () => {
  selectedOrder.value = selectedOrder.value === 'asc' ? 'desc' : 'asc';
  emit('filterChanged', { type: 'order', value: selectedOrder.value });
};

const updateUser = (value: string) => {
  selectedUser.value = value;
  emit('filterChanged', { type: 'user', value });
};

const fetchUsers = async () => {
  const token = localStorage.getItem('token'); 
  if (userStore.userState.user && token) {
    isLoading.value = true; 
    try {
      const response = await UserModel.getAllUsers(token); 
      users.value = response.users; 
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      isLoading.value = false; 
    }
  } else {
    console.error('Usuário não autenticado');
  }
};

onMounted(async () => {
  if (!userStore.userState.user) {
    await userStore.fetchUser();
  }
  await fetchUsers(); 
});
</script>


