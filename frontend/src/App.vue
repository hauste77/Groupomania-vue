r<template>
  <v-app>
    <navbar />
    <router-view :key="$route.fullPath"></router-view>
  </v-app>
</template>

<script>
import navbar from './components/navbar.vue';

export default {
  components: { navbar },
  name: "App",

  data: () => ({
  })
};
</script>

<style>
html, body, #app {
  overflow: hidden !important;
  width: 100%;
  height: 100%;
  
  background-color: #333;
}
</style>
