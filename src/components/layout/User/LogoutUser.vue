<template>
    <Dialog>
        <DialogTrigger as-child>
        <Button variant="link"><img src="@/assets/icons/LogoutIcon.svg" class="h-6"/></Button>
        </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
        <DialogTitle>Encerrar sessão</DialogTitle>
        <DialogDescription>
            Você realmente quer encerrar essa sessão
        </DialogDescription>
        </DialogHeader>
    <DialogFooter class="mt-10">
        <Button variant="outline" @click="logout"><img src="@/assets/icons/LogoutIcon.svg" class="h-6"/>Confirmar</Button>
    </DialogFooter>
    </DialogContent>
    </Dialog>
</template>

<script setup lang="ts" >
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const router = useRouter();

function logout() {
  localStorage.removeItem('token'); 
  localStorage.removeItem('route');  
  router.push('/login');
}

</script>