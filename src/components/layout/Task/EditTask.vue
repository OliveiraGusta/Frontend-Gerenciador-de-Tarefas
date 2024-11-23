<template>
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="link"><img src="@/assets/icons/EditIcon.svg" class="h-5" /></Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle class="flex items-center justify-between">
            Editar tarefa
            <span :class="{
              'text-red-700': localStatus === 'pendente',
              'text-blue-700': localStatus === 'em andamento',
              'text-green-700': localStatus === 'concluída'
            }" class="py-2 px-5 rounded-full text-xs font-semibold">
              {{ localStatus.toUpperCase() }}
            </span>
          </DialogTitle>    
          <DialogDescription class="flex flex-col gap-3">
            <div class="my-2">Edite os campos da tarefas e depois salve as alteração.</div>
            <Input type="text" id="title" v-model="localTitle" />
            <Input type="text" id="description" v-model="localDescription" />
            <Input type="date" id="date"  v-model="localDate"/>
            <Input type="time" id="hour" v-model="localHour"/>
          </DialogDescription>
        </DialogHeader>
            <DialogFooter class="mt-10">
            <Button v-if="isLoading" disabled>
                <img src="@/assets/icons/AwaitIcon.svg" class="h-6 animate-spin" />Aguarde</Button>
            <Button variant="outline" @click="confirmEdit">
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps({
  id: Number,
  title: String,
  description: String,
  statusTask: String,
  created_Task: String,
  updated_Task: String,
});

const isLoading = ref(false);
const localTitle = ref('');
const localDescription = ref('');
const localStatus = ref('');
const localDate = ref('');
const localHour = ref('');

onMounted(() => {
  localTitle.value = props.title;
  localDescription.value = props.description;
  localStatus.value = props.statusTask;

  if (props.created_Task) {
    const dateObject = new Date(props.created_Task); 
    localDate.value = dateObject.toISOString().split('T')[0]; 
    localHour.value = dateObject.toTimeString().slice(0, 5); 
  }
});

function confirmEdit() {
  isLoading.value = true;
  console.log({
    id: props.id,
    title: localTitle.value,
    description: localDescription.value,
    status: localStatus.value,
    created_Task: `${localDate.value}T${localHour.value}`,
  });
}
</script>
