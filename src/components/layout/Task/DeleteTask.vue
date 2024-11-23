<template>
        <Dialog>
              <DialogTrigger as-child>
                <Button variant="link"><img src="@/assets/icons/TrashIcon.svg" class="h-6"/></Button>
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
                      <img src="@/assets/icons/AwaitIcon.svg" class="h-6 animate-spin" />Aguarde</Button>
                    <Button variant="outline" @click="deleteTask"><img src="@/assets/icons/TrashIcon.svg" class="h-6"/>Confirmar</Button>
                  </DialogFooter>
              </DialogContent>
            </Dialog>
</template>

<script setup type="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button';

const props = defineProps({
  id: Number,
  title: String,
});


function deleteTask() {
  //isLoading.value = true;
  console.log('Excluir tarefa: Id', taskId);
  //isLoading.value = false;
}
</script>