<template>
     <h1 class="text-xl font-bold my-3 gap-2 ">Nova Tarefa</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4  border-b pb-10">
       
        <div>
            <Input type="text" id="title" placeholder="Título" />
        </div>
        <div>
            <Input type="text" id="description" placeholder="Descrição" />
        </div>
        <div>
            <Select>
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
        </div>
        <div>
            <Button v-if="isLoading" disabled>
                <img src="@/assets/icons/AwaitIcon.svg" class="h-6 animate-spin" /> Aguarde
            </Button>
            <Button v-else variant="outline" @click="confirmAdd">
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
import { ref } from 'vue';

const isLoading = ref(false);

function confirmAdd() {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
}


</script>