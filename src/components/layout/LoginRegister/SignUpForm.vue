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
        <UserPhoto class="h-28" :githubUsername="githubUsername" :hasGithub="hasGithubUsername"  />
        <form>
          <Input type="text" v-model="name" class="my-2" placeholder="Seu nome" />
          <Input type="email" v-model="email" class="my-2" placeholder="Seu email" />
          <label>
            <Input type="text" v-model="githubUsername" class="my-2" placeholder="Seu github" />
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
      <div class="self-start text-red-700">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </div>
    </div>
     <Button v-if="!isLoading" class="self-center" variant="outline"  @click="submit" >
        <img src="@/assets/icons/CheckIcon.svg" class="h-6"/>Cadastrar 
      </Button>

      <Button v-if="isLoading" class="self-center" disabled>
        <img src="@/assets/icons/AwaitIcon.svg" class="h-6 animate-spin" />Aguarde
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
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
import { useRouter } from 'vue-router';
import { authService } from '@/services/authService';

const router = useRouter();
function goToLogin() {
  router.push('/login');
}

const name = ref('');
const email = ref('');
const githubUsername = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref<string[]>([]);
const errorMessage = ref<string | null>(null);
const hasGithubUsername = computed(() => githubUsername.value.length > 2);

const isLoading = ref(false);
const showErrorRegister = ref(false);
function validateForm() {
  errors.value = []; 

  if (!name.value) errors.value.push('O campo Nome é obrigatório.');

  if (!email.value) errors.value.push('O campo Email é obrigatório.');

  if (email.value.length < 8) errors.value.push('Insira um email válido.');
  if (!password.value) errors.value.push('O campo Senha é obrigatório.');

  if (!confirmPassword.value) errors.value.push('O campo Confirmar Senha é obrigatório.');
  if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
    errors.value.push('As senhas não coincidem.');
  }

}
async function submit() {
  isLoading.value = true; 
  errorMessage.value = null;

  validateForm();
 
  if (errors.value.length) {
    console.error('Existem erros no formulário:', errors.value);
    return;
  }

  if(githubUsername.value.length < 3)
    githubUsername.value = "--"
  

  try {
    const response = await authService.register(
      name.value,
      email.value,
      password.value,
      githubUsername.value
    );

    console.log('User created successfully:', response.user);

    if (response.user) {
      try {
        const response = await authService.login(email.value, password.value);
        localStorage.setItem('token', response.access_token); 
        router.push('/home'); 
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      } finally {
        isLoading.value = false;
      } 

    }
  } catch (error: any) {
    errorMessage.value = error.message; 
    errors.value.push(errorMessage.value);
    console.error('Registration error:', error);
   
  } finally {
    isLoading.value = false;
  }
}

</script>