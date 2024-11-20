<template>
<RouterView>
    
</RouterView>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';

function validate() {
  axios
    .get('me')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

onMounted(() => {
  validate();
});

</script>

