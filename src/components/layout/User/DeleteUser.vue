<template>
        <Dialog>
            <DialogTrigger as-child>
              <Button variant="link"><img src="@/assets/icons/TrashIcon.svg" class="h-6"/></Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Deletar sua conta</DialogTitle>
                <DialogDescription>
                  Você realmente quer deletar sua conta, todos os seus dados serão perdidos.
                </DialogDescription>
              </DialogHeader>
                <DialogFooter class="mt-10 text-red-700">
                  <Button v-if="isLoading" disabled>
                    <img src="@/assets/icons/AwaitIcon.svg" class="h-6 animate-spin" />Aguarde</Button>
                  <Button variant="outline" @click="deleteAccount"><img src="@/assets/icons/TrashIcon.svg" class="h-6"/>Confirmar</Button>
                </DialogFooter>
            </DialogContent>
          </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { UserModel } from '@/models/UserModel';

const isLoading = ref(false);
const router = useRouter();
const { userState } = useUserStore();

async function deleteAccount() {
  isLoading.value = true;
  try {
    const token = localStorage.getItem('token')
    
    if (!token) {
      isLoading.value  = false;
      throw new Error('Usuário não encontrado')
    }

    await UserModel.deleteAccount(token)
    userState.user = null
    localStorage.removeItem('token')
    router.push('/login')
  } catch (error) {
    console.error('Erro ao deletar conta:', error)
    alert('Erro ao deletar conta. Tente novamente.');
    isLoading.value = false;
  }
}
</script>