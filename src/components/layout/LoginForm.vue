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
        <UserPhoto/>
        <form>
          <Input type="email" v-model="email" class="my-2" placeholder="Seu email" />
          <Input type="password"  v-model="password" class="my-2" placeholder="Sua senha" />
        </form>
      </div>

      <div v-if="2 == 1">
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
      <Button variant="outline" class="px-10"  @click="submit" >
        <img src="@/assets/icons/CheckIcon.svg" class="h-6"/>
        Começar 
      </Button>
    </CardFooter>
  </Card>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'; 
import { useRouter } from 'vue-router';
const router = useRouter();


function goToSignUp() {
  router.push('/signUp');
}



const email = ref('');
const password = ref('');

async function submit() {
  const data = { email: email.value, password: password.value };

  try {
    const response = await axios.post('/login', data);
    console.log('Resposta do servidor:', response.data);
    localStorage.setItem('token', response.data.acess_token);
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
}


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
import { UserPhoto } from '../ui/userPhoto';

</script>