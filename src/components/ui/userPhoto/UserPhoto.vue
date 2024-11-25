<template>
    <svg v-if="!hasGithub" width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="0.999756" width="101" height="101" rx="50" stroke="black" stroke-width="2" stroke-linejoin="round"/>

      <path d="M75 80.9998V74.3331C75 70.7969 73.6153 67.4055 71.1505 64.905C68.6858 62.4045 65.3428 60.9998 61.8571 60.9998H42.1429C38.6572 60.9998 35.3142 62.4045 32.8495 64.905C30.3847 67.4055 29 70.7969 29 74.3331V80.9998" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>

      <path d="M51.5 47.9998C58.9558 47.9998 65 42.1795 65 34.9998C65 27.8201 58.9558 21.9998 51.5 21.9998C44.0442 21.9998 38 27.8201 38 34.9998C38 42.1795 44.0442 47.9998 51.5 47.9998Z" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <img
    v-else
        :src=githubAvatar
        alt="Logo"
        class="rounded-full border-2 border-[#363636]"
        @error="handleImageError"
      />

</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defineProps } from "vue"

const props = defineProps({
    githubUsername:String,
    hasGithub:Boolean
})

const fallbackAvatar = './src/assets/UserIcon.png';

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = fallbackAvatar;
}

const githubAvatar = computed(() => {
  return props.githubUsername ? `https://github.com/${props.githubUsername}.png` : '';
});

</script>

