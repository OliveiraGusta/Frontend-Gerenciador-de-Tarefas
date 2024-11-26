<template>
    <div class="flex flex-col gap-4">
      <h3 class="font-bold text-lg">Filtro e Ordenação</h3>

       <p>Status</p>
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
        <Button @click="toggleOrder" variant="outline"> <img src="@/assets/icons/FilterIcon.svg" class="h-6" /> 
          {{ selectedOrder === 'asc' ? 'Crescente' : 'Decrescente' }}
        </Button>

      </div>
    </div>
  </template>
  
<script setup lang="ts">
import {
Select,
SelectContent,
SelectGroup,
SelectItem,
SelectTrigger,
SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { ref, defineEmits } from 'vue';

const selectedStatus = ref("-");
const selectedSort = ref('created_at');
const selectedOrder = ref('asc');

const emit = defineEmits(['filterChanged']);

const updateStatus = () => emit('filterChanged', { type: 'status', value: selectedStatus.value });
const updateSort = () => emit('filterChanged', { type: 'sort', value: selectedSort.value });
const toggleOrder = () => {
    selectedOrder.value = selectedOrder.value === 'asc' ? 'desc' : 'asc';
    emit('filterChanged', { type: 'order', value: selectedOrder.value });
};
</script>
  