<template>
  <v-container class="text-center-logo">
    <h1 class="mb-15">Bienvenue chez</h1>
    <div class="img">
      <v-img class="home-logo" src="../assets/Groupomania.svg"></v-img>
    </div>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      authenticated: false,
    };
  },

  methods: {
    logout: function () {
      this.authenticated = true;
    },

    deconnexion: function () {
      this.$session.destroy();
      window.location.reload();
    },
  },

  created() {
    this.authenticated = this.$session.exists();
  },
};
</script>

<style scoped>
.text-center-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  min-width: 100vw;
}

h1 {
  font-size: 2.5rem;
  color: #1976d2;
}

.logo {
  color: #1976d2;
}

@media (max-width: 650px) {
  h1 {
    font-size: 1.5rem;
  }

  .img {
    width: 100%;
  }
}
</style>
