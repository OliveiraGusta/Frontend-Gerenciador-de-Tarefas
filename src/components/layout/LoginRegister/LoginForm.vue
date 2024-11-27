<template>
  <Card class="px-12 rounded-2xl border border-[#363636]">
    <CardHeader>    
      <CardTitle class="flex justify-center mt-8">
        <img src="@/assets/logo.svg" alt="Logo" class="h-7" />
      </CardTitle>
      <CardDescription class="self-center">Primeira vez aqui?<Button variant="link"  @click="goToSignUp">FAÇA SEU CADASTRO</Button></CardDescription>
    </CardHeader>
    
    <CardContent>
      <h1 class="text-xl font-bold my-4">Perfil</h1>
      <div class="gap-5 flex ">
        <UserPhoto />
        <form>
          <Input type="email" v-model="email" class="my-2" placeholder="Seu email" />
          <Input type="password"  v-model="password" class="my-2" placeholder="Sua senha" />
        </form>
      </div>

      <div v-show="false">
        <h1 class="text-xl font-bold my-3 gap-2">Cores</h1>
        <div>
          <form class="space-y-2">

            <div id="colorPrimary" class="flex justify-between">
              <div class="w-10 h-10 ml-8 bg-[#363636] border-2 border-[#FFFFFF]  rounded-full"></div>
              <Input type="text" placeholder="Principal" class="w-3/2"/>
            </div>

            <div id="colorBackground" class="flex justify-between">
              <div class="w-10 h-10 ml-8 bg-[#FFFFFF] border-2 border-[#363636] rounded-full"></div>
              <Input type="text" placeholder="Fundo" class="w-3/2"/>
            </div>
          
            <div class="flex justify-end">
              <Button variant="link" @click=""><img src="@/assets/icons/SunIcon.svg" class="h-6"/>Claro</Button>
              <Button variant="link" @click=""><img src="@/assets/icons/MoonIcon.svg" class="h-6"/>Escuro</Button>
            </div>
          </form>
        </div>
    </div>
    </CardContent>
    
    <CardFooter class="flex flex-col items-center ">
      <h1 v-if="showErrorLogin" class="self-start my-4 text-red-700">Email ou senha incorretos</h1>
      <Button v-if="!isLoading" variant="outline"  @click="submit" >
        <img src="@/assets/icons/CheckIcon.svg" class="h-6"/>Começar 
      </Button>

      <Button v-if="isLoading" disabled>
        <img src="@/assets/icons/AwaitIcon.svg" class="h-6 animate-spin" />Aguarde
      </Button>

    </CardFooter>
  </Card>

</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserPhoto } from '../../ui/userPhoto';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/authService'; 

const router = useRouter();
function goToSignUp() {
  router.push('/signup');
}

const isLoading = ref(false);
const showErrorLogin = ref(false);
const email = ref<string>('');
const password = ref<string>('');
async function submit() {
  isLoading.value = true;
  try {
    const response = await authService.login(email.value, password.value);
    localStorage.setItem('token', response.access_token); 
    router.push('/home'); 
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    showErrorLogin.value = true;
  } finally {
    isLoading.value = false;
  }
}

</script>