<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="logo teal--text text--accent-3">Groupomania</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link class="nodeco" to="/">
        <v-btn rounded color="teal accent-3" class="mr-3">accueil</v-btn>
      </router-link>
      <router-link class="nodeco" to="Profile">
          <v-btn rounded color="teal accent-3" class="mr-3" >profile</v-btn>
        </router-link>
      <router-link class="nodeco" to="chat">
          <v-btn rounded color="teal accent-3" class="mr-3" >forum</v-btn>
        </router-link>
    </v-app-bar>
    <v-container id="regular-tables" tag="section">
    <h1>List user</h1>
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">ID</th>
            <th class="primary--text">Name</th>
            <th class="primary--text">Email</th>
            <th class="primary--text">Right</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" v-bind:key="user.id">
            <td>{{user.id}}</td>
            <td>{{user.username}}</td>
            <td>{{user.email}}</td>
            <td>{{user.rights}}</td>
            <v-btn @click.prevent="() => deleteUser(user.id)" color="red" >
              <v-icon 
              class="mdi-delete-clock" >mdi-delete-off</v-icon>
              supprimer
            </v-btn>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </v-app>
</template>

<script>

import Vue from 'vue';

export default {
  data() {
    return {
      users: {}
    };
  },

  created: function () {
    Vue.$http.get( "/users" )
      .then( res => { this.users = res.data } )
      .catch( error => console.log( error ) );
  },

   methods: {
    deleteUser(id) {
        const userId = this.users.findIndex((user) => user.id === id );

        if (userId !== -1) {
        this.users.splice(userId);
        Vue.$http.delete("/users/" + id);
   
        }
    },

   },
};

</script>

<style>

.container {
    display: flex;
    justify-content: flex-start;
    height: 100vh;
    align-items: center;
    flex-direction: column;
    margin-top: 80px;
}

.primary--text {
  text-align: center !important;
}

table {
  min-width: 60vw;
}

td {
  text-align: center;
}

.v-data-table table thead tr th {
  font-weight: 300;
  font-size: 17px;
  padding: 0px 8px;
}
</style>