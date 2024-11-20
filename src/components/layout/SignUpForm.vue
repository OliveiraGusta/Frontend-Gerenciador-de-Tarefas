<template>
  <Card class="px-12 rounded-2xl border border-[#363636] w-1/3 h-auto">
    
    <CardHeader>  
      <CardTitle class="flex justify-center mt-8 ">
        <img src="@/assets/logo.svg" alt="Logo" class="h-7" />
      </CardTitle>
      <CardDescription class="self-center">Já tem uma conta?<Button variant="link" @click="goToLogin">FAÇA SEU LOGIN</Button></CardDescription>
    </CardHeader>

    <CardContent>
      <h1 class="text-xl font-bold my-4">Perfil</h1>
      <div class="gap-5 flex ">
        <UserPhoto v-if="!github" />
      <img
        v-else
        :src="githubAvatar"
        alt="Logo"
        class="h-32 rounded-full border-2 border-[#363636]"
        @error="handleImageError"
      />
         
        <form>
          <Input type="text" v-model="name" class="my-2" placeholder="Seu nome" />
          <Input type="email" v-model="email" class="my-2" placeholder="Seu email" />
          <label>
            <Input type="text" v-model="github" class="my-2" placeholder="Seu github" />
            <p class="text-xs">Caso não tenha uma conta Github apenas deixe em branco</p>
          </label>

          <Input type="password" v-model="password" class="my-2" placeholder="Sua senha" />
          <Input type="password" v-model="confirmPassword" class="my-2" placeholder="Confirme sua senha" />
        </form>
      </div>
    </CardContent>
    <CardFooter class="flex flex-col gap-4 items-start">
      <div v-if="errors.length" class="flex flex-col gap-4 items-start">
      <h1 class="text-xl font-bold">Erros</h1>
      <div class="self-start text-red-800">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </div>
    </div>
      <Button variant="outline" class="px-10 self-center" @click="submit">
        <img src="@/assets/icons/UserAddIcon.svg" class="h-6" />
        Cadastrar
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
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
import { useRouter } from 'vue-router';

const router = useRouter();

function goToLogin() {
  router.push('/login');
}

const name = ref('');
const email = ref('');
const github = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref<string[]>([]);

const fallbackAvatar = './src/assets/UserIcon.png';

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = fallbackAvatar;
}

const githubAvatar = computed(() => {
  return github.value ? `https://github.com/${github.value}.png` : '';
});

function validateForm() {
  errors.value = []; 

  if (!name.value) errors.value.push('O campo Nome é obrigatório.');
  if (!email.value) errors.value.push('O campo Email é obrigatório.');
  if (!password.value) errors.value.push('O campo Senha é obrigatório.');
  if (!confirmPassword.value) errors.value.push('O campo Confirmar Senha é obrigatório.');
  if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
    errors.value.push('As senhas não coincidem.');
  }
}

async function submit() {
  validateForm();

  if (errors.value.length) {
    console.error('Existem erros no formulário:', errors.value);
    return;
  }

  const data = { name: name.value, email: email.value, password: password.value, github: github.value };

  try {
    const response = await axios.post('/signup', data);
    console.log('Resposta do servidor:', response.data);
    localStorage.setItem('token', response.data.acess_token);
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
}
</script>