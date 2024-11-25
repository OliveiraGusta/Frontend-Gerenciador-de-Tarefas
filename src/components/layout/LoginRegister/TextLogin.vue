<script setup lang="ts">
const items = [
  {
    icon: new URL('@/assets/icons/paintIcon.svg', import.meta.url).href,
    alt: "Logo Paint",
    title: "Cores Personalizadas",
    description: "Personalize a interface com as suas cores favoritas<br>para uma experiência única.",
  },
  {
    icon: new URL('@/assets/icons/paperIcon.svg', import.meta.url).href,
    alt: "Logo Pagina",
    title: "Gerenciamento de Tarefas",
    description: "Adicione, edite e organize tarefas de forma rápida<br>e simples.",
  },
  {
    icon: new URL('@/assets/icons/filterIcon.svg', import.meta.url).href,
    alt: "Logo Filter",
    title: "Filtros e Ordenação",
    description: "Mude a tipografia para se adaptar ao seu estilo.",
  },
];
</script>

<template>
  <div class="flex flex-col justify-center gap-10">
    <h1 class="text-2xl">
      Bem-vindo(a) à plataforma My<b>Minima</b>list
    </h1>
    <div>
      <h3 class="text-xl font-bold">Gerenciador de Tarefas</h3>
      <p>Organize suas tarefas com eficiência e minimalismo</p>
    </div>
    <ul class="flex flex-col gap-6">
      <li v-for="(item, index) in items" :key="index" class="flex">
        <img :src="item.icon" :alt="item.alt" class="mr-2 w-10 self-start" />
        <div>
          <h2 class="text-lg font-bold mb-1">{{ item.title }}</h2>
          <p class="text-lg" v-html="item.description"></p>
        </div>
      </li>
    </ul>
    <p class="text-xl">Comece agora e alcance suas metas!</p>
  </div>
</template>
