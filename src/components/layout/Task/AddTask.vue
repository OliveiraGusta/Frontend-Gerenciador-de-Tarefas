<template>
    <div class="border-b pb-10">
        <h1 class="text-xl font-bold my-3 gap-2 ">Nova Tarefa</h1>
        <div class="flex flex-col gap-3"> 
            <div class="grid grid-cols-2 gap-4">
            <div>
                <Input type="text" id="title" placeholder="Título"/>
            </div>
            <div>
                <Input type="text" id="description" placeholder="Descrição" />
            </div>
            </div>
        </div>
    <div class="mt-10">
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