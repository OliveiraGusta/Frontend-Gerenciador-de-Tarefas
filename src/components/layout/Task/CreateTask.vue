<template>
    <h1 class="text-xl font-bold my-3 gap-2">Nova Tarefa</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-10">
        <div>
            <Input type="text" id="title" v-model="localTitle" placeholder="Título" />
        </div>
        <div>
            <Input type="text" id="description" v-model="localDescription" placeholder="Descrição" />
        </div>
        <div>
            <Select v-model="localStatus">
                <SelectTrigger>
                    <SelectValue placeholder="Selecione o status da Tarefa" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="0">Pendente</SelectItem>
                        <SelectItem value="1">Em andamento</SelectItem>
                        <SelectItem value="2">Concluída</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <p class="text-sm text-gray-950 mt-2"><b>Pendente</b> como padrão</p>
        </div>
        <div>
            <Button v-if="isLoading" disabled>
                <img src="@/assets/icons/AwaitIcon.svg" class="h-6 animate-spin" /> Aguarde
            </Button>
            <Button v-else variant="outline" @click="create">
                <img src="@/assets/icons/PaperIcon.svg" class="h-6" /> Adicionar Tarefa
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

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TaskModel } from '@/models/TaskModel';
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';

import { defineEmits } from 'vue';
const emit = defineEmits(['taskCreated']);

const { userState } = useUserStore();

const isLoading = ref(false);
const localTitle = ref('');
const localDescription = ref('');
const localStatus = ref(0);


async function create() {
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

        await TaskModel.createTask(userState.user.id, token, taskData);

        emit('taskCreated');

        localTitle.value = '';
        localDescription.value = '';
        localStatus.value = 0;

    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
    } finally {
        isLoading.value = false;
    }
}
</script>
