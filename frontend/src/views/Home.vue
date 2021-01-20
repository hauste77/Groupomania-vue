<template>
 <v-app class="leave-absolute">
      <v-app-bar app>
      <v-toolbar-title class="text-uppercase grey--text">
            <span class="logo teal--text text--accent-3">Groupomania</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link class="nodeco mr-3" to="login">
        <v-btn
        rounded
        v-if="authenticated === false"
        class="co"
        color="teal accent-3"
        >Connexion</v-btn>
      </router-link>
      <router-link class="nodeco mr-3" to="Chat">
        <v-btn
        rounded
        v-if="authenticated === true"
        class="co"
        color="teal accent-3"
        >chat</v-btn>
      </router-link>
      <router-link class="nodeco mr-3" to="Profile">
        <v-btn
        rounded
        v-if="authenticated === true"
        class="co"
        color="teal accent-3"
        >profil</v-btn>
      </router-link>
      <router-link class="nodeco" to="signup">
        <v-btn 
        v-if="authenticated === false"
        rounded 
        color="teal accent-3"
        >Créer un compte</v-btn>
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
  data: function() {
      return {
        authenticated: false
      }
    },

     methods: {
       logout: function() {
         this.authenticated = true;
       }
  },

  created() {
      this.authenticated = this.$session.exists()
    },
}
</script>

<style>
.v-application--wrap {
  min-height: 15vh;
}

/* .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    display: none;
} */

.nodeco {
  text-decoration: none;
}

.img {
  margin: auto;
  width: 50vw;
  
}
</style>
