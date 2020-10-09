<template>
    <v-main>
      <Navbar/>
      <router-view />
    </v-main>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
