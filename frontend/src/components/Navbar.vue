<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="text-uppercase grey--text">
            <span class="logo teal--text text--accent-3">Groupomania</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link class="nodeco" to="Form">
        <v-btn rounded color="teal accent-3" dark>Connexion</v-btn>
      </router-link>
    </v-app-bar>
  </v-app>
</template>

<script>

</script>

<style>
.nodeco {
  text-decoration: none !important;
}

.logo {
  font-size: xx-large;
}
</style>
