<template>
    <Dialog>
      <DialogTrigger as-child>

        <Button variant="outline" class="py-2 mt-2" v-if="route.name === `dashboard`">
          <img src="@/assets/icons/SettingsIcon.svg" class="h-6" />
          Ir para Painel de Administrador
        </Button>

        <Button variant="outline" class="py-2 mt-2" v-else>
          <img src="@/assets/icons/SettingsIcon.svg" class="h-6" />
          Ir para Painel de Usuário
        </Button>
      </DialogTrigger>
      
      <DialogContent class="sm:max-w-[425px]">

        <DialogHeader  v-if="route.name === `dashboard`">
          <DialogTitle>Acesso a funções de Administrador</DialogTitle>
          <DialogDescription>
            Ao clicar em continuar, você será direcionado ao painel de administrador com suas funções exclusivas.
          </DialogDescription>
        </DialogHeader>
        
        <DialogHeader v-else>
          <DialogTitle>Acesso a funções de Usuário</DialogTitle>
          <DialogDescription>
            Ao clicar em continuar, você será direcionado ao painel de de usuário.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter class="mt-10">
          <Button variant="outline" @click="redirectDashboard()">
            <img src="@/assets/icons/SettingsIcon.svg" class="h-6" />
            Continuar
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { Button } from '@/components/ui/button';
  import { useRouter, useRoute } from 'vue-router';
  import { useAuthStore } from '@/stores/authStore';
  
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
  

const router = useRouter();
const route = useRoute(); 
const authStore = useAuthStore();

const isAdmin = authStore.user?.is_admin;

function redirectDashboard() {
    if (route.name === 'dashboard' && isAdmin) {
        router.push('/admin'); 
    } else {
        router.push('/home'); 
    }
}
</script>
  