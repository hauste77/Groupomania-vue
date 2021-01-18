<template>
 <v-app class="leave-absolute">
      <v-app-bar app>
      <v-toolbar-title class="text-uppercase grey--text">
            <span class="logo teal--text text--accent-3">Groupomania</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link class="nodeco mr-3" to="login">
        <v-btn rounded color="teal accent-3">Connexion</v-btn>
      </router-link>
      <router-link class="nodeco" to="signup">
        <v-btn rounded color="teal accent-3">Créer un compte</v-btn>
      </router-link>
    </v-app-bar>
   <v-main class="text-center align-center">
     <h1 class="mb-15">Bienvenue chez</h1>
     <div class="img"> 
      <v-img class="" src="../assets/Groupomania.svg"></v-img>
     </div>
   </v-main>
 </v-app>
</template>

<script>
export default {
  
}
</script>

<style>
.v-application--wrap {
  min-height: 15vh;
}

.nodeco {
  text-decoration: none;
}

.img {
  margin: auto;
  width: 50vw;
  
}
</style>
