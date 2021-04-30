<template>
  <v-app>
    <navbar />
    <router-view></router-view>
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

input[type='file'] {
  color: #1976d2;
}

.v-application span.error {
  font-size: 0.8em;
  background-color: transparent!important;
  color: red !important;
}

.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  align-items: center;
}

.container .v-sheet.v-toolbar {
  flex: none;
}

div.v-card {
  width: 45%;
  padding: 20px;
  border-radius: 6px;
}

div.v-card .v-form {
  text-align: center;
}

div.v-card h1 {
  margin-bottom: 20px;
  color: #1976d2;
  text-align: center;
}

div.v-card .v-card__title {
  flex-wrap: nowrap;
  padding: 0 0 16px;
}

div.v-card:nth-child(n+2),
div.v-card:nth-child(n+2),
div.v-card > *:nth-child(n+2),
div.v-card > *:nth-child(n+2) {
  margin-top: 20px;
}

#chat div.v-card .header,
#comments div.v-card .header {
  display: flex;
  justify-content: space-between;
  margin-top: 8px !important;
  font-size: .85em;
}
  #chat div.v-card .header .date,
  #comments div.v-card .header .date {
    font-style: italic;
    color: rgba(255,255,255,.8)
  }

@media (max-width: 1020px) {
  div.v-card {
    width: 90%;
  }
}

@media (max-width: 500px) {
  div.v-card {
    width: 100vw;
  }
}
</style>
